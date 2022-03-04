let butt = document.getElementById("buttAdd");

butt.onclick = () =>{
    checkEmpty();
};
let name = document.getElementById("textInputName");
let data = document.getElementById("textInputData");
let author = document.getElementById("textInputA");
//let stock = document.getElementById("textInputS");
function checkEmpty() {
    if(name.value==='' || data.value===''){
        alert("Пустые поля!\nЗаполните значениями!")
    }else addToDB();
}

function addToDB() {


    let o ={
        id: 0,
        name: name.value,
        data: data.value,
        author: author.value,
        stock: "Yes",
        return_date: null,
        surname: null,
        name_t: null
    };
    addRequest(o);
    //sessionStorage.setItem("1",JSON.stringify(o));
    window.location = "/index";

}
function addRequest(body) {
    const xhttp = new XMLHttpRequest();
    xhttp.onloadend = function() {
        if(xhttp.status == 404)
            throw new Error(ajaxAdd + ' replied 404');
    }
    xhttp.open("PUT", '/ajaxAdd', true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(body,null,2));
}


