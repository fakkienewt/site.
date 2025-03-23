let signInForm = document.querySelector('#main-signin');
signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
        alert('Пожалуйста, заполните все поля.');
        return; 
    }

    let formData = new FormData(signInForm);
    let newUser = Object.fromEntries(formData);

    console.log('newUser', newUser);

    window.location.href = 'home.html';
})