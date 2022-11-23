const saludo = document.querySelector('#saludo');
const modal = document.querySelector('#modal');
const backdrop = document.querySelector('#backdrop');
const closeButtonModal = document.querySelector('#modal span');
const currentBalance = document.querySelector('#modal div');
const ejecutarDeposito = document.querySelector('#deposito');
const consultaSaldo = document.querySelector('#saldo');
const retirarDeposito = document.querySelector('#retiro');
const saldoIncremento = document.querySelector('#saldoIncremento');
const salir = document.querySelector('#salir');
const depositoModal = document.querySelector('#modal div');


const abrirModal = () => {
    modal.classList.remove('hidden');
    backdrop.classList.remove('hidden');
}

const cerrarModal = () => {
    modal.classList.add('hidden')
    backdrop.classList.add('hidden')
}

const getOutProfile = () => {
    window.location.href = './index.html'
}

document.addEventListener('DOMContentLoaded', function(){
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));
    saludo.innerHTML = `Bienvenido al Banco Meta Bank World, ${currentUser.nombre}`
   
})


consultaSaldo.addEventListener('click', () => {
    //remover el hidden en modal
    abrirModal();

    //Pasar datos necesarios
    const {saldo} = JSON.parse(window.sessionStorage.getItem('currentUser')); //destructuración - comparar línea #9
    currentBalance.innerHTML = `Tu saldo actual es $ ${saldo}`
    

});



//Procedimiento de deposito de dinero

ejecutarDeposito.addEventListener('click', () => {
    abrirModal();
    
    const {saldo} = JSON.parse(window.sessionStorage.getItem('currentUser'));
    depositoModal.innerHTML = 
    `<h2 class = "titleDeposit">Depositar</h2>
    <input id='nuevoDeposito' placeholder = 'Ingresar Monto' type='number'></input>
    <button id='depositarDinero'>Depositar</button>
    <laber>El valor depositado es:</label><h5 id = 'valorDeposito'></h5>
    <label>El saldo actual es:</label><h5 id='saldoIncremento'></h5>`

    
    

    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'))
    const saldoActual = Number(currentUser.saldo)
    const nuevoDeposito = document.querySelector('#nuevoDeposito');
    const submitDeposito = document.querySelector('#depositarDinero');
    const saldoIncremento = document.querySelector('#saldoIncremento');
    const valorDeposito = document.querySelector('#valorDeposito');
    
    submitDeposito.addEventListener('click', () => {
        
        const updateCurrentUserDeposit = {
            ...currentUser,
            saldo: saldoActual + Number(nuevoDeposito.value),
    
        }
        window.sessionStorage.setItem('currentUser', JSON.stringify(updateCurrentUserDeposit))
        valorDeposito.innerHTML = (updateCurrentUserDeposit.saldo - saldoActual);
        saldoIncremento.innerHTML = updateCurrentUserDeposit.saldo;
            
        

    });
    
    
    
});
///Procedimiento de retiro de dinero
retirarDeposito.addEventListener('click', () => {
    abrirModal();
    const retirarModal = document.querySelector('#modal div');
    retirarModal.innerHTML = 

    `<input id='nuevoRetiro' placeholder = 'Ingresar Monto a retirar' type='number'></input>
    <button id='retirarDinero' class=''>Retirar</button>
    <h5 class = "msgAlert"><h5/>   
    <laber>El valor retirado es:</label><h5 id = 'valorRetirado'></h5>
    <label>El saldo actual es:</label><h5 id= 'saldoEjecutado'></h5>`
    

    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));
    const saldoActual = Number(currentUser.saldo)
    const nuevoRetiro = document.querySelector('#nuevoRetiro');
    const submitRetiro = document.querySelector('#retirarDinero');
    const msgAlert = document.querySelector('.msgAlert');

    submitRetiro.addEventListener('click', () => {

            const updateCurrentUserRetira = {
                ...currentUser,
                saldo: saldoActual - Number(nuevoRetiro.value),
            }

        if(Number(nuevoRetiro.value) >= saldoActual){
            msgAlert.innerHTML = 'No tiene saldo suficiente'
        
        }else{
            window.sessionStorage.setItem('currentUser', JSON.stringify(updateCurrentUserRetira));

        } 
        
    })
});

closeButtonModal.addEventListener('click', () => {cerrarModal()
});

backdrop.addEventListener('click', () => { cerrarModal()
});

salir.addEventListener('click', () =>{ getOutProfile ()

});