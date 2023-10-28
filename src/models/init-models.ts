import type { Sequelize } from 'sequelize';
import { Food as _food } from './food';
import type { FoodAttributes, FoodCreationAttributes } from './food';
import { Nonfood as _nonfood } from './nonfood';
import type { NonfoodAttributes, NonfoodCreationAttributes } from './nonfood';
import { Object2Subplace as _object2Subplace } from './object2Subplace';
import type { Object2SubplaceAttributes, Object2SubplaceCreationAttributes } from './object2Subplace';
import { Place as _place } from './place';
import type { PlaceAttributes, PlaceCreationAttributes } from './place';
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
  _subplace as subplace,
  _thing as Thing,
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
  const subplace = _subplace.initModel(sequelize);
  const thing = _thing.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const alcoholic = _alcoholic.initModel(sequelize);
  const nonalcoholic = _nonalcoholic.initModel(sequelize);

  subplace.belongsToMany(thing, { as: 'objectid_things', through: object2Subplace, foreignKey: 'subplaceid', otherKey: 'objectid' });
  thing.belongsToMany(subplace, { as: 'subplaceid_subplaces', through: object2Subplace, foreignKey: 'objectid', otherKey: 'subplaceid' });
  subplace.belongsTo(place, { as: 'place', foreignKey: 'placeid' });
  place.hasMany(subplace, { as: 'subplaces', foreignKey: 'placeid' });
  object2Subplace.belongsTo(subplace, { as: 'subplace', foreignKey: 'subplaceid' });
  subplace.hasMany(object2Subplace, { as: 'object2subplaces', foreignKey: 'subplaceid' });
  object2Subplace.belongsTo(thing, { as: 'object', foreignKey: 'objectid' });
  thing.hasMany(object2Subplace, { as: 'object2subplaces', foreignKey: 'objectid' });
  object2Subplace.belongsTo(user, { as: 'user', foreignKey: 'userid' });
  user.hasMany(object2Subplace, { as: 'object2subplaces', foreignKey: 'userid' });
  place.belongsTo(user, { as: 'user', foreignKey: 'userid' });
  user.hasMany(place, { as: 'places', foreignKey: 'userid' });
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
    subplace: subplace,
    thing: thing,
    user: user,
    alcoholic: alcoholic,
    nonalcoholic: nonalcoholic,
  };
}
