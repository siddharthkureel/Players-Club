import React, { useEffect, useState } from 'react';

const Home = () => {

    const [data, setData] = useState(null);
    useEffect(()=>{
        (async() => {
            const response = await fetch('api/RugbyUnions');
            const result = await response.json();
            setData(result[0]);
        })()
    },[])

    return (
        <div>
            <h1>{data?.name}</h1><br/>
            <p>{data?.description}</p><br/>
            <h2>Teams</h2>
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
                        data?.teams?.map((team, i)=>(
                            <tr key={i}>
                                <th scope="row">{team.name}</th>
                                <td>{team.ground}</td>
                                <td>{team.coach}</td>
                                <td>{team.foundedYear}</td>
                                <td>{team.region}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Home;
