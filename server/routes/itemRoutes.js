const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
  claimItem
} = require('../controllers/itemController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllItems);
router.get('/:id', getItemById);

// Protected routes
router.post('/', protect, createItem);
router.get('/user/my-items', protect, getMyItems);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);
router.post('/:id/claim', protect, claimItem);

module.exports = router;