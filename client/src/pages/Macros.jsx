import React, { useState } from 'react';
import useStore from '../store/useStore';

export default function Macros() {
  const { macros, setMacros } = useStore();
  const [form, setForm] = useState(macros);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMacros(form.protein, form.carbs, form.fats, form.calories);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Set Daily Macros</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['protein', 'carbs', 'fats', 'calories'].map((macro) => (
          <div key={macro}>
            <label className="block font-medium capitalize">{macro}</label>
            <input
              type="number"
              name={macro}
              value={form[macro]}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
