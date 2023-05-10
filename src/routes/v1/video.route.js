const express = require('express');
const multer = require('multer');
const path = require('path');
const { videoController } = require('../../controllers');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/videos');
  },
  filename(req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: 100000000,
});

const router = express.Router();

router.route('/').get(videoController.getData);
router.route('/:id').patch(videoController.updateData).delete(videoController.deleteData);
router.route('/create').post(upload.single('video'), videoController.createData);

module.exports = router;
