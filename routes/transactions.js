const { Router } = require("express");
const Transactions = require("../models/Transactions");

const router = Router();

router.get("/", async (req, res) => {

  Transactions.find().then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(400).json({ message: err.message });
  })

});
router.post("/", async (req, res) => {

    const { value, data } = req.body;
    const newtransaction = new Transactions({ value, data });
    newtransaction.save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
0
});

module.exports = router;
