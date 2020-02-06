let jwt = require('jsonwebtoken');
let crypto = require('crypto');// crypto library for hashing password

class TokenHandler {

    constructor(secret, lifetime, mongoCollection) {
        this.jwtKey = secret;
        this.jwtExpirySeconds = lifetime;
        this.mongo = mongoCollection;
    }

    createToken(obj, callback) {
        jwt.sign(obj, this.jwtKey, {
            algorithm: 'HS256',
            expiresIn: this.jwtExpirySeconds
        }, (err, token) => {
            if (err) {
                callback(false);
            } else {
                callback(token);
            }
        });
    }


    signIn(name, password, callback) {//for hashing password we use crypto functions and
        let userObj = {              //specify sha256 as hash algorithm
            "name": name,
            "password": crypto.createHash("sha256").update(password).digest('hex')
        };
        this.mongo.find(userObj).toArray((err, res) => {
            if (err || !res[0]) {
                callback(false);
            } else {
                this.createToken(userObj, callback);//if user in Clients exists
            }
        });
    }

    registerUser(name, password, callback) { //for hashing password we use crypto functions and
        let userObj = {                     //specify sha256 as hash algorithm
            "name": name,
            "password": crypto.createHash("sha256").update(password).digest('hex')
        };
        this.mongo.find({"name": name}).toArray((err, res) => {//check if user with such name already exists or not
            if (err || res[0]) { //if there is an error or i find user with such name
                callback(false);
            } else {
                this.mongo.insertOne(userObj, (err, res) => {
                    if (err) {
                        callback(false)
                    } else {
                        this.createToken(userObj, callback);
                    }
                })
            }
        })
    }

    getUserInfoByToken(token, callback) {
        try {
            let userObj = jwt.verify(token, this.jwtKey);
            callback(userObj);
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                callback(false);
            }
        }
    }
}

module.exports.TokenHandler = TokenHandler;
