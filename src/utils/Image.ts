// create an image class with attributes width, height and filename

class Image {
  width: number;
  height: number;
  filename: string;

  constructor(width: number, height: number, filename: string) {
    this.width = width;
    this.height = height;
    this.filename = filename;
  }
}

export default Image;
