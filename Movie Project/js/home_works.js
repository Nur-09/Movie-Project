const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const redExp = /^[a-zA-Z0-9]+@gmail\.com$/

gmailButton.onclick = () => {
  if (redExp.test(gmailInput.value)) {
    gmailResult.innerHTML = 'SENT'
    gmailResult.style.color = 'green'
  } else {
    gmailResult.innerHTML = 'ERROR'
    gmailResult.style.color = 'red'
  }
}

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionW = 0;
let positionH = 0;

const moveBox = () => {
  if (positionW <= 450 && positionH === 0) {
    positionW += 1;
    childBlock.style.left = positionW + 'px';
  } else if (positionH <= 450 && positionW > 449) {
    positionH += 1;
    childBlock.style.top = positionH + 'px';
  } else if (positionW > 0) {
    positionW -= 1;
    childBlock.style.left = positionW + 'px';
  } else if (positionH > 0) {
    positionH -= 1;
    childBlock.style.top = positionH + 'px';
  }
  setTimeout(moveBox, 0);
};

moveBox();




const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const seconds = document.getElementById('seconds');

let timer = 0;
let timerId;
let switchers = false;

start.onclick = () => {
  if (!switchers) {
    switchers = true;
    timerId = setInterval(() => {
      timer++;
      seconds.innerHTML = timer;
    }, 1000);
  }
};

stop.onclick = () => {
  clearInterval(timerId);
  switchers = false;
};

reset.onclick = () => {
  clearInterval(timerId);
  timer = 0;
  seconds.innerHTML = '0';
  switchers = false;
};

const fetchCharacters = async () => {
  try {
    const response = await fetch('../data/characters.json');
    const data = await response.json();

    const charactersList = document.querySelector('.characters-list');
    data.forEach(character => {
      const card = document.createElement('div');
      const name = document.createElement('div');
      const age = document.createElement('div');
      const image = document.createElement('img');

      image.style.width = '290px'
      image.style.height = '300px';
      image.src = character.photo;

      card.style.border = '1px solid white';
      card.style.padding = '20px 25px';
      card.style.marginLeft = '20px';

      name.style.textAlign = 'center';
      name.style.paddingTop = '15px';
      name.style.fontSize = '25px';
      name.innerHTML = character.name;

      age.style.textAlign = 'center';
      age.style.paddingTop = '25px';
      age.style.fontSize = '30px';
      age.innerHTML = character.age;

      card.append(image, name, age);
      charactersList.append(card);
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
};

fetchCharacters();


const fetchAny = async () => {
  try {
    const response = await fetch('../data/any.json');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching any.json:', error);
  }
};

fetchAny();
