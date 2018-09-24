# Penn Server Challenge: Eva Killenberg

##Features
###Data
I decided to store user and club data in MongoDB, as it is the database I am the
most familiar with. I defined the User and Club models in the models.js file.
The database currently has the 6 clubs in the club_list.json file and the user
'Jennifer' along with some others for testing purposes. User objects' passwords
are hashed using the npm package bcrypt, for security purposes. The user's  
ranking of the clubs is stored as an array of reference objects in the order
she prefers them. For Jennifer, this is the order given, but for the others it
is random.

###Routes
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
