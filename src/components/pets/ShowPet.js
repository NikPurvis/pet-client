import React, {useState, useEffect} from 'react'
import { getOnePet } from '../../api/pets'
import { useParams } from 'react-router-dom'
import { Spinner, Container, Card } from 'react-bootstrap'

const ShowPet = (props) => {

    const [pet, setPet] = useState(null)
    console.log('props in showPet', props)
    const { id } = useParams()
    console.log('id in showPet', id)

    // Now we need to get a pet
    // An empty dependancy array is necessary to act like componentDidMount and/or componentUpdate, keeps function from infinity loop. (Getting an infinite loop? Check dependancy array!)
    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(console.error)
    }, [id])

    if (!pet) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{pet.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Age: {pet.age}</small><br/>
                        <small>Type: {pet.type}</small><br/>
                        <small>
                            Adoptable: {pet.adoptable ? 'yes' : 'no'}
                        </small>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ShowPet
