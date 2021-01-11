const cp = require("child_process");
const io = require("socket.io")();
var bash = cp.spawn("bash");

io.on("connection", socket => {
	console.log("client connected");
	socket.on("kb", key => {
		console.log(key);
		keyboard(key);
	});
	socket.on("sc", key => {
		scanner(key);
	});
});
io.listen(3000);

bash.on("error", function(code) {
  console.log("error with code " + code);
});

bash.on("close", function(code) {
  console.log("closed with code " + code);
});

bash.on("exit", function(code) {
  console.log("exited with code " + code);
});

function keyboard(key) {
	console.log(key);
	bash.stdin.write(`xdotool key ${key}\n`);
}

function scanner(key) {
	bash.stdin.write(`xdotool type '${key}'\n`);
}
