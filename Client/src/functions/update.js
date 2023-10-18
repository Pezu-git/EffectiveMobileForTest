import axios from "axios";
import {config} from "../config";

const btnCancel = document.getElementById('update-form-btn-cancel')
const updateBtn = document.getElementById('update-form-btn')

//Cancel Btn
btnCancel.addEventListener('click', () => {
    const updateForm = document.getElementById('update-form-container')
    updateForm.classList.toggle('display-none')
})

//Show update-form
document.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn-user-update')) {
        const user_id = event.target.id.replace('update-user-', '')
        updateShow(user_id)
    }
    if(event.target.classList.contains('icon-user-update')) {
        const user_id = event.target.id.replace('icon-update-user-', '')
        updateShow(user_id)
    }
})

updateBtn.addEventListener('click', (event) => {
    const firstName = document.getElementById('firstName_update').value
    const lastName = document.getElementById('lastName_update').value
    const age = Number(document.getElementById('age_update').value)
    const profession = document.getElementById('profession_update').value
    const isActive = document.getElementById('isActive_update').checked
    if(firstName !== '' && lastName !== '' &&  age !== '' && profession !== '') {
        event.preventDefault()
        const data = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            profession: profession,
            isActive: isActive
        }
        const user_id = document.getElementById('update-form-btn').getAttribute('data-id')
        updateUser(user_id, data)
    }
})

function updateUser(id, data) {
    console.log(data, id)
    axios.put(`${config.url}updateUserData/${id}`, data).then((response) => {
        console.log(response)
        const createForm = document.getElementById('update-form-container')
        createForm.classList.toggle('display-none')
    })
        .catch((e) => {
            console.log(e)
        })
}

function updateShow(user_id) {
    axios.get(`${config.url}getUsersList/0`).then((response) => {
        if(response.status === 200) {
            const userData = response.data.find((item) => item.id == user_id)
            console.log(userData)
            const updateForm = document.getElementById('update-form-container')
            updateForm.classList.toggle('display-none')
            document.getElementById('firstName_update').value = userData.firstName
            document.getElementById('lastName_update').value = userData.lastName
            document.getElementById('age_update').value = userData.age
            document.getElementById('profession_update').value = userData.profession

            const active = document.getElementById('isActive_update')
            active.checked = userData.isActive || false
            updateBtn.setAttribute('data-id', userData.id)
        }
    }).catch((e) => {
        console.log(e)
    })
}