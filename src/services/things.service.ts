import { Service } from 'typedi';
import { CreateAlcoholicDto, CreateFoodDto, CreateNonalcoholicDto, CreateNonfoodDto } from '@dtos/things.dto';
import { GlobalHttpException } from '@/exceptions/GlobalHttpException';
import { thing, alcoholic, food, nonalcoholic, nonfood, object2Subplace } from '@models/init-models';
import { Object2Subplace } from '@/models/object2Subplace';
import { Alcoholic } from '@/models/alcoholic';
import { Food } from '@/models/food';
import { Nonalcoholic } from '@/models/nonalcoholic';
import { Nonfood } from '@/models/nonfood';

@Service()
export class ThingService {
  public async findAllThing(): Promise<thing[]> {
    const allThing: thing[] = await thing.findAll();
    return allThing;
  }

  public async findThingById(thingId: string): Promise<thing> {
    const findThing: thing = await thing.findByPk(thingId);
    if (!findThing) throw new GlobalHttpException(409, "thing doesn't exist");

    return findThing;
  }

  public async findAllObject2Subplaces(): Promise<object2Subplace[]> {
    const findOb2Subplace = await Object2Subplace.findAll();
    return findOb2Subplace
  }

  public async findAlcoholic2Subplaces(alcoholicid: number): Promise<object2Subplace[]> {
    const alcoholicData = await Alcoholic.findByPk(Number(alcoholicid))
    if (!alcoholicData) throw new GlobalHttpException(409, "alcoholic doesn't exist");

    const findOb2Subplace: object2Subplace[] = await alcoholicData.getObject2subplaces();
    return findOb2Subplace
  }

  public async createAlcoholic2Subplace(alcoholicData: alcoholic, ob2sub: object2Subplace): Promise<object2Subplace> {
    const findOb2Subplace: object2Subplace = await alcoholicData.createObject2subplace(ob2sub);
    return findOb2Subplace
  }

  public async updateAlcoholic2Subplace(alcoholicData: alcoholic, ob2sub: object2Subplace): Promise<object2Subplace> {
    const hasObj2Subplace: boolean = await alcoholicData.hasObject2subplace(ob2sub);
    if (!hasObj2Subplace)  throw new GlobalHttpException(409, "object2subject doesn't exist");

    const findOb2Subplace: object2Subplace = await alcoholicData.createObject2subplace(ob2sub);
    return findOb2Subplace
  }

  public async deleteAlcoholic2Subplace(alcoholicid: number, subplaceid: number): Promise<boolean> {
    const findObject2Subplace: Object2Subplace = await Object2Subplace.findOne({where: [{ alcoholicid: alcoholicid}, {subplaceid: subplaceid}]})
    if (!findObject2Subplace)  throw new GlobalHttpException(409, "object2subject doesn't exist");
    
    await findObject2Subplace.destroy();
    return true
  }

  public async findAllAlcoholic(): Promise<alcoholic[]> {
    const allAlcoholic: alcoholic[] = await alcoholic.findAll();
    return allAlcoholic;
  }

  public async findAlcoholicById(alcoholicId: string): Promise<alcoholic> {
    const findAlcoholic: alcoholic = await alcoholic.findByPk(alcoholicId);
    if (!findAlcoholic) throw new GlobalHttpException(409, "alcoholic doesn't exist");

    return findAlcoholic;
  }

  public async createAlcoholic(alcoholicData: CreateAlcoholicDto): Promise<alcoholic> {
    const findAlcoholic: alcoholic = await alcoholic.findOne({ where: { name: alcoholicData.name } });
    if (findAlcoholic) throw new GlobalHttpException(409, `This name ${alcoholicData.name} already exists`);

    const createAlcoholicData: alcoholic = await alcoholic.create({... alcoholicData});
    return createAlcoholicData;
  }

  public async updateAlcoholic(alcoholicId: string, alcoholicData: CreateAlcoholicDto): Promise<alcoholic> {
    const findAlcoholic: alcoholic = await alcoholic.findByPk(alcoholicId);
    if (!findAlcoholic) throw new GlobalHttpException(409, "alcoholic doesn't exist");

    await alcoholic.update({...alcoholicData}, { where: { id: alcoholicId } });

    const updateAlcoholic: alcoholic = await alcoholic.findByPk(alcoholicId);
    return updateAlcoholic;
  }

  public async deleteAlcoholic(alcoholicId: string): Promise<alcoholic> {
    const findAlcoholic: alcoholic = await alcoholic.findByPk(alcoholicId);
    if (!findAlcoholic) throw new GlobalHttpException(409, "alcoholic doesn't exist");

    await alcoholic.destroy({ where: { id: alcoholicId } });

    return findAlcoholic;
  }

  public async findAllFood(): Promise<food[]> {
    const allFood: food[] = await food.findAll();
    return allFood;
  }

