const youtubeService = require('../services/youtubeService');
const oauth2Client = require('../config/db/googleClient');

function applySessionTokens(req) {
  if (req.session && req.session.tokens) {
    oauth2Client.setCredentials(req.session.tokens);
  }
}

exports.comment = async (req, res) => {
  applySessionTokens(req);
  const { videoId, text } = req.body;
  try {
    const result = await youtubeService.postComment(oauth2Client, videoId, text);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post comment' });
  }
};

exports.like = async (req, res) => {
  applySessionTokens(req);
  const { videoId } = req.body;
  try {
    const result = await youtubeService.likeVideo(oauth2Client, videoId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to like video' });
  }
};
