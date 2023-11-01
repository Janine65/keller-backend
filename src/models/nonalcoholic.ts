import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface NonalcoholicAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  unit_weight: string;
  weight?: number;
  userid?: number;
}

export type NonalcoholicPk = 'id';
export type NonalcoholicId = Nonalcoholic[NonalcoholicPk];
export type NonalcoholicOptionalAttributes = 'weight' | 'userid';
export type NonalcoholicCreationAttributes = Optional<NonalcoholicAttributes, NonalcoholicOptionalAttributes>;

export class Nonalcoholic extends Model<NonalcoholicAttributes, NonalcoholicCreationAttributes> implements NonalcoholicAttributes {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  unit_weight: string;
  weight?: number;
  userid?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Nonalcoholic {
    return Nonalcoholic.init(
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
        weight: {
          type: DataTypes.DECIMAL(6,3),
          allowNull: true,
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
        tableName: 'nonalcoholic',
        schema: 'public',
        timestamps: true,
        freezeTableName: true,
      },
    );
  }
}
