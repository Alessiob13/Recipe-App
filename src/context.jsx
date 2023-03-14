import React, {useState, useContext, useEffect } from "react"

/*useEffect Hook - lo usiamo perchè ci permette di controllar quando stiamo andando a fare la fetch dei dati --> useEffect è un hook che viene eseguito dopo ogni render, da default. 
Insieme gli passiamo la dipendenza [] che se lasciata vuota eseguirà quella funzione di callback quando il componente si carica
NOTA - essendo in context.jsx si caticherà solo una volta, perchè sta nel root 
Se [] comprende qualche valore, esso si caricherà ogni volta che il valore cambia */

//Context API - un modo per avere tutta la logica in un solo posto invece di passaere gli oggetti di una scena da un componente all'altro

const AppContext = React.createContext() //metodo che crea il file context. una volta invocato otteniamo indietro il provider e il consumer

import axios from 'axios' //axios è una libreria http per le richieste
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoritesFromLocalStorage = () =>{
  let favorites = localStorage.getItem('favorites');

  if(favorites){
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else{
    favorites=[]
  }
  return favorites
}

const AppProvider = ({ children }) => { //passiamo i dati da Provider

  const[loading, setLoading] = useState(false)
  const[meals, setMeals] = useState([])
  const[searchTerm, setSearchTerm] = useState('')

  const[showModal, setShowModal] = useState(false)
  const[selectedMeal, setSelectedMeal] = useState(null) //per mostare la modale
  const[favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
  

  const fetchMeals = async (url) => { //posso metterla sia fuori di useEffect che dentro perche sto usando async
    setLoading(true)
    
    try {
      const { data } = await axios(url)
      if(data.meals){
        setMeals(data.meals)
      }else{
        setMeals([])
      }
    } catch (error) {
      console.log(error.response)
    }
    setLoading(false)
  }

  const fetchRandomMeal = () =>{
    fetchMeals(randomMealUrl)
  }

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if(favoriteMeal){
      meal = favorites.find((meal)=> meal.idMeal === idMeal) //prende meal dall'array meals e confronta che gli id siano uguali
    }
    else{
      meal = meals.find((meal)=> meal.idMeal === idMeal) //prende meal dall'array meals e confronta che gli id siano uguali
    }
    setSelectedMeal(meal) //meal displays in the modal
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal)=>meal.idMeal === idMeal)
    if(alreadyFavorite) return
    const meal= meals.find((meal)=>meal.idMeal ===idMeal)
    const updatedFavorites = [...favorites, meal];
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const removeFromFavorites = (idMeal) =>{
    const updatedFavorites = favorites.filter((meal)=>meal.idMeal !== idMeal);
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  useEffect(() => {
    if(!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
    
  }, [searchTerm]) //[] = callback function
  
  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, closeModal, addToFavorites, removeFromFavorites, favorites }}>
      {children}
    </AppContext.Provider>
  )
}
//un modo per creare un custom Hook, dobbiamo iniziare la funzione         chiamandola con 'use'.
//la funzione che ritoriano da questo Hook è useContext, che viene         invocata e restituisce AppContext
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }



//come risultato possiamo importare il custom Hook useGlobalContext invece di importare di un qualsiasi altro componente e richiamarlo di nuovo
