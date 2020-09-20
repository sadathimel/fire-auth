import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const isSignedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(isSignedInUser);
        console.log(displayName, email, photoURL);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };

  const handleSigOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignIn: false,
          name: "",
          photo: "",
          email: "",
        };
        setUser(signedOutUser);
      })
      .catch((err) => {});
    console.log("sign Out");
  };

  const handleBlur = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
  };

  const handleSubmit = () => {};

  return (
    <div className="App">
      {user.isSignIn ? (
        <button onClick={handleSigOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign in</button>
      )}
      {user.isSignIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Our own Authentication</h1>
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          id=""
          placeholder="Your email address"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          id=""
          placeholder="Your password"
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
