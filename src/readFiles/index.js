import fs from 'graceful-fs';
import path from 'path';

import xml2js from 'xml2js';

import nestedProperty from 'nested-property';
import processInstance from './process';

const stripPrefix = require('xml2js').processors.stripPrefix;

function fieldProperty(data, propertyString, field) {
	const fieldPropertyInstance = processInstance.fieldProperty(
		data,
		propertyString,
		field,
		nestedProperty
	);
	return fieldPropertyInstance;
}

function getBookAttribute(data) {
	const getBookAttributeInstance = processInstance.getBookAttribute(
		data,
		nestedProperty,
		fieldProperty
	);
	return getBookAttributeInstance;
}

function parseRDF(rdf) {
	return new Promise(resolve => {
		processInstance.parseRDF(
			rdf,
			xml2js,
			stripPrefix,
			getBookAttribute,
			response => {
				resolve(response);
			}
		);
	});
}

async function readFiles(filePath) {
	const parseRDFInstance = await parseRDF;
	const readFilesInstance = await processInstance.readFiles(
		filePath,
		fs,
		path,
		parseRDFInstance
	);
	return readFilesInstance;
}

export default { readFiles, fieldProperty, getBookAttribute, parseRDF };
