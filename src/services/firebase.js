import firebase from "firebase/app";
import "firebase/firestore";

// Firebase configuration
const cofig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = firebase.initializeApp(cofig);
const db = app.firestore();

export const getDocsWithId = querySnapshot =>
  querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

export const onSnapshot = async (collection, conditions, limit, callback) => {
  const queryLimit = limit ? limit : 10;
  db.collection(collection)
    .limit(queryLimit)
    .onSnapshot(callback);
};

export const get = async (collection, conditions, limit) => {
  const query = db.collection(collection);
  if (limit !== -1) {
    const queryLimit = limit ? limit : 10;
    query.limit(queryLimit);
  }
  const querySnapshot = await query.get();

  return getDocsWithId(querySnapshot);
};

export const upsert = async (collection, values) => {
  const reference = db.collection(collection);
  const currentDate = new Date();

  if (values.id) {
    reference.doc(values.id).set({
      ...values,
      dateUpdated: currentDate
    });
  } else {
    reference.doc().set({
      ...values,
      dateCreated: currentDate,
      dateUpdated: currentDate
    });
  }
};

export const remove = async (collection, id) => {
  db.collection(collection)
    .doc(id)
    .delete();
};
