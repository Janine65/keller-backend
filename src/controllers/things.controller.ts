import { Container } from 'typedi';
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

  public getAllObject2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAlcoholic2SubplacesData: Object2Subplace[] = await this.thing.findAllObject2Subplaces();

      res.status(200).json({ data: findAllAlcoholic2SubplacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAlcoholic2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAlcoholic2SubplacesData: Object2Subplace[] = await this.thing.findAlcoholic2Subplaces(Number(req.query.id));

      res.status(200).json({ data: findAllAlcoholic2SubplacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertAlcoholic2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createAlcoholic2SubplacesData: Object2Subplace = await this.thing.createAlcoholic2Subplace(body['alcoholic'] as Alcoholic, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createAlcoholic2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAlcoholic2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createAlcoholic2SubplacesData: Object2Subplace = await this.thing.updateAlcoholic2Subplace(body['alcoholic'] as Alcoholic, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createAlcoholic2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAlcoholic2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createAlcoholic2SubplacesData: boolean = await this.thing.deleteAlcoholic2Subplace(Number(req.query.alcoholicid), Number(req.query.subplaceid));

      res.status(200).json({ data: createAlcoholic2SubplacesData, message: 'created' });
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

  public getFood2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFood2SubplacesData: Object2Subplace[] = await this.thing.findFood2Subplaces(Number(req.query.id));

      res.status(200).json({ data: findAllFood2SubplacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertFood2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createFood2SubplacesData: Object2Subplace = await this.thing.createFood2Subplace(body['food'] as Food, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createFood2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateFood2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createFood2SubplacesData: Object2Subplace = await this.thing.updateFood2Subplace(body['food'] as Food, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createFood2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFood2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createFood2SubplacesData: boolean = await this.thing.deleteFood2Subplace(Number(req.query.foodid), Number(req.query.subplaceid));

      res.status(200).json({ data: createFood2SubplacesData, message: 'created' });
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

  public getNonalcoholic2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllNonalcoholic2SubplacesData: Object2Subplace[] = await this.thing.findNonalcoholic2Subplaces(Number(req.query.id));

      res.status(200).json({ data: findAllNonalcoholic2SubplacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertNonalcoholic2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createNonalcoholic2SubplacesData: Object2Subplace = await this.thing.createNonalcoholic2Subplace(body['nonalcoholic'] as Nonalcoholic, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createNonalcoholic2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNonalcoholic2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createNonalcoholic2SubplacesData: Object2Subplace = await this.thing.updateNonalcoholic2Subplace(body['nonalcoholic'] as Nonalcoholic, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createNonalcoholic2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNonalcoholic2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createNonalcoholic2SubplacesData: boolean = await this.thing.deleteNonalcoholic2Subplace(Number(req.query.nonalcoholicid), Number(req.query.subplaceid));

      res.status(200).json({ data: createNonalcoholic2SubplacesData, message: 'created' });
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

  public getNonfood2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllNonfood2SubplacesData: Object2Subplace[] = await this.thing.findNonfood2Subplaces(Number(req.query.id));

      res.status(200).json({ data: findAllNonfood2SubplacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public insertNonfood2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createNonfood2SubplacesData: Object2Subplace = await this.thing.createNonfood2Subplace(body['nonfood'] as Nonfood, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createNonfood2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateNonfood2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const createNonfood2SubplacesData: Object2Subplace = await this.thing.updateNonfood2Subplace(body['nonfood'] as Nonfood, body['obj2sub'] as Object2Subplace);

      res.status(200).json({ data: createNonfood2SubplacesData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteNonfood2Subplaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createNonfood2SubplacesData: boolean = await this.thing.deleteNonfood2Subplace(Number(req.query.nonfoodid), Number(req.query.subplaceid));

      res.status(200).json({ data: createNonfood2SubplacesData, message: 'created' });
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
