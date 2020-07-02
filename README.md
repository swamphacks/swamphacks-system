# swamphacks-system
Collection of software used to run SwampHacks.

## Getting Started
Follow this guide after cloning the project to get the project up and running properly.

### Initial Setup
Before beginning the setup process, run `npm i` at the root to install dev dependencies.

### Setting Up Config Files
1. Create a new `config.js` file at the root based on `config.example.js`.
2. Fill out the information in the new `config.js` file.
3. Run `npm run setup-config` at the root to place the config files in the correct locations.

### Installing Packages
1. At the root, run `npm run install-all` to install all node_modules for each sub-system.

### Verifying Proper Installation
**TODO**

## Running Sub-Systems
Follow this guide to successfully run each sub-system.

### Running the Firebase Functions Locally
**TODO - development environment not currently setup for this**

### Running a Sub-System
1. `cd` to the appropriate sub-system.
2. Run `npm start` to launch the project to localhost:3000.

## Making Changes
When making changes to the project, DO NOT work directly from the master branch. Follow the steps below to properly make changes.
1. Create a new branch from master. Name the branch using the following schema: `${subsystemName}-${itemName}`, where subsystemName = the name of a sub-system (ex: internal, dashboard, etc.), itemName = a feature or bug fix.
2. Make all commits related to the item on the branch.
3. When the item is finished completely, submit a pull request to the master branch for review.
