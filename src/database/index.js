import Model from './model';
import processInstance from './process';

async function create(data) {
	const databaseInstance = await processInstance
		.create(Model, data)
		.catch(err => err);
	return databaseInstance;
}

export default { create };
