
const request = require('supertest')
const app = require('../api/index')

let testServer

beforeAll(()=>{
    testServer = app.listen(4000);
})

afterAll((done)=>{
    testServer.close(done);
})
describe('testing get paises',()=>{
    
    it('should return data from India',async ()=>{
         const response = await request(app).get('/paises/india');

         expect(response.status).toBe(200);
         expect(response.body).toHaveLength(1);
       //  expect(response.body).toEqual([{"Porcentaje": 44.83, "id": 1, "nombre": "India", "poblacion": 1409902000}]);
    })
 
    it('should return 204',async ()=>{
        const response = await request(app).get('/paises/id');

        expect(response.status).toBe(204); 
   })

   it('should return max 5 rows',async ()=>{
    const response = await request(app).get('/paises/chi');

    expect(response.status).toBe(200); 
    expect(response.body.length).toBeLessThan(6);
    })
})