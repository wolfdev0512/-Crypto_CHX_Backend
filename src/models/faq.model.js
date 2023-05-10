const FaqModel = (sequelize, DataTypes) => {
  return sequelize.define('faq', {
    question: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = FaqModel;
