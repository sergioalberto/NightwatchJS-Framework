'use strict';

/**
 * @description General class
 * @author Sergio Gonzalez Q <squiros@growthaccelerationpartners.com>
 * @place Cartago, Costa Rica
 * @date Jul 2018
 */

module.exports = class SSHClient{

    sleep(seconds){
        var waitUntil = new Date().getTime() + seconds*1000;
        while(new Date().getTime() < waitUntil) true;
    }

}
