var context = new AudioContext()

function beep(osc_type, pitch){
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