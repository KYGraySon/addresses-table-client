import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [inputValue, setInputValue] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    navigate(`/address/${inputValue}`);
    setInputValue('')
    window.location.reload()
  };

  useEffect(() => {
    const input = document.getElementById("search-input");
    const inputContainer = document.getElementById("search-form");

    input.addEventListener("focus", () => {
      inputContainer.classList.add("border-blue-300");
    });

    input.addEventListener("blur", () => {
      inputContainer.classList.remove("border-blue-300");
    });
     return () => {
        input.removeEventListener("focus", () => {})
        input.removeEventListener("blur", () => {})
     }
  }, []);
  return (
    <form
      id="search-form"
      onSubmit={handleSubmit}
      className="border border-black mx-auto w-60 lg:w-80 transition delay-75 rounded-lg p-2 mt-8"
    >
      <input
        onChange={(e) => setInputValue(e.currentTarget?.value)}
        value={inputValue}
        id="search-input"
        type="text"
        className="outline-none bg-none border-none w-full rounded-md text-center"
        placeholder="Enter Address"
      />
      <button className="hidden" type="submit" />
    </form>
  );
};

export default SearchBox;
