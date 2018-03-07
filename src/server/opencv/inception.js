import cv from 'opencv4nodejs';
import fs from 'fs';
import path from 'path';

const modelPath = `${__dirname}/models/inception5h`;
const modelFile = path.resolve(modelPath, 'tensorflow_inception_graph.pb');
const classNamesFile = path.resolve(
  modelPath,
  'imagenet_comp_graph_label_strings.txt',
);
const classNames = fs
  .readFileSync(classNamesFile)
  .toString()
  .split('\n');
const net = cv.readNetFromTensorflow(modelFile);

const score = async imagePath => {
  const img = await cv.imreadAsync(imagePath);
  // inception model works with 224 x 224 images, so we resize
  // our input images and pad the image with white pixels to
  // make the images have the same width and height
  const maxImgDim = 224;
  const white = new cv.Vec(255, 255, 255);
  const imgResized = await img.resizeToMaxAsync(maxImgDim);
  const imgWhite = imgResized.padToSquare(white);
  const inputBlob = await cv.blobFromImageAsync(imgWhite);
  await net.setInputAsync(inputBlob);
  // classification result as 1xN Mat with confidences of each class
  const outputBlob = await net.forwardAsync();
  // find all labels with a minimum confidence
  const minConfidence = 0.05;
  const locations = outputBlob
    .threshold(minConfidence, 1, cv.THRESH_BINARY)
    .convertTo(cv.CV_8U)
    .findNonZero();

  return locations
    .map(pt => ({
      score: parseInt(outputBlob.at(0, pt.x) * 100) / 100,
      className: classNames[pt.x],
    }))
    .sort((r0, r1) => r1.score - r0.score);
};

export default score;
