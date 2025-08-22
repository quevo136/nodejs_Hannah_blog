const { google } = require('googleapis');

exports.postComment = async (auth, videoId, text) => {
  const youtube = google.youtube({ version: 'v3', auth });

  const response = await youtube.commentThreads.insert({
    part: 'snippet',
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: { textOriginal: text },
        },
      },
    },
  });

  return response.data;
};

exports.likeVideo = async (auth, videoId) => {
  const youtube = google.youtube({ version: 'v3', auth });
  await youtube.videos.rate({ id: videoId, rating: 'like' });
  return { ok: true, message: 'Video liked' };
};