const Company = require('../models/company');
const Task = require('../models/task');
const Employee = require('../models/employee');

const addCompany = async (req, res) => {
    const company = new Company(req.body);
    if (req?.file) {
        company.company_image = req?.file?.path
    }
    try {
        await company.save();
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();

        res.send(companies);
    } catch (error) {
        res.status(500).send(error);
    }
}



const addTask = async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getEmployeeWithSameCompany = async (req, res) => {
    try {
        let company = await Company.aggregate([
            {
                $lookup: {
                    from: 'employees',
                    localField: 'emaployeeId',
                    foreignField: '_id',
                    as: 'employee'
                }
            },
            {
                $addFields: {
                    employee: { $first: "$employee" }
                }
            },
            {
                $group: { _id: '$name', total: { $sum: '$employee.salary' } }
            },

            // {
            //     $project:{
            //         _id: 0,
            //         name: "$_id",
            //         total: 1
            //     }
            // }
        ]).exec()

        res.send(company);
    } catch (error) {
        console.log("🚀 ~ getEmployeeWithSameCompany ~ error:", error)
        res.status(500).send(error);
    }
}
const getEmployeeWithSameDepartment = async (req, res) => {
    try {
        let company = await Company.aggregate([
            {
                $lookup: {
                    from: 'employees',
                    localField: 'emaployeeId',
                    foreignField: '_id',
                    as: 'employee'
                }
            },
            {
                $addFields: {
                    employee: { $first: "$employee" }
                }
            },
            {
                $group: { _id: '$employee', total: { $sum: '$employee.salary' } }
            },
            {
                $group: { _id: '$_id.department', total: { $sum: '$_id.salary' } }
            },

            // {
            //     $project:{
            //         _id: 0,
            //         name: "$_id",
            //         total: 1
            //     }
            // }
        ]).exec()

        res.send(company);
    } catch (error) {
        console.log("🚀 ~ getEmployeeWithSameCompany ~ error:", error)
        res.status(500).send(error);
    }
}

const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).send('Company not found');
        res.send(company);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateCompany = async (req, params, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCompany) return res.status(404).send('Company not found');
        res.send(updatedCompany);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        if (!deletedCompany) return res.status(404).send('Company not found');
        res.send(deletedCompany);
    } catch (error) {
        res.status(500).send(error);
    }
}



module.exports = {
    addTask, getAllTask, addCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, getEmployeeWithSameCompany, getEmployeeWithSameDepartment
}