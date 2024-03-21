var express = require('express');
const router = express.Router();
const { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controller/employee');

router.post('/add', addEmployee);

router.get('', getAllEmployees);

router.get('/:id', getEmployeeById);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);
module.exports = router;