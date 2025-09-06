import yargs from "yargs";
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const argv = yargs(process.argv.slice(2)).parse();
const params = argv._;
const address = params[0];

console.log(address);

if (!address) {
  console.log("Please provide an address");
} else {
  geocode(address, (error, {latitude, longitude}) => {
    if (error) {
      return console.log(error);
    }

    forecast(latitude, longitude, (error, {city, time, temp, feel}) => {
      if (error) {
        return console.log(error);
      }

      console.log(`${city} at ${time}`);
      console.log(
        `It is currently ${temp} degrees outside, and feels like ${feel} degrees.`
      );
    });
  });
}

// const findCity = async (city) => {
//     await geocode(city, (error, data)=>{
//         if (error) {
//             console.error(error)
//         } else {
//             console.log(data)
//         }
//     })
// }
