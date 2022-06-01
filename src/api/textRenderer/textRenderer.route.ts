import { Router } from 'express';
import TextRendererController from './textRenderer.controller';
import { TextRendererModel } from './textRenderer.model';
import UploadFile from '../../utils/upload-file';

import response from '../../middleware/response';

const router = Router();

const ctrl = new TextRendererController(TextRendererModel);

router.route('/render-text').post(
  new UploadFile({
    type: 'file',
    folder: '',
    size: 1,
  }).init(),
  ctrl.renderer,
  response,
);

export default router;
