import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import authService from '../api-authorization/AuthorizeService';

const AddTeam = () => {

    const history = useHistory();

    const [rugbyUnionId, setRugbyUnionID] = useState(null);
    const [fields, setFields] = useState({
        name: '',
        ground: '',
        coach: '',
        foundedYear: '',
        region: '',
        listOfPlayers: []
    });

    useEffect(()=>{
        (async() => {
            const response = await fetch('api/RugbyUnions');
            const result = await response.json();
            setRugbyUnionID(result[0].id);
        })()
    },[])

    const onFieldChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        const token = await authService.getAccessToken();
        try {
            const rawResponse = await fetch('api/Teams', {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({...fields, rugbyUnionId })
            });
            const content = await rawResponse.json();
            history.push('/teams')
        } catch (error) {
            alert('Add team with different Name')
        }
    }

    return (
        <div>
            <h1>Add Teams</h1>
            <form onSubmit={onSubmit} >
                <div className="mb-3 row">
                    <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input name="name" required={true} type="text" className="form-control" value={fields.name} onChange={(e)=>onFieldChange(e)} id="Name"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Ground" className="col-sm-2 col-form-label">Ground</label>
                    <div className="col-sm-10">
                        <input name="ground" required={true} type="text" className="form-control" value={fields.ground} onChange={(e)=>onFieldChange(e)} id="Ground"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Coach" className="col-sm-2 col-form-label">Coach</label>
                    <div className="col-sm-10">
                        <input name="coach" required={true} type="text" className="form-control" value={fields.coach} onChange={(e)=>onFieldChange(e)} id="Coach"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="FoundedYear" className="col-sm-2 col-form-label">FoundedYear</label>
                    <div className="col-sm-10">
                        <input name="foundedYear" required={true} type="text" className="form-control" value={fields.foundedYear} onChange={(e)=>onFieldChange(e)} id="FoundedYear"/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Region" className="col-sm-2 col-form-label">Region</label>
                    <div className="col-sm-10">
                        <input name="region" required={true} type="text" className="form-control" value={fields.region} onChange={(e)=>onFieldChange(e)} id="Region"/>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTeam;
