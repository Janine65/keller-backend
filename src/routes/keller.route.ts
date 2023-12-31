import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PlacesController } from '@/controllers/places.controller';
import { PlacetypesController } from '@/controllers/placetypes.controller';
import { SubplacesController } from '@/controllers/subplaces.controller';
import { ThingsController } from '@/controllers/things.controller';

export class KellerRoute implements Routes {
  public path = '/basedata';
  public router = Router();
  public place = new PlacesController();
  public placetype = new PlacetypesController();
  public subplace = new SubplacesController();
  public thing = new ThingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path + '/places', AuthMiddleware, this.place.getPlaces)
    this.router.put(this.path + '/places/insert', AuthMiddleware, this.place.insertPlace)
    this.router.post(this.path + '/places/update', AuthMiddleware, this.place.updatePlace)
    this.router.delete(this.path + '/places/delete', AuthMiddleware, this.place.deletePlace)

    this.router.get(this.path + '/placetypes', AuthMiddleware, this.placetype.getPlacetypes)
    this.router.put(this.path + '/placetypes/insert', AuthMiddleware, this.placetype.insertPlacetype)
    this.router.post(this.path + '/placetypes/update', AuthMiddleware, this.placetype.updatePlacetype)
    this.router.delete(this.path + '/placetypes/delete', AuthMiddleware, this.placetype.deletePlacetype)

    this.router.get(this.path + '/subplaces', AuthMiddleware, this.subplace.getSubplaces)
    this.router.put(this.path + '/subplaces/insert', AuthMiddleware, this.subplace.insertSubplace)
    this.router.post(this.path + '/subplaces/update', AuthMiddleware, this.subplace.updateSubplace)
    this.router.delete(this.path + '/subplaces/delete', AuthMiddleware, this.subplace.deleteSubplace)

    this.router.get(this.path + '/things', AuthMiddleware, this.thing.getThings)
    this.router.get(this.path + '/things/subplaces', AuthMiddleware, this.thing.getAllObject2Subplaces)
    this.router.post(this.path + '/things/subplaces/update', AuthMiddleware, this.thing.updateObject2Subplaces)
    this.router.delete(this.path + '/things/subplaces/delete', AuthMiddleware, this.thing.deleteObject2Subplaces)
    this.router.put(this.path + '/things/subplaces/insert', AuthMiddleware, this.thing.insertObject2Subplaces)

    this.router.get(this.path + '/things/alcoholic', AuthMiddleware, this.thing.getAlcoholics)
    this.router.get(this.path + '/things/alcoholic/id', AuthMiddleware, this.thing.getAlcoholicbyId)
    this.router.put(this.path + '/things/alcoholic/insert', AuthMiddleware, this.thing.insertAlcoholic)
    this.router.post(this.path + '/things/alcoholic/update', AuthMiddleware, this.thing.updateAlcoholic)
    this.router.delete(this.path + '/things/alcoholic/delete', AuthMiddleware, this.thing.deleteAlcoholic)
    this.router.get(this.path + '/things/alcoholic/subplaces', AuthMiddleware, this.thing.getAlcoholic2Subplaces)
    this.router.put(this.path + '/things/alcoholic/subplaces/insert', AuthMiddleware, this.thing.insertAlcoholic2Subplaces)

    this.router.get(this.path + '/things/food', AuthMiddleware, this.thing.getFoods)
    this.router.get(this.path + '/things/food/id', AuthMiddleware, this.thing.getFoodbyId)
    this.router.put(this.path + '/things/food/insert', AuthMiddleware, this.thing.insertFood)
    this.router.post(this.path + '/things/food/update', AuthMiddleware, this.thing.updateFood)
    this.router.delete(this.path + '/things/food/delete', AuthMiddleware, this.thing.deleteFood)
    this.router.get(this.path + '/things/food/subplaces', AuthMiddleware, this.thing.getFood2Subplaces)
    this.router.put(this.path + '/things/food/subplaces/insert', AuthMiddleware, this.thing.insertFood2Subplaces)

    this.router.get(this.path + '/things/nonalcoholic', AuthMiddleware, this.thing.getNonalcoholics)
    this.router.get(this.path + '/things/nonalcoholic/id', AuthMiddleware, this.thing.getNonalcoholicbyId)
    this.router.put(this.path + '/things/nonalcoholic/insert', AuthMiddleware, this.thing.insertNonalcoholic)
    this.router.post(this.path + '/things/nonalcoholic/update', AuthMiddleware, this.thing.updateNonalcoholic)
    this.router.delete(this.path + '/things/nonalcoholic/delete', AuthMiddleware, this.thing.deleteNonalcoholic)
    this.router.get(this.path + '/things/nonalcoholic/subplaces', AuthMiddleware, this.thing.getNonalcoholic2Subplaces)
    this.router.put(this.path + '/things/nonalcoholic/subplaces/insert', AuthMiddleware, this.thing.insertNonalcoholic2Subplaces)

    this.router.get(this.path + '/things/nonfood', AuthMiddleware, this.thing.getNonfoods)
    this.router.get(this.path + '/things/nonfood/id', AuthMiddleware, this.thing.getNonfoodbyId)
    this.router.put(this.path + '/things/nonfood/insert', AuthMiddleware, this.thing.insertNonfood)
    this.router.post(this.path + '/things/nonfood/update', AuthMiddleware, this.thing.updateNonfood)
    this.router.delete(this.path + '/things/nonfood/delete', AuthMiddleware, this.thing.deleteNonfood)
    this.router.get(this.path + '/things/nonfood/subplaces', AuthMiddleware, this.thing.getNonfood2Subplaces)
    this.router.put(this.path + '/things/nonfood/subplaces/insert', AuthMiddleware, this.thing.insertNonfood2Subplaces)
  }
}
