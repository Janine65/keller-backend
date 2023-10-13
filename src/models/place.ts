import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { subplace, subplaceId } from './subplace';
import type { User, UserId } from './user';

export interface placeAttributes {
  id: string;
  name: string;
  type: 'tiefkuehl' | 'kuehl' | 'offen';
  createdAt: Date;
  updatedAt: Date;
  userid?: string;
}

export type placePk = 'id';
export type placeId = place[placePk];
export type placeOptionalAttributes = 'id' | 'createdAt' | 'updatedAt' | 'userid';
export type placeCreationAttributes = Optional<placeAttributes, placeOptionalAttributes>;

export class place extends Model<placeAttributes, placeCreationAttributes> implements placeAttributes {
  id!: string;
  name!: string;
  type!: 'tiefkuehl' | 'kuehl' | 'offen';
  createdAt!: Date;
  updatedAt!: Date;
  userid?: string;

  // place hasMany subplace via placeid
  subplaces!: subplace[];
  getSubplaces!: Sequelize.HasManyGetAssociationsMixin<subplace>;
  setSubplaces!: Sequelize.HasManySetAssociationsMixin<subplace, subplaceId>;
  addSubplace!: Sequelize.HasManyAddAssociationMixin<subplace, subplaceId>;
  addSubplaces!: Sequelize.HasManyAddAssociationsMixin<subplace, subplaceId>;
  createSubplace!: Sequelize.HasManyCreateAssociationMixin<subplace>;
  removeSubplace!: Sequelize.HasManyRemoveAssociationMixin<subplace, subplaceId>;
  removeSubplaces!: Sequelize.HasManyRemoveAssociationsMixin<subplace, subplaceId>;
  hasSubplace!: Sequelize.HasManyHasAssociationMixin<subplace, subplaceId>;
  hasSubplaces!: Sequelize.HasManyHasAssociationsMixin<subplace, subplaceId>;
  countSubplaces!: Sequelize.HasManyCountAssociationsMixin;
  // place belongsTo user via userid
  user!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof place {
    return place.init(
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
        type: {
          type: DataTypes.ENUM('tiefkuehl', 'kuehl', 'offen'),
          allowNull: false,
        },
        userid: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: '',
        updatedAt: '',
      },
      {
        sequelize,
        tableName: 'place',
        schema: 'public',
        hasTrigger: true,
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'place_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
