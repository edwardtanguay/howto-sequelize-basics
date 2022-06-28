'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Notes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

		toJSON() {
			return {...this.get(), id: undefined};
		}
	}
	Notes.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: 'Title may not be null.' },
					notEmpty: {msg: 'Title may not be empty.'}
				}
			},
			body: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Notes'
		}
	);
	return Notes;
};
