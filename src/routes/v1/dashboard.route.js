const express = require('express');
const multer = require('multer');
const path = require('path');

const { dashboardController } = require('../../controllers');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/files');
  },
  filename(req, file, cb) {
    const fileName = `${file.fieldname}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: 100000000,
});

const router = express.Router();

router
  .route('/')
  .get(dashboardController.getData)
  .post(dashboardController.createData)
  .patch(dashboardController.updateData);

router
  .route('/whitepaper')
  .patch(upload.single('file'), dashboardController.updateWhitePaper)
  .delete(dashboardController.deleteWhitePaper);

module.exports = router;
