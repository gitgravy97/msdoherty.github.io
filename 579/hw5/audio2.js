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