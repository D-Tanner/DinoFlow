### Routing ID data API

-   [Retrive Question](#retrieve-question) - `GET /api/users/question/:id`
-   [Retrive Answer](#retrieve-answer) - `GET /api/users/answer/:id`
-   [Upvote Answer](#upvote-answer) -`PUT /api/users/answer/:id`
-   [Downvote Anwer](#downvote-answer) - `PUT /api/users/answer/:id`
-   [Search Question](#search-question) - `GET /api/users/question`

## Users

Endpoints for the `Users` resource:

-   [Log In](#log-in) - `POST /api/session`
-   [Sign Up](#sign-up) - `POST /api/users`
-   [Log Out](#log-out) - `DELETE /api/session`
-   [Retrieve Single User](#retrieve-single-user) - `GET /api/users/:id`

---

### Log In

```
const {User} = require('../models')
async function all(){
    const users = await User.findAll({
        order:['name'],
        include: ['']
    })
    return users.map(person =>{
        id: person.id,
        name: person.name
        email: person.email
        href: `/users/${person.id}`
    })
}
```

Logs in an existing user

### Questions

```
const {Questions} = require('../models')
async function all(){
    const users = await User.findAll({
        order:['name'],
        include: ['']
    })
    return users.map(person =>{
        id: person.id,
        name: person.name
        email: person.email
        href: `/users/${person.id}`
    })
}
```

### Answers

#### `POST /api/session`

#### Body Parameters

| Parameter    | Type     | Description                                  | Notes    |
| :----------- | :------- | :------------------------------------------- | :------- |
| `credential` | `string` | `username` or `email` of the user logging in | required |
| `password`   | `string` | `password` of the user logging in            | required |

#### Returns

Returns a [current user object](#current-user-object) if successful and sets an
HTTP-only auth cookie, and returns an error otherwise.

---

### Sign Up

Creates a new user

#### `POST /api/users`

#### Body Parameters

| Parameter         | Type     | Description                         | Notes                        |
| :---------------- | :------- | :---------------------------------- | :--------------------------- |
| `username`        | `string` | Desired `username` of the new user  | required                     |
| `email`           | `string` | Desired `email` of the new user     | required                     |
| `password`        | `string` | Desired `password` of the new user  | required                     |
| `confirmPassword` | `string` | Repeated `password` of the new user | required, same as `password` |

#### Returns

Returns a [current user object](#current-user-object) if successful and sets an
HTTP-only auth cookie, and returns an error otherwise.

---

### Log Out

Logs out the current user, **requires authentication with a cookie**

#### `DELETE /api/session`

#### Returns

Returns a [success message](#success-message) and remove the HTTP-only auth
cookie if successful, and returns an error otherwise.

---

### Retrieve Single User

#### `GET /api/users/:id`

#### Path Parameters

| Parameter | Type | Description      | Notes    |
| :-------- | :--- | :--------------- | :------- |
| `id`      | `ID` | `id` of the user | required |

#### Returns

Returns a [user object](#user-object) if successful, and returns an error
otherwise.

---

## Questions

Endpoints for the `Questions` resource:

-   [Retrieve All Questions](#retrieve-all-questions) - `GET /api/questions`
-   [Retrieve a Single Question](#retrieve-a-single-question) - `GET /api/question/:id`
-   [Create a Questions](#create-a-question) - `POST /api/question`

---

### Retrieve All Questions

Retrieves all the questions

#### `GET /api/questions`

#### Query Parameters

Filters

| Parameter | Type     | Description                                                           | Notes                               |
| :-------- | :------- | :-------------------------------------------------------------------- | :---------------------------------- |
| `limit`   | `number` | `limit` of how many questions can be retrieved at one time            | optional, default of 20, max of 100 |
| `cursor`  | `number` | a `cursor` for use in pagination, starting point of the list returned | optional                            |

#### Returns

Returns an array of [question object](#question-object)s if successful, and returns
an error otherwise

---

### Retrieve a Single Question

Retrieves a single question with the specified id

#### `GET /api/question/:id`

#### Path Parameters

| Parameter | Type | Description                      | Notes    |
| :-------- | :--- | :------------------------------- | :------- |
| `id`      | `ID` | `id` of the question to retrieve | required |

#### Returns

Returns a [question object](#question-object) if successful, and returns an error
otherwise.

---

### Create a question

Creates a new question for the current user, **requires authentication with a
cookie**

#### `POST /api/questions`

#### Body Parameters

| Parameter |        Type        | Description                                  | Notes    |
| :-------- | :----------------: | :------------------------------------------- | :------- |
| `body`    | non-empty `string` | message `body` of the question being created | required |

#### Returns

Returns the created [question object](#question-object) if successful, and returns an
error otherwise.

---

### Edit a question

Edits an existing question of the current user, **requires authentication with a
cookie**

#### `PUT /api/questions/:id`

#### Path Parameters

| Parameter | Type | Description                  | Notes    |
| :-------- | :--- | :--------------------------- | :------- |
| `id`      | `ID` | `id` of the question to edit | required |

#### Body Parameters

| Parameter |        Type        | Description                                 | Notes    |
| :-------- | :----------------: | :------------------------------------------ | :------- |
| `body`    | non-empty `string` | message `body` of the question being edited | required |

#### Returns

Returns the edited [question object](#question-object) if successful, and returns an
error otherwise.

---

### Delete a question

Deletes an existing question of the current user, **requires authentication with a
cookie**

#### `DELETE /api/questions/:id`

#### Path Parameters

| Parameter | Type | Description                  | Notes    |
| :-------- | :--- | :--------------------------- | :------- |
| `id`      | `ID` | `id` of the question to edit | required |

#### Returns

Returns a [success message](#success-message) if successful, and returns an
error otherwise.

---

## Likes

Endpoints for the `Likes` resource:

-   [Like a question](#like-a-question) - `POST /api/questions/:id/likes`
-   [Unlike a question](#unlike-a-question) - `DELETE /api/questions/:id/likes`

---

### Like a question

Creates a like between the current user and the specified question that the user
has not liked yet and did not create, **requires authentication with a cookie**

#### `POST /api/questions/:id/likes`

#### Path Parameters

| Parameter | Type | Description                  | Notes    |
| :-------- | :--- | :--------------------------- | :------- |
| `id`      | `ID` | `id` of the question to like | required |

#### Returns

Returns the question liked as a [question object](#question-object) with the `liked` key
set to `true` if successful, and returns an error otherwise.

---

### Unlike a question

Deletes a like between the current user and the specified question that the user
has liked and did not create, **requires authentication with a cookie**

#### `DELETE /api/questions/:id/likes`

#### Path Parameters

| Parameter | Type | Description                    | Notes    |
| :-------- | :--- | :----------------------------- | :------- |
| `id`      | `ID` | `id` of the question to unlike | required |

#### Returns

Returns the question unliked as a [question object](#question-object) with the `liked`
key set to `false` if successful, and returns an error otherwise.

---

## Objects

### Current User Object

```json
{
    "id": 1,
    "username": "zagreus",
    "email": "zagreus@bluebird.com"
}
```

### User Object

```json
{
    "id": 1,
    "username": "zagreus"
}
```

### Success Message

```json
{
    "message": "success"
}
```

### question Object

```json
{
    "id": 41,
    "question": "Hello World!",
    "userId": 1,
    "createdAt": "2020-10-18T20:26:34.256Z",
    "updatedAt": "2020-10-18T20:26:34.256Z",
    "User": {
        "id": 1,
        "username": "zagreus"
    },
    "upVotes": 24,
    "": false
}
```
