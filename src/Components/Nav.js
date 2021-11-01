import {NavLink, withRouter} from 'react-router-dom';

const Nav = ({ history }) => {

  const handleLogout = (e) => {
    localStorage.setItem("accessToken", "");
    history.push("/login");
  }

  return ( 
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink className="nav-link" to="/home">View</NavLink>
            <NavLink className="nav-link" to="/create">Create</NavLink>
            <NavLink className="nav-link" to="/about">About</NavLink>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-link" onClick={ (e) => { handleLogout(e) }}>Logout</li>
          </ul>
        </div>
      </nav>
    </> 
  );
}
 
export default withRouter(Nav);