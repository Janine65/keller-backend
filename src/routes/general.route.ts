import { Router } from 'express';
import * as pkg from '../../package.json';

  const generalRouter:Router = Router();

  /**
   * @swagger
   * /about:
   *    get:
 *      tags: 
 *        - generel
   *      description: Get the version
   */
  generalRouter.get('/about', function (req, res) {
    res.json(pkg);
  });

export default generalRouter