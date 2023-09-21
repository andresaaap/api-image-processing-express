// import sharp from 'sharp';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import path from 'path';

// Create a class called TransformerService that has a method called resize
// that takes a filename, width and height as parameters and returns a Promise
// that resolves to a Buffer with the resized image

class TransformerService {
    public resize(filename: string, width: number, height: number): Promise<Buffer> {
         // return a promise that resolves to a Buffer with the resized image
        return new Promise<Buffer>((resolve, reject) => {
            // create the resized image filename using the original filename, width and height
            var filenameParts = filename.split('.');
            var resizedFilename = `${filenameParts[0]}_${width}_${height}.${filenameParts[1]}`;
            var thumbnailsPath = path.join(__dirname, '../thumbnails');
            // if the resized image already exists in the thumbnails folder
            fs.stat(`${thumbnailsPath}/${resizedFilename}`)
            .then((stats) => {
                // if the resized image already exists in the thumbnails folder
                if (stats.isFile()) {
                    // read the resized image from the thumbnails folder
                    fs.readFile(`${thumbnailsPath}/${resizedFilename}`)
                    .then((data) => {
                        // resolve the promise with the resized image
                        resolve(data);
                    });
                }

            })
            .catch((err) => {
                    console.log(err);

                    var imgPath = path.join(__dirname, '../images', filename);

                    var resizedImageBuffer: Buffer;

                    // read the image from the images folder
                    fs.readFile(imgPath)
                    .then((data) => {
                        // resize the image
                        sharp(data)
                        .resize(width, height)
                        .toBuffer()
                        .then((result: Buffer) => {
                            resizedImageBuffer = result;
                            
                            // create the thumbnails folder if it doesn't exist
                            return fs.mkdir(thumbnailsPath, { recursive: true });
                        })
                        .then(() => {
                            // save the resized image to the thumbnails folder
                            return fs.writeFile(`${thumbnailsPath}/${resizedFilename}`, resizedImageBuffer);
                        })
                        .then(() => {
                            // resolve the promise with the resized image
                            resolve(resizedImageBuffer);
                        })
                        .catch((err) => {
                            // reject the promise with the error
                            reject(err);
                        });
                    })
                    .catch((err) => {
                        // reject the promise with the error
                        
                        reject(err);
                    });
                }
            );
        });
    }
}

export default TransformerService;
