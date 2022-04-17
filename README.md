# Kindly check the comments on code. It illustrates the logic and decissions comprehensively.


## Missed points due to time and other personal & work deuties

- Unit testing
- No excellence in UX(dark mode) and localization. My provided UX specs is not accurate and also the        multi-lang.


## src dir structure
- assets: till now it containes the localization files.
- components: containes the reuable components.
- config: contains configs and public constants for the app.
- layouts: contains the master and separate pages layouts.
- pages: contains the app pages to redirect to.
- routes: contains the app routs.
- services: contains the state management (store and slices) and the API calls.
- utils: contains the function and utilities used accross the app.


## The business flow.
- Data is grapped from the API.
- The dashboard is the main app page.
- At the header part, a main and sub headers texts are shown. also the them and lang switch.
- After that the data filters are shown.
- Filteration is done by selecting county, camp, and school.
- The first country, camp, and school are selected by default.
- The selections controls the side school data and chart painting.
- On the right of the screen, the total number of lessons is displayed for the selected Camp, School and Country, followed by a list of the schools with how many lessons each offers.
- On clicking the school (in prev point), it redirects to the school datails page.
- After coming back from the details page, the last filtering state is preserved.
- The Chart is dynamically painted based on the selections.
- On clicking the left icon of the school which shown in the right of charts (schools list), it toggles the school Line data on the chart.


## used npm packages.
- @reduxjs/toolkit
- react-router@6
- react-select
- react-chartjs-2
- react-custom-scrollbars
- react-i18next
- react-fontawesome


In the project directory, you can run:

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
