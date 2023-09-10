const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// Middleware for parse json 
app.use(bodyParser.json());

// Mount the route
app.use("/", require("./routes/performanceRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

