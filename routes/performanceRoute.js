const express = require("express");
const router = express.Router();

let records = {
  running: [],
  cycling: [],
  swimming: [],
}

// If each events exceeds 10, remove the oldest record (FIFO) and push new record.
router.post("/save", (req, res) => {
  const { event, distance, time } = req.body;
  if (!event || !distance || !time) {
    return res.status(400).json({ message: "Invalid data !"});
  }

  if (records[event.toLowerCase()].length >= 10) {
    records[event.toLowerCase()].shift();
  }

  records[event.toLowerCase()].push({ event, distance, time });
  res.status(201).json({ message: "Data saved successfully", data:  { event, distance, time }});
});

// get all events performance data
router.get("/", (req, res) => {
  res.json({message: "All events performance data", data: records});
});

 // Delete all the performance records 
router.delete("/delete-all", (req, res) => {
  const initialRecords = {
    running: [],
    cycling: [],
    swimming: [],
  };

  records = initialRecords;

  res.status(200).json({ message: "All records deleted and data reset" });
});

module.exports = router;