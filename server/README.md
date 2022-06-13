# Transforming Fridge Information

This sub-directory handles information transformation by taking a basic array of Fridges that will be displayed on the webapp and retrieving each of their neccessary sensor information. Pulls information from multiple sources including Google Sheets and Wireless Tags

### `npm install`

Installs all neccessary Node dependencies in order to compile and run this part of the app.

### `npm run build`

Compiles all of the TypeScript files and dependencies into a set of JavaScript files that can be executed by Node.js. All compiled files will be places under the `dist` folder in the same structure as the `src` folder.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5001](http://localhost:5001) to view the JSON data of the retrieved data.

The specific script is `node ./dist/src/server.js` posting the information to the URL linked above.

### `npm test`

Launches the test runner using Jest and runs all test suites in the project folder.

