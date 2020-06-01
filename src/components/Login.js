import React from 'react';
import login  from '../util';
import { withRouter } from "react-router-dom";
import '../styles/login.css'

class Login extends React.Component{
      constructor() {
        super();
        this.state = { name: '', password: '', errorMessage: '', fullName: '' };
      }
      
      handleInputChange = (event) => 
                this.setState({[event.target.name]: event.target.value})
      submitLogin = async (event) => {
        this.setState({
          errorMessage: '',
          fullName: '',
        })
        event.preventDefault();
        const { history } = this.props;
        const loggedIn = await login(this.state).catch(err => this.setState({
          errorMessage: err,
        }))
        if(this.state.errorMessage === '') {
          this.setState({
            fullName: loggedIn.fullName,
          })
          history.push({
            pathname: '/product',
            search: '',
            state: { details: this.state.fullName}
          })
        }
      }
      render() {
        
         return (
          <div className="main">
          <hr/>
            <div className="log">
              <div className="log1">
                <div className="loghead"><h1 style={{textAlign: "center"}}>Log in </h1></div>
                <div className="logbody">
                  <form onSubmit={this.submitLogin}>
                    { this.state.errorMessage && <h3>{this.state.errorMessage}</h3> }
                    <div className="select">
                      <label > Name:</label>
                      <input type="text" className="form" 
                          name="name" onChange={this.handleInputChange}/>
                    </div>
                    <div className="select">
                      <label>Password:</label>
                      <input type="password" className="form" 
                          name="password" onChange={this.handleInputChange}/>
                    </div>
                    <button type="submit" className="button">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

export default withRouter(Login);