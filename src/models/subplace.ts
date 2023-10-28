import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Object2Subplace, Object2SubplaceId } from './object2Subplace';
import type { Place, PlaceId } from './place';
import type { Thing, ThingId } from './thing';
import type { User, UserId } from './user';

export interface SubplaceAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  placeid: string;
  userid?: string;
}

export type SubplacePk = 'id';
export type SubplaceId = Subplace[SubplacePk];
export type SubplaceOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'userid';
export type SubplaceCreationAttributes = Optional<SubplaceAttributes, SubplaceOptionalAttributes>;

export class Subplace extends Model<SubplaceAttributes, SubplaceCreationAttributes> implements SubplaceAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  placeid!: string;
  userid?: string;

  // subplace belongsTo place via placeid
  place!: Place;
  getPlace!: Sequelize.BelongsToGetAssociationMixin<Place>;
  setPlace!: Sequelize.BelongsToSetAssociationMixin<Place, PlaceId>;
  createPlace!: Sequelize.BelongsToCreateAssociationMixin<Place>;
  // subplace hasMany object2Subplace via subplaceid
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
  // subplace belongsToMany thing via subplaceid and objectid
  objectid_things!: Thing[];
  getObjectid_things!: Sequelize.BelongsToManyGetAssociationsMixin<Thing>;
  setObjectid_things!: Sequelize.BelongsToManySetAssociationsMixin<Thing, ThingId>;
  addObjectid_thing!: Sequelize.BelongsToManyAddAssociationMixin<Thing, ThingId>;
  addObjectid_things!: Sequelize.BelongsToManyAddAssociationsMixin<Thing, ThingId>;
  createObjectid_thing!: Sequelize.BelongsToManyCreateAssociationMixin<Thing>;
  removeObjectid_thing!: Sequelize.BelongsToManyRemoveAssociationMixin<Thing, ThingId>;
  removeObjectid_things!: Sequelize.BelongsToManyRemoveAssociationsMixin<Thing, ThingId>;
  hasObjectid_thing!: Sequelize.BelongsToManyHasAssociationMixin<Thing, ThingId>;
  hasObjectid_things!: Sequelize.BelongsToManyHasAssociationsMixin<Thing, ThingId>;
  countObjectid_things!: Sequelize.BelongsToManyCountAssociationsMixin;
  // subplace belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Subplace {
    return Subplace.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        placeid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'place',
            key: 'id',
          },
        },
        userid: {
          type: DataTypes.INTEGER,
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
        tableName: 'subplace',
        schema: 'public',
        hasTrigger: true,
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'subplace_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
