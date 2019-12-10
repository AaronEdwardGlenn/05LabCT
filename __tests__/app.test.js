require('dotenv').config(); 
require('../lib/utils/connect')();
const mongoose = require('mongoose'); 
const request = require('supertest'); 
const app = require('../lib/app'); 

const Bear = require('../lib/models/bears'); 

describe('app routties', () => {

    beforeEach(() => {
        return mongoose.connection.dropDatabase(); 
    }); 

    afterAll(() => {
        return mongoose.connection.close(); 
    });

    it('creates my bear on POST', () => {
        return request(app)
        .post('/bears')
        .send({Species: 'Black', Habitat: 'Forest'})
        .then(res => {
            expect(res.body).toEqual({
                _id: expect.any(String), 
                Species: 'Black',
                Habitat: 'Forest',
                __v: 0
            });
        });
    });

    it('gets the bears on GET', async() => {
    const bears = await Bear.create([
    { Species: 'Grizzly', Habitat: 'Glacier NP'},
    { Species: 'Green', Habitat: 'Snow NP'},
    { Species: 'Yellow', Habitat: 'Ice NP'}
    ]); 
    return request(app)
   .get('/bears')
   .then(res => {
       bears.forEach(bear => {
           expect(res.body).toContainEqual({
            _id: bear._id.toString(),
            Species: bear.Species, 
            Habitat: bear.Habitat,
            __v: bear.__v
           });
       });
   });

  });

  it('gets a bear by ID on GET', async() => {
    const bear = await Bear.create({
        Species: 'Brown',
        Habitat: 'Yosemite'
    });
    console.log(bear);
    
    return request(app)
    .get(`/bears/${bear._id}`)
    .then(res => {
        expect(res.body).toEqual({
            _id: bear._id.toString(),
            Species: bear.Species,
            Habitat: bear.Habitat,
            __v: bear.__v
        });
    });
  });

  it('updates a bear with PATCH', async() => {
    const bear = await Bear.create({
        Species: 'Panda',
        Habitat: 'Bamboo Forest'
    }); 

    return request(app)
    .patch(`/bears/${bear._id}`)
    .send({ Species: 'Panderrrrr' })
        .then(res => {
            expect(res.body).toEqual({
                _id: bear._id.toString(),
                Species: 'Panderrrrr',
                Habitat: 'Bamboo Forest',
                __v: bear.__v 
            });
        });
    });

    it('can delete a Bear with DELETE', async() => {
        const bear = await Bear.create({
            Species: 'Koala', 
            Habitat: 'Eucyliptus Forest'
        }); 

    return request(app)
    .delete(`/bears/${bear._id}`)
    .then(res => {
        expect(res.body)
        .toEqual({
            _id: bear._id.toString(),
            Species: 'Koala', 
          Habitat: 'Eucyliptus Forest',
          __v: 0
        })
    });
    });
  });

