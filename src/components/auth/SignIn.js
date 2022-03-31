import React, {useState, useEffect} from 'react'
import { getOnePet } from '../../api/pets'
import { useParams } from 'react-router-dom'
import { Spinner, Container, Card } from 'react-bootstrap'
import {showPetSuccess, showPetFailure} from '../shared/AutoDismissAlert/messages'

const ShowPet = (props) => {

    const [pet, setPet] = useState(null)
    const {user, msgAlert} = props
    const { id } = useParams()
    console.log('id in showPet', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .then(() => {
                msgAlert({
                    heading: 'Here is the pet!',
                    message: showPetSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No pet found',
                    message: showPetFailure,
                    variant: 'danger',
                })
            })
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
