const { Router } = require("express");
const Transactions = require("../models/Transactions");

const router = Router();

router.get("/", async (req, res) => {
  // try {
  //   const transactions = await Transactions.find();
  //   if (!transactions) {
  //     throw new Error("no transactions found");
  //   }
  //   res.status(200).json(transactions);
  // } catch (err) {
  //   res.status(400).json({ message: err.message });
  // }
  Transactions.find().then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(400).json({ message: err.message });
  })


});

router.post("/", async (req, res) => {
  // const { value, data } = req.body;
  // const newtransaction = new Transactions({ value, data });

  // try {
  //   const transaction = await newtransaction.save();
  //   if (!transaction) {
  //     throw new Error("no transaction found");
  //   }
  //   res.status(200).json(transaction);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
    const { value, data } = req.body;
    const newtransaction = new Transactions({ value, data });
    newtransaction.save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });

});

module.exports = router;
