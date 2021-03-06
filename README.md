# Project 2: NightFlix&Chill 

[NightFlix&Chill](https://nightflixandchill.herokuapp.com/) is a data-persistent, full stack application utilizing an MVC architecture, two of the four CRUD functionalities, and API calls. This application is a movie review platform.  Users of NightFlix&Chill can search for a film of their choice and leave a review and a star rating of that movie. Users can also view the application in night mode. That search will also populate the UI with the movie's commercial description, URL (if available), and commercial poster from the IMDB API. While NightFlix&Chill is a movie review platform in its current iteration, because of its utilization of the MVC paradigm the code is very modular, and the data source could be easily swapped out to alter the concept. 

## Data Modeling and CRUD
The application stores all data related searches, including results from the API in a SQL database, keeping it persistent. This data is modeled using the Sequelize npm package and stored in the JawsDB mySqul add-on from Heroku.

### NightFlix&Chill performs two out of the three basic functions of persistent storage. 

*  Reads data from a mySQL database and renders it on screen. 

*  Creates data when users enter a film and write a review in a modal window. 

Directions for future development in this arena are:

* Creating an additional reviewer model and a foreign key on the Movie model that will create a one-to-many relationship between movie reviewers and movies, meaning one reviewer can review multiple films.  

## UI 

The UI for NightFlix&Chill is built on Bootstrap. A modal takes in the users input and the data is displayed horizontally across the screen on cards. 

If the user clicks on the cat icon on the upper left-hand of the screen, the application's color scheme darkens into night mode. 

The Bootstrap-star-rating npm package automatically converts an input to a star rating control, and that value is pushed into the sql database.

Directions for future UI development are: 

* Integrating the visuals for the star rating on the card carousel. 

* Search auto population.




## Technologies Used

* [Express](https://expressjs.com/)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Node](https://nodejs.org/en/)
* [Bootstrap-star-rating](https://www.npmjs.com/package/bootstrap-star-rating)




