import React from "react";
import FirebaseContext from "../../firebase/context"
import GunItem from "./GunItem"
import { Row, Col, Button, Container } from 'react-bootstrap';

const GUNS_PER_PAGE = 5;

function GunList(props) {

    const { firebase } = React.useContext(FirebaseContext)
    const [guns, setGuns] = React.useState([])
    const [cursor, setCursor] = React.useState(null)
    const isNewPage = props.location.pathname.includes("new")
    const isTopPage = props.location.pathname.includes("top")
    const page = Number(props.match.params.page)
    //const GUNS_PER_PAGE = 5;

    React.useEffect(() => {
        const unsubscribe = getGuns()
        return () => unsubscribe()
    }, [isTopPage, page])

    function getGuns() {
        const hasCursor = Boolean(cursor)
        if (isTopPage) {
            return firebase.db
                .collection("guns")
                .orderBy("voteCount", "desc")
                .limit(GUNS_PER_PAGE)
                .onSnapshot(handleSnapshot);
        } else if (page === 1) {
            return firebase.db
                .collection('guns')
                .orderBy("created", "desc")
                .limit(GUNS_PER_PAGE)
                .onSnapshot(handleSnapshot)
        } else if (hasCursor) {
            return firebase.db
                .collection('guns')
                .orderBy("created", "desc")
                .startAfter(cursor.created)
                .limit(GUNS_PER_PAGE)
                .onSnapshot(handleSnapshot)
        }
    }

    function handleSnapshot(snapshot) {
        const guns = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })
        const lastGun = guns[guns.length - 1]
        setGuns(guns)
        setCursor(lastGun)
    }

    function visitPreviousPage() {
        if (page > 1) {
            props.history.push(`/new/${page - 1}`)
        }
    }

    function visitNextPage() {
        if (page <= guns.length / GUNS_PER_PAGE) {
            props.history.push(`/new/${page + 1}`)
        }
    }

    const pageIndex = page ? (page - 1) * GUNS_PER_PAGE + 1 : 0;


    return (
        <div className="background-gray">

            <Container fluid="md">
        
                <Row>
                <div class="d-flex flex-row">
  <div class="p-2">
  <Col><h3 class="text-white">Welcome to the Airsoft Market!</h3></Col>
  <Col><h3 class="text-white">The Best Place to find Used Airsoft Equipment and Replicas!</h3></Col>
  </div>
  </div>
  <div class="p-2"><Col><img src="/rifle.jpg" alt="home" width="100%" height="100%" /> </Col></div>
                   
                </Row>

            </Container>
    
       
            <div>
            <br/> 
            <h2 class="text-warning">The latest offers:</h2>

            {guns.map((gun, index) => (
                <GunItem
                    key={gun.id}
                    showCount={true}
                    gun={gun}
                    index={index + pageIndex}
                />
            ))}
            {isNewPage && (
                <div className="pagination">
                    <div>
                    <Button variant="warning" onClick={visitPreviousPage}>Previous Page</Button>
                    </div>
                    <div>
                    <Button variant="warning" className="pointer " onClick={visitNextPage}>Next Page</Button>
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}

export default GunList;
