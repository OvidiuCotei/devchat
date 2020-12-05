import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import firebase from '../../firebase';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  displayErrors = errors => errors.map((error, i) => <p hey={i}>{error.message}</p>);

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.isFormValid(this.state))
    {
      this.setState({
        errors: [],
        loading: true
      });

      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(signedInUser => {
        console.log(signedInUser);
      }).catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        });
      })
    }
  }

  isFormValid = ({email, password}) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : '';
  }

  render() {
    const { email, password, errors, loading } = this.state;
    return(
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" /> Login to DevChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid 
                name="email" 
                icon="mail" 
                iconPosition="left" 
                placeholder="Email" 
                type="email" 
                value={email}
                className={this.handleInputError(errors, 'email')} 
                onChange={this.handleChange} 
              />
              <Form.Input 
                fluid name="password" 
                icon="lock" 
                iconPosition="left"
                placeholder="Password" 
                type="password" 
                value={password} 
                className={this.handleInputError(errors, 'password')} 
                onChange={this.handleChange} 
              />
              <Button color="violet" fluid size="large" className={loading ? 'loading' : ''} disabled={loading}>Submit</Button>
            </Segment>
          </Form>
          {
            this.state && Array.isArray(errors) && errors.length > 0 &&
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          }
          <Message>Don`t have an account? <Link to="/register">Register</Link></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;