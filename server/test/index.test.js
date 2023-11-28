const request = require ('supertest')

const app = require ('../index.js')

describe ("POST /create", () =>{
it('respond whit json that contains user data', done =>{
    const data = {
        nombre: "julio",
        edad: "25",
        cargo: "Q.A",
        pais: "venezuela",
        anios: "2"
    }
    request(app)
    .post('/create')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect("registro de empleado exitoso")
    .expect(done())
})
})

describe ("PUT /update", () =>{
    it('respond whit json that contains updated user data', done =>{
        const data = {
            nombre: "joselito",
            edad: "40",
            cargo: "Fronted developer",
            pais: "cuba",
            anios: "4"
        }
        request(app)
        .put('/update')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({
            nombre: "joselito",
            edad: "40",
            cargo: "Fronted developer",
            pais: "cuba",
            anios: "4"
        })
        .expect(done())
    })
    })

    describe ("GET /empleados", () =>{
        it('respond whit json that contains all users in base data', done =>{
            request(app)
            .get('/empleados')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({})
            .expect(done())
        })
        })
    

        describe ("PUT /delete/:id", () =>{
            it('respond whit json that contains the id of user that was deleted', done =>{
                const data = {
                    id: "1"
                }
                request(app)
                .put('/delete')
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect({
                    nombre: "",
                    edad: "",
                    cargo: "",
                    pais: "",
                    anios: ""
                })
                .expect(done())
            })
            })
