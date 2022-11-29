

 async function SendData(data,cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (cb) {
                cb(xhr.responseText)
            }
        }
    }
    xhr.open("POST", 'https://renzu_spawn/nuicb', true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data))
}

let getEl = function( id ) { return document.getElementById( id )}

window.addEventListener('message', function (table) {
    let event = table.data;
    if (event.close) {
        getEl('spawncontainer').style.display = 'none'
    }
    if (event.spawns) {
        getEl('spawncontainer').style.display = 'flex'
        getEl('spawn').innerHTML = ''
        for (const i in event.spawns) {
            let data = event.spawns[i]
            let ui = `<div class="card">
            <div class="card-img" style="background:url(/web/images/${data.name}.png);background-size: cover;" onclick="preview('${data.name}')">
            </div>
            <div class="card-title">
                <h2>${data.label}</h2>
            </div>
            <div class="card-text">
                <p>Info: ${data.info}</p>
            </div>
            <button type="button" class="card-btn" onclick="spawn('${data.name}')">Spawn</button>
        </div>`
        getEl('spawn').insertAdjacentHTML("beforeend", ui)
        }
        containerHeightValue = document.querySelector('.spawn-container').offsetHeight;
        //containerChildValue = document.querySelector('.spawn-container').childElementCount;
        containerChildValue = document.querySelectorAll('.card');
        cardWidth = document.querySelector('.card').offsetWidth;
            //Places buttons on load.
            window.addEventListener('load', () => {
            screenStyles();

        });


        //Adjusts buttons on window resize.
        window.addEventListener('resize', (event) => {
            screenStyles();

        });
    }
})

function spawn(name) {
    SendData({msg : 'spawn', name : name})
}

function preview(name) {
    console.log('aso')
    SendData({msg : 'preview', name : name})
}

//Select elements and getting measurements for button placements.
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const prevPos = document.querySelector('.prev-cont');
const nextPos = document.querySelector('.next-cont');

const prevWidth = prev.offsetWidth;
const nextWidth = next.offsetWidth;
const prevHeight = next.offsetHeight;
const nextHeight = next.offsetHeight;
let cardWidth = ''
let containerHeightValue = ''
let containerChildValue = ''


//adjust button styles based on screen size.
const screenStyles = function () {
    const containerWidthValue = document.querySelector('.spawn-container').offsetWidth;
 
}

let count = 0;

let tracker = 0;

//Action for Next button
const moveCardsLeft = function () {
    count = count - (cardWidth-75);
    tracker++;
    if (tracker === 0) {
        prev.setAttribute('disabled', '');
    } else {
        prev.removeAttribute('disabled');
    }
    if (tracker === containerChildValue.length - 1) {
        next.setAttribute('disabled', '');
    } else {
        next.removeAttribute('disabled');
    }

    //Pushes cards based on count. 
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (el, i, arr) {
        el.style.transform = `translateX(${count}px)`;
    });
}

//Action for Prev button
const moveCardsRight = function () {
    count = count + (cardWidth - 75) ;
    tracker--;
    if (tracker <= 0) {
        prev.setAttribute('disabled', '');
    } else {
        prev.removeAttribute('disabled');
    }
    if (tracker === containerChildValue.length - 2) {
        next.setAttribute('disabled', '');
    } else {
        next.removeAttribute('disabled');
    }
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (el, i, arr) {
        el.style.transform = `translateX(${count}px)`;
    });
}

//Event listeners to slide the cards.
prev.addEventListener('click', () => {
    moveCardsRight();
});

next.addEventListener('click', () => {
    moveCardsLeft();
});