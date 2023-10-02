// import express from 'express';
import express from 'express';
import { Request, Response } from 'express';
import TransformerService from './services/TransformerService';
import Image from './utils/Image';

const app = express();

// Create a get endpoint for /api/images that with the query parameters width, height and filename
// that returns a resized image with the given width and height
// and the given filename from the images folder

app.get('/api/images', (req: Request, res: Response) => {
  //if width, height or filename is not given, send an error message
  if (!req.query.width || !req.query.height || !req.query.filename) {
    // send an error message with http status code 400
    return res.status(400).send('Please provide width, height and filename');
  }
  const width: number = Number(req.query.width);
  const height: number = Number(req.query.height);
  // else if width or height is not a number, send an error message
  if (isNaN(width) || isNaN(height)) {
    // send an error message with http status code 400
    return res.status(400).send('Please provide width and height as a number');
  }

  // else if width or height is not equal or greater than 10, send an error message
  if (width < 10 || height < 10) {
    // send an error message with http status code 400
    return res
      .status(400)
      .send('Please provide width and height greater than 10');
  }

  // if filename is not a string, send an error message
  if (typeof req.query.filename !== 'string') {
    // send an error message with http status code 400
    return res.status(400).send('Please provide filename as a string');
  }
  // else if filename is an empty string, send an error message
  else if (req.query.filename === '') {
    // send an error message with http status code 400
    return res.status(400).send('Please provide filename');
  }

  // convert req.query.filename to string
  const filename: string = <string>(<unknown>req.query.filename);

  const image = new Image(width, height, filename);

  // resize the image with transformerService
  const transformerService = new TransformerService();
  transformerService
    .resize(image.filename, image.width, image.height)
    .then((resizedImageBuffer) => {
      // in the response set the content-type to image/jpeg
      res.setHeader('Content-Type', 'image/jpeg');
      // send the resized image
      return res.send(resizedImageBuffer);
    })
    .catch((err) => {
      console.log(err);
      // if there is an error, send the error message
      return res.status(500).send(err);
    });
});

app.listen(3000, () => console.log('Server running'));

export default app;
