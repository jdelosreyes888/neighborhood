# Places to Visit in Manila - Udacity My Neighborhood Map Project

This is from Udacity's final project that showcase the different places to visit.  The Neighborhood project uses Google Maps API that shows the different places to visit via pre-defined markers. Project made with React and bootstraped from [`create-react-app`](https://github.com/facebook/create-react-app).

![Manila](https://github.com/jdelosreyes888/neighborhood/blob/master/Places.JPG)

## How to run this project
1. Download or clone this repo.
2. Run npm install.
3. Run npm start.


## Dependencies
1. [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial)
2. [Google Maps React Wrapper](https://github.com/fullstackreact/google-maps-react)
3. [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)
4. [Escape RegExp](https://www.npmjs.com/package/escape-string-regexp) 

## SERVICE WORKER
Since the project was boostraped with create-react-app, service worker is already included by default.  The service worker can only tested on the production build of the project.
* To build this project run `npm run build`
* To launch the build `serve -s build`
* Open in your browser `http://localhost:5000/`

For further documentation kindly read [Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app).

## NOTES
If the map is not appearing, kindly insert your own GOOGLE MAP API key from the Container.js file.
