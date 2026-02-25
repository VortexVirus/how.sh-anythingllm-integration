const { exec } = require("child_process");




module.exports.runtime = {
  handler: async function ({ command, timeout }) {
    return new Promise((resolve) => {
      if (!command || command.trim() === "") {
        return resolve("No command provided.");
      }

      // Example: Simple whitelist for safety
      const allowed = ["ls", "date", "whoami", "pwd", "kitty", "waterfox", "cd", "fastfetch", "yay"];
      const cmdName = command.split(" ")[0];
      if (!allowed.includes(cmdName)) {
        return resolve(`Command "${cmdName}" is not allowed.`);
      }

      // Execute the command with optional timeout
      exec(command, { timeout: timeout || 10000 }, (error, stdout, stderr) => {
        if (error) {
          resolve(`Error: ${error.message}\nStderr: ${stderr}`);
        } else {
          resolve(`Output:\n${stdout}`);
        }
      });
    });
  },
};
// all of this is written by chatgpt as tests this is just to get something working inside of anythingllm this is my first plugin for it i dont know how it works
