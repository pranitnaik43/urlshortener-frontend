import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ResetPassword from './Components/ResetPassword';
import ChangePassword from './Components/ChangePassword';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Switch>
          <Route path="/home" component={ Home }></Route>
          <Route path="/login" component={ Login }></Route>
          <Route path="/signup" component={ Register }></Route>
          <Route path="/resetPassword" component={ ResetPassword }></Route>
          <Route path="/changePassword" component={ ChangePassword }></Route>
          <Route path="/">
            <Redirect to="/login"></Redirect>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
