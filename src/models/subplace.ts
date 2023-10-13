import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { object2Subplace, object2SubplaceId } from './object2Subplace';
import type { place, placeId } from './place';
import type { thing, thingId } from './thing';
import type { User, UserId } from './user';

export interface subplaceAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  placeid: string;
  userid?: string;
}

export type subplacePk = 'id';
export type subplaceId = subplace[subplacePk];
export type subplaceOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'userid';
export type subplaceCreationAttributes = Optional<subplaceAttributes, subplaceOptionalAttributes>;

export class subplace extends Model<subplaceAttributes, subplaceCreationAttributes> implements subplaceAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  placeid!: string;
  userid?: string;

  // subplace belongsTo place via placeid
  place!: place;
  getPlace!: Sequelize.BelongsToGetAssociationMixin<place>;
  setPlace!: Sequelize.BelongsToSetAssociationMixin<place, placeId>;
  createPlace!: Sequelize.BelongsToCreateAssociationMixin<place>;
  // subplace hasMany object2Subplace via subplaceid
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
  // subplace belongsToMany thing via subplaceid and objectid
  objectid_things!: thing[];
  getObjectid_things!: Sequelize.BelongsToManyGetAssociationsMixin<thing>;
  setObjectid_things!: Sequelize.BelongsToManySetAssociationsMixin<thing, thingId>;
  addObjectid_thing!: Sequelize.BelongsToManyAddAssociationMixin<thing, thingId>;
  addObjectid_things!: Sequelize.BelongsToManyAddAssociationsMixin<thing, thingId>;
  createObjectid_thing!: Sequelize.BelongsToManyCreateAssociationMixin<thing>;
  removeObjectid_thing!: Sequelize.BelongsToManyRemoveAssociationMixin<thing, thingId>;
  removeObjectid_things!: Sequelize.BelongsToManyRemoveAssociationsMixin<thing, thingId>;
  hasObjectid_thing!: Sequelize.BelongsToManyHasAssociationMixin<thing, thingId>;
  hasObjectid_things!: Sequelize.BelongsToManyHasAssociationsMixin<thing, thingId>;
  countObjectid_things!: Sequelize.BelongsToManyCountAssociationsMixin;
  // subplace belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof subplace {
    return subplace.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        placeid: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'place',
            key: 'id',
          },
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
