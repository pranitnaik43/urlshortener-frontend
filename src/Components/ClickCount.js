import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Bar} from 'react-chartjs-2';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const ClickCount = () => {
  const [urlData, setUrlData] = useState(null);
  const params = useParams();
  const urlId = params.urlId;
  let accessToken = localStorage.getItem("accessToken");
  var d = new Date();
  const currentYear = d.getFullYear();
  let years = [];
  for (let i = 0; i <= 10; i++) {
    years.push(currentYear - i);
  }
  const [year, setYear] = useState(currentYear);
  // setYear(currentYear);

  const state = {
    labels: ['January', 'February', 'March', 'April', 'May', "June", "July", "August", "September", "November", "December"],
    datasets: [
      {
        label: 'Number of Clicks',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  }

  useEffect(() => {
    var config = {
      url: process.env.REACT_APP_SERVER_URL+"/app/url/"+urlId,
      method: "GET",
      headers: { 
        "content-type": "application/json",
        'access-token': accessToken
      }
    };
    axios(config).then(response => {
      if(response.data.error) {
        toast.error("Error in fetching data: "+ response.data.error.message, {autoClose: 5000});
      } else {
        let data = response.data;
        data.shortURL = process.env.REACT_APP_SERVER_URL + "/re/" + data.shortURLcode;
        // console.log(data);
        setUrlData(data);
      }
    });
  }, [accessToken, urlId])

  const handleYearChange = (e) => {
    setYear(e.target.value);
  }

  return ( 
    <div className="container-fluid">
      {console.log(year)}
      {
        (urlData) ? (
          <div className="card shadow m-5">
            <div className="card-header">
              <h6><a href={urlData.longURL} className="text-decoration-none text-dark" target="_blank" rel="noopener noreferrer" >{urlData.longURL}</a></h6>
              <div><a href={urlData.shortURL} className="text-decoration-none text-warning" target="_blank" rel="noopener noreferrer">{urlData.shortURL}</a></div>
            </div>
            <div className="card-body">
            {
              (currentYear && years && year) ? (
                <div>
                <select name="year" value={year} onChange={ handleYearChange } className="custom-select">
                  {
                    years.map((element, i) => {
                      return <option value={ element } key={i}>{ element }</option>
                    })
                  }
                </select>
                <Bar
                  data={state}
                  options={{
                    title:{
                      display:true,
                      text:'Number of clicks per month',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                  }}
                />
                </div>
              ) : (<></>)
            }
            </div>
          </div>
        ) : (<></>)
      }
    </div>
  );
}
 
export default ClickCount;