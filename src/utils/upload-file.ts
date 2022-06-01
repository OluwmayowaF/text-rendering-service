import multer from 'multer';

/**
 * @class
 * */
class UploadFile {
  private _type: string;
  private _size: number;
  private _folder: string;
  private _name: string;

  /**
   * @constructor
   * @param {Object} options The options object
   * */
  constructor(options = { type: 'media', size: 1, folder: 'media' }) {
    this._type = options.type;
    this._size = options.size;
    this._folder = `${ __dirname}`;
    this.getMulter = this.getMulter.bind(this);
    this.init = this.init.bind(this);
  }

  /**
   * @function
   * @return {function}
   * */
  getMulter() {
    return this.useLocal();
  }

  /**
   * @function
   * @return {function}
   * */
  init() {
    let middleware = this.getMulter().any();
    if (this._size > 1) {
      middleware = this.getMulter().any();
    }
    return middleware;
  }

  /**
   * use local as file storage
   * */
  private useLocal() {
    return multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          // cb(null, this.folder);
          cb(null, `${__dirname}/uploads/`);
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    });
  }
}
export default UploadFile;
