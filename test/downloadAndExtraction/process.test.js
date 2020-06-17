import { assert } from 'chai';

import fs from 'fs';
import tar from 'tar-fs';
import request from 'request';
import unzipper from 'unzipper';
import bz2 from 'unbzip2-stream';

import processInstance from '../../src/downloadAndExtraction/process';

const createWriteStream = fs.createWriteStream;
const createReadStream = fs.createReadStream;

const filePathMock = './mock/ziptest';
const unzipPath = './mock/metadata_tech-test.zip';
const imagePath = './mock/test11.jpg';

const readTarPath = './mock/metadata_tech-test.tar';
const readBz2Path = './mock/metadata_tech-test.tar.bz2';
const testPath = './mock/test';
const testBz2Path = './mock/testbz2';
const url =
	'https://www.kenrockwell.com/ryan/images/2015/2015-07/DSC00964-full.jpg';

describe('Download And Extract File', function() {
	it('should extract a zip file', function(done) {
		processInstance
			.unzipFile(createReadStream, unzipper, unzipPath, filePathMock)
			.then(file => {
				assert.equal(file, 'successful');
				done();
			});
	});
	it('should extract a tar file', function(done) {
		processInstance
			.unzipTarFile(createReadStream, tar, readTarPath, testPath)
			.then(file => {
				// console.log('file', file);
				assert.equal(file, 'successful');
				done();
			});
	});
	it('should extract a b2z file', function(done) {
		processInstance
			.unzipB2Z(createReadStream, bz2, tar, readBz2Path, testBz2Path)
			.then(file => {
				assert.equal(file, 'successful');
				done();
			});
	});
	it('should download a file successfully', function(done) {
		this.timeout(10000);
		processInstance
			.fileDownload(url, createWriteStream, request, imagePath)
			.then(file => {
				assert.equal(file, 'successful');
				done();
			});
	});
});
