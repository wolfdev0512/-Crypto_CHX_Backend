const config = require('../config/config');

const VideoModel = (sequelize, DataTypes) => {
  return sequelize.define('video', {
    video_url: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('video_url');
        return `${config.baseUrl}/videos/${rawValue}`;
      },
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = VideoModel;
