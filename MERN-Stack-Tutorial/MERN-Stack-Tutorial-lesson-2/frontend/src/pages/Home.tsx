import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

  const {workouts ,dispatch} = useWorkoutsContext()

  useEffect(()=>{
    const fetchWorkouts = async () =>{
      console.log("Fetching!!")
      const res = await fetch("http://localhost:4000/api/workouts");
      const json = await res.json()
      
      if(res.ok){
    
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
      if (!res.ok) {
        throw new Error("Network response was not okay");
      }
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