import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';

function DogDetails( {handleDogDelete, handleDogUpdate} ) {

    const [isHidden, setIsHidden] = useState(true)
    const [dog, setDog] = useState({
        name: "",
        image_url: "",
        age: "",
        breed: "",
        sex: "",
        weight: "",
        size: "",
        shelter: {},
        shelter_id: "",
        created_at: "",
        updated_at: ""
    })

    const params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9292/dogs/${params.id}`)
        .then(r => r.json())
        .then((d) => {
            console.log(d)
            setDog(d)
        })
    },[])

    function adoptDog() {
        fetch(`http://localhost:9292/dogs/${params.id}`, {
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(dog => handleDogDelete(dog))
        navigate('/dogs')
        alert(`Congratulations on adopting ${dog.name}!`)
    }

    function updateDogDetails() {
        fetch(`http://localhost:9292/dogs/${params.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: dog.name,
                image_url: dog.image_url,
                age: dog.age,
                breed: dog.breed,
                sex: dog.sex,
                weight: dog.weight,
                size: dog.size,
                shelter: dog.shelter.name,
                shelter_id: dog.shelter_id,
                created_at: dog.created_at,
                updated_at: dog.updated_at
            }),
        })
        .then(r => r.json())
        .then((updatedDog) => handleDogUpdate(updatedDog))
    }

    function handleChange(e) {
        setDog({
            ...dog,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className='dog-details'>
            <h1>{dog.name}</h1>
            <img src = {dog.image_url} alt = {dog.name} height="300"/>
            <h2>Breed: {dog.breed}</h2>
            <h4>Age: {dog.age} Sex: {dog.sex} </h4>
            <h4>Weight: {dog.weight} lbs. Size: {dog.size}</h4>
            <Link to={`/shelters/${dog.shelter_id}`}>
                <h4>Shelter: {dog.shelter.name}</h4>
            </Link>
            <h4>Posted: {dog.created_at}</h4>
            <h4>Updated: {dog.updated_at}</h4>
            <button onClick = {() => setIsHidden(isHidden => !isHidden)}>Edit</button>
            <button onClick = {adoptDog}>Adopt Me!</button>


            <div className= {isHidden ? 'not-visible' : 'visible'}>
                <form onSubmit = {updateDogDetails}>
                    <label>Name: </label>
                    <input onChange = {handleChange} type='text' name='name' value={dog.name}/><br></br>
                    <label>Image: </label>
                    <input onChange = {handleChange} type='text' name='image_url' value={dog.image_url}/><br></br>
                    <label>Age: </label>
                    <input onChange = {handleChange} type='text' name='age' value={dog.age}/><br></br>
                    <label>Breed: </label>
                    <input onChange = {handleChange} type='text' name='breed' value={dog.breed}/><br></br>
                    <label>Sex: </label>
                    <input onChange = {handleChange} type='text' name='sex' value={dog.sex}/><br></br>
                    <label>Weight: </label>
                    <input onChange = {handleChange} type='text' name='weight' value={dog.weight}/><br></br>
                    <label>Size: </label>
                    <input onChange = {handleChange} type='text' name='size' value={dog.size}/><br></br>
                    <input type="submit" value = "Update dog details!"/>
                </form>
            </div>
        </div>
    )
}

export default DogDetails;