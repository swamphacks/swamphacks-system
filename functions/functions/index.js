const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise');
const md5 = require('md5');
const configFile = require('./config/config');
const serviceAccount = require('./config/serviceAccountInfo.json');

// Setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'swamphacks-e5c4c.appspot.com',
});
const firestore = admin.firestore();
const storage = admin.storage().bucket();
const auth = admin.auth();

// Firestore reference for the current year, set by config
const YEAR_REF = firestore.collection('years').doc(configFile.CURR_YEAR);
// TODO: Update this file with new config file

// Helper functions
const _getYearConfig = async () => {
  const doc = await YEAR_REF.get();
  const { config } = doc.data();
  return config;
};

const _getAvailableCode = async () => {
  const ref = firestore
    .collection('tokens')
    .where('used', '==', false)
    .limit(1);
  const docs = await ref.get();
  const code = docs.docs[0].id;
  const ref2 = firestore.collection('tokens').doc(code);
  await ref2.update({ used: true });
  return code;
};

const _tagMailchimpContact = async ({ email, type }) => {
  let tag;
  if (type === 'hacker') {
    tag = configFile.MAILCHIMP_TAGS.HACKER;
  } else if (type === 'mentor') {
    tag = configFile.MAILCHIMP_TAGS.MENTOR;
  } else if (type === 'volunteer') {
    tag = configFile.MAILCHIMP_TAGS.VOLUNTEER;
  } else if (type === 'standby') {
    tag = configFile.MAILCHIMP_TAGS.STANDBY;
  } else if (type === 'standbyAccepted') {
    tag = configFile.MAILCHIMP_TAGS.STANDBY_ACCEPTED;
  } else if (type === 'accepted') {
    tag = configFile.MAILCHIMP_TAGS.ACCEPTED;
  } else if (type === 'rejected') {
    tag = configFile.MAILCHIMP_TAGS.REJECTED;
  } else if (type === 'confirmed') {
    tag = configFile.MAILCHIMP_TAGS.CONFIRMED;
  } else if (type === 'attended') {
    tag = configFile.MAILCHIMP_TAGS.ATTENDED;
  } else {
    console.error(`Invalid tag type ${type}.`);
    return;
  }
  console.log(`[${email}] Tagging contact as ${tag.label}...`);
  try {
    await request({
      url: `https://us10.api.mailchimp.com/3.0/lists/${configFile.MAILCHIMP_LIST_ID}/segments/${tag.id}/members`,
      method: 'POST',
      headers: {
        Authorization: `auth ${functions.config().mailchimp.key}`,
      },
      body: JSON.stringify({ email_address: email }),
    });
    console.log(`[${email}] Successfully tagged contact as ${tag.label}.`);
    return;
  } catch (error) {
    console.error(
      `[${email}] Failed to tag contact as ${tag.label}. Error: ${error}`
    );
    return;
  }
};

// Updates the current year's data.
const _updateYearData = async ({ type, amount, id }) => {
  let index;
  if (type === 'people') {
    let newId = undefined;
    if (id === 'hacker') {
      newId = 'numHackers';
    } else if (id === 'standby') {
      newId = 'numStandbys';
    } else if (id === 'mentor') {
      newId = 'numMentors';
    } else if (id === 'volunteer') {
      newId = 'numVolunteers';
    } else if (id === 'attended') {
      newId = 'numHackersAttended';
    } else if (id === 'standbyAttended') {
      newId = 'numStandbysAttended';
    } else if (id === 'confirmed') {
      newId = 'numHackersConfirmed';
    } else {
      console.error(`Invalid people data id ${id}.`);
    }
    index = `people.${newId}.num`;
  } else if (type === 'event') {
    index = `events.${id}.num`;
  } else {
    console.error(`Invalid year data type ${type}.`);
  }
  const payload = {};
  payload[`data.${index}`] = admin.firestore.FieldValue.increment(amount);
  return YEAR_REF.update(payload);
};

// Background functions //

