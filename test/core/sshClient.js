'use strict';

/**
 * @description Class to do SSH connections
 * @author Sergio Gonzalez Q <squiros@growthaccelerationpartners.com>
 * @source https://www.npmjs.com/package/ssh2-connect
 *         https://github.com/mscdex/ssh2
 *         https://www.npmjs.com/package/ssh-exec
 *         https://github.com/mikeal/sequest
 * @place Cartago, Costa Rica
 * @date Jun 2018
 */

var execSSH = require('ssh-exec')
const connect = require('ssh2-connect')
const exec = require('ssh2-exec');
var Client = require('ssh2').Client;

module.exports = class SSHClient{

    constructor(host, user, pass){
        this.host = host;
        this.user = user;
        this.password = pass;
    }

    runCommand(command, verbose=true, sync=true, timeout=500){

        var response = "";

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

        var config = {
            username: this.user,
            host: this.host,
            port: 22,
            password: this.password
        };

        var conn = new Client();
        conn.on('ready', function() {
            //console.log('Client :: ready');
            conn.exec(command, function(err, stream) {
                if (err) throw err;
                stream.on('close', function(code, signal) {
                    // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                    return response;
                }).on('data', function(data) {
                    response += data;
                    console.log('' + data);
                }).stderr.on('data', function(data) {
                    // console.log('STDERR: ' + data);
                });
            });
        }).connect(config);

        return response;
    }

}

