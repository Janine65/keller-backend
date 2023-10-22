import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface NonfoodAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  unit_weight?: string;
  userid?: string;
}

export type NonfoodPk = 'id';
export type NonfoodId = Nonfood[NonfoodPk];
export type NonfoodOptionalAttributes = 'unit_weight' | 'userid';
export type NonfoodCreationAttributes = Optional<NonfoodAttributes, NonfoodOptionalAttributes>;

export class Nonfood extends Model<NonfoodAttributes, NonfoodCreationAttributes> implements NonfoodAttributes {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  unit_weight?: string;
  userid?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Nonfood {
    return Nonfood.init(
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
