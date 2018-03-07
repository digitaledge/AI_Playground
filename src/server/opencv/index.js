import runInception from './inception';
import runNSFW from './nsfw';

const scoreImage = async imagePath => {
  const classification = await runInception(imagePath);
  const nsfw = await runNSFW(imagePath);
  return {
    nsfw,
    classification,
  };
};

export default {
  scoreImage,
  runInception,
  runNSFW,
};
