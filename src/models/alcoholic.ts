import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AlcoholicAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  country?: string;
  region?: string;
  year?: number;
  grapes?: string[];
  userid?: number;
  unit_weight: string;
}

export type AlcoholicPk = 'id';
export type AlcoholicId = Alcoholic[AlcoholicPk];
export type AlcoholicOptionalAttributes = 'country' | 'region' | 'year' | 'grapes' | 'userid';
export type AlcoholicCreationAttributes = Optional<AlcoholicAttributes, AlcoholicOptionalAttributes>;

export class Alcoholic extends Model<AlcoholicAttributes, AlcoholicCreationAttributes> implements AlcoholicAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  country?: string;
  region?: string;
  year?: number;
  grapes?: string[];
  userid?: number;
  unit_weight: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Alcoholic {
    return Alcoholic.init(
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
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        unit_weight: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: '',
        updatedAt: '',
      },
      {
        sequelize,
        tableName: 'alcoholic',
        schema: 'public',
        timestamps: true,
        freezeTableName: true,
      },
    );
  }
}