  public async findFoodById(foodId: string): Promise<food> {
    const findFood: food = await food.findByPk(foodId);
    if (!findFood) throw new GlobalHttpException(409, "food doesn't exist");

    return findFood;
  }

  public async findFood2Subplaces(foodid: number): Promise<object2Subplace[]> {
    const foodData = await Food.findByPk(Number(foodid))
    if (!foodData) throw new GlobalHttpException(409, "food doesn't exist");

    const findOb2Subplace: object2Subplace[] = await foodData.getObject2subplaces();
    return findOb2Subplace
  }

  public async createFood2Subplace(foodData: food, ob2sub: object2Subplace): Promise<object2Subplace> {
    const findOb2Subplace: object2Subplace = await foodData.createObject2subplace(ob2sub);
    return findOb2Subplace
  }

  public async updateFood2Subplace(foodData: food, ob2sub: object2Subplace): Promise<object2Subplace> {
    const hasObj2Subplace: boolean = await foodData.hasObject2subplace(ob2sub);
    if (!hasObj2Subplace)  throw new GlobalHttpException(409, "object2subject doesn't exist");

    const findOb2Subplace: object2Subplace = await foodData.createObject2subplace(ob2sub);
    return findOb2Subplace
  }

  public async deleteFood2Subplace(foodid: number, subplaceid: number): Promise<boolean> {
    const findObject2Subplace: Object2Subplace = await Object2Subplace.findOne({where: [{ foodid: foodid}, {subplaceid: subplaceid}]})
    if (!findObject2Subplace)  throw new GlobalHttpException(409, "object2subject doesn't exist");
    
    await findObject2Subplace.destroy();
    return true
  }

  public async createFood(foodData: CreateFoodDto): Promise<food> {
    const findFood: food = await food.findOne({ where: { name: foodData.name } });
    if (findFood) throw new GlobalHttpException(409, `This name ${foodData.name} already exists`);

    const createFoodData: food = await food.create({... foodData});
    return createFoodData;
  }

  public async updateFood(foodId: string, foodData: CreateFoodDto): Promise<food> {
    const findFood: food = await food.findByPk(foodId);
    if (!findFood) throw new GlobalHttpException(409, "food doesn't exist");

    await food.update({...foodData}, { where: { id: foodId } });

    const updateFood: food = await food.findByPk(foodId);
    return updateFood;
  }

  public async deleteFood(foodId: string): Promise<food> {
    const findFood: food = await food.findByPk(foodId);
    if (!findFood) throw new GlobalHttpException(409, "food doesn't exist");

    await food.destroy({ where: { id: foodId } });

    return findFood;
  }

  public async findAllNonalcoholic(): Promise<nonalcoholic[]> {
    const allNonalcoholic: nonalcoholic[] = await nonalcoholic.findAll();
    return allNonalcoholic;
  }

  public async findNonalcoholicById(nonalcoholicId: string): Promise<nonalcoholic> {
    const findNonalcoholic: nonalcoholic = await nonalcoholic.findByPk(nonalcoholicId);
    if (!findNonalcoholic) throw new GlobalHttpException(409, "nonalcoholic doesn't exist");

    return findNonalcoholic;
  }

  public async findNonalcoholic2Subplaces(nonalcoholicid: number): Promise<object2Subplace[]> {
    const nonalcoholicData = await Nonalcoholic.findByPk(Number(nonalcoholicid))
    if (!nonalcoholicData) throw new GlobalHttpException(409, "nonalcoholic doesn't exist");

    const findOb2Subplace: object2Subplace[] = await nonalcoholicData.getObject2subplaces();
    return findOb2Subplace
  }

  public async createNonalcoholic2Subplace(nonalcoholicData: nonalcoholic, ob2sub: object2Subplace): Promise<object2Subplace> {
    const findOb2Subplace: object2Subplace = await nonalcoholicData.createObject2subplace(ob2sub);
    return findOb2Subplace
  }

  public async updateNonalcoholic2Subplace(nonalcoholicData: nonalcoholic, ob2sub: object2Subplace): Promise<object2Subplace> {
    const hasObj2Subplace: boolean = await nonalcoholicData.hasObject2subplace(ob2sub);
    if (!hasObj2Subplace)  throw new GlobalHttpException(409, "object2subject doesn't exist");

    const findOb2Subplace: object2Subplace = await nonalcoholicData.createObject2subplace(ob2sub);
    return findOb2Subplace
  }

  public async deleteNonalcoholic2Subplace(nonalcoholicid: number, subplaceid: number): Promise<boolean> {
    const findObject2Subplace: Object2Subplace = await Object2Subplace.findOne({where: [{ nonalcoholicid: nonalcoholicid}, {subplaceid: subplaceid}]})
    if (!findObject2Subplace)  throw new GlobalHttpException(409, "object2subject doesn't exist");
    
    await findObject2Subplace.destroy();
    return true
  }

