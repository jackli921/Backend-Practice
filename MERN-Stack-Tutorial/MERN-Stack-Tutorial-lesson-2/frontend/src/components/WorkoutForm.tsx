import {useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const {state, dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const workout = {title, load, reps}
        const response = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()
        if (response.ok) {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            console.log("new workout added");
            dispatch({ type: "CREATE_WORKOUT", payload: json });
        }
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)

        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added')
            dispatch({type: "CREATE_WORKOUTS" , payload: json})
        }
    }

    return (
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Load (in kg): </label>
        <input
          type="number"
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
          onChange={(e) => setLoad(e.target.value)}
        />

        <label>Reps:</label>
        <input
          type="number"
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
          onChange={(e) => setReps(e.target.value)}
        />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    );
}


export default WorkoutForm