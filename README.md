# bookish-js
Model answer to the Book(ish) challenge in JS

## Setting up Part 2

### Add Babel 

```
npm i @babel/cli @babel/node @babel/core @babel/preset-env --save-dev
```

.babelrc

```
{
  "presets": ["@babel/preset-env"]
}
```

package.json

```
"build": "babel ./ --out-dir dist/ --ignore ./.git,./node_modules,./.babelrc,./package.json,./npm-debug.log,./sql,./README.md "
```

Note: no --copy-files needed, and if included takes precendence over --ignore

### Add express

npm i express

### Enable MS SQL Server access 

npm install mssql



Copyright © 2017 Softwire - All Rights Reserved

## Setting up Part 4

### Install JWT

npm i jsonwebtoken

### Install passport

npm i passport passport-jwt

Notes:

- Passport code all in index.js, controllers not aware of passport
- Passport passes user information in request to controllers
- User object does not contain password, checking done in database not in cod
