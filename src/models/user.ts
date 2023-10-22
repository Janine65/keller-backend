import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Object2Subplace, Object2SubplaceId } from './object2Subplace';
import type { Place, PlaceId } from './place';
import type { Subplace, SubplaceId } from './subplace';
import type { Thing, ThingId } from './thing';

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
  object2subplaces!: Object2Subplace[];
  getObject2subplaces!: Sequelize.HasManyGetAssociationsMixin<Object2Subplace>;
  setObject2subplaces!: Sequelize.HasManySetAssociationsMixin<Object2Subplace, Object2SubplaceId>;
  addObject2subplace!: Sequelize.HasManyAddAssociationMixin<Object2Subplace, Object2SubplaceId>;
  addObject2subplaces!: Sequelize.HasManyAddAssociationsMixin<Object2Subplace, Object2SubplaceId>;
  createObject2subplace!: Sequelize.HasManyCreateAssociationMixin<Object2Subplace>;
  removeObject2subplace!: Sequelize.HasManyRemoveAssociationMixin<Object2Subplace, Object2SubplaceId>;
  removeObject2subplaces!: Sequelize.HasManyRemoveAssociationsMixin<Object2Subplace, Object2SubplaceId>;
  hasObject2subplace!: Sequelize.HasManyHasAssociationMixin<Object2Subplace, Object2SubplaceId>;
  hasObject2subplaces!: Sequelize.HasManyHasAssociationsMixin<Object2Subplace, Object2SubplaceId>;
  countObject2subplaces!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany Place via userid
  places!: Place[];
  getPlaces!: Sequelize.HasManyGetAssociationsMixin<Place>;
  setPlaces!: Sequelize.HasManySetAssociationsMixin<Place, PlaceId>;
  addPlace!: Sequelize.HasManyAddAssociationMixin<Place, PlaceId>;
  addPlaces!: Sequelize.HasManyAddAssociationsMixin<Place, PlaceId>;
  createPlace!: Sequelize.HasManyCreateAssociationMixin<Place>;
  removePlace!: Sequelize.HasManyRemoveAssociationMixin<Place, PlaceId>;
  removePlaces!: Sequelize.HasManyRemoveAssociationsMixin<Place, PlaceId>;
  hasPlace!: Sequelize.HasManyHasAssociationMixin<Place, PlaceId>;
  hasPlaces!: Sequelize.HasManyHasAssociationsMixin<Place, PlaceId>;
  countPlaces!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany subplace via userid
  subplaces!: Subplace[];
  getSubplaces!: Sequelize.HasManyGetAssociationsMixin<Subplace>;
  setSubplaces!: Sequelize.HasManySetAssociationsMixin<Subplace, SubplaceId>;
  addSubplace!: Sequelize.HasManyAddAssociationMixin<Subplace, SubplaceId>;
  addSubplaces!: Sequelize.HasManyAddAssociationsMixin<Subplace, SubplaceId>;
  createSubplace!: Sequelize.HasManyCreateAssociationMixin<Subplace>;
  removeSubplace!: Sequelize.HasManyRemoveAssociationMixin<Subplace, SubplaceId>;
  removeSubplaces!: Sequelize.HasManyRemoveAssociationsMixin<Subplace, SubplaceId>;
  hasSubplace!: Sequelize.HasManyHasAssociationMixin<Subplace, SubplaceId>;
  hasSubplaces!: Sequelize.HasManyHasAssociationsMixin<Subplace, SubplaceId>;
  countSubplaces!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany Thing via userid
  things!: Thing[];
  getThings!: Sequelize.HasManyGetAssociationsMixin<Thing>;
  setThings!: Sequelize.HasManySetAssociationsMixin<Thing, ThingId>;
  addThing!: Sequelize.HasManyAddAssociationMixin<Thing, ThingId>;
  addThings!: Sequelize.HasManyAddAssociationsMixin<Thing, ThingId>;
  createThing!: Sequelize.HasManyCreateAssociationMixin<Thing>;
  removeThing!: Sequelize.HasManyRemoveAssociationMixin<Thing, ThingId>;
  removeThings!: Sequelize.HasManyRemoveAssociationsMixin<Thing, ThingId>;
  hasThing!: Sequelize.HasManyHasAssociationMixin<Thing, ThingId>;
  hasThings!: Sequelize.HasManyHasAssociationsMixin<Thing, ThingId>;
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
