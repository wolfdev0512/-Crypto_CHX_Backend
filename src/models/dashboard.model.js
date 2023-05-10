const config = require('../config/config');

const DashboardModel = (sequelize, DataTypes) => {
  return sequelize.define('dashboard', {
    user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primary_mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token_sale_countdown: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    whitepaper_url: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('whitepaper_url');
        return rawValue ? `${config.baseUrl}/files/${rawValue}` : null;
      },
      allowNull: true,
    },
    docs_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    display_team_section: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    announcements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};

module.exports = DashboardModel;
