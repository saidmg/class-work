const { response } = require('express')

const db = require('./connection')('contact_book', 'skotkalb')

const getInfo1 =async () => {
   let result =  db.query(`SELECT * from contact Where id = ${id}`)
   return result
}

const searchFunction = async(contactInfo) => {
    let result
    if ( contactInfo.length>1){
        result  = await db.query(`SELECT * from contact Where first_name LIKE '%${contactInfo[0]}%' AND last_name LIKE '%${contactInfo[1]}%'`)

    }else {
        result = await db.query(`SELECT * from contact Where first_name LIKE '%${contactInfo}%' OR last_name LIKE '%${contactInfo}%'`)

    }
    return result
}

const createContactFunction = async (contactInfo) => {
    const result = await db.query(`INSERT INTO contact (first_name,last_name,phone_number) VALUES
    (?,?,?)`,[contactInfo.firstName,contactInfo.lastName,contactInfo.phoneNumber])
    return result
}

const deleteContactFunction = async (deleteId) => {
    let result = await db.query(`DELETE from contact Where id =?`, deleteId)
return result
}
const updateContactFunction = async (id, contactInfo) => {
    let result = await db.query(`UPDATE contact SET first_name ='${contactInfo[0].first_name}' , last_name= '${contactInfo[0].last_name}' , phone_number ='${contactInfo[0].phone_number}' WHERE id = ${id} `);
     return(result)
}

const showContactFunction = async () => {
    let result = await db.query('SELECT * from contact');
    return result
}
module.exports = {getInfo1,searchFunction,createContactFunction,deleteContactFunction,updateContactFunction,showContactFunction}