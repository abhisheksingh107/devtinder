# DevTinder API

AuthRouter
 -Post /signup
 -Post /login
 -Post /logout

ProfileRouter
 -Get /profile/view
 -Patch /profile/edit
 -Patch /profile/forget

ConnectionRequestRouter
 -Post /request/send/interested/: userId
 -Post /request/send/ingore/: userId
 -Post /request/review/accepted/: requstId
 -Post /request/review/rejected/: requestId

UserRouter
 -Get /user/connection
 -Get /user/request/
 -Get /user/feed - Get the profile of all the users on the platform

status: ignore, interested, accepted, rejected
