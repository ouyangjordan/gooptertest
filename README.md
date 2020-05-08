# Goopter Report

# Video demo

https://photos.app.goo.gl/QVDDNohUmuePMVzYA

## Source code overview:

The basic project flow is as follows:

Landing page is localhost:3000/login. From there the user has the account login pre filled for ease of testing. The styling done for both pages is done in bootstrap.

Most of the source code is located in goopter/src/containers

The code for the login page is goopter/src/containers/Login.js

The code for the user page is goopter/src/containers/UserPage.js

I used Jquery ajax request syntax for the Oauth requests because that was the syntax provided in the Oauth NPM library README.

## Problems encountered on test:

I would say the biggest problems were figuring out the ajax request syntax. This is because there was a lot of trial and error to figure out what the server side would accept regarding contentType, headers, authorization etc. I fixed these by looking at online documentation for Oauth 1 and jquery syntax, as well as a lot of testing different combinations on postman to see what would work.

## How to run configuration:

1.	Unzip the project 
2.	In Terminal, “cd” into directory goopter/goopter e.g. run cmd “cd goopter/goopter”
3.	Run command “npm start”
Application should open localhost:3000
4.	Enter localhost:3000/login 
5.	You are now at the application

## Time spent on test:

I spent around 6-8 hours on this test during today and yesterday. About half of the time was spend figuring out basic syntax of oauth and json parsing and Jquery requests – (e.g string, contentType fields, Jquery syntax etc. very finnicky details). The overall project idea did not take too much time to complete.
