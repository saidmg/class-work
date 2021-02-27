const { response } = require('express')

const db = require('./connection')('contact_book', 'skotkalb')

async function getInfo1(){
   let result =  db.query(`SELECT * from contact Where id = ${id}`)
   return result
}

async function searchFunction(contactInfo){
    let result
    if ( contactInfo.length>1){
        result  = await db.query(`SELECT * from contact Where first_name LIKE '%${contactInfo[0]}%' AND last_name LIKE '%${contactInfo[1]}%'`)

    }else {
        result = await db.query(`SELECT * from contact Where first_name LIKE '%${contactInfo}%' OR last_name LIKE '%${contactInfo}%'`)

    }
    return result
}

async function createContactFunction(contactInfo){
    const result = await db.query(`INSERT INTO contact (first_name,last_name,phone_number) VALUES
    (?,?,?)`,[contactInfo.firstName,contactInfo.lastName,contactInfo.phoneNumber])
    return result
}

async function deleteContactFunction(deleteId){
    let result = await db.query(`DELETE from contact Where id =?`, deleteId)
return result
}
async function updateContactFunction(id, contactInfo){
    let result = await db.query(`UPDATE contact SET first_name ='${contactInfo[0].first_name}' , last_name= '${contactInfo[0].last_name}' , phone_number ='${contactInfo[0].phone_number}' WHERE id = ${id} `);
     return(result)
}

async function showContactFunction(){
    let result = await db.query('SELECT * from contact');
    return result
}
module.exports = {getInfo1,searchFunction,createContactFunction,deleteContactFunction,updateContactFunction,showContactFunction}