import './App.css'
import {useGlobalContext} from './context'

import Favorites from './components/Favorites'
import Search from './components/Search'
import Meals from './components/Meals'
import Modals from './components/Modals'

export default function App() {
  const {showModal, favorites} = useGlobalContext()
  return (
    <main>
       <Search />
      
      {favorites.length > 0 && <Favorites />}
     
      <Meals />

      {showModal && <Modals />}
      
    </main>
  )
}
