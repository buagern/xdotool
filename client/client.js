const io = require('socket.io-client');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const socket = io('http://192.168.88.252:3000/');

var mode = 'sc';
var input = '';

socket.on("connect", function (data) {
  process.stdin.on('keypress', (str, key) => {

    if (str == '/' && mode == 'sc' && input.length == 0)
    {
      mode = 'kb';
      socket.emit(mode, 'slash');
    }

    if (key['name'] == 'backspace') {
      socket.emit('kb', 'BackSpace');
    }

    if (key['name'] == 'return')
    {
      socket.emit('sc', input);
      input = '';
      mode = 'sc';
      socket.emit('kb', 'Return');
    }

    if (mode == 'sc')
    {
      if (key['name'] != 'return')
      {
        input += str;
      }
    }
    else
    {
      if (key['name'] != 'return')
      {
        socket.emit(mode, key['name']);
      }
    }

    // socket.emit(mode, input);
    
    /*
    if (key['name'] != undefined)
    {
      if (key['name'] == 'backspace') {
        socket.emit('kb', 'BackSpace');
      }
      else if (key['name'] == 'return') {
        socket.emit('kb', 'Return');
      }
      else
      {
        socket.emit('kb', key['name']);
      }
    }
    else
    {
      if (str == '/') {
        console.log('slash');
        socket.emit('kb', 'slash');
      }
    }
    */
    console.log(str);
  });
});
