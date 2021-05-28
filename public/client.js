const socket=io(`${process.env.CLIENT}`)
const Input =document.querySelector('.chat-input')
const chat=document.querySelector('.chat-send')
chat.onclick=function(event){
  event.preventDefault();
  socket.emit('chat',Input.value)
  const containers=document.createElement('div');
  containers.classList.add('chat-window')
  containers.classList.add('left');
  containers.innerText=Input.value;
  document.querySelector('.container').appendChild(containers);
  Input.value=''; 
}
socket.on('new-user',(message)=>{
  const message_container=document.createElement('div');
  message_container.innerText=message;
  message_container.classList.add('chat-windows')
  message_container.classList.add('right');
  document.querySelector(".container").appendChild(message_container);
});






