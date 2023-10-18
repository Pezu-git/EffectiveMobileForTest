import axios from "axios";
import {config} from "../config";

const openCreateFormBtn = document.getElementById('openCreateFormBtn')
const createBtn = document.getElementById('create-form-btn')
const btnCancel = document.getElementById('create-form-btn-cancel')

openCreateFormBtn.addEventListener('click', () => {
    const createForm = document.getElementById('create-form-container')
    createForm.classList.toggle('display-none')
})

btnCancel.addEventListener('click', () => {
    const createForm = document.getElementById('create-form-container')
    createForm.classList.toggle('display-none')
})
//Create-form

createBtn.addEventListener('click', (event) => {
    const firstName = document.getElementById('firstName_create').value
    const lastName = document.getElementById('lastName_create').value
    const age = Number(document.getElementById('age_create').value)
    const profession = document.getElementById('profession_create').value
    if(firstName !== '' && lastName !== '' &&  age !== '' && profession !== '') {
        event.preventDefault()
        const data = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            profession: profession
        }
        console.log(data)
        createUser(JSON.stringify(data))
    }
})
//Post-request for create new User
function createUser(data) {
    console.log(data)
    axios.post(`${config.url}createUser`, data).then((response) => {
        console.log(response)
        const createForm = document.getElementById('create-form-container')
        createForm.classList.toggle('display-none')
    })
        .catch((e) => {
            console.log(e)
        })
}

