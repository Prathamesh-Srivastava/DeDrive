import { useEffect } from "react";
import "./modal.css";
const Modal = ({setModalOpen, contract}) => {
  const share = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  }
  useEffect(()=>{
    const accessList = async () =>{
      const addressList = await contract.viewAccess();
      let select = document.querySelector("#selectNumber");

      for(let i=0;i<addressList.length;i++){
        let opt = addressList[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    }

    contract && accessList();
  },[contract]);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button onClick={()=>setModalOpen(false)}>
              Cancel
            </button>
            <button onClick={share}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;