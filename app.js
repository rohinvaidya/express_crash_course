var express = require('express');
var bodyParser = require('body-parser');
var { check, validationResult } = require('express-validator');
var path = require('path');

var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
// var ObjectId = mongojs.ObjectId;

var app = express();

// app.get('/', (req, res) => {
//     res.send("Hello World");
// });

// var logger = (req, res, next) => {
//     console.log("logging...");
//     next();
// }
// app.use(logger);

// Global Vars
app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
});
var users = null;

// var users = [
//     {
//         id: 1,
//         first_name: 'John',
//         last_name: 'Doe',
//         email: 'johndoe@gmail.com'
//     },
//     {
//         id: 2,
//         first_name: 'Jane',
//         last_name: 'Doe',
//         email: 'jdoe@yahoo.com'
//     },
//     {
//         id: 3,
//         first_name: 'Bob',
//         last_name: 'Smith',
//         email: 'bobsmith@gmail.com'
//     },
// ];

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Validator Middleware


// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    // res.render('index');
    db.users.find(function (err, docs) {
        // console.log(docs);
        users = docs;
        res.render('index', { title: 'Customer', users: docs });
    });
}
);

app.post('/users/add', [
    check('first_name').isLength({ min: 1 }).withMessage("First Name is required!"),
    check('last_name').isLength({ min: 1 }).withMessage("Last Name is required!"),
    check('email').isLength({ min: 1 }).withMessage("Email is required!")
], function (req, res) {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors.array()
        });
    }
    else {
        console.log('Form Submitted');
        // console.log(req.body.first_name);
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        };
        // Add Users
        // users.push(newUser);
        // console.log(users);
        db.users.insert(newUser, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        res.redirect('/');
    }
});

app.delete('/users/delete/:uid', function (req, res) {
    alert('I have reached here!');
    console.log('I am here!');
    console.log(req.params);
    // console.log(req.params.id);
    console.log(req.params.uid);
    db.users.remove({ _id: ObjectId(req.params.id) }, function (err, result) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

app.listen(3000, () => console.log("Server started on port 3000..."));