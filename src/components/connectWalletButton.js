import React, { useEffect, useState } from "react";

function ConnectWalletButton(props) {
  useEffect(() => {
    checkBrowserSupport();
  });

  const [canUseMetamask, setCanUseMetamask] = useState(false);

  const updateMetamaskStatus = (val) => {
    setCanUseMetamask(val);
  };


  /* 
    Checks browser support for Metamask or other wallets, if so user can continue operatin,
    otherwise user will be alerted with warning.

    If user connected account before, automatically loads the previously connected account.

    Supported browsers

    [Chrome, Firefox, Edge]

  */
  const checkBrowserSupport =async () => {
    const ethereum = window.ethereum;
    if (ethereum) {
      // browser supports Metamask
      updateMetamaskStatus(true);

      const addresses = await ethereum.request({method: 'eth_accounts'});
      const address = addresses[0];
      props.onWalletConnected(address);

    } else {
      // browser does not support Metamask or not installed
      updateMetamaskStatus(false);
      alert("Please install metamask or use browser that supports metamask");
    }
  };

  /* 
    Request metamask connection on ButtonPress if available, 
    If connection is succeed updates the UI with currently connected address
  */
  const requestMetamaskConnection = async () => {
    const ethereum = window.ethereum;
    if (!ethereum) {
        alert("Your browser does not have metamask installed. Please install metamask!");
        return;
    }

    try {
        const addresses = await ethereum.request({method: 'eth_requestAccounts'});
        const address = addresses[0];
        props.onWalletConnected(address);


    } catch (e) {
        switch (e.code) {
            case 4001:
                alert("Connection rejected by you.")
                break;
            default:
        }

    }

    
  }

  return <div className="connectWalletButton" onClick={requestMetamaskConnection}>{canUseMetamask ? <p>Connect Wallet</p> : <p>Not Allowed</p>}</div>;
}

export default ConnectWalletButton;
