const usuarioBD = [
    {
        nombre: 'Johao Cruz',
        email: 'jcruz@gmail.com',
        cuenta: 1,
        password: '12345',
        saldo: 989,
        log:[]
    },
    {
        nombre: 'Christian Cruz',
        email: 'ccruz@gmail.com',
        cuenta: 2,
        password: '123456',
        saldo: 11,
        log:[]
    },
    {
        nombre: 'Phelipe Cruz',
        email: 'pcruz@gmail.com',
        cuenta: 3,
        password: '1234567',
        saldo: 600,
        log:[{
            fecha: new Date(),
            monto: 100,
            type: "deposito"
        }
        ]
    }
]

const error = document.querySelector('.error')
const input = document.querySelector('input');
const form = document.querySelector('#login');

input.addEventListener('focus', () => {
    if(!error.classList.contains('hidden')){
        error.classList.add('hidden');
        form.requestFullscreen();
    }
})

form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form)
    const {email: loginEmail, password: loginPassword} = Object.fromEntries(data)
    console.log({loginEmail, loginPassword})
    if (loginEmail.length === 0){
        error.classList.remove('hidden');
        error.classList.add('alert-danger');
        error.innerHTML = 'El campo de usuario es obligatorio'
        return
    }
    const loginAttempt = usuarioBD.find(user => user.email === loginEmail && user.password === loginPassword)

    if(loginAttempt === undefined){
        error.classList.remove('hidden')
        error.classList.add('alert-danger')
        error.innerHTML = 'Error en los datos del login'
    } else {
        error.classList.remove('hidden')
        error.classList.add('alert-info')
        error.innerHTML = "Procesando credenciales..."
        window.sessionStorage.setItem('currentUser', JSON.stringify(loginAttempt))
        window.location.href = './atm.html'
    }
})