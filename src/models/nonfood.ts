import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Object2Subplace, Object2SubplaceId } from './object2Subplace';
import { Subplace, SubplaceId } from './subplace';

export interface NonfoodAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  unit_weight: string;
  userid?: number;
  thing_type: string;
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
  thing_type: string;

  // Nonfood hasMany object2Subplace via id
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
  // Nonfood belongsToMany subplace via id and subplaceid
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
        thing_type: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'nonfood'
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
