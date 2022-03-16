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
  const transaction = new Transactions({ value, data });
  transaction.save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const transaction = Transactions.findById(id)
  if (!transaction) {
    res.status(404).json({ message: 'transaction not found' })
  }
  transaction.remove()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})


module.exports = router;
