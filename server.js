let express = require('express');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let app = express();
let cors = require("cors");
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let TokenHandler = require('./tokenHandler').TokenHandler;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/images", express.static(__dirname + "/images/"));

app.listen(3000, function () {
    console.log("Served is running")
});

app.get("/sayHello", function (request, response) {
    response.send("Hello");
});

app.get("/sayHelloWithStatus", function (request, response) {
    response.status(200).send("Hello, with status 200");
});

MongoClient.connect("mongodb://127.0.0.1:27017", {userNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log("error with db");
        return;
    }
    console.log("connected to db");

    let tokenLifetime = 300;
    let db = client.db("config"); //connected to db Shop
    let products = db.collection("Items"); //connected to collection(table) in Shop db
    let clients = db.collection("Clients");
    let tokenHandler = new TokenHandler("my_secret_key", tokenLifetime, clients);

    app.get("/showProducts", function (request, response) {

            let searchQuery = {};
            if (request.query.type !== undefined) {
                if (request.query.type !== "") {
                    searchQuery["type"] = request.query.type;
                }
            }

            //search function
            if (request.query.name !== undefined) {
                if (request.query.name !== "") {
                    searchQuery["name"] = {$regex: request.query.name, $options: 'i'}
                }
            }

            products.find(searchQuery).toArray(function (err, result) {
                if (err) {
                    response.status(200).send("something wrong with db");
                } else {
                    let jsonResult = JSON.stringify(result);
                    response.status(200).send(jsonResult);
                }
            })
        }
    );

    app.get('/signIn', (request, response) => {
        if (request.query.name === undefined || request.query.name === "") {
            response.status(409).send("No username provided");
            return;
        }
        if (request.query.password === undefined || request.query.password === "") {
            response.status(409).send("No password provided");
            return;
        }
        let name = request.query.name;
        let password = request.query.password;
        tokenHandler.signIn(name, password, (token) => {
            if (!token){
                response.status(403).send("Not authorized");
            } else {
                response.cookie('token', token, { maxAge: tokenLifetime * 1000 }); //put token in browser's cookies
                response.status(200).send(token); //
            }
        })
    });

    app.get('/register', (request, response) => {
        if (request.query.name === undefined || request.query.name === "") {
            response.status(409).send("No username provided");
            return;
        }
        if (request.query.password === undefined || request.query.password === "") {
            response.status(409).send("No password provided");
            return;
        }
        let name = request.query.name;
        let password = request.query.password;
        tokenHandler.registerUser(name, password, (result) => {
            if (!result){
                response.status(403).send("User already exists");
            } else {
                response.cookie('token', result, { maxAge: tokenLifetime * 1000 });
                response.status(200).send(result);
            }
        })
    });
});
