const express = require('express')
const app = express();
const cors = require('cors')

const options = [
    cors({
        origin: '*',
        methods: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
];

app.use(options);

const hotels = require('./data/hotel.json');
const destinations = require('./data/destinations.json');
const port = process.env.PORT || 3000



app.get('/', (req, res) => {
    res.send({ server: 'travel guru' })
})
app.get('/destinations', (req, res) => {
    res.send(destinations)
})
app.get('/hotel', (req, res) => {
    res.send(hotels)
})

app.get('/destinations/:id', (req, res) => {
    const id = req.params.id;
    const destination = destinations.find(destination => destination.id === id) || { error: 'not found' };
    res.send(destination);
})

app.get('/search/:name', (req, res) => {
    const name = req.params.name;
    const similarNameHotels = hotels.filter(hotel => {
        return hotel.location.toLowerCase().includes(name.toLowerCase())
    });
    // console.log(name);
    res.send(similarNameHotels);
})

app.get('/hotel/details/:id', (req, res) => {
    const id = req.params.id;
    const hotel = hotels.find(hotel => hotel.id === id);
    res.send(hotel);
    console.log(id);
})

app.listen(port, () => {
    console.log(`travel-guru-server running on port ${port}`);
})
