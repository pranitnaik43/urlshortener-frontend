import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ResetPassword from './Components/ResetPassword';
import ChangePassword from './Components/ChangePassword';
import ViewURLs from './Components/ViewURLs';
import EditURL from './Components/EditURL';
import CreateURL from './Components/CreateURL';
import Nav from './Components/Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container-fluid">
        <Switch>
          <Route path="/home" component={ ViewURLs }></Route>
          <Route path="/create" component={ CreateURL }></Route>
          <Route path="/edit/:id" component={ EditURL }></Route>
          <Route path="/login" component={ Login }></Route>
          <Route path="/signup" component={ Register }></Route>
          <Route path="/resetPassword" component={ ResetPassword }></Route>
          <Route path="/changePassword" component={ ChangePassword }></Route>
          <Route path="/">
            <Redirect to="/home"></Redirect>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
