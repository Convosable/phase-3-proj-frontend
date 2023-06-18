import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function DogDetails( {handleDogDelete} ) {


    const [dog, setDog] = useState([])
    const params = useParams();
    let navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:9292/dogs/${params.id}`)
        .then(r => r.json())
        .then((doggy) => setDog(doggy))
    },[])

    function adoptDog() {
        fetch(`http://localhost:9292/dogs/${params.id}`, {
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(dog => handleDogDelete(dog))
        navigate('/dogs')
        alert('Congratulations on your new pet!')
    }

    return(
        <div>
            <h1>{dog.name}</h1>
            <img src = {dog.image_url} alt = {dog.name} height="300"/>
            <h2>Breed: {dog.breed}</h2>
            <h4>Age: {dog.age} Sex: {dog.sex} </h4>
            <h4>Weight: {dog.weight} lbs. Size: {dog.size}</h4>
            <h4>Shelter ID: {dog.shelter_id}</h4>
            <h4>Posted: {dog.created_at}</h4>
            <h4>Updated: {dog.updated_at}</h4>
            <button>Edit</button>
            <button onClick = {adoptDog}>Adopt Me!</button>
        </div>
    )
}

export default DogDetails;


//create a if ? blank : blank for breeder info


//need update button AND AN UPDATE IN APPICATION CONTROLLER BACKEND

