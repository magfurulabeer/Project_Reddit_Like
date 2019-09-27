console.log("Hello World");
const posts = document.getElementById('posts');

//Retrieves all posts and push into table
fetch(`http://thesi.generalassemb.ly:8080/post/list`)
.then(function(response){
    return response.json();
})
.then(function(all_posts){
    all_posts.reverse().map(el => {
        let flag = 'show';
        let post = document.createElement('div');
        let allCommentsDiv = document.createElement('div');
        let author = document.createElement('span');
        let title = document.createElement('span');
        let description = document.createElement('p');
        let showComments = document.createElement('button');
        showComments.innerText = 'Show Comments';
        showComments.addEventListener('click', () => {
            onCommentsClick(el.id, allCommentsDiv, post, flag);
            if (flag === 'show') {
                showComments.innerText = 'Hide Comments';
                flag = 'hide';
            } else {
                showComments.innerText = 'Show Comments';
                flag = 'show';
            }
            
        })
        author.innerText = `Created by ${el.user.username}`;
        title.innerText = el.title;
        description.innerText = el.description;
        post.appendChild(author);
        post.appendChild(title);
        post.appendChild(description);
        post.appendChild(showComments);
        post.appendChild(allCommentsDiv)
        post.style = `
            border: 1px solid black;
            width: 80%;
            margin: 0 auto;
            margin-bottom: 10px;
        `
        document.querySelector('#posts').appendChild(post)
    })
})

function onCommentsClick(id, allCommentsDiv, post, flag) {
    allCommentsDiv.innerHTML = '';
    if (flag === 'show') {
        fetch(`http://thesi.generalassemb.ly:8080/post/${id}/comment`)
        .then(response => response.json())
        .then(data => {
            //if div exist do not repost comments
            data.map((el) => {
                addComment(el, allCommentsDiv);
            });
            const addCommentform = document.createElement('form');
            const input = document.createElement('input');
            const button = document.createElement('button');
            button.type = 'submit';
            input.required = true;
            button.innerText = 'Add comment';
            addCommentform.addEventListener('submit', (e) => {
                e.preventDefault();
                onCommentSubmitClick(id, input,allCommentsDiv);
            })
            addCommentform.appendChild(input);
            addCommentform.appendChild(button);
            post.appendChild(addCommentform);
        })
    } else {
        flag = 'show';
        post.removeChild(post.lastChild)
    }
}

function onCommentDeleteClick(el, id, allCommentsDiv) {
    console.log(el, id);
    const token = localStorage.getItem('token');
    fetch(`http://thesi.generalassemb.ly:8080/comment/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(response => {  
        return response.text();
    }).then(data => {
        if(data === 'success') {
            const deletedComment = document.getElementById(id);
            allCommentsDiv.removeChild(deletedComment);
        }
    })
}

function onCommentSubmitClick(id, input,allCommentsDiv) {
    console.log(localStorage.getItem('token'), id);
    const text = input.value;
    console.log(text);
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
        console.log(data);
             
        addComment(data, allCommentsDiv);
        input.value = '';
    })

}

function addComment(el, allCommentsDiv) {
    let addComment = document.createElement('div');
    addComment.id = el.id;
    let creator = el.user.username;
    addComment.innerHTML = `
        <b>${creator}: </b>
        <span>${el.text}</span>
    `;
    if (localStorage.getItem("email") && creator === localStorage.getItem('email').split('@')[0]) {
        const button = document.createElement('button');
        button.innerText = 'delete';
        addComment.appendChild(button);
        //add event handler for delete button
        button.addEventListener('click',()=>{
            onCommentDeleteClick(button, el.id, allCommentsDiv)
        });
    }
    
    allCommentsDiv.prepend(addComment);
}