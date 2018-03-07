import express from 'express';
import multer from 'multer';
import fs from 'fs';
import AI from '../opencv';

const router = express.Router();
const upload = multer({ dest: `${__dirname}/uploads/` });

router.post('/score', upload.single('file'), async (req, res, next) => {
  const image = req.file;
  if (image.mimetype === 'image/png' || image.mimetype === 'image/jpeg') {
    try {
      const score = await AI.scoreImage(image.path);
      fs.unlink(image.path, () => {
        res.json(score);
      });
    } catch (err) {
      next(err);
    }
  }
});

export default router;
