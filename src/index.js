const onLocalStroageChange = () => {
    const header = document.querySelector("header");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    header.innerHTML = '';
    if (token && token !== 'undefined'){
        let logOut = document.createElement("button");
        logOut.innerText = "Log Out";
        logOut.addEventListener('click', (el) => {
            localStorage.clear();
            onLocalStroageChange();
        })
        let div = document.createElement('div');
        div.innerText = "Hello, " + localStorage.getItem("email");
        header.appendChild(div)
        header.appendChild(logOut)
        // const mainCreatePost = document.getElementById('create-post');
       
    }
    else {
        const signUp = document.createElement("a");
        signUp.innerText = "Sign up";
        signUp.href = "/sign-up.html";
        header.appendChild(signUp);

        const logIn = document.createElement("a");
        logIn.innerText = "Log in";
        logIn.href = "/log-in.html";
        header.appendChild(logIn);
        
    }
}
let newPost=document.getElementById("new-post");
newPost.addEventListener("submit", function(e){
    e.preventDefault();
    let token = localStorage.getItem("token");
    const title = document.querySelector("input[name='title']").value;
    const description = document.querySelector("textarea[name='description']").value;
  
    fetch(`http://thesi.generalassemb.ly:8080/post`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: 'Bearer ' + token
        }
    }).then(response => {
        return response.json();
    }).then(el => {
        let post = document.createElement('div');
        let allCommentsDiv = document.createElement('div');
        let author = document.createElement('span');
        let title = document.createElement('span');
        let description = document.createElement('p');
        let showComments = document.createElement('button');
        showComments.addEventListener('click', () => {
            onCommentsClick(el.id, allCommentsDiv, post);
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
        document.querySelector('#posts').prepend(post)
    }).catch(err => console.log(err))
})



onLocalStroageChange();