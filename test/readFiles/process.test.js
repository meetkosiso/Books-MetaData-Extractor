import { assert } from 'chai';

import fs from 'graceful-fs';
import path from 'path';
import processInstance from '../../src/readFiles';

const filePathMock = './mock/metadata_tech-test/cache/epub';

describe('Read Files', function() {
	const testObjectExpectedResult = {
		author: ['Ben Can'],
		$: { about: 'test' },
		rights: { 0: 'test' },
		metaId: 1,
		title: 'The Declaration of Independence of the United States of America',
		publisher: 'Project Gutenberg',
		publicationDate: '1971-12-01',
		language: 'en',
		licenseRights: 'Public domain in the USA.'
	};

	const testArray = [
		{
			author: ['Jefferson, Thomas'],
			rights: { 0: 'test' },
			creator: 'test 1',
			agent: { 0: { name: { 0: 'test1' } } }
		}
	];

	it('should get a field property successfully', function(done) {
		const fieldPropertyInstance = processInstance.fieldProperty(
			testArray,
			'agent.0.name.0',
			'author'
		);
		assert.equal(fieldPropertyInstance, 'test1');
		done();
	});

	it('should get book attribute successfully', function(done) {
		const getBookInstance = processInstance.getBookAttribute(
			testObjectExpectedResult
		);
		assert.equal(getBookInstance.publicationDate, null);
		done();
	});

	it('should parse the rdf file successfully', function(done) {
		fs.readFile(path.join(filePathMock, `/0/pg0.rdf`), async function(
			error,
			content
		) {
			processInstance.parseRDF(content).then(parseRDFInstance => {
				assert.equal(parseRDFInstance.metaId, 10);
				done();
			});
		});
	});

	it('should read all files in a directory successfully', function(done) {
		processInstance.readFiles(filePathMock).then(response => {
			assert.equal(response[0].metaId, 10);
			done();
		});
	});
});
