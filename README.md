# webcomponent_repository
A repository for web components. Part of an study project.

# Setup

### Database

* You need MongoDB. 
* Database must be stored under import/database

##### Start DB with .cmd file

* included startMongoDB.cmd file can be used to start database without shell (windows)
* before using it you need to set the current path to your mongoDB folder first

##### Start DB with command prompt

* `%mongoPath%\bin\mongod --dbpath %repositoryPath%\import\database`

### Web components

* Paths and names of the components are stored in import/component.json

### Import

* you can use the startImport.cmd to import the webcomponents to the database
* otherwise you need to start readData.js with node (`node readData.js`)