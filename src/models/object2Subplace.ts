import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Subplace, SubplaceId } from './subplace';
import type { User, UserId } from './user';
import { Alcoholic, AlcoholicId } from './alcoholic';
import { Food, FoodId } from './food';
import { Nonalcoholic, NonalcoholicId } from './nonalcoholic';
import { Nonfood, NonfoodId } from './nonfood';

export interface Object2SubplaceAttributes {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  subplaceid: number;
  alcoholicid?: number;
  foodid?: number;
  nonalcoholicid?: number;
  nonfoodid?: number;
  weight?: number;
  count?: number;
  userid?: number;
  shopped_at?: Date;
  valid_until?: Date;
}

export type Object2SubplacePk = 'id';
export type Object2SubplaceId = Object2Subplace[Object2SubplacePk];
export type Object2SubplaceOptionalAttributes = 'id' | 'alcoholicid' | 'foodid' | 'nonalcoholicid' | 'nonfoodid' | 'weight' | 'count' | 'userid' | 'shopped_at' | 'valid_until';
export type Object2SubplaceCreationAttributes = Optional<Object2SubplaceAttributes, Object2SubplaceOptionalAttributes>;

export class Object2Subplace extends Model<Object2SubplaceAttributes, Object2SubplaceCreationAttributes> implements Object2SubplaceAttributes {
  declare id?: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare subplaceid: number;
  declare alcoholicid?: number;
  declare foodid?: number;
  declare nonalcoholicid?: number;
  declare nonfoodid?: number;
  declare weight?: number;
  declare count?: number;
  declare userid?: number;
  declare shopped_at?: Date;
  declare valid_until?: Date;

  // object2Subplace belongsTo subplace via subplaceid
  subplace!: Subplace;
  getSubplace!: Sequelize.BelongsToGetAssociationMixin<Subplace>;
  setSubplace!: Sequelize.BelongsToSetAssociationMixin<Subplace, SubplaceId>;
  createSubplace!: Sequelize.BelongsToCreateAssociationMixin<Subplace>;
  // object2Subplace belongsTo Thing via id
  alcoholic!: Alcoholic;
  getAlcoholic!: Sequelize.BelongsToGetAssociationMixin<Alcoholic>;
  setAlcoholic!: Sequelize.BelongsToSetAssociationMixin<Alcoholic, AlcoholicId>;
  createAlcoholic!: Sequelize.BelongsToCreateAssociationMixin<Alcoholic>;
  food!: Food;
  getFood!: Sequelize.BelongsToGetAssociationMixin<Food>;
  setFood!: Sequelize.BelongsToSetAssociationMixin<Food, FoodId>;
  createFood!: Sequelize.BelongsToCreateAssociationMixin<Food>;
  nonalcoholic!: Nonalcoholic;
  getNonalcoholic!: Sequelize.BelongsToGetAssociationMixin<Nonalcoholic>;
  setNonalcoholic!: Sequelize.BelongsToSetAssociationMixin<Nonalcoholic, NonalcoholicId>;
  createNonalcoholic!: Sequelize.BelongsToCreateAssociationMixin<Nonalcoholic>;
  nonfood!: Nonfood;
  getNonfood!: Sequelize.BelongsToGetAssociationMixin<Nonfood>;
  setNonfood!: Sequelize.BelongsToSetAssociationMixin<Nonfood, NonfoodId>;
  createNonfood!: Sequelize.BelongsToCreateAssociationMixin<Nonfood>;
  // object2Subplace belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Object2Subplace {
    return Object2Subplace.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        subplaceid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'subplace',
            key: 'id',
          },
        },
        alcoholicid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          references: {
            model: 'alcoholic',
            key: 'id',
          },
        },
        foodid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          references: {
            model: 'food',
            key: 'id',
          },
        },
        nonalcoholicid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          references: {
            model: 'nonalcoholic',
            key: 'id',
          },
        },
        nonfoodid: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          references: {
            model: 'nonfood',
            key: 'id',
          },
        },
        weight: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },
        count: {
          type: DataTypes.INTEGER,
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
        shopped_at: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        valid_until: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        createdAt: '',
        updatedAt: '',
      },
      {
        sequelize,
        tableName: 'object2subplace',
        schema: 'public',
        timestamps: true,
        freezeTableName: true,
      },
    );
  }
}
