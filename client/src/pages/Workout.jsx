import React, { useState } from 'react';
import useStore from '../store/useStore';

export default function Workout() {
  const { logWorkout } = useStore();
  const [form, setForm] = useState({ title: '', date: new Date().toLocaleDateString(), notes: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logWorkout(form);
    setForm({ title: '', date: new Date().toLocaleDateString(), notes: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Log Workout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Workout Title (e.g., Push Day)"
          value={form.title}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
        <textarea
          name="notes"
          placeholder="Notes (e.g., Bench 3x10 60kg...)"
          value={form.notes}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">Log Workout</button>
      </form>
    </div>
  );
}
