import React from "react";
import FirebaseContext  from "../../firebase/context";
import GunItem from "./GunItem"
import { Form, Container, Row, Col } from "react-bootstrap";

function SearchGuns() {
  const { firebase } = React.useContext(FirebaseContext)
  const [filteredGuns, setFilteredGuns] = React.useState([])
 const [guns, setGuns] = React.useState([])
  const [filter, setFilter] = React.useState("");


React.useEffect(() => {
getInitialGuns()
}, []) 


function getInitialGuns(){
  firebase.db.collection('guns').get().then(snapshot => {
 const guns = snapshot.docs.map(doc => {
   return {id: doc.id, ...doc.data() }
 })
 setGuns(guns)
  })
}

  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedGuns = guns.filter(gun => {
      return(
        gun.description.toLowerCase().includes(query) ||
        gun.title.toLowerCase().includes(query) ||
        gun.postedBy.name.toLowerCase().includes(query)
      )
    })
    setFilteredGuns(matchedGuns)
  }

  return (
    <div>

      
    <form onSubmit={handleSearch}>
    <h2 class="text-secondary">Search For Airsoft Equipment </h2>
    
         <Form.Control onChange={event => setFilter(event.target.value)}  />

         <button type="submit" class="btn btn-warning btn-lg">Search</button>
          </form>
  {filteredGuns.map((filteredGun, index) => (
<GunItem key={filteredGun.id} showCount={false} gun={filteredGun} index={index} />
    ))}


      </div>
  )
}

export default SearchGuns;
