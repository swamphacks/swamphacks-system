import React from 'react';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import { PageRootContainer as RootContainer } from '../components/PageRootContainer';

// Images
import agustinAlbum from '../records/agustinAlbum.png';
import alecAlbum from '../records/alecAlbum.png';
import allisonAlbum from '../records/allisonAlbum.png';
import anushriAlbum from '../records/anushriAlbum.png';
import chadAlbum from '../records/chadAlbum.png';
import deniseAlbum from '../records/deniseAlbum.png';
import ewaAlbum from '../records/ewaAlbum.png';
import freyaAlbum from '../records/freyaAlbum.png';
import gabeAlbum from '../records/gabeAlbum.png';
import jadAlbum from '../records/jadAlbum.png';
import laraAlbum from '../records/laraAlbum.png';
import madiAlbum from '../records/madiAlbum.png';
import melissaAlbum from '../records/melissaAlbum.png';
import rosemeryAlbum from '../records/rosemeryAlbum.png';
import saharAlbum from '../records/saharAlbum.png';
import samAlbum from '../records/samAlbum.png';
import sofiaAlbum from '../records/sofiaAlbum.png';
import zachAlbum from '../records/zachAlbum.png';

// Album array
const albums = [
  {
    image: agustinAlbum,
    link:
      'https://open.spotify.com/playlist/7HMGYsmzDmZeQb2cutAwFp?si=W-5QCowBQ7eBN_-TB2C8Fw',
    title: 'LO FI',
    author: 'Agustin Martinez'
  },
  {
    image: alecAlbum,
    link:
      'https://open.spotify.com/playlist/3FTmKLtqVZipAS5mBa8EYm?si=p6iUzbKUS6eB1ik3NjLghQ',
    title: 'Hacking to the Gate',
    author: 'Alec Handal'
  },
  {
    image: allisonAlbum,
    link:
      'https://open.spotify.com/user/12122512343/playlist/0ul09GTWfdfmvDiOIsBnUP?si=9R_ogfMSRwaIlu-9PQt0ww',
    title: '_Toast',
    author: 'Allison Wu'
  },
  {
    image: anushriAlbum,
    link:
      'https://open.spotify.com/playlist/0qUcPSb1F9Z93dUg3htIq3?si=ufbrOgCBTZO9tlqriFLcsQ',
    title: 'WOC With Pretty Voices',
    author: 'Anushri Marar'
  },
  {
    image: chadAlbum,
    link: 'https://open.spotify.com/playlist/27Ol7fyBKtGD00PmnX4OfZ',
    title: 'Yeezy',
    author: 'Chad Wishner'
  },
  {
    image: deniseAlbum,
    link:
      'https://open.spotify.com/playlist/4BZCZvmD0Zk59SF8RhALmF?si=xNw2E43vQSiqXTI7BhT09w',
    title: 'RIHANNA PLAYED US',
    author: 'Denise Tran'
  },
  {
    image: ewaAlbum,
    link:
      'https://open.spotify.com/playlist/5TDOuPslNb72voB5okYZkx?si=JHwGpuzhTBGXiQX3iI57HA',
    title: 'Food Coordinator Jams',
    author: 'Ewa Wiercioch'
  },
  {
    image: freyaAlbum,
    link: 'https://open.spotify.com/playlist/06j63uXL1W6sgkgncRr6KH',
    title: 'Weeb Life',
    author: 'Freya Wang'
  },
  {
    image: gabeAlbum,
    link:
      'https://open.spotify.com/playlist/7ryV3iiZCr7t4JzZoDmTWE?si=xWrUKJ4iTIGs69u1J6TjYg',
    title: `Gabe's Swamp Jam's`,
    author: 'Gabriel Rodriguez Torres'
  },
  {
    image: jadAlbum,
    link:
      'https://open.spotify.com/playlist/1CQgGVTUzEb6F0e7859ndV?si=wGa8pQiPRz2NJEd5QRrXiw',
    title: 'Tik-Tok',
    author: 'Jad Zeineddine'
  },
  {
    image: laraAlbum,
    link:
      'https://open.spotify.com/user/1251950367/playlist/5B4n4c8ycv9pjopS1ktyZj?si=74K8GW-iSY6f09syLAOcRw',
    title: 'Funky Wunky SwampyHacks',
    author: 'Lara Disuanco'
  },
  {
    image: madiAlbum,
    link:
      'https://open.spotify.com/user/xxmadey7xx/playlist/0Sn2AbI4huwu2wjeUbedCD?si=rZ-vwcG6QYCWHycFL2y5hw',
    title: 'MadDog SwampyMix',
    author: 'Madison Lysaght'
  },
  {
    image: melissaAlbum,
    link:
      'https://open.spotify.com/playlist/0Osufpc5hEeFGkFLwhv1xO?si=Vls7pz2FSBCv3LyLSbeaIw',
    title: 'Latin/Fiesta!',
    author: 'Melissa Perez'
  },
  {
    image: rosemeryAlbum,
    link:
      'https://open.spotify.com/playlist/1R1BfGLsXCApxm0Qd60Uh0?si=BQXeQGKcTyC3tjkWKDkEZQ',
    title: 'Biking',
    author: 'Rosmery Izaguirre'
  },
  {
    image: saharAlbum,
    link:
      'https://open.spotify.com/user/saharkay/playlist/5pmHbk8ISq1fZScYTwZVNI?si=U8OCqHgzT-SaKj6quVVgNQ',
    title: 'Nostalgia',
    author: 'Sahar Azody'
  },
  {
    image: samAlbum,
    link:
      'https://open.spotify.com/user/samanthasu/playlist/2Ob59QFsAMb3Gs8ZBq5pmo?si=Xj75cimLSLOxTdKLEG0cWg',
    title: 'swampbopz',
    author: 'Samantha Su'
  },
  {
    image: sofiaAlbum,
    link:
      'https://open.spotify.com/playlist/5HrWKhdSz8TrPEr3gWwHbP?si=NBdomWUESHGNqwVfpyZrAA',
    title: 'i never outgrew my emo middle school phase',
    author: 'Sofia Zheng'
  },
  {
    image: zachAlbum,
    link:
      'https://open.spotify.com/playlist/6NGtjdJ5FLMUJ3PzcBTWOK?si=SuTJnJk7RyOxq5Efi-cmIA',
    title: 'Hype',
    author: 'Zach Cowan'
  }
];

