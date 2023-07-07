import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import DogCard from "./DogCard";


function Dog( {sheltersList} ) {

    const [textInput, setTextInput] = useState({id: ''});
    let navigate = useNavigate();


    const allDogs = []
    sheltersList.map((shelter) => {
        allDogs.push(...shelter.dogs)
    });
    

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/dogs/${textInput.id}`)
    }

    function handleChange(e) {
        setTextInput({
            ...textInput,
            [e.target.name] : e.target.value
        })
    }
    
    return (
    <div className="dogs">
        <div>
            Search for dog by ID:
            <form onSubmit = {handleSubmit}>
                <input onChange = {handleChange} type="text" placeholder="Dog ID" name="id" value={textInput.id}/>
                <input type="submit" value = "Search"/>
            </form>
        </div>
        {allDogs.map((dog) =>
            <DogCard key={dog.id} dog={dog}/>
        )}
    </div>
  );
}

export default Dog;