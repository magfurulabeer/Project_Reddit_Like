

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
onLocalStroageChange();