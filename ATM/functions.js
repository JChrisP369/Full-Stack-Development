

const dataForm = (e) =>{
    e.preventDefault();
    const data = new FormData(formUser);
    const {loginEmail, loginPassword} = Object.fromEntries(data);
    console.log({loginEmail, loginPassword});
};




const functions = {
    dataForm
};

export default functions;