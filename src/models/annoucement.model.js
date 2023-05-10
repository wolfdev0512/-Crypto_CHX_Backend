const config = require('../config/config');

const AnnoucementModel = (sequelize, DataTypes) => {
  return sequelize.define('annoucement', {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('image_url');
        return rawValue ? `${config.baseUrl}/images/${rawValue}` : null;
      },
      allowNull: true,
    },
    display: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = AnnoucementModel;
