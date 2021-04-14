const url = 'http://localhost:3000/books'
document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.querySelector('#list')

    fetch(url)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(item => {
            const li = document.createElement('li')
            li.textContent = item.title
            li.dataset.id = item.id
            bookList.appendChild(li)
            li.addEventListener('click', ()=>fetchBook(li.dataset.id))
        })
    })
});

function fetchBook(id) {
    fetch(url + `/${id}`)
    .then(resp=>resp.json())
    .then(json=> {
        showBook(json)
        likeIt(json)
    })
}

function showBook(bookData) {
    const bookSpotlight = document.querySelector('#show-panel')
    const img = document.createElement('img')
    const title = document.createElement('h2')
    const subtitle = document.createElement('h2')
    const author = document.createElement('h2')
    const p = document.createElement('p')
    const ul = document.createElement('ul')

    img.src = bookData.img_url
    img.alt = bookData.title
    title.textContent = bookData.title
    subtitle.textContent = bookData.subtitle
    author.textContent = bookData.author
    p.textContent = bookData.description
    
    bookSpotlight.innerHTML = ""
    bookSpotlight.appendChild(img)
    bookSpotlight.appendChild(title)
    bookSpotlight.appendChild(subtitle)
    bookSpotlight.appendChild(author)
    bookSpotlight.appendChild(p)
    bookSpotlight.appendChild(ul)
    bookData.users.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item.username
        ul.appendChild(li)
    })
    
}

function likeIt(bookData) {
    const bookSpotlight = document.querySelector('#show-panel')
    const ul = document.querySelector('#show-panel ul')
    const likeBtn = document.createElement('button')
    let users = bookData.users
    const rmvUser = [...users].filter(n => n.id > 1)
    if (users.find(ele => ele.id == 1) == undefined) {
        likeBtn.textContent = 'LIKE'
    } else {
        likeBtn.textContent = 'UNLIKE'
    }
    likeBtn.dataset.id = bookData.id
    bookSpotlight.appendChild(likeBtn)
    likeBtn.addEventListener('click', ()=> {
        if (likeBtn.textContent == 'LIKE') {
            const newBody = {
                "users": [...users, {"id":1, "username":"pouros"}]
            }
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newBody)
            }
            fetch(url + `/${bookData.id}`, configObj)
            .then(resp=>resp.json())
            .then(json=> {
                users = json.users
                ul.innerHTML = ""
                json.users.forEach(item => {
                    const li = document.createElement('li')
                    li.textContent = item.username
                    ul.appendChild(li)
                })
                likeBtn.textContent = 'UNLIKE'
            })
        } else {
            const rmvUser = [...users].filter(n => n.id > 1)
            const newBody ={
                "users": rmvUser
            }
            const configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newBody)
            }
            fetch(url + `/${bookData.id}`, configObj)
            .then(resp=>resp.json())
            .then(json=> {
                users = json.users
                ul.innerHTML = ""
                json.users.forEach(item => {
                    const li = document.createElement('li')
                    li.textContent = item.username
                    ul.appendChild(li)
                })
                likeBtn.textContent = 'LIKE'
            }
                )
        }
    })




    

    


    
    
}