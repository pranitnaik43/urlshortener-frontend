import {NavLink, withRouter} from 'react-router-dom';

const Nav = () => {
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
        </div>
      </nav>
    </> 
  );
}
 
export default withRouter(Nav);