import { useEffect, useState } from 'react'
import './styles.css'
import { FaUserCircle } from "react-icons/fa";  
import { PiShoppingCartBold } from "react-icons/pi";
import Header from '../../components/Header';
import DonationCard from '../../components/DonationCard';
import { FaPlus } from "react-icons/fa6";
import AddButton from '../../components/AddButton';
import { IoIosSearch } from "react-icons/io";
import SearchInput from '../../components/SeachInput';
import FilterInput from '../../components/FilterInput';
import SupermarketService from '../../services/SupermarketService';
import { Supermarket } from '../../entities/Supermarket';
import LoginService from '../../services/LoginService';
import { useNavigate } from "react-router-dom";
import { Organization } from '../../entities/Organization';
import OrganizationService from '../../services/OrganizationService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Tab } from '@mui/material';



declare let window:any

const loginUser = new LoginService()
const market = new SupermarketService()
const org = new OrganizationService()
export var loggeduser:any

export default function MainPage() {

  const [userName, setUserName] = useState('');
  const [cnpj, setCnpj] = useState(0);
  const [localizacao, setloca] = useState('');
  const [userType, setUserType] = useState('Supermarket'); 

  const handleUserTypeChange = (type:string) => {
    setUserType(type);
  };

  useEffect(() => {
    // Limpar as informações do usuário ao montar o componente
    sessionStorage.removeItem("user_id");
    loggeduser = null;
  }, []);

  const navigate = useNavigate()

  const signUp = async () =>{
    
    try {
			loggeduser = await loginUser.login(window);

			if (loggeduser !== undefined) {
				sessionStorage.setItem("user_id", loggeduser);
        
        console.log(loggeduser)
        let userExistMarket = false;
        let userExistOrg = false;

        if(userType === "Supermarket"){
          console.log("Chegou aqui.")

          if (!userExistMarket && !userExistOrg){
             console.log("Chegou aqui. mas ainda nao criou")
             await createUserMarket()
             console.log("Chamou a criação aqui.")
            toast.success("Usuário criado com sucesso!")
            navigate("/market")
          } else {
            toast.error("Usuário já cadastrado.");
            return;
          }
        } else if (userType === "Organization"){
            await createUserOrg()
            navigate("/org")
  
        }
       
				
			}      

		} catch (error) {
      toast.error("Erro ao conectar ao Metamask.");
			console.log("Error connecting to Metamask:", error);
		}
    
  }

  const conectWallet = async () => {

    try{
      loggeduser = await loginUser.login(window);
      if (loggeduser !== undefined) {
				sessionStorage.setItem("user_id", loggeduser);

        let userExist = false;
    
        if(userType === 'Supermarket'){
          userExist = await  market.getMarket(loggeduser, window);
          if (userExist){
            navigate("/market")
          } else {
            console.log("User supermarket not registered");
            toast.error("Usuário não cadastrado.")
          }
        } else if (userType === "Organization"){
          userExist = await org.getOrg(loggeduser,window);
          if (userExist){
            navigate("/org")
          } else {
            console.log("User Organization not registered")
            toast.error("Usuário não cadastrado.")
          }
        }
				
			}

    }catch(error){
      toast.error("Erro ao conectar ao Metamask.");
			console.log("Error connecting to Metamask:", error);
    }
  }

  const disconnectWallet = () => {
    sessionStorage.removeItem("user_id");
    loggeduser = null;
    window.location.reload(); // Refresh the page to reset the state
  };

  async function createUserMarket(){
    const userMarket: Supermarket = {
      'nomeFantasia': userName,
      'CNPJ': cnpj,
      'Localizacao':localizacao

    }
    console.log(userMarket)

    await market.create(userMarket,window)
  }

  async function createUserOrg(){
    const userOrg: Organization = {
      'nomeFantasia': userName,
      'CNPJ': cnpj
    }

    await org.create(userOrg, window)
  }

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
<div className='custom'>
<ToastContainer/>
  <div className='slogan-container'>
    <h1 className='slogan-text'>
      Transforme solidariedade em ação: doe com segurança e transparência com AlimenTI
    </h1>
  </div>

   <div className='signup-container'>
    <div className='signup-card'>
      <div className='title-container'>
      <h2 className='signup-title'>Cadastre-se</h2>
      </div>
      <div className='selection-container'>
        <button className={`user-select-button ${userType === 'Organization' ? 'selected':''}`}
        onClick={() => handleUserTypeChange('Organization')}
        >Organização</button>
        <button className={`user-select-button ${userType === 'Supermarket' ? 'selected':''}`}
        onClick={() => handleUserTypeChange('Supermarket')}
        >Supermercado</button>
      </div>
      <TransitionGroup className='input-container'>
            <CSSTransition key="userName" timeout={300} classNames="fade">
              <input 
                className='input-style' 
                placeholder='Nome Fantasia' 
                onChange={(e) => setUserName(e.target.value)} 
              />
            </CSSTransition>
            <CSSTransition key="cnpj" timeout={300} classNames="fade">
              <input 
                className='input-style' 
                placeholder='CNPJ' 
                type='number' 
                onChange={(e) => setCnpj(Number(e.target.value))} 
              />
            </CSSTransition>
            {userType === 'Supermarket' && (
              <CSSTransition key="localizacao" timeout={300} classNames="fade">
                <input 
                  className='input-style' 
                  placeholder='Localização' 
                  onChange={(e) => setloca(e.target.value)} 
                />
              </CSSTransition>
            )}
          </TransitionGroup>
      <div className='footer-container'>
          <button className='create-button' onClick={signUp}>Cadastrar</button>
          <p className='login-text' onClick={conectWallet}>Faça login com <strong>Metamask</strong></p>
      </div>

      
    </div>
   </div>
  


</div>
   




    
  
  )
}
