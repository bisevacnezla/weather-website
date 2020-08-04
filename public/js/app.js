
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var messageOne= document.querySelector('#message-1')
var messageTwo= document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const loc = search.value

    fetch('/weather?address=' + loc).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = ''
            messageTwo.textContent = data.error
            console.log(data.error)
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})


})

