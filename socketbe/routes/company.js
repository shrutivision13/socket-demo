var express = require('express');
const router = express.Router();
const { validate } = require('express-validation');
const companyValidation = require('../validation/company');
const { addCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, getEmployeeWithSameCompany, getEmployeeWithSameDepartment, addTask, getAllTask } = require('../controller/company');
const upload = require('../utils/multer');

router.post('/add',upload.single("company_image"), validate(companyValidation.addCompany), addCompany);
router.post('/task/add', addTask);

router.get('', getAllCompanies);
router.get('/tasks', getAllTask);
router.get('/same-company-employee', getEmployeeWithSameCompany);
router.get('/same-department-employee', getEmployeeWithSameDepartment);

router.get('/:id', getCompanyById);

router.put('/:id', validate(companyValidation.addCompany), updateCompany);

router.delete('/:id', deleteCompany);

module.exports = router;