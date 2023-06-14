import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function DogDetails() {


    const [dog, setDog] = useState([])
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:9292/dogs/${params.id}`)
        .then(r => r.json())
        .then((doggy) => setDog(doggy))
    },[])
    

    return(
        <div>
            <h1>{dog.name}</h1>
            <img src = {dog.image_url} alt = {dog.name} height="300"/>
            <h2>Breed: {dog.breed}</h2>
            <h4>Age: {dog.age} Sex: {dog.sex} </h4>
            <h4>Weight: {dog.weight} lbs. Size: {dog.size}</h4>
            <h4>Shelter: {dog.shelter_id}</h4>
            <h4>{dog.shelter_id ? dog.shelter_id : dog.breeder_id}</h4>
            <h4>Posted: {dog.created_at}</h4>
            <h4>Updated: {dog.updated_at}</h4>
        </div>
    )
}

export default DogDetails;

//set up get request to access breeder or shelter .... or maybe i can set up a connection in my applocation controller or model for the shelter object to be available.
//link breeder info or shelter info

//create a if ? blank : blank for breeder info
