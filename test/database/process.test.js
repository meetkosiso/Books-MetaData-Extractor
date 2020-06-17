import { assert } from 'chai';
import databaseInstance from '../../src/database';

describe('Database', function() {
	const record = [
		{
			metaId: 22788,
			title: 'The Federalist Papers',
			author: ['Jay, John', 'Madison, James', 'Hamilton, Alexander'],
			publisher: 'Project Gutenberg',
			publicationDate: '2007-09-01',
			language: 'en',
			subject: [
				'Constitutional history -- United States -- Sources',
				'KF',
				'Constitutional law -- United States',
				'JK'
			]
		}
	];

	it('should insert into the database', function(done) {
		databaseInstance.create(record).then(response => {
			assert.equal(response[0].metaId, 22788);
			done();
		});
	});
});
