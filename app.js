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



let all = [];
let counter = 0;
let numberOfRound = 25;
var ctx = document.getElementById('myChart').getContext('2d');
const imageSection = document.getElementById('imageSection');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let result = document.getElementById('result');
let random1;
let random2;
let random3;
let resultButton = document.getElementById('viewResults');
function mall(name, imageSrc) {
  this.name = name;
  this.image = imageSrc;
  this.shown = 0;
  this.clicks = 0;
  mall.all.push(this);
}

mall.all = [];

for (let i = 0; i < imgArray.length; i++) {
  new mall(imgArray[i].split('.')[0], imgArray[i]);
}

console.log(mall.all);


function render() {

  do {
    random1 = getRandomNumber(0, imgArray.length - 1);
    random2 = getRandomNumber(0, imgArray.length - 1);
    random3 = getRandomNumber(0, imgArray.length - 1);
  } while ((random1 === random2) || (random2 === random3) || (random1 === random3))

  img1.src = './img/' + mall.all[random1].image;
  img2.src = './img/' + mall.all[random2].image;
  img3.src = './img/' + mall.all[random3].image;

  mall.all[random1].shown++;
  mall.all[random2].shown++;
  mall.all[random3].shown++;


}
render();

imageSection.addEventListener('click', clickvote);
function clickvote(event) {
  let preArr = [random1, random2, random3];
  let nexArr = [];
  if ((event.target.id === 'img1' || event.target.id === 'img2' || event.target.id === 'img3') && counter < numberOfRound) {
    if (event.target.id === 'img1') {
      mall.all[random1].clicks++;
      counter++;
    }
    if (event.target.id === 'img2') {
      mall.all[random2].clicks++;
      counter++;
    }
    if (event.target.id === 'img3') {
      mall.all[random3].clicks++;
      counter++;
    }

    do {
      render();
      nexArr = [random1, random1, random1];
    } while (!repeated(preArr, nexArr));
  }

  else if (counter >= numberOfRound) {
    resultButton.style.visibility = 'visible';
  }
}


function step1() {
  if (resultButton.textContent === 'reset') {
    window.location.reload();
  }
  else {
    imageSection.removeEventListener('click', clickvote);
    createChart();
    voteResults();

  }
}








function voteResults() {
  for (let i = 0; i < mall.all.length; i++) {
    let list = document.createElement('li');
    list.textContent = `${mall.all[i].name} recive ${mall.all[i].clicks} clicks, and was seen ${mall.all[i].shown} times`;
    result.appendChild(list)
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
let arr1 = [];
let arr2 = [];

function repeated(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        return false;
      }
    }
  }
  return true;
}
function createChart() {
  let arrShown = [];
  let arrClicks = [];
  let arrName = [];

  for (let i = 0; i<imgArray.length; i++) {
    arrShown.push(mall.all[i].shown)
    arrClicks.push(mall.all[i].clicks)
    arrName.push(mall.all[i].name)
  }

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrName,
      datasets: [{
        label: '# of shown',
        data: arrShown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'],
        borderColor: [
          'rgba(255, 99, 132, 1)'],
        borderWidth: 1
      },
      {
        label: '# of clicks',
        data: arrClicks,
        backgroundColor: [

          'rgba(54, 162, 235, 0.2)'],
        borderColor: [

          'rgba(54, 162, 235, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}