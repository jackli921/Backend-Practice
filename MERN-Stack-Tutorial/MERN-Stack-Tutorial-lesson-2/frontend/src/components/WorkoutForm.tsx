import {useState} from 'react'

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const workout = {title, load, reps}
        console.log(workout)
        const response = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added')
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
            type="text"
            value={title}
            onChange={(e)=> setTitle(e.target.value)} />

            <label>Load (in kg): </label>
            <input 
            type="number"
            value={load}
            onChange={(e)=> setLoad(e.target.value)} />
            
            <label>Reps:</label>
            <input 
            type="number"
            value={reps}
            onChange={(e)=> setReps(e.target.value)} />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>  }
        </form>
    )
}


export default WorkoutForm