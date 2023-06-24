const Input = ({ placeholder, value, setValue }) => {
    const setMax = () => {
        setValue(1)
    }
  return (
    <div className="border p-2 rounded-lg border-black flex items-center">
      <input
        value={value ?? 0}
        type="number"
        className="outline-none border-none bg-transparent"
        placeholder={placeholder}
        onChange={(e) => setValue(e.currentTarget?.value)}
      />
      <span className="text-sky-600 font-semibold text-lg cursor-pointer" onClick={setMax}>Max</span>
    </div>
  );
};

export default Input;
