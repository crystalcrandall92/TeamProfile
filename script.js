var express = require("express");
var path = require("path");
// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3001;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var reservations = [];
var waitlist = [];
//Routing
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
// Get data for all reservations
app.get("/api/tables", function(req, res) {
    res.json(data.reservations);
});
// Get data for waitlist
app.get("/api/waitlist", function(req, res) {
    res.json(data.waitlist);
});
app.get("/api/", function(req, res) {
    res.json(data);
});
// Create new reservation -- takes in JSON input
app.post("/api", function(req, res){
    var tableData = req.body;
    // console.log(tableData);
    tableData.routeName = tableData.name.replace(/\s+/g, "").toLowerCase();
});
app.listen(PORT, function () {
    console.log("Listening on PORT" + PORT);
});