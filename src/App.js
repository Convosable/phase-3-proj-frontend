import './App.css';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Shelters from './Shelters';
import Homepage from './Homepage';
import DogDetails from './DogDetails';
import ShelterDetails from './ShelterDetails';
import CatDetails from './CatDetails';
import NewShelterForm from './NewShelterForm';
import { Route, Routes } from "react-router-dom"

function App() {

  const [sheltersList, setSheltersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9292/shelters")
      .then((r) => r.json())
      .then(shelters => {
        setSheltersList(shelters)
        setIsLoading(false)
      })
  }, []);


  if (isLoading) return <h1>Loading...</h1>

  function handleNewShelterSubmit(newShelter) {
    setSheltersList([...sheltersList, newShelter])
  }

  function handleShelterDelete(id) {
    console.log(id)
    const updatedShelters = sheltersList.filter(s => s.id !== parseInt(id))
    setSheltersList(updatedShelters)
  }

  console.log(sheltersList)

  function handleCatDelete(cat) {
    const updatedShelters = sheltersList.map(shelter => {
      if (shelter.id === cat.shelter_id) {
        const updatedCats = shelter.cats.filter(c => c.id !== cat.id);
        return {...shelter, cats: updatedCats}
      }
      return shelter
    })
    setSheltersList(updatedShelters)
  }

  function handleDogDelete(dog) {
    const updatedShelters = sheltersList.map(shelter => {
      if(shelter.id === dog.shelter_id) {
        const updatedDogs = shelter.dogs.filter(d => d.id !== dog.id);
        return {...shelter, dogs: updatedDogs}
      }
      return shelter
    })
    setSheltersList(updatedShelters)
  }

  function handleDogUpdate(dog) {
    const updatedShelters = sheltersList.map(shelter => {
      if (shelter.id === dog.shelter_id) {
        const updatedDogs = shelter.dogs.map(d => {
          if(d.id === dog.id) {
            return dog
          }
          return d
        })
        return {...shelter, dogs: updatedDogs}
      }
      return shelter
    })
    setSheltersList(updatedShelters)
  }

  function handleCatUpdate(cat) {
    const updatedShelters = sheltersList.map(shelter => {
      if (shelter.id === cat.shelter_id) {
        const updatedCats = shelter.cats.map(c => {
          if(c.id === cat.id) {
            return cat
          }
          return c
        })
        return {...shelter, cats: updatedCats}
      }
      return shelter
    })
    setSheltersList(updatedShelters)
  }


  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/dogs/:id" element={<DogDetails handleDogDelete = {handleDogDelete} handleDogUpdate = {handleDogUpdate}/>} />
        <Route exact path="/cats/:id" element={<CatDetails handleCatDelete = {handleCatDelete} handleCatUpdate = {handleCatUpdate}/>} />
        <Route exact path="/shelters" element={<Shelters sheltersList={sheltersList} />} />
        <Route exact path="/shelters/:id" element={<ShelterDetails sheltersList={sheltersList} handleShelterDelete = {handleShelterDelete}/>} />
        <Route exact path="/shelters/new" element={<NewShelterForm handleNewShelterSubmit = {handleNewShelterSubmit}/>} />
      </Routes>
    </div>
  );
}

export default App;

//new-shleter-form is not restful at all!! change to shelters/id/new