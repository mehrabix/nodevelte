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
      switch (typeof (err.errors.value.value)) {
        case "string":
          res.status(400).json({ message: 'مقدار نمیتواند از نوع رشته باشد' });
          break;
        default:
          res.status(400).json({ message: 'مقدار نمیتواند خالی باشد' });
      }
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
