console.log("Front is running");

//Install express server
const express = require("express");
const path = require("path");

const app = express();

//Serve only the static files from the dist directory
app.use(express.static("./dist/Maintenance"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/Maintenance" })
);

const host = "0.0.0.0";

app.listen(process.env.PORT || 3555, () => {
  console.log("App listening on port 3555!");
});
