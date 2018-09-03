

/**
 * @description Class to do SSH connections
 * @author Sergio Gonzalez Q <sergioalbertogq@gmail.com>
 * @source https://www.npmjs.com/package/ssh2-connect
 *         https://github.com/mscdex/ssh2
 *         https://www.npmjs.com/package/ssh-exec
 *         https://github.com/mikeal/sequest
 * @place Cartago, Costa Rica
 * @date Jun 2018
 */

const execSSH = require('ssh-exec');
const connect = require('ssh2-connect');
const exec = require('ssh2-exec');
const Client = require('ssh2').Client;

module.exports = class SSHClient {
  constructor(host, user, pass) {
    this.host = host;
    this.user = user;
    this.password = pass;
  }

  runCommand(command, verbose = true, sync = true, timeout = 500) {
    let response = '';

    /* var config = {
            host: this.host,
            username: this.user,
            password: this.password,
            retry: 1,
            wait: timeout
        };

        connect(config, function(err, ssh){
            console.log("Running the command: "+command);
            exec(command, {ssh: ssh}, function(err, stdout, stderr){
                if (verbose){
                    console.log("Response: "+stdout);
                }
                return stdout;
            });
        }); */

    /* var config = {
            user: this.user,
            host: this.host,
            password: this.password
        };

        execSSH(command, config, function (err, stdout, stderr) {
            return stdout;
        });
         */

    const config = {
      username: this.user,
      host: this.host,
      port: 22,
      password: this.password,
    };

    const conn = new Client();
    conn.on('ready', () => {
      // console.log('Client :: ready');
      conn.exec(command, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
          // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
          return response;
        }).on('data', (data) => {
          response += data;
          console.log(`${data}`);
        }).stderr.on('data', (data) => {
          // console.log('STDERR: ' + data);
        });
      });
    }).connect(config);

    return response;
  }
};
