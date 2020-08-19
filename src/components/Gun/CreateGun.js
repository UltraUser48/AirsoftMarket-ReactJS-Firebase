import React from "react";
import useFormValidation from "..//Auth/useFormValidation"
import validateCreateGun from "../Auth/validateCreateGun";
import { FirebaseContext } from "../../firebase";

const INITIAL_STATE = {
  description: "",
  title: ""
}


function CreateGun(props) {
const {firebase, user} = React.useContext(FirebaseContext)
const {handleSubmit, handleChange, values, errors } = useFormValidation (INITIAL_STATE, validateCreateGun, handleCreateGun)

function handleCreateGun() {
if (!user) {
  props.history.push("/login")
} else {
  const {title, description} = values
  const newGun ={
    title,
    description,
    postedBy: {
      id: user.uid,
      name: user.displayName
    },
    voteCount: 0,
    votes: [],
    comments: [],
    created: Date.now()
  };
  firebase.db.collection("guns").add(newGun);
  props.history.push("/")
  
}
}


  return (

    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
      onChange={handleChange}
      value={values.description}
        name="description"
        placeholder="A description for your gun"
        autoComplete="off"
        type="text"
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <br/>
      <input
       onChange={handleChange}
       value={values.title}
        name="title"
        placeholder="The Title of your Ad"
        autoComplete="off"
        type="text"
        className={errors.title && "error-input"}
      />
      {errors.title && <p className="error-text">{errors.title}</p>}
      <br/>
      <button className="button" type="submit">
        Submit
</button>
    </form>
  )
}

export default CreateGun;
