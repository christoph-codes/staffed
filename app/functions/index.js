const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firestoreEmail = functions.firestore
  .document("members/{memberid}")
  .onCreate((snap, context) => {
    const memberID = snap.data();

    const msg = {
      to: memberID.email,
      from: "andrewjermaine.ios@gmail.com",
      subject: "Welcome to Staffed!",

      // custom template
      templateId: "d-eaf8139be369420d91758ba4507c75db",
      substitutionWrappers: ["{{", "}}"],
      substitutions: {
        name: memberID.fname,
        email: memberID.email,
        companyName: memberID.companyid
      }
    };
    return sgMail.send(msg);
  });

//   return db
//     .collection("members")
//     .doc("memberID")
//     .get()
//     .then(doc => {
//       const member = doc.data();

//     })
//     .then(() => console.log("email sent"))
//     .catch(err => console.log(err));
//
