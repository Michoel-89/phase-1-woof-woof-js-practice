const dogsBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const dogFilter = document.querySelector('#good-dog-filter')
fetch('http://localhost:3000/pups')
.then(resp => resp.json())
.then((dogs) => {
    for (const dog of dogs) {
        renderDog(dog)
    }
})
dogFilter.addEventListener('click', (e) => {
    let sentence = e.target.textContent.split(' ')
    if (sentence[3] === 'OFF') {
        sentence[3] = 'ON'
        fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then((dogs) => {
        dogsBar.textContent = ''
        for (const dog of dogs) {
            if (dog.isGoodDog === true) {
                renderDog(dog)
            }
        }
         })
    } else if (sentence[3] === 'ON') {
        sentence[3] = 'OFF'
        fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then((dogs) => {
         dogsBar.textContent = ''
         for (const dog of dogs) {
            renderDog(dog)
        }
    })
    }
    e.target.textContent = sentence.join(' ')
})
function renderDog(dog) {
    const span = document.createElement('span')
    span.textContent = dog.name
    dogsBar.append(span)
    span.addEventListener('click', () => {
        const name = document.createElement('h2')
        name.textContent = dog.name
        const button = document.createElement('button')
        button.textContent = dog.isGoodDog
        const img = document.createElement('img')
        img.src = dog.image
        dogInfo.textContent = ''
        const newDog = {
            id: dog.id,
            name: dog.name,
            isGoodDog: dog.isGoodDog,
            image: dog.image
        }
        console.log(newDog.id)
        dogInfo.append(name, img, button)
        button.addEventListener('click', (e) => {
            let status = e.target.textContent
            if (status === 'false') {
                fetch(`http://localhost:3000/pups/${newDog.id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'isGoodDog': true })
                })
                .then(response => {
                if (response.ok) {
                    e.target.textContent = 'true'
                } else {
                    console.error('Error setting isGoodDog to true')
                }
                })
                .catch(error => {
                console.error('Error setting isGoodDog to true:', error)
                })
            } else if (status === 'true') {
                fetch(`http://localhost:3000/pups/${newDog.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'isGoodDog': false })
                })
                .then(response => {
                    if (response.ok) {
                    e.target.textContent = 'false'
                    } else {
                    console.error('Error setting isGoodDog to false')
                    }
                })
                .catch(error => {
                    console.error('Error setting isGoodDog to false:', error)
                })
            }
        })
    })
}