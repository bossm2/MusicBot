//#region
const cheerio = require('cheerio')
const $ = cheerio.load(`<!DOCTYPE html>
<html>
<head>
<style>
ul {
list-style-type: none;
margin: 0;
padding: 0;
overflow: hidden;
background-color: #333333;
}

li {
float: left;
}

li a {
display: block;
color: white;
text-align: center;
padding: 16px;
text-decoration: none;
}

li a:hover {
background-color: #111111;
}
</style>
</head>
<body>

<ul>
<li><a href="#home">Home</a></li>
<li><a href="#news">News</a></li>
<li class="aa" id="aaa"><a href="#contact">Contact</a></li>
<li><a href="#about">About</a></li>
</ul>

</body>
</html>`)
//#endregion


$('h2.title').text('Hello there!')
$('h2').addClass('welcome')
$('.title').text()
console.log($.html());
console.log($('#aaa').eq(0).text());
console.log($('li').children().get(0).tagName);
console.log($('li').html().get(0).text());

var hobbies = [];
$('li').each(function (i, e) {
    hobbies[i] = $(this).text();
    console.log(hobbies[i]);
});


console.log($('li').eq(2).attr().id);


let filteredEls = $('*').filter(function (i, el) {
    // this === el
    console.log($(this).length);
    return $(this).length = 1;
});
// console.log(filteredEls.text());
let items = filteredEls.get();
console.log(filteredEls.get());
items.forEach(e => {
    console.log(e);
    console.log(e.name);
});


$(".info").each(function(i, item){
    console.log($("strong a", item).text())
});


// search for a and b
$('div.post,div.title')
//search for b inner a
$('div.post  div.title')

$('div  #downloads a').each(function (i, e) {
    hobbies[i] = $(this).text();
    hobbies[i] = $(this).attr('href');
    console.log(hobbies[i]);
});
// browser =  puppeteer.launch();
// page = browser.newPage();
// setInterval(function(){

// (async () => {
    
    
        
//         await page.goto(turlest, {waitUntil: 'load'});

//         const newPage = await page.evaluate(() => {
//         return  document.getElementsByClassName('ft-more')[0].outerText
//         });
        
//     console.log(newPage)

// })()
// },9000)

// console.log('newPage')

// //console.log(turlest)