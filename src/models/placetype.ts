import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './user';
import { Place, PlaceId } from './place';

export interface PlacetypeAttributes {
  id?: number;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  userid?: number;
}

export type PlacetypePk = 'id';
export type PlacetypeId = Placetype[PlacetypePk];
export type PlacetypeOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'icon' | 'userid';
export type PlacetypeCreationAttributes = Optional<PlacetypeAttributes, PlacetypeOptionalAttributes>;

export class Placetype extends Model<PlacetypeAttributes, PlacetypeCreationAttributes> implements PlacetypeAttributes {
  id?: number;
  name!: string;
  icon!: string;
  createdAt!: Date;
  updatedAt!: Date;
  userid?: number;

  // placetype hasMany place via placeid
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
  
  // placetype belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Placetype {
    return Placetype.init(
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
        icon: {
          type: DataTypes.TEXT,
          allowNull: true,
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
        tableName: 'placetype',
        schema: 'public',
        hasTrigger: true,
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'placetype_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
