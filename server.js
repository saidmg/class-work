const express = require('express');
const app = express();
const db = require('./app/connection')('contact_book', 'skotkalb')

const PORT = 3000; // for Heroku ? process.env.PORT || 3000

// will share any static html files with the browser
app.use(express.static('html'));
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// let contactList = [
//     { firstName:"Ilias", lastName:"C", phoneNumber: "+1(999)999-9999", id:1},
//     { firstName:"Muhammad", lastName:"Alim", phoneNumber: "+1(234)567-7890", id:2}
// ]

app.get(`/api/:sample/:id`, async function (req, res) {
    id = req.params.id.substring(1)

    // console.log(id)
    res.send(await db.query(`SELECT * from contact Where id = ${id}`))
});


app.post('/api/contact', async function (req, res) {
    const contactInfo = req.body;
    // console.log(contactInfo)

    let result = await db.query(`INSERT INTO contact (id,first_name,last_name,phone_number) VALUES (0,'${contactInfo.firstName}','${contactInfo.lastName}','${contactInfo.phoneNumber}');`)

});

app.put(`/api/:id`, async function (req, res) {
    const contactInfo = req.body;
    // console.log(contactInfo)
    id = req.params.id.substring(1)
    // console.log(id)
    // console.log(contactInfo[0].firstName)
    let result = await db.query(`UPDATE contact SET first_name ='${contactInfo[0].first_name}' , last_name= '${contactInfo[0].last_name}' , phone_number ='${contactInfo[0].phone_number}' WHERE id = ${id} `);

    // res.send( contactList1 );
});

app.get('/api/display', async function (req, res) {
    let contactList1 = await db.query('SELECT * from contact');
    res.send(contactList1);
});

// Listener ==================================================
app.listen(PORT, function () {
    console.log('Serving Contact-Book on PORT ' + PORT);
});