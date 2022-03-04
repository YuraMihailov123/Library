let but = document.getElementById("b3");
let but2 = document.getElementById("b2");
let but1 = document.getElementById("b1");
let but_edl = document.getElementsByName("Delete");

for(let i=0;i<but_edl.length;i++){
    but_edl[i].onclick = ()=>{
        let o ={
            id: but_edl[i].id,
            name: null,
            data: null
        };
        addRequest_d(o);
        window.location = "/index";
    }
}
//del_butt.onclick=()=>{
//    addRequest({id:1},'/filter2');
//    window.location = "/booksShow";
//};

but.onclick =() =>{
    addRequest({id:1},'/filter2');
    window.location = "/listOfBooks";
};
but2.onclick =() =>{
    addRequest({id:1},'/filter1');
    window.location = "/listOfBooks";
};
but1.onclick =() =>{
    addRequest({id:1},'/filter0');
    window.location = "/listOfBooks";
};
function addRequest(body,type) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState===4 && this.status === 400) {
            alert(JSON.parse(this.responseText).message);
        }
    };
    xhttp.open("PUT", type, true);
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(JSON.stringify(body,null,2));
    //body =null;
}
function addRequest_d(body) {
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