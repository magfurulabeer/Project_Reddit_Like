const posts = document.getElementById('posts');

// This function will open all comments for each posts

function onCommentsClick(id, allCommentsDiv, post, flag) {
    allCommentsDiv.innerHTML = '';
    if (flag === 'show') {
        fetch(`http://localhost:8080/reddit-monolith/post/${id}/comment`)
        .then(response => response.json())
        .then(data => {
            //if div exist do not repost comments
            data.map((el) => {
                addComment(el, allCommentsDiv);
            });
            console.log(id);
            
            const addCommentform = document.createElement('form');
            addCommentform.style = 'display: flex; margin: 10px 0 10px 0;';
            addCommentform.id = `addCommentform${id}`;
            const input = document.createElement('input');
            input.setAttribute('class', "form-control");
            input.setAttribute('placeholder', "Add comment");
            input.setAttribute('autofocus', true);
            input.setAttribute('required', true );
            input.style = 'padding-right    : 10px;'
            const button = document.createElement('button');
            button.type = 'submit';
            button.className ="btn btn-outline-success my-2 my-sm-0"
            button.style.width = '300px';
            
            button.innerText = 'Add comment';
            addCommentform.addEventListener('submit', (e) => {
                e.preventDefault();
                onCommentSubmitClick(id, input,allCommentsDiv);
            })
            if (localStorage.getItem('token')) {
                addCommentform.appendChild(input);
                addCommentform.appendChild(button);
                post.appendChild(addCommentform);
            }
        })
    } else {
        console.log('here');
        
        
        flag = 'show';
        try {
            post.removeChild(document.querySelector(`#addCommentform${id}`));
        } catch (error) {
            console.log(error);
        }
    }
}

// Function would delete specific coment if click delete button

function onCommentDeleteClick(el, id, allCommentsDiv) {
    console.log(el, id);
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/reddit-monolith/comment/${id}`, {
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

// This function would create new comment on click event

function onCommentSubmitClick(id, input,allCommentsDiv) {
    console.log(localStorage.getItem('token'), id);
    const text = input.value;
    console.log(text);
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8080/reddit-monolith/comment/${id}`, {
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

// this function will create DOM element for new comment once creted

function addComment(el, allCommentsDiv) {
    let addComment = document.createElement('div');
    addComment.id = el.id;
    let creator = el.user.username;
    addComment.innerHTML = `
        <b>${creator}: </b>
        <span>${el.text}</span>
    `;
    if (localStorage.getItem("email") && creator === localStorage.getItem('email').split('@')[0]) {
        const button = document.createElement('span');
        button.innerHTML = '<span aria-hidden="true" style="float: right; margin-right: 20px; cursor: pointer;">&times;</span>';
        addComment.appendChild(button);
        //add event handler for delete button
        button.addEventListener('click',()=>{
            onCommentDeleteClick(button, el.id, allCommentsDiv)
        });
    }
    const hr = document.createElement('hr');
    hr.style = 'margin: 0 auto';
    addComment.append(hr);
    allCommentsDiv.prepend(addComment);
}

//this function will create single post

function createPost(el) {
    
    let flag = 'show';
    let hr = document.createElement('hr');
    let post = document.createElement('div');
    post.className = 'content'
    let allCommentsDiv = document.createElement('div');
    let author = document.createElement('span');
    let title = document.createElement('h5');
    let description = document.createElement('p');
    const showComments = document.createElement("a");
    showComments.innerText = "Show comments";
    showComments.style = `
        font-size: 12px;
    `
    showComments.className ="btn btn-outline-success my-2 my-sm-0"
    showComments.addEventListener('click', () => {
        onCommentsClick(el.id, allCommentsDiv, post, flag);
        if (flag === 'show') {
            showComments.innerText = 'Hide Comments';
            flag = 'hide';
        } else {
            showComments.innerText = 'Show Comments';
            flag = 'show';
        }
    });
    author.innerHTML = `Created by <b>${el.user.username.charAt(0).toUpperCase() + el.user.username.slice(1)}</b>`;
    author.style = `
        color: #787C7E;
        font-family: 'monospace';
    `;
    title.innerText = el.title.charAt(0).toUpperCase() + el.title.slice(1);
    description.innerText = el.description.charAt(0).toUpperCase() + el.description.slice(1);
    post.appendChild(author);
    post.appendChild(hr)
    post.appendChild(title);
    post.appendChild(description);
    post.appendChild(showComments);
    post.appendChild(allCommentsDiv)
   
    document.querySelector('#posts').prepend(post)
}