import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FoodAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  unit_weight: string;
  vacuumed?: boolean;
  sealed?: boolean;
  userid?: number;
}

export type FoodPk = 'id';
export type FoodId = Food[FoodPk];
export type FoodOptionalAttributes = 'vacuumed' | 'sealed' | 'userid';
export type FoodCreationAttributes = Optional<FoodAttributes, FoodOptionalAttributes>;

export class Food extends Model<FoodAttributes, FoodCreationAttributes> implements FoodAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  unit_weight: string;
  vacuumed?: boolean;
  sealed?: boolean;
  userid?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Food {
    return Food.init(
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
        vacuumed: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        sealed: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
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
        tableName: 'food',
        schema: 'public',
        timestamps: true,
        freezeTableName: true,
      },
    );
  }
}
