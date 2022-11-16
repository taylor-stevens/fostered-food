# Running `fostered-food` Locally

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*
## Application Run Scripts

After changing directory to the project root, follow these steps in the terminal to run the application:

### 1. `npm run build`

Navigate (`cd`) to the backend (`server`) directory. Once here, run `npm run build`
and wait for the server file to finish building. 

This command builds the app for production to the `build` folder.
It correctly bundles `React` in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes. The app is ready to be deployed.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### 2. `npm start`

**Note: This is not currently working for the backend (`server`). The following instructions are temporary until the fix is made.** To run the `server` for local testing, `cd` into the
`dist` directory after runing `npm run build` in the backend (`server`) directory and run `node server.js` in the 
terminal.

Once the backend returns `Listening on port 5001` in the terminal, open a
second terminal in the root directory and run `npm start`.

This runs the app in the development mode, and should open the app in [http://localhost:3000](http://localhost:3000) 
in the browser (if nothing if running on this port prior to this command). The page will reload if you make edits.
Lint errors will also show in the console.

## Other Scripts
### `npm test`

Launches the test runner in the interactive watch mode.

See this section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## More on React Applications

1. [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
2. [React documentation](https://reactjs.org/).
