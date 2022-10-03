let locationCountry = document.querySelector(".locationCountry")
    forecastTodayDegree = document.querySelector(".forecastTodayDegree")
    todayIcon = document.querySelector(".today-icon")
    todayDate = document.querySelector(".todayDate")
    stateToday = document.querySelector(".stateToday")
    upadted = document.querySelector(".upadted")
    humidity = document.querySelector(".humidity")
    wind = document.querySelector(".wind")
    visibility = document.querySelector(".visibility")
    searchBar = document.querySelector(".searchBar")
    reloadicon = document.querySelector(".reloadicon")
    imgs = '';


  

let responseData
let date = new Date()
weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
monthName = ['January','February','March','April','May','June','July','August','September','October','Novmber','December'];


async function getWeather(currentCity = "cairo"){
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6f36647865554305a9e12939221106&q=${currentCity}&days=3&aqi=no&alerts=no`)
    responseData = await apiResponse.json()
    displayTodayForecast()
    displayNextdayForecast()
}
getWeather()


function displayTodayForecast(){
    imgs = responseData.current.condition.icon.split("/")[5]
    if(imgs === "night"){
      document.body.style.backgroundImage = "url('./imges/wallpaperflare.com_wallpaper\ \(12\).jpg')"
      // document.body.style.backgroundColor = "#454579"
      searchBar.style.backgroundColor = "transparent"
      searchBar.style.color = "#fff";
    }else{
      document.body.style.backgroundImage = "url('./imges/wallpaperflare.com_wallpaper\ \(8\).jpg')";
      //document.body.style.backgroundColor = "#8DB9F2"
      searchBar.style.backgroundColor = "#fff";
      searchBar.style.color = "#212529";
    }
    
    
    locationCountry.innerHTML = `${responseData.location.name}, ${responseData.location.country}`
    todayIcon.setAttribute("src" , `https:${responseData.current.condition.icon}`)
    forecastTodayDegree.innerHTML = responseData.current.temp_c
    todayDate.innerHTML = `${weekDays[date.getDay()]} ${date.getDate()} ${monthName[date.getMonth()]} ${date.getFullYear()}`
    stateToday.innerHTML = responseData.current.condition.text
    upadted.innerHTML = " Updated as of " + parseFloat(responseData.current.last_updated.slice(-6)) % 12 + responseData.current.last_updated.slice(-3) + `<i onclick="reloadPage()" class="reloadicon fa-solid ms-1 fs-6 fa-rotate-right text-white"></i>`
    humidity.innerHTML = `Humidity ${responseData.current.humidity}%`
    wind.innerHTML = `Wind ${responseData.current.wind_kph} km/h`
    visibility.innerHTML = `Visibility ${responseData.current.vis_km} km/h`
}





function displayNextdayForecast(){
    let cards =``
    for(let i =0; i < 2; i++){
        let nDay = responseData.forecast.forecastday[i+1].date
        let days = nDay.split("-")[2]
        cards += `<div class="col-md-4">
        <div class="card p-2">
          <h4 class="nextDay ms-3">${getNextDay(nDay)} ${days}</h4>
          <img class="text-start mb-2" src="https:${responseData.forecast.forecastday[i+1].day.condition.icon}" width="60px" alt="forecastNextDayIcon">
          <div class="maxDegreeNextDay d-flex  ms-3">
            <div class="d-flex"><h3 class="forecastNextDayDegree h4" title="Max Degree">${responseData.forecast.forecastday[i+1].day.maxtemp_c}</h3><h3><sup>o</sup></h3></div>
            <div class="d-flex"><h3 class="minDgree text-muted h6 m-0 ms-1 mt-2 " title="Min Degree">${responseData.forecast.forecastday[i+1].day.mintemp_c}<sup>o</sup></h3></div>
          </div>
          <div class="stateNextDay ms-3">${responseData.forecast.forecastday[i+1].day.condition.text}</div>
        </div>        
      </div>`
    }
   document.querySelector(".cards").innerHTML = cards
}


function getNextDay(apiNextDay){
  let days = new Date(apiNextDay)
  return weekDays[days.getDay()]
}

getNextDay()

searchBar.addEventListener("keyup",function(){
  getWeather(this.value)
})

function reloadPage(){
  upadted.innerHTML = " Updated as of " + parseFloat(responseData.current.last_updated.slice(-6)) % 12 + responseData.current.last_updated.slice(-3) + `<i class="fa-solid ms-1 fa-spin fa-rotate"></i>`
  window.location.reload()
}

window.addEventListener("load",function(){
  let loadingScreen = document.querySelector(".loadingScreen")
  loadingScreen.classList.add("loadingHidden")

  loadingScreen.addEventListener("transitionend",function(){
    loadingScreen.remove()
  })
})

// window.addEventListener("scroll",function(){
//   if(this.scrollY >= 35)
//   {
//     // document.body.style.backgroundColor = "black"
//     document.body.style.backgroundColor = "#000000"

//   }else{
//     document.body.style.transition = "0.5s"

//     if(imgs === "night"){
//       document.body.style.backgroundColor = "#454579"
//     }else{
//       document.body.style.backgroundColor = "#8DB9F2"
//     }
//   }
// })
