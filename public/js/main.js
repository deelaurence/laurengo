const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

 
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
 
  // Get message text
  let msg = e.target.elements.msg.value;
  
  msg = msg.trim();

  if (!msg) {
    return false;

  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});



var msgOut = document.getElementById("message-out"); 
var msgIn = document.getElementById("message-in"); 
var keypad = document.getElementById("keypad"); 

function playAudio() { 
  x.play(); 
} 

function pauseAudio() { 
  x.pause(); 
} 
function playPad() {
  keypad.play()
  keypad.playbackRate=2;
}
// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;


  div.appendChild(para);
  
 let request= new XMLHttpRequest();
 request.addEventListener("load", function(evt){
  //  console.log(evt);
   if (this.readyState== 4 && this.status == 200){
let hero =document.getElementById('username')

// console.log(this.responseText);
   }
   })

 request.open('GET', 'index.html', true),
 request.send()
  document.querySelector('.chat-messages').appendChild(div);
    console.log(message.username)
     console.log(window.location.search);
     let hasText = window.location.search.includes(message.username)
if(hasText){
  div.style.backgroundColor="pink";
  // div.style.marginLeft='65%';
  div.style.position='relative';
  div.style.left='100%';
  
	div.style.transform='translateX(-100%)';
  msgIn.play()
}
else if(message.username=='admin'){
  div.style.position='relative'
  div.style.backgroundColor="rgba(257,257,257,.7)";
  div.style.left='50%'
  div.style.width='50%'
  div.style.textAlign='center'
  div.style.transform='translateX(-50%)';
  console.log('admin');
}
else{
  msgOut.play()
}

}


// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});


let info = document.querySelector('.info')
let sideBar = document.querySelector('.chat-sidebar')
let body = document.querySelector('#blur-bg')
info.addEventListener('click',()=>{
body.classList.toggle('blur')
sideBar.classList.toggle('chat-sidebar2')
})

