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
const movimientos = document.querySelector('#movimientos');
const transferencia = document.querySelector('#transferencias')

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
    currentBalance.innerHTML = `Tu saldo actual es  <h3>$${saldo}</h3>
                  <ul>
                    <li>Capacidad máxima del cajero 990coins</li>
                    <li>el monto mínimo obligatorio es de 10 coins en la cuenta</li>
                  </ul>`
    

});



//Procedimiento de deposito de dinero

ejecutarDeposito.addEventListener('click', () => {
    abrirModal();
    
    const {saldo} = JSON.parse(window.sessionStorage.getItem('currentUser'));
    depositoModal.innerHTML = 
    `<h2 class = "titleDeposit">Depositar</h2>
    <input id='nuevoDeposito' placeholder = 'Ingresar Monto' type='number'></input>
    <button id='depositarDinero'>Depositar</button>

    <div id = 'infoValorDepositado'>
    <label class = 'labelValor'>El valor depositado es:</label> <h5 id = 'valorDeposito'></h5>
    </div>
    <div id = 'infoSaldoIncremento'>
    <label class = 'labelSaldoActual'>El saldo actual es:</label><h5 id='saldoIncremento'></h5>
    </div>
    <h5 class = 'msgAlertDeposit'></h5>`
    

    
    

    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'))
    const saldoActual = Number(currentUser.saldo)
    const nuevoDeposito = document.querySelector('#nuevoDeposito');
    const submitDeposito = document.querySelector('#depositarDinero');
    const saldoIncremento = document.querySelector('#saldoIncremento');
    const valorDeposito = document.querySelector('#valorDeposito');
    const msgAlertDeposit = document.querySelector('.msgAlertDeposit');

    submitDeposito.addEventListener('click', () => {
        
        const updateCurrentUserDeposit = {
            ...currentUser,
            saldo: saldoActual + Number(nuevoDeposito.value),
        }

        if(updateCurrentUserDeposit.saldo > 990){
            msgAlertDeposit.innerHTML = 'El cajero tiene capacidad solo para 990 coins'

        }else {
            
            window.sessionStorage.setItem('currentUser', JSON.stringify(updateCurrentUserDeposit))
            valorDeposito.innerHTML = (updateCurrentUserDeposit.saldo - saldoActual);
            saldoIncremento.innerHTML = updateCurrentUserDeposit.saldo;      
        }
    });  
});

///Procedimiento de retiro de dinero
retirarDeposito.addEventListener('click', () => {
    abrirModal();
    const retirarModal = document.querySelector('#modal div');
    retirarModal.innerHTML = 

    `<h2 class = "titleRetiro">Retirar</h2>
    <input id='nuevoRetiro' placeholder = 'Ingresar Monto' type='number'></input>
    <button id='retirarDinero' class=''>Retirar</button>
    <div id= 'infoValorRetirado'>   
    <label class = 'labelValor'>El valor retirado es:</label><h5 id = 'valorRetirado'></h5>
    </div>
    <div id = 'infoSaldoEjecutado'>
    <label class = 'labelSaldoActual'>El saldo actual es:</label><h5 id= 'saldoEjecutado'></h5>
    </div>
    <h5 class = "msgAlert"><h5/>`
   
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));
    const saldoActual = Number(currentUser.saldo)
    const nuevoRetiro = document.querySelector('#nuevoRetiro');
    const submitRetiro = document.querySelector('#retirarDinero');
    const msgAlert = document.querySelector('.msgAlert');
    const valorRetiro = document.querySelector('#valorRetirado')
    const saldoEjecutado = document.querySelector('#saldoEjecutado')

    submitRetiro.addEventListener('click', () => {

            const updateCurrentUserRetira = {
                ...currentUser,
                saldo: saldoActual - Number(nuevoRetiro.value),
            }

        if(updateCurrentUserRetira.saldo < 10){
            msgAlert.innerHTML = 'El valor ingresado está por debajo del límite mínimo de su cuenta'
        
        }else{
            window.sessionStorage.setItem('currentUser', JSON.stringify(updateCurrentUserRetira));
            valorRetiro.innerHTML = (saldoActual- updateCurrentUserRetira.saldo);
            saldoEjecutado.innerHTML = updateCurrentUserRetira.saldo
        } 
        
    })
});

//Procedimiento consulta de movimientos

movimientos.addEventListener('click', () => {
    abrirModal();
    const queryMovimiento = document.querySelector('#modal div')
    queryMovimiento.innerHTML = `<h1>Registro de movimientos</h1> 
    <div id = 'infoFecha'></div>
    <div id = 'infoUsuario'></div>
    <div id = 'infoTipoMovimiento'></div>`


})

//Procedimiento transferencia bancaría 

transferencia.addEventListener('click', () => {
    abrirModal();
    const{cuenta} = JSON.parse(window.sessionStorage.getItem('currentUser'))
    const transferir = document.querySelector('#modal div');
    transferir.innerHTML = `<h1>Transferencia</h1>
    <input id = 'montoTransferencia' placeholder = 'Ingrese valor' type = 'number'></input>
    <input id = 'inNumeroCuenta' placeholder = 'Número de cuenta' type = 'number'></input>
    <button id = 'transferir'>Transferir</button>
    <div id = 'infoValorTransferido'>
    <label class = 'labelValorTransferido'>El valor transferido es:</label><h5 id = 'valorTransferido'></h5>
    </div>
    <div id = 'infoSaldoActual'>
    <laber class = 'labelValorT'>Su saldo actual es:</label><h5 id = 'saldoTransferido'></h5>
    </div>
    <h5 class = 'msgUsuarioFinal'></h5>`
    
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'))
    const inNumeroCuenta = document.querySelector('#inNumeroCuenta');
    const msgUsuarioFinal = document.querySelector('.msgUsuarioFinal');
    const saldoActualTransf = Number(currentUser.saldo)
    const nuevaTransferencia = document.querySelector('#montoTransferencia')

    const updateCurrentUserTransf = {
        ...currentUser,
        saldo: saldoActualTransf + Number(nuevaTransferencia.value)
    }
    if(currentUser.cuenta === Number(inNumeroCuenta.value) ){
        window.localStorage.setItem('currentUser', JSON.stringify(updateCurrentUserTransf))
        msgUsuarioFinal.innerHTML = `Usted realizo una tranferencia a ${currentUser.nombre}`;
    }
    else {
        msgUsuarioFinal.innerHTML = `No se encuentra el número de cuenta`
    }
    

})


closeButtonModal.addEventListener('click', () => {cerrarModal()
});

backdrop.addEventListener('click', () => { cerrarModal()
});

salir.addEventListener('click', () =>{ getOutProfile ()

});