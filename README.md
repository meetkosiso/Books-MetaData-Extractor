# MetaData-Extractor

The challenge is to build a metadata extractor for all the project Gutenberg titles which are available in [zip](http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip) and [tar](http://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2) format

## To install the service Dependencies
```
npm install
```

To use the service, the first step is to download the rdf metadata, this will take some time because of the size of the data.

## To download the rdf metadata
```
npm run download
```
After downloading the rdf metadata, the next step is to extract all books attribute and the service will automatically save it to the database for future quering

## To extract all the books attribute
```
npm start
```

## To run unit test
```
npm run test
```

## To run unit test and see the test coverage of the application
```
npm run test-with-coverage
```


