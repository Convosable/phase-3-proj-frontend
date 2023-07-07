import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewShelterForm( {handleNewShelterSubmit} ) {

    let navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        bio: "",
        established_date: "",
    })

    function createShelter(e) {
        e.preventDefault();
        fetch("http://localhost:9292/shelters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then((newShelter) => handleNewShelterSubmit(newShelter));
        setFormData({
            name: "",
            location: "",
            bio: "",
            established_date: ""
        })
        navigate('/shelters')
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className = 'new-shelter-form'>
            <form onSubmit = {createShelter}>
                <label>Name: </label>
                <input onChange = {handleChange} type='text' name='name' value={formData.name}/><br></br>
                <label>Location: </label>
                <input onChange = {handleChange} type='text' name='location' value={formData.location}/><br></br>
                <label>Bio: </label>
                <input onChange = {handleChange} type='text' name='bio' value={formData.bio}/><br></br>
                <label>Established Date: </label>
                <input onChange = {handleChange} type='text' name='established_date' value={formData.established_date}/><br></br>
                <input type="submit" value = "Create Shelter!"/>
            </form>
        </div>
    )
}

export default NewShelterForm