import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PlacesController } from '@/controllers/places.controller';

export class KellerRoute implements Routes {
  public path = '/places';
  public router = Router();
  public place = new PlacesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/places', AuthMiddleware, this.place.getPlaces)
  }
}
