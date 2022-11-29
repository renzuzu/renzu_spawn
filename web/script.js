

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
        containerChildValue = document.querySelectorAll('.card');
        cardWidth = document.querySelector('.card').offsetWidth;
    }
})

//Select elements and getting measurements for button placements.
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let cardWidth = ''
let containerChildValue = ''

let count = 0;

let tracker = 0;

function spawn(name) {
    tracker = 0
    count = 0
    blockWidth = 0
    containerChildValue = ''
    prev.removeAttribute('disabled');
    next.removeAttribute('disabled');
    SendData({msg : 'spawn', name : name})
}

function preview(name) {
    SendData({msg : 'preview', name : name})
}

const toLeft = function () {
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

    const cards = document.querySelectorAll('.card');
    cards.forEach(function (el, i, arr) {
        el.style.transform = `translateX(${count}px)`;
    });
}

const toRight = function () {
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
    toRight();
});

next.addEventListener('click', () => {
    toLeft();
});