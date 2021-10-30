import  { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const Home = ({history}) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken)
      history.push("/login");

      var config = {
        method: 'get',
        url: process.env.REACT_APP_SERVER_URL+"/user",
        headers: { 
          'Content-Type': 'application/json',
          'access-token': accessToken
        }
      };
      axios(config).then(response => {
        console.log(response);
        if(response.data.error){
          toast.error("Failed:"+ response.data.error.message, {autoClose: 5000});
          history.push("/login");
        } else{
          setUser(response.data);
        }
      }).catch(function (error) {
        toast.error("Failed:"+ error, {autoClose: 5000});
        history.push("/login");
        // console.log(error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    history.push("/login");
  }

  return ( 
    <>
    {console.log(user)}
      <h1 className="text-center text-primary mt-5">Welcome</h1>
      <hr/>
      <div className="d-flex flex-row-reverse">
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
      </div>
      {
        (user) ? (
          <h3 className="text-center">Hi {user.first_name + " " + user.last_name}</h3>
        ) : (<></>)
      }
      
    </>
  );
}
 
export default Home;