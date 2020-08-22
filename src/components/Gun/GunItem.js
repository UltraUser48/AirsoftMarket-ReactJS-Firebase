import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "../../firebase";


function GunItem({ gun, index, showCount, history }) {

  const { firebase, user } = React.useContext(FirebaseContext)

  function handleVote() {
    if (!user) {
      history.push("/login");
      alert("You need to be logged in order to vote!")
    } else {
      const voteRef = firebase.db.collection("guns").doc(gun.id)
      voteRef.get().then(doc => {
        if (doc.exists) {
          const previousVotes = doc.data().votes
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          const voteCount = updatedVotes.length
          voteRef.update({ votes: updatedVotes, voteCount })
        }
      })

    }
  }

  function handleDeleteGun() {
    const gunRef = firebase.db.collection("guns").doc(gun.id)
    gunRef.delete().then(() => {
      alert("Ad has been deleted")
      history.push("/")
    }).catch(err => {
      console.error("Error deleting document:", err)
    })
  }


  const postedByAuthUser = user && user.uid === gun.postedBy.id


  return (
    <div>
      <div class="p-2">
        <div className="divstyle">
          <img src={gun.image} height="300px" weight="300px"></img>

          &nbsp;&nbsp;{gun.description}
        
          <h4>
            <br/>
            {gun.title}</h4>
          <div>Price: {gun.price}$</div>
          <div>Contact Information: {gun.phone}</div>
          <br />

          {!postedByAuthUser && (

            <div className="vote-button" onClick={handleVote}>▲ Upvote</div>

          )}

        </div>
        <div className="f6 lh-copy gray">
          {gun.voteCount} votes , Published by {gun.postedBy.name} on {new Date(gun.created).toLocaleDateString("en-US")}
          {"|"}&nbsp;
          <Link to={`/gun/${gun.id}`}>
            {gun.comments.length > 0
              ? `${gun.comments.length} comments`
              : "Details"}
          </Link>
          {postedByAuthUser && (
            <>
              {" | "}
              <span className="delete-button" onClick={handleDeleteGun}> Delete Advert
            </span>
            </>
          )}
        </div>
      </div>
    </div>


  )
}

export default withRouter(GunItem);
