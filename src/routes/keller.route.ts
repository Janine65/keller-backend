import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PlacesController } from '@/controllers/places.controller';
import { PlacetypesController } from '@/controllers/placetypes.controller';
import { SubplacesController } from '@/controllers/subplaces.controller';
import { ThingsController } from '@/controllers/things.controller';

const kellerRouter: Router = Router();
const place = new PlacesController();
const placetype = new PlacetypesController();
const subplace = new SubplacesController();
const thing = new ThingsController();
  /**
   * @swagger
   * tags:
   *   - name: places
   *     description: All REST API with places
   *   - name: placetypes
   *     description: All REST API with placetypes
   *   - name: subplaces
   *     description: All REST API with subplaces
   *   - name: things
   *     description: All REST API with things
   *   - name: thing alcoholic
   *     description: All REST API with things of type alcoholic
   *   - name: thing food
   *     description: All REST API with things of type food
   *   - name: thing nonalcoholic
   *     description: All REST API with things of type nonalcoholic
   *   - name: thing nonfood
   *     description: All REST API with things of type nonfood
   */

/**
 * @swagger
 * /basedata/places:
 *    get:
 *      tags: 
 *        - places
 *      description: get all Places
 */
kellerRouter.get('/places', AuthMiddleware, place.getPlaces)
/**
 * @swagger
 * /basedata/places/insert:
 *    put:
 *      tags: 
 *        - places
 *      description: insert a Place
 */
kellerRouter.put('/places/insert', AuthMiddleware, place.insertPlace)
/**
 * @swagger
 * /basedata/places/update:
 *    post:
 *      tags: 
 *        - places
 *      description: update a Place
 */
kellerRouter.post('/places/update', AuthMiddleware, place.updatePlace)
/**
 * @swagger
 * /basedata/places/delete:
 *    delete:
 *      tags: 
 *        - places
 *      description: delete a Place
 */
kellerRouter.delete('/places/delete', AuthMiddleware, place.deletePlace)

/**
 * @swagger
 * /basedata/placetypes:
 *    get:
 *      tags: 
 *        - placetypes
 *      description: get all Placetypes
 */
kellerRouter.get('/placetypes', AuthMiddleware, placetype.getPlacetypes)
/**
 * @swagger
 * /basedata/placetypes/insert:
 *    put:
 *      tags: 
 *        - placetypes
 *      description: insert a Placetype
 */
kellerRouter.put('/placetypes/insert', AuthMiddleware, placetype.insertPlacetype)
/**
 * @swagger
 * /basedata/placetypes/update:
 *    post:
 *      tags: 
 *        - placetypes
 *      description: update a Placetype
 */
kellerRouter.post('/placetypes/update', AuthMiddleware, placetype.updatePlacetype)
/**
 * @swagger
 * /basedata/placetypes/delete:
 *    delete:
 *      tags: 
 *        - placetypes
 *      description: delete a Placetype
 */
kellerRouter.delete('/placetypes/delete', AuthMiddleware, placetype.deletePlacetype)

/**
 * @swagger
 * /basedata/subplaces:
 *    get:
 *      tags: 
 *        - subplaces
 *      description: get all Subplaces
 */
kellerRouter.get('/subplaces', AuthMiddleware, subplace.getSubplaces)
/**
 * @swagger
 * /basedata/subplaces/insert:
 *    put:
 *      tags: 
 *        - subplaces
 *      description: insert a Subplace
 */
kellerRouter.put('/subplaces/insert', AuthMiddleware, subplace.insertSubplace)
/**
 * @swagger
 * /basedata/subplaces/update:
 *    post:
 *      tags: 
 *        - subplaces
 *      description: update a Subplace
 */
kellerRouter.post('/subplaces/update', AuthMiddleware, subplace.updateSubplace)
/**
 * @swagger
 * /basedata/subplaces/delete:
 *    delete:
 *      tags: 
 *        - subplaces
 *      description: delete a Subplace
 */
kellerRouter.delete('/subplaces/delete', AuthMiddleware, subplace.deleteSubplace)

/**
 * @swagger
 * /basedata/things:
 *    get:
 *      tags: 
 *        - things
 *      description: get aall Things
 */
kellerRouter.get('/things', AuthMiddleware, thing.getThings)
/**
 * @swagger
 * /basedata/things/subplaces:
 *    get:
 *      tags: 
 *        - things
 *      description: get all Thing-Subplace Relations
 */
kellerRouter.get('/things/subplaces', AuthMiddleware, thing.getAllObject2Subplaces)
/**
 * @swagger
 * /basedata/things/subplaces/update:
 *    post:
 *      tags: 
 *        - things
 *      description: update a Thing-Subplace Relation
 */
