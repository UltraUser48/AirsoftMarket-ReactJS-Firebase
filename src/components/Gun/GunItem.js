import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "../../firebase";

function GunItem({ gun, index, showCount, history }) {

  const { firebase, user } = React.useContext(FirebaseContext)

  function handleVote() {
    if (!user) {
      history.push("/login")
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

function handleDeleteGun(){
  const gunRef = firebase.db.collection("guns").doc(gun.id)
  gunRef.delete().then(() => {
    alert("ad has been deleted")
    history.push("/")
  }).catch(err =>{
    console.error("Error deleting document:", err)
  })
}


  const postedByAuthUser = user && user.uid === gun.postedBy.id


  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button" onClick={handleVote}>▲</div>
      </div>
      <div className="ml1">
        <div>
          {gun.description} <span className="link">({gun.title})</span>
        </div>
        <div className="f6 lh-copy gray">
          {gun.voteCount} votes by {gun.postedBy.name} {new Date(gun.created).toLocaleDateString("en-US")}
          {"|"}
          <Link to={`/gun/${gun.id}`}>
            {gun.comments.length > 0
              ? `${gun.comments.length} comments`
              : "details"}
          </Link>
          {postedByAuthUser && (
            <>
            {" | "}
            <span className = "delete-button" onClick={handleDeleteGun}> Delete Advert
            </span>
            </>
          )}
        </div>
      </div>
    </div>


  )
}

export default withRouter(GunItem);
