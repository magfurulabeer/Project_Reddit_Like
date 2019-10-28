// Log in implementation

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#log-in');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        userObj = { email, password }
        
        fetch('http://localhost:8080/reddit-monolith/login', {
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
            if (data.httpStatus === "BAD_REQUEST") throw data.message
                     
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