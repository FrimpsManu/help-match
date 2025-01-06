const signInForm = document.getElementById('signin-form');
const signUpForm = document.getElementById('signup-form');
const showSignUp = document.getElementById('show-signup');
const showSignIn = document.getElementById('show-signin');

showSignUp.addEventListener('click', () => {
    signInForm.classList.remove('active');
    signUpForm.classList.add('active');
});

showSignIn.addEventListener('click', () => {
    signUpForm.classList.remove('active');
    signInForm.classList.add('active');
});
