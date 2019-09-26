console.log("Hello World");
const posts = document.getElementById('posts');

//Retrieves all posts and push into table
fetch(`http://thesi.generalassemb.ly:8080/post/list`)
.then(function(response){
    return response.json();
})
.then(function(all_posts){
    all_posts.map(el => {
        let div = document.createElement('div');
        let author = document.createElement('span');
        let title = document.createElement('span');
        let description = document.createElement('p');
        let showComments = document.createElement('button');
        showComments.addEventListener('click', () => {
            onCommentsClick(el.id, div);
        })
        showComments.innerText = 'Show Comments';
        author.innerText = `Created by ${el.user.username}`;
        title.innerText = el.title;
        description.innerText = el.description;
        div.appendChild(author);
        div.appendChild(title);
        div.appendChild(description);
        div.appendChild(showComments);
        div.style = `
            border: 1px solid black;
            width: 80%;
            margin: 0 auto;
            margin-bottom: 10px;
        `
        document.querySelector('#posts').appendChild(div)
    })
})

function onCommentsClick(id, postDiv) {
    fetch(`http://thesi.generalassemb.ly:8080/post/${id}/comment`)
    .then(response => response.json())
    .then(data => {
        data.map((el) => {
            let div = document.createElement('div');
            let creator = el.user.username;
            div.innerHTML = `
                <b>${creator}: </b>
                <span>${el.text}</span>
            `;
            if (localStorage.getItem('email') && creator === localStorage.getItem('email').split('@')[0]) {
                const button = document.createElement('button');
                button.innerText = 'delete';
                button.addEventListener('click', () => {
                    onCommentDeleteClick(el)
                });
                div.appendChild(button);
            }
            
            postDiv.appendChild(div)
        })
        const addCommentDiv = document.createElement('div');
        const input = document.createElement('input');
        const button = document.createElement('button');
        button.innerText = 'Add comment'
        button.addEventListener('click', () => {
            onCommentSubmitClick(id, input);
        })
        addCommentDiv.appendChild(input);
        addCommentDiv.appendChild(button);
        postDiv.appendChild(addCommentDiv)
    })
}

function onCommentDeleteClick(el) {
    console.log(el)
}

function onCommentSubmitClick(id, input) {
    const text = input.value;
    const token = localStorage.getItem('token');

    fetch(`http://thesi.generalassemb.ly:8080/comment/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
            text
        }),
        
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
    })

}