let cityCurrentWeather = [];
let cityFiveDayWeather = [];
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const findToday = (aUnixStamp, fiveDayData) => {
  console.log('finding today!');
  // console.log(fiveDayData); //along for the ride

  //Convert the UNIX stamp that was generated on button click to
  //day of the week and (in loop in addFiveDayWeatherDataToArray function)
  // add to each five day weather object.
  const aDateAndTimeStamp = new Date(aUnixStamp);
  // const today = days[aDateAndTimeStamp.getDay()];
  const todayNumber = Number(aDateAndTimeStamp.getDay());
  addFiveDayWeatherDataToArray(fiveDayData, todayNumber);
};

const addCurrentWeatherDataToArray = (currentData) => {
  console.log('adding current data to array!');
  // console.log(currentData);

  //Convert temp returned in Kelvin to F
  const fahrenheitFromKelvin = Math.floor(currentData.main.temp / 3.493);
  //Create current weather object
  const newCityAndWeatherCurrentData = {
    city: currentData.name,
    temp: fahrenheitFromKelvin,
    description: currentData.weather[0].description,
    weatherIconSrc:
      'http://openweathermap.org/img/wn/' +
      currentData.weather[0].icon +
      '@2x.png',
  };

  //Push to array
  cityCurrentWeather.push(newCityAndWeatherCurrentData);

  //send data to a function to be rendered on the page
  renderCurrentWeather(cityCurrentWeather);
};

const renderCurrentWeather = (cityCurrentWeather) => {
  console.log('rendering current weather!');
  console.log(cityCurrentWeather);

  //Clear the existing data on the page
  $('#currentWeatherData').empty();
  //We know our array contains only 1 item for current weather, so no loop is necessary
  let weather = cityCurrentWeather[0];
  //Prepare handlebars template
  const source = $('#current-weather-template').html();
  const template = Handlebars.compile(source);
  const weatherHTML = template(weather);
  //Push data to handlebars template, clear entry form.
  $('#currentWeatherData').append(weatherHTML);
  $('#cityName').val('');
};

const addFiveDayWeatherDataToArray = (fiveDayData, todayNumber) => {
  console.log('adding five day data to array!');
  // console.log(today);
  for (let i = 0; i < fiveDayData.list.length; i++) {
    //convert the imported date-time stamp to a day of the week
    const dateLongFormatText = new Date(fiveDayData.list[i].dt_txt);
    const dayOfTheWeekLong = days[dateLongFormatText.getDay()];
    const dayNumberOfTheWeek = Number(dateLongFormatText.getDay());

    //Convert temp returned in Kelvin to F
    const fahrenheitFromKelvinFiveDay = Math.floor(
      fiveDayData.list[i].main.temp / 3.493
    );

    // add brief weather description
    const briefWeatherDesc = fiveDayData.list[i].weather[0].main;

    const newCityAndWeatherFiveDay = {
      weekdayNumber: dayNumberOfTheWeek,
      weekdayFull: dayOfTheWeekLong,
      temperature: fahrenheitFromKelvinFiveDay,
      briefDescription: fiveDayData.list[i].weather[0].main,
      weatherIcon: fiveDayData.list[i].weather[0].icon,
      weatherIconSrc:
        'http://openweathermap.org/img/wn/' +
        fiveDayData.list[i].weather[0].icon +
        '.png',
    };

    // Add the object to the five day weather array
    cityFiveDayWeather.push(newCityAndWeatherFiveDay);
  }
  console.log('outofloop');
  console.log(cityFiveDayWeather);
  renderFiveDayWeather(cityFiveDayWeather, todayNumber);
};

const renderFiveDayWeather = (aFiveDayWeatherArray, currentDayNumber) => {
  console.log('rendering five day weather!');

  var dayOne = aFiveDayWeatherArray.find(function (days) {
    if (currentDayNumber === 6) {
      return days.weekdayNumber === 0;
    } else {
      return days.weekdayNumber === currentDayNumber + 1;
    }
  });
  console.log(dayOne);

  var dayTwo = aFiveDayWeatherArray.find(function (days) {
    if (currentDayNumber === 5) {
      return days.weekdayNumber === 0;
    } else if (currentDayNumber === 6) {
      return days.weekdayNumber === 1;
    } else {
      return days.weekdayNumber === currentDayNumber + 2;
    }
  });
  console.log(dayTwo);

  var dayThree = aFiveDayWeatherArray.find(function (days) {
    if (currentDayNumber === 4) {
      return days.weekdayNumber === 0;
    } else if (currentDayNumber === 5) {
      return days.weekdayNumber === 1;
    } else if (currentDayNumber === 6) {
      return days.weekdayNumber === 2;
    } else {
      return days.weekdayNumber === currentDayNumber + 3;
    }
  });
  console.log(dayThree);

  var dayFour = aFiveDayWeatherArray.find(function (days) {
    if (currentDayNumber === 3) {
      return days.weekdayNumber === 0;
    } else if (currentDayNumber === 4) {
      return days.weekdayNumber === 1;
    } else if (currentDayNumber === 5) {
      return days.weekdayNumber === 2;
    } else if (currentDayNumber === 6) {
      return days.weekdayNumber === 3;
    } else {
      return days.weekdayNumber === currentDayNumber + 4;
    }
  });
  console.log(dayFour);

  var dayFive = aFiveDayWeatherArray.find(function (days) {
    if (currentDayNumber === 2) {
      return days.weekdayNumber === 0;
    } else if (currentDayNumber === 3) {
      return days.weekdayNumber === 1;
    } else if (currentDayNumber === 4) {
      return days.weekdayNumber === 2;
    } else if (currentDayNumber === 5) {
      return days.weekdayNumber === 3;
    } else if (currentDayNumber === 6) {
      return days.weekdayNumber === 4;
    } else {
      return days.weekdayNumber === currentDayNumber + 5;
    }
  });
  console.log(dayFive);
};

const fetchData = (cityName, todayUNIXStamp) => {
  console.log('fetching data!');
  // console.log(todayUNIXStamp); //along for the ride

  //Run first ajax GET method for current weather data
  $.ajax({
    method: 'GET',
    url:
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      cityName +
      '&appid=1223294114fb8930caf177ea3451f02c',
    dataType: 'json',
    success: function (currentData) {
      //If successful, send results to a function that will add them
      //to a current weather array
      addCurrentWeatherDataToArray(currentData);
      //If successful, retrieve five day forecast
      $.ajax({
        method: 'GET',
        url:
          'https://api.openweathermap.org/data/2.5/forecast?q=' +
          cityName +
          '&appid=1223294114fb8930caf177ea3451f02c',
        dataType: 'json',
        success: function (fiveDayDataReturned) {
          console.log('successfully retrieved five day data!');
          //decode unix stamp for today before processing data
          findToday(todayUNIXStamp, fiveDayDataReturned);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert('Unable to retrieve 5-day forecast for this city');
        },
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(
        'Please enter a city name with correct spelling and spacing. \nYou can use upper or lower case.'
      );
    },
  });
};

$('.search').on('click', function () {
  //clear out existing arrays and displayed data
  cityCurrentWeather = [];
  cityFiveDayWeather = [];
  $('#currentWeatherData').empty();
  $('#fiveDayWeatherData').empty();
  console.log('clicked');
  const todayUNIXStamp = Date.now();
  const userInputCity = $('#cityName').val();
  //send both values to fetchData function (todayUNIXstamp is along for the ride)
  fetchData(userInputCity, todayUNIXStamp);
});

// https://api.openweathermap.org/data/2.5/forecast?q=durham&appid=1223294114fb8930caf177ea3451f02c
