This repository contains code that implements CRUD (Create, Read, Update, Delete) operations for a contact management system using React.js, ASP.NET Core, and SQL Server. The code includes functionalities for adding a new contact, updating existing contact information, and deleting contacts. The front-end is implemented using React.js and the back-end using ASP.NET Core and SQL Server. The code uses axios to make HTTP requests to the server for database CRUD operations. The UI is built using Bootstrap and react-toastify is used for displaying toast notifications. The code also includes input validation using regular expressions. Overall, this code provides a working example of how to implement CRUD operations for a contact management system using React.js, ASP.NET Core, and SQL Server.

The project was developed using Visual Studio 2022 and Visual Code. 

Additional packages used in the project:

react-toastify: A package that provides an easy way to display toast notifications in React. It's used in the project to show success and error messages when a user adds, updates, or deletes a contact.

axios: A promise-based HTTP client for the browser and Node.js. It's used in the project to make HTTP requests to the server-side API.

Bootstrap: A popular front-end framework for building responsive websites. It's used in the project for styling and layout purposes.

Entity Framework: A Microsoft framework for working with relational databases. It's used in the project to handle database operations, such as querying and updating data in the SQL Server database.

Still to do:
- Add basic authentication (only a logged in user can alter the database)
- Add basic checks of for password (at least 8 characters, at least 1 upper case letter, at least 1 special symbol) and email input
- Fix the date format (currently also time is displayed)
_________________________________________________________________________________________________________________________________
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
