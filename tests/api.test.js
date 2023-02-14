const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');

describe('Sample Test', () => {
  let id;
  const patrimony = {
    name: 'Patrimony',
    description: 'description',
    image: '1234567ahshdess',
  };

  beforeAll(async () => {
    await request(app).post('/patrimony').send(patrimony);
  })
  
  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  it('Post patrimony', async (done) => {
    const res = await request(app).post('/patrimony/create').send(patrimony);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(patrimony.name);
    expect(res.body.description).toBe(patrimony.description);
    expect(res.body.image).toBe(patrimony.image);
    id = res.body._id;
    done();
  });

  it('Post user error', async (done) => {
    const patrimonyError = {
      name: '',
      description: ''
    };

    const res = await request(app).post('/patrimony/create').send(patrimonyError);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual(['invalid name', 'invalid description']);
    done();
  });

  it('Get patrimony', async (done) => {
    const res = await request(app).get('/patrimony')
    expect(res.statusCode).toBe(200);
    expect(res.body[res.body.length - 1].name).toBe(patrimony.name);
    expect(res.body[res.body.length - 1].description).toBe(patrimony.description);
    done();
  });

  it('Get patrimony with id', async (done) => {
    const res = await request(app).get(`/patrimony/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(patrimony.name);
    expect(res.body.description).toBe(patrimony.description);
    done();
  });

  it('Get patrimony id error', async (done) => {
    const res = await request(app).get('/patrimony/12345678912345678912345')
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid id");
    done();
  });

  it('Update patrimony with id', async (done) => {
    const res = await request(app).put(`/patrimony/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(patrimony.name);
    expect(res.body.description).toBe(patrimony.description);
    done();
  });

  it('Delete patrimony with id', async (done) => {
    const res = await request(app).delete(`/patrimony/${id}`);
    expect(res.statusCode).toBe(200);
    done();
  });


});

afterAll(async (done) => {
  done();
});
