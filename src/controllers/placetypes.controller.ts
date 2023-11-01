import { Container } from 'typedi';
import { Placetype } from '@/models/placetype';
import { NextFunction, Request, Response } from 'express';
import { PlacetypeService } from '@/services/placetypes.service';

export class PlacetypesController {
  public placetype = Container.get(PlacetypeService);

  public getPlacetypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPlacetypesData: Placetype[] = await this.placetype.findAllPlacetype();

      res.status(200).json({ data: findAllPlacetypesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertPlacetype = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const insertPlacetypeData: Placetype = await this.placetype.createPlacetype(req.body);

      res.status(200).json({ data: insertPlacetypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePlacetype = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatePlacetypeData: Placetype = await this.placetype.updatePlacetype(req.body.id, req.body);

      res.status(200).json({ data: updatePlacetypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePlacetype = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletePlacetypeData: Placetype = await this.placetype.deletePlacetype(req.query.id as string);

      res.status(200).json({ data: deletePlacetypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

}
