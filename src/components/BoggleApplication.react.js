import { useContext } from "react";
import {UserContext} from '../providers/UserProvider.react'
import BoggleHomeComponent from './BoggleHomeComponent.react';
import SignInComponent from './SignInComponent.react'
import {buildTrie} from '../Utils/BoggleSolverUtils.js'

function BoggleApplication(props) {
    const trie = buildTrie();
    const user = useContext(UserContext);
    return (
        user? <BoggleHomeComponent trie={trie}></BoggleHomeComponent>
        : <SignInComponent></SignInComponent>
    )

}
export default BoggleApplication;