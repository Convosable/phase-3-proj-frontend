import React, {useState} from 'react';
import { useNavigate, Link } from "react-router-dom";

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
      {dogsList.map((dog) => 
        <div key={dog.id}>
          <h1>{dog.name}</h1>
          <img src = {dog.image_url} alt = {dog.name} height="300"/>
          <h2>Breed: {dog.breed}</h2>
          <h4>ID: {dog.id} Age: {dog.age} Sex: {dog.sex}</h4>
          <Link to={`/dogs/${dog.id}`}>More Details</Link>
        </div>
      )}
    </div>
  );
}

export default Dog;

//filter by breed etc.