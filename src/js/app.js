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
    }
    ourRequest.send();
  }
}