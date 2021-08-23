
console.log("client side js file loaded")

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit' , (event) => {
    event.preventDefault()
    messageTwo.textContent = 'Loading...'
    const location =  searchTerm.value
    fetch(`/weather?address=${location}`)
    .then((response) => {
        response.json().then((data) => {
            let result;
            if(data.error) result = "Error : " + data.error
            else {
                messageOne.textContent = searchTerm.value
                result = "Temperature : " + data.temperature
            }
            messageTwo.textContent = result
        })
    })
})