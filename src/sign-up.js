document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#signup');
    form.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.querySelector('input[name="email"]').value;
        //add code to check if user input email and password
        const username = email.split('@')[0];
        const password = document.querySelector('input[name="password"]').value;

        userObj = {
            "email": email, 
            'password': password, 
            'username': username
        }
        
        fetch('http://thesi.generalassemb.ly:8080/signup', {
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
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                window.location.href = '/'
            }
        })
        .catch(err => {
            console.log(err);
            
        })
        // fetch('http://thesi.generalassemb.ly:8080/post/list').then(el => el.json()).then(el=> {
        //     console.log(el)
        // })
    })
})