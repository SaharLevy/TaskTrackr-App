"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    text: String,
    priority: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    completed: { type: Boolean, default: false },
}, { timestamps: true });
taskSchema.index({ userId: 1 }); // Create an index on the userId field
exports.default = (0, mongoose_1.model)("Task", taskSchema);
