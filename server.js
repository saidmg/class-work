const express = require('express');
const app = express();
const orm = require('./app/orm')
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
    let result = await orm.getInfo1()
    res.send(result)
});

app.get('/api/searchedContact/:search', async function (req, res) {
    let contactInfo = req.params.search;
    contactInfo = contactInfo.split(" ");
    let result = await orm.searchFunction(contactInfo)
    res.send(result)

});

app.post('/api/contact', async function (req, res) {
    const contactInfo = req.body;
 let result = await orm.createContactFunction(contactInfo)
   res.redirect('/../list.html')
});

app.delete(`/api/contact/:id`, async function(req, res){
    let deleteId = req.params.id
    let result = await orm.deleteContactFunction(deleteId)

}
);

app.put(`/api/contact/:id`, async function (req, res) {
    const contactInfo = req.body;
    id = req.params.id
    let result = await orm.updateContactFunction(id,contactInfo)
});

app.get('/api/contact', async function (req, res) {
   let result = await orm.showContactFunction()
    res.send(result);
});

// Listener ==================================================
app.listen(PORT, function () {
    console.log('Serving Contact-Book on PORT ' + PORT);
});