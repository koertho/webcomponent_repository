# webcomponent_repository
A repository for web components. 
It brings support for `Polymer.SmartComponentBehavior` and the appility to find compatible publisher or subscripter components.
Part of my study project at [TU Chemnitz](http://tu-chemnitz.de).

## Current state

The importer import a static list of Polymer-HTML-Pages into the database.
The website list the components and publish/subscribe-keys and provide the ability to find corresponding components.

## Setup

### Database

* You need MongoDB. 
* Database must be stored under `import/database`

##### Start DB with .cmd file

* included `startMongoDB.cmd` file can be used to start database without shell (windows)
* before using it you need to set the current path to your mongoDB folder first

##### Start DB with command prompt

> `%mongoPath%\bin\mongod --dbpath %repositoryPath%\import\database`

### Web components

* Paths and names of the components are stored in `import/component.json`

### Import

* you can use the startImport.cmd to import the webcomponents to the database
* otherwise you need to start readData.js with node (`node readData.js`)

### Server/Website

* to start the server, head to the `website`-Folder in your shell and type `npm start`
* now open your browser and go to `http://localhost:3000`