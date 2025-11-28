import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const generatePassword = useCallback(
    () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if (numberAllowed) {
        str += "0123456789";
      }

      if (charAllowed) {
        str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
      }
      for (let i = 1; i < length; i++) {
        const char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }

      setPassword(pass);
    },
    [length, numberAllowed, charAllowed] //dependencies array
  );

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const copyPasswordToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
    } catch (e) {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = password;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        // ignore
      }
      document.body.removeChild(ta);
    }
    // show toast
    setCopied(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    // keep the input selected for visual feedback
    passwordRef.current?.select();
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-3xl shadow-md rounded-lg px-6 py-6 my-8 bg-gray-800 text-orange-400 relative">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6 items-center h-16">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 text-lg"
            placeholder="Password"
            readonly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-500 text-gray-800 px-5 py-4 hover:bg-blue-800 transition-colors text-white font-semibold"
          >
            Copy
          </button>
        </div>
        <div className="flex text-base gap-x-6 flex-row mt-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={40}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="number">Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label htmlFor="charInput">Include Characters</label>
          </div>
        </div>
        {copied && (
          <div
            aria-live="polite"
            className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow"
          >
            Password copied
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
