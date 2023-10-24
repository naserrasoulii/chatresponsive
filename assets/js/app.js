/// variables
let btnCustom = document.querySelector('.sendBtn .btnCustomSend')
let inputText = document.getElementById('inputSendMsg')
let msgContain = document.querySelector('.msgContain')
let lazy = document.querySelector('.lazyload')
let showMsg = document.querySelector('.showMsg')
let chats = document.querySelector('.msgContain')
let lazyText = document.querySelector('.lazyText')
let chatsAll = document.querySelectorAll('.chat')
let searchInput = document.querySelector('.searchInput')
let nameProfile = document.querySelectorAll('.chatProfile .name')
let loader = document.querySelector('.loader')
let btnShowMedia = document.querySelector('.btnShowMedia')
let showMediaSection = document.querySelector('.showMediaSection')
let afterMediaSection = document.querySelector('.afterMediaSection')
let btnCloseMedia = document.querySelector('.btnCloseMedia')
let imgshow = document.querySelectorAll('.img-show a')
let showMediaModal = document.getElementById('showMediaModal')
let showMediaModalBody = document.querySelector('#showMediaModal .modal-body')
let btnCloseModal = document.querySelector('.btnCloseModal')
let form = document.querySelector('form.send1')
let itemTab = document.querySelectorAll('.nav-tabs li')
let sideBarMember = document.querySelector('.sideBarMember')
let showChats = document.querySelector('.showChats')
let windowWidth = window.innerWidth

// event Listenres 

// document.addEventListener('DOMContentLoaded', lazyNone)
// btnCustom.addEventListener('click', appendMsg)
btnShowMedia.addEventListener('click', showMedia)
btnCloseMedia.addEventListener('click', closeMedia)
btnCloseModal.addEventListener('click', closeModal)
form.addEventListener('submit', appendMsg)
// functions 

//lazyload Dom Loaded
async function lazyTextChange() {

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(lazyText.innerHTML = 'درحال بارگذاری.....')
        }, 100);
    })
}
async function lazyOut() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(lazy.style.opacity = "0")
        }, 100);
    })
}
async function contentLoad() {
    return new Promise(resolve => {
        resolve(showMsg.classList.add('show'))
    })
}
async function lazyDisplayNone() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(lazy.classList.add('d-none'))
        }, 100);
    })
}
async function stop() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('true')
        }, 100);
    })
}
async function resetShow() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(showMsg.classList.remove('show'),
                lazy.classList.remove('d-none'),
                lazy.style.opacity = "1")
        }, 100);
    })
}
async function lazyNone() {
    await resetShow()
    await lazyTextChange()
    await stop()
    await lazyOut()
    await lazyDisplayNone()
    await contentLoad()
    scrollbottom()
}

// lazy load chat click
function changeChatLazy(data) {
    if (innerWidth > 768) {
        if (!data.classList.contains('active')) {
            chatsAll.forEach(el => {
                if (el.classList.contains('active')) {
                    el.classList.remove('active')
                }
            })
            data.classList.add('active')
            lazyNone()
        }
    }
    else {
        sideBarMember.classList.add('d-none')
        showChats.classList.add('d-block')
        chatsAll.forEach(el => {
            if (el.classList.contains('active')) {
                el.classList.remove('active')
            }
        })
        data.classList.add('active')
        lazyNone()
    }

}

// scoll to end msg chat
function scrollbottom() {
    chats.scrollTop = chats.scrollHeight
}
scrollbottom()


// append message
function appendMsg(e) {
    e.preventDefault()

    if (!inputText.value.length == 0) {
        let newValue = inputText.value
        let now = new Date()
        let hour = now.getHours()
        let minutes = now.getMinutes()
        if (hour < 10 && hour >= 0) {
            hour = '0' + hour
        }
        if (minutes < 10 && minutes >= 0) {
            minutes = '0' + minutes
        }
        let templateSend =
            `<div class="msgSend">
            <div class="singleMsg">
                <p>${newValue}</p>
                <span class="text-muted">${hour}:${minutes}</span>
                <span class="check">
                 <i class="bi bi-check2"></i> 
                </span>
            </div>
        </div>`
        msgContain.innerHTML += templateSend
        setTimeout(() => {
            chats.scrollTop = chats.scrollHeight
        }, 500);
    }
    else {
        console.log(inputText.value.length)
    }
}

// filter msg
function filterMsg(data) {
    let filterProperty = data.getAttribute("data-filter")
    itemTab.forEach(el => {
        el.classList.remove('active')
    })
    if (filterProperty === 'private') {
        data.classList.add('active')
        loader.classList.remove('d-none')
        chatsAll.forEach(el => {
            if (!el.classList.contains('private')) {
                el.classList.add('d-none')
            }
            else if (el.classList.contains('private') && el.classList.contains('d-none')) {
                el.classList.remove('d-none')
            }
        })
        setTimeout(() => {
            loader.classList.add('d-none')
        }, 1000);
    }
    else if (filterProperty === 'group') {
        data.classList.add('active')
        loader.classList.remove('d-none')
        chatsAll.forEach(el => {
            if (!el.classList.contains('group')) {
                el.classList.add('d-none')
            }
            else if (el.classList.contains('group') && el.classList.contains('d-none')) {
                el.classList.remove('d-none')
            }
        })
        setTimeout(() => {
            loader.classList.add('d-none')
        }, 1000);
    }
    else {
        data.classList.add('active')
        loader.classList.remove('d-none')
        chatsAll.forEach(el => {
            if (el.classList.contains('d-none')) {
                el.classList.remove('d-none')
            }
        })
        setTimeout(() => {
            loader.classList.add('d-none')
        }, 1000);
    }
}

// function show Media 
function showMedia() {
    showMediaSection.classList.add('show')
    afterMediaSection.classList.add('show')
}
// function close Media
function closeMedia() {
    showMediaSection.classList.remove('show')
    afterMediaSection.classList.remove('show')
}


// modal img show lightbox
function lightBoxCustom(event, data) {
    event.preventDefault()
    let src = data.getAttribute('href')
    let video = data.classList.contains('video')
    if (video) {
        showMediaModal.classList.add('show')
        showMediaModal.classList.add('d-block')
        showMediaModalBody.innerHTML = ''
        let element = ''
        element = `
        <video controls class="w-100">
            <source src="${src}">
        </video>
        `
        showMediaModalBody.innerHTML = element
    }
    else {
        showMediaModal.classList.add('show')
        showMediaModal.classList.add('d-block')
        showMediaModalBody.innerHTML = ''
        let element = ''
        element = `   <img src="${src}" class="img-fluid h-modal" />`
        showMediaModalBody.innerHTML = element
    }
}


// function close modal
function closeModal() {
    btnCloseModal.classList.add('close')
    setTimeout(() => {
        showMediaModal.classList.remove('show')
        showMediaModal.classList.remove('d-block')
        btnCloseModal.classList.remove('close')
    }, 300);
}

// lazy check the width and set content

function lazytextStart() {
    if (windowWidth < 768) {
        lazyText.innerHTML = 'درحال بارگذاری.....'

    } else {
        lazyText.innerHTML = 'برای شروع چت  یک مخاطب را انتخاب کنید'
    }
}
lazytextStart()