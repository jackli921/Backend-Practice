const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/movieApp')
    .then(()=>{
        console.log("Connection established")
    })
    .catch(err=>{
        console.log("Error occurred")
        console.log(err)
    })


const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema)


// const ThreeHundred = new Movie({title:"300", year:1951, score: 5.9, rating:'R'})

Movie.insertMany( [
  {title: "The Shawshank Redemption", year: 1994, score: 9.3, rating: 'R'},
  {title: "The Godfather", year: 1972, score: 9.2, rating: 'R'},
  {title: "The Dark Knight", year: 2008, score: 9.0, rating: 'PG-13'},
  {title: "The Matrix", year: 1999, score: 8.7, rating: 'R'}
])
    .then(data =>{
        console.log("IT WORKED")
        console.log(data)
    })