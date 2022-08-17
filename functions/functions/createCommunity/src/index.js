const sdk = require("node-appwrite");
const uuidv4 = require("uuid/v4")
/*
'req' variable has:
'headers' - object with request headers
'payload' - object with request body data
'env' - object with environment variables

'res' variable has:
'send(text, status)' - function to return text response. Status code defaults to 200
'json(obj, status)' - function to return JSON response. Status code defaults to 200

If an error is thrown, a response with code 500 will be returned.
*/

const colors = [
    "red",
    "blue",
    "indigo",
    "orange",
    "green"
]

module.exports = async function (req, res) {
    const client = new sdk.Client();
    
    // You can remove services you don't use
    let database = new sdk.Databases(client, '62fd29769e269ac3a8f6');
    let databaseUsers = new sdk.Databases(client, '62fd3cc3cafb6e2dc42f');
    let teams = new sdk.Teams(client);
    let users = new sdk.Users(client);
    
    if (
        !req.env['APPWRITE_FUNCTION_ENDPOINT'] ||
        !req.env['APPWRITE_FUNCTION_API_KEY']
    ) {
        console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
    } else {
        client
        .setEndpoint(req.env['APPWRITE_FUNCTION_ENDPOINT'])
        .setProject(req.env['APPWRITE_FUNCTION_PROJECT_ID'])
        .setKey(req.env['APPWRITE_FUNCTION_API_KEY'])
        .setSelfSigned(true);
    }

    const data = JSON.parse(req.payload);

    const name = data.name;
    const color = data.color;

    if(!name || typeof name !== "string" || name.length < 3) {
        return res.send("invalid name", 400);
    }
    if(!color || colors.indexOf(color) === -1) {
        return res.send("invalid color", 400);
    }

    let free = false;
    let id = "";

    while(!found) {
        id = "community_" + uuidv4();
        try {
            await database.getCollection("community_" + id);
            found = true;
        } catch (error) {
            // ignored
        }
    }

    const userId = process.env["APPWRITE_FUNCTION_USER_ID"];
    const user = await users.get(userId);
    const team = await teams.create(id, id);
    await teams.createMembership(team.$id, user.email, ["owner"], 'https://shopforme.software-engineering.education');

    const community = await databases.createCollection(id, id, 'document', ["team:"+team.$id], []);

    await databases.createDocument("62fd29ae5cdfa08b3b28", community.$id, {
        name,
        color
    }, ["team:"+team.$id], [])
    // databaseUsers.listDocuments('62fd3d15c3274b29defc', [
    //     Query.equal('userId', userId)
    // ]);
    await databaseUsers.createDocument('62fd3d15c3274b29defc', 'unique()', {userId: userId, communityId: community.$id}, ["user:"+userId], []);
    res.json({
        communityId: community.$id,
    });
};