  public async createNonalcoholic(nonalcoholicData: CreateNonalcoholicDto): Promise<nonalcoholic> {
    const findNonalcoholic: nonalcoholic = await nonalcoholic.findOne({ where: { name: nonalcoholicData.name } });
    if (findNonalcoholic) throw new GlobalHttpException(409, `This name ${nonalcoholicData.name} already exists`);

    const createNonalcoholicData: nonalcoholic = await nonalcoholic.create({... nonalcoholicData});
    return createNonalcoholicData;
  }

  public async updateNonalcoholic(nonalcoholicId: string, nonalcoholicData: CreateNonalcoholicDto): Promise<nonalcoholic> {
    const findNonalcoholic: nonalcoholic = await nonalcoholic.findByPk(nonalcoholicId);
    if (!findNonalcoholic) throw new GlobalHttpException(409, "nonalcoholic doesn't exist");

    await nonalcoholic.update({...nonalcoholicData}, { where: { id: nonalcoholicId } });

    const updateNonalcoholic: nonalcoholic = await nonalcoholic.findByPk(nonalcoholicId);
    return updateNonalcoholic;
  }

  public async deleteNonalcoholic(nonalcoholicId: string): Promise<nonalcoholic> {
    const findNonalcoholic: nonalcoholic = await nonalcoholic.findByPk(nonalcoholicId);
    if (!findNonalcoholic) throw new GlobalHttpException(409, "nonalcoholic doesn't exist");

    await nonalcoholic.destroy({ where: { id: nonalcoholicId } });

    return findNonalcoholic;
  }

  public async findAllNonfood(): Promise<nonfood[]> {
    const allNonfood: nonfood[] = await nonfood.findAll();
    return allNonfood;
  }

  public async findNonfoodById(nonfoodId: string): Promise<nonfood> {
    const findNonfood: nonfood = await nonfood.findByPk(nonfoodId);
    if (!findNonfood) throw new GlobalHttpException(409, "nonfood doesn't exist");

    return findNonfood;
  }

  public async findNonfood2Subplaces(nonfoodid: number): Promise<object2Subplace[]> {
    const nonfoodData = await Nonfood.findByPk(Number(nonfoodid))
    if (!nonfoodData) throw new GlobalHttpException(409, "nonfood doesn't exist");

    const findOb2Subplace: object2Subplace[] = await nonfoodData.getObject2subplaces();
    return findOb2Subplace
  }

  public async createNonfood2Subplace(nonfoodData: nonfood, ob2sub: object2Subplace): Promise<object2Subplace> {
    const findOb2Subplace: object2Subplace = await nonfoodData.createObject2subplace(ob2sub);
    return findOb2Subplace
  }

  public async updateNonfood2Subplace(nonfoodData: nonfood, ob2sub: object2Subplace): Promise<object2Subplace> {
    const hasObj2Subplace: boolean = await nonfoodData.hasObject2subplace(ob2sub);
    if (!hasObj2Subplace)  throw new GlobalHttpException(409, "object2subject doesn't exist");

    const findOb2Subplace: object2Subplace = await nonfoodData.createObject2subplace(ob2sub);
    return findOb2Subplace
  }

  public async deleteNonfood2Subplace(nonfoodid: number, subplaceid: number): Promise<boolean> {
    const findObject2Subplace: Object2Subplace = await Object2Subplace.findOne({where: [{ nonfoodid: nonfoodid}, {subplaceid: subplaceid}]})
    if (!findObject2Subplace)  throw new GlobalHttpException(409, "object2subject doesn't exist");
    
    await findObject2Subplace.destroy();
    return true
  }

  public async createNonfood(nonfoodData: CreateNonfoodDto): Promise<nonfood> {
    const findNonfood: nonfood = await nonfood.findOne({ where: { name: nonfoodData.name } });
    if (findNonfood) throw new GlobalHttpException(409, `This name ${nonfoodData.name} already exists`);

    const createNonfoodData: nonfood = await nonfood.create({... nonfoodData});
    return createNonfoodData;
  }

  public async updateNonfood(nonfoodId: string, nonfoodData: CreateNonfoodDto): Promise<nonfood> {
    const findNonfood: nonfood = await nonfood.findByPk(nonfoodId);
    if (!findNonfood) throw new GlobalHttpException(409, "nonfood doesn't exist");

    await nonfood.update({...nonfoodData}, { where: { id: nonfoodId } });

    const updateNonfood: nonfood = await nonfood.findByPk(nonfoodId);
    return updateNonfood;
  }

  public async deleteNonfood(nonfoodId: string): Promise<nonfood> {
    const findNonfood: nonfood = await nonfood.findByPk(nonfoodId);
    if (!findNonfood) throw new GlobalHttpException(409, "nonfood doesn't exist");

    await nonfood.destroy({ where: { id: nonfoodId } });

    return findNonfood;
  }
}
