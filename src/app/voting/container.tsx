'use client';

import React from 'react';

export default function Container({ vote }) {
  const colors = ['blue', 'green', 'red', 'orange', 'purple', 'yellow'];

  const handleVote = async (color) => {
    await vote(color);
    alert(`Voted ${color}!`)
  }

  return (
    <div className="flex flex-col items-center gap-4">
    {colors.map((color) => (
      <button
        type="button"
        key={color}
        className="bg-slate-300 text-gray-800 p-2 rounded-md"
        onClick={() => handleVote(color)}
      >
        Vote <span style={{ color }}>{color}</span>
      </button>
    ))}
    </div>
  );
}
