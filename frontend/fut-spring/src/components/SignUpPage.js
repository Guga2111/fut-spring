import React, { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [data, setData] = useState(null);

  const handleRegisterRequest = async () => {
    const endpoint = "http://localhost:8080/user/register";
    const payload = {
      username: "gonezorra",
      email: "anacarladocumentos@gmail.com",
      password: "test123",
      stars: 5,
    };

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error in the request: " + error);
    }
  };

  return (
    <div>
      <button onClick={handleRegisterRequest}>Fazer Requisição POST</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
