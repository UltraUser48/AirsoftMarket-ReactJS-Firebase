import React from "react";
import useFormValidation from "..//Auth/useFormValidation"
import validateCreateGun from "../Auth/validateCreateGun";
import { FirebaseContext } from "../../firebase";
import { Form, Button } from "react-bootstrap";

const INITIAL_STATE = {
  description: "",
  title: "",
  image: "",
  price: "",
  phone: ""
}


function CreateGun(props) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateGun, handleCreateGun)

  function handleCreateGun() {
    if (!user) {
      props.history.push("/login")
    } else {
      const { title, description, image, price, phone } = values
      const newGun = {
        title,
        description,
        image,
        price,
        phone,
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
      alert("Ad has been created, Go to the Home Page to view your Ad!")

    }
  }


  return (

    <form onSubmit={handleSubmit} className="flex flex-column mt3">

      <Form.Group>
        <Form.Label>Enter the URL to the Image which will be displayed for your Ad.</Form.Label>
        <Form.Control
          onChange={handleChange}
          value={values.image}
          name="image"
          placeholder="..."
          autoComplete="off"
          type="text"
          className={errors.image && "error-input"}
        />
        {errors.image && <p className="error-text">{errors.image}</p>}

        <br />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter a name for your Advert</Form.Label>
        <Form.Control
          onChange={handleChange}
          value={values.title}
          name="title"
          placeholder="Airsoft Replica For Sale.."
          autoComplete="off"
          type="text"
          className={errors.title && "error-input"}
        />

{errors.title && <p className="error-text">{errors.title}</p>}
<br />
      </Form.Group>


      <Form.Group>

        <Form.Label>Enter the description for your Advert</Form.Label>
        <Form.Control
          onChange={handleChange}
          value={values.description}
          name="description"
          placeholder="A brief description"
          autoComplete="off"
          as="textarea" rows="3"
          className={errors.description && "error-input"}
        />
    
        {errors.description && <p className="error-text">{errors.description}</p>}
        <br />
      </Form.Group>


      <Form.Group>

<Form.Label>Enter the Price for which you are selling your Item!</Form.Label>
<Form.Control
  onChange={handleChange}
  value={values.price}
  name="price"
  placeholder="$$$"
  autoComplete="off"
  type="number"
  className={errors.price && "error-input"}
/>
{errors.price && <p className="error-text">{errors.price}</p>}
<br/>

<Form.Label>Enter Contact Phone Number</Form.Label>
<Form.Control
  onChange={handleChange}
  value={values.phone}
  name="phone"
  placeholder="+123..."
  autoComplete="off"
  type="number"
  className={errors.phone && "error-input"}
/>

{errors.phone && <p className="error-text">{errors.phone}</p>}
<br />
</Form.Group>


      <Button variant="btn btn-warning" type="submit">
        Submit
</Button>
    </form>
  )
}

export default CreateGun;
