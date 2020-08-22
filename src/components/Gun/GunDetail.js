import React from "react";
import FirebaseContext from '../../firebase/context'
import GunItem from "./GunItem"
import { Button, Form } from 'react-bootstrap';

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
      alert("You need to be logged in order to Add comments!")
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
  <Button variant="warning" onClick={handleAddComment} >Add a Comment</Button>
  <br/>
        </div>
        <br/>
        {gun.comments.map((comment, index) => (
          <div class="p-3 mb-2 bg-info text-white" key={index}>
            <p className="comment-author">
        Posted by {comment.postedBy.name} on {new Date(comment.created).toLocaleDateString("en-US")}
    </p>
        <p>{comment.text}</p>
          </div>
        ))}
      </div>
    )

}

export default GunDetail;
