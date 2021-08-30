# Behold Burrito

## Live @ [beholdburrito.herokuapp.com](https://beholdburrito.herokuapp.com)

[![Punch Chowder Social Media](./frontend/public/Punch-Chowder-Social.jpg)](https://punchchowder.com/)

**Behold Burrito** is a Full Stack Web App created to quickly show a user the 10 closest Mexican restaurants to their current location.

The site is 100% ad free, and designed for ease of use, so users can find their feast fast!

[![Punch Chowder Site Walkthrough](./frontend/public/punch-chowder-siteS.gif)](https://punchchowder.com/)

## Videos

<a href="http://www.youtube.com/watch?feature=player_embedded&v=DzURPJnaEjs" target="_blank"><img src="http://img.youtube.com/vi/DzURPJnaEjs/0.jpg" 
alt="Rise of the Teenage Mutant Ninja Turtles Fan Site - Punch Chowder" width="240" height="180" border="10" /></a>

* [Rise of the Teenage Mutant Ninja Turtles Fan Site - Punch Chowder](https://youtu.be/DzURPJnaEjs)

## Features

Users are able to:

* Select from First Season or Second Season episodes of Rise Of The Teenage Mutant Ninja Turtles
* Select individual episodes from a list of available episodes
* Watch HD unedited videos of episodes of Rise Of The Teenage Mutant Ninja Turtles hosted on Google Drive
* Navigate to previous or next episode from the Watch page
* Access secret area if a correct password is entered
  * Secret area reveals my credit for creating this website
  * Wrong entries lead to an Access Denied page
* 404 errors are handled with a custom page

## Future Features

* Additional buttons on the Secrets page that lead to show specific merchandise I've created
* Secure user accounts
* Comments connected to each episode
* Better site-wide responsiveness

## Technical Milestones

* Embedding videos hosted on Google Drive
* Changing the source of an iFrame based on successful API call
* Building the database of information needed to serve episodes
* Animated Slide Drawer with site links 

## Technologies Used

* **Node.js & Express.js** For the HTTP backend server
* **React.js** For the front-end/client interface of my app
* **PostgreSQL** As my relation database management system
* **pg-promise** For interfacing with my database in my backend code
* **express-sslify** For HTTPS redirect
* **CSS3**

## Local Setup

**NOTE: This repo has been configured for deployment on Heroku, but can be run locally after a few adjustments.**

You must install [Node.js](https://nodejs.org) as well as [PostgreSQL](https://www.postgresql.org/) in your computer.

You can check for these dependencies with `node -v` and `psql -v`. If your shell/terminal doesn't complain and you see version numbers you are good to go.

1. Clone this repo into a folder of your choice:
    ```
    git clone https://github.com/DouglasMacKrell/punch-chowder.git
    ```

2. Install dependencies for the Node/Express Server:
    ```
    cd backend && npm install
    ```

3. Install dependencies for the React App (`client` folder):
    ```
    cd ../frontend && npm install
    ```

4. Create database and seed sample data. While inside the root directory, open the `seed.sql` file and:

    - Change  
        ```
        DROP TABLE IF exists episodes;
        ```

    - to 
        ``` 
        DROP DATABASE IF EXISTS punchchowder;  
        CREATE DATABASE punchchowder;  
        \c punchchowder;
        ```

    - Then seed the new database from the `backend/database` folder:  
        ```
        cd ../backend/database  
        psql -f seed.sql
        ```

> [Make sure PostgreSQL is running!](https://www.google.com/search?q=make+sure+postgres+is+running&oq=make+sure+postf&aqs=chrome.1.69i57j0l5.5280j1j7&client=ubuntu&sourceid=chrome&ie=UTF-8)

5. To launch the Node/Express server, inside the `backend` folder run:
    ```
    cd ..
    npm start
    ```

6. Before you can launch the React App, you must target your local server within the three components that use this connection for axios calls. In the `frontend` => `src` => `components` folder, open the `SeasonOne.jsx` file within the `SeasonOne` folder.

    - On line 14, change  
        ```
        `https://calm-waters-58474.herokuapp.com/api/episodes/season/1`
        ```

    - to  
        ```
        `http://localhost:3001/api/episodes/season/1`
        ```

7. Next, from the `components` folder, open `SeasonTwo.jsx` within the `SeasonTwo` folder.

    - On line 14, change  
        ```
        `https://calm-waters-58474.herokuapp.com/api/episodes/season/2`
        ```

    - to  
        ```
        `http://localhost:3001/api/episodes/season/2`
        ```

8. Finally, from the `components` folder, open `Watch.jsx` within the `Watch` folder.

    - On line 18, change  
        ```
        `https://calm-waters-58474.herokuapp.com/api/episodes/${episode_id}`
        ```

    - to  
        ```
        `http://localhost:3001/api/episodes/${episode_id}`
        ```

9. To launch the React App, inside the `frontend` folder, and preferably in another terminal window run:
    ```
    npm start
    ```

10. A new browser tab should have been opened and the App should be running. If that is not the case check the terminals output for errors, if you are unable to troubleshoot the problem, I would be happy to address issues so open [one](/issues)

---

### Please check out my other work at [DouglasMacKrell.com](https://douglasmackrell.com)

---

[![Douglas MacKrell](https://www.douglasmackrell.com/Doug-Portfolio-Social.png)](https://dougmackrell.com)

** **

<details>
    <summary>
        Before you leave, please take note:
    </summary>

You're the best! Thank you for visiting!

Please give this project a star and be sure to check out my [YouTube Channel](https://youtube.com/BigMacKrell)!

</details>
