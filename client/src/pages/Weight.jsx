import React, { useState } from 'react';
import useStore from '../store/useStore';

export default function Weight() {
  const { weightLog, logWeight } = useStore();
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    logWeight({ date: new Date().toLocaleDateString(), weight: Number(weight) });
    setWeight('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Weight Tracker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter today's weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Log Weight</button>
      </form>

      <h2 className="mt-6 font-semibold">History</h2>
      <ul className="list-disc pl-5">
        {weightLog.map((entry, idx) => (
          <li key={idx}>{entry.date} - {entry.weight} kg</li>
        ))}
      </ul>
    </div>
  );
}
