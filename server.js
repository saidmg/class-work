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

app.get(`/api/contact/:id`, async function (req, res) {
    id = req.params.id
    // console.log(id)
    res.send(await db.query(`SELECT * from contact Where id = ${id}`))
});


app.post('/api/contact', async function (req, res) {
    const contactInfo = req.body;
    // console.log(contactInfo)
    const result = await db.query(`INSERT INTO contact (first_name,last_name,phone_number) VALUES
     (?,?,?)`,[contactInfo.firstName,contactInfo.lastName,contactInfo.phoneNumber])
   res.redirect('/../list.html')
});

app.delete(`/api/contact/:id`, async function(req, res){
    let deleteId = req.params.id
    let result = await db.query(`DELETE from contact Where id =?`, deleteId)
    // res.redirect('/../list.html')

}
);

app.put(`/api/contact/:id`, async function (req, res) {
    const contactInfo = req.body;
    // console.log(contactInfo)
    id = req.params.id
    console.log(id)
    // console.log(contactInfo[0].firstName)
    let result = await db.query(`UPDATE contact SET first_name ='${contactInfo[0].first_name}' , last_name= '${contactInfo[0].last_name}' , phone_number ='${contactInfo[0].phone_number}' WHERE id = ${id} `);

    // res.send( contactList1 );
});

app.get('/api/contact', async function (req, res) {
    let contactList1 = await db.query('SELECT * from contact');
    res.send(contactList1);
});

// Listener ==================================================
app.listen(PORT, function () {
    console.log('Serving Contact-Book on PORT ' + PORT);
});