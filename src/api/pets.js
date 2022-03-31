import apiUrl from "../apiConfig"
import axios from "axios"

// index function
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}


// SHOW function
// Just gets the petId and passes it
// "export" at the beginning of the function makes it easy to destructure when you need it.
export const getOnePet = (petId) => {
    return axios(`${apiUrl}/pets/${petId}`)
}

// POST -> create function
// Arguments are passing the things we need to the API. newPet is the fields filled in for the new pet.
// We'll send an anonymous function
export const createPet = (user, newPet) => {
    return axios ({
        url: `${apiUrl}/pets`,
        method: "POST",
        headers: {
            Authorization: `Token token = ${user.token}`
        },
        data: newPet
    })

}

// PATCH -> update function

// DELETE -> remove function