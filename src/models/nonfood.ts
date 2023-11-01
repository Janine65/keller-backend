import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface NonfoodAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  unit_weight: string;
  userid?: number;
}

export type NonfoodPk = 'id';
export type NonfoodId = Nonfood[NonfoodPk];
export type NonfoodOptionalAttributes = 'userid';
export type NonfoodCreationAttributes = Optional<NonfoodAttributes, NonfoodOptionalAttributes>;

export class Nonfood extends Model<NonfoodAttributes, NonfoodCreationAttributes> implements NonfoodAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  unit_weight: string;
  userid?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Nonfood {
    return Nonfood.init(
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
        unit_weight: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        createdAt: '',
        updatedAt: '',
      },
      {
        sequelize,
        tableName: 'nonfood',
        schema: 'public',
        timestamps: true,
        freezeTableName: true,
      },
    );
  }
}
