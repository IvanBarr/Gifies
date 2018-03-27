var title = document.getElementsByClassName('title')[0];

var ourData;
var api_key = 'http://api.giphy.com/v1/gifs/trending?&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=20';
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', api_key);
ourRequest.onload = function(){
  ourData = JSON.parse(ourRequest.responseText);
  title.innerHTML = 'Trending';
  console.log(ourData);
  createGif(ourData);
};
ourRequest.send();

var gifWrapper = document.getElementById('gifWrapper');

function createGif(data){
  for(var i = 0; i < data.data.length; i++){

    var gifContainer = document.createElement("DIV");
    gifContainer.className = 'gifContainer';

    var img = document.createElement('IMG');
    img.src = data.data[i].images.preview_webp.url;
    gifContainer.appendChild(img);
    gifWrapper.appendChild(gifContainer);
  }
}

var categories = document.getElementById('categories');
categories.addEventListener('click', pickCategory);

function pickCategory(event){
  var target = event.target;
  var targetTextValue;
  var pickedCategory;
  if(target && target.nodeName == 'LI'){
    targetTextValue = target.innerText;
    pickedCategory = targetTextValue.toString();
    if(pickedCategory === 'Trending'){
      api_key = 'http://api.giphy.com/v1/gifs/trending?&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=20';
    }else{
      api_key = 'http://api.giphy.com/v1/gifs/search?q=' + pickedCategory + '&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=20';
    }
    title.innerHTML = pickedCategory;
    deleteOldContent();
    updateApiKey();
  }

  function deleteOldContent(){
    var gifContainers = gifWrapper.querySelectorAll('.gifContainer');
    for(var x = 0; x < gifContainers.length; x++){
      gifWrapper.removeChild(gifContainers[x]);
    }
  }

  function updateApiKey(){
    ourRequest.open('GET', api_key);
    ourRequest.onload = function(){
      ourData = JSON.parse(ourRequest.responseText);
      createGif(ourData);
    };
    ourRequest.send();
  }
}


var nav = document.getElementsByTagName('nav')[0];
var sideNav = document.getElementsByClassName('sideNav')[0];
window.onscroll = function(){stickyNav();};

function stickyNav(){
  if(window.pageYOffset >= 70){
    nav.classList.add('sticky');
    sideNav.style.position = 'fixed';
    sideNav.style.top = '24px';
    sideNav.childNodes[1].style.paddingTop = '20px';
  }else{
    nav.classList.remove('sticky');
    sideNav.style.position = '';
    sideNav.style.top = '';
    sideNav.childNodes[1].style.paddingTop = '';
  }
}

var menuBtn = document.getElementById('menuBtn');

menuBtn.addEventListener('click', dropDownMenu);
function dropDownMenu(){
  if(menuBtn.checked){
    sideNav.style.height = '150px';
  }else{
    sideNav.style.height = '0px';
  }
}
