// const express = require('express')
// const Stripe = require('stripe')
// require('dotenv').config()

// const stripe = Stripe(process.env.STRIPE_KEY)

// const router = express.Router()

// router.post("/create-checkout-session", async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [{
//             price_data: {
//               currency: 'inr',
//               product_data: {
//                 name: 'T-shirt',
//               },
//               unit_amount: 3000,
//             },
//             quantity: 4,
//           }],
//           mode: 'payment',

//           success_url: 'https://ecommerceappsite.herokuapp.com/checkout-success',
//           cancel_url: 'https://ecommerceappsite.herokuapp.com/cart',
//         })
      
//         res.send({url: session.url})

//   })

// module.exports = router

const express = require('express')
const Stripe = require('stripe')
require('dotenv').config()

const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

router.post("/create-checkout-session", async (req, res) => {

  const line_items = req.body.cartItems.map((item) => {
    return{
      // price_data: {
        //   currency: 'inr',
        //   product_data: {
          //     name: item.title,
          //     // images: [item.images],
          //     description: item.description ,
              
          //   },
          //   unit_amount: 120 * 100,
          // },
          // quantity: item.quantity,
          
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.title,
              // Images: [item.images],
              description: item.description,
              metadata: {
                id: item._id
              }
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }
      })
      
      // console.log([item.images])
      const session = await stripe.checkout.sessions.create({
        line_items,
          mode: 'payment',

          success_url: 'https://ecommerceappsite.herokuapp.com/checkout-success',
          cancel_url: 'https://ecommerceappsite.herokuapp.com/cart',
        })
      
        res.send({url: session.url})

  })

module.exports = router