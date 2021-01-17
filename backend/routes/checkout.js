const router = require('express').Router()
// const uuid = require('uuid')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

router.route('/create-checkout-session').post(async (req, res) => {
  console.log(req)
  const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: `Court Booking on ${req.body.date} at ${req.body.time} for ${req.body.duration}hrs`,
              images: ['https://d24lqeczfu7s1y.cloudfront.net/venue/meadowbank-park-tc/34c340d8-c2b3-45b7-a1a4-71f3b2854d1e.jpg'],
            },
            unit_amount: req.body.cost,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${api.baseUrl}/booking/success`,
      cancel_url: `${api.baseUrl}/booking/new`,
    });

      res.json({ id: session.id });
});

// router.route('/checkout-payment').post(async (req, res) => {
//   const { product, token } = req.body
//   console.log("PRODUCT ", product)
//   console.log("PRICE ", booking.price)
//   const idempontencyKey = uuid()

//   return stripe.customers.create({
//     email: token.email,
//     source: token.id
//   }).then(customer => {
//     stripe.charges.create({
//       amount: booking.price * 100,
//       currency: 'aud',
//       customer: customer.id,
//       receipt_email: token.email  
//     }, {idempontencyKey})
//   })
//   .then(result => res.status(200).json(result))
//   .catch(err => console.log(err))
// })

module.exports = router