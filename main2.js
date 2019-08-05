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


// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')
// $('.title').text()
// console.log($.html());
// console.log($('#aaa').eq(0).text());
// console.log($('li').children().get(0).tagName);
// console.log($('li').html().get(0).text());

// var hobbies = [];
// $('li').each(function (i, e) {
//     hobbies[i] = $(this).text();
//     console.log(hobbies[i]);
// });


//console.log($('li').eq(2).attr().id);