import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ShelterDetails( ) {

    const [shelter, setShelter] = useState({
        name: "",
        location: "",
        bio: "",
        established_date: ""
    });
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


    const totalDogs = dogs.length
    const totalCats = cats.length

    return(
        <div>
            <div>
                <h2>{shelter.name}</h2>
                <h3>Shelter ID: {shelter.id}</h3>
                <h3>About us: {shelter.bio}</h3>
                <h3>Located at: {shelter.location}</h3>
                <h4>Established: {shelter.established_date}</h4>
            </div>
            <div className="shelter-details">
                <div className="shelter-details-dogs">
                    <h1>Dogs</h1>
                    
                    <p>There {totalDogs > 1 ? "are" : "is"} {totalDogs} {totalDogs > 1 ? "dogs" : "dog"} available for adoption.</p>
                    {dogs.map(dog =>
                        <div key={dog.id}>
                        <h2>{dog.name}</h2>
                        <img src = {dog.image_url} alt = {dog.name} height="300"/>
                        <h3>Breed: {dog.breed}</h3>
                        <h4>ID: {dog.id} Age: {dog.age} Sex: {dog.sex}</h4>
                        <Link to={`/dogs/${dog.id}`}>More Details</Link>
                    </div>
                    )}
                </div>
                <div className="shelter-details-cats">
                    <h1>Cats</h1>
                    <p>There {totalCats > 1 ? "are" : "is"} {totalCats} {totalCats > 1 ? "cats" : "cat"} available for adoption.</p>
                    {cats.map(cat =>
                        <div key={cat.id}>
                        <h2>{cat.name}</h2>
                        <img src = {cat.image_url} alt = {cat.name} height="300"/>
                        <h3>Breed: {cat.breed}</h3>
                        <h4>ID: {cat.id} Age: {cat.age} Sex: {cat.sex}</h4>
                        <Link to={`/cats/${cat.id}`}>More Details</Link>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShelterDetails;
