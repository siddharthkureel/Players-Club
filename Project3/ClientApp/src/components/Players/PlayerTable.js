import React from 'react';
import moment from 'moment';

const PlayerTable = ({ players }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">DateofBirth</th>
                    <th scope="col">Age</th>
                    <th scope="col">Height(cms)</th>
                    <th scope="col">Weight(kgs)</th>
                    <th scope="col">PlaceofBirth</th>
                    <th scope="col">Team</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map((player, i)=>(
                        <tr key={i}>
                            <th scope="row">{player.name}</th>
                            <td>{moment(player.birthDate).format("D MMM YYYY")}</td>
                            <td>{player.age}</td>
                            <td>{player.height}</td>
                            <td>{player.weight}</td>
                            <td>{player.placeOfBirth}</td>
                            <td>{player.team.name}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default PlayerTable;
