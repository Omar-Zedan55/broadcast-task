var locationinput = document.querySelector(".locationinput");
var cityname = document.querySelector(".cityname");
var findbtnjs = document.querySelector(".findbtnjs");
var cele = document.querySelector(".cele");
var moon = document.querySelector(".moon");
var clear = document.querySelector(".clear");
var day2high = document.querySelector(".day2high");
var day2low = document.querySelector(".day2low");
var day3high = document.querySelector(".day3high");
var day3low = document.querySelector(".day3low");
var thirddaysun = document.querySelector(".thirddaysun");
var seconddaysun = document.querySelector(".seconddaysun");
var moonnext = document.querySelector(".moonnext");
var moonthird = document.querySelector(".moonthird");
var weekday = document.querySelector(".weekday");
var secondweekday = document.querySelector(".secondweekday");
var thirdweekday = document.querySelector(".thirdweekday");
var today_date = document.querySelector(".today_date");
defaultdata()
getgpslocation()
findbtnjs.addEventListener("click", function () {
    getdata();
    clearinput();
})
var parsed;
function getdata() {
    var x = new XMLHttpRequest();
    x.open("get", `https://api.weatherapi.com/v1/forecast.json?key=fedb1241a3814102a2963803240307&q=${locationinput.value}&days=3`)
    x.send();
    x.addEventListener("loadend", function () {
        if (x.status >= 200 && x.status < 300) {
            var data = x.response;
            parsed = JSON.parse(data)
            cityname.innerHTML = parsed.location.name;
            cele.innerHTML = `${parsed.current.temp_c}°C`;
            moon.setAttribute("src", `https:${parsed.current.condition.icon}`);
            clear.innerHTML = parsed.current.condition.text;
            var nextdaymaxtemp = parsed.forecast.forecastday[1].day.maxtemp_c
            var nextdaymintemp_c = parsed.forecast.forecastday[1].day.mintemp_c
            var thirddaymaxtemp = parsed.forecast.forecastday[2].day.maxtemp_c
            var thirddaymintemp = parsed.forecast.forecastday[2].day.mintemp_c
            var seconddaylogo = parsed.forecast.forecastday[1].day.condition.icon
            var thirddaylogo = parsed.forecast.forecastday[2].day.condition.icon
            moonnext.setAttribute("src", `https:${seconddaylogo}`);
            moonthird.setAttribute("src", `https:${thirddaylogo}`);
            var seconddaycondition = parsed.forecast.forecastday[1].day.condition.text
            var thirddaycondition = parsed.forecast.forecastday[2].day.condition.text
            seconddaysun.innerHTML = seconddaycondition;
            thirddaysun.innerHTML = thirddaycondition;
            day2high.innerHTML = `${nextdaymaxtemp}°C`
            day2low.innerHTML = `${nextdaymintemp_c}°`
            day3high.innerHTML = `${thirddaymaxtemp}°C`
            day3low.innerHTML = `${thirddaymintemp}°`
            var todaydate = parsed.forecast.forecastday[0].date;
            var datetext = formatDate(todaydate)
            // console.log(datetext);
            today_date.innerHTML = datetext;
        }
    })
}
function clearinput() {
    locationinput.value = ""
}

weekday.innerHTML = new Date().toLocaleString('en-us', { weekday: 'long' })
weekdays = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
var dayindex = weekdays.indexOf(new Date().toLocaleString('en-us', { weekday: 'long' }))

if (dayindex < 5) {
    secondweekday.innerHTML = weekdays[dayindex + 1];
    thirdweekday.innerHTML = weekdays[dayindex + 2];
} else if (dayindex >= 5) {
    secondweekday.innerHTML = weekdays[dayindex + 1];
    thirdweekday.innerHTML = weekdays[0];
} else if (dayindex >= 6) {
    secondweekday.innerHTML = weekdays[0];
    thirdweekday.innerHTML = weekdays[1];
}

