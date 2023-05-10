const express = require('express');
const { teamController } = require('../../controllers');

const router = express.Router();

router.route('/').get(teamController.getData);
router.route('/:id').patch(teamController.updateData).delete(teamController.deleteData);
router.route('/create').post(teamController.createData);

module.exports = router;
