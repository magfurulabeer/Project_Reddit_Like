let token = localStorage.getItem("token");

const onLocalStroageChange = () => {
    const header = document.querySelector("header");
    const email = localStorage.getItem("email");
    header.innerHTML = '';
    
    if (localStorage.getItem("token") && localStorage.getItem("token") !== 'undefined'){
        header.innerHTML = `
            <nav class="navbar navbar-light bg-light justify-content-between">
                <a class="navbar-brand">Hello, ${email}</a>
                <form class="form-inline">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit"></button>
                </form>
            </nav>
        `;

        let logOut = document.querySelector('.btn-outline-success');
    
        
        logOut.innerText = "Log Out";
        logOut.addEventListener('click', (el) => {
            localStorage.clear();
            onLocalStroageChange();
        })       
    } else {
        const signUp = document.createElement("a");
        signUp.innerText = "Sign up";
        signUp.className ="btn btn-outline-success my-2 my-sm-0"
        signUp.href = "/sign-up.html";
        const logIn = document.createElement("a");
        logIn.innerText = "Log in";
        logIn.href = "/log-in.html";
        logIn.className = "btn btn-outline-success my-2 my-sm-0"
        logIn.style = 'margin-right: 20px;'
        header.innerHTML = `
            <nav class="navbar navbar-light bg-light justify-content-between">
                <a class="navbar-brand"></a>
                <form class="form-inline">
                </form>
            </nav>
         `;
        document.querySelector('.form-inline').append(logIn, signUp)
    }
}
if (token) {
    const button = document.createElement('button');
    button.className = 'btn btn-outline-success my-2 my-sm-0';
    button.innerText = 'Create Post';
    document.getElementById('add-comments').appendChild(button);
    button.addEventListener('click', () => {
        const div = document.createElement('div');
        div.id = 'create-post';
        div.className = 'new-post-div'
        document.body.insertBefore(div, document.querySelector('#posts'))

        let createPost = document.getElementById("create-post");
        createPost.innerHTML = `
            <form id="new-post">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" name="title" required/>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea rows="5" class="form-control" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">
                        Create
                    </button>
                </div>
            </form>
        `;
        const closeNewPost = document.createElement('button');
        closeNewPost.className = 'close';
        closeNewPost.style.color = 'white';
        closeNewPost.style = `
            color: white;
            position: absolute;
            right: 30px;
            top: 30px;
        `;
        closeNewPost.setAttribute('aria-label',"Close");
        closeNewPost.innerHTML = '<span aria-hidden="true">&times;</span>'
        div.appendChild(closeNewPost);
        closeNewPost.addEventListener('click', () => {
            document.body.removeChild(div)
        })
        let newPost = document.getElementById('new-post');
        newPost.addEventListener("submit", function(e){
            e.preventDefault();
            
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
                document.body.removeChild(div)
                test(el);
            }).catch(err => console.log(err))
        })
    })
}




onLocalStroageChange();