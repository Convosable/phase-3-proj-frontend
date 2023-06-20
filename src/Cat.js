import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Cat( {catsList} ) {


  const [textInput, setTextInput] = useState({id: ''});

  let navigate = useNavigate();

  function handleSubmit(e) {
      e.preventDefault();
      navigate(`/cats/${textInput.id}`)
  }

  function handleChange(e) {
      setTextInput({
          ...textInput,
          [e.target.name] : e.target.value
      })
  }
  

  return (
    <div className="cats">
      <div>
          List a cat for Adoption:
          <button onClick = {() => navigate('/new-cat-form')}>Click Here</button>
      </div>
      <div>
          Search for cat by ID:
          <form onSubmit = {handleSubmit}>
              <input onChange = {handleChange} type="text" placeholder="Cat ID" name="id" value={textInput.id}/>
              <input type="submit" value = "Search"/>
          </form>
      </div>
      {catsList.map((cat) => 
        <div key={cat.id}>
          <h1>{cat.name}</h1>
          <img src = {cat.image_url} alt = {cat.name} height="300"/>
          <h4>ID: {cat.id} Age: {cat.age} Sex: {cat.sex}  Weight: {cat.weight} lbs.</h4>
        </div>
      )}
    </div>
  );
}

export default Cat;
