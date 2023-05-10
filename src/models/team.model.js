const config = require('../config/config');

const TeamModel = (sequelize, DataTypes) => {
  return sequelize.define('team', {
    avatar: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('avatar');
        return `${config.baseUrl}/images/${rawValue}`;
      },
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = TeamModel;
