const loadNewBtn = document.querySelector('#loadNew')
const info = document.querySelector('#info')
const thumbnail = document.querySelector('.thumbnail')
const name = document.querySelector('.name')
const email = document.querySelector('.email')
const age = document.querySelector('.age')

// Random Dog Image
// https://dog.ceo/api/breeds/image/random
// Random User
// https://randomuser.me/api/

const url = 'https://randomuser.me/api/'

const setInfo = (data) => {

    const object = JSON.stringify(data);
    info.innerHTML = object

    const str = JSON.parse(data)

    // Getting the information and storing into a variable to be used
    const getImg = str.results[0].picture.large
    const getName = `${str.results[0].name.title} ${str.results[0].name.first} ${str.results[0].name.last}`
    const getEmail = str.results[0].email
    const getAge = str.results[0].dob.age
    console.log(str.results[0])

    thumbnail.src = getImg
    name.innerHTML = getName
    email.innerHTML = getEmail
    age.innerHTML = getAge
}

const reqListener = (e) => {
    const data = e.currentTarget.responseText
    setInfo(data)
    console.log(data)
}

const reqError = () => {
    console.log(`Could not fetch user data`)
}

const loadUser = () => {
    const oReq = new XMLHttpRequest()
    oReq.addEventListener("load", reqListener)
    oReq.addEventListener("error", reqError)
    oReq.open("GET", url)
    oReq.send()
}

loadNewBtn.addEventListener('click', loadUser)
