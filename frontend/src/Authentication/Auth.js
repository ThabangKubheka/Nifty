import {useState,React} from 'react';
import Name from '../Common/Name';
import TabSwitcher from '../Common/TabSwitcher';
import Login from '../Authentication/Login/Login';
import Register from './Register/Register';



function Auth() {
  const tabs = ['Login', 'Sign-up',];
  const [flag, setFlag] = useState(false);

  const handleTab1Click = () => {
    setFlag(false);
    
  };
  
  const handleTab2Click = () => {
    setFlag(true);
   
  };
  
  

  const tabFunctions = [handleTab1Click, handleTab2Click];
  return (
    <div>
      <Name/>
      <TabSwitcher tabs={tabs} tabFunctions={tabFunctions}/>
      
      {flag?<Register/>:<Login/>}
    </div>
  )
}

export default Auth