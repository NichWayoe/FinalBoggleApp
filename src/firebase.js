// Import the functions you need from the SDKs you need
import LeaderBoardEntry from "./models/LeaderBoardEntry.react"
import firebase from "firebase/app";
import "firebase/firestore";
import { collection, getDocs } from "firebase";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCL4FnV_Kyeatz8Wp1NB4i2qMKrCKwvnvc",
  authDomain: "bogglesolver-82bc5.firebaseapp.com",
  projectId: "bogglesolver-82bc5",
  storageBucket: "bogglesolver-82bc5.appspot.com",
  messagingSenderId: "1052124738284",
  appId: "1:1052124738284:web:a515a0148408e9fcfe6bc9",
  measurementId: "G-E3T05L3K99"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const fetchChallengesFromDatabase = async() => {
  const querySnapshot = await firebase.firestore().collection('LeaderBoard')
  .withConverter(LeaderBoardEntry.convertor).get()
  const events = querySnapshot.docs.map((doc: any) => doc.data())
  return querySnapshot.docs.map(doc => doc.data());
}

export const uploadDataToDatabase = async(leaderBoardEntry:LeaderBoardEntry) => {
  const ref = await firebase.firestore().collection('LeaderBoard').withConverter(LeaderBoardEntry.convertor).add(leaderBoardEntry)
    
}
// export const database = firebase.database;
// export const auth = firebase.auth;
// export const storage = firebase.storage;
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider;
// export const messaging = firebase.messaging;


