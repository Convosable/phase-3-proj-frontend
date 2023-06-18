import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

    if (!dogs) return <h2>Loading...</h2>

    return(
        <div>
            <h1>{shelter.name}</h1>
            {dogs.map(dog =>
                <div>
                    <h1>{dog.name}</h1>
                </div>
            )}
        </div>
    )
}

export default ShelterDetails;
