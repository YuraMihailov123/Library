let buttTAke =document.getElementById("buttTake");
let TAke =document.getElementById("Take");
let Cancel =document.getElementById("Cancel");
let buttPut =document.getElementById("buttPut");
let surname =document.getElementById("idSur");
let name_t =document.getElementById("idN");
let save_but = document.getElementById("buttSave");
let ch_name = document.getElementById("1");
let ch_author = document.getElementById("2");
let ch_data = document.getElementById("3");
if(save_but !== null) {
    save_but.onclick = () => {
        let o = {
            id: document.location.href.split('book/')[1],
            name: ch_name.value,
            data: ch_data.value,
            author: ch_author.value,
            stock: "Yes",
            return_date: null,
            surname: null,
            name_t: null
        };
        addRequest(o, '/ajaxChange');
        alert("Сохранено!")
        //window.location = "/listOfBooks";
    };
}
buttPut.onclick = () =>{
    let o ={
        id: document.location.href.split('book/')[1],
        name: null,
        data: null,
        author: null,
        stock: "Yes",
        return_date: null,
        surname:null,
        name_t:null
    };

    console.log(o);
    addRequest(o,'/ajaxPut');
    alert("Вы вернули книгу!")
    window.location = "/listOfBooks";
};



function showModalWin() {

    var darkLayer = document.createElement('div'); // слой затемнения
    darkLayer.id = 'shadow'; // id чтобы подхватить стиль
    document.body.appendChild(darkLayer); // включаем затемнение

    var modalWin = document.getElementById('popupWin'); // находим наше "окно"
    modalWin.style.display = 'block'; // "включаем" его
    Cancel.onclick=()=>{
        darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
        modalWin.style.display = 'none'; // делаем окно невидимым
        return false;
    };
    darkLayer.onclick = function () {  // при клике на слой затемнения все исчезнет
        darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
        modalWin.style.display = 'none'; // делаем окно невидимым
        return false;
    };
}

TAke.onclick = ()=>{
    if(surname.value === "" || name_t.value==="")
        alert("Введите необходимые данные для взятия книги!");
    else {
        var a = new Date();
        let o = {
            id: document.location.href.split('book/')[1],
            name: null,
            data: null,
            author: null,
            stock: "No",
            return_date: null,
            surname:surname.value,
            name_t:name_t.value
        };
        if ((a.getMonth() + 1) + 1 <= 12)
            o.return_date = a.getFullYear() + "-" + (a.getMonth() + 1 + 1) + "-" + a.getDate();
        if ((a.getMonth() + 1) + 1 > 12)
            o.return_date = (a.getFullYear() + 1) + "-" + "1" + "-" + a.getDate();
        console.log(o);
        addRequest(o,'/ajaxTake');

        window.location = "/listOfBooks";
        alert("Вы забрали книгу!")
    }
};

buttTAke.onclick = () =>{
    console.log("pressed");
    showModalWin();
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
