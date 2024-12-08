import React, { useState, useEffect } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [numberAllow, setNumberAllow] = useState(false);
  const [specialCharAllow, setSpecialCharAllow] = useState(false);
  const [passLength, setPassLength] = useState(8);

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

  // Generate an initial password on component mount
  useEffect(() => {
    generateRandomPassword(passLength);
  }, [numberAllow, specialCharAllow, passLength]);

  return (
    <>
      <div>
        <h1>Generate Password</h1>
        <div>
          <div>
            <input type="text" value={password} readOnly />
          </div>
        </div>
        <br />
        <div>
          <input
            type="range"
            min={8}
            max={16}
            value={passLength}
            onChange={(e) => {
              setPassLength(Number(e.target.value));
            }}
          />
          <label> Length: {passLength} </label>
          <br />

          <input
            type="checkbox"
            checked={numberAllow}
            onChange={(e) => setNumberAllow(e.target.checked)}
          />
          <label> Include Numbers </label>
          <br />

          <input
            type="checkbox"
            checked={specialCharAllow}
            onChange={(e) => setSpecialCharAllow(e.target.checked)}
          />
          <label> Include Special Characters </label>
          <br />
        </div>
        <div>
          <button
            onClick={() => {
              generateRandomPassword(passLength);
            }}
          >
            Refresh Password
          </button>
        </div>
      </div>
    </>
  );
};

export default App;