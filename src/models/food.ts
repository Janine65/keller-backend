import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface foodAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  unit_weight?: string;
  vacuumed?: boolean;
  sealed?: boolean;
  userid?: string;
}

export type foodPk = 'id';
export type foodId = food[foodPk];
export type foodOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'unit_weight' | 'vacuumed' | 'sealed' | 'userid';
export type foodCreationAttributes = Optional<foodAttributes, foodOptionalAttributes>;

export class food extends Model<foodAttributes, foodCreationAttributes> implements foodAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  unit_weight?: string;
  vacuumed?: boolean;
  sealed?: boolean;
  userid?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof food {
    return food.init(
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
        unit_weight: {
          type: DataTypes.TEXT,
          allowNull: true,
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
          type: DataTypes.UUID,
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
