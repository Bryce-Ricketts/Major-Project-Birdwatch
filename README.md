# Birdwatch Pro

This is a personal project designed to be a birdwatch list where you'd be able to store a list of your sightings.  Currently the only searchtype is by the name of the bird.
This is partly due to the limitations of the API I used, which will be listed below.

Any feedback would be greatly appreciated.  As this is my final major project as part of my Full Stack Web Development course, I am still not 100% on all the code written.

# Technologies used:

React
Express
PostgreSQL
JWT Authentication
eBird API[found here](https://documenter.getpostman.com/view/664302/S1ENwy59)
iNaturalist API[found here](https://www.inaturalist.org/pages/api%2Breference)

# Instructions to setup:

## Install frontend

npm install
npm run dev

## Install backend

cd server
npm install
npm start

# Screenshots of site

## Homepage

## Search

## Search Results

## Saved Sightings

## Login

## Example of invalid login details



## A breakdown of the technologies and frontend/backend:

Frontend:
React + React Router

Backend:
Express API with protected JWT routes

Database:
PostgreSQL relational schema

Authentication:
bcrypt password hashing + JWT tokens

External APIs:
eBird taxonomy/search
iNaturalist images
