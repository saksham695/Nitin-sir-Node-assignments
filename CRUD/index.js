const express = require("express");
const app = express();
const joi = require("@hapi/joi");
app.use(express.json());

const trainees = [
  { id: 1, name: "saksham" },
  { id: 2, name: "utkarsh" },
  { id: 3, name: "salman" },
  { id: 4, name: "paramjeet" },
];

app.get("/api/trainees", (req, res) => {
  res.send(trainees);
});

app.post("/api/trainees", (req, res) => {
  //   const schema = {
  //     name: joi.string().required(),
  //   };
  //   const result = joi.validate(req.body, schema);
  //console.log(result);
  if (!req.body.name) {
    res.status(400);
    res.send("Name is your required");
    return;
  }
  const course = {
    id: trainees.length + 1,
    name: req.body.name,
  };
  trainees.push(course);

  res.send(trainees);
});

app.put("/api/trainees/:traineeId", (req, res) => {
  console.log(req.params.traineeId);
  const course = trainees.find((c) => c.id === parseInt(req.params.traineeId));
  if (!course) {
    res.status(404);
    return res.send("Course with given id does not exist");
  }
  course.name = req.body.name;
  res.send(trainees);
});

app.delete("/api/trainees/:traineeId", (req, res) => {
  const course = trainees.find((c) => c.id === parseInt(req.params.traineeId));
  if (!course) {
    res.status(404);
    return res.send("Course with given id does not exist");
  }
  const index = trainees.indexOf(course);
  trainees.splice(index, 1);
  res.send(trainees);
});

app.get("/api/trainees/:traineeId", (req, res) => {
  const course = trainees.find((c) => c.id === parseInt(req.params.traineeId));
  if (!course) {
    res.status(400);
    return res.send("Course Not available");
  }
  res.send(course);
});
app.listen(3002, () => {
  console.log("Server is up on port 3002");
});
