console.log("Hello World");
const posts = document.getElementById('posts');

//Retrieves all posts and displays contents
fetch(`http://thesi.generalassemb.ly:8080/post/list`)
    .then(function(response){
        return response.json();
    })
    .then(function(all_posts){
        all_posts.map(el => {
            let post = document.createElement('div');
            let allCommentsDiv = document.createElement('div');
            let author = document.createElement('span');
            let title = document.createElement('span');
            let description = document.createElement('p');
            let showComments = document.createElement('button');
            showComments.addEventListener('click', () => {
                onCommentsClick(el.id, allCommentsDiv);
            })
            showComments.innerText = 'Show Comments';
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

function onCommentsClick(id, allCommentsDiv) {
    allCommentsDiv.innerHTML = '';
    fetch(`http://thesi.generalassemb.ly:8080/post/${id}/comment`)
    .then(response => response.json())
    .then(data => {
        //if div exist do not repost comments
        data.map((el, index) => {
            let div = document.createElement('div');
            let creator = el.user.username;
            div.innerHTML = `
                <b>${creator}: </b>
                <span>${el.text}</span>
            `;
            if (localStorage.getItem("email") && creator === localStorage.getItem('email').split('@')[0]) {
                const button = document.createElement('button');
                button.innerText = 'delete';
                div.appendChild(button);
                //add event handler for delete button
            }
   
            allCommentsDiv.appendChild(div); 
        })
    })
}