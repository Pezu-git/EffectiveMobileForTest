import axios from "axios";
import {config} from "../config";

const paginationNext = document.getElementById('page-pagination-next')
const paginationPrew = document.getElementById('page-pagination-prew')
const paginationCount = document.getElementById('page-pagination-count')
const paginationNextH = document.getElementById('page-pagination-next-history')
const paginationPrewH = document.getElementById('page-pagination-prew-history')
const paginationCountH = document.getElementById('page-pagination-count-history')
const historyBtn = document.getElementById('history_btn')

historyBtn.addEventListener('click', () => {
    const userId = document.getElementById('history-id').value
    const page = 1
    if(userId !== '') {
        getHistory(userId, page)
    }
})

paginationNext.addEventListener('click', () => {
    const page = Number(paginationCount.textContent)
    paginationCount.textContent = `${page  + 1}`
    getUsers(page+1)
})

paginationPrew.addEventListener('click', () => {
    const page = Number(paginationCount.textContent)
    if(page > 1) {
        paginationCount.textContent = `${page  - 1}`
        getUsers(page-1)
    }
})

paginationNextH.addEventListener('click', () => {
    const page = Number(paginationCountH.textContent)
    paginationCountH.textContent = `${page  + 1}`
    const userId = document.getElementById('history-id').value
    if(userId !== '') {
        getHistory(userId, page+1)
    }
})

paginationPrewH.addEventListener('click', () => {
    const page = Number(paginationCountH.textContent)
    if(page > 1) {
        paginationCountH.textContent = `${page  - 1}`
        const userId = document.getElementById('history-id').value
        if(userId !== '') {
            getHistory(userId, page-1)
        }
    }
})

const getBtn = document.getElementById('get_btn');

getBtn.addEventListener('click', () => {
    const paginationButtons = document.getElementById('pagination-buttons')
    paginationButtons.classList.remove('display-none')
    const paginationButtonsH = document.getElementById('pagination-buttons-history')
    paginationButtonsH.classList.add('display-none')
    paginationCount.textContent = '1'
    getUsers(1)
})
function getUsers(page) {
        axios.get(`${config.url}getUsersList/${page}`).then((response) => {
            console.log(response)
            if(response.status === 200) {
                const usersData = response.data
                const form = document.getElementById('get-form')
                const historyform = document.getElementById('history-form')
                historyform.innerHTML = ''
                historyform.classList.add('display-none')
                form.innerHTML = '';
                form.insertAdjacentHTML('afterbegin',
                    `<div class="user-item-header">
                        <div class="user-id-header">ID</div>
                        <div class="user-firstName-header">FIRSTNAME</div>
                        <div class="user-lastName-header">LASTNAME</div>
                        <div class="user-age-header">AGE</div>
                        <div class="user-profession-header">PROFESSION</div>
                        <div class="user-active-header">IS ACTIVE</div>
                    </div>`
                )
                usersData.forEach((item) => {
                    const activeCkass = item.isActive ? 'user-active' : 'user-noneActive'
                    form.insertAdjacentHTML('beforeend',
                        `<div class="user-item">
                            <div class="user-id user-data-field" id=user-id-${item.id}>${item.id}</div>
                            <div class="user-firstName user-data-field" id="user-firstName-${item.id}">${item.firstName}</div>
                            <div class="user-lastName user-data-field" id="user-lastName-${item.id}">${item.lastName}</div>
                            <div class="user-age user-data-field" id="user-age-${item.id}">${item.age}</div>
                            <div class="user-profession user-data-field" id="user-profession-${item.id}">${item.profession}</div>
                            <div class="user-active user-data-field ${activeCkass}" id="user-firstName-${item.id}"></div>
                            <div class="btn btn-user-update" id="update-user-${item.id}"><i class="fas fa-pencil icon-user-update" id="icon-update-user-${item.id}"></i></div>
                        </div>`
                    )
                })

            }
        }).catch((e) => {
            console.log(e)
        })
}
function getHistory(userId, page) {
    axios.get(`${config.HISTORY_URL}update/${userId}/${page}`).then((response) => {
        if(response.status === 200) {
            const userData = response.data
            const form = document.getElementById('history-form')
            const getform = document.getElementById('get-form')
            getform.innerHTML = ''
            getform.style.border = 'none'
            const paginationButtons = document.getElementById('pagination-buttons')
            paginationButtons.classList.add('display-none')
            const paginationButtonsH = document.getElementById('pagination-buttons-history')
            paginationButtonsH.classList.remove('display-none')
            form.classList.remove('display-none')
            form.innerHTML = '';
            console.log(userData)
            userData.forEach((item) => {
                form.insertAdjacentHTML('beforeend',
                    `<div class="user-item history-content-container">
                            <div class="history-date">
                                <div class="history-header">Дата:</div>
                                <div class="history-value">${item.createdAt}</div>
                            </div>
                            <div class="history-content">
                                <div class="history-header">Изменения</div>
                                <div class="history-value" >${item.history}</div>
                            </div>
                            
                        </div>`
                )
            })

        }
    }).catch((e) => console.log(e))
}