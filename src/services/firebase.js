import firebase from "firebase/app";
import "firebase/firestore";

// Firebase configuration
const cofig = {
  apiKey: "AIzaSyCQC-V2aEjjHG68uQjzFQYlhDr55UtRxeo",
  authDomain: "dados-api.firebaseapp.com",
  databaseURL: "https://dados-api.firebaseio.com",
  projectId: "dados-api",
  storageBucket: "",
  messagingSenderId: "976824309682",
  appId: "1:976824309682:web:eaeac818c69ca319"
};

const app = firebase.initializeApp(cofig);
const db = app.firestore();

export const getDocsWithId = querySnapshot => querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

export const onSnapshot = async (collection, conditions, limit, callback) => {
  const queryLimit = limit ? limit : 10;
  db.collection(collection).limit(queryLimit).onSnapshot(callback);
}

export const get = async (collection, conditions, limit) => {
  const queryLimit = limit ? limit : 10;
  const querySnapshot = await db.collection(collection).limit(queryLimit).get();

  return getDocsWithId(querySnapshot);
}

export const upsert = async (collection, values) => {
  const reference = db.collection(collection);

  if(values.id) {
    reference.doc(values.id).set(values);
  } else {
    reference.doc().set(values);
  }
}

export const remove = async (collection, id) => {
  db.collection(collection).doc(id).delete();
}