import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const App = () => {
  const [password, setPassword] = useState("");
  const [numberAllow, setNumberAllow] = useState(false);
  const [specialCharAllow, setSpecialCharAllow] = useState(false);
  const [passLength, setPassLength] = useState(8);
  const [showAlert, setShowAlert] = useState(false);

  const generateRandomPassword = (passLength) => {
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let specialChar = "!@#$%^&*()_+";

    if (numberAllow && specialCharAllow) {
      char += num + specialChar;
    } else if (numberAllow) {
      char += num;
    } else if (specialCharAllow) {
      char += specialChar;
    }

    let pass = "";
    for (let i = 0; i < passLength; i++) {
      const randomValue = Math.floor(Math.random() * char.length);
      pass += char.charAt(randomValue);
    }
    setPassword(pass);
  };

  const copyToClipBoard = useCallback(() => {
    navigator.clipboard.writeText(password).then(() => {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    });
  }, [password]);

  // Generate an initial password on component mount
  useEffect(() => {
    generateRandomPassword(passLength);
  }, [numberAllow, specialCharAllow, passLength]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3 text-2xl">
        Generate Password
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden ml-10 mb-10">
        <input
          type="text"
          value={password}
          readOnly
          className="rounded-lg mr-2 px-9 py-1"
        />
        <button
          onClick={copyToClipBoard}
          className="outline-none bg-blue-700 text-white px-4 py-1 shrink-0 rounded-lg font-bold"
        >
          Copy
        </button>
      </div>
      {showAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Your Password is Copied</Alert>
        </Stack>
      )}
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={16}
            value={passLength}
            className="cursor-pointer"
            onChange={(e) => {
              setPassLength(Number(e.target.value));
            }}
          />
          <label> Length: {passLength} </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllow}
            onChange={(e) => setNumberAllow(e.target.checked)}
          />
          <label htmlFor="numberInput"> Include Numbers </label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={specialCharAllow}
            onChange={(e) => setSpecialCharAllow(e.target.checked)}
          />
          <label htmlFor="characterInput"> Include Special Characters </label>
        </div>
      </div>
      <div>
        <button
          className="outline-none bg-blue-700 text-orange-500 font-bold px-4 py-0.1 shrink-0 rounded-lg"
          onClick={() => {
            generateRandomPassword(passLength);
          }}
        >
          Refresh Password
        </button>
      </div>
    </div>
  );
};

export default App;
