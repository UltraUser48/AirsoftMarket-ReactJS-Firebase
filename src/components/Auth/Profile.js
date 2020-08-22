import React from "react";
import { FirebaseContext } from "../../firebase";
import GunItem from "../Gun/GunItem";

function Profile() {

    const [guns, setGuns] = React.useState([])
    const { user, firebase } = React.useContext(FirebaseContext)


    function getGuns(){
        return firebase.db
        .collection('guns')
        .where("postedBy.id", "==", user.uid)
        .onSnapshot(handleSnapshot)
    }

    function ShowGuns(){
        getGuns();
    }

    function handleSnapshot(snapshot) {
        const guns = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })
        setGuns(guns)
    }

return(

          <div >Welcome to your Profile Page! {user.displayName}
          <p>Click on the button below to view all the Ads posted by you!</p>
          <button type="submit" class="btn btn-warning btn-lg" onClick={ShowGuns}>View My Ads</button>
          
    
          <div>
             {guns.map((gun, index) => (
                <GunItem
                key={gun.id}
                showCount={true}
                gun={gun}
                index={index} 
                />
                 )
            )
           }
      
            </div>
          
          </div>
)

}
export default Profile