import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const ViewURLs = () => {

  const [urls, setURLS] = useState(null);
  const history = useHistory();

  useEffect(() => {
    //ComponentDidMount
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken)
      history.push("/login");

    var config = {
      url: process.env.REACT_APP_SERVER_URL+"/app/urls",
      method: "GET",
      headers: { 
        "content-type": "application/json",
        'access-token': accessToken
      }
    }
    axios(config).then(response => {
      if(response.data.error) {
        toast.error("Error in fetching data: "+ response.data.error.message, {autoClose: 5000});
      } else {
        let data = response.data;
        console.log(data);
        setURLS(data.reverse());
      }
    })
  }, [history]);

  let goToCountPage = (id) => {
    history.push("/count/"+id);
  }

  let goToEditPage = (id) => {
    history.push("/edit/"+id);
  }

  let handleDelete = (id) => {
    let config = {
      url: process.env.REACT_APP_SERVER_URL+"/users/"+id,
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }
    axios(config).then(response => {
      if(response.data.error) {
        console.log(response.data.error);
      }
      else if(response.data.success) {
        console.log(response.data.success);
      }
    });
    let newURLS = urls.filter(user => (user._id !== id));
    setURLS([...newURLS]);
  }

  return (
    <>
      <div className="m-5">
        <h1 className="text-center text-primary">View URLs</h1>
        <hr/>
        {
          (urls) ? (
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10">
                  {
                    urls.map(url => {
                      return (
                        <div className="row list-group-item d-flex" key={url._id}>
                          <div className="col-sm-8">
                            <div className="row text-truncate">
                              { url.longURL }
                            </div>
                            <small className="row text-truncate text-warning">
                              { url.shortURL }
                            </small>
                          </div>
                          <div className="col-sm-4 btn-group">
                            {/* view Click Count button */}
                            <button type="button" className="btn btn-light py-1" title="View Count" onClick={ () => goToCountPage(url._id) }><i className="fa fa-bar-chart text-info"></i></button>
                            {/* edit Long URL button */}
                            <button type="button" className="btn btn-light py-1" title="Edit Long URL" onClick={ () => goToEditPage(url._id) }><i className="fa fa-pencil"></i></button>
                            {/* delete URL button */}
                            <button type="button" className="btn btn-light py-1" title="Delete URL" onClick={ () => handleDelete(url._id) }><i className="fa fa-trash text-danger"></i></button>
                          </div>
                        </div>
                      )
                    })
                  }
              </div>
            </div>
          ) : (<p>No URLs found</p>)
        }
      </div>
    </>
  )
}

export default ViewURLs