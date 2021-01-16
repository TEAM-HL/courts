const router = require('express').Router()

// create a new checkout session
router.route('/create-checkout-session').post(async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'aud',
              product_data: {
                name: `Court-Booking_${req.body.date}_no.${req.body.court}_${req.body.duration}hrs`,
                // images: ['https://i.imgur.com/EHyR2nP.png'],
              },
              unit_amount: req.body.cost,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: '/booking/success',
        cancel_url: '/booking',
      });

      res.json({ id: session.id });
    });

router.route('/sessions').get(async (req, res) => {

})

router.route('/sessions/:id').get(async (req, res) => {
    
})

module.exports = router