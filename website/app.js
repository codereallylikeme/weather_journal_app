// Global Variables
const api_key = 'Api key goes here';
const baseURL =
  'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

// Event listener to add function to existing HTML DOM element
const myForm = document.getElementById('myForm');
const submitBtn = document
  .getElementById('generate')
  .addEventListener('click', performAction);
const zipError = document.querySelector('.warning');
/* Function called by event listener */
async function performAction(e) {
  e.preventDefault();
  const content = document.getElementById('feelings').value;
  const zipCode = document.getElementById('zip').value;
  // checking for empty submission
  if (!zipCode) {
    zipError.innerHTML = 'Please give a valid zip code';
  } else {
    // otherwise
    // clear message
    zipError.innerHTML = '';
  }

  getWeather(baseURL, zipCode, api_key)
    //console.log(zipCode)
    .then((newEntry) => {
      postData('/add', {
        temp: Math.round(newEntry.main.temp),
        city: newEntry.name,
        country: newEntry.sys.country,
        description: newEntry.weather[0].description,
        date: newDate,
        content: content,
        icon: newEntry.weather[0].icon,
      }).then(function (newEntry) {
        myForm.reset();
        updateUI();
      });
    });
}
const getWeather = async (baseURL, zipCode, api_key) => {
  const response = await fetch(baseURL + zipCode + api_key);

  try {
    const newEntry = await response.json();
    console.log(newEntry);
    return newEntry;
  } catch (error) {
    console.log('error', error);
  }
};

// funtion Post route
const postData = async (url = '', newEntry = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEntry),
  });
  try {
    const newEntry = await response.json();
    console.log(newEntry);
    return newEntry;
  } catch (error) {
    console.log('error', error);
  }
};
// Dynamically updating the UI

const updateUI = async () => {
  const request = await fetch('/allData');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `Today date is ${allData.date}`;
    document.getElementById(
      'temp',
    ).innerHTML = `The Temperature is ${allData.temp}°C`;
    document.getElementById(
      'description',
    ).innerHTML = `The weather today is ${allData.description}`;
    document.getElementById(
      'city',
    ).innerHTML = `The city name is ${allData.city}`;
    document.getElementById(
      'country',
    ).innerHTML = `The country code is ${allData.country}`;
    document.getElementById('content').innerHTML = `I feel ${allData.content}`;
    document.getElementById(
      'icon',
    ).innerHTML = `<img src=" http://openweathermap.org/img/w/${allData.icon}.png" alt="Weather icon">`;
  } catch (error) {
    console.log('error', error);
  }
};
