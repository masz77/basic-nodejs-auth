const express = require("express");
const router = express.Router();
const { projects, ROLE } = require("../data");
const { authUser } = require("../basicAuth");

router.get("/", (req, res) => {
  res.json(projects);
});

router.get(
  "/:projectId",
  setProject,
  authUser,
  authToViewProject,
  (req, res) => {
    res.json(req.project);
  }
);

function setProject(req, res, next) {
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    res.status(404);
    return res.send("Project not found");
  }
  next();
}

function authToViewProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    return res.status(401).json({ msg: "not allowed to view project" });
  }

  next();
}

function canViewProject(user, project) {
  return user.role === ROLE.ADMIN || project.userId === user.id;
  // if (user.role === ROLE.ADMIN || projects.userId === user.id) {
  //   console.log(user.ROLE);
  //   console.log(user.id);
  //   console.log(project.userId);
  //   return true;
  // } else return false;
}

module.exports = router;
