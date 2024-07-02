const express = require('express');
const cors = require('cors');
const app = express();
const similarityData = require('./movie_similarity.json');

app.use(cors());

app.get('/', (req, res) => {
  res.render('index', { data: Object.keys(similarityData) });
});

app.get('/recommend', (req, res) => {
  const title = req.query.title;
  try {
    const simScore = similarityData[title];
    const simMovies = Object.entries(simScore)
      .sort((a, b) => b[1] - a[1])
      .slice(1, 20)
      .map(([movie]) => movie);
    res.json({ rec_movie: simMovies });
  } catch (error) {
    res.json({ rec_movie: ['Movie not found'] });
  }
});

app.listen(80, () => {
  console.log('Server is running on port 80');
});
