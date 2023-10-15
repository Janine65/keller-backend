import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import * as pkg from '../../package.json';

export class GeneralRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/about', function (req, res) {
      res.json(pkg);
    });
  }
}
