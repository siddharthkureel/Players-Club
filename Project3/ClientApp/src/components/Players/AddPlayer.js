import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import authService from '../api-authorization/AuthorizeService';

const AddPlayer = () => {

    const history = useHistory();
    const [teams, setTeams] = useState([]);
    const [select, setSelect] = useState('');
    const [fields, setFields] = useState({
        name:'',
        birthDate:'',
        height: '',
        weight: '',
        placeOfBirth: ''
    });

    useEffect(() => {
        (async() => {
            const response = await fetch('api/teams');
            const data = await response.json();
            setTeams([...data])
            if(!data.length){
                alert('Please Create Team first to add players')
                history.push('/add-team')
            }
        })()
    }, []);

    const onFieldChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        })
    }


    const onSubmit = async(e) => {
        e.preventDefault();
        const teamId = select.split('+')[0];
        const teamName = select.split('+')[1];
        const age = getAge(fields.birthDate);
        
        const body = {
            ...fields,
            age,
            teamId,
            teamName
        }
        const token = await authService.getAccessToken();
        const rawResponse = await fetch('api/players', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const content = await rawResponse.json();
        history.push('/players')
    }

    return (
        <div>
            <h1>Add Player</h1>
            <form onSubmit={onSubmit} >
                <div className="mb-3 row">
                    <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input name="name" required={true} type="text" className="form-control" value={fields.name} onChange={(e)=>onFieldChange(e)} id="Name"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="birthDate" className="col-sm-2 col-form-label">Birth Date</label>
                    <div className="col-sm-10">
                        <input name="birthDate" required={true} type="date" className="form-control" value={fields.birthDate} onChange={(e)=>onFieldChange(e)} id="birthDate"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Height" className="col-sm-2 col-form-label">Height in cm</label>
                    <div className="col-sm-10">
                        <input name="height" required={true} type="number" className="form-control" value={fields.height} onChange={(e)=>onFieldChange(e)} id="Height"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Weight" className="col-sm-2 col-form-label">Weight in kg</label>
                    <div className="col-sm-10">
                        <input name="weight" required={true} type="number" className="form-control" value={fields.weight} onChange={(e)=>onFieldChange(e)} id="Weight"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="PlaceOfBirth" className="col-sm-2 col-form-label">PlaceOfBirth</label>
                    <div className="col-sm-10">
                        <input name="placeOfBirth" required={true} type="text" className="form-control" value={fields.placeOfBirth} onChange={(e)=>onFieldChange(e)} id="PlaceOfBirth"/>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
                    </div>
                    <select 
                        className="custom-select" 
                        id="inputGroupSelect01" 
                        name="teamId" 
                        onChange={(e)=>setSelect(e.target.value)} 
                        defaultValue={null}
                        required
                    >
                        <option ></option>
                        {
                            teams.map((team, i)=>(
                                <option key={i} value={`${team.id}+${team.name}`}>{team.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddPlayer;

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}