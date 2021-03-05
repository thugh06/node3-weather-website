

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

// an asychronous i/o operation
// then and async/await are part of promises

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const location = searchElement.value

    messageOne.textContent = "loading..."
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})