// TAP SLIDER 

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabContentItems = document.querySelectorAll('.tab_content_item');
const tabParents = document.querySelector('.tab_content_items');
let indexCurrent = 0;
let switchAutoInterval;

const hideTabContent = () => {
  tabContentBlocks.forEach(item => {
    item.style.display = 'none';
  });
  tabContentItems.forEach(item => {
    item.classList.remove('tab_content_item_active');
  });
};

const showTabContent = (i = 0) => {
  tabContentBlocks[i].style.display = 'block';
  tabContentItems[i].classList.add('tab_content_item_active');
  indexCurrent = i;
};

const startAutoSwitch = () => {
  switchAutoInterval = setInterval(() => {
    hideTabContent();
    indexCurrent = (indexCurrent + 1) % tabContentBlocks.length;
    showTabContent(indexCurrent);
  }, 1000);
};

const stopAutoSwitch = () => {
  clearInterval(switchAutoInterval);
  startAutoSwitch();
};

hideTabContent();
showTabContent(0);
startAutoSwitch();

tabParents.onclick = (event) => {
  if (event.target.classList.contains('tab_content_item')) {
    tabContentItems.forEach((item, i) => {
      if (event.target === item) {
        stopAutoSwitch();
        hideTabContent();
        showTabContent(i);
      }
    });
  }
};


const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')


somInput.oninput = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '../data/converter.json')
  request.setRequestHeader('Content-type', 'application/json')
  request.send()
  request.onload = () => {
    const data = JSON.parse(request.response)
    if (somInput.value === '') {
      usdInput.value = ''
      eurInput.value = ''
    } else {
      usdInput.value = (somInput.value / data.usd).toFixed(2)
      eurInput.value = (somInput.value / data.eur).toFixed(2)
    }
  }
}

usdInput.oninput = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '../data/converter.json')
  request.setRequestHeader('Content-type', 'application/json')
  request.send()
  request.onload = () => {
    const data = JSON.parse(request.response)
    if (usdInput.value === '') {
      somInput.value = ''
      eurInput.value = ''
    } else {
      somInput.value = (usdInput.value * data.usd).toFixed(2)
      eurInput.value = (somInput.value / data.eur).toFixed(2)
    }
  }
}

eurInput.oninput = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '../data/converter.json')
  request.setRequestHeader('Content-type', 'application/json')
  request.send()
  request.onload = () => {
    const data = JSON.parse(request.response)
    if (eurInput.value === '') {
      somInput.value = ''
      usdInput.value = ''
    } else {
      somInput.value = (eurInput.value * data.eur).toFixed(2)
      usdInput.value = (somInput.value / data.usd).toFixed(2)
    }
  }
}



//  CARD SWITCHER

const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');

let cardId = 1;
const maxCards = 200;

const updateCard = () => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
    .then(response => response.json())
    .then(data => {
      const { title, completed, id } = data
      cardBlock.innerHTML = `
        <p>Title: ${title}</p>
        <p>Completed: ${completed}</p>
        <span>ID: ${id}</span>`;
    });
};


updateCard(cardId);

btnNext.onclick = () => {
  cardId++;
  if (cardId > maxCards) {
    cardId = 1;
  }
  updateCard();
};

btnPrev.onclick = () => {
  cardId--;
  if (cardId < 1) {
    cardId = maxCards;
  }
  updateCard();
};


fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => console.log(data));




// WEATHER

const searchButton = document.querySelector('#search')
const searchInput = document.querySelector('.cityName')
const temp = document.querySelector('.temp')
const city = document.querySelector('.city')

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

searchButton.onclick = () => {
  if (searchInput.value === '') {
    city.innerHTML = 'VVedite nazvani city'
    temp.innerHTML = ''
    city.style.color = 'red'
    return

  }
  fetch(`${BASE_URL}?q=${searchInput.value}&appid=${API_KEY}&units=metric&lang=en`)
    .then(response => response.json())
    .then(data => {
      city.innerHTML = data.name || `City is not`
      temp.innerHTML = data.main.temp ? Math.round(data.main.temp) + '&deg;C' : ''
      city.style.color = 'white'
    })
  searchInput.value = ''
}

// optional chaining 

const data = {
  main: {
    temp : '11'
  }
}