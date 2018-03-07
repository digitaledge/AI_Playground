import cv from 'opencv4nodejs';
import path from 'path';

const modelPath = `${__dirname}/models/nsfw`;
const protoText = path.resolve(modelPath, 'deploy.prototxt');
const modelFile = path.resolve(modelPath, 'resnet_50_1by2_nsfw.caffemodel');
const net = cv.readNetFromCaffe(protoText, modelFile);

const classify = async imagePath => {
  const img = await cv.imreadAsync(imagePath);
  const inputBlob = await cv.blobFromImageAsync(
    img,
    1.0,
    new cv.Size(224, 224),
    new cv.Vec3(104, 117, 123),
  );

  await net.setInputAsync(inputBlob);

  const outputBlob = await net.forwardAsync();
  const result = outputBlob.at(0, 1);
  const score = Number(result.toFixed(2));

  return await generateResultByScore(score);
};

const generateResultByScore = async score => {
  let rating;

  switch (true) {
    case score <= 0.2:
      rating = 'SAVE';
      break;
    case score > 0.2 && score < 0.5:
      rating = 'LIKELY_SAFE';
      break;
    case score >= 0.5 && score < 0.8:
      rating = 'LIKELY_UNSAFE';
      break;
    case score >= 0.8:
      rating = 'UNSAFE';
      break;
  }

  return {
    score,
    rating,
  };
};

export default classify;
