console.log('client side javascript file loaded')

const getweather = async (location) => {
    const response = await fetch(`https://psychic-chainsaw-54wv7jq77vjf4xx-3000.app.github.dev/weather?address=${location}`)
    const data = await response.json()
    return data
    // if (data.error){
    //     console.log(data.error)
    // } else {
    //     console.log(data)
    // }
}

console.log('uncomment to send fetch request')
// fn()

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', async (e)=>{
    e.preventDefault()

    message1.innerHTML = ""
    message2.innerHTML = "fetching data..."

    const location = search.value
    console.log('searching weather: ', location)
    const weather = await getweather(location)

    if (weather.error) {
        message1.innerHTML = ""
        message2.innerHTML = weather.error
    } else {
        message1.innerHTML = `current time: ${weather.time}`
        message2.innerHTML = `temparature: ${weather.temp}°C`
    }
})