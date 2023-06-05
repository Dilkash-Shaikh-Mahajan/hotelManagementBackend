const { Schema, model } = require('mongoose');

let productSchema = new Schema(
	{
		productName: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false },
);

module.exports = model('Product', productSchema);
