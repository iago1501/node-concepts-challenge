const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  const likes = repositories[repositorieIndex].likes;

  repositorie = {
    id,
    url,
    title,
    techs,
    likes,
  };

  repositories[repositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  repositories.splice(repositorieIndex, 1);
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { type = "like" } = request.body;

  // repositories_new = repositories.map((repositorie) =>
  //   repositorie.id === id ? { ...repositorie, likes: repositorie.likes + 1 } : repositorie
  // );

  repositorieIndex = repositories.findIndex(
    (repositorie) => repositorie.id === id
  );

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: "Repositorie not found" });
  }

  repositorie = repositories.find((repositorie) => repositorie.id === id);

  repositorie = {
    ...repositorie,
    likes:
      type === "like"
        ? repositorie.likes + 1
        : repositorie.likes > 0
        ? repositorie.likes - 1
        : repositorie.likes,
  };
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

module.exports = app;
