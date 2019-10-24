// Sign in implementation


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#signup');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('input[name="email"]').value;
        //add code to check if user input email and password
        const username = email.split('@')[0];
        const password = document.querySelector('input[name="password"]').value;

        console.log(username + " " + password);

        userObj = {
            "email": email, 
            'password': password, 
            'username': username
        }
        
        fetch('http://localhost:8080/reddit-monolith/signup', {
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            return response.json();
        })
        .then(data => {
            if(data.token === undefined) throw 'Invalid email or password'
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                window.location.href = '/'
            }
        })
        .catch(err => {
            alert(err);  
        })
    })
})