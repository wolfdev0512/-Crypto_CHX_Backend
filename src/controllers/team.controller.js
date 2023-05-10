const httpStatus = require('http-status');
const fs = require('fs/promises');
const { Team } = require('../utils/database');
const catchAsync = require('../utils/catchAsync');
const { decodeBase64Image } = require('../utils/imageUpload');

const getData = catchAsync(async (req, res) => {
  try {
    const teamData = await Team.findAll();

    res.status(200).send({ data: teamData });
  } catch (e) {
    res.status(httpStatus['500_NAME']);
  }
});

const createData = catchAsync(async (req, res) => {
  try {
    const { avatar, name, role } = req.body;
    let imageName;
    if (avatar) {
      const { imageBuffer, extension } = decodeBase64Image(avatar);
      imageName = `team-${Date.now()}.${extension}`;
      await fs.writeFile(`public/images/${imageName}`, imageBuffer.data);
    }

    const teamData = await Team.create({ avatar: imageName, name, role });

    res.status(httpStatus.CREATED).send({ data: teamData });
  } catch (e) {
    res.status(httpStatus['500_NAME']);
  }
});

const updateData = catchAsync(async (req, res) => {
  try {
    const { avatar, name, role } = req.body;
    const { id } = req.params;

    let imageName;
    if (avatar) {
      const data = await Team.findOne({
        where: {
          id,
        },
      });

      if (data && data?.dataValues?.avatar) {
        await fs.unlink(`public/images/${data?.dataValues?.avatar}`);
      }

      const { imageBuffer, extension } = decodeBase64Image(avatar);
      imageName = `team-${Date.now()}.${extension}`;
      await fs.writeFile(`public/images/${imageName}`, imageBuffer.data);
    }

    const teamData = await Team.update(
      { avatar: imageName, name, role },
      {
        where: {
          id,
        },
      }
    );

    res.status(httpStatus.CREATED).send({ data: teamData });
  } catch (e) {
    res.status(httpStatus['500_NAME']);
  }
});

const deleteData = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Team.findOne({
      where: {
        id,
      },
    });

    if (data && data?.dataValues?.avatar) {
      await fs.unlink(`public/images/${data?.dataValues?.avatar}`);
    }

    const teamData = await Team.destroy({
      where: {
        id,
      },
    });

    res.status(httpStatus.CREATED).send({ data: teamData });
  } catch (e) {
    res.status(httpStatus['500_NAME']);
  }
});

module.exports = {
  getData,
  createData,
  updateData,
  deleteData,
};
