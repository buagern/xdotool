const io = require('socket.io-client');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const socket = io('http://192.168.88.239:3000/');

var mode = 'sc';
var input = '';

socket.on("connect", function (data) {
  process.stdin.on('keypress', (str, key) => {

    if (key['name'] == 'backspace') {
      input = '';
      socket.emit('kb', 'BackSpace');
    }

    if (str == '/')
    {
      mode = 'kb';
      socket.emit(mode, 'slash');
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

    console.log(str);
  });
});
