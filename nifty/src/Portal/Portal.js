import { useState, React } from 'react';
import TabSwitcher from '../Common//components/TabSwitcher/TabSwitcher';
import Register from './Authentication/Register';
import Login from './Authentication/Login';

const Portal = () => {
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
    <div className='portal-main'>

      <TabSwitcher
        tabs={tabs}
        tabFunctions={tabFunctions}
      />

      {flag
        ? <Register />
        : <div className='auth-login'>
          <Login />
        </div>
      }
    </div>
  )
}

export default Portal