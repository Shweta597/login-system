import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const token = localStorage.getItem("token"); // ✅ stored during login

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // ✅ Send request with token in Authorization header
      const response = await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming backend returns uploaded file URL
      setUploadedImg(response.data.fileUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Photo</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedImg && (
        <div className="uploaded-preview">
          <h3>Uploaded Image:</h3>
          <img src={uploadedImg} alt="Uploaded Preview" width="300" />
        </div>
      )}
    </div>
  );
}
