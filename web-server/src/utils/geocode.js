const geocode = async (address='Seoul', callback) => {
  const url = `https://geocode.maps.co/search?q=${encodeURIComponent(
    address
  )}&api_key=68ba8e305cbe4831917505vrjb7b183`;
  let error, data;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Response not OK: ${response.status}`);
      error = "Unable to find the location. Try another location.";
    }
    const jsonData = await response.json();

    data = {
      latitude: jsonData[0].lat,
      longitude: jsonData[0].lon,
      name: jsonData[0].display_name,
    };
  } catch (e) {
    error = "Unable to connect to location services!";
  }

  callback(error, data);
};

export default geocode;
