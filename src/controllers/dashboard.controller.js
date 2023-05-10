/* eslint-disable no-buffer-constructor */
/* eslint-disable prefer-destructuring */
const httpStatus = require('http-status');
const _ = require('lodash');
const fs = require('fs/promises');
const { Dashboard, Annoucement } = require('../utils/database');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const { decodeBase64Image } = require('../utils/imageUpload');

const getData = catchAsync(async (req, res) => {
  try {
    const dashboardData = await Dashboard.findOne();
    const announcementData = (await Annoucement.findOne()) || {};

    let data;
    if (dashboardData) {
      dashboardData.dataValues.whitepaper_url = dashboardData.dataValues.whitepaper_url
        ? dashboardData.whitepaper_url
        : null;
      data = { ...dashboardData?.dataValues, ...{ announcements: announcementData } };
    }

    res.status(200).send({ data });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

const createData = catchAsync(async (req, res) => {
  try {
    const {
      user,
      email,
      token_sale_countdown,
      primary_mail,
      whitepaper_url,
      docs_url,
      display_team_section,
      announcements,
    } = req.body;

    let announcementData = {};
    const dashboardData = await Dashboard.create({
      user,
      email,
      token_sale_countdown,
      display_team_section,
      primary_mail,
      whitepaper_url,
      docs_url,
    });

    if (!_.isEmpty(announcements)) {
      announcementData = await Annoucement.create({
        title: announcements?.title,
        description: announcements?.description,
        display: announcements?.display,
      });
    }

    dashboardData.dataValues.announcements = announcementData;

    res.status(httpStatus.CREATED).send({ data: dashboardData });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

const updateData = catchAsync(async (req, res) => {
  try {
    const {
      user,
      email,
      token_sale_countdown,
      display_team_section,
      primary_mail,
      whitepaper_url,
      docs_url,
      announcements,
    } = req.body;

    const dashboardData = await Dashboard.update(
      {
        user,
        email,
        token_sale_countdown,
        display_team_section,
        primary_mail,
        whitepaper_url,
        docs_url,
      },
      {
        where: {
          id: 1,
        },
      }
    );
    if (!_.isEmpty(announcements)) {
      const data = await Annoucement.findOne();

      const newImage = announcements?.image_url.startsWith('data'); // check is image is passed in payload

      // check if existing image is there and new image is uploaded
      if (data && data?.dataValues?.image_url && newImage) {
        try {
          await fs.unlink(`public/images/${data?.dataValues?.image_url}`);
        } catch (e) {
          logger.error(e);
        }
      }

      let imageName;
      if (newImage) {
        const { imageBuffer, extension } = decodeBase64Image(announcements.image_url);
        await fs.writeFile(`public/images/announcement.${extension}`, imageBuffer.data);
        imageName = `announcement.${extension}`;
      }

      await Annoucement.update(
        {
          title: announcements?.title,
          description: announcements?.description,
          image_url: announcements?.image_url ? imageName : announcements?.image_url,
          display: announcements?.display === true,
        },
        {
          where: {
            id: 1,
          },
        }
      );
    }

    res.status(httpStatus.CREATED).send({ data: dashboardData });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

const updateWhitePaper = catchAsync(async (req, res) => {
  try {
    const { filename: whitepaper_url } = req.file;

    const dashboardData = await Dashboard.update(
      {
        whitepaper_url,
      },
      {
        where: {
          id: 1,
        },
      }
    );

    res.status(httpStatus.CREATED).send({ data: dashboardData });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

const deleteWhitePaper = catchAsync(async (req, res) => {
  try {
    const dashboardData = await Dashboard.update(
      {
        whitepaper_url: null,
      },
      {
        where: {
          id: 1,
        },
      }
    );

    res.status(httpStatus.CREATED).send({ data: dashboardData });
  } catch (e) {
    logger.error(e);
    res.status(httpStatus['500_NAME']);
  }
});

module.exports = {
  getData,
  createData,
  updateData,
  updateWhitePaper,
  deleteWhitePaper,
};
