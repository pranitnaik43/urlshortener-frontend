import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import withNav from "./HOC/withNav";
import {Bar} from 'react-chartjs-2';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const ClickCount = () => {
  const [urlData, setUrlData] = useState(null);
  const params = useParams();
  const urlId = params.urlId;
  let accessToken = localStorage.getItem("accessToken");

  //get current year
  var d = new Date();
  const currentYear = d.getFullYear();
  let years = [];
  for (let i = 0; i <= 10; i++) {
    years.push(currentYear - i);
  }
  const [year, setYear] = useState(currentYear);

  let months = ['January', 'February', 'March', 'April', 'May', "June", "July", "August", "September", "November", "December"]
  const [clicksPerMonth, setClicksPerMonthState] = useState([]);

  const chartState = {
    labels: months,
    datasets: [
      {
        label: 'Number of Clicks',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: clicksPerMonth
        // [65, 59, 80, 81, 56, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  }

  const setClicksPerMonthData = () => {
    for(let i=0; i<12; i++) {
      clicksPerMonth[i] = 0;
    }
    if(urlData) {
      if(urlData.clickedTime) {
        urlData.clickedTime.forEach((element) => {
          let date = new Date(element);
          if(date.getFullYear().toString() === year.toString()) {
            let month = date.getMonth();
            clicksPerMonth[month] += 1;
          }
        });
      }
    }
    setClicksPerMonthState([...clicksPerMonth]);
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

  useEffect(() => {
    //update data for charts when year is changed
    setClicksPerMonthData();
  }, [urlData, year]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleYearChange = (e) => {
    setYear(e.target.value);
    //clear chart data
  }

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to Clipboard", {autoClose: 5000});
  }

  return ( 
    <div className="container-fluid">
      {/* {console.log(year)} */}
      {
        (urlData) ? (
          <div className="card shadow m-5">
            <div className="card-header">
              <div className="row my-2">
                <div className="col-2"><strong>Long URL: </strong></div>
                <div className="col-10"><a href={urlData.longURL} className="text-decoration-none text-dark" target="_blank" rel="noopener noreferrer" >{urlData.longURL}</a></div>
              </div>
              <div className="row my-2">
                <div className="col-2 d-flex align-items-center"><strong>Short URL: </strong></div>
                <div className="col-10 d-flex align-items-center flex-row">
                  <div><a href={urlData.shortURL} className="text-decoration-none text-warning" target="_blank" rel="noopener noreferrer">{urlData.shortURL}</a></div>
                  <button type="button" className="btn btn-secondary mx-1 py-1" title="Copy to clipboard" onClick={ () => copyTextToClipboard(urlData.shortURL) }><i className="fa fa-clone"></i></button>
                </div>
              </div>
              {
                (urlData.clickedTime) ? (
                  <div className="row my-2">
                    <div className="col-2 d-flex align-items-center"><strong>Number of Clicks: </strong></div>
                    <div className="col-10 d-flex align-items-center"> { urlData.clickedTime.length } </div>
                  </div>
                ) : (<></>)
              }
            </div>
            <div className="card-body">
            {
              (currentYear && years && year) ? (
                <div>
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6">
                    <div className="d-flex flex-row">
                      <strong className="d-flex align-items-center mx-1">Year: </strong>
                      <select name="year" value={year} onChange={ handleYearChange } className="custom-select">
                        {
                          years.map((element, i) => {
                            return <option value={ element } key={i}>{ element }</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <Bar
                  data={chartState}
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
 
export default withNav(ClickCount);