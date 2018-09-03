

/**
 * @description General class
 * @author Sergio Gonzalez Q <sergioalbertogq@gmail.com>
 * @place Cartago, Costa Rica
 * @date Jul 2018
 */

module.exports = class Utils {
  sleep(seconds) {
    const waitUntil = new Date().getTime() + seconds * 1000;
    while (new Date().getTime() < waitUntil) true;
  }
};
