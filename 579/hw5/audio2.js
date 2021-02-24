function testo(){
    console.log("BOOM");
    var voice = new Pizzicato.Sound({ source: 'input' });
}

const please_work = document.getElementById('please');
// please_work.addEventListener('click', ()=>BeepKeep())

please_work.addEventListener('click', ()=>{
    console.log("rip");
    var voice = new Pizzicato.Sound({
        source: 'input',
        options: { volume: 0.8 }
    }, function() {
        voice.play();
    });
})