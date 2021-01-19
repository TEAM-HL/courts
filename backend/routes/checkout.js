const router = require('express').Router()
// const uuid = require('uuid')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

router.route('/create-checkout-session').post(async (req, res) => {
  console.log("hit create checkout endpoint ", req)
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
            unit_amount: req.body.cost * 100,
          },
          quantity: 1,
        },
     ],
      mode: 'payment',
      success_url: `http://localhost:3000/booking/success`,
      cancel_url: `http://localhost:3000/booking/cancel`,
    })

    res.json({ id: session.id });
})


module.exports = router