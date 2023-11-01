import { Container } from 'typedi';
import { Subplace } from '@/models/subplace';
import { NextFunction, Request, Response } from 'express';
import { SubplaceService } from '@/services/subplaces.service';

export class SubplacesController {
  public subplace = Container.get(SubplaceService);

  public getSubplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSubplacesData: Subplace[] = await this.subplace.findAllSubplace();

      res.status(200).json({ data: findAllSubplacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertSubplace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const insertSubplaceData: Subplace = await this.subplace.createSubplace(req.body);

      res.status(200).json({ data: insertSubplaceData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSubplace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateSubplaceData: Subplace = await this.subplace.updateSubplace(req.body.id, req.body);

      res.status(200).json({ data: updateSubplaceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSubplace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteSubplaceData: Subplace = await this.subplace.deleteSubplace(req.query.id as string);

      res.status(200).json({ data: deleteSubplaceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

}
