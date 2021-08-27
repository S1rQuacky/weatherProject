let weatherData;

const $city = $('#name');
const $temp = $('#temp');
const $feels = $('#feels');
const $weather = $('#weather');
const $picture =$('#picture')
const $input = $('input[type="text"]')


function handleGetData(event) {
        event.preventDefault();
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?&appid=d1007f7c19990d9e52f83d2bd76b68d6&units=imperial&q=${$input.val()}`

        }).then(
            function(data){
                weatherData = data;
                render();
                // $city.text(data.name);
                // $temp.text(data.main.temp)
                // $feels.text(data.main.feels_like)
                //$weather.text(data.weather[0].description)
                $input.val("");

                console.log(data);

            },
            function(error){
                console.log('Unknown City', error);
            }
        );
        
    }

function capFirstLetter(capitalize){
    let reply = capitalize.split(" ").map((item) => {
        return item[0].toUpperCase() + item.slice(1);
    })
    return reply.toString().replace(",", " ");

}

function render() {
    $city.text(weatherData.name);
    $temp.text(weatherData.main.temp);
    $feels.text(weatherData.main.feels_like);
    $weather.text(capFirstLetter(weatherData.weather[0].description));
    let url = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    $picture.attr('src', url);
}

$('form').on('submit', handleGetData)