exports.handler = async (event) => {
    // Get lat and lon from URL parameters
  const lat = event.queryStringParameters.lat;
  const lon = event.queryStringParameters.lon;
  const apikey = process.env.API_KEY;
  
  try {
    // Use lat/lon endpoint instead of city name
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
    );
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather' })
    };
  }
}