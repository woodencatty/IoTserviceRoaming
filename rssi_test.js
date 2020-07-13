var count = 0;

var scanWifi = setInterval(()=>{

const shell = require('shelljs')

shell.cd('~')

if(shell.exec("iwconfig wlan0 | grep Link | awk '{$1=$1;print}'").code !== 0) {
  shell.echo('Error: command failed')
  shell.exit(1)
}

if(shell.exec("iwconfig wlan0 | grep ESSID | awk '{$1=$1;print}'").code !== 0) {
    shell.echo('Error: command failed')
    shell.exit(1)
  }
  

        if(count>100000){
          clearInterval(scanWifi);
        }
count ++;
        }, 100)