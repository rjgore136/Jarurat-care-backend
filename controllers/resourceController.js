import { raw } from "express";
import Resource from "../models/resource.js";

//create a new resource
export const createResource = async (req, res, next) => {
  try {
    const { title, description, type, beneficiaryCount, fundGoal } = req.body;
    // console.log("createResource");
    // console.log(title, description, type, beneficiaryCount, fundGoal);

    if (!title || !description) {
      res.status(400);
      return res.json({
        success: false,
        message: "Please provide required fields!!",
      });
    }

    // Check if an image is uploaded
    const imageUrl = req.file ? req.file.path : null;

    // Create the resource
    const resource = await Resource.create({
      title,
      description,
      createdBy: req.user.id, // Extracted from JWT
      type,
      beneficiaryCount,
      fundGoal,
      fundRaised: 0, // Default to 0
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      resource,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

//update the resource
export const updateResource = async (req, res, next) => {
  try {
    // console.log("updateResource");

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide resource id!!",
      });
    }

    // Find the resource by ID
    const resource = await Resource.findById(id);
    if (!resource) {
      return res
        .status(404)
        .json({ success: false, message: "Resource not found" });
    }

    // Check if an image is uploaded
    if (req.file) {
      resource.imageUrl = req.file.path;
    }

    // Update the other fields
    Object.assign(resource, req.body);

    // Save the updated resource
    const updatedResource = await resource.save();

    res.status(200).json({
      success: true,
      message: "Resource updated successfully",
      resource: updatedResource,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Resources
export const getAllResources = async (req, res, next) => {
  try {
    const resources = await Resource.find().populate("createdBy", "name email");
    res.status(200).json({
      success: true,
      message: "Resources retrieved successfully",
      resources,
    });
  } catch (error) {
    next(error);
  }
};

// Get Resource By ID
export const getResourceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide resource id!!",
      });
    }

    const resource = await Resource.findById(id).populate(
      "createdBy",
      "name email"
    );
    if (!resource) {
      return res
        .status(404)
        .json({ success: true, message: "Resource not found" });
    }

    res.status(200).json({
      success: true,
      message: "Resource retrieved successfully",
      resource,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Resource
export const deleteResource = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide resource id!!",
      });
    }

    // Find and delete the resource by ID
    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
