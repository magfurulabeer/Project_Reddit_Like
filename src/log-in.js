document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#signup');
    form.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        userObj = {
            "email": email, 
            'password': password, 
        }
        
        fetch('http://thesi.generalassemb.ly:8080/login', {
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