const decodeBase64Image = (dataString) => {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  const extension = matches[1].split('/')[1];

  return { imageBuffer: response, extension };
};

module.exports = {
  decodeBase64Image,
};
