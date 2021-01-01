# Rest Api Format

| Model/Table       | APIS Constraint |
| :---------------- | :-------------- |
| `An Endpoint URL` | `Client-Server` |
| `HTTP method`     | `Stateless`     |
| `HTTP headers`    | `Cachable`      |
| `Body Data`       | `Layered`       |

# package.json

```
{
  "name": "DinoFlow",
  "version": "1.0.0",
  "description": "Stack Overflow Clone",
  "scripts": {
    "start": "nodemon ./app.js"
  },
  "devDependencies": {
    "nodemon": "~1.3.8",
  }
  "dependencies": {
    "express": "4.17.1"
  }
}
```

Curl Options
The syntax for the curl command is as follows:

curl [options] [URL...]
Here are the options that we’ll use when making requests:

-X, --request - The HTTP method to be used.
-i, --include - Include the response headers.
-d, --data - The data to be sent.
-H, --header - Additional header to be sent.
HTTP GET
HTTP POST
HTTP PUT
HTTP PATCH
HTTP DELETE

#USERS

```
[
    {}
]
```

# config folder with database.js & index.js

### database.js

```
const {
  username,
  password,
  database,
  host,
} = require('./index').db;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
};

```

### index.js

```
module.exports = {
  environment: process.env.SESSION_SECRET || process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
  },
};
```

# APP.JS

Create an app.js file with code:

```
'use strict';

// initialize
const
  port = 8080,
  express = require('express'),
  cookieParser = require('cookie-parser'),
  morgan = require('morgan'),
  sequelize = require('sequelize')
  app = express();

// Config and Routes
const
    session = require('express-session'),
    { environment, sessionSecret } = require('./config),


    indexRoutes - require('./routes'),
    userRoutes - require('./routes/user'),
    commentRoutes - require('./routes/comment'),
    questionRoutes - require('./routes/question')

//* Uses

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use(questionRoutes);

// enable CORS
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
});


//Sets
app.set('view engine', 'pug')

const asyncHandler = handler=>(req,res,next)=>handler(req,res,next).catch(next)


//API Marlarkey

const api = new sequelize('postgres://user:PlaceHolder@ExamplePlaceholder.com:number/dataBaseName')

sequelize
    .authenticate()
    .then(() =>
        {
        console.log('Connection successfully established.');
        })
    .catch(err =>
        {
            console.error('Unable to connect to the database:', err);
        });

const User = sequelize.define('user', {
        // attributes
        username: {
        type: Sequelize.STRING(50),
        allowNull: false
        },
        email: {
        type: Sequelize.STRING(50),
        allowNull: false
        },
        password: {
        type: Sequelize.STRING(50),
        allowNull: false
        },
        createdAt: {
        type: Sequelize.Date,
        allowNull: false
        },
    }, {
// options
});

//drop if already exist and sync with PSQL
User.sync({ force: true })

app.post('/user', asyncHandler(async (req, res) => {
try {
    const newUser = new User(req.body)
    await newUser.save()
    res.json({ user: newUser }) // Returns the new user that is created in the database
}
catch(error) {
    console.error(error)
}
}))
app.get('/user/:userId', asyncHandler(async (req, res) => {
const userId = req.params.userId
try {
    const user = await User.findAll({where: {id: userId}})
    res.json({ user })
}
catch(error) {
    console.error(error)
}
}))



const Question = sequelize.define('question', {

        title: {
        type: Sequelize.STRING(50),
        allowNull: false
        },
        content: {
        type: Sequelize.STRING(50),
        allowNull: false
        },
        user_id: {
        type: Sequelize.integer
        allowNull: false,
        unique: true,
        references: {model:'users'}
        },
    }, {
// options
});

Question.sync({ force: true })

app.post('/question', asyncHandler(async (req, res) => {
try {
    const newQuestion = new Question(req.body)
    await newQuestion.save()
    res.json({ question: newQuestion })
}
catch(error) {
    console.error(error)
}
}))
app.get('/question/:questionId', asyncHandler(async (req, res) => {
const questionId = req.params.questionId
try {
    const question = await Question.findAll({where: {id: questionId}})
    res.json({ question })
}
catch(error) {
    console.error(error)
}
}))

const Answer = sequelize.define('answer', {

        content: {
        type: Sequelize.STRING(50),
        allowNull: false
        },
        user_id: {
        type: Sequelize.integer
        allowNull: false,
        unique: true,
        references: {model:'users'}
        },
    }, {
// options
});

Answer.sync({ force: true })

app.post('/answer', asyncHandler(async (req, res) => {
try {
    const newAnswer = new Answer(req.body)
    await newAnswer.save()
    res.json({ answer: newAnswer })
}
catch(error) {
    console.error(error)
}
}))
app.get('/answer/:answerId', asyncHandler(async (req, res) => {
const answerId = req.params.answerId
try {
    const answer = await Answer.findAll({where: {id: answerId}})
    res.json({ answer })
}
catch(error) {
    console.error(error)
}
}))

const Vote = sequelize.define('vote', {

        user_id: {
        type: Sequelize.INTEGER
        allowNull: false,
        unique: true,
        references: {model:'users'}
        },
        answerId: {
        type: Sequelize.INTEGER,
        allowNull: false
        },
        upvotes: {
        type: Sequelize.INTEGER,
        allowNull: false
        },
        downvotes: {
        type: Sequelize.INTEGER,
        allowNull: false
        },
    }, {
// options
});

Vote.sync({ force: true })

app.post('/vote', asyncHandler(async (req, res) => {
try {
    const newVote = new Vote(req.body)
    await newVote.save()
    res.json({ vote: newVote })
}
catch(error) {
    console.error(error)
}
}))
app.get('/vote/:answerId', asyncHandler(async (req, res) => {
const voteId = req.params.voteId
try {
    const vote = await Answer.findAll({where: {id: voteId}})
    res.json({ vote })
}
catch(error) {
    console.error(error)
}
}))



// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors, // Includes our array of validation errors in our JSON response
    stack: isProduction ? null : err.stack,
  });
});

// start server
app.listen(port, ()=> console.log(`Server started on port: ${port}`))
```

# Client-side Request

We'll use pug templates. Here's the `layout.pug`, find a different style template later.

```
doctype html
html
  head
    meta(charset='utf-8')
    meta(name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no')
    link(rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous')
    title DinoFlow - #{title}
    <script>
        fetch('http://localhost:8080/hello/')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
        });
    </script>
  body
    nav(class='navbar navbar-expand-lg navbar-dark bg-primary')
      a(class='navbar-brand' href='/') DinoFlow
      button(class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation')
        span(class='navbar-toggler-icon')
      #navbarNav(class='collapse navbar-collapse')
        ul(class='navbar-nav')
          li(class='nav-item'): a(class='nav-link' href='/parks')
    .container
      h2(class='py-4') #{title}
      block content
    script(src='https://code.jquery.com/jquery-3.4.1.slim.min.js' integrity='sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n' crossorigin='anonymous') script(src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js' integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo' crossorigin='anonymous') script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js' integrity='sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6' crossorigin='anonymous')

    span(class='navbar-text px-4') Welcome #{user.firstName}!
    form(class='form-inline pr-4' action='/user/logout' method='post')
      button(class='btn btn-sm btn-warning' type='submit') Logout
```
