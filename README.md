# Penn Server Challenge: Eva Killenberg
## Installation
1. Clone repo
2. Create env.sh file with info given
3. `$ source env.sh`
4. `$ npm install`
5. `$ node index.js`

## Features
### Data
I decided to store user and club data in MongoDB, as it is the database I am the
most familiar with. I defined the User and Club models in the models.js file.
The database currently has the 6 clubs in the club_list.json file and the user
'Jennifer' along with some others for testing purposes. User objects' passwords
are hashed using the npm package bcrypt, for security purposes. The user's
ranking of the clubs is stored as an array of reference objects in the order
she prefers them. For Jennifer, this is the order given, but for the others it
is random.

### Routes
1. GET /signup renders a form where users can create an account, triggers
POST /newuser on submit
2. POST /newuser creates a new user and saves it in the database, then redirects
to /login
3. GET /login renders a form where users can log into an existing account,
triggers POST /login on sumbit
4. POST /login verifies user information then redirects to /user/:id
5. GET /user/:id returns the name, email, and club rank of the user id
specified, NOT the password
6. GET /clubs sends a json of all the clubs in the database
7. POST /clubs creates a new club and saves it in the database
8. GET /rankings sends Jennifer's ranking of all clubs
9. POST /rankings updates Jennifer's ranking of the clubs, taking in the new
order of clubs in an array in the request body
10. **My Feature** GET /clubs/ranked sends a json of all the clubs in the
database with (and sorted by) their average ranking between all users in the
database.

### Forms
I implemented two forms, login and signup, using Bootstrap and rendered with
express-handlebars.

### Next steps
If I had additional time I would implement Passport.js to authenticate users
and store user sessions once logged in in order to access their own rankings
(rather than hard-coding Jennifer's in the ranking routes). I think this would
complete the current functionality, besides the front-end.
Other functionality I believe would be useful in a product like Penn Club Review
would be separate rankings based on things like time commitment, community,
development, etc.; links to club website/applications (or some kind of common
app for clubs - would make life a lot easier); a recommendation system based on
the user's club rankings or even their major/classes, if the information is
accessible. 