// Function will handle new user docs
exports.handleNewUser = functions.firestore
  .document(`years/${configFile.CURR_YEAR}/users/{docID}`)
  .onCreate(async (snap, context) => {
    // Handle mailchimp contact creation and tagging
    // Get document data
    const docData = snap.data();
    const { email, code, applicationType, applicationData } = docData;
    const { phone, school, dateOfBirth, lastName, firstName } = applicationData;
    const hashedEmail = md5(email);

    // Try to update an existing contact first. If this fails, then add a new contact.
    try {
      console.log(`[${email}] Trying to update contact...`);
      await request({
        url: `https://us10.api.mailchimp.com/3.0/lists/${configFile.MAILCHIMP_LIST_ID}/members/${hashedEmail}`,
        method: 'PATCH',
        headers: {
          Authorization: `auth ${functions.config().mailchimp.key}`,
        },
        body: JSON.stringify({
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            SCHOOL: school,
            DOB: dateOfBirth,
            PHONE: phone,
            CODE: code,
          },
        }),
      });
      console.log(`[${email}] Contact update successful.`);
    } catch (error) {
      console.log(
        `[${email}] Contact does not exist, creating a new contact...`
      );
      await request({
        url: `https://us10.api.mailchimp.com/3.0/lists/${configFile.MAILCHIMP_LIST_ID}/members/`,
        method: 'POST',
        headers: {
          Authorization: `auth ${functions.config().mailchimp.key}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            SCHOOL: school,
            DOB: dateOfBirth,
            PHONE: phone,
            CODE: code,
          },
        }),
      });
      console.log(`[${email}] Contact creation successful.`);
    }
    // Add appropriate tag to contact.
    await _tagMailchimpContact({ email, type: applicationType });
    // Update current year's data
    await _updateYearData({ type: 'people', amount: 1, id: applicationType });
  });

// Function will handle updates to user docs
exports.handleUpdatedUser = functions.firestore
  .document(`years/${configFile.CURR_YEAR}/users/{docID}`)
  .onUpdate(async (change, context) => {
    // Get document data
    const beforeData = change.before.data();
    const afterData = change.after.data();
    const { email, applicationType } = afterData;

    if (applicationType === 'hacker') {
      // Handle acceptance/rejectance tagging
      if (afterData.accepted !== undefined) {
        const before = beforeData.accepted ? beforeData.accepted : undefined;
        const after = afterData.accepted;
        if (after !== before) {
          if (after === true) {
            await _tagMailchimpContact({ email: email, type: 'accepted' });
          } else if (after === false) {
            await _tagMailchimpContact({ email: email, type: 'rejected' });
          }
        }
      }
      // Handle confirmed tagging
      if (afterData.confirmed !== undefined) {
        const before = beforeData.confirmed ? beforeData.confirmed : undefined;
        const after = afterData.confirmed;
        if (after !== before) {
          if (after === true) {
            await _tagMailchimpContact({ email: email, type: 'confirmed' });
            await _updateYearData({
              type: 'people',
              amount: 1,
              id: 'confirmed',
            });
          } else if (after === false) {
            // TODO: Delete confirmed tag
            await _updateYearData({
              type: 'people',
              amount: -1,
              id: 'confirmed',
            });
          }
        }
      }
      // Handled attended tagging
      if (afterData.checkedIn) {
        const before = beforeData.checkedIn ? beforeData.checkedIn : undefined;
        const after = afterData.checkedIn;
        if (after !== before && after === true) {
          await _tagMailchimpContact({ email: email, type: 'attended' });
          await _updateYearData({
            type: 'people',
            amount: 1,
            id: 'attended',
          });
        }
      }
    } else if (applicationType === 'mentor') {
      // TODO
    } else if (applicationType === 'volunteer') {
      // TODO
    } else if (applicationType === 'standby') {
      // Handle unconfirmed hacker to standby tagging
      if (beforeData.applicationType !== afterData.applicationType) {
        await _tagMailchimpContact({
          email: email,
          type: 'standby',
        });
      }
      // Handle standby acceptance tagging
      if (afterData.accepted !== undefined) {
        const before = beforeData.accepted ? beforeData.accepted : undefined;
        const after = afterData.accepted;
        if (after !== before) {
          if (after === true) {
            await _tagMailchimpContact({
              email: email,
              type: 'standbyAccepted',
            });
          } else if (
            after === false &&
            before !== undefined &&
            before !== true
          ) {
            await _tagMailchimpContact({ email: email, type: 'rejected' });
          }
        } else if (
          after === false &&
          afterData.confirmed !== undefined &&
          afterData.confirmed !== false
        ) {
          await _tagMailchimpContact({ email: email, type: 'rejected' });
        }
      }
      // Handle attended tagging
      if (afterData.checkedIn) {
        const before = beforeData.checkedIn ? beforeData.checkedIn : undefined;
        const after = afterData.checkedIn;
        if (after !== before && after === true) {
          await _tagMailchimpContact({ email: email, type: 'attended' });
          await _updateYearData({
            type: 'people',
            amount: 1,
            id: 'standbyAttended',
          });
          await _updateYearData({
            type: 'people',
            amount: 1,
            id: 'attended',
          });
        }
      }
    }
  });

// Callable Functions //

// Submit an application to the database
exports.submitApplication = functions.https.onCall(async (data, context) => {
  const { type, applicationData, resumeData } = data;
  if (
    configFile.APPLICATION_TYPES[type] === undefined ||
    configFile.APPLICATION_TYPES[type] === false
  ) {
    console.error(`The application type ${type} is not supported.`);
    throw new functions.https.HttpsError(
      'internal',
      'Internal error. Check function logs.'
    );
  }
  const { email, password, ...refinedApplicationData } = applicationData;
  const {
    lastName,
    firstName,
    school,
    dateOfBirth,
    phone,
  } = refinedApplicationData;
  if (
    lastName === undefined ||
    firstName === undefined ||
    school === undefined ||
    dateOfBirth === undefined ||
    email === undefined ||
    phone === undefined ||
    password === undefined
  ) {
    console.error(`Application is missing a required type.`);
    throw new functions.https.HttpsError(
      'internal',
      'Internal error. Check function logs.'
    );
  }
  console.log(`[${email.toLowerCase().trim()}] Submitting an application...`);
  console.log(refinedApplicationData);
  // Create an account for the user
  let newUser = undefined;
  try {
    console.log(`[${email.toLowerCase().trim()}] Creating an account...`);
    newUser = await auth.createUser({
      email: email.toLowerCase().trim(),
      password: password.trim(),
    });
    console.log(`[${email.toLowerCase().trim()}] Account creation successful.`);
  } catch (error) {
    let code = 'internal';
    let message = 'An unexpected error occurred. Please try again.';
    if (error.code === 'auth/email-already-exists') {
      // Allow unconfirmed hackers to submit standby applications
      if (type === 'standby') {
        const findRef = YEAR_REF.collection('users').where(
          'email',
          '==',
          email.toLowerCase().trim()
        );
        const findDocs = await findRef.get();
        if (findDocs.docs.length === 1) {
          console.log(
            `[${email
              .toLowerCase()
              .trim()}] Hacker already exists! Updating application to standby...`
          );
          const findDocId = findDocs.docs[0].id;
          await YEAR_REF.collection('users')
            .doc(findDocId)
            .update({
              applicationType: 'standby',
              applicationDate: new admin.firestore.Timestamp(
                Math.round(Date.now() / 1000),
                0
              ),
              accepted: false,
            });
          await _tagMailchimpContact({ email: email, type: 'standby' });
          await _updateYearData({ type: 'people', amount: 1, id: 'standby' });
          console.log(
            `[${email
              .toLowerCase()
              .trim()}] Successfully updated application to standby.`
          );
          return;
        }
      }
      code = 'already-exists';
      message = 'The provided email is already associated with an account.';
      console.log(`${message}`);
    } else if (error.code === 'auth/invalid-email') {
      code = 'invalid-argument';
      message = 'The provided email is not valid.';
      console.log(`${message}`);
    } else {
      console.error(`${error}`);
    }
    throw new functions.https.HttpsError(code, message);
  }

  // Upload resume if given
  let resumePath = undefined;
  if (resumeData) {
    const resumeName =
      lastName.toLowerCase() +
      '-' +
      applicationData.firstName.toLowerCase() +
      '-' +
      Date.now().toString();
    const path = `tests/resumes/${resumeName}.pdf`;
    await storage.file(path).save(resumeData, {
      resumable: false,
      contentType: 'application/pdf',
    });
    resumePath = path;
  } else {
    console.log('No resume provided.');
  }
  // Fetch a checkinCode for the user
  // TODO: Only give code to hackers and standbys
  const code = await _getAvailableCode();
  // Create a user doc with the appropriate application type
  const ref = YEAR_REF.collection('users').doc(newUser.uid);
  if (resumePath) {
    refinedApplicationData['resumePath'] = resumePath;
  }
  const payload = {
    applicationData: refinedApplicationData,
    applicationType: type,
    applicationDate: new admin.firestore.Timestamp(
      Math.round(Date.now() / 1000),
      0
    ),
    // The following fields are to be used for queries
    firstName: firstName.toLowerCase().trim(),
    lastName: lastName.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    school: school.toLowerCase().trim(),
    // User ID
    uid: newUser.uid,
    // Code
    code: code,
  };
  if (type === 'standby') {
    payload['accepted'] = false;
  }
  await ref.set(payload);
  // Complete
  console.log(
    `[${email.toLowerCase().trim()}] Successfully submitted application.`
  );
});

// Given a check-in code and an NFC ID, check the hacker in.
exports.checkIn = functions.https.onCall(async (data, context) => {
  // Check if open
  const yearConfig = await _getYearConfig();
  if (!yearConfig.checkInOpen) {
    console.log(`Hacker check-in closed.`);
    throw new functions.https.HttpsError(
      'permission-denied',
      'Hacker check-in is closed.'
    );
  }
  // Get the necessary data
  const { email, firstName, lastName, docID, nfcID } = data;
  // Double check that the nfcID has not been used
  const checkRef = firestore
    .collection('years')
    .doc(configFile.CURR_YEAR)
    .collection('users')
    .where('tagID', '==', nfcID);
  const checkDocs = await checkRef.get();
  if (checkDocs.docs.length > 0) {
    console.error(`NFC Tag ID ${nfcID} has already been assigned to a hacker.`);
    throw new functions.https.HttpsError(
      'internal',
      'This tag has already been assigned to a hacker. Please use another tag.'
    );
  }
  // Find the hacker's application
  const ref = firestore
    .collection('years')
    .doc(configFile.CURR_YEAR)
    .collection('users')
    .doc(docID);
  await ref.update({
    checkedIn: true,
    tagID: nfcID,
    checkInDate: new admin.firestore.Timestamp(
      Math.round(Date.now() / 1000),
      0
    ),
    receivedShirt: false,
  });
  console.log(
    `[${email}] Hacker ${firstName} ${lastName} has been checked in at docID ${docID} with nfcID ${nfcID}.`
  );
});

exports.getHackerByCode = functions.https.onCall(async (data, context) => {
  // Check if open
  const yearConfig = await _getYearConfig();
  if (!yearConfig.checkInOpen) {
    console.log(`Hacker check-in closed.`);
    throw new functions.https.HttpsError(
      'permission-denied',
      'Hacker check-in is closed.'
    );
  }
  const { code, checkIn } = data;
  const ref = firestore
    .collection('years')
    .doc(configFile.CURR_YEAR)
    .collection('users')
    .where('applicationType', 'in', ['hacker', 'standby'])
    .where('code', '==', code.toUpperCase());
  const docs = await ref.get();
  if (docs.size === 1) {
    let docID = null;
    let docData = null;
    docs.forEach((doc) => {
      docID = doc.id;
      docData = doc.data();
    });
    if (docData.confirmed === undefined || docData.confirmed === false) {
      console.log(
        `Hacker ${docData.firstName} ${docData.lastName} cannot check in. Hacker has not been confirmed.`
      );
      throw new functions.https.HttpsError(
        'failed-precondition',
        'This hacker has not been confirmed.'
      );
    }
    if (checkIn === true && docData.checkedIn === true) {
      console.error(
        `Hacker ${docData.firstName} ${docData.lastName} is already checked in.`
      );
      throw new functions.https.HttpsError(
        'internal',
        'This hacker has already been checked in.'
      );
    } else {
      return { docData, docID: docID };
    }
  } else {
    console.log(
      `There is no confirmed hacker associated with check-in code ${code}.`
    );
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The provided check-in code does not match any hacker.'
    );
  }
});

exports.getHackersByName = functions.https.onCall(async (data, context) => {
  // Check if open
  const yearConfig = await _getYearConfig();
  if (!yearConfig.checkInOpen) {
    console.log(`Hacker check-in closed.`);
    throw new functions.https.HttpsError(
      'permission-denied',
      'Hacker check-in is closed.'
    );
  }
  const { firstName, lastName, checkIn } = data;
  const ref = firestore
    .collection('years')
    .doc(configFile.CURR_YEAR)
    .collection('users')
    .where('applicationType', 'in', ['hacker', 'standby'])
    .where('confirmed', '==', true)
    .where('firstName', '==', firstName.toLowerCase())
    .where('lastName', '==', lastName.toLowerCase());
  const docs = await ref.get();
  let ret = [];
  if (docs.size === 0) {
    console.log(
      `There is no confirmed hacker associated with first name ${firstName.toLowerCase()} and last name ${lastName.toLowerCase()}.`
    );
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The provided first and last name does not match any confirmed hacker.'
    );
  }
  docs.forEach((doc) => {
    const docData = doc.data();
    if (checkIn === true && !(docData.checkedIn === true)) {
      ret.push({ docData: docData, docID: doc.id });
    }
  });
  return { hackersFound: ret };
});

exports.getFoodTokens = functions.https.onCall(async (data, context) => {
  const ref = firestore
    .collection('years')
    .doc(configFile.CURR_YEAR)
    .collection('events')
    .orderBy('start')
    .where('type', '==', 'Food');
  const docs = await ref.get();
  let ret = [];
  docs.forEach((doc) => {
    const data = doc.data();
    ret.push({ label: data.name, value: data.name });
  });
  return ret;
});

exports.consumeToken = functions.https.onCall(async (data, context) => {
  const { token, tagID, code } = data;
  let queryCode = code;
  if (queryCode) {
    queryCode = queryCode.toUpperCase();
  }
  let uid = null;
  let usersRef = null;
  if (tagID) {
    usersRef = firestore
      .collection('years')
      .doc(configFile.CURR_YEAR)
      .collection('users')
      .where('tagID', '==', tagID);
  } else {
    usersRef = firestore
      .collection('years')
      .doc(configFile.CURR_YEAR)
      .collection('users')
      .where('code', '==', queryCode);
  }
  const userDocs = await usersRef.get();
  if (userDocs.docs.length > 1) {
    // Error, duplicate tagID
    console.error(
      `Error: Tag ID ${tagID} or code ${code} was found on multiple user documents.`
    );
    throw new functions.https.HttpsError(
      'failed-precondition',
      `This hacker's tagID or code was found on multiple user documents. Please send them to tech support.`
    );
  } else if (userDocs.docs.length < 1) {
    // Error, no hacker found with this tagID
    console.log(`No hacker was found with tag ID ${tagID} or code ${code}.`);
    throw new functions.https.HttpsError(
      'not-found',
      `Could not find any hacker associated with the provided tag ID or code.`
    );
  }
  let userData = null;
  userDocs.forEach((doc) => {
    uid = doc.id;
    userData = doc.data();
  });
  if (userData.checkedIn === undefined) {
    console.log(
      `[${userData.email}] ${userData.firstName} ${userData.lastName} has not been checked in.`
    );
    throw new functions.https.HttpsError(
      'failed-precondition',
      'This hacker has not been checked in.'
    );
  }
  // Handle shirt
  if (token === 'Shirt') {
    if (userData.receivedShirt === true) {
      console.log(
        `[${userData.email}] ${userData.firstName} ${userData.lastName} has already received a shirt.`
      );
      throw new functions.https.HttpsError(
        'already-exists',
        'This hacker has already received a shirt.'
      );
    } else {
      const uRef = firestore
        .collection('years')
        .doc(configFile.CURR_YEAR)
        .collection('users')
        .doc(uid);
      await uRef.update({
        receivedShirt: true,
      });
      await _updateYearData({ type: 'event', amount: 1, id: 'shirt' });
    }
  }
  // Handle food
  else {
    const eventsRef = firestore
      .collection('years')
      .doc(configFile.CURR_YEAR)
      .collection('events')
      .where('name', '==', token);
    const eventDocs = await eventsRef.get();
    let consumedToken = false;
    let eventDocID = null;
    eventDocs.forEach((doc) => {
      const { attendees } = doc.data();
      eventDocID = doc.id;
      if (attendees.indexOf(uid) !== -1) {
        // User has already consumed token
        consumedToken = true;
      }
    });
    if (!consumedToken) {
      await firestore
        .collection('years')
        .doc(configFile.CURR_YEAR)
        .collection('events')
        .doc(eventDocID)
        .update({
          attendees: admin.firestore.FieldValue.arrayUnion(uid),
        });
      await _updateYearData({ type: 'event', amount: 1, id: eventDocID });
      return { allergiesDiet: userData.applicationData.allergiesDiet };
    } else {
      console.log(
        `[${userData.email}] ${userData.firstName} ${userData.lastName} has already consumed token for ${token}.`
      );
      throw new functions.https.HttpsError(
        'already-exists',
        'This hacker has already consumed their token for this event.'
      );
    }
  }
});

exports.getYearConfig = functions.https.onCall(async (data, context) => {
  const config = await _getYearConfig();
  return config;
});

exports.setYearConfig = functions.https.onCall(async (data, context) => {
  const { index, value } = data;
  const ref = firestore.collection('years').doc(configFile.CURR_YEAR);
  const newConfig = {};
  newConfig[`config.${index}`] = value;
  await ref.update(newConfig);
});
