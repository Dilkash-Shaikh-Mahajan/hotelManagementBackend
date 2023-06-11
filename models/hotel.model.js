const { Schema, model } = require('mongoose');

let hotelSchema = new Schema(
	{
		headerImage: {
			type: [String],
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},

		price: {
			type: String,
			required: true,
		},
		addedOn: { type: Date, default: Date.now },
		occupancy: Number,
	},
	{ timestamps: true, versionKey: false },
);

module.exports = model('hotel', hotelSchema);
