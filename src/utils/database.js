const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const logger = require('../config/logger');
const DashboardModel = require('../models/dashboard.model');
const AnnoucementModel = require('../models/annoucement.model');
const TeamModel = require('../models/team.model');
const FaqModel = require('../models/faq.model');
const VideoModel = require('../models/video.model');

const sequelize = new Sequelize(config.mysql.dbName, config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  port: config.mysql.port,
  dialect: 'mysql',
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    logger.info('table created successfully');
  } catch (e) {
    logger.error(e);
  }
})();

const Dashboard = DashboardModel(sequelize, DataTypes);
const Annoucement = AnnoucementModel(sequelize, DataTypes);
const Team = TeamModel(sequelize, DataTypes);
const Faq = FaqModel(sequelize, DataTypes);
const Video = VideoModel(sequelize, DataTypes);

module.exports = {
  sequelize,
  Dashboard,
  Annoucement,
  Team,
  Faq,
  Video,
};
