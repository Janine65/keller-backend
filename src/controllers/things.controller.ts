import { Container } from 'typedi';
import { AuthService } from '@services/auth.service';
import { Thing } from '@/models/thing';
import { ThingService } from '@/services/things.service';
import { NextFunction, Request, Response } from 'express';
import { Alcoholic } from '@/models/alcoholic';
import { Food } from '@/models/food';
import { Nonalcoholic } from '@/models/nonalcoholic';
import { Nonfood } from '@/models/nonfood';
import { Object2Subplace } from '@/models/object2Subplace';

export class ThingsController {
  public thing = Container.get(ThingService);

  public getThings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllThingsData: Thing[] = await this.thing.findAllThing();

      res.status(200).json({ data: findAllThingsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllThing2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllThing2SubplacesData: Object2Subplace[] = await this.thing.findAllThing2Subplaces();

      res.status(200).json({ data: findAllThing2SubplacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getThing2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllThing2SubplacesData: Object2Subplace[] = await this.thing.findThing2Subplaces(Number(req.query.id));

      res.status(200).json({ data: findAllThing2SubplacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertThing2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createThing2SubplacesData: Object2Subplace = await this.thing.createThing2Subplace(body['thing'] as Thing, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createThing2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateThing2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createThing2SubplacesData: Object2Subplace = await this.thing.updateThing2Subplace(body['thing'] as Thing, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createThing2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteThing2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createThing2SubplacesData: boolean = await this.thing.deleteThing2Subplace(Number(req.query.thingid), Number(req.query.subplaceid));

      res.status(200).json({ data: createThing2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAlcoholics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAlcoholicData: Alcoholic[] = await this.thing.findAllAlcoholic();

      res.status(200).json({ data: findAllAlcoholicData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertAlcoholic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const insertAlcoholicData: Alcoholic = await this.thing.createAlcoholic(req.body);

      res.status(200).json({ data: insertAlcoholicData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAlcoholic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateAlcoholicData: Alcoholic = await this.thing.updateAlcoholic(req.body.id, req.body);

      res.status(200).json({ data: updateAlcoholicData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAlcoholic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteAlcoholicData: Alcoholic = await this.thing.deleteAlcoholic(req.query.id as string);

      res.status(200).json({ data: deleteAlcoholicData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getFoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFoodData: Food[] = await this.thing.findAllFood();

      res.status(200).json({ data: findAllFoodData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const insertFoodData: Food = await this.thing.createFood(req.body);

      res.status(200).json({ data: insertFoodData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateFoodData: Food = await this.thing.updateFood(req.body.id, req.body);

      res.status(200).json({ data: updateFoodData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteFoodData: Food = await this.thing.deleteFood(req.query.id as string);

      res.status(200).json({ data: deleteFoodData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getNonalcoholics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllNonalcoholicData: Nonalcoholic[] = await this.thing.findAllNonalcoholic();

      res.status(200).json({ data: findAllNonalcoholicData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertNonalcoholic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const insertNonalcoholicData: Nonalcoholic = await this.thing.createNonalcoholic(req.body);

      res.status(200).json({ data: insertNonalcoholicData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNonalcoholic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateNonalcoholicData: Nonalcoholic = await this.thing.updateNonalcoholic(req.body.id, req.body);

      res.status(200).json({ data: updateNonalcoholicData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNonalcoholic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteNonalcoholicData: Nonalcoholic = await this.thing.deleteNonalcoholic(req.query.id as string);

      res.status(200).json({ data: deleteNonalcoholicData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getNonfoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllNonfoodData: Nonfood[] = await this.thing.findAllNonfood();

      res.status(200).json({ data: findAllNonfoodData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertNonfood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const insertNonfoodData: Nonfood = await this.thing.createNonfood(req.body);

      res.status(200).json({ data: insertNonfoodData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNonfood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateNonfoodData: Nonfood = await this.thing.updateNonfood(req.body.id, req.body);

      res.status(200).json({ data: updateNonfoodData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNonfood = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteNonfoodData: Nonfood = await this.thing.deleteNonfood(req.query.id as string);

      res.status(200).json({ data: deleteNonfoodData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
