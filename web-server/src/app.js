import forecast from "./utils/forecast.js";
import geocode from "./utils/geocode.js";

import path from "path";
import express from "express";
import hbs from "hbs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jon Ahn",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text.",
    name: "Jon Ahn",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jon Ahn",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address

  // if (!address) {
  //   return res.send({
  //     error: 'You must provide address'
  //   })
  // }

  geocode(address, (error, { latitude, longitude }={}) => {
    if (error) {
      // return res.send("<h1>Error: cannot get coordinates</h1>");
      return res.send({"error": "cannot get coordinates"});
    }

    forecast(latitude, longitude, (error, { city, time, temp, feel }={}) => {
      if (error) {
        // return res.send("<h1>Error: cannot get forecast</h1>");
        return res.send({"error": "cannot get forecast"});
      }

      res.send({
        'city': city,
        'time': time,
        'temp': temp,
        'feel': feel
      })
      // const msg = `<h2>${city} at ${time}</h2>
      // <p>It is currently ${temp} degrees outside, and feels like ${feel} degrees.</p>`;

      // console.log(msg);
      // res.send(msg);
    });
  });
});

app.get('/products', (req, res)=>{
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  } 
  console.log(req.query.search)
  res.send({'products':[]})
})

app.get('/help/*aa', (req, res) => {
  res.render('404', {
    title: "404",
    name: "Jon Ahn",
    not_found_message: `Help article not found: ${req.url}`
  })
});

app.get('/*aa', (req, res) => {
  res.render('404', {
    title: "404",
    name: "Jon Ahn",
    not_found_message: `Page not found: ${req.url}`
  })
});

app.listen(3000, () => {
  console.log("Server is up on http://localhost:3000");
});
