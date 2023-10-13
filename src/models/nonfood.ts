import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface nonfoodAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  unit_weight?: string;
  userid?: string;
}

export type nonfoodPk = 'id';
export type nonfoodId = nonfood[nonfoodPk];
export type nonfoodOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'unit_weight' | 'userid';
export type nonfoodCreationAttributes = Optional<nonfoodAttributes, nonfoodOptionalAttributes>;

export class nonfood extends Model<nonfoodAttributes, nonfoodCreationAttributes> implements nonfoodAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  unit_weight?: string;
  userid?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof nonfood {
    return nonfood.init(
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
        userid: {
          type: DataTypes.UUID,
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
