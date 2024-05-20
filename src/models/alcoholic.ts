import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Object2Subplace, Object2SubplaceId } from './object2Subplace';
import { Subplace, SubplaceId } from './subplace';
import { ThingAttributes, ThingOptionalAttributes } from './thing';

export interface AlcoholicAttributes extends ThingAttributes {
  country?: string;
  region?: string;
  year?: number;
  grapes?: string[];
  type?: string;
}

export type AlcoholicPk = 'id';
export type AlcoholicId = Alcoholic[AlcoholicPk];
export type AlcoholicOptionalAttributes = ThingOptionalAttributes | 'country' | 'region' | 'year' | 'grapes';
export type AlcoholicCreationAttributes = Optional<AlcoholicAttributes, AlcoholicOptionalAttributes>;

export class Alcoholic extends Model<AlcoholicAttributes, AlcoholicCreationAttributes> implements AlcoholicAttributes {
  declare id?: number;
  declare name: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare country?: string;
  declare region?: string;
  declare year?: number;
  declare grapes?: string[];
  declare type: string;
  declare userid?: number;
  declare weight: string;
  declare thing_type: string;
  declare shop: string;
  declare photo?: string;
  declare levels?: Array<number>;


// Alcoholic hasMany object2Subplace via id
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
// Alcoholic belongsToMany subplace via id and subplaceid
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
        type: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        userid: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        weight: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        thing_type: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'alcoholic'
        },
        shop: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        photo: {
          type: DataTypes.STRING,
          allowNull: true
        },
        levels: {
          type: DataTypes.ARRAY(DataTypes.INTEGER),
          allowNull: true,
          defaultValue: '{1,3}'
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
