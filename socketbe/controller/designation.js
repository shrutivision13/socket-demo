var express = require('express');
const router = express.Router();
const Designation = require('../models/designation');

const addDesignation = async (body, res) => {
  try {
    const findDesignation = await Designation.findOne({ designation: body?.designation });
    if (findDesignation) {
      return ({ status: 400, error: "Designation already exist" });
    }
    const designation = new Designation(body);
    await designation.save();
    return { data: designation, status: 200, message: "Designation added successfully" };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const getAllDesignations = async (req, res) => {
  try {

    return await Designation.find({});
  } catch (error) {
    console.log("🚀 ~ getAllDesignations ~ error:", error)
    return { error: error.message, status: 500 };
  }
}

const getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) return { error: "Designation not found", status: 404 };
    return { data: designation, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const updateDesignation = async (body, res) => {
  try {
    const updatedDesignation = await Designation.findByIdAndUpdate(body?._id, body, { new: true });
    if (!updatedDesignation) return { error: "Designation not found", status: 404 };
    return { data: updatedDesignation, status: 200, message: "Designation updated successfully" };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}

const deleteDesignation = async (id, res) => {
  try {
    const deletedDesignation = await Designation.findByIdAndDelete(id);
    if (!deletedDesignation) return { error: "Designation not found", status: 404 };
    return { message: 'Designation deleted', status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
}
module.exports = {
  addDesignation, getAllDesignations, getDesignationById, updateDesignation, deleteDesignation
}