const loadNewBtn = document.querySelector('#loadNew')
const info = document.querySelector('#info')
const thumbnail = document.querySelector('.thumbnail')
const name = document.querySelector('.name')
const email = document.querySelector('.email')
const age = document.querySelector('.age')
const userTable = document.querySelector('.user-table')

// Random Dog Image
// https://dog.ceo/api/breeds/image/random
// Random User
// https://randomuser.me/api/

const url = 'https://randomuser.me/api/'
const users = []

function Person(thumbnail, name, email, age) {
    this.thumbnail = thumbnail
    this.name = name
    this.email = email
    this.age = age
}

const setInfo = (data) => {
    const str = JSON.parse(data)
    console.log(str.results[0])

    // Getting the information and storing into a variable to be used
    const getImg = str.results[0].picture.large
    const getName = `${str.results[0].name.title} ${str.results[0].name.first} ${str.results[0].name.last}`
    const getEmail = str.results[0].email
    const getAge = str.results[0].dob.age

    // add new user to the users array using Person constructor
    users.push(new Person(getImg, getName, getEmail, getAge))

    // creating new user elements
    const div = document.createElement("div")
    const newThumbnail = document.createElement("img")
    const div2 = document.createElement("div")
    const span1 = document.createElement("span")
    const span2 = document.createElement("span")
    const span3 = document.createElement("span")
    const span4 = document.createElement("span")
    const span5 = document.createElement("span")

    // adding classes to new elements
    div.className = 'userContainer'
    newThumbnail.className = 'thumbnail'
    div2.className = 'info-container'
    span1.className = 'name'
    span3.className = 'email'
    span5.className = 'age'

    // adding data to new elements
    newThumbnail.src = getImg
    span1.innerHTML = getName
    span2.innerText = 'Email: '
    span3.innerText = getEmail
    span4.innerText = 'Age: '
    span5.innerText = getAge

    // adding new user element to HTML
    userTable.appendChild(div)
    div.appendChild(newThumbnail)
    div.appendChild(div2)
    div2.appendChild(span1)
    div2.appendChild(span2)
    span2.appendChild(span3)
    div2.appendChild(span4)
    span4.appendChild(span5)
}

const reqListener = (e) => {
    const data = e.currentTarget.responseText
    setInfo(data)
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
