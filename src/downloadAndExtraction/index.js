import fs from 'fs';
import tar from 'tar-fs';
import request from 'request';
import unzipper from 'unzipper';
import bz2 from 'unbzip2-stream';
import processInstance from './process';

const createWriteStream = fs.createWriteStream;
const createReadStream = fs.createReadStream;
const existsSync = fs.existsSync;

const filePathObject = {
	bz2: './metadata_tech-test.tar.bz2',
	zip: './metadata_tech-test.tar.zip'
};

const unzipPath = './metadata_tech-test';
const readTarPath = './metadata_tech-test/rdf-files.tar';
const tarFilePath = './metadata_tech-test';
const bz2FilePath = './metadata_tech-test/cache/epub';

async function unzipTarFile() {
	const unzipTarFileInstance = await processInstance.unzipTarFile(
		createReadStream,
		tar,
		readTarPath,
		tarFilePath
	);
	if (unzipTarFileInstance !== 'successful') {
		return null;
	}
	return unzipTarFileInstance;
}

async function unzipFile() {
	const unzipFileInstance = await processInstance
		.unzipFile(createReadStream, unzipper, filePathObject.zip, unzipPath)
		.catch(error => error);
	if (unzipFileInstance === 'successful') {
		const unzipTarFileInstance = await unzipTarFile().catch(err => err);
		if (unzipTarFileInstance === 'successful') {
			return unzipFileInstance;
		}
	}
	return null;
}

async function unzipB2Z() {
	const unzipFileInstance = await processInstance
		.unzipB2Z(createReadStream, bz2, tar, filePathObject.bz2, bz2FilePath)
		.catch(err => err);
	if (unzipFileInstance === 'successful') {
		return unzipFileInstance;
	}
	return null;
}

async function fileDownload(url) {
	const urlExtension = url.split('rdf-files.tar.')[1];
	const filePath = filePathObject[urlExtension];

	if (existsSync(filePath)) {
		return null;
	}
	const fileDownloadInstance = await processInstance
		.fileDownload(url, createWriteStream, request, filePath)
		.catch(error => error);
	if (fileDownloadInstance === 'successful') {
		if (urlExtension === 'zip') {
			const unzipFileInstance = await unzipFile().catch(err => err);
			if (unzipFileInstance === 'successful') {
				return unzipFileInstance;
			}
			return null;
		}
		const unzipB2ZFileInstance = await unzipB2Z();
		return unzipB2ZFileInstance;
	}
	return null;
}

export default { unzipTarFile, unzipFile, unzipB2Z, fileDownload };
