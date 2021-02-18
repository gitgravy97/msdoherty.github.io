
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
    beep(osc_type=osc, pitch=document.getElementById("PitchInput").value);
}

// https://stackoverflow.com/questions/50460645/getelementbyid-style-display-does-not-work
function toggleViz(element){
    element.classList.toggle("hidden");
}

function toggleOctLabels(){
    // https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
    targets = document.getElementsByClassName('octave');
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
    purgeables = document.getElementById('keeped_beeps').getElementsByClassName('key')
    console.log(purgeables)
    while(purgeables[0]){
        purgeables[0].remove();
    }
}