import React from "react";
import { FirebaseContext } from "../../firebase";
import { Button } from 'react-bootstrap';


function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext)
  const [resetPasswordEmail, setResetPasswordEmail] = React.useState('')
  const [isPasswordReset, setIsPasswordReset] = React.useState(false)
  const [passwordResetError, setPasswordResetError] = React.useState(null)

async function handleResetPassword() {
  try {
    await firebase.resetPassword(resetPasswordEmail)
    setIsPasswordReset(true)
    setPasswordResetError(null)
  } catch(err){
    console.error("Error sending email", err)
    setPasswordResetError(err.message)
    setIsPasswordReset(false)
  }
}


  return (
<div>
  <input
  type= "email"
  className="input"
  placeholder="Provide your account email address"
  onChange={event => setResetPasswordEmail(event.target.value)}
  />
  <div>
<Button variant="warning" onClick={handleResetPassword}
          >
            Reset My Password
          </Button>

  </div>
  <br/>

  <img src="/reset.jpg" alt="home" />

  {isPasswordReset && <p class="text-success">Email with Password Reset link has been Sent Successfully!</p>}
  {passwordResetError && <p className="error-text">{passwordResetError}</p>}
</div>


  )
}

export default ForgotPassword;
