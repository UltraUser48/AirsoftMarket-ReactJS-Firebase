import React from "react";
import FirebaseContext from "../../firebase/context"
import GunItem from "./GunItem"
import { Row, Col, Container } from 'react-bootstrap';

const GUNS_PER_PAGE = 5;

function TopGuns(props) {

    const { firebase } = React.useContext(FirebaseContext)
    const [guns, setGuns] = React.useState([])
    const [cursor, setCursor] = React.useState(null)
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


    const pageIndex = page ? (page - 1) * GUNS_PER_PAGE + 1 : 0;


    return (
        <div className="background-gray">


            <Container fluid="md">

<Row><Col><img src="/AirsoftLogo.jpg" alt="home" width="100%" height="100%" /> </Col></Row>

                <Row>

                    <div >
                        <div class="p-2">
                            <br/>
                            <Col>
                            <h2 class="text-warning">Top Rated Adverts
                                </h2></Col>
                            
                            <Col>

                            <div class="p-2">
                <br />
                {guns.map((gun, index) => (
                    <GunItem
                        key={gun.id}
                        showCount={true}
                        gun={gun}
                        index={index + pageIndex}
                    />
                ))}
            </div>
            </Col>
                        </div>
                    </div>
                </Row>
            </Container>

        </div>
    )
}

export default TopGuns;
