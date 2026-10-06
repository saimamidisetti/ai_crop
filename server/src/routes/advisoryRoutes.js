const express = require('express');
const { requireAuth } = require('../middleware/auth');
const {
  createAdvisory,
  getAdvisories,
  getAdvisoryById,
  deleteAdvisory
} = require('../controllers/advisoryController');

const router = express.Router();

router.use(requireAuth);

router.post('/', createAdvisory);
router.get('/', getAdvisories);
router.get('/:id', getAdvisoryById);
router.delete('/:id', deleteAdvisory);

module.exports = router;
