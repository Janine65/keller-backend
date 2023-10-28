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

  public insertPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const insertPlaceData: Place = await this.place.createPlace(req.body);

      res.status(200).json({ data: insertPlaceData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatePlaceData: Place = await this.place.updatePlace(req.body.id, req.body);

      res.status(200).json({ data: updatePlaceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletePlaceData: Place = await this.place.deletePlace(req.query.id as string);

      res.status(200).json({ data: deletePlaceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

}
