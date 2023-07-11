import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function CatDetails( {handleCatDelete, handleCatUpdate, sheltersList} ) {

    const [isHidden, setIsHidden] = useState(true)
    const [cat, setCat] = useState({
        name: "",
        image_url: "",
        age: "",
        breed: "",
        sex: "",
        weight: "",
        size: "",
        shelter_id: "",
        created_at: "",
        updated_at: ""
    })

    const params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const correctShelter = sheltersList.find((shelter) => {
            const cat = shelter.cats.find((c) => c.id === parseInt(params.id));
            return cat;
          });
      
          if (correctShelter) {
            const correctCat = correctShelter.cats.find((c) => c.id === parseInt(params.id));
            if (correctCat) {
              setCat(correctCat);
            }
          }
        }, []);

    function deleteCat() {
        fetch(`http://localhost:9292/cats/${params.id}`, {
            method: 'DELETE'
        })
        .then(() => handleCatDelete(params.id, cat.shelter_id));
        navigate(`/shelters/${cat.shelter_id}`)
        alert(`Congratulations on adopting ${cat.name}!`)
    }

    function updateCatDetails(e) {
        e.preventDefault();
        fetch(`http://localhost:9292/cats/${params.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cat),
        })
        .then(r => r.json())
        .then((updatedCat) => handleCatUpdate(updatedCat))
        setIsHidden(true)
    }

    function handleChange(e) {
        setCat({
            ...cat,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className='dog-details'>
            <h1>{cat.name}</h1>
            <img src = {cat.image_url} alt = {cat.name} height="300"/>
            <h2>Breed: {cat.breed}</h2>
            <h4>Age: {cat.age} Sex: {cat.sex} </h4>
            <h4>Weight: {cat.weight} lbs. Size: {cat.size}</h4>
            <h4>Posted: {cat.created_at}</h4>
            <h4>Updated: {cat.updated_at}</h4>
            <button onClick = {() => setIsHidden(isHidden => !isHidden)}>Edit</button>
            <button onClick = {deleteCat}>Adopt Me!</button>


            <div className= {isHidden ? 'not-visible' : 'visible'}>
                <form onSubmit = {updateCatDetails}>
                    <label>Name: </label>
                    <input onChange = {handleChange} type='text' name='name' value={cat.name}/><br></br>
                    <label>Image: </label>
                    <input onChange = {handleChange} type='text' name='image_url' value={cat.image_url}/><br></br>
                    <label>Age: </label>
                    <input onChange = {handleChange} type='text' name='age' value={cat.age}/><br></br>
                    <label>Breed: </label>
                    <input onChange = {handleChange} type='text' name='breed' value={cat.breed}/><br></br>
                    <label>Sex: </label>
                    <input onChange = {handleChange} type='text' name='sex' value={cat.sex}/><br></br>
                    <label>Weight: </label>
                    <input onChange = {handleChange} type='text' name='weight' value={cat.weight}/><br></br>
                    <label>Size: </label>
                    <input onChange = {handleChange} type='text' name='size' value={cat.size}/><br></br>
                    <input type="submit" value = "Update cat details!"/>
                </form>
            </div>
        </div>
    )
}

export default CatDetails;
