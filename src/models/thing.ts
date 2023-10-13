import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { object2Subplace, object2SubplaceId } from './object2Subplace';
import type { subplace, subplaceId } from './subplace';
import type { User, UserId } from './user';

export interface thingAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userid?: string;
}

export type thingPk = 'id';
export type thingId = thing[thingPk];
export type thingOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'userid';
export type thingCreationAttributes = Optional<thingAttributes, thingOptionalAttributes>;

export class thing extends Model<thingAttributes, thingCreationAttributes> implements thingAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userid?: string;

  // thing hasMany object2Subplace via objectid
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
  // thing belongsToMany subplace via objectid and subplaceid
  subplaceid_subplaces!: subplace[];
  getSubplaceid_subplaces!: Sequelize.BelongsToManyGetAssociationsMixin<subplace>;
  setSubplaceid_subplaces!: Sequelize.BelongsToManySetAssociationsMixin<subplace, subplaceId>;
  addSubplaceid_subplace!: Sequelize.BelongsToManyAddAssociationMixin<subplace, subplaceId>;
  addSubplaceid_subplaces!: Sequelize.BelongsToManyAddAssociationsMixin<subplace, subplaceId>;
  createSubplaceid_subplace!: Sequelize.BelongsToManyCreateAssociationMixin<subplace>;
  removeSubplaceid_subplace!: Sequelize.BelongsToManyRemoveAssociationMixin<subplace, subplaceId>;
  removeSubplaceid_subplaces!: Sequelize.BelongsToManyRemoveAssociationsMixin<subplace, subplaceId>;
  hasSubplaceid_subplace!: Sequelize.BelongsToManyHasAssociationMixin<subplace, subplaceId>;
  hasSubplaceid_subplaces!: Sequelize.BelongsToManyHasAssociationsMixin<subplace, subplaceId>;
  countSubplaceid_subplaces!: Sequelize.BelongsToManyCountAssociationsMixin;
  // thing belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof thing {
    return thing.init(
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
