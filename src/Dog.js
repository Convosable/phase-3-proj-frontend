import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import DogCard from "./DogCard";


function Dog( {dogsList} ) {

    const [textInput, setTextInput] = useState({id: ''});

    let navigate = useNavigate();

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
            List a dog for Adoption:
            <button onClick = {() => navigate('/new-dog-form')}>Click Here</button>
        </div>
        <div>
            Search for dog by ID:
            <form onSubmit = {handleSubmit}>
                <input onChange = {handleChange} type="text" placeholder="Dog ID" name="id" value={textInput.id}/>
                <input type="submit" value = "Search"/>
            </form>
        </div>
        <DogCard dogsList = {dogsList}/>
    </div>
  );
}

export default Dog;