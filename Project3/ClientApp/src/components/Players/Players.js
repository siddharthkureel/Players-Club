import React, { useState, useEffect } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PlayerTable from './PlayerTable';

const Players = ({ auth }) => {

    const [players, setPlayers] = useState([]);
    const [filterPlayers, setFilterPlayers] = useState([]);
        
    useEffect(()=>{
        (async() => {
            const response = await fetch('api/players');
            const data = await response.json();
            setPlayers([...data])
            setFilterPlayers([...data])
        })()
    },[])

    const onSearchChange = (value) => {
        const result = players.filter(player => {
            return player.age.toString().toLowerCase().includes(value.toLowerCase());
        });
        setFilterPlayers(result);
    }

    return (
        <div>
            <h1>Players</h1>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input 
                    onChange={(e)=>onSearchChange(e.target.value)}
                    type="text" 
                    className="form-control" 
                    placeholder="Search age" 
                    aria-label="Search age" 
                    aria-describedby="basic-addon1"
                />
            </div>
            { auth ? <NavLink tag={Link} className="btn btn-primary" style={{ width: 'fit-content' }} to="/add-player">Add Players</NavLink> : null }
            <PlayerTable players={filterPlayers} />
        </div>
    );
};


export default Players;
