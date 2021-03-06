import React , {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link , Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import {HomeRoutes} from './routes.js';
import {browserHistory} from './historyobj.js';
class Login extends React.Component {

  constructor(props)
    {
      super(props);

      this.state = { username :""  , password :"" , a:0 };
      this.handleChange = this.handleChange.bind(this);
      //this.componentDidUpdate = this.componentDidUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handlePasswordchange = this.handlePasswordchange.bind(this);
    }
 
    handleSubmit(event)
    { 
      //var myForm =  document.getElementById('myForm')
      //var formData = new FormData(myForm);
      //var dataa = { 'username' : this.state.username }
      //formData.append('username',this.state.username)
      event.preventDefault();
      const obj = { username : this.state.username  , password : this.state.password};
      fetch('http://127.0.0.1:8000/stream/login/' , { method: 'POST' , body: JSON.stringify(obj) , headers: { 'Accept':'application/json' , 'Content-Type':'application/json'} })
      .then(res => res.json())
      .then( response =>  { localStorage.setItem('token', response.token);
                                
                            console.log(localStorage.getItem('token'));
                            console.log(response); 
                            this.props.history.push("/");
                            this.setState({a:1});

                           })
      .catch(error => console.error('Error:', error));
      



    }
    componentDidMount()
    {

      

    }

  handleChange(event)
    {
      this.setState({username: event.target.value });

    }
  handlePasswordchange(event)
    {
      this.setState({password: event.target.value });

    }
  render() {
    return (
      
        <div>
        
          
            <h1>Login </h1> <hr />
            <form method="POST"  onSubmit={this.handleSubmit} >
            Username<input type="text" name="username" value={this.state.username}  onChange={this.handleChange} />  <br />
            Password<input name="password"  type="password" value={this.state.password} onChange={this.handlePasswordchange}/> <hr/>
            <input type="submit" />
            </form>
            {(localStorage.getItem('token')) ? <HomeRoutes/> : null}
            </div>   
            
    );
  }


}





export default Login;