const store = [];
const tempStore = [];

function fieldProperty(data, propertyString, field, nestedProperty) {
	const tempStorage = [];
	data.map(element => {
		if (nestedProperty.get(element, propertyString)) {
			switch (field) {
				case 'author':
					tempStorage.push(element.agent[0].name[0]);
					break;
				case 'subject':
					tempStorage.push(element.Description[0].value[0]);
					break;
				default:
					tempStorage.push([]);
			}
		}
	});

	return tempStorage;
}

function getBookAttribute(record, nestedProperty, fieldPropertyInstance) {
	const bookAttribute = {};

	let recId = record.$.about;
	recId = recId.slice(recId.indexOf('/') + 1).trim();
	bookAttribute.metaId = Number(recId);

	if (!nestedProperty.get(record, 'title.0')) {
		return null;
	}

	bookAttribute.title = record.title[0];
	bookAttribute.author = nestedProperty.get(record, 'creator.0.agent.0.name.0')
		? fieldPropertyInstance(record.creator, 'agent.0.name.0', 'author')
		: null;

	bookAttribute.publisher = nestedProperty.get(record, 'publisher')
		? record.publisher[0]
		: 'Project Gutenberg';

	bookAttribute.publicationDate = nestedProperty.get(record, 'issued.0._')
		? record.issued[0]['_']
		: null;

	bookAttribute.language = nestedProperty.get(
		record,
		'language.0.Description.0.value.0'
	)
		? record.language[0].Description[0].value[0]['_']
		: null;

	bookAttribute.subject = nestedProperty.get(
		record,
		'subject.0.Description.0.value.0'
	)
		? fieldPropertyInstance(record.subject, 'Description.0.value.0', 'subject')
		: null;

	bookAttribute.licenseRights = nestedProperty.get(record, 'rights.0')
		? record.rights[0]
		: null;
	return bookAttribute;
}

function parseRDF(
	xml,
	xml2js,
	stripPrefix,
	getBookAttributeInstance,
	callBack
) {
	if (Buffer.isBuffer(xml)) {
		const parseStringInstance = xml2js.parseString;
		parseStringInstance(
			xml,
			{ tagNameProcessors: [stripPrefix], attrNameProcessors: [stripPrefix] },
			async function(err, result) {
				const record = JSON.parse(JSON.stringify(result.RDF.ebook[0]));
				const objects = getBookAttributeInstance(record);
				store.push(objects);
				callBack(objects);
			}
		);
	}
}

function readFiles(dirname, fs, path, parseRDFInstance) {
	return new Promise((resolve, reject) => {
		fs.readdir(dirname, function(err, filenames) {
			if (err) {
				reject(new Error(err));
				return;
			}
			filenames.forEach(function(filename, index) {
				fs.readFile(path.join(dirname, `/${index}/pg${index}.rdf`), function(
					error,
					content
				) {
					if (err) {
						reject(new Error(error));
						return;
					}
					tempStore.push(store.length);

					if (tempStore.length === filenames.length) {
						resolve(store);
					}
					parseRDFInstance(content);
				});
			});
		});
	});
}

export default { readFiles, parseRDF, getBookAttribute, fieldProperty };
