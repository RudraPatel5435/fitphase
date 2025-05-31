import React, { useState } from 'react';
import useStore from '../store/useStore';

export default function Dashboard() {
  const {
    phase = { type: 'N/A' },
    macros = { protein: 0, carbs: 0, fats: 0, calories: 0 },
    weightLog = [],
    workouts = [],
  } = useStore();

  const latestWeight = weightLog[weightLog.length - 1]?.weight || 'N/A';

  const [intake, setIntake] = useState({ protein: 0, carbs: 0, fats: 0, calories: 0 });

  const handleChange = (e) => {
    setIntake({ ...intake, [e.target.name]: Number(e.target.value) });
  };

  const remaining = {
    protein: macros.protein - intake.protein,
    carbs: macros.carbs - intake.carbs,
    fats: macros.fats - intake.fats,
    calories: macros.calories - intake.calories,
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg">Current Phase</h2>
          <p>{phase.type.toUpperCase()}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg">Macros</h2>
          <p>Protein: {macros.protein}g</p>
          <p>Carbs: {macros.carbs}g</p>
          <p>Fats: {macros.fats}g</p>
          <p>Calories: {macros.calories}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-lg">Latest Weight</h2>
          <p>{latestWeight} kg</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold text-lg mb-2">Recent Workouts</h2>
        <ul className="list-disc pl-5">
          {workouts.slice(-3).map((workout, index) => (
            <li key={index}>{workout.date} - {workout.title}</li>
          ))}
          {workouts.length === 0 && <li>No workouts logged yet.</li>}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-2">Track Today's Intake</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['protein', 'carbs', 'fats', 'calories'].map((macro) => (
            <div key={macro}>
              <label className="block font-medium capitalize">{macro}</label>
              <input
                type="number"
                name={macro}
                value={intake[macro]}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
              <p className="text-sm text-gray-500">
                Remaining: {remaining[macro] < 0 ? 0 : remaining[macro]} {macro === 'calories' ? '' : 'g'}
              </p>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
