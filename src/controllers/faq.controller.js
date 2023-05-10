const httpStatus = require('http-status');
const { Faq } = require('../utils/database');
const catchAsync = require('../utils/catchAsync');

const getData = catchAsync(async (req, res) => {
  try {
    const faqData = await Faq.findAll();

    res.status(200).send({ data: faqData });
  } catch (e) {
    res.status(httpStatus['500_NAME']);
  }
});

const createData = catchAsync(async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faqData = await Faq.create({ question, answer });

    res.status(httpStatus.CREATED).send({ data: faqData });
  } catch (e) {
    res.status(httpStatus['500_NAME']);
  }
});

const updateData = catchAsync(async (req, res) => {
  try {
    const { question, answer } = req.body;
    const { id } = req.params;

    const faqData = await Faq.update(
      { question, answer },
      {
        where: {
          id,
        },
      }
    );

    res.status(httpStatus.CREATED).send({ data: faqData });
  } catch (e) {
    res.status(httpStatus['500_NAME']);
  }
});

const deleteData = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const faqData = await Faq.destroy({
      where: {
        id,
      },
    });

    res.status(httpStatus.CREATED).send({ data: faqData });
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
