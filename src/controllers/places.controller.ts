import { Container } from 'typedi';
import { Place } from '@/models/place';
import { NextFunction, Request, Response } from 'express';
import { PlaceService } from '@/services/places.service';

export class PlacesController {
  public place = Container.get(PlaceService);

  public getPlaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPlacesData: Place[] = await this.place.findAllPlace();

      res.status(200).json({ data: findAllPlacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

}
