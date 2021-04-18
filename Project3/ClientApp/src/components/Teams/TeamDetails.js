import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import moment from "moment";

const TeamDetails = () => {

    const { id } = useParams();
    const [details, setDetails] = useState(null);
        
    useEffect(()=>{
        (async() => {
            const response = await fetch(`api/teams/${id}`);
            const data = await response.json();
            setDetails(data)
        })()
    },[])

    return (
        <div>
            {
                !details ? 
                <div>loading..</div>
                :
            <div>
                <dl style={styles.dl}>
                    <dt>Name :&nbsp;</dt>
                    <dd>{details.name}</dd> &nbsp;&nbsp;
                    <dt>Coach :&nbsp;</dt>
                    <dd>{details.coach}</dd>&nbsp;&nbsp;
                    <dt>Ground :&nbsp;</dt>
                    <dd>{details.ground}</dd>&nbsp;&nbsp;
                    <dt>Founded Year :&nbsp;</dt>
                    <dd>{details.foundedYear}</dd>&nbsp;&nbsp;
                    <dt>Region :&nbsp;</dt>
                    <dd>{details.region}</dd>
                </dl>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date of Birth</th>
                        <th scope="col">Age</th>
                        <th scope="col">Height(cms)</th>
                        <th scope="col">Weight(kgs)</th>
                        <th scope="col">Place of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        details.players.map((player, i)=>{
                            return(
                            <tr key={i}>
                                <th scope="row">{player.name}</th>
                                <td>{moment(player.birthDate).format("D MMM YYYY")}</td>
                                <td>{player.age}</td>
                                <td>{player.height}</td>
                                <td>{player.weight}</td>
                                <td>{player.placeOfBirth}</td>
                            </tr>
                        )}
                        )
                    }
                </tbody>
            </table>
            </div>
            }
        </div>
    );
}

const styles = {
    dl: {
        display: 'flex',
    },
}

export default TeamDetails;

