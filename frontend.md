User-facing routes

## `/login`

Log In Page

### API Routes Used

-   [`POST /api/session`](./API-Documentation#sign-up)

## `/signup`

Sign Up page

### API Routes Used

-   [`POST /api/users`](./API-Documentation#sign-up)

## `/home`

Authentication required to access

Navigation bar, list of chirps, chirp creation form, chirp edit form, chirp
delete button, chirp like/unlike button

### API Routes Used

-   [`GET /api/chirps`](./API-Documentation#retrieve-all-chirps)
-   [`POST /api/chirps`](./API-Documentation#create-a-chirp)
-   [`POST /api/chirps/:id/likes`](./API-Documentation#like-a-chirp)
-   [`DELETE /api/chirps/:id/likes`](./API-Documentation#unlike-a-chirp)
-   [`PUT /api/chirps/:id`](./API-Documentation#edit-a-chirp)
-   [`DELETE /api/chirps/:id`](./API-Documentation#delete-a-chirp)

## `/chirps/:id`

Authentication required to access

Navigation bar, details for specified chirp, chirp edit form, chirp
delete button, chirp like/unlike button

### API Routes Used

-   [`GET /api/chirps`](./API-Documentation#retrieve-a-single-chirp)
-   [`POST /api/chirps/:id/likes`](./API-Documentation#like-a-chirp)
-   [`DELETE /api/chirps/:id/likes`](./API-Documentation#unlike-a-chirp)
-   [`PUT /api/chirps/:id`](./API-Documentation#edit-a-chirp)
-   [`DELETE /api/chirps/:id`](./API-Documentation#delete-a-chirp)
