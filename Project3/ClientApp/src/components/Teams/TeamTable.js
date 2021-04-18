import React from 'react';
import { useHistory } from 'react-router-dom';

const TeamTable = ({ teams, auth }) => {
    const history = useHistory();

    const onHandleDetails = (id) => {
        history.push(`/teams/${id}`)
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Ground</th>
                    <th scope="col">Coach</th>
                    <th scope="col">FoundedYear</th>
                    <th scope="col">Region</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    teams?.map((team, i)=>(
                        <tr key={i}>
                            <th scope="row">{team.name}</th>
                            <td>{team.ground}</td>
                            <td>{team.coach}</td>
                            <td>{team.foundedYear}</td>
                            <td>{team.region}</td>
                            {
                                auth ? 
                                <td>
                                    <button className="btn btn-secondary" onClick={()=>onHandleDetails(team.id)} >Details</button>
                                </td> 
                                : null
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default TeamTable;
