const {Schema,model} = require('mongoose')

const now = new Date().getTime()
const TransactionsSchema = new Schema({
    value:{
        type:Number,
        required:true
    },
    date:{
        type:Number,
        default:now
    }
})

const Transaction = model('Transaction',TransactionsSchema)

module.exports = Transaction