import Button from "react-bootstrap/Button";
import firebase, {uploadDataToDatabase} from "../firebase.js"
import React, { useState, useEffect, useContext } from "react";
import InputComponent from "./InputComponent.react";
import Toast from "react-bootstrap/Toast";
import BoardComponent from "./BoardComponent.react";
import { generateGrid, findValidWordsFromGrid } from "../Utils/BoggleSolverUtils.js";
import LeaderBoardEntry from "../models/LeaderBoardEntry.react.js";
import { UserContext } from "../providers/UserProvider.react.js";

export function BoggleSolverPlayComponent(props): React.MixedElement | Null {
  var start = Date.now();
  const user = useContext(UserContext)
  const [boggleState, setBoggleState] = useState({hasEndedChallenge:null, hasStarted:true});
  const [showToast, setShowToast] = useState(false);
  const [wordsFound, setWordsFound] = useState([]);
  const [word, setWord] = useState("");
  let grid = null
  let validWords  = null
  let setGrid = null
  const {isChallenge} = props;
  if (isChallenge) {
    const {selectedChallenge, trie} = props
    grid = selectedChallenge.theBoard
    validWords = findValidWordsFromGrid(grid, trie)
  }
  else {
    grid =  props.grid
    validWords = props.validWords
    setGrid = props.setGrid
  }

  const styles = {
    section: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      height: "100vh",
      alignItems: "center",
      columnGap: "20px",
    },
    view: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-Start",
      columnGap: "10px",
    },
    view2: {
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
    },
  };

  const handleSubmit = () => {
    if (wordsFound.includes(word.toUpperCase())) {
      setShowToast(true);
    } else if (validWords.includes(word.toLowerCase())) {
      setWordsFound(wordsFound.concat(word.toUpperCase()));
    } 
    // evt.preventDefault();
  };
  const handleClick = () => {
    if(boggleState.hasStarted) {
      setBoggleState({hasStarted:false})
      // const ref = firebase.firestore().collection('LeaderBoard').withConverter(LeaderBoardEntry.convertor).add()
      uploadDataToDatabase(new LeaderBoardEntry(user.displayName, grid.length, grid, wordsFound.length, (start - Date.now())/1000))
      setShowToast(true);
    }
    else{
      setBoggleState({hasStarted:true})
      setGrid(generateGrid())
      setWordsFound([])
    }
  }


  return (
    <div>
      <Toast
        bg="primary"
        position="top-start"
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Boggle Solver</strong>
        </Toast.Header>
        <Toast.Body>{!boggleState.hasStarted? "Your GamePlay has been solved"
                    :"Word already Submitted! Try another word"}
                    </Toast.Body>
       </Toast>
      <div style={styles.section}>
        <div style={styles.view2}>
          <div>
            {!isChallenge && <Button variant="primary" onClick={handleClick}>
              {boggleState.hasStarted ? "Stop" : "Start"}
            </Button>}
            {isChallenge && boggleState.hasStarted && <Button variant="primary" onClick={handleClick}>
            {"Stop"}
          </Button>}
          </div>
         <BoardComponent grid={grid} key={24323}></BoardComponent>
          {boggleState.hasStarted &&  ( <InputComponent
              setWord={setWord}
              handleSubmit={handleSubmit}
            ></InputComponent>
          )}
        </div>
        {!boggleState.hasStarted && (
          <div style={styles.view}>
            {validWords.map((item) => {
              if (!wordsFound.includes(item)) {
                return <span> {item} </span>;
              }
              return null;
            })}
          </div>
        )}
        {boggleState.hasStarted && (
          <div style={styles.view}>
            {wordsFound.map((item) => (
              <span> {item} </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default BoggleSolverPlayComponent;
