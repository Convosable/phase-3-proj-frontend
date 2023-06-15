import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ShelterDetails() {

    const [shelter, setShelter] = useState('');
    const [dogs, setDogs] = useState([]);
    const params = useParams();


    useEffect(() => {
        fetch(`http://localhost:9292/shelters/${params.id}`)
        .then(r => r.json())
        .then((animalShelter) => setShelter(animalShelter))
    },[])

    useEffect(() => {
        fetch(`http://localhost:9292/dogs`)
        .then(r => r.json())
        .then((allDogs) => setDogs(allDogs))
    }, [])

    const filterDogsByShelter = dogs.filter(dog => {
        if(shelter.id === dog.shelter_id) {
            return dog
        }
    })

    // can i somehow access the methof from my shelter class and use it instead of a filter?

    return(
        <div>
            <h1>{shelter.name}</h1>

            {filterDogsByShelter.map((dog) =>
                <div>
                    {dog.name}
                </div>
            )}
        </div>
    )
}

export default ShelterDetails;
