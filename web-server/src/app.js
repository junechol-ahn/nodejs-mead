import express from 'express'
import forecast from '../../weather-app/utils/forecast.js'
import geocode from '../../weather-app/utils/geocode.js'

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicFolder = path.join(__dirname, '../public')

const app = express()

app.use(express.static(publicFolder))

// app.get('/help', (req, res)=>{
//   res.sendFile(path.join(publicFolder, 'help.html'))
// })

// app.get('/about', (req, res)=>{
//   res.sendFile(path.join(publicFolder, 'about.html'))
// })

app.get('/weather', (req, res)=>{
  const address = "Daegu"

  geocode(address, (error, {latitude, longitude}) => {
    if (error) {
      res.send('<h1>Error: cannot get coordinates</h1>')
      console.log(error);
      return
    }

    forecast(latitude, longitude, (error, {city, time, temp, feel}) => {
      if (error) {
        res.send('<h1>Error: cannot get forecast</h1>')
        console.log(error)
        return
      }

      const msg = `<h2>${city} at ${time}</h2>
      <p>It is currently ${temp} degrees outside, and feels like ${feel} degrees.</p>`

      console.log(msg)
      res.send(msg)
    });
  });

  // res.send('Weather page')
})

app.listen(3000, ()=>{
  console.log('Server is up on port 3000.')
})