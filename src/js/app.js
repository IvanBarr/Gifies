var title = document.getElementsByClassName('title')[0];

var ourData;
var api_key = 'http://api.giphy.com/v1/gifs/trending?&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=40';
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
      api_key = 'http://api.giphy.com/v1/gifs/trending?&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=40';
    }else{
      api_key = 'http://api.giphy.com/v1/gifs/search?q=' + pickedCategory + '&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=40';
    }
    title.innerHTML = pickedCategory;
    deleteOldContent();
    updateApiKey();
  }
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


var searchBtn = document.getElementsByClassName('searchBar_btn')[0];
searchBtn.addEventListener('click', searchGifs);
function searchGifs(){
  var searchInput = document.getElementById('searchInput');
  var searchInputValue = searchInput.value;
  api_key = 'http://api.giphy.com/v1/gifs/search?q=' + searchInputValue + '&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=40';
  title.innerHTML = searchInputValue;
  deleteOldContent();
  updateApiKey();
  searchInput.value = '';
}


var nav = document.getElementsByTagName('nav')[0];
var sideNav = document.getElementsByClassName('sideNav')[0];
window.onscroll = function(){stickyNav();};
var mediaQueryMobile = window.matchMedia( "(max-width: 414px)" );


// ADD MEDIA QUERIES TO THE SIDENAV POSITION
function stickyNav(){
  var screenWidth = window.innerwidth || document.documentElement.clientWidth;
  if(window.pageYOffset >= 70){
    nav.classList.add('sticky');
    if(screenWidth < 414){
      sideNav.style.position = 'fixed';
      sideNav.style.top = '23px';
      sideNav.childNodes[1].style.paddingTop = '20px';
    }else{
      sideNav.style.position = '';
      sideNav.style.top = '';
      sideNav.childNodes[1].style.paddingTop = '';
    }
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


// var screenWidth = window.innerwidth || document.documentElement.clientWidth;
// // window.onload = function(){
// //   if(screenWidth > 414){
// //     sideNav.style.position = '';
// //     sideNav.style.color = 'red';
// //     sideNav.style.top = '';
// //     sideNav.childNodes[1].style.paddingTop = '';
// //   }else{
// //     sideNav.style.color = '';
// //   }
// // }
// //
// // window.addEventListener('resize', function(){
// //   var screenWidth = window.innerwidth || document.documentElement.clientWidth;
// //   if(screenWidth > 414){
// //     screenWidth = screenWidth;
// //     sideNav.style.position = '';
// //     sideNav.style.color = 'red';
// //     sideNav.style.top = '';
// //     sideNav.childNodes[1].style.paddingTop = '';
// //   }else{
// //     sideNav.style.color = '';
// //   }
// // })
