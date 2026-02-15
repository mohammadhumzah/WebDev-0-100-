const inputField = document.getElementById("input")
const getBtn = document.getElementById("get")
const message = document.getElementById("card-message")
const detectLocation = document.getElementById("detect-location")

getBtn.addEventListener ('click', async () => {

    const cityName = inputField.value

    if(cityName === ""){
        alert("Enter a City name")
        return
    }


    try {

        const response = await fetch(`/.netlify/functions/weather?city=${cityName}`)
        const data = await response.json()      // Converts strings obj {"temp" : "8"} from weather.js back into js object 
        console.log(data)

        const temp = data.main.temp
        const feelsLike = data.main.feels_like
        message.innerText = `The Temperature today is ${temp} °C but it feels like ${feelsLike} °C `

        
    } catch (error) {
        console.error(error)
        alert("Couldn't get that for you")
        
    }


})


// Auto-Detect Location based on Lat and Long

detectLocation.addEventListener ('click', async () => {

        if(!navigator.geolocation) {
            alert("Location not supported by browser")
            return
        }

        navigator.geolocation.getCurrentPosition ( async function(position) {
            // extract coordinates
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            console.log(`Your lat is ${lat} and your long is ${long}`);


            try {
                const response = await fetch(`/.netlify/functions/weather?lat=${lat}&lon=${long}`);
                const data = await response.json();
                console.log(data);

                const temp = data.main.temp;
                const feelsLike = data.main.feels_like;
                message.innerText = `The Temperature today is ${temp} °C but it feels like ${feelsLike} °C `;
            } catch (error) {
                console.error(error);
                alert('Couldnt get that');
            }
        }, function(error) {
            alert('Enable Location');
            console.error(error);
        }
        );
    }

)
