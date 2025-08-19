import {createBrowserRouter} from 'react-router-dom'
import MainPage from './pages/MainPage'
import OrgHome from './pages/OrgHome'
import MarketHome from './pages/MarketHome'
import MarketMagazinesPage from './pages/MarketMagazinesPage'
import OrgsMagazinePage from './pages/OrgsMagazinePage'


// import PrivateChatScreen from './screens/PrivateChatScreen'
// import GroupChatScreen from './screens/GroupChatScreen'

//const messages = [
  //  { text: 'Olá! Como vai?', isUser: true },
    //{ text: 'Tudo bem, e você?', isUser: false },
    //{ text: 'Estou ótimo, obrigado! Gostaria de saber que horas vc sai para que possamos marcar algo para se encontrar', isUser: true },
  
  //];

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>
    }, 
    {
        path: '/org',
        element: <OrgHome/>
    },
    {
        path: '/market',
        element: <MarketHome/>
    },
    {
      path:'/marketmagazines',
      element: <MarketMagazinesPage/>
    },
    {
      path:'/orgmagazines',
      element: <OrgsMagazinePage/>
    }

  ])