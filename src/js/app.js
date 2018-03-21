console.log('hello!');
var ivan = true;
// if(!ivan){
//     console.log('not ivan!');
// }
var ourData;
var api_key = 'http://api.giphy.com/v1/gifs/trending?&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=10';
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', api_key);
ourRequest.onload = function(){
  ourData = JSON.parse(ourRequest.responseText);
  console.log(ourData);
  createImg(ourData);
};
ourRequest.send();

var container = document.getElementsByClassName('testObj')[0];
var img = document.createElement('IMG');
function createImg(data){
  img.src = data.data[0].images.downsized.url;
  container.appendChild(img);
}

var catBtn = document.getElementById('catBtn');
catBtn.addEventListener('click', showCats);
function showCats(){
  api_key = 'http://api.giphy.com/v1/gifs/search?q=cats&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=5';
  ourRequest.open('GET', api_key);
  ourRequest.send();
  console.log(ourData);
}