function defaultdata() {
    var x = new XMLHttpRequest();
    x.open("get", `https://api.weatherapi.com/v1/forecast.json?key=fedb1241a3814102a2963803240307&q=aswan&days=3`)
    x.send();
    x.addEventListener("loadend", function () {
        if (x.status >= 200 && x.status < 300) {
            var data = x.response;
            parsed = JSON.parse(data)
            cityname.innerHTML = parsed.location.name;
            cele.innerHTML = `${parsed.current.temp_c}°C`;
            moon.setAttribute("src", `https:${parsed.current.condition.icon}`);
            clear.innerHTML = parsed.current.condition.text;
            var nextdaymaxtemp = parsed.forecast.forecastday[1].day.maxtemp_c
            var nextdaymintemp_c = parsed.forecast.forecastday[1].day.mintemp_c
            var thirddaymaxtemp = parsed.forecast.forecastday[2].day.maxtemp_c
            var thirddaymintemp = parsed.forecast.forecastday[2].day.mintemp_c
            var seconddaylogo = parsed.forecast.forecastday[1].day.condition.icon
            var thirddaylogo = parsed.forecast.forecastday[2].day.condition.icon
            moonnext.setAttribute("src", `https:${seconddaylogo}`);
            moonthird.setAttribute("src", `https:${thirddaylogo}`);
            var seconddaycondition = parsed.forecast.forecastday[1].day.condition.text
            var thirddaycondition = parsed.forecast.forecastday[2].day.condition.text
            seconddaysun.innerHTML = seconddaycondition;
            thirddaysun.innerHTML = thirddaycondition;
            day2high.innerHTML = `${nextdaymaxtemp}°C`
            day2low.innerHTML = `${nextdaymintemp_c}°`
            day3high.innerHTML = `${thirddaymaxtemp}°C`
            day3low.innerHTML = `${thirddaymintemp}°`
            var todaydate = parsed.forecast.forecastday[0].date;
            var datetext = formatDate(todaydate)
            // console.log(datetext);
            today_date.innerHTML = datetext;
        }
    })
}

function getgpslocation() {
    const successCallback = (position) => {
        var lat = position.coords.latitude; var lon = position.coords.longitude
        // console.log(lat, lon)
        getdatabylongandlat(lat, lon)
    };

    const errorCallback = (error) => {
        // console.error(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


}


function getdatabylongandlat(c, y) {
    var x = new XMLHttpRequest();

    x.open("get", `https://api.weatherapi.com/v1/forecast.json?key=fedb1241a3814102a2963803240307&q=${c},${y}&days=3`)
    x.send();
    x.addEventListener("loadend", function () {
        if (x.status >= 200 && x.status < 300) {
            var data = x.response;
            parsed = JSON.parse(data)
            cityname.innerHTML = parsed.location.name;
            cele.innerHTML = `${parsed.current.temp_c}°C`;
            moon.setAttribute("src", `https:${parsed.current.condition.icon}`);
            clear.innerHTML = parsed.current.condition.text;
            var nextdaymaxtemp = parsed.forecast.forecastday[1].day.maxtemp_c
            var nextdaymintemp_c = parsed.forecast.forecastday[1].day.mintemp_c
            var thirddaymaxtemp = parsed.forecast.forecastday[2].day.maxtemp_c
            var thirddaymintemp = parsed.forecast.forecastday[2].day.mintemp_c
            var seconddaylogo = parsed.forecast.forecastday[1].day.condition.icon
            var thirddaylogo = parsed.forecast.forecastday[2].day.condition.icon
            moonnext.setAttribute("src", `https:${seconddaylogo}`);
            moonthird.setAttribute("src", `https:${thirddaylogo}`);
            var seconddaycondition = parsed.forecast.forecastday[1].day.condition.text
            var thirddaycondition = parsed.forecast.forecastday[2].day.condition.text
            seconddaysun.innerHTML = seconddaycondition;
            thirddaysun.innerHTML = thirddaycondition;
            day2high.innerHTML = `${nextdaymaxtemp}°C`
            day2low.innerHTML = `${nextdaymintemp_c}°`
            day3high.innerHTML = `${thirddaymaxtemp}°C`
            day3low.innerHTML = `${thirddaymintemp}°`
            var todaydate = parsed.forecast.forecastday[0].date;
            var datetext = formatDate(todaydate)
            // console.log(datetext);
            today_date.innerHTML = datetext;
        }
    })
}

// هذا الجزء بمساعده gpt ****************
function formatDate(dateString) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // تقسيم التاريخ عند حدوث الخطوط "-"
    const parts = dateString.split('-');
    if (parts.length !== 3) {
        return 'Invalid Date';
    }

    // الحصول على يوم وشهر السنه
    const day = parseInt(parts[2], 10);
    const monthIndex = parseInt(parts[1], 10) - 1;

    // التأكد من أن الشهر واليوم صحيحين
    if (isNaN(day) || isNaN(monthIndex) || monthIndex < 0 || monthIndex >= months.length) {
        return 'Invalid Date';
    }

    // إعادة التاريخ المنسق
    return day + months[monthIndex].substring(0, 3);
}