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

// CREATES GIF CONTAINER AND PUTS THE GIF IN IT
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

// LISTENES TO WHICH CATEGORY THE USER PICKED
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

// DELETES OLD GIFS
function deleteOldContent(){
  var gifContainers = gifWrapper.querySelectorAll('.gifContainer');
  for(var x = 0; x < gifContainers.length; x++){
    gifWrapper.removeChild(gifContainers[x]);
  }
}

// UPDATES API KEY AND CREATES NEW GIFS
function updateApiKey(){
  ourRequest.open('GET', api_key);
  ourRequest.onload = function(){
    ourData = JSON.parse(ourRequest.responseText);
    createGif(ourData);
  };
  ourRequest.send();
}

// LOOKS AT THE INPUT VALUE AND CHANGES THE API KEY
var searchBtn = document.getElementsByClassName('searchBar_btn')[0];
var searchInput = document.getElementById('searchInput');
searchBtn.addEventListener('click', searchGifs);
function searchGifs(){
  var searchInputValue = searchInput.value;

  if(searchInputValue){
    api_key = 'http://api.giphy.com/v1/gifs/search?q=' + searchInputValue + '&api_key=8wEih3Gu7pXaPfNAWqBYhON7T8UTUFz9&limit=40';
    title.innerHTML = searchInputValue;
    deleteOldContent();
    updateApiKey();
    searchInput.value = '';
  }else if(searchInputValue === ''){
    return;
  }
}

// TAKES CARE OF THE SEARCH BAR FOR MOBILE DEVICES
var searchBtnMobile = document.getElementsByClassName('search_btn')[0];
var searchBar = document.getElementsByClassName('searchBar')[0];
searchBtnMobile.addEventListener('click', openSearchInputMobile);
function openSearchInputMobile(){
  if(searchBar.offsetWidth == '0'){
    searchBar.style.width = '90%';
    searchBar.style.boxShadow = '0px 0px 76px 20px rgba(0,0,0,0.75)';
  }else{
    searchBar.style.width = '0';
    searchBar.style.boxShadow = '';
  }
}

searchInput.addEventListener('keypress', function(e){
  var key = e.wich || e.keyCode;
  if(key === 13){ //key code for 'Enter' is 13
    searchGifs();
  }
});

// REMOVES SearchBarMobile on Desktop
window.addEventListener('resize', function(){
  var screenWidth = window.innerwidth || document.documentElement.clientWidth;
  if(screenWidth > 397){
    searchBar.style.width = '';
    searchBar.style.boxShadow = '';

      sideNav.style.position = '';
      sideNav.style.top = '';
      sideNav.childNodes[1].style.paddingTop = '';
  }
});



// MAKES NAV STICKY ON SCROLL
var nav = document.getElementsByTagName('nav')[0];
var sideNav = document.getElementsByClassName('sideNav')[0];
window.onscroll = function(){stickyNav();};
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


// DROP DOWN MENU
var menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', dropDownMenu);
function dropDownMenu(){
  if(menuBtn.checked){
    sideNav.style.height = '150px';
  }else{
    sideNav.style.height = '0px';
  }
}

// FAVORITE
var favoriteBtn = document.getElementsByClassName('favorite')[0];
favoriteBtn.addEventListener('click', addToFavorite);
function addToFavorite(){
  alert('Feature coming soon!');
}
