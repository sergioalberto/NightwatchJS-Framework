'use strict';

// https://www.npmjs.com/package/ssh2-connect

const connect = require('ssh2-connect')
const exec = require('ssh2-exec');

module.exports = class SSHClient{

    constructor(host, user, pass){
        this.host = host;
        this.user = user;
        this.password = pass;
    }

    runCommand(command){

        connect({
            host: this.host,
            username: this.user,
            password: this.password
        }, function(err, ssh){
            // this is easier to write
            console.log("Running the command "+command);

            exec(command, {ssh: ssh}, function(err, stdout, stderr){
                console.log(stdout);
            });

        })
    }

}

