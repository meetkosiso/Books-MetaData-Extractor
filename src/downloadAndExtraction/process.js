function unzipTarFile(createReadStream, tar, readTarPath, tarFilePath) {
	return new Promise(resolve => {
		const unzipped = createReadStream(readTarPath).pipe(
			tar.extract(tarFilePath)
		);
		unzipped.on('finish', () => resolve('successful'));
		unzipped.on('error', err => reject(new Error(err)));
	});
}

function unzipB2Z(createReadStream, bz2, tar, tarbz2FilePath, filePath) {
	return new Promise(resolve => {
		createReadStream(tarbz2FilePath)
			.pipe(bz2())
			.pipe(tar.extract(filePath));

		resolve('successful');
	});
}

function unzipFile(createReadStream, unzipper, zippedFilePath, unzipPath) {
	return new Promise((resolve, reject) => {
		const unzipped = createReadStream(zippedFilePath).pipe(
			unzipper.Extract({ path: unzipPath })
		);

		unzipped.on('finish', () => {
			return resolve('successful');
		});
		unzipped.on('error', err => reject(new Error(err)));
	});
}

function fileDownload(url, createWriteStream, request, filePath) {
	return new Promise((resolve, reject) => {
		const fileDownloaded = request({
			method: 'GET',
			uri: url
		}).pipe(createWriteStream(filePath));
		fileDownloaded.on('finish', () => resolve('successful'));
		fileDownloaded.on('error', () => reject(new Error('An error occurred')));
	});
}

export default { unzipTarFile, unzipFile, fileDownload, unzipB2Z };
