import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Subplace, SubplaceId } from './subplace';
import type { User, UserId } from './user';
import { Placetype, PlacetypeId } from './placetype';

export interface PlaceAttributes {
  id?: number;
  name: string;
  placetypeid: number;
  createdAt?: Date;
  updatedAt?: Date;
  userid?: number;
}

export type PlacePk = 'id';
export type PlaceId = Place[PlacePk];
export type PlaceOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'userid';
export type PlaceCreationAttributes = Optional<PlaceAttributes, PlaceOptionalAttributes>;

export class Place extends Model<PlaceAttributes, PlaceCreationAttributes> implements PlaceAttributes {
  declare id?: number;
  declare name: string;
  declare placetypeid: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare userid?: number;

  // place belongsTo placetype via placetypeid
  placetyüe!: Placetype;
  getPlacetype!: Sequelize.BelongsToGetAssociationMixin<Placetype>;
  setPlacetype!: Sequelize.BelongsToSetAssociationMixin<Placetype, PlacetypeId>;
  createPlacetype!: Sequelize.BelongsToCreateAssociationMixin<Placetype>;

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
        placetypeid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'placetype',
            key: 'id',
          }
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
