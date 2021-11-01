import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import ResetPassword from './Components/Auth/ResetPassword';
import ChangePassword from './Components/Auth/ChangePassword';
import ViewURLs from './Components/ViewURLs';
import CreateURL from './Components/CreateURL';
import Nav from './Components/Nav';
import About from './Components/About';
import ClickCount from './Components/ClickCount';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container-fluid">
        <Switch>
          <Route path="/home" component={ ViewURLs }></Route>
          <Route path="/about" component={ About }></Route>
          <Route path="/create" component={ CreateURL }></Route>
          <Route path="/clickCount/:urlId" component={ ClickCount }></Route>
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
