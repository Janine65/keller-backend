import type { Sequelize } from 'sequelize';
import { Food as _food } from './food';
import type { FoodAttributes, FoodCreationAttributes } from './food';
import { Nonfood as _nonfood } from './nonfood';
import type { NonfoodAttributes, NonfoodCreationAttributes } from './nonfood';
import { Object2Subplace as _object2Subplace } from './object2Subplace';
import type { Object2SubplaceAttributes, Object2SubplaceCreationAttributes } from './object2Subplace';
import { Place as _place } from './place';
import type { PlaceAttributes, PlaceCreationAttributes } from './place';
import { Placetype as _placetype } from './placetype';
import type { PlacetypeAttributes, PlacetypeCreationAttributes } from './placetype';
import { Subplace as _subplace } from './subplace';
import type { SubplaceAttributes, SubplaceCreationAttributes } from './subplace';
import { Thing as _thing } from './thing';
import type { ThingAttributes, thingCreationAttributes } from './thing';
import { User as _user } from './user';
import type { UserAttributes, UserCreationAttributes } from './user';
import { Alcoholic as _alcoholic } from './alcoholic';
import type { AlcoholicAttributes, AlcoholicCreationAttributes } from './alcoholic';
import { Nonalcoholic as _nonalcoholic } from './nonalcoholic';
import type { NonalcoholicAttributes, NonalcoholicCreationAttributes } from './nonalcoholic';

export {
  _food as food,
  _nonfood as nonfood,
  _object2Subplace as object2Subplace,
  _place as place,
  _placetype as placetype,
  _subplace as subplace,
  _thing as thing,
  _user as user,
  _alcoholic as alcoholic,
  _nonalcoholic as nonalcoholic,
};

export type {
  FoodAttributes as foodAttributes,
  FoodCreationAttributes as foodCreationAttributes,
  NonfoodAttributes as nonfoodAttributes,
  NonfoodCreationAttributes as nonfoodCreationAttributes,
  Object2SubplaceAttributes as object2SubplaceAttributes,
  Object2SubplaceCreationAttributes as object2SubplaceCreationAttributes,
  PlaceAttributes,
  PlaceCreationAttributes,
  PlacetypeAttributes,
  PlacetypeCreationAttributes,
  SubplaceAttributes as subplaceAttributes,
  SubplaceCreationAttributes as subplaceCreationAttributes,
  ThingAttributes,
  thingCreationAttributes,
  UserAttributes as userAttributes,
  UserCreationAttributes as userCreationAttributes,
  AlcoholicAttributes as alcoholicAttributes,
  AlcoholicCreationAttributes as alcoholicCreationAttributes,
  NonalcoholicAttributes as nonalcoholicAttributes,
  NonalcoholicCreationAttributes as nonalcoholicCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const food = _food.initModel(sequelize);
  const nonfood = _nonfood.initModel(sequelize);
  const object2Subplace = _object2Subplace.initModel(sequelize);
  const place = _place.initModel(sequelize);
  const placetype = _placetype.initModel(sequelize);
  const subplace = _subplace.initModel(sequelize);
  const thing = _thing.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const alcoholic = _alcoholic.initModel(sequelize);
  const nonalcoholic = _nonalcoholic.initModel(sequelize);

  subplace.belongsToMany(alcoholic, { as: 'subplace_alcoholic', through: object2Subplace, foreignKey: 'subplaceid', otherKey: 'alcoholicid' });
  alcoholic.belongsToMany(subplace, { as: 'alcohoicid_subplaces', through: object2Subplace, foreignKey: 'alcoholicid', otherKey: 'subplaceid' });
  subplace.belongsToMany(food, { as: 'subplace_food', through: object2Subplace, foreignKey: 'subplaceid', otherKey: 'foodid' });
  food.belongsToMany(subplace, { as: 'foodid_subplaces', through: object2Subplace, foreignKey: 'foodid', otherKey: 'subplaceid' });
  subplace.belongsToMany(nonalcoholic, { as: 'subplace_nonalcoholic', through: object2Subplace, foreignKey: 'subplaceid', otherKey: 'nonalcoholicid' });
  nonalcoholic.belongsToMany(subplace, { as: 'nonalcoholicid_subplaces', through: object2Subplace, foreignKey: 'nonalcoholicid', otherKey: 'subplaceid' });
  subplace.belongsToMany(nonfood, { as: 'subplace_nonfood', through: object2Subplace, foreignKey: 'subplaceid', otherKey: 'nonfoodid' });
  nonfood.belongsToMany(subplace, { as: 'nonfoodid_subplaces', through: object2Subplace, foreignKey: 'nonfoodid', otherKey: 'subplaceid' });
  subplace.belongsTo(place, { as: 'place', foreignKey: 'placeid' });
  place.hasMany(subplace, { as: 'subplaces', foreignKey: 'placeid' });
  place.belongsTo(placetype, { as: 'placetype', foreignKey: 'placetypeid'});
  placetype.hasMany(place, { as: 'places', foreignKey: 'placetypeid'});
  object2Subplace.belongsTo(subplace, { as: 'subplace', foreignKey: 'subplaceid' });
  subplace.hasMany(object2Subplace, { as: 'object2subplaces', foreignKey: 'subplaceid' });
  object2Subplace.belongsTo(thing, { as: 'object', foreignKey: 'id' });
  thing.hasMany(object2Subplace, { as: 'object2subplaces', foreignKey: 'id' });
  object2Subplace.belongsTo(user, { as: 'user', foreignKey: 'userid' });
  user.hasMany(object2Subplace, { as: 'object2subplaces', foreignKey: 'userid' });
  place.belongsTo(user, { as: 'user', foreignKey: 'userid' });
  user.hasMany(place, { as: 'places', foreignKey: 'userid' });
  placetype.belongsTo(user, { as: 'user', foreignKey: 'userid' });
  user.hasMany(placetype, { as: 'placetypes', foreignKey: 'userid' });
  subplace.belongsTo(user, { as: 'user', foreignKey: 'userid' });
  user.hasMany(subplace, { as: 'subplaces', foreignKey: 'userid' });
  thing.belongsTo(user, { as: 'user', foreignKey: 'userid' });
  user.hasMany(thing, { as: 'things', foreignKey: 'userid' });
  user.belongsTo(user, { as: 'user', foreignKey: 'userid' });
  user.hasMany(user, { as: 'user_users', foreignKey: 'userid' });

  return {
    food: food,
    nonfood: nonfood,
    object2Subplace: object2Subplace,
    place: place,
    placetype: placetype,
    subplace: subplace,
    thing: thing,
    user: user,
    alcoholic: alcoholic,
    nonalcoholic: nonalcoholic,
  };
}
