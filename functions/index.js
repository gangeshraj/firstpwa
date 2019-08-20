var functions= require('firebase-functions');
var admin= require('firebase-admin');
var cors= require('cors')({origin:true});

var serviceAccount = require("./first-pwa-f2d11-firebase-adminsdk-r8cti-66a2885b5b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://first-pwa-f2d11.firebaseio.com/'
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 cors(request,response,function(){
    admin.database()
    .ref('posts').push({
        id:request.body.id,
        title:request.body.title,
        localtion:request.body.location,
        image:request.body.image
    })
    .then(function(){
        response.status(201).json({'message':'Data Stored',id:request.body.id});
    })
    .catch(function(err){
        response.status(500).json({'error':err});
    });
 });
});
