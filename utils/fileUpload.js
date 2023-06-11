const multer = require('multer');
const path = require('path');

const st = path.join(__dirname, '..', 'public/assets/Images');
console.log(st);
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, st);
	},
	filename: function (req, file, cb) {
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg'
		) {
			cb(null, `${Date.now()}.${file.originalname}`);
		} else {
			cb(null, false);
		}
	},
});

const upload = multer({ storage: storage });

module.exports = { upload };
