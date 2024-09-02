const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./../src/server");

// assertion style
chai.should();
chai.use(chaiHttp);

describe.skip("server.js => Testing Tasks APIs", () => {

    /* 
    * GET tasks
    */
    describe("GET api/tasks", () => {
        it("Should get all tasks", (done) => {
            chai.request(server)
                .get("/api/tasks")
                .end((err, resp) => {
                    resp.should.have.status(200);
                    resp.body.should.be.a("array");
                    resp.body.length.should.be.eq(3);
                    done();
                })
        })

        it("Should NOT get all tasks", (done) => {
            chai.request(server)
                .get("/api/task") // path is wrong here. "task" is incorrect.
                .end((err, resp) => {
                    resp.should.have.status(404);
                    done();
                })
        })
    })

    /* 
    * GET task by id
    */
    describe("GET api/tasks/:id", () => {
        it("Should return task for id", (done) => {
            const id = 1;
            chai.request(server)
                .get("/api/tasks/" + id)
                .end((err, resp) => {
                    resp.should.have.status(200);
                    resp.body.should.be.a("object");
                    resp.body.should.have.property("id");
                    resp.body.should.have.property("name");
                    resp.body.should.have.property("completed");
                    resp.body.should.have.property("id").eq(id);
                    done();
                })
        })

        it("Should return task not found for id msg", (done) => {
            const id = 10000;
            chai.request(server)
                .get("/api/tasks/" + id)
                .end((err, resp) => {
                    resp.should.have.status(404);
                    resp.text.should.be.eq("The task with the provided ID does not exist.");
                    done();
                })
        })
    })

    /* 
    * POST task
    */
    describe("POST api/tasks/", () => {
        it("Add NEW task and return it", (done) => {
            const task = {
                name: "Task 4",
                completed: true
            };
            chai.request(server)
                .post("/api/tasks")
                .send(task)
                .end((err, resp) => {
                    resp.should.have.status(201);
                    resp.body.should.be.a("object");
                    resp.body.should.have.property("id").eq(4);
                    resp.body.should.have.property("name").eq(task.name);
                    resp.body.should.have.property("completed").eq(task.completed);
                    done();
                })
        })

    })

    /* 
    * PUT task by id
    */
    describe("PUT api/tasks/:id", () => {
        it("Update task by id and return it", (done) => {
            const id = 1;
            const task = {
                name: "Task 1 Replacement",
                completed: true
            };
            chai.request(server)
                .put("/api/tasks/" + id)
                .send(task)
                .end((err, resp) => {
                    resp.should.have.status(200);
                    resp.body.should.be.a("object");
                    resp.body.should.have.property("id").eq(id);
                    resp.body.should.have.property("name").eq(task.name);
                    resp.body.should.have.property("completed").eq(task.completed);
                    done();
                })
        })

        it("NOT Update task by id and task not present msg", (done) => {
            const id = 10000;
            const task = {
                name: "Task 1 Replacement",
                completed: true
            };
            chai.request(server)
                .put("/api/tasks/" + id)
                .send(task)
                .end((err, resp) => {
                    resp.should.have.status(404);
                    resp.text.should.be.eq("The task with the provided ID does not exist.");
                    done();
                })
        })
    })

    
    /* 
    * DELETE task by id
    */
    describe("DELETE api/tasks/:id", () => {
        it("DELETE task by id and return it", (done) => {
            const id = 1;
            chai.request(server)
                .delete("/api/tasks/" + id)
                .end((err, resp) => {
                    console.log("DELETE Resp", resp.body);
                    resp.should.have.status(200);
                    resp.body.should.be.a("object");
                    resp.body.should.have.property("id").eq(id);
                    resp.body.should.have.property("name");
                    resp.body.should.have.property("completed");
                    done();
                })
        })

        it("NOT DELETE task by id since id is not present", (done) => {
            const id = 10000;
            chai.request(server)
                .delete("/api/tasks/" + id)
                .end((err, resp) => {
                    resp.should.have.status(404);
                    resp.text.should.be.eq("The task with the provided ID does not exist.");
                    done();
                })
        })
    })
});
