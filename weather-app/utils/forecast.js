const forecast = async (latitude, longitude, callback) => {
  const weather_url = `http://api.weatherstack.com/current?access_key=1530b83fe8526c3b4389f299f5ac4142&query=${latitude},${longitude}`;

  // console.log(weather_url)

  let error, data;
  try {
    const response = await fetch(weather_url);
    if (!response.ok) {
      error = "Failed to get weather for requested area";
    }
    const resJson = await response.json();
    const temp = resJson.current.temperature;
    const feel = resJson.current.feelslike;
    const city = resJson.location.name;
    const time = resJson.location.localtime;
    data = {
      temp,
      feel,
      city,
      time,
    };
  } catch (e) {
    error = "Error: Cannot send request";
  }

  callback(error, data);
};

export default forecast;
