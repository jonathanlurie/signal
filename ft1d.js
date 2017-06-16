
/**
* Generate a 1D signal
* @param {Number} signalAmplitude - amplitude A of the signal
* @param {Number} signalFrequency - frequency of the signal
* @param {Number} signalPhase - oscillation shift at x=0
* @param {Number} samplingFrequency - must be at least twice as big as the frequency (Nyquist-Shannon)
* @param {Number} samplingSize - number of samples to create
*/
function generate1DSignal(signalAmplitude, signalFrequency, signalPhase, samplingFrequency, samplingSize){

  if( (samplingFrequency / signalFrequency) < 2){
    console.warn("Your sampling frequency should be twice as big as your signal frequency. (see Nyquist-Shannon)");
  }

  function getSignalValueAt( x ){
    return signalAmplitude * Math.sin( 2 * Math.PI * signalFrequency * x + signalPhase);
  }

  var fx = new Float32Array( samplingSize );
  var x = new Float32Array( samplingSize );

  for(var i=0; i<samplingSize; i++){
    var currentX = (1/samplingFrequency) * i;
    x[ i ] = currentX;
    fx[ i ] = getSignalValueAt( currentX );
  }

  return {
    x: x,
    fx: fx
  };
}

// https://www.nayuki.io/page/how-to-implement-the-discrete-fourier-transform
/**
* Compute the FT of a signal
* @param { Float32Array } s - 1D signal
*/
function ft1D( s ){
  var N = s.length
  // the real part of the complex output
  var ft_r = new Float32Array( N ).fill(0);
  // the imaginary part of the complex output
  var ft_i = new Float32Array( N ).fill(0);

  for(var k=0; k<N; k++){
    for(var n=0; n<N; n++){
      var angle = 2 * Math.PI * n * k / N;
      ft_r[ k ] +=  s[n] * Math.cos(angle);
      ft_i[ k ] += -s[n] * Math.sin(angle);
    }
  }

  return {
    r: ft_r,
    i: ft_i
  }
}



var signalData =  generate1DSignal(
                1,  // amplitude
                1,  // signal freq
                0,  // signal phase
                10,  // sampling freq
                100  // number of samples (should cover more than 2 periods)
              );

var signalData2 =  generate1DSignal(
                0.1,  // amplitude
                6,  // signal freq
                0,  // signal phase
                10,  // sampling freq
                100  // number of samples (should cover more than 2 periods)
              );

//console.log( signalData.fx );
//console.log( signalData2.fx );

for(var i=0; i<signalData.fx.length; i++){
  signalData.fx[ i ] += signalData2.fx[ i ]
}

var ft = ft1D( signalData.fx )

console.log( signalData.fx );
console.log( ft.r );
