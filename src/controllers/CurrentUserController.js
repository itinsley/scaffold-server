const axios = require('axios');

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7, authHeader.length);
  }
  return null;
};
const show = async (req, res) => {
  const token = getBearerToken(req);
  const authUri = `https://${process.env.AUTH0_DOMAIN}/userinfo`;
  const response = await axios.get(authUri, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  res.send(response.data);
};
module.exports = {
  show,
};
