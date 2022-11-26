

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
        containerChildValue = document.querySelector('.spawn-container').childElementCount;
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

    if (containerWidthValue >= 400) {
        prevPos.style.marginRight = `${containerWidthValue + prevWidth + 8}px`;
        nextPos.style.marginLeft = `${containerWidthValue + nextWidth + 8}px`;

        prevPos.style.marginTop = `0px`;
        nextPos.style.marginTop = `0px`;

        prev.style.padding = `100px 10px 100px 10px`;
        next.style.padding = `100px 10px 100px 10px`;

    } else {
        prevPos.style.marginRight = `${prevWidth + 100}px`;
        nextPos.style.marginLeft = `${nextWidth + 100}px`;

        prevPos.style.marginTop = `${containerHeightValue + prevHeight - 2}px`;
        nextPos.style.marginTop = `${containerHeightValue + nextHeight - 2}px`;

        prev.style.padding = `0px 30px 0px 30px`;
        next.style.padding = `0px 30px 0px 30px`;

    }
}

let count = 0;

let tracker = 0;

//Action for Next button
const moveCardsLeft = function () {
    count = count - cardWidth - 100;
    tracker++;
    if (tracker === 0) {
        prev.setAttribute('disabled', '');
    } else {
        prev.removeAttribute('disabled');
    }
    if (tracker === containerChildValue - 1) {
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
    count = count + cardWidth + 100;
    tracker--;
    if (tracker <= 0) {
        prev.setAttribute('disabled', '');
    } else {
        prev.removeAttribute('disabled');
    }
    if (tracker === containerChildValue - 1) {
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