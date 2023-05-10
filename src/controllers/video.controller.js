const httpStatus = require('http-status');
const fs = require('fs/promises');
const { Video } = require('../utils/database');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');

const getData = catchAsync(async (req, res) => {
  try {
    const videoData = await Video.findAll();

    res.status(200).send({ data: videoData });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

const createData = catchAsync(async (req, res) => {
  try {
    const { name, title } = req.body;
    const { filename: video_url } = req.file;
    const videoData = await Video.create({ name, title, video_url });

    res.status(httpStatus.CREATED).send({ data: videoData });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

const updateData = catchAsync(async (req, res) => {
  try {
    const { name, title } = req.body;
    const { filename: video_url } = req.file;
    const { id } = req.params;

    const data = await Video.findOne({
      where: {
        id,
      },
    });

    if (data && data?.dataValues?.video_url) {
      try {
        await fs.unlink(`public/videos/${data?.dataValues?.video_url}`);
      } catch (e) {
        logger.error(e);
      }
    }

    const videoData = await Video.update(
      { name, title, video_url },
      {
        where: {
          id,
        },
      }
    );

    res.status(httpStatus.CREATED).send({ data: videoData });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

const deleteData = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Video.findOne({
      where: {
        id,
      },
    });

    if (data && data?.dataValues?.video_url) {
      try {
        await fs.unlink(`public/videos/${data?.dataValues?.video_url}`);
      } catch (e) {
        logger.error(e);
      }
    }

    const videoData = await Video.destroy({
      where: {
        id,
      },
    });

    res.status(httpStatus.CREATED).send({ data: videoData });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

module.exports = {
  getData,
  createData,
  updateData,
  deleteData,
};
