import React from "react";
import FirebaseContext from '../../firebase/context'
import GunItem from "./GunItem"


function GunDetail(props) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const [gun, setGun] = React.useState(null)
  const [commentText, setCommentText] = React.useState("")
  const gunId = props.match.params.gunId
  const gunRef = firebase.db.collection('guns').doc(gunId)

  React.useEffect(() => {
    getGun()
  }, [])

  function getGun() {
    gunRef.get().then(doc => {
      setGun({ ...doc.data(), id: doc.id })
    })
  }

  function handleAddComment() {
    if (!user) {
      props.history.push('/login')
    } else {
      gunRef.get().then(doc => {
        if (doc.exists) {
          const previousComments = doc.data().comments
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText
          }
          const updatedComments = [...previousComments, comment]
          gunRef.update({ comments: updatedComments })
          setGun(prevState =>({
            ...prevState,
            comments: updatedComments
          }))
          setCommentText("")
        }
      })
    }
  }

  return !gun ? (
    <div>Loading...</div>
  ) : (
      <div>
        <GunItem showCount={false} gun={gun} />
        <textarea
          onChange={event => setCommentText(event.target.value)}
          value={commentText}
          rows='6'
          cols='60'
        />
        <div>
          <button className="button" onClick={handleAddComment}>
            Add Comment
  </button>
        </div>
        {gun.comments.map((comment, index) => (
          <div key={index}>
            <p className="comment-author">
        {comment.postedBy.name} | {new Date(comment.created).toLocaleDateString("en-US")}
    </p>
        <p>{comment.text}</p>
          </div>
        ))}
      </div>
    )

}

export default GunDetail;
