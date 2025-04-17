require('dotenv').config()
const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const cors = require('cors'); // Import the cors package

const app = express()
app.use(cors());

app.use(express.json())

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index.ejs', { products })
})
app.post('/checkout', async (req, res)=>{
    const { items } = req.body
    const lineItems = items.map(item => {
        return {
            price_data: {
                currency: item.currency,
                product_data: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                },
                unit_amount: item.unit_price * 100
            },
            quantity: item.quantity
        }
    }
    )
    console.log(lineItems)
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        // line_items: [{
        //     price_data: {
        //         currency: 'usd',
        //         product_data: {
        //             name: "Node.js book",
        //             // optional description of the product
        //             // description: "lorem ipsum dolor",
        //         },
        //         unit_amount: 50 * 100 // price in cents (e.g., $50.00)
        //     },
        //     quantity: 1
        // }],
        shipping_address_collection: {
            allowed_countries: ['BR']
        },
        mode: 'payment', // or subscription
        success_url: `${req.headers.origin}/complete?session_id={CHECKOUT_SESSION_ID}`, // redirect URL after successful payment
        cancel_url: `${req.headers.origin}/cancel`, // redirect URL if the user cancels the payment
    })

    // // This function creates a payment intent.
    // // It generates a Stripe session and a payment link for the Stripe Checkout page.

    // console.log(session)

    return res.status(200).json({
        id: session.id,
        url: session.url
    })

    // res.redirect(session.url)
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

app.listen(3001, ()=>{console.log("online!")})