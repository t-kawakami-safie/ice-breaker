import React, { useState } from 'react'

const AddNames = ({ onAddName }: { onAddName: (name: string) => void }) => {
  const [inputValue, setInputValue] = useState("");
  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    onAddName(inputValue);
    setInputValue(""); // 入力欄をクリア
  };

  return (
    <div className='flex justify-center items-center mb-4 mt-5 '>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        }}
        placeholder="名前を入力"
        className="border p-2 text-black rounded-xl"
      />
      <button
        onClick={handleAdd}
        className="ml-2 p-2 bg-blue-500 text-white rounded-xl whitespace-nowrap"
      >
        追加
      </button>
    </div>
  );
}

export default AddNames