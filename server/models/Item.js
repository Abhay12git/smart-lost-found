const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide item title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide item description'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Electronics',
        'Clothing',
        'Accessories',
        'Documents',
        'Keys',
        'Bags',
        'Jewelry',
        'Books',
        'Pets',
        'Other'
      ]
    },
    type: {
      type: String,
      required: [true, 'Please specify if item is lost or found'],
      enum: ['lost', 'found']
    },
    status: {
      type: String,
      enum: ['active', 'claimed', 'resolved'],
      default: 'active'
    },
    location: {
      type: String,
      required: [true, 'Please provide location'],
      trim: true
    },
    dateReported: {
      type: Date,
      default: Date.now
    },
    dateLostOrFound: {
      type: Date,
      required: [true, 'Please provide the date when item was lost/found']
    },
    images: [{
      type: String
    }],
    contactInfo: {
      name: {
        type: String,
        trim: true
      },
      phone: {
        type: String,
        trim: true
      },
      email: {
        type: String,
        trim: true
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verificationDetails: {
      type: String,
      maxlength: [500, 'Verification details cannot exceed 500 characters']
    }
  },
  {
    timestamps: true
  }
);

// Index for better search performance
itemSchema.index({ title: 'text', description: 'text' });
itemSchema.index({ category: 1, type: 1, status: 1 });

module.exports = mongoose.model('Item', itemSchema);