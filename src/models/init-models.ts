import type { Sequelize } from 'sequelize';
import { food as _food } from './food';
import type { foodAttributes, foodCreationAttributes } from './food';
import { nonfood as _nonfood } from './nonfood';
import type { nonfoodAttributes, nonfoodCreationAttributes } from './nonfood';
import { object2Subplace as _object2Subplace } from './object2Subplace';
import type { object2SubplaceAttributes, object2SubplaceCreationAttributes } from './object2Subplace';
import { place as _place } from './place';
import type { placeAttributes, placeCreationAttributes } from './place';
import { subplace as _subplace } from './subplace';
import type { subplaceAttributes, subplaceCreationAttributes } from './subplace';
import { thing as _thing } from './thing';
import type { thingAttributes, thingCreationAttributes } from './thing';
import { User as _user } from './user';
import type { UserAttributes, UserCreationAttributes } from './user';
import { wine as _wine } from './wine';
import type { wineAttributes, wineCreationAttributes } from './wine';

export {
  _food as food,
  _nonfood as nonfood,
  _object2Subplace as object2Subplace,
  _place as place,
  _subplace as subplace,
  _thing as thing,
  _user as user,
  _wine as wine,
};

export type {
  foodAttributes,
  foodCreationAttributes,
  nonfoodAttributes,
  nonfoodCreationAttributes,
  object2SubplaceAttributes,
  object2SubplaceCreationAttributes,
  placeAttributes,
  placeCreationAttributes,
  subplaceAttributes,
  subplaceCreationAttributes,
  thingAttributes,
  thingCreationAttributes,
  UserAttributes as userAttributes,
  UserCreationAttributes as userCreationAttributes,
  wineAttributes,
  wineCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const food = _food.initModel(sequelize);
  const nonfood = _nonfood.initModel(sequelize);
  const object2Subplace = _object2Subplace.initModel(sequelize);
  const place = _place.initModel(sequelize);
  const subplace = _subplace.initModel(sequelize);
  const thing = _thing.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const wine = _wine.initModel(sequelize);

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
    wine: wine,
  };
}
