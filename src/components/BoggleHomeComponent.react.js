import React, { useState, useCallback, useEffect } from "react";
import firebase from "../firebase.js"
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import BoggleSolverPlayComponent from "./BoggleSolverPlayComponent.react.js"
import {fetchChallengesFromDatabase} from "../firebase.js"
import {buildTrie, generateGrid, findValidWordsFromGrid} from '../Utils/BoggleSolverUtils.js'
import { useNavigate } from 'react-router-dom'    

function BoggleHomeComponent(props) {
    const trie = buildTrie();
    const [grid, setGrid] = useState(generateGrid())
    const validWords = findValidWordsFromGrid(grid, trie);
    const[leaderBoardData, setLeaderBoardData] = useState(null)
    const[selectedChallenge, setSelectedChallenge] = useState(null)
    const[startRegularGame, setStartRegularGame] = useState(false)
    const [loadChallenge, setLoadChallenge] = useState(false);
    useEffect(() => {
        fetchChallengesFromDatabase().then((value) => setLeaderBoardData(value))
    },[])
   
    let items = []
    if (leaderBoardData != null) {
        for (let i = 0; i<leaderBoardData.length; i++) {
        items.push(<Dropdown.Item onClick={()=>{
            setLoadChallenge(true)
            setSelectedChallenge(leaderBoardData[i])
        }}>Challenge {i+1} boardSize:{leaderBoardData[i].boardSize} High Score:{leaderBoardData[i].numFound}</Dropdown.Item>)
    }}
    return (
        <div>
            <Button variant="primary" onClick={() => firebase.auth().signOut()}>
                Sign Out
            </Button>
            {startRegularGame && <BoggleSolverPlayComponent grid={grid} setGrid={setGrid} validWords={validWords} isChallenge={false}></BoggleSolverPlayComponent>}
            {loadChallenge && <BoggleSolverPlayComponent trie={trie} isChallenge={true} selectedChallenge={selectedChallenge}></BoggleSolverPlayComponent>}

            {!startRegularGame && !loadChallenge &&<div>
                <Button variant="primary" onClick={() => {setStartRegularGame(true)}}>
                    Start
                </Button>
                <DropdownButton id="dropdown-basic-button" title="Load Challenge">
                    {items}
                </DropdownButton>
            </div>}
        </div>
  )
}
export default BoggleHomeComponent;
