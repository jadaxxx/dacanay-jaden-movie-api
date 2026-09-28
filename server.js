const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let movies = [
  { id: 1, title: "Interstellar", genre: "Science Fiction", year: 2014 },
  { id: 2, title: "Avengers: Endgame", genre: "Action", year: 2019 },
  { id: 3, title: "Coco", genre: "Animation", year: 2017 }
];
let nextId = 4;

app.get("/api/movies", (req, res) => res.json(movies));

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id === Number(req.params.id));
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
});

app.post("/api/movies", (req, res) => {
  const { title, genre, year } = req.body;
  if (!title || !genre || !year)
    return res.status(400).json({ error: "title, genre and year are required" });
  const movie = { id: nextId++, title, genre, year: Number(year) };
  movies.push(movie);
  res.status(201).json(movie);
});

app.listen(3000, () => console.log("http://localhost:3000"));
