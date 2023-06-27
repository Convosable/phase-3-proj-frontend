import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ShelterDetails() {

    const [shelter, setShelter] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [cats, setCats] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        fetch(`http://localhost:9292/shelters/${id}`)
        .then(r => r.json())
        .then((animalShelter) => {
            const shelterCats = animalShelter.cats
            const shelterDogs = animalShelter.dogs
            setDogs(shelterDogs)
            setCats(shelterCats)
            setShelter(animalShelter)
        })
    }, [id])

    

    return(
        <div className="shelter-details">
            <div className="shelter-details-dogs">
                <h1>{shelter.name} - Dogs</h1>
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
            <div className="shelter-details-cats">
                <h1>{shelter.name} - Cats</h1>
                {cats.map(cat =>
                    <div key={cat.id}>
                    <h1>{cat.name}</h1>
                    <img src = {cat.image_url} alt = {cat.name} height="300"/>
                    <h2>Breed: {cat.breed}</h2>
                    <h4>ID: {cat.id} Age: {cat.age} Sex: {cat.sex}</h4>
                    <Link to={`/cats/${cat.id}`}>More Details</Link>
                </div>
                )}
            </div>
        </div>
    )
}

export default ShelterDetails;
// add a filter by dogs and cats