var express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

const addEmployee = async (body, res) => {

  const employee = new Employee(body);
  try {
    await employee.save();
    return { data: employee, status: 200, message: "Employee added successfully" };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const getAllEmployees = async (query, res) => {
  try {

    return await Employee.paginate({}, { page: query?.page || 1, limit: query?.limit || 50, populate: "department_id designation_id" }, (err, results) => {
      if (err) return err
      return ({ total: results?.totalDocs || 0, data: results?.docs || [], status: 200 })
    });
  } catch (error) {
    console.log("🚀 ~ getAllEmployees ~ error:", error)
    return { error: error.message, status: 500 };
  }
}

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return { error: "Employee not found", status: 404 };
    return { data: employee, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const updateEmployee = async (body, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(body._id, body, { new: true });
    if (!updatedEmployee) return { error: "Employee not found", status: 404 };
    return { data: updatedEmployee, status: 200 }
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const deleteEmployee = async (id, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) return { error: "Employee not found", status: 404 };
    return { message: 'Employee deleted', status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}
module.exports = {
  addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee
}