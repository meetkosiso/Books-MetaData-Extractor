import dotenv from 'dotenv';

import readFilesInstance from './readFiles';
// import databaseInstance from './database';
import fileDownloadInstance from './downloadAndExtraction';

dotenv.config();

const filePath = './metadata_tech-test/cache/epub';

async function traverseFiles() {
	const records = await readFilesInstance.readFiles(filePath);

	const recordCreated = await databaseInstance.create(records);

	return recordCreated;
}

async function start() {
	if (process.env.NODE_ENV === 'traverse') {
		traverseFiles();
	} else if (process.env.NODE_ENV === 'download') {
		// start file download
		await fileDownloadInstance.fileDownload(
			'http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip'
		);
	}
}

start();
