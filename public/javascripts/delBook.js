let butt = document.getElementById("buttDel");

butt.onclick = () =>{
    checkEmpty();
};
let selectOpt = document.getElementById("selDel");

let paramDel = document.getElementById("textInputInfo");

function checkEmpty() {
    console.log(selectOpt.value);
    if(paramDel.value===""){
        alert("Empty placeholder!\nEnter values!")
    }else
        addToJSONFile();
}

function addToJSONFile() {
    let o ={
        id: null,
        name: null,
        data: null
    };
    if(selectOpt.value==="1")
        o.id = paramDel.value;
    if(selectOpt.value==="2")
        o.name = paramDel.value;

    console.log(paramDel.value);
    console.log(o);
    addRequest(o);
    //console.log(id.value+"-"+name.value+"-"+data.value);
    //sessionStorage.setItem("1",JSON.stringify(o));
    window.location = "/index";

}
function addRequest(body) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState===4 && this.status === 400) {
            alert(JSON.parse(this.responseText).message);
        }
    };
    xhttp.open("DELETE", '/ajaxDel', true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(body,null,2));
    //body =null;
}
