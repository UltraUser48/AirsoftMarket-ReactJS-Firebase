import React from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase"
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';


const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}


function Login(props) {
  const { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)
  const [login, setLogin] = React.useState(true)
  const [firebaseError, setFireBaseError] = React.useState(null)


  async function authenticateUser() {
    const { name, email, password } = values
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password)
      props.history.push('/')
    } catch (err) {
      console.error('Authentication Error', err)
      setFireBaseError(err.message)
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            onChange={handleChange}
            value={values.name}
            name="name"
            type="text" placeholder="Your Name" autoComplete="off" />
        )}

        <br />

        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name="email"
          type="email"
          className={errors.email && 'error-input'}
          placeholder="Your email"
          autoComplete="off" />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <br />

        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          name="password"
          type="password"
          className={errors.password && 'error-input'}
          placeholder="Enter Password"
          autoComplete="off" />

        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}

        <div>
          <Button type="submit" varian="outline-primary" disabled={isSubmitting}
          >
            Submit
          </Button>
          <br/>
          <Button
            variant="outline-secondary"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "need to create an account" : "Already have an account ?"}
          </Button>{' '}
        </div>
      </form>
      <br/>
      <img src="/home.jpg" alt="home" />

      <br/>
      <Button
      variant="link"
      >
        <Link to="/forgot"> Forgot you password ?</Link>
      </Button>{' '}
    </div>
  )
}

export default Login;
