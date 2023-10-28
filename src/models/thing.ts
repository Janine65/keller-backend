import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Object2Subplace, Object2SubplaceId } from './object2Subplace';
import type { Subplace, SubplaceId } from './subplace';
import type { User, UserId } from './user';

export interface ThingAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userid?: string;
}

export type ThingPk = 'id';
export type ThingId = Thing[ThingPk];
export type ThingOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'userid';
export type thingCreationAttributes = Optional<ThingAttributes, ThingOptionalAttributes>;

export class Thing extends Model<ThingAttributes, thingCreationAttributes> implements ThingAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userid?: string;

  // Thing hasMany object2Subplace via objectid
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
  // Thing belongsToMany subplace via objectid and subplaceid
  subplaceid_subplaces!: Subplace[];
  getSubplaceid_subplaces!: Sequelize.BelongsToManyGetAssociationsMixin<Subplace>;
  setSubplaceid_subplaces!: Sequelize.BelongsToManySetAssociationsMixin<Subplace, SubplaceId>;
  addSubplaceid_subplace!: Sequelize.BelongsToManyAddAssociationMixin<Subplace, SubplaceId>;
  addSubplaceid_subplaces!: Sequelize.BelongsToManyAddAssociationsMixin<Subplace, SubplaceId>;
  createSubplaceid_subplace!: Sequelize.BelongsToManyCreateAssociationMixin<Subplace>;
  removeSubplaceid_subplace!: Sequelize.BelongsToManyRemoveAssociationMixin<Subplace, SubplaceId>;
  removeSubplaceid_subplaces!: Sequelize.BelongsToManyRemoveAssociationsMixin<Subplace, SubplaceId>;
  hasSubplaceid_subplace!: Sequelize.BelongsToManyHasAssociationMixin<Subplace, SubplaceId>;
  hasSubplaceid_subplaces!: Sequelize.BelongsToManyHasAssociationsMixin<Subplace, SubplaceId>;
  countSubplaceid_subplaces!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Thing belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Thing {
    return Thing.init(
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
        tableName: 'thing',
        schema: 'public',
        hasTrigger: true,
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'fki_itsuser',
            fields: [{ name: 'userid' }],
          },
          {
            name: 'object_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
