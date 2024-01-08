import { useState } from "react";
import "./display.css";
const Display = ({contract, account}) => {

  const [data,setData] = useState(null);

  const getData = async () =>{
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
      if(otherAddress){
        dataArray = await contract.display(otherAddress);
      }else{
        dataArray = await contract.display(account);
      }
      console.log(dataArray);
    } catch (error) {
      alert(error);
    }

    if(dataArray.length!=0){
      const images = dataArray.map((item,i)=>{
        return(
          <a href={item} key={`a-${i}`} target="blank" rel="noopener noreferrer">
            <img  key={`img-${i}`}
                  src={item}
                  alt="new"
                  className="image-list"
            />
          </a>
        )
      })
      setData(images);
    }else{
      alert("No Images to Display");
    }
  }
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};
export default Display;