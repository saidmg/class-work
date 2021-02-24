const express = require('express');
const app = express();

const PORT = 3000; // for Heroku ? process.env.PORT || 3000

// will share any static html files with the browser
app.use( express.static('html') );
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let contactList = [
    { firstName:"Ilias", lastName:"C", phoneNumber: "+1(999)999-9999", id:1},
    { firstName:"Muhammad", lastName:"Alim", phoneNumber: "+1(234)567-7890", id:2}
]

app.post('/api/contact', function(req, res) {
    const contactInfo = req.body;
    let id = (contactList[contactList.length-1].id + 1)
    contactInfo.id = id
    contactList.push(contactInfo)
    res.send( contactList );
});

app.get('/api/display', function(req, res) {
    res.send( contactList );
});

// Listener ==================================================
app.listen(PORT, function() {
    console.log('Serving hot-tables on PORT ' + PORT);
});