import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NewDogForm from "./NewDogForm";
import NewCatForm from "./NewCatForm";

function ShelterDetails( {handleShelterDelete, sheltersList} ) {

    const [shelter, setShelter] = useState({
        dogs: [],
        cats: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isHidden, setIsHidden] = useState(true)

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const correctShelter = sheltersList.find(shelter => shelter.id === parseInt(id))
        if (correctShelter) {
            setShelter(correctShelter);
            setIsLoading(false)
        }
    }, [id, sheltersList])


    function deleteShelter() {
        fetch(`http://localhost:9292/shelters/${id}`, {
            method: 'DELETE'
        })
        .then(() => handleShelterDelete(id))
        alert(`${shelter.name} succesfully deleted!`) 
        navigate('/shelters')
    }

    function handleNewDogSubmit(newDog) {
        setShelter({...shelter, dogs: [...shelter.dogs, newDog]})
        setIsHidden(true)
    }
    
    function handleNewCatSubmit(newCat) {
        setShelter({...shelter, cats: [...shelter.cats, newCat]})
        setIsHidden(true)
    }
   

    if (isLoading) return <h1>Loading...</h1>

    return(
        <div>
            <div>
                <h2>{shelter.name}</h2>
                <h3>About us: {shelter.bio}</h3>
                <h3>Located at: {shelter.location}</h3>
                <h4>Established: {shelter.established_date}</h4>
            
                <button onClick = {deleteShelter}>Remove Shelter!</button>
            </div>
            <div className="shelter-details">
                <div className="shelter-details-dogs">
                    <h1>Dogs</h1>
                        <button onClick = {() => setIsHidden(isHidden => !isHidden)}>List new dog for adoption!</button>
                        <div className= {isHidden ? 'not-visible' : 'visible'}>
                            <NewDogForm shelter = {shelter} handleNewDogSubmit = {handleNewDogSubmit}/>
                        </div>
                    <p>There {shelter.dogs.lengthDogs > 1 ? "are" : "is"} {shelter.dogs.length} {shelter.dogs.length > 1 ? "dogs" : "dog"} available for adoption.</p>
                    {shelter.dogs.map(dog =>
                        <div key={dog.id}>
                        <h2>{dog.name}</h2>
                        <img src = {dog.image_url} alt = {dog.name} height="300"/>
                        <h3>Breed: {dog.breed}</h3>
                        <h4>Age: {dog.age} Sex: {dog.sex}</h4>
                        <Link to={`/shelters/${shelter.id}/dogs/${dog.id}`}>More Details</Link>
                    </div>
                    )}
                </div>
                <div className="shelter-details-cats">
                    <h1>Cats</h1>
                    <button onClick = {() => setIsHidden(isHidden => !isHidden)}>List new cat for adoption!</button>
                        <div className= {isHidden ? 'not-visible' : 'visible'}>
                            <NewCatForm shelter = {shelter} handleNewCatSubmit = {handleNewCatSubmit}/>
                        </div>
                    <p>There {shelter.cats.length > 1 ? "are" : "is"} {shelter.cats.length} {shelter.cats.length > 1 ? "cats" : "cat"} available for adoption.</p>
                    {shelter.cats.map(cat =>
                        <div key={cat.id}>
                        <h2>{cat.name}</h2>
                        <img src = {cat.image_url} alt = {cat.name} height="300"/>
                        <h3>Breed: {cat.breed}</h3>
                        <h4>ID: {cat.id} Age: {cat.age} Sex: {cat.sex}</h4>
                        <Link to={`/shelters/${shelter.id}/cats/${cat.id}`}>More Details</Link>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShelterDetails;
