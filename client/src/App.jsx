import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Macros from "./pages/Macros";
import Weight from "./pages/Weight";
import Workout from "./pages/Workout";
import Phase from "./pages/Phase";
import Navbar from "./components/Navbar";
import LoginPage from"./pages/LoginPage";
import { getUserData } from "./api";
import useStore from "./store/useStore";

export default function App() {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const saved = localStorage.getItem('userID')
        if(saved){
            setUser({_id: saved})
        }
    }, [])

    useEffect(() => {
        if (user?._id) {
            useStore.getState().setUserId(user._id);

            getUserData(user._id).then((data) => {
                useStore.setState({
                    macros: data.macros || {},
                    weightLog: data.weightLog || [],
                    workouts: data.workouts || [],
                    phases: data.phases || [],
                });
            });
        }
    }, [user]);

    if (!user) return <LoginPage onLogin={setUser} />
        return (
            <Router>
                <Navbar />
                <div className="p-4">
                    <Routes>
                        <Route path="/" element={<Dashboard user={user} />} />
                        <Route path="/macros" element={<Macros />} />
                        <Route path="/weight" element={<Weight />} />
                        <Route path="/workout" element={<Workout />} />
                        <Route path="/phase" element={<Phase />} />
                    </Routes>
                </div>
            </Router>
        );
}
