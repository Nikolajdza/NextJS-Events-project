import { MongoClient } from 'mongodb';

export async function connectDatabase() {
	const client = await MongoClient.connect(
		'mongodb+srv://nikola:starwars93@cluster0.okrq5.mongodb.net/events?retryWrites=true&w=majority'
	);

	return client;
}

export async function insertDocument(client, collection, document) {
	const db = client.db();

	const result = await db.collection(collection).insertOne(document);

	return result;
}

//export async function getAllDocuments(client, collection, sort, filter = {})
//export async function getAllDocuments(client, collection, sort)
export async function getAllDocuments(client, collection, sort, filter = {}) {
	const db = client.db();

	//const documents = await db.collection(collection).find().sort(sort).toArray();

	const documents = await db
		.collection(collection)
		.find(filter) // this changed - we use the "filter" parameter!
		.sort(sort)
		.toArray();

	return documents;
}
