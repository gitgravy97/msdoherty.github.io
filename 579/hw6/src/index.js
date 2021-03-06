// Imports
import * as Tone from 'tone';

// AUDIO 1 :: Boilerplate Stuff
function beep(osc_type, pitch){
    var context = new AudioContext()

    var o = context.createOscillator()
    var g = context.createGain()
    o.type = osc_type
    if(pitch !== undefined){
        o.frequency.value = pitch;
    }
    o.connect(g)
    g.connect(context.destination)

    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 3)
    o.start()
}

function inputBeep(){
    // console.log(document.getElementById("PitchInput").value)
    let osc = "sine";
    if(document.getElementById('genPitchSq').checked){
        osc = "square";
    } else if(document.getElementById('genPitchSaw').checked){
        osc = "sawtooth";
    } else if(document.getElementById('genPitchTri').checked){
        osc = "triangle";
    } else {
        osc = "sine";
    }
    beep(osc_type="sine", pitch=document.getElementById("PitchInput").value);
}

// https://stackoverflow.com/questions/50460645/getelementbyid-style-display-does-not-work
function toggleViz(element){
    element.classList.toggle("hidden");
}

function toggleOctLabels(){
    // https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays

    //// have to do window.targets approach for webpack
    // targets = document.getElementsByClassName('octave');
    window.targets = document.getElementsByClassName('octave');
    
    //Object.keys(targets).map(each => console.log(each))
    //Object.keys(targets).map(each => console.log(targets[each]))
    Object.keys(targets).map(each => toggleViz(targets[each].getElementsByTagName('h2')[0]))
    //targets.map(each => console.log(each));
}

const toggle_oct_cust = document.getElementById('tog_oct_cust');
const toggle_oct3 = document.getElementById('tog_oct3');
const toggle_oct4 = document.getElementById('tog_oct4');
const toggle_oct5 = document.getElementById('tog_oct5');


toggle_oct_cust.addEventListener('click', ()=>toggleViz(document.getElementById('keeped_beeps')));
toggle_oct3.addEventListener('click', ()=>toggleViz(document.getElementById('oct3')));
toggle_oct4.addEventListener('click', ()=>toggleViz(document.getElementById('oct4')));
toggle_oct5.addEventListener('click', ()=>toggleViz(document.getElementById('oct5')));

const toggle_oct_labels = document.getElementById('oct_relabel');
toggle_oct_labels.addEventListener('click', ()=>toggleOctLabels());

const customPitchButton = document.getElementById('CustomPitchButton');
customPitchButton.addEventListener('click', ()=>inputBeep());

const customPitchEnter = document.getElementById('PitchInput');
customPitchEnter.addEventListener('keydown', event => {
    if(event.key == "Enter"){
        inputBeep();
    }
});

function BeepKeep(){
    const keptPitch = document.getElementById('PitchInput').value
    // console.log(keptPitch)
    let keptBeep = document.createElement('button');

    let osc = "sine";
    if(document.getElementById('genPitchSq').checked){
        osc = "square";
        keptBeep.innerText = "■ ".concat(keptPitch);
    } else if(document.getElementById('genPitchSaw').checked){
        osc = "sawtooth";
        keptBeep.innerText = "▼ "+keptPitch;
    } else if(document.getElementById('genPitchTri').checked){
        osc = "triangle";
        keptBeep.innerText = `▲ ${keptPitch}`;
    } else{
        osc = "sine";
        keptBeep.innerText = "~ "+keptPitch;
    }

    keptBeep.className = "key white-key";
    keptBeep.onclick = ()=>beep(osc, keptPitch);
    document.getElementById('keeped_beeps').append(keptBeep);
}

const beep_creep = document.getElementById('SavePitchButton');
beep_creep.addEventListener('click', ()=>BeepKeep())

function PurgePitches(){
    window.purgeables = document.getElementById('keeped_beeps').getElementsByClassName('key')
    console.log(purgeables)
    while(purgeables[0]){
        purgeables[0].remove();
    }
}

// AUDIO 2 :: Tone.js Stuff

// https://www.npmjs.com/package/tone
// https://medium.com/dev-red/tutorial-lets-make-music-with-javascript-and-tone-js-f6ac39d95b8c

function test1(){
    // create a new synth and route the output to master
    const synth = new Tone.MembraneSynth().toDestination();
    // play a note with the synth we setup
    synth.triggerAttackRelease("C1", "8n");
}

function test2(){
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C2", "8n");
}

function test3(){
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C3", "8n");
}

function test4(){
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
}

function test5(){
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C5", "8n");
}

function test6(){
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C6", "8n");
}

function RadioheadTest(){
    // Oh wow half the issue was using Membrane Synth which doens't have a sustain
    // switch voicing to MonoSynth
    // https://sheets-piano.ru/wp-content/uploads/2014/04/Radiohead-Motion-picture-soudtrack.pdf
    // https://github.com/Tonejs/Tone.js/wiki/Time
    // https://tonejs.github.io/docs/14.7.77/MonoSynth.html#triggerAttackRelease

    //Tone.Transport.bpm.rampTo(93,0.01); ------ this seems to have no impact? hm...
    const synth = new Tone.MonoSynth().toDestination();

    const now = Tone.now();
    synth.triggerAttackRelease("A4", "1", now)
    synth.triggerAttackRelease("G4", "1", now+1);
    synth.triggerAttackRelease("D4", "0.5", now+2)
    synth.triggerAttackRelease("A4", "1", now+2.5)
    synth.triggerAttackRelease("G4", "0.5", now+3.5);
    synth.triggerAttackRelease("G4", "0.5", now+4);
}

// trying to make functions work with webpack
// update :: it works, bless
// note :: below link offers a cleaner adaptation option to implement later
// https://stackoverflow.com/questions/35781579/basic-webpack-not-working-for-button-click-function-uncaught-reference-error
window.beep = beep;
window.inputBeep = inputBeep;
window.PurgePitches = PurgePitches;
window.toggleOctLabels = toggleOctLabels;
window.toggleViz = toggleViz;
window.PurgePitches = PurgePitches;

window.test1 = test1;
window.test2 = test2;
window.test3 = test3;
window.test4 = test4;
window.test5 = test5;
window.test6 = test6;
window.RadioheadTest = RadioheadTest;