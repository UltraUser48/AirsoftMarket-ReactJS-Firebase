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
        <div>
            <img src="/home3.jpg" alt="home" />

            <Container fluid="md">
                <Row>
                    <Col>Welcome to the Airsoft Market!</Col>
                </Row>
                <Row>
                <Col>The best place to find a used Airsoft Replica</Col>
                </Row>
                <Row>
                <Col>Find the latest offers below!</Col>
                </Row>

                <Row>
                <Col></Col>
                </Row>
            </Container>
            <br/>       
<p>The offers:</p>

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
                    <Button variant="outline-secondary" onClick={visitPreviousPage}>Previous Page</Button>
                    <br />
                    <Button variant="outline-secondary" className="pointer " onClick={visitNextPage}>Next Page</Button>
                </div>
            )}
        </div>
    )
}

export default GunList;
