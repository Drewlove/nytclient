import React, { Component } from 'react';
import Result from './Result'
import './App.css';
import { createBrotliCompress } from 'zlib';

class App extends Component {
  state = {
    results: [], 
    app: '', 
    sort: '', 
    genres: '', 
  }
  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {app, sort, genres} = this.state; 
    const baseUrl = "http://localhost:8000/playstore"; 
    let params = []; 

    if(this.state.app){
      params.push(`app=${app}`)
    }

    if(this.state.sort){
      params.push(`sort=${sort}`)
    }

    if(this.state.genres){
      params.push(`genres=${genres}`)
    }

    const query = params.join('&'); 
    const url = `${baseUrl}?${query}`
    console.log(url)


    fetch(url)
    .then(res => res.json())
    .then(results => this.setState({results}))
  }

  render(){
    return(
      <div>
        <form onSubmit={e=>this.handleSubmit(e)}>
          <label htmlFor='app'>App:</label>
          <input type='text' 
          name='app' 
          onChange={e=> this.handleChange(e)}/>

          <div>Sort by:
          <label htmlFor='app'> App</label>
          <input type='radio' 
          name='sort'
          value='App'
          onChange={e=> this.handleChange(e)}/>

          <label htmlFor='rating'>Rating</label>
          <input type='radio' 
          name='sort'
          value='Rating'
          onChange={e=> this.handleChange(e)}/>
          
          <label htmlFor='none'>None</label>
          <input type='radio' 
          name='sort'
          value=''
          onChange={e=> this.handleChange(e)}/>
          </div>
          <div>Genre 
          <select name='genres' onChange={e=> this.handleChange(e)}>
            <option value='Puzzle'>Puzzle</option>
            <option value='Strategy'>Strategy</option>
            <option value='Casual'>Casual</option>
            <option value='Arcade'>Arcade</option>
            <option value='Card'>Card</option>
            <option value='All'>All</option>
          </select>
          </div>

          <button type='submit'>Submit</button>
          
        </form>

        <p>Results</p>
        <ul>
          {this.state.results.map((resultObj, index) => {
           return <Result 
           key={index} 
           app={resultObj.App}
           rating={resultObj.Rating}
           genres={resultObj.Genres}
           />
          })}
        </ul>
      </div>
    )
  }
}

export default App;
