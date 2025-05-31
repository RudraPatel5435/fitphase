import React, { useState } from 'react';
import useStore from '../store/useStore';

export default function Phase() {
  const { setPhase, phase } = useStore();
  const [form, setForm] = useState({ type: phase.type, start: '', end: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPhase(form.type, form.start, form.end);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Set Training Phase</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Phase</label>
          <select name="type" value={form.type} onChange={handleChange} className="border rounded p-2 w-full">
            <option value="cutting">Cutting</option>
            <option value="bulking">Bulking</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Start Date</label>
          <input type="date" name="start" onChange={handleChange} className="border rounded p-2 w-full" />
        </div>
        <div>
          <label className="block font-medium">End Date</label>
          <input type="date" name="end" onChange={handleChange} className="border rounded p-2 w-full" />
        </div>
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Set Phase</button>
      </form>
    </div>
  );
}
