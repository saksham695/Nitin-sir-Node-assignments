const express = require("express");
const route = express.Router();

const trainees = [
  { id: 1, name: "saksham" },
  { id: 2, name: "utkarsh" },
  { id: 3, name: "salman" },
  { id: 4, name: "paramjeet" },
];

function asyncMiddleware(handle) {
  return async (req, res, next) => {
    console.log("hello");
    try {
      await handle(req, res);
    } catch {
      console.log("Error", error.message);
      next(error);
    }
  };
}

route.get(
  "/",
  asyncMiddleware(async (req, res) => {
    res.send(trainees);
  })
);

route.post(
  "/",
  asyncMiddleware((req, res) => {
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

    res.send(course);
  })
);

route.put("/:traineeId", (req, res) => {
  console.log(req.params.traineeId);
  const course = trainees.find((c) => c.id === parseInt(req.params.traineeId));
  if (!course) {
    res.status(404);
    return res.send("Course with given id does not exist");
  }
  course.name = req.body.name;
  res.send(course);
});

route.delete("/:traineeId", (req, res) => {
  const course = trainees.find((c) => c.id === parseInt(req.params.traineeId));
  if (!course) {
    res.status(404);
    return res.send("Course with given id does not exist");
  }
  const index = trainees.indexOf(course);
  trainees.splice(index, 1);
  res.send(course);
});

route.get("/:traineeId", (req, res) => {
  const course = trainees.find((c) => c.id === parseInt(req.params.traineeId));
  if (!course) {
    res.status(400);
    return res.send("Course Not available");
  }
  res.send(course);
});

module.exports = route;
