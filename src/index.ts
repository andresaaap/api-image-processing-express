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
        const width: number = Number(req.query.width);
        const height: number = Number(req.query.height);
        const filename: string = req.query.filename as string;
        var image = new Image(width, height, filename);

        // resize the image with transformerService
        var transformerService = new TransformerService();
        transformerService.resize(image.filename, image.width, image.height)
        .then((resizedImageBuffer) => {
            // in the response set the content-type to image/jpeg
            res.setHeader('Content-Type', 'image/jpeg');
            // send the resized image
            res.send(resizedImageBuffer);
        })
        .catch((err) => {
            console.log(err);
            // if there is an error, send the error message
            res.send(err);
        });

        
    }
);

app.listen(3000, () => console.log('Server running'));