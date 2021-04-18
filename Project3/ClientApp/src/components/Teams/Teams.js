import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import TeamTable from './TeamTable';

const Teams = ({ auth }) => {

    const [teams, setTeams] = useState([]);
    const [filterTeam, setFilterTeam] = useState([]);
    
    useEffect(()=>{
        (async() => {
            const response = await fetch('api/teams');
            const data = await response.json();
            setTeams([...data]);
            setFilterTeam([...data]);
        })()
    },[])

    const onSearchChange = (value) => {
        const result = teams.filter(team => {
            return team.coach.toLowerCase().includes(value.toLowerCase());
        });
        setFilterTeam(result);
    }

    return (
        <div>
            <h1>Teams</h1>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input 
                    onChange={(e)=>onSearchChange(e.target.value)}
                    type="text" 
                    className="form-control" 
                    placeholder="CoachName" 
                    aria-label="CoachName" 
                    aria-describedby="basic-addon1"
                />
            </div>
            { auth ? <NavLink tag={Link} className="btn btn-primary" style={{ width: 'fit-content' }} to="/add-team"> Add Teams</NavLink> : null }
            <TeamTable teams={filterTeam} auth={auth} />
        </div>
    );
}

export default Teams;
