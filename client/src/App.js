import './App.css';
import { useState, useEffect } from "react";
import Drive from './artifacts/contracts/Drive.sol/Drive.json'; 
import { ethers } from "ethers";
import Upload from './components/upload';
import Display from './components/display';
import Modal from './components/modal';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect (()=>{
    const provider = new ethers.BrowserProvider(window.ethereum);

    window.ethereum.on("accountsChanged", ()=>{
      window.location.reload();
    });

    const loadProvider = async () => {
      if(provider){
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address =  (await signer.getAddress()).toString();
        console.log(address);
        setAccount(address);

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress,Drive.abi,signer);
        console.log(contract);
        setContract(contract);
        setProvider(provider);

      }else{
        console.error("Install Metamask");
      }
    }

    loadProvider();

  },[]);

  return (
    <>
    {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
    <div className="App">
      <h1 style={{ color: "black" }}>DeDrive</h1>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>

      <p style={{ color: "white" }}>Account: {account}</p>
      <Upload account={account} contract={contract}></Upload>
      <Display account={account} contract={contract}></Display>
    </div>
    </>
  );
}

export default App;
