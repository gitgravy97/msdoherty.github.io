function setMic(){
    let zeet = true;
    console.log(zeet);
}
function cutMic(){
    zeet = true;
    console.log(zeet);
}

const please_work = document.getElementById('microphone-feed');

please_work.addEventListener('click', ()=>{
    console.log("rip");
    var voice = new Pizzicato.Sound({
        source: 'input',
        options: { volume: 0.8 }
    }, function() {
        voice.play();
        const please_stop = document.getElementById('microphone-cut');
        please_stop.addEventListener('click'), ()=>{
        console.log("kill trigger");
        voice.stop();
}})})