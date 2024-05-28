import mongoose from 'mongoose';

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Admin', 'Employee'],
    default: 'User'
  },
}, {
  timestamps: true
});

const Role = mongoose.model('Role', roleSchema);

export default Role;

