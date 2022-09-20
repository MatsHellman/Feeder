const { MongoClient } = require("mongodb");

async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

async function findUserFeeds(userid) {
    const uri = process.env.DB_URI;
    let mongoClient;
    // get the user feeds
    try {
        
            mongoClient = await connectToCluster(uri);        
            console.log("========== Connected to Database ===================");
            console.log("In findUserFeeds try block.");
            console.log(`Looking for user_id ${userid}`);
            const database = mongoClient.db("feeder");
            const collection = database.collection("feeds");
            let query = { user_id: userid};
            console.log(query)
            console.log(await collection.find(query).toArray());
    } 
    catch (e) {
        console.log("=============== ERROR ===============");
        console.log(e);
        console.log("=====================================");
        client.close();
    } finally {
        console.log("======= CLOSING DATABASE CONNECTION ========")
        await mongoClient.close();
    }
}

async function addUserFeed(userid, feedUri) {
    const uri = process.env.DB_URI;
    let mongoClient;
    // get the user feeds
    try {
        
            mongoClient = await connectToCluster(uri);        
            console.log("========== Connected to Database ===================");
            console.log("In addUserFeed try block.");
            //console.log(`Looking for user_id ${userid}`);
            const database = mongoClient.db("feeder");
            const collection = database.collection("feeds");
            let newFeed = { user_id: userid, feed: feedUri};
            //console.log(query)
            console.log(await collection.insertOne(newFeed));
    } 
    catch (e) {
        console.log("=============== ERROR ===============");
        console.log(e);
        console.log("=====================================");
        client.close();
    } finally {
        console.log("======= CLOSING DATABASE CONNECTION ========")
        await mongoClient.close();
    }
}

module.exports = { findUserFeeds, addUserFeed };
