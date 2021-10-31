import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const UserForm = (props) => {

  const userTemplate = {
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: ''
  }

  const [user, setUser] = useState({ ...userTemplate });
  const [errors, setErrors] = useState({ ...userTemplate });

  const history = useHistory();
  var { submitMethod, targetURL, nextURL, userData } = props;

  useEffect(() => {
    if(userData) {
      setUser(userData);
    }
  }, [userData]);

  let capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  let validate = () => {
    var flag = true;
    Object.keys(user).forEach(key => {
      if(user[key]==='' || !user[key]) {
        flag = flag && false;
      }
    });

    if(user.age<0 || user.age>250) {
      flag = flag && false;
    }
    return flag;
  }

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    if(!value) {
      setErrors({...errors, [name]: capitalizeFirstLetter(name)+" cannot be empty"});
    }
    else {
      setErrors({...errors, [name]: ""});
    }
    if(name==="age") {
      if(value<1 || value>150) {
        setErrors({...errors, [name]: "Invalid value"});
      }
      else {
        setErrors({...errors, [name]: ""});
      }
    }

    user[name] = value;
    setUser({ ...user });
  }

  let handleSubmit = (e) => {
    e.preventDefault();

    let config = {
      url: targetURL,
      method: submitMethod,
      headers: {
        "content-type": "application/json"
      },
      data: user
    }
    axios(config).then(response => {
      console.log(nextURL)
      if(response.data.error) {
        console.log(response.data.error);
      }
      else if(response.data.success) {
        console.log(response.data.success);
        history.push(nextURL);
      }
    });
  }

  return ( 
    <>
      {
        (user) ? (
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
              <div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Name</label>
                  <div className="col-sm-10">
                    <input name="name" type="text" className="form-control" value={ user.name } onChange={ (e) => handleChange(e) }/>
                    <span className="text-danger">{errors.name}</span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input name="email" type="email" className="form-control" value={ user.email } onChange={ (e) => handleChange(e) }/>
                    <span className="text-danger">{errors.email}</span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Phone</label>
                  <div className="col-sm-10">
                    <input name="phone" type="text" className="form-control" value={ user.phone } onChange={ (e) => handleChange(e) }/>
                    <span className="text-danger">{errors.phone}</span>
                  </div>
                </div>
                
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Age</label>
                  <div className="col-sm-10">
                    <input name="age" type="number" className="form-control" value={ user.age } onChange={ (e) => handleChange(e) }/>
                    <span className="text-danger">{errors.age}</span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Gender</label>
                  <div className="col-sm-10 mt-2">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="gender" value="male" checked={ user.gender === "male" } onChange={ (e) => handleChange(e) }/>
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="gender" value="female" checked={ user.gender === "female" } onChange={ (e) => handleChange(e) }/>
                      <label className="form-check-label">Female</label>
                    </div>
                    <span className="text-danger">{errors.gender}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary" onClick={(e) => { handleSubmit(e) }} disabled={!validate()}>Save</button>
                </div>
              </div>
            </div>
          </div>
        ) : (<p> No user found </p>)
      }
    </>
  );
}
 
export default UserForm;