kellerRouter.post('/things/subplaces/update', AuthMiddleware, thing.updateObject2Subplaces)
/**
 * @swagger
 * /basedata/things/subplaces/delete:
 *    delete:
 *      tags: 
 *        - things
 *      description: delete a Thing-Subplace Relation
 */
kellerRouter.delete('/things/subplaces/delete', AuthMiddleware, thing.deleteObject2Subplaces)
/**
 * @swagger
 * /basedata/things/subplaces/insert:
 *    put:
 *      tags: 
 *        - things
 *      description: insert a Thing-Subplace Relation
 */
kellerRouter.put('/things/subplaces/insert', AuthMiddleware, thing.insertObject2Subplaces)

/**
 * @swagger
 * /basedata/things/alcoholic:
 *    get:
 *      tags: 
 *        - thing alcoholic
 *      description: get all Thing of type alcoholic
 */
kellerRouter.get('/things/alcoholic', AuthMiddleware, thing.getAlcoholics)
/**
 * @swagger
 * /basedata/things/alcoholic/id:
 *    get:
 *      tags: 
 *        - thing alcoholic
 *      description: get one Thing of type alcoholic
 */
kellerRouter.get('/things/alcoholic/id', AuthMiddleware, thing.getAlcoholicbyId)
/**
 * @swagger
 * /basedata/things/alcoholic/id:
 *    put:
 *      tags: 
 *        - thing alcoholic
 *      description: update a Thing of type alcoholic
 */
kellerRouter.put('/things/alcoholic/insert', AuthMiddleware, thing.insertAlcoholic)
/**
 * @swagger
 * /basedata/things/alcoholic/id:
 *    post:
 *      tags: 
 *        - thing alcoholic
 *      description: update a Thing of type alcoholic
 */
kellerRouter.post('/things/alcoholic/update', AuthMiddleware, thing.updateAlcoholic)
/**
 * @swagger
 * /basedata/things/alcoholic/id:
 *    delete:
 *      tags: 
 *        - thing alcoholic
 *      description: delete a Thing of type alcoholic
 */
kellerRouter.delete('/things/alcoholic/delete', AuthMiddleware, thing.deleteAlcoholic)
/**
 * @swagger
 * /basedata/things/alcoholic/subplaces:
 *    get:
 *      tags: 
 *        - thing alcoholic
 *      description: get all Thing-Subplace Relations of type alcoholic
 */
kellerRouter.get('/things/alcoholic/subplaces', AuthMiddleware, thing.getAlcoholic2Subplaces)
/**
 * @swagger
 * /basedata/things/alcoholic/subplaces/insert:
 *    put:
 *      tags: 
 *        - thing alcoholic
 *      description: insert a Thing-Subplace Relations of type alcoholic
 */
kellerRouter.put('/things/alcoholic/subplaces/insert', AuthMiddleware, thing.insertAlcoholic2Subplaces)

/**
 * @swagger
 * /basedata/things/food:
 *    get:
 *      tags: 
 *        - thing food
 *      description: get all Thing of type food
 */
kellerRouter.get('/things/food', AuthMiddleware, thing.getFoods)
/**
 * @swagger
 * /basedata/things/food/id:
 *    get:
 *      tags: 
 *        - thing food
 *      description: get one Thing of type food
 */
kellerRouter.get('/things/food/id', AuthMiddleware, thing.getFoodbyId)
/**
 * @swagger
 * /basedata/things/food/id:
 *    put:
 *      tags: 
 *        - thing food
 *      description: update a Thing of type food
 */
kellerRouter.put('/things/food/insert', AuthMiddleware, thing.insertFood)
/**
 * @swagger
 * /basedata/things/food/id:
 *    post:
 *      tags: 
 *        - thing food
 *      description: update a Thing of type food
 */
kellerRouter.post('/things/food/update', AuthMiddleware, thing.updateFood)
/**
 * @swagger
 * /basedata/things/food/id:
 *    delete:
 *      tags: 
 *        - thing food
 *      description: delete a Thing of type food
 */
kellerRouter.delete('/things/food/delete', AuthMiddleware, thing.deleteFood)
/**
 * @swagger
 * /basedata/things/food/subplaces:
 *    get:
 *      tags: 
 *        - thing food
 *      description: get all Thing-Subplace Relations of type food
 */
kellerRouter.get('/things/food/subplaces', AuthMiddleware, thing.getFood2Subplaces)
/**
 * @swagger
 * /basedata/things/food/subplaces/insert:
 *    put:
 *      tags: 
 *        - thing food
 *      description: insert a Thing-Subplace Relations of type food
 */
