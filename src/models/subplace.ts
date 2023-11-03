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
  placeid: number;
  userid?: number;
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
  placeid!: number;
  userid?: number;

  // subplace belongsTo place via placeid
  place!: Place;
  getPlace!: Sequelize.BelongsToGetAssociationMixin<Place>;
  setPlace!: Sequelize.BelongsToSetAssociationMixin<Place, PlaceId>;
  createPlace!: Sequelize.BelongsToCreateAssociationMixin<Place>;

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
