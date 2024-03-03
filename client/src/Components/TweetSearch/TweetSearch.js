import React from 'react'
import { Table, Form} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import style from "./TweetSearch.module.css"
import { useState } from 'react'


const TweetSearch = () => {
  const flaskServer = "http://127.0.0.1:8081"

  const [include, setInclude] = useState("")
  const [exclude, setExclude] = useState("")
  const [numTweets, setNumTweets] = useState(10)
  const handleInputChange = (e) => {
    const {name, value} = e.target
    switch(name){
      case "include":
        setInclude(value)
        break;
      case "exclude":
        setExclude(value)
        break;
      case "numTweets":
        setNumTweets(value)
        break;
    }
  }

  const [data, setData] = useState([])
  // Send to flask server
  const submitToPyServer = () => {
    fetch(flaskServer+'/searchTweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "include":include, 
        "exclude":exclude,
        "numTweets":numTweets}),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Returned", data)
        if (data["returned_result"] === "Too Many Requests"){
          alert("From Server: Too Many Requests")
        }else{
          setData(data["returned_result"])
        }
      })
      .catch(error => {
        console.error('Error sending data to server:', error);
      });
  }

  // const data = [
  //     {
  //         id: 1,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 2,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 3,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 4,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 5,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 6,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 7,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 8,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 9,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 10,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 11,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 12,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 13,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 14,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 15,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 16,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 17,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  //       {
  //         id: 18,
  //         content: 'Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.',
  //       },
  // ]
    
  return (
      <div>
          <div className={style.center} >
              <h1 className="text-center mt-3">Tweet Search</h1>
          </div>

          <div className={style.search}>
              <form className='d-flex gap-4'>
                <label>
                  Include(seperate by space):
                  <input style={{ display: 'block' }} className="input-large" type="text" placeholder="hello hi cat" name='include' value={include} onChange={handleInputChange} />
                </label>
                <label>
                  Exclude(seperate by space):
                  <input style={{ display: 'block' }} type="text" placeholder="hello hi cat" name='exclude' value={exclude} onChange={handleInputChange} />
                </label>
                <label>
                  Number of tweets(10-100):
                  <input style={{ display: 'block' }} type="text" placeholder="10" name='numTweets' value={numTweets} onChange={handleInputChange} />
                </label>


              </form>
              <button className="btn btn-primary m-2" onClick={submitToPyServer}>Search</button>
          </div>
          

          <div className={style.tweetTable}>
              <Table striped bordered hover size='sm'>
                  <thead>
                      <tr>
                          <th style = {{width: "150px", textAlign:"center"}}>relavance</th>
                          <th style = {{textAlign: "center"}}>text</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data.map((item) => (
                          <tr key={item["id"]}>
                              <td>
                                  Relevant<input className="m-1" type="radio" name={`select-${item["id"]}`}/><br />
                                  Irrelevant<input className="m-1" type="radio" name={`select-${item["id"]}`}/>
                              </td>
                              <td>{item["text"]}</td>
                          </tr>
                      ))}

                  </tbody>

              </Table>
          </div>

          <div className={style.buttonGroup}>
              <button className="btn btn-primary m-2" onClick={() => alert('Button 1 clicked')}>Save</button>
              <button className="btn btn-primary m-2" onClick={() => alert('Button 2 clicked')}>Download(as CSV)</button>
          </div>

      </div>
  )
}

export default TweetSearch