import { useEffect, useState } from "react";

// components
import WorktoutDetails from '../components/WorkoutDetails'
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

  const [workouts, setWorkouts] = useState([])

  useEffect(()=>{
    const fetchWorkouts = async () =>{
      const res = await fetch("http://localhost:4000/api/workouts");
      if(!res.ok){
        throw new Error('Network response was not okay')
      }
      const json = await res.json()
      setWorkouts(json);
    }

    fetchWorkouts()
  },[])


  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home