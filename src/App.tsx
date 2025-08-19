import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaUserCircle } from "react-icons/fa";  
import { PiShoppingCartBold } from "react-icons/pi";
import Header from './components/Header';
import DonationCard from './components/DonationCard';
import { FaPlus } from "react-icons/fa6";
import AddButton from './components/AddButton';
import { IoIosSearch } from "react-icons/io";
import SearchInput from './components/SeachInput';
import FilterInput from './components/FilterInput';
import SupermarketService from './services/SupermarketService';
import { Supermarket } from './entities/Supermarket';
import MainPage from './pages/MainPage';
import MarketHome from './pages/MarketHome';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

declare let window:any

function App() {
  const [count, setCount] = useState(0)

  

  return (
<div>
<RouterProvider router={router}/>
 
</div> 
  
  )
}

export default App
