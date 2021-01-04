curl https://api.DinoFlow.com/users \
-X POST \
-H "Authorization: PSQL connection key" \
-H "Content-Type: application/json" \
-d \

-   [Log In](#log-in) - `POST /api/session`
-   [Sign Up](#sign-up) - `POST /api/users`
-   [Log Out](#log-out) - `DELETE /api/session`
-   [Retrieve Single User](#retrieve-single-user) - `GET /api/users/:id`

### Sign-in Session ID API

```
[
    {

        "namespace": "DinoFlow",
        "key": "user_id",
        "type": "number",
        "value" :

    }

]
```

_To Update or Delete, change the router.Method_

### Routing ID data API

-   [Retrieve Question](#retrieve-question) - `GET /api/users/question/:id`
-   [Retrieve Answer](#retrieve-answer) - `GET /api/users/answer/:id`
-   [Upvote Answer](#upvote-answer) -`PUT /api/users/answer/:id`
-   [Downvote Anwer](#downvote-answer) - `PUT /api/users/answer/:id`
-   [Search Question](#search-question) - `GET /api/users/question`

```
[

    {

    }

]
```

### Routing ID Search API

-   [Retrieve ID](#retrieve-id) - `GET /api/users/:id`

### Routing ID data HTTP

#### /home

#### /register

#### /login
