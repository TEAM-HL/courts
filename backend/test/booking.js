//During the test the env variable is set to test
process.env.NODE_ENV = 'testing';

const Bookings = require('../models/booking');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET booking', () => {
    it('it should GET all the bookings', (done) => {
        chai.request(server)
            .get('/bookings')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(3);
            done();
        });
    });
});

describe('/POST booking', () => {
    it('it should not POST a booking without date', (done) => {
        let booking = {
            username: "test",
            time: "10:00",
            end: "11:00",
            duration: 1,
            court: 4,
            equipment: {
                canister: 3,
                racquet: 0,
                hopper: 2
            },
            cost: 110
        }
      chai.request(server)
          .post('/bookings/new')
          .send(booking)
          .end((err, res) => {
              console.log(res)
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body.should.have.property('errors'); //errors = false, success = false
                //res.body.errors.should.have.property('date');
                //res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });
});

describe('/GET/:id booking', () => {
    it('it should GET a booking by the given id', (done) => {
        let booking = new Bookings({username: "test", date: "22/01/2021", time: "10:00", end: "11:00", duration: 1, court: 4, equipment: {canister: 3, racquet: 0, hopper: 2}, cost: 110});
        booking.save((err, booking) => {
            chai.request(server)
            .get('/bookings/' + booking.id)
            .send(booking)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('username');
                res.body.should.have.property('date')
                res.body.should.have.property('time');
                res.body.should.have.property('end');
                res.body.should.have.property('duration');
                res.body.should.have.property('court');
                res.body.should.have.property('equipment');
                res.body.equipment.should.have.property('canister');
                res.body.equipment.should.have.property('racquet');
                res.body.equipment.should.have.property('hopper');
                res.body.should.have.property('cost');
                res.body.should.have.property('_id').eql(booking.id);
            done();
          });
        });
    });
});

describe('/DELETE/:id booking', () => {
    it('it should DELETE a booking given the id', (done) => {
        let booking = new Bookings({username: "test", time: "10:00", end: "11:00", duration: 1, court: 4, equipment: {canister: 3, racquet: 0, hopper: 2}, cost: 110})
        booking.save((err, booking) => {
              chai.request(server)
              .delete('/booking/' + booking._id)
              .end((err, res) => {
                    // res.should.have.status(200);
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('message').eql('Booking deleted');
                    // res.body.result.should.have.property('ok').eql(1);
                    // res.body.result.should.have.property('n').eql(1);
                done();
              });
        });
    });
});