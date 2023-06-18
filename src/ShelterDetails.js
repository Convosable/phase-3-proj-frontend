import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ShelterDetails() {

    const [shelter, setShelter] = useState([]);
    const [dogs, setDogs] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        fetch(`http://localhost:9292/shelters/${id}`)
        .then(r => r.json())
        .then((animalShelter) => {
            let dogs = animalShelter.dogs
            setDogs(dogs)
            setShelter(animalShelter)
        })
    }, [id])

    return(
        <div>
            <h1>{shelter.name}</h1>
            {dogs.map(dog =>
                <div key={dog.id}>
                <h1>{dog.name}</h1>
                <img src = {dog.image_url} alt = {dog.name} height="300"/>
                <h2>Breed: {dog.breed}</h2>
                <h4>ID: {dog.id} Age: {dog.age} Sex: {dog.sex}</h4>
                <Link to={`/dogs/${dog.id}`}>More Details</Link>
            </div>
            )}
        </div>
    )
}

export default ShelterDetails;
