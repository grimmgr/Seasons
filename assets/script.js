$(document).ready(function() {

    let searchList = [];
    let storedSearchList = JSON.parse(localStorage.getItem('searchList'));

    if (storedSearchList !== null) {
        searchList = storedSearchList;
    }

    function renderSearchHistory() {
        $('#search-history').empty();
        searchList.forEach(displaySearchLi);
    }
    
    function storeSearchList() {
        localStorage.setItem('searchList', JSON.stringify(searchList));
    }

    function displaySearchLi(city) {
        let newBtn = $('<button>').html('<i class="far fa-minus-square"></i>');
        newBtn.attr('data', city);
        let li = $('<li>').text(city);
        li.append(newBtn);
        $('#search-history').prepend(li);
    }

    function displayWeatherInfo(city) {
        
        const key = '218d194d34eecd3eb1e24c96560c3fd8';
        $('#user-input').val('');
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${ city }&units=imperial&appid=${ key }`;

        $.ajax({
            url: currentWeatherURL,
            method: 'GET'
          })
            .then(function(response) {

                if (response.weather[0].main === 'Clouds') {
                    if (response.weather[0].description === 'broken clouds' || response.weather[0].description === 'overcast clouds') {
                        $('.background').css('background-image', 'url(https://guidetoiceland.imgix.net/266446/x/0/screenshot-2015-11-03-10-47-18-png?auto=format%2Ccompress&fit=crop&crop=faces%2Cedges%2Ccenter&ixlib=react-8.6.4&h=718&q=50&dpr=2');
                        $('.background').css('background-position', '15% 25%');
                    } else {
                        $('.background').css('background-image', 'url(https://data.whicdn.com/images/308713850/original.jpg)');
                        $('.background').css('background-position', '70% 10%');
                    }
                }
                if (response.weather[0].main === 'Clear') {
                    $('.background').css('background-image', 'url(https://royalfashionist-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/justin-bieber-beach.jpg)');
                    $('.background').css('background-position', '100% 0%');
                }
                if (response.weather[0].main === 'Tornado' || response.weather[0].main === 'Smoke' || response.weather[0].main === 'Ash') {
                    $('.background').css('background-image', 'url(https://www.somagnews.com/wp-content/uploads/2020/01/e2-e1578172228338.jpg)');
                    $('.background').css('background-position', '65% 50%'); 
                }
                if (response.weather[0].main === 'Mist' || response.weather[0].main === 'Fog' || response.weather[0].main === 'Squall') {
                    $('.background').css('background-image', 'url(https://images.squarespace-cdn.com/content/v1/58a27afd59cc6801d3d5e1f0/1586898796050-JDU3PVZ3WA6DZHZKE0FR/ke17ZwdGBToddI8pDm48kHv-BBZLkWgT35PnkKtYKN57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQMp_NxvZwnttqPCbofJJFas4kgxdhTNOFn1rEZwesSIkYcyVZQN4nLrn8b9w1FffA/Screen%2BShot%2B2020-04-14%2Bat%2B2.10.52%2BPM.jpg)');
                    $('.background').css('background-position', '70% 50%'); 
                }
                if (response.weather[0].main === 'Snow') {
                    $('.background').css('background-image', 'url(https://i.pinimg.com/736x/eb/10/d9/eb10d90a3bab1729e291b9c0b2eb6fe2.jpg)');
                    $('.background').css('background-position', '0% 0%'); 
                 }
                if (response.weather[0].main === 'Rain') {
                    $('.background').css('background-image', 'url(https://hips.hearstapps.com/ell.h-cdn.co/assets/16/10/1457632544-gettyimages-514597992.jpg)');
                    $('.background').css('background-position', '0% 0%');
                }
                if (response.weather[0].main === 'Drizzle') {
                    $('.background').css('background-image', 'url(https://static.billboard.com/files/media/justin-bieber-amas-live-2015-billboard-1548-1024x677.jpg)');
                    $('.background').css('background-position', '40% 0%');
                }
                if (response.weather[0].main === 'Thunderstorm') {
                    $('.background').css('background-image', 'url(https://wgntv.com/wp-content/uploads/sites/5/2016/08/gettyimages-533596308.jpg?w=2560&h=1440&crop=1)');
                    $('.background').css('background-position', '60% 0%');
                }
                if (response.weather[0].main === 'Haze' || response.weather[0].main === 'Dust' || response.weather[0].main === 'Sand') {
                     $('.background').css('background-image', 'url(https://www.rollingstone.com/wp-content/uploads/2020/02/JustinBieber.jpg)');
                     $('.background').css('background-position', '65% 50%');
                }

                $('#city').text(response.name);
                $('#icon0').attr('src', `http://openweathermap.org/img/wn/${ response.weather[0].icon }@2x.png`);
                $('#description').text(response.weather[0].description);
                $('#temp').text(response.main.temp.toFixed(1));
                $('#humidity').text(response.main.humidity);
                $('#wind').text(response.wind.speed.toFixed(1));

                let lat = response.coord.lat;
                let lon = response.coord.lon;
                let oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${ lat }&lon=${ lon }&units=imperial&exclude=minutely,hourly&appid=${ key }`;
                $.ajax({
                    url: oneCallURL,
                    method: 'GET'
                })
                .then(function(response) {

                    $('#uv').text(response.current.uvi);

                    if (response.current.uvi < 3) {
                        $('#uv').css('background-color', 'rgba(164, 252, 152, 0.5)');
                    } else if (response.current.uvi >= 3 && response.current.uvi <= 7) {
                        $('#uv').css('background-color', 'rgba(253, 255, 134, 0.5)');
                    } else {
                        $('#uv').css('background-color', 'rgba(255, 152, 134, 0.5)');
                    }

                    for (let i = 1; i < 6; i++ ) {
                        $(`#date${ i }`).text(moment().add(i, 'days').format('dddd'));
                    }
                    for (let i = 1; i < 6; i++ ) {
                        $(`#temp${ i }`).text(response.daily[i].temp.day.toFixed(1));
                    }
                    for (let i = 1; i < 6; i++ ) {
                        $(`#humidity${ i }`).text(response.daily[i].humidity);
                    }
                    for (let i = 1; i < 6; i++ ) {
                        $(`#icon${ i }`).attr('src', `http://openweathermap.org/img/wn/${ response.daily[i].weather[0].icon }@2x.png`);
                    }
                    
                })
            }) 
    }
    
    let storedCity = JSON.parse(localStorage.getItem('city'));
   
    if (storedCity !== null) {
        displayWeatherInfo(storedCity);
    } else {
        displayWeatherInfo('Paradise');
    }

    renderSearchHistory();

    $('#search-btn').on('click', function(e) {
        e.preventDefault();
        let userInput = $('#user-input').val();
        localStorage.setItem('city', JSON.stringify(userInput));
        displayWeatherInfo(userInput);
        searchList.push(userInput);
        storeSearchList();
        displaySearchLi(userInput);
    });
    
    $('ul').on('click', 'button', function() {
        let btnData  = $(this).attr('data');
        let dataIndex = searchList.indexOf(btnData);
        searchList.splice(dataIndex,1);
        storeSearchList();
        $(this).parent().remove();
    });
    

});