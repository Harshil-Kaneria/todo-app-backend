var express = require('express');
var router = express.Router();

const table_name = "city";

router.get('/', async function(req, res, next) {
   let client_ip = await common_helper.get_ip_address(req, res, next);
   console.log(client_ip);
   
   let result = await rapid.getData_R("ID,Name",table_name)
   res.send(result)
})

router.post('/:id', async function(req, res, next) {
   let data = req.params.id;
   let result = await rapid.getData_R("*",table_name,`ID=${data}`)
   res.send(result)
})

router.post('/insert', async function(req, res, next){
   let result = await rapid.insertData_R(table_name,req.body)
   res.send(result)
})

router.post('/update/:id', async function(req, res, next){
   let where_data = req.params.id;
   let result = await rapid.updateData_R(table_name,req.body,`ID=${where_data}`);
   res.send(result)
})

router.post('/delete/:id', async function(req, res, next){
   let data = req.params.id;
   let result = await rapid.deleteData_R(table_name,`ID=${data}`);
   res.send(result)
})

module.exports = router;