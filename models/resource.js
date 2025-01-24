import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["fundraising", "medical aid", "education drive", "volunteering"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "completed", "archived"],
    },
    imageUrl: {
      type: String,
    },
    beneficiaryCount: {
      type: Number,
    },
    fundGoal: {
      type: Number,
    },
    fundRaised: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model("Resource", ResourceSchema);

export default Resource;
