import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const MetaData = new Schema({
	metaId: String,
	title: String,
	author: [String],
	publisher: String,
	publicationDate: String,
	language: String,
	subject: [String],
	licenseRights: String
});

MetaData.methods.create = function(data, cb) {
	return this.model('MetaData').insertMany(data, cb);
};

module.exports = mongoose.model('MetaData', MetaData);
