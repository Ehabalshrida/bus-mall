'use strict';

let imgArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg',
  ];

// Constructor
// New obj
// prototype render
// Random function
// get by id
// Event Handler

let all = [];
let counter = 0;
let numberOfRound = 25;

const imageSection = document.getElementById('imageSection');
let img1 = document.getElementById( 'img1' );
let img2 = document.getElementById( 'img2' );
let img3 = document.getElementById( 'img3' );
let result = document.getElementById( 'result' );
let random1 ;
let random2 ;
let random3 ;
let resultButton = document.getElementById('viewResults');
function mall( name, imageSrc ) {
  this.name = name;
  this.image = imageSrc;
  this.shown = 0;
  this.clicks =0;
  mall.all.push( this );
}

mall.all = [];

for( let i = 0; i < imgArray.length; i++ ) {
  new mall( imgArray[i].split( '.' )[0], imgArray[i] );
}

console.log( mall.all );


function render() {
   random1 = getRandomNumber( 0, imgArray.length - 1 );
   random2 = getRandomNumber( 0, imgArray.length - 1 );
   random3 = getRandomNumber( 0, imgArray.length - 1 );

  let randomArr=[random1 ,random2,random3];
  if (random1 === random2){
  random2 = getRandomNumber( 0, imgArray.length - 1 );
  }
  if (random2 === random3){
    random3= getRandomNumber( 0, imgArray.length - 1 );
    }
    if (random3=== random1){
        random1 = getRandomNumber( 0, imgArray.length - 1 );
        }

  img1.src = './img/' + mall.all[random1].image;
  img2.src = './img/' + mall.all[random2].image;
  img3.src = './img/' + mall.all[random3].image;

  mall.all[random1].shown++;
  mall.all[random2].shown++;
  mall.all[random3].shown++;


}
render();

imageSection.addEventListener('click',clickvote);
function clickvote(event) {
  if((event.target.id === 'img1' || event.target.id === 'img2'|| event.target.id === 'img3') && counter < numberOfRound) {
    if (event.target.id === 'img1') {
    mall.all[random1].clicks++;
    render();
    counter++;}
    if (event.target.id === 'img2') {
     mall.all[random2].clicks++;
     render();
    counter++;}
     if (event.target.id === 'img3') {
     mall.all[random3].clicks++;
     render();
    counter++;}
    
}
  }
  


function getRandomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}


if(counter === numberOfRound){
 imageSection.removeEventListener('click',clickvote);
}







resultButton.addEventListener('click',voteResults );
function voteResults(){
for ( let i = 0; i < mall.all.length; i++){
    let list = document.createElement('li');
    list.textContent = `${mall.all[i].name} recive ${mall.all[i].clicks} clicks, and was seen ${mall.all[i].shown} times`;
    result.appendChild(list)}}

