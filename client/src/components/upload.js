import { useState } from "react";
import axios from "axios";
import "./upload.css";
const Upload = ({account,contract}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleSubmit = async (event) =>{
    event.preventDefault();

    if(file){
      try{
        const formData = new FormData();
        formData.append("file",file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `f14b5aab01428042738b`,
            pinata_secret_api_key: `588efc36e2cf9224fd80ea3cd164b7da6c8ae25f2e9bbb43f1e529f8c3781bbe`,
            "Content-Type": "multipart/form-data",
          },
        });
        const fileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account,fileHash);
        alert('Image uploaded successfully');
        setFileName("No File Selected");
        setFile(null);
      }catch(error){
        alert(error);
      }
    }
  }

  const retrieveFile = (event) => {
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = ()=> {
      setFile(event.target.files[0]);
    }
    console.log(event.target.files[0].name);
    setFileName(event.target.files[0].name);
    event.preventDefault();
  }
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose File
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">File: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default Upload;