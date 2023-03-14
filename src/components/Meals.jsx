
import { useGlobalContext } from '../context'
import { FaRegThumbsUp } from "react-icons/fa"

const Meals = () => {
  //dobbiamo invocare la funzione useContext e passare il parametro AppContext, cosi da passare i children come component
  const { meals, loading, selectMeal, addToFavorites} = useGlobalContext()

  if (loading) {
    return <section className='section'>
      <h4>Loading . . .</h4>
    </section>
  }

  if(meals.length < 1){
    return <section className="section">
      <h4>Non meals matched. Please try another meal.</h4>
    </section>
  }

  return <section className="section-center">
    {meals.map((singleMeal) => {
      const { idMeal, strMeal: title, strMealThumb: image } = singleMeal

      return <article key={idMeal} className="single-meal">
        <img src={image} className="img" onClick={()=>selectMeal(idMeal)} /> 
        <footer>
          <h5>{title}</h5>
          <button className="like-btn" onClick={()=> addToFavorites(idMeal)}><FaRegThumbsUp /></button>
        </footer>
      </article>
    })}
  </section>
}
export default Meals