kellerRouter.put('/things/food/subplaces/insert', AuthMiddleware, thing.insertFood2Subplaces)

/**
 * @swagger
 * /basedata/things/nonalcoholic:
 *    get:
 *      tags: 
 *        - thing nonalcoholic
 *      description: get all Thing of type nonalcoholic
 */
kellerRouter.get('/things/nonalcoholic', AuthMiddleware, thing.getNonalcoholics)
/**
 * @swagger
 * /basedata/things/nonalcoholic/id:
 *    get:
 *      tags: 
 *        - thing nonalcoholic
 *      description: get one Thing of type nonalcoholic
 */
kellerRouter.get('/things/nonalcoholic/id', AuthMiddleware, thing.getNonalcoholicbyId)
/**
 * @swagger
 * /basedata/things/nonalcoholic/id:
 *    put:
 *      tags: 
 *        - thing nonalcoholic
 *      description: update a Thing of type nonalcoholic
 */
kellerRouter.put('/things/nonalcoholic/insert', AuthMiddleware, thing.insertNonalcoholic)
/**
 * @swagger
 * /basedata/things/nonalcoholic/id:
 *    post:
 *      tags: 
 *        - thing nonalcoholic
 *      description: update a Thing of type nonalcoholic
 */
kellerRouter.post('/things/nonalcoholic/update', AuthMiddleware, thing.updateNonalcoholic)
/**
 * @swagger
 * /basedata/things/nonalcoholic/id:
 *    delete:
 *      tags: 
 *        - thing nonalcoholic
 *      description: delete a Thing of type nonalcoholic
 */
kellerRouter.delete('/things/nonalcoholic/delete', AuthMiddleware, thing.deleteNonalcoholic)
/**
 * @swagger
 * /basedata/things/nonalcoholic/subplaces:
 *    get:
 *      tags: 
 *        - thing nonalcoholic
 *      description: get all Thing-Subplace Relations of type nonalcoholic
 */
kellerRouter.get('/things/nonalcoholic/subplaces', AuthMiddleware, thing.getNonalcoholic2Subplaces)
/**
 * @swagger
 * /basedata/things/nonalcoholic/subplaces/insert:
 *    put:
 *      tags: 
 *        - thing nonalcoholic
 *      description: insert a Thing-Subplace Relations of type nonalcoholic
 */
kellerRouter.put('/things/nonalcoholic/subplaces/insert', AuthMiddleware, thing.insertNonalcoholic2Subplaces)

/**
 * @swagger
 * /basedata/things/nonfood:
 *    get:
 *      tags: 
 *        - thing nonfood
 *      description: get all Thing of type nonfood
 */
kellerRouter.get('/things/nonfood', AuthMiddleware, thing.getNonfoods)
/**
 * @swagger
 * /basedata/things/nonfood/id:
 *    get:
 *      tags: 
 *        - thing nonfood
 *      description: get one Thing of type nonfood
 */
kellerRouter.get('/things/nonfood/id', AuthMiddleware, thing.getNonfoodbyId)
/**
 * @swagger
 * /basedata/things/nonfood/id:
 *    put:
 *      tags: 
 *        - thing nonfood
 *      description: update a Thing of type nonfood
 */
kellerRouter.put('/things/nonfood/insert', AuthMiddleware, thing.insertNonfood)
/**
 * @swagger
 * /basedata/things/nonfood/id:
 *    post:
 *      tags: 
 *        - thing nonfood
 *      description: update a Thing of type nonfood
 */
kellerRouter.post('/things/nonfood/update', AuthMiddleware, thing.updateNonfood)
/**
 * @swagger
 * /basedata/things/nonfood/id:
 *    delete:
 *      tags: 
 *        - thing nonfood
 *      description: delete a Thing of type nonfood
 */
kellerRouter.delete('/things/nonfood/delete', AuthMiddleware, thing.deleteNonfood)
/**
 * @swagger
 * /basedata/things/nonfood/subplaces:
 *    get:
 *      tags: 
 *        - thing nonfood
 *      description: get all Thing-Subplace Relations of type nonfood
 */
kellerRouter.get('/things/nonfood/subplaces', AuthMiddleware, thing.getNonfood2Subplaces)
/**
 * @swagger
 * /basedata/things/nonfood/subplaces/insert:
 *    put:
 *      tags: 
 *        - thing nonfood
 *      description: insert a Thing-Subplace Relations of type nonfood
 */
kellerRouter.put('/things/nonfood/subplaces/insert', AuthMiddleware, thing.insertNonfood2Subplaces)

export default kellerRouter