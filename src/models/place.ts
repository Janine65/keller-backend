import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Subplace, SubplaceId } from './subplace';
import type { User, UserId } from './user';

export interface PlaceAttributes {
  id?: number;
  name: string;
  type: PlaceType;
  createdAt: Date;
  updatedAt: Date;
  userid?: string;
}

export type PlacePk = 'id';
export type PlaceId = Place[PlacePk];
export enum PlaceType { 'tiefkuehl', 'kuehl', 'offen'}
export type PlaceOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'userid';
export type PlaceCreationAttributes = Optional<PlaceAttributes, PlaceOptionalAttributes>;

export class Place extends Model<PlaceAttributes, PlaceCreationAttributes> implements PlaceAttributes {
  id?: number;
  name!: string;
  type!: PlaceType;
  createdAt!: Date;
  updatedAt!: Date;
  userid?: string;

  // place hasMany subplace via placeid
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
  // place belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Place {
    return Place.init(
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
        type: {
          type: DataTypes.ENUM('tiefkuehl', 'kuehl', 'offen'),
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
        tableName: 'place',
        schema: 'public',
        hasTrigger: true,
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'place_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
