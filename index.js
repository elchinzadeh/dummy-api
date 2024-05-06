const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Controller = require('./controller')


const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.post('/registration', Controller.registration)
// app.post('/login', Controller.login)
// app.get('/logout', Controller.logout)
// app.get('/profile', Controller.profileGetInfo)
// app.put('/profile', Controller.profileUpdate)

app.get('/product', Controller.productGetAll)
app.get('/product/bestseller', Controller.productGetBestsellers)
app.get('/product/:id', Controller.productGetById)
app.post('/product', Controller.productInsert)
app.put('/product/:id', Controller.productUpdate)
app.delete('/product/:id', Controller.productDelete)
app.get('/order', Controller.orderGetAll)
app.patch('/order/:id', Controller.orderUpdate)
app.get('/pricing', Controller.pricingGetAll)
app.get('/team', Controller.teamGetAll)

app.listen(9090, () => {
    console.log('Server started')
})