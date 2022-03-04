let loggButton =document.getElementById("admin");
let loggUsername = document.getElementById("1");
let loggPassword = document.getElementById("2");
let username = 'admin';
let password = 'admin';

loggButton.onclick=()=>{

    if(loggUsername.value === '' || loggPassword.value === '') {
        alert("Логин или пароль не введены!");
        return;
    }
    if(loggUsername.value !== username || loggPassword.value !== password) {
        alert("Логин или пароль введены неверно!");
        return;
    }
    addRequest('/logged/1');
    window.location = "/index";
};


function addRequest(type) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState===4 && this.status === 400) {
            //window.location = "/index";
        }
    };
    xhttp.open("GET", type, true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(null);
    //body =null;
    //
}