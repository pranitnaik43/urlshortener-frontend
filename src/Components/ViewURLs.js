import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import withNav from "./HOC/withNav";
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const ViewURLs = () => {

  const [urls, setURLS] = useState([]);
  const history = useHistory();

  let accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    //ComponentDidMount
    if(!accessToken)
      history.push("/login");

    var config = {
      url: process.env.REACT_APP_SERVER_URL+"/app/urls",
      method: "GET",
      headers: { 
        "content-type": "application/json",
        'access-token': accessToken
      }
    };
    axios(config).then(response => {
      if(response.data.error) {
        // toast.error("Error in fetching data: "+ response.data.error.message, {autoClose: 5000});
        console.log(response.data.error.message);
      } else {
        let data = response.data;
        data.forEach(element => {
          element.shortURL = process.env.REACT_APP_SERVER_URL + "/re/" + element.shortURLcode;
        });
        // console.log(data);
        setURLS(data.reverse());
      }
    });
  }, [history, accessToken]);

  let goToCountPage = (id) => {
    history.push("/clickCount/"+id);
  }

  let handleDelete = (id) => {
    let config = {
      url: process.env.REACT_APP_SERVER_URL+"/app/url/"+id,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        'access-token': accessToken
      }
    }
    axios(config).then(response => {
      if(response.data.error) {
        toast.error("Error in deleting URL: "+ response.data.error.message, {autoClose: 5000});
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
          (urls.length > 0) ? (
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10">
                  {
                    urls.map(url => {
                      return (
                        <div className="row list-group-item d-flex" key={url._id}>
                          <div className="col-sm-9">
                            <div className="row text-truncate" title={url.longURL}>
                              { url.longURL }
                            </div>
                            <small className="row text-truncate text-warning" title={url.shortURL}>
                              { url.shortURL }
                            </small>
                          </div>
                          <div className="col-sm-3 btn-group">
                            {/* view Click Count button */}
                            <button type="button" className="btn btn-light py-1" title="View Count" onClick={ () => goToCountPage(url._id) }><i className="fa fa-bar-chart text-info"></i></button>
                            {/* delete URL button */}
                            <button type="button" className="btn btn-light py-1" title="Delete URL" onClick={ () => handleDelete(url._id) }><i className="fa fa-trash text-danger"></i></button>
                          </div>
                        </div>
                      )
                    })
                  }
              </div>
            </div>
          ) : (<p className="text-center">No URLs found</p>)
        }
      </div>
    </>
  )
}

export default withNav(ViewURLs);