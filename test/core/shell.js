'use strict';

/**
 * @description Class to execute commands line
 * @author Sergio Gonzalez Q <squiros@growthaccelerationpartners.com>
 * @source https://nodejs.org/api/child_process.html
 * @place Cartago, Costa Rica
 * @date Jun 2018
 */

const { exec, execSync, spawn, spawnSync } = require('child_process');
var shell = require('shelljs');

module.exports = class CLI{

    runCommand(command, verbose=true, sync=true){

        let out = "";
        try {

            if(sync){
                out = execSync(command).toString();
            }else{
                out = exec(command).toString();
            }

            if (verbose){
                console.log("Response: "+out);
            }
        } catch(err) {
            console.error("Error: "+err);
        }
        return out;
    }

    runSpawnCommand(command, verbose=true, sync=true){
        let out = "";
        try {

            if(sync){
                out = spawnSync(command, [''], { encoding : 'utf8' }).stdout;
            }else{
                out = exec(command).toString();
            }

            if (verbose){
                console.log("Response: "+out);
            }
        } catch(err) {
            console.error("Error: "+err);
        }
        return out;
    }

}


