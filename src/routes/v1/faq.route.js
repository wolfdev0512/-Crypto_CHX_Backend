const express = require('express');
const { faqController } = require('../../controllers');

const router = express.Router();

router.route('/').get(faqController.getData);
router.route('/:id').patch(faqController.updateData).delete(faqController.deleteData);
router.route('/create').post(faqController.createData);

module.exports = router;
