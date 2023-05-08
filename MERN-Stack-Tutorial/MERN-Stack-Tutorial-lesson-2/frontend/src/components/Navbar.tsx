import {Link} from 'react-router-dom'

const Navbar = () =>{
    return (
        <header className="container">
            <Link to="/">
                <h1>Saitama Workout</h1>
            </Link>
        </header>
    )
}

export default Navbar