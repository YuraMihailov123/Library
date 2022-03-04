var express = require('express');
var router = express.Router();
var books = []
let filter_t=0;
var logged = false
sendRequestToPhp("SELECT * FROM booksList","GET","getData.php")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('logging', { title: 'Вход' });
  console.log(req.method+" "+req.url);
});

router.get('/logged/:logg([0-9]{1})', function(req, res, next) {

    switch (req.params.logg){
        case "0": logged = false; break;
        case "1": logged = true; break;
    }
    res.render('index', { title: 'Библиотека' , isLogged: logged});
    console.log(req.method+" "+req.url);
});

router.get('/index', function(req, res, next) {

    res.render('index', { title: 'Библиотека', isLogged: logged});
    console.log(req.method+" "+req.url);
});

router.get('/AddBook', function(req, res, next) {
    res.render('AddBook', { title: 'Добавление книги' });
    console.log(req.method+" "+req.url);
    next();
});

router.get('/listOfBooks', function(req, res, next) {
    res.render('listOfBooks', { title: 'Список книг' ,books: books,filter:filter_t , isLogged: logged});
    console.log(req.method+" "+req.url);
    next();
});

router.get('/book/:id([a-zA-Z0-9]{1,})', (req, res, next) => {
    const id = req.params.id;
    var book = books.find(b => b.id === id);
    if (book) {
        res.render('bookID', { title: 'Детальная информация по книге ' + book.name, book: book, isLogged: logged});
    }
    next();
});

router.get('/DeleteBook', function(req, res, next) {
    res.render('DeleteBook', { title: 'Удаление книги' });
    console.log(req.method+" "+req.url);
    next();
});

router.put('/ajaxAdd', (req, res) => {
    console.log(req.method+" "+req.url+"++");
    //req.body.id = shortid.generate();
    console.log(req.body.id);
    var sql = "INSERT INTO booksList (id,name,data,author,stock,return_date,surname,name_t) " +
        "VALUES ('"+books.length+"','"+req.body.name+"','"+req.body.data+"', '"+req.body.author+"','"+req.body.stock+"','"+req.body.return_date+"','"+req.body.surname+"','"+req.body.name_t+"')";
    sendRequestToPhp(sql,"POST","postData.php")
    //sendRequestToPhp("SELECT * FROM booksList","GET","getData.php")
    res.status(200);
});

router.put('/ajaxTake', function(req, res, next) {//----------------------
    console.log(req.method+" "+req.url+"++");
    //req.body.id = shortid.generate();
    var book = req.body;
    console.log(book);

    var sql = "UPDATE booksList SET stock='No', return_date='"+book.return_date+"', surname='"+book.surname+"', name_t='"+book.name_t+"' WHERE id='" + book.id + "'";
    sendRequestToPhp(sql, "POST", "postData.php")
    //sendRequestToPhp("SELECT * FROM booksList", "GET", "getData.php")

    res.status(200);
});

router.put('/ajaxPut', function(req, res, next) {//----------------------
    console.log(req.method+" "+req.url+"++");
    //req.body.id = shortid.generate();
    var book = req.body;
    console.log(book);

    var sql = "UPDATE booksList SET stock='Yes', return_date='"+book.return_date+"' WHERE id='" + book.id + "'";
    sendRequestToPhp(sql, "POST", "postData.php")
    //sendRequestToPhp("SELECT * FROM booksList", "GET", "getData.php")

    res.status(200);
});

router.put('/ajaxChange', function(req, res, next) {//----------------------
    console.log(req.method+" "+req.url+"++");
    //req.body.id = shortid.generate();
    var book = req.body;
    console.log(book);

    var sql = "UPDATE booksList SET name='"+book.name+"', author='"+book.author+"', data='"+book.data+"' WHERE id='" + book.id + "'";
    sendRequestToPhp(sql, "POST", "postData.php")
    //sendRequestToPhp("SELECT * FROM booksList", "GET", "getData.php")
    res.status(200);
});


router.delete('/ajaxDel', (req,res) => {
    var book = req.body;
    console.log(book.name+"=="+book.id+"-====");
    if(book.name == null) {
        var sql = "DELETE FROM booksList WHERE id='" + book.id + "'";
        sendRequestToPhp(sql, "DELETE", "postData.php")
    }else {
        sql = "DELETE FROM booksList WHERE name='" + book.name + "'";
        sendRequestToPhp(sql, "DELETE", "postData.php")
    }
    res.render('listOfBooks', { title: 'Список книг' ,books: books,filter:filter_t});
    //sendRequestToPhp("SELECT * FROM booksList", "GET", "getData.php",true)
    res.status(200);
});

router.put('/filter0', function(req, res,next) {
    //res.render('booksShow', { title: 'Delete book' ,books: books.arr,filter:2});
    console.log(req.method+" "+req.url);
    res.statusCode =200;
    filter_t=0;
});
router.put('/filter1', function(req, res,next) {
    //res.render('booksShow', { title: 'Delete book' ,books: books.arr,filter:2});
    console.log(req.method+" "+req.url);
    res.statusCode =200;
    filter_t=1;
});
router.put('/filter2', function(req, res,next) {
    //res.render('booksShow', { title: 'Delete book' ,books: books.arr,filter:2});
    console.log(req.method+" "+req.url);
    res.statusCode =200;
    filter_t=2;
});

router.get('*', (req, res) => {
    res.status(404);
});

function sendRequestToPhp(str,method,phpFile, updateBook = false){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText + " -");
            books = JSON.parse(this.responseText);

        }
    };
    //делаем запрос в php-скрипт с параметром sql-запроса 'q' ( в php-скрипте как раз таки получаем эту 'q')
    xmlhttp.open(method, "http://localhost/"+phpFile+"?q=" + str, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send();
}

module.exports = router;