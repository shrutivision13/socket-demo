var express = require('express');
const router = express.Router();
const Department = require('../models/department');

const addDepartment = async (body, res) => {
  try {
    const findDepartment = await Department.findOne({ department: body?.department });
    if (findDepartment) {
      return ({ status: 400, error: "Department already exist" });
    }
    const department = new Department(body);
    await department.save();
    return { data: department, status: 200, message: "Department added successfully" };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const getAllDepartments = async (req, res) => {
  try {
    console.log("🚀 ~ departments ~ req.query:", req?.query)

    return await Department.find({});
    // return await Department.paginate({}, { page: req?.query?.page||1, limit: req?.query?.limit }, (err, results) => {
    //   console.log("🚀 ~ departments ~ results:", results)
    //   if (err) return err
    //   return ({ total: results?.totalDocs || 0, data: results?.docs || [], status: 200 })
    // });
  } catch (error) {
    console.log("🚀 ~ getAllDepartments ~ error:", error)
    return { error: error.message, status: 500 };
  }
}

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return { error: "Department not found", status: 404 };
    return { data: department, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const updateDepartment = async (body, res) => {
  console.log("🚀 ~ updateDepartment ~ body:", body)
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(body._id, body, { new: true });
    if (!updatedDepartment) return { error: "Department not found", status: 404 };
    return { data: updatedDepartment, status: 200, message: "Department updated successfully" };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const deleteDepartment = async (id, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) return { error: "Department not found", status: 404 };
    return { message: 'Department deleted', status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}
module.exports = {
  addDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment
}