import { useGlobalContext } from "../context"

const Modals = () => {
  const {selectedMeal, closeModal} = useGlobalContext() //selectedMeals è quello che abbiamo selezionato e vediamo nella modale
  const {strMealThumb:image, strMeal:title, strInstructions:text, strSource:source} = selectedMeal

  return <aside className="modal-overlay">
    <div className="modal-container">
      <img src={image} alt={title} className="img modal-img"/>
      <div className="modal-content">
        <h4>{title}</h4>
        <p>Cooking instructions</p>
        <p>{text}</p>
        <a href={source} target="_blank">Original Source</a>
        <button onClick={closeModal}  className="btn btn-hipster close-btn"> Close </button>
      </div>
    </div>
  </aside>
}
export default Modals