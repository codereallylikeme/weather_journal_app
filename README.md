# \*\* Weather Journal App with Asynchronous javascript

### This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI in a Weather Journal application.

## Project Files

### the project files is divided into two files
- server.js
- website/app.js,index.html and style.css

## Setting up project environment
-make sure that node js is install locally in your machine
- then install various packages 
1. Express, 
2.Body-Parser,
3.Cors from the terminal 

## About the Project
- Acquire API credentials from OpenWeatherMap website. Use your credentials and the base url to create global variables at the top of your app.js code.
- Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
- Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
- Inside that callback function call your async GET request with the parameters:
- base url
- user zip code
- personal API key
