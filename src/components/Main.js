import React from 'react';
import nba from 'nba';
import {Profile} from './Profile';
//import ShotChart from 'ShotChart'
import {DataViewContainer} from "./DataViewContainer"
import SearchBar from "./SearchBar"
import { DEFAULT_PLAYER_INFO } from '../constants';
export class Main extends React.Component {
    state = {
        playerId: nba.findPlayer('Stephen Curry').playerId,
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    handleSelectPlayer = (playerName) => {
        this.loadPlayerInfo(playerName);
        console.log(playerName);
    }


    componentDidMount() {
        this.loadPlayerInfo(this.state.playerInfo.fullName);
    }


    loadPlayerInfo = (playerName) => {
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId }).then((info) => {
            const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
            this.setState({ playerInfo });
        });
    }
    render() {
        console.log(this.state.playerInfo)
        return (
            <div className="main">
                <SearchBar handleSelectPlayer={this.handleSelectPlayer}/>
                <div className="player">
                    <Profile playerInfo = {this.state.playerInfo}/>
                    <DataViewContainer playerId = {this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}


export default Main;