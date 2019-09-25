document.addEventListener('DOMContentLoaded', () => {
    console.log('loaded');
    const form = document.querySelector('#signup');
    form.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('in form');
        const email = document.querySelector('input[name="email"]').value;
        const username = email.split('@')[0];
        const password = document.querySelector('input[name="password"]').value;
        console.log(typeof(email));

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
            console.log(data);    
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            window.location.href = '/'
        })
        .catch(err => {
            console.log(err);
            
        })
        // fetch('http://thesi.generalassemb.ly:8080/post/list').then(el => el.json()).then(el=> {
        //     console.log(el)
        // })
    })
})