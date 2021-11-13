import firebase from "../firebase.js"
import React, { useState, useEffect} from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from "react-bootstrap/Button";
import BoggleHomeComponent from "./BoggleHomeComponent.react.js";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}
const styles = {
container: {
  width: '50%',
  border: '3px solid green',
  padding: '10px',
  position: 'absolute'
}
}

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  if (!isSignedIn) {
    return (
      <div style={styles.container}>
        <h1>BoggleApp</h1>
        <p>Please sign-in</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}></StyledFirebaseAuth>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
      <BoggleHomeComponent>
      </BoggleHomeComponent>
    </div>
  );
}
export default SignInScreen;