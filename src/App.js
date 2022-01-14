import ConnectWalletButton from './components/connectWalletButton';
import './App.css';
import { useState } from 'react';

function App() {

  const [address, setAddress] = useState("");

  /*
    Callback for editing the displayed address according to the incoming address result
    Called inside [ConnectWalletButton] when address connect succeed
  */
  const onWalletConnect = (address) => {
    console.log('onWalletConnect' + address);
    setAddress(address);
  }


  return (
    <div className="App">
      <ConnectWalletButton onWalletConnected={onWalletConnect} />
      <div className="userAccountID">
        {
          address !== "" ? <div>
            <p>You are connected with address: </p>
            <p>{address}</p>
          </div> : "-"
        }
      </div>
    </div>
  );
}

export default App;
