import {buildTrie, generateGrid, findValidWordsFromGrid} from './Utils/BoggleSolverUtils.js'
import {useState} from 'react'
import './App.css';
import SignInComponent from './components/SignInComponent.react';
import BoggleSolverPlayComponent from './components/BoggleSolverPlayComponent.react';
import BoggleApplication from "./components/BoggleApplication.react";
import UserProvider from "./providers/UserProvider.react";

function App() {
 
  return (
    <div className="App">
      <header className="App-header">
      <UserProvider >
        <BoggleApplication>
        </BoggleApplication>
      </UserProvider>
      </header>
    </div>
    
  );
}
export default App;
