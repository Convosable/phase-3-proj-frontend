import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NewDogForm from "./NewDogForm";
import NewCatForm from "./NewCatForm";

function ShelterDetails( {handleShelterDelete} ) {

    const [shelter, setShelter] = useState({
        dogs: [],
        cats: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isHidden, setIsHidden] = useState(true)

    const {id} = useParams();
    const navigate = useNavigate();

    const totalDogs = shelter.dogs.length;
    const totalCats = shelter.cats.length;


    useEffect(() => {
        fetch(`http://localhost:9292/shelters/${id}`)
        .then(r => r.json())
        .then((animalShelter) => {
            setShelter(animalShelter)
            setIsLoading(false)
        })
    }, [id])

    function deleteShelter() {
        fetch(`http://localhost:9292/shelters/${id}`, {
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(shelter => handleShelterDelete(shelter))
        navigate('/shelters')
        alert(`${shelter.name} succesfully deleted!`)
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
                    <p>There {totalDogs > 1 ? "are" : "is"} {totalDogs} {totalDogs > 1 ? "dogs" : "dog"} available for adoption.</p>
                    {shelter.dogs.map(dog =>
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
                    <button onClick = {() => setIsHidden(isHidden => !isHidden)}>List new cat for adoption!</button>
                        <div className= {isHidden ? 'not-visible' : 'visible'}>
                            <NewCatForm shelter = {shelter} handleNewCatSubmit = {handleNewCatSubmit}/>
                        </div>
                    <p>There {totalCats > 1 ? "are" : "is"} {totalCats} {totalCats > 1 ? "cats" : "cat"} available for adoption.</p>
                    {shelter.cats.map(cat =>
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
