# Login

##### As an unauthorized user or guest, I want to be able to login through a form so that I can post questions/answers.

### Questions

-   Will the user enter a username or an e-mail address to login?
    -   The user will enter a valid e-mail/password combination to login
-   Which route(s) will be used for login?
    -   The user will login via the `/login` route
-   Which route(s) will the user be redirected to after successful login?
    -   The user will be redirected to the homepage located at the `/` route
-   What will happen if the user attempts to login with an e-mail that does not yet exist in the database?
    -   The user will see an error message on the page, `Invalid e-mail or password`
-   What will happen if the user attempts to login with an incorrect password?
    -   The user will see an error message on the page, `Invalid e-mail or password`
-   Will logging in utilize session-based or token-based authorization?
    -   Logging in will utilize session-based authorization

### Acceptance Criteria

1. Given that I'm an unauthorized user and
    - When I'm on the `/login` route
    - Then I am presented with a login form with e-mail and password fields, a "Login" button to submit the form, and a "Register" hyperlink
2. When I fill out and submit the form with an incorrect e-mail/password combination by pressing Enter or the "Login" button
    - Then I am presented with a red error message that states, `Invalid e-mail or password`.
3. When I fill out and submit the form with an e-mail that does not exist in the database by pressing Enter or the "Login" button
    - Then I am presented with a red error message that states, `Invalid e-mail or password`.
4. When I fill out and submit the form with a valid e-mail/password combination by pressing Enter or the "Login" button
    - Then I will be redirected to the `/` route (homepage)
5. When I click the "Register" hyperlink
    - Then I will be redirected to the `/register` route
6. Given that I am a logged-in/authorized user
    - When I refresh the homepage at the `/` route
    - Then I will see a "Logout" hyperlink at the top of the page
7. Given that I am a logged-out/unauthorized user
    - When I navigate to the homepage at the `/` route
    - Then I will see a "Login" hyperlink at the top of the page

# Signup

##### As an unauthorized user, I want to be able to sign up for the website via a signup form, so that I can access DinoFlow

### Questions

-   Will the user enter a username and an email address to signup?
    -   User will sign up with valid credentials
-   Will we confirm their password during signup?
    -   User will have to confirm their password
-   What routes will we use during signup?
    -   User will be directed to `/register`
-   Where should they be redirected to after signup?
    -   User will be directed to `/`
-   What happens if the user with the username or email already exists?
    -   Display the message `Invalid login`
-   What happens if the user enters the wrong password confirmation?
    -   Display the message `Invalid login`

### Acceptance Criteria

1. Given that I'm a user who has not signed up yet and
    - When I'm on the /signup route
    - Then there will be a signup form with an email, username, type of dinosaur, password field, confirm password field and a "Sign Up" button to submit the form
2. When I try to fill out the form with an email or username that already exists with a valid password and press Enter or press the "Sign Up" button
    - Then at the top of the form, I will see a red message `User with that email or username already exists.`
3. When I try to fill out the form with a password shorter than 6 characters and press Enter or press the "Sign Up" button
    - Then at the top of the form, I will see a red message `Password must be at least 6 characters long.`
4. When I try to fill out the form with a valid email, username, type of dinosaur, and password and press Enter or press the "Sign Up" button
    - Then I will be redirected to the homepage at the /route
5. Given that I am a user that just signed up
    - When I refresh the homepage at the `/` route
    - Then I will still be logged in

# Logout

##### As a logged-in user, I want to logout via a button on the navigation, so that I can hide my account information

### Questions

-   Will the user be able to see the logout button in the naviation bar?
    -   User will have access to `logout` in the nav bar
-   Where will the user be redirected once the logout button is pressed?
    -   User will be redirected to `/` page
-   What will happen to their session id?
    -   Session id will be destroyed
-   Will the user still be able to see his/her questions and answers?
    -   Logged out user can only see answers and questions
-   Will the user still have the ability to ask, answer, and upvote and downvote answers?
    -   Logged out users cannot perform these actions, nor will they see the logout button.

### Acceptance Criteria

1. When I press the logout button in the navigation bar
    - Then I will be redirected to the `/` route and my session id will be destroyed
2. Given that I am a logged out user
    - Then I will not be able to ask, answer, or upvote/downvote answers
3. Given that I am a logged out user
    - Then I will not be able to see the logout button, rather I would see the login or register button.

# Guest User

##### As an unauthorized user, I want to be able to view and search for questions/answers so that I can access DinoFlow's posts without having to create an account.

### Questions

-   Will the guest user be able to search for questions?
    -   The guest user will be able to search for questions using a search bar that accepts text-input
-   Will the guest user be able view individual questions/answers?
    -   The guest user will be able to view individual questions and their answers
-   What will happen if the guest user attempts to post questions or answers?
    -   The guest user will be redirected to the `/login` route to sign-in before being able to post questions or answers
-   What will happen if the guest user attempts to upvote/downvote answers?
    -   The guest user will be notified that he/she needs to login first before upvoting/downvoting answers

### Acceptance Criteria

