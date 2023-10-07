const apiKey = "6f63f29eca5536db563528704b986409";
const searchCity = document.querySelector(".city_search input");

let nameCity = document.createElement('div');
nameCity.setAttribute('class', 'nameCity_style');
document.body.append(nameCity);
let arrayHistory = [];

let searchCityBtn = document.querySelector(".city_search button");



searchCityBtn.addEventListener("click", () => {

  let divDelete = document.getElementById('content_style');

  if (divDelete != null) {
    let divBody = document.querySelector('.body_style');
    divBody.removeChild(divDelete);
  }
  let divContent5Days = document.getElementById('content5Days');

  if (divContent5Days != null) {
    let divBody = document.querySelector('.body_style');
    divBody.removeChild(divContent5Days);
  }

  let searchCityHunt = document.querySelector('.city_search input');
  searchCityBtn = searchCityHunt.value;

  let content = document.createElement('div');
  content.setAttribute('id', 'content_style');
  let p_city = document.createElement('p');
  p_city.setAttribute('class', 'city_style')
  p_city.innerHTML = searchCityBtn;

  content.append(p_city);
  document.body.append(content);

  let degryy = document.createElement('div');
  degryy.setAttribute('id', 'temp_style');
  content.append(degryy);
  let wind = document.createElement('div');
  wind.setAttribute('id', 'wind_style');
  degryy.append(wind);

  if (arrayHistory.length < 10) {
    let imgEnter = document.createElement('img');
    imgEnter.setAttribute('src', '../it/image/2.png');
    imgEnter.setAttribute('width', '20px');

    imgEnter.addEventListener('click', () => {
      let inputSearch = document.getElementById('inputId');
      inputSearch.value = cityHistory.textContent;
      let buttonAdd = document.getElementById('buttonId');
      console.log(buttonAdd);


      buttonAdd.click()
    })

    let divImgEnter = document.createElement('div');
    divImgEnter.setAttribute('class', 'divImg_style');
    nameCity.append(divImgEnter);
    divImgEnter.append(imgEnter);

    let cityHistory = document.createElement('p');


    divImgEnter.append(cityHistory);
    arrayHistory.push(cityHistory);
    let closed = document.createElement('img');
    closed.setAttribute('src', '../it/image/1.png')
    closed.setAttribute('width', '20px')
    cityHistory.setAttribute('class', 'history_style');
    cityHistory.innerText = searchCityBtn;
    cityHistory.append(closed);
    closed.setAttribute('class', 'history_style2')
    console.log(cityHistory.textContent);
    console.log(divImgEnter);


    closed.addEventListener("click", () => {
      cityHistory.parentElement.remove()
      arrayHistory.shift();
    })


  }

  else if (arrayHistory.length >= 10) {
arrayHistory.shift();
    let del = document.querySelector('.nameCity_style');
    console.log(del);
    del.removeChild(del.childNodes[0]);

   

    let imgEnter = document.createElement('img');
    imgEnter.setAttribute('src', '../it/image/2.png');
    imgEnter.setAttribute('width', '20px');

    imgEnter.addEventListener('click', () => {
      let inputSearch = document.getElementById('inputId');
      inputSearch.value = cityHistory.textContent;
      let buttonAdd = document.getElementById('buttonId');
      console.log(buttonAdd);
      searchCityBtn.click()
    })

    let divImgEnter = document.createElement('div');
    divImgEnter.setAttribute('class', 'divImg_style');
    nameCity.append(divImgEnter);
    divImgEnter.append(imgEnter);

    let cityHistory = document.createElement('p');


    divImgEnter.append(cityHistory);
    arrayHistory.push(cityHistory);


    let closed = document.createElement('img');
    closed.setAttribute('src', '../it/image/1.png')
    closed.setAttribute('width', '20px')
    cityHistory.setAttribute('class', 'history_style');
    cityHistory.innerText = searchCityBtn;
    cityHistory.append(closed);
    closed.setAttribute('class', 'history_style2')
    console.log(cityHistory.textContent);
    console.log(divImgEnter);


    closed.addEventListener("click", () => {
      cityHistory.parentElement.remove()
      arrayHistory.shift();
    })
 
  }
  searchWeather();
  return searchCityBtn;
});

async function searchWeather() {
  let response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchCityBtn + '&limit=1&appid=' + apiKey)

  let text = await response.json();
  let lat = (text[0].lat);
  let lon = (text[0].lon);

  let response2 = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric&lang=ru');
  let weather = await response2.json();
  let temperatura = Math.round(weather.main.temp);

  let temperat = document.getElementById('temp_style');

  let temp_meaning = document.createElement('p');

  if (temperatura > 0) {
    temp_meaning.innerHTML = '+' + temperatura + '&#8451;';

  }
  if (temperatura < 0) {
    temp_meaning.innerHTML = temperatura + '&#8451;';

  };

  temperat.append(temp_meaning);

  let weatherImage = document.createElement('img');
  let imageIcon = weather.weather[0].icon
  weatherImage.setAttribute('src', 'https://openweathermap.org/img/wn/' + imageIcon + '@2x.png');

  weatherImage.setAttribute('width', '100px');
  temperat.append(weatherImage);

  let pWeatherDesc = document.createElement('p');
  temperat.append(pWeatherDesc);
  let weatherDesc = weather.weather[0].description;
  pWeatherDesc.append(weatherDesc);

  let description = weather.weather[0].main;

  let wind = weather.wind.deg;


  let windBackground = document.createElement('div');
  windBackground.setAttribute('class', 'windBackground_style');
  temperat.append(windBackground);

  let windImage = document.createElement('img');
  windImage.setAttribute('src', '../it/image/pngegg (4).png');
  windImage.setAttribute('style', 'rotate:' + wind + 'deg');
  windImage.setAttribute('class', '.wind_style');
  windBackground.append(windImage);

  let response5day = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric&lang=ru');
  let weather5day = await response5day.json();

  let temp5Day = [];
  let divContent5Day = document.createElement('div');
  let textContent5Days = document.createElement('div');
  textContent5Days.setAttribute('class', 'textContent5Days_style');
  let pTextContent5Days = document.createElement('p');

  pTextContent5Days.innerText = "Средняя температура на ближайшие 5 суток для данного населенного пункта";

  divContent5Day.append(textContent5Days);
  textContent5Days.append(pTextContent5Days);
  divContent5Day.setAttribute('id', 'content5Days');
  document.body.append(divContent5Day);

  for (i = 0; i < 40; i++) {
    temp5Day.push({ date: weather5day.list[i].dt_txt.substring(0, 10), temp: weather5day.list[i].main.temp, name: 'temp' });
  };

  let div5Day = document.createElement('div');
  div5Day.setAttribute('class', 'div5day_style');
  divContent5Day.append(div5Day);

  var result1 = [];

  temp5Day.reduce(function (res, value) {
    if (!res[value.date]) {
      res[value.date] = { date: value.date, s: 0, num: 0 };
      result1.push(res[value.date])
    }
    res[value.date].s += value.temp;
    res[value.date].num += 1;
    return res;
  }, {});

  for (i = 0; i < result1.length; i++) {
    let divDay = document.createElement('div');
    let divDayName = document.createElement('div');
    divDayName.setAttribute('class', 'divDayName_style');
    divDay.setAttribute('class', 'divday_style');
    divDay.innerHTML = Math.round(result1[i].s / result1[i].num) + '&#8451;';

    divDayName.innerText = result1[i].date;
    div5Day.append(divDay);
    divDay.append(divDayName);

  }

}
