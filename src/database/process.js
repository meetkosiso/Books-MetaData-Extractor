async function create(Model, data) {
	const createInstance = new Model();
	const databaseInstance = await createInstance.create(data).catch(err => err);
	if (databaseInstance instanceof Error) {
		return databaseInstance;
	}
	return databaseInstance;
}

export default { create };