1. Given that I'm an unauthorized user and
    - When I'm on the homepage `/` route
    - Then there will be an accessible search bar text-input field at the top of the page where I can enter keywords to view a list of questions that are related to the keywords
2. When I attempt to access a question
    - Then I will be able to see the question's title, content, user, date, and answers
3. When I attempt to create a question by pressing a "Create Post" button
    - Then I am redirected to the login page located at the `/login` route
4. When I attempt to post an answer to a question by pressing an "Answer Question" button
    - Then I am redirected to the login page located at the `/login` route
5. When I attempt to upvote/downvote an answer
    - Then I will be presented with a message that states, "You must login to upvote or downvote answers"

# Ask a question

##### As a logged-in user, I want to be able to write and submit a question

### Questions

-   Where will a logged in user be able to ask a question?
    -   Logged in user will see a button `answer a question` near the question
-   When asking a question, will the user be on another page?
    -   User will be redirected to `/answer/question/:id` ---------??????
-   Are there required fields for a question?
    -   User cannot have empty input for a question
-   When the user submits a question, where are they redirected?
    -   User will be redirected to the `/` route

### Acceptance Criteria

1. Given that I'm a logged in user
    - Then I will be able to see and click on `Ask a Question` button
2. When I clicked on `Ask a Question`
    - Then I will be redirected to `/create/question` route
3. When I submit a question
    - Then I will redirected to `/` route and will be able to see the new question in my feed
4. When I want to submit a question but my input is empty
    - Then I will be prompted with `Please fill out the title and field`

# Answer a question

### Questions

-   Where will a logged in user be able to answer a question?
    -   User will have access to `answer a question`
-   Where will the user be directed to when they answer a question?
    -   User will be directed to `/answer/question/:id` ----------?????
-   Will I be able to cancel my answer?
    -   User can cancel their answer

### Acceptance Criteria

1. Given that I'm a logged in user
    - Then I will see a `answer this question` button next to each question
2. When I press `answer this question`
    - Then I will see a new form field below the question with required input or a way to cancel my answer (or will I be redirected to a new page?)
3. When I cancel an answer
    - I am redirected to the `/` route
4. When I submit an answer
    - I am redirected to the `/` route with the question containing my answer.

# Upvote/downvote an answer

##### As an authorized user, I want to be able to upvote or downvote answers so that I can convey my opinion as to whether or not an answer was helpful

### Questions

-   Where will an authorized user be able to upvote or downvote an answer?
    -   An authorized user will be able to upvote/downvote an answer at the `/question/:id` route when viewing a particular question
-   How will an authorized user upvote or downvote an answer?
    -   An authorized user will be able to click on a up-/down-arrow icons, located on the question page next to an answer, to upvote or downvote an answer, respectively
-   Will an authorized user be able to upvote or downvote multiple times on the same post?
    -   An authorized user will be limited to either one upvote or one downvote per answer

### Acceptance Criteria

1. Given that I am an authorized user and
    - When I'm on the `/question/:id` route
    - Then I will be able to click on gray-colored up-/down-arrow icons that correspond to an upvote/downvote, respectively
2. When I press the upvote button while it is gray
    - Then the upvote button will become green, and a new Vote dataset containing the userId and answerId will be added to the Vote table and stored in the database
    - Then a vote counter displaying a sum of upvotes (value of +1) and downvotes (value of -1) next to the answer will increment
3. When I press the downvote button while it is gray
    - Then the downvote button will become red, and a new Vote dataset containing the userId and answerId will be added to the Vote table and stored in the database
    - Then a vote counter displaying a sum of upvotes (value of +1) and downvotes (value of -1) next to the answer will decrement
4. When I press the upvote button while it is green
    - Then the upvote button will revert back to gray, and the Vote dataset that was previously created to store the user's upvote will be removed from the database
    - Then the vote counter will decrement
5. When I press the downvote button while it is red
    - Then the downvote button will revert back to gray, and the Vote dataset that was previously created to store the user's downvote will be removed from the database
    - Then the vote counter will increment
6. When I press the upvote button while the downvote button is red
    - Then the downvote button will revert back to gray, and the upvote button will become green
    - Then the Vote dataset for the user will change to have an attribute of "upvote"
    - Then the vote counter will increase by two
7. When I press the downvote button while the upvote button is green
    - Then the upvote button will revert back to gray, and the downvote button will become red
    - Then the Vote dataset for the user will change to have an attribute of "downvote"
    - Then the vote counter will decrease by two

# Search for questions

### Questions

-   Where will I be able to search for questions?
    -   Any user will have a search bar in the navigation bar.
-   Where will the user be directed when searching for a question?
    -   Users will remain in their home page
-   When I click on a searched question, where will I be directed?
    -   to the specific page with the question id: `/questions/:id`

### Acceptance Criteria

1.  When I type into the search navigation bar
    -   Then the questions on my home page will be filtered with the keywords from the search bar
2.  Given that I am a logged-in user
    -   Then I will still be able to see `answer this question` button for each question that was searched for.
3.  Given that I am a guest user
    -   Then I will be able to click on each question and be redirected, but cannot answer the questions
4.  When I delete the keywords in the search bar
    -   Then I will see all of the question available.
