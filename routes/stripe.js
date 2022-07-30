const express = require('express')
const Stripe = require('stripe')
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
              currency: 'inr',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 3000,
            },
            quantity: 4,
          }],
          mode: 'payment',

          success_url: '/checkout-success',
          cancel_url: '/cart',
        })
      
        res.send({url: session.url})

  })

module.exports = router