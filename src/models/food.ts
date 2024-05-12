import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Object2Subplace, Object2SubplaceId } from './object2Subplace';
import { Subplace, SubplaceId } from './subplace';

export interface FoodAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  weight?: string;
  vacuumed?: boolean;
  sealed?: boolean;
  userid?: number;
  thing_type: string;
  shop?: string;
  photo?: string;
}

export type FoodPk = 'id';
export type FoodId = Food[FoodPk];
export type FoodOptionalAttributes = 'shop' | 'vacuumed' | 'sealed' | 'userid';
export type FoodCreationAttributes = Optional<FoodAttributes, FoodOptionalAttributes>;

export class Food extends Model<FoodAttributes, FoodCreationAttributes> implements FoodAttributes {
  declare id?: number;
  declare name: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare weight?: string;
  declare vacuumed?: boolean;
  declare sealed?: boolean;
  declare userid?: number;
  declare thing_type: string;
  declare shop?: string;
  declare photo?: string;



  // Food hasMany object2Subplace via id
  object2subplaces!: Object2Subplace[];
  getObject2subplaces!: Sequelize.HasManyGetAssociationsMixin<Object2Subplace>;
  setObject2subplaces!: Sequelize.HasManySetAssociationsMixin<Object2Subplace, Object2SubplaceId>;
  addObject2subplace!: Sequelize.HasManyAddAssociationMixin<Object2Subplace, Object2SubplaceId>;
  addObject2subplaces!: Sequelize.HasManyAddAssociationsMixin<Object2Subplace, Object2SubplaceId>;
  createObject2subplace!: Sequelize.HasManyCreateAssociationMixin<Object2Subplace>;
  removeObject2subplace!: Sequelize.HasManyRemoveAssociationMixin<Object2Subplace, Object2SubplaceId>;
  removeObject2subplaces!: Sequelize.HasManyRemoveAssociationsMixin<Object2Subplace, Object2SubplaceId>;
  hasObject2subplace!: Sequelize.HasManyHasAssociationMixin<Object2Subplace, Object2SubplaceId>;
  hasObject2subplaces!: Sequelize.HasManyHasAssociationsMixin<Object2Subplace, Object2SubplaceId>;
  countObject2subplaces!: Sequelize.HasManyCountAssociationsMixin;
  // Food belongsToMany subplace via id and subplaceid
  subplaceid_subplaces!: Subplace[];
  getSubplaceid_subplaces!: Sequelize.BelongsToManyGetAssociationsMixin<Subplace>;
  setSubplaceid_subplaces!: Sequelize.BelongsToManySetAssociationsMixin<Subplace, SubplaceId>;
  addSubplaceid_subplace!: Sequelize.BelongsToManyAddAssociationMixin<Subplace, SubplaceId>;
  addSubplaceid_subplaces!: Sequelize.BelongsToManyAddAssociationsMixin<Subplace, SubplaceId>;
  createSubplaceid_subplace!: Sequelize.BelongsToManyCreateAssociationMixin<Subplace>;
  removeSubplaceid_subplace!: Sequelize.BelongsToManyRemoveAssociationMixin<Subplace, SubplaceId>;
  removeSubplaceid_subplaces!: Sequelize.BelongsToManyRemoveAssociationsMixin<Subplace, SubplaceId>;
  hasSubplaceid_subplace!: Sequelize.BelongsToManyHasAssociationMixin<Subplace, SubplaceId>;
  hasSubplaceid_subplaces!: Sequelize.BelongsToManyHasAssociationsMixin<Subplace, SubplaceId>;
  countSubplaceid_subplaces!: Sequelize.BelongsToManyCountAssociationsMixin;
  
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
        weight: {
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
        thing_type: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'food'
        },
        shop: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        photo: {
          type: DataTypes.STRING,
          allowNull: true
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
