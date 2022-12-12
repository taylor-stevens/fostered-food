# The `fostered-food` Web Application

FosteredFood is a web application that aims to link
volunteers and community fridge users through a map 
based interface to create more purposeful donations.

## Application Run Scripts
*Running `fostered-food` locally*

If you are not currently in the root directory (`fostered-food`),
`cd` into it and then follow the next steps in the terminal 
to run the application.

### 1. `npm run build`
*Building the Backend*

`cd` (change directory/navigate) to the `backend` (server) directory. 
Once here, run `npm run build` and wait for the server 
file to finish running. This command builds the app for production to the `build` folder.
It correctly bundles `React` in production mode and optimizes the 
build for the best performance. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### 2. `npm start`
*Running the Backend*

To run the server for local testing, `cd` into the `backend` 
directory after running `npm run build` in the `backend` 
(server) directory and run `npm start` in the terminal.
Once the server returns `Listening on port 5001` in the terminal,
the backend is up and running locally.

*Running the Frontend*

Open a second terminal in the root directory and run `npm start`.
This runs the app in the development mode, and should open the app
in [http://localhost:3000](http://localhost:3000) in the browser 
(if nothing is running on this port prior to this command). 
The page will reload if you make edits. Lint errors will also 
show in the console.

## Other Scripts
### 1. `npm test`

Launches the test runner in the interactive watch mode. 
See this section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### 2. `npm run eject`

If you aren’t satisfied with the build tool and configuration choices,
you can `eject` at any time. This command will remove the single
build dependency from your project. It will copy all the configuration
files and the transitive dependencies (webpack, Babel, ESLint, etc)
right into your project so that you have full control over them. 
All commands except `eject` will still work, but they will point to
the copied scripts so that you can tweak them. At this point you’re 
on your own. You don’t have to ever use `eject`. The curated feature 
set is suitable for small and middle deployments, and you shouldn’t 
feel obligated to use this feature. However, we understand that this
tool is not useful if you can’t customize it when you are ready for it.

**Note --> This is a one-way operation. Once you `eject`, you can’t go back! <--**

## More on React Applications

### 1. [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
### 2. [React documentation](https://reactjs.org/).
