import React from 'react'

const Participants = ({ 
    name,
    onRemove 
}: { 
    name: string, 
    onRemove: (name: string) => void 
}) => {
  return (
    <div className='flex mb-5 gap-5 justify-center items-center text-white p-2 rounded-xl'>
        <span>{name}</span>
        <button className='bg-red-500 rounded'
        onClick={() => onRemove(name)}>
            削除
        </button>
    </div>
  )
}

export default Participants