// Styled components
const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, auto);
  column-gap: 20px;
  row-gap: 20px;
  justify-items: center;
  align-items: stretch;
  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 50%);
  }
  @media only screen and (min-width: 992px) {
    grid-template-columns: repeat(3, 33%);
  }
`;

const RecordContainer = styled(ContentContainer)`
  background-color: rgba(141, 170, 144, 1);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  overflow-x: hidden;
`;

const RecordButton = styled.a`
  background-color: rgba(94, 118, 94, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 20px;
  text-decoration: none;
  color: white;
  :hover {
    color: white;
    cursor: pointer;
    background-color: rgba(94, 118, 94, 1);
  }
  :active {
    color: white;
    background-color: rgba(94, 118, 94, 0.8);
  }
  border-radius: 4px;
`;

const RecordTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: Montserrat-Bold, Helvetica, sans-serif;
  font-size: 1.2rem;
  text-align: center;
`;

const RecordAuthor = styled.div`
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 1rem;
  text-align: center;
`;

// Record component
const Record = ({ image, link, title, author }) => {
  const RecordImage = styled.img`
    width: 100%;
    animation: spinning ${Math.random() * 20 + 10}s linear infinite;
    @keyframes spinning {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <RecordContainer>
      <RecordImage src={image} />
      <ContentContainer style={{ justifyContent: 'flex-end' }}>
        <RecordTitle>{title}</RecordTitle>
        <RecordAuthor>{author}</RecordAuthor>
        <RecordButton href={link} target='_blank'>
          Listen
        </RecordButton>
      </ContentContainer>
    </RecordContainer>
  );
};

const JamzPage = () => {
  return (
    <RootContainer>
      <PageTitle title='Jamz' />
      <ContentContainer>
        <Grid>
          {albums.map(album => (
            <Record
              image={album.image}
              link={album.link}
              title={album.title}
              author={album.author}
            />
          ))}
        </Grid>
      </ContentContainer>
    </RootContainer>
  );
};

export default JamzPage;
