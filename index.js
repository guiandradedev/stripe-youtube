require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index.ejs')
})
app.post('/checkout', async (req, res)=>{
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Node.js book",
                    // optional description of the product
                    // description: "lorem ipsum dolor",
                },
                unit_amount: 50 * 100 // price in cents (e.g., $50.00)
            },
            quantity: 1
        }],
        shipping_address_collection: {
            allowed_countries: ['BR']
        },
        mode: 'payment', // or subscription
        success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`, // redirect URL after successful payment
        cancel_url: `${process.env.BASE_URL}/cancel`, // redirect URL if the user cancels the payment
    })

    // This function creates a payment intent.
    // It generates a Stripe session and a payment link for the Stripe Checkout page.

    console.log(session)

    res.redirect(session.url)
})

app.get('/complete', async (req, res)=>{
    const result = Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { 
            expand: ['payment_intent.payment_method'] // specifies which details to expand in the response
        }),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ])
    console.log(JSON.stringify(await result)) // logs the session and line items details
    res.send("your payment was successful!")
})

app.get('/cancel', (req, res)=>{
    res.redirect('/')
})

app.listen(3000, ()=>{console.log("online!")})