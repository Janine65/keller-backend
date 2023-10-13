import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { object2Subplace, object2SubplaceId } from './object2Subplace';
import type { place, placeId } from './place';
import type { subplace, subplaceId } from './subplace';
import type { thing, thingId } from './thing';

export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  userid?: string;
}

export type UserPk = 'id';
export type UserId = User[UserPk];
export type UserOptionalAttributes = 'userid';
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: string;
  login!: string;
  password!: string;
  name!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userid?: string;

  // user hasMany object2Subplace via userid
  object2subplaces!: object2Subplace[];
  getObject2subplaces!: Sequelize.HasManyGetAssociationsMixin<object2Subplace>;
  setObject2subplaces!: Sequelize.HasManySetAssociationsMixin<object2Subplace, object2SubplaceId>;
  addObject2subplace!: Sequelize.HasManyAddAssociationMixin<object2Subplace, object2SubplaceId>;
  addObject2subplaces!: Sequelize.HasManyAddAssociationsMixin<object2Subplace, object2SubplaceId>;
  createObject2subplace!: Sequelize.HasManyCreateAssociationMixin<object2Subplace>;
  removeObject2subplace!: Sequelize.HasManyRemoveAssociationMixin<object2Subplace, object2SubplaceId>;
  removeObject2subplaces!: Sequelize.HasManyRemoveAssociationsMixin<object2Subplace, object2SubplaceId>;
  hasObject2subplace!: Sequelize.HasManyHasAssociationMixin<object2Subplace, object2SubplaceId>;
  hasObject2subplaces!: Sequelize.HasManyHasAssociationsMixin<object2Subplace, object2SubplaceId>;
  countObject2subplaces!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany place via userid
  places!: place[];
  getPlaces!: Sequelize.HasManyGetAssociationsMixin<place>;
  setPlaces!: Sequelize.HasManySetAssociationsMixin<place, placeId>;
  addPlace!: Sequelize.HasManyAddAssociationMixin<place, placeId>;
  addPlaces!: Sequelize.HasManyAddAssociationsMixin<place, placeId>;
  createPlace!: Sequelize.HasManyCreateAssociationMixin<place>;
  removePlace!: Sequelize.HasManyRemoveAssociationMixin<place, placeId>;
  removePlaces!: Sequelize.HasManyRemoveAssociationsMixin<place, placeId>;
  hasPlace!: Sequelize.HasManyHasAssociationMixin<place, placeId>;
  hasPlaces!: Sequelize.HasManyHasAssociationsMixin<place, placeId>;
  countPlaces!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany subplace via userid
  subplaces!: subplace[];
  getSubplaces!: Sequelize.HasManyGetAssociationsMixin<subplace>;
  setSubplaces!: Sequelize.HasManySetAssociationsMixin<subplace, subplaceId>;
  addSubplace!: Sequelize.HasManyAddAssociationMixin<subplace, subplaceId>;
  addSubplaces!: Sequelize.HasManyAddAssociationsMixin<subplace, subplaceId>;
  createSubplace!: Sequelize.HasManyCreateAssociationMixin<subplace>;
  removeSubplace!: Sequelize.HasManyRemoveAssociationMixin<subplace, subplaceId>;
  removeSubplaces!: Sequelize.HasManyRemoveAssociationsMixin<subplace, subplaceId>;
  hasSubplace!: Sequelize.HasManyHasAssociationMixin<subplace, subplaceId>;
  hasSubplaces!: Sequelize.HasManyHasAssociationsMixin<subplace, subplaceId>;
  countSubplaces!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany thing via userid
  things!: thing[];
  getThings!: Sequelize.HasManyGetAssociationsMixin<thing>;
  setThings!: Sequelize.HasManySetAssociationsMixin<thing, thingId>;
  addThing!: Sequelize.HasManyAddAssociationMixin<thing, thingId>;
  addThings!: Sequelize.HasManyAddAssociationsMixin<thing, thingId>;
  createThing!: Sequelize.HasManyCreateAssociationMixin<thing>;
  removeThing!: Sequelize.HasManyRemoveAssociationMixin<thing, thingId>;
  removeThings!: Sequelize.HasManyRemoveAssociationsMixin<thing, thingId>;
  hasThing!: Sequelize.HasManyHasAssociationMixin<thing, thingId>;
  hasThings!: Sequelize.HasManyHasAssociationsMixin<thing, thingId>;
  countThings!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        login: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userid: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: '',
        updatedAt: '',
      },
      {
        sequelize,
        tableName: 'users',
        schema: 'public',
        hasTrigger: true,
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'users_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
