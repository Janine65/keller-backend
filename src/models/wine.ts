import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface wineAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  country?: string;
  region?: string;
  year?: number;
  grapes?: string[];
  userid?: string;
}

export type winePk = 'id';
export type wineId = wine[winePk];
export type wineOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'country' | 'region' | 'year' | 'grapes' | 'userid';
export type wineCreationAttributes = Optional<wineAttributes, wineOptionalAttributes>;

export class wine extends Model<wineAttributes, wineCreationAttributes> implements wineAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  country?: string;
  region?: string;
  year?: number;
  grapes?: string[];
  userid?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof wine {
    return wine.init(
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
        country: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        region: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        year: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        grapes: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          allowNull: true,
        },
        userid: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        createdAt: '',
        updatedAt: '',
      },
      {
        sequelize,
        tableName: 'wine',
        schema: 'public',
        timestamps: true,
        freezeTableName: true,
      },
    );
  }
}