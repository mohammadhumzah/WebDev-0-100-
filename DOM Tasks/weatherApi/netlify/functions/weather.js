exports.handler = async (event) => {
  const city = event.queryStringParameters.city;
  const lat = event.queryStringParameters.lat;
  const long = event.queryStringParameters.lon;
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key missing from environment variables' })
    };
  }

  if (city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch weather' })
      };
    }
  } 
  else if (lat && long) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      return {
        statusCode: 200,
        body: JSON.stringify(data)
      };
    } catch (error) {
      console.error('Error fetching weather by lat/lon:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch weather' })
      };
    }
  }
  else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please provide either city or lat/lon' })
    };
  }
};