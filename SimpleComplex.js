// http://www.cs.toronto.edu/~jepson/csc320/notes/linearFilters2.pdf

/**
* Simple Complex
*/
class SimpleComplex {
  constructor( ri={r:0, i:0} ){
    this._r = ri.r;
    this._i = ri.i;
  }

  /**
  * Get the modulus/length or this complex number
  */
  mod(){
    return Math.sqrt( Math.pow(this._r, 2) + Math.pow(this._i) );
  }


  /**
  * Add c to this complex number. this + c
  * @param {SimpleComplex} c - a complex numbber
  * @return {SimpleComplex} this
  */
  add( c ){
    this._r += c._r;
    this._i += c._i;
    return this;
  }


  /**
  * Substact c from this complex number. this - c
  * @param {SimpleComplex} c - a complex numbber
  * @return {SimpleComplex} this
  */
  sub( c ){
    this._r -= c._r;
    this._i -= c._i;
    return this;
  }


  /**
  * Get the conjugate complex of this complex number
  * @return {SimpleComplex} a new instance of SimpleComplex
  */
  conj(){
    return new SimpleComplex( {r: this._r, i: -this._i})
  }


  /**
  * Multiply this complex number with another one. This * c
  * @param {SimpleComplex} c - complex to multiply this with
  * @return {SimpleComplex} this
  */
  mult( c ){
    var r = this._r * c._r - this._i * c._i;
    var i = this._i * c._r + this._r * c.i;
    this._r = r;
    this._i = i;
    return this;
  }

  /**
  * Divide this by another complex. This / c
  * @param {SimpleComplex} c - complex to multiply this with
  * @return {SimpleComplex} this
  */
  div( c ){
    var r = (this._r * c._r + this._i * c._i) / (Math.pow(c._r, 2) + Math.pow(c._i, 2));
    var i = (this._i * c._r - this._r * c.i;) / (Math.pow(c._r, 2) + Math.pow(c._i, 2));
    this._r = r;
    this._i = i;
    return this;
  }


  reci( c ){
    return new SimpleComplex( {
      r: this._r / (Math.pow(this._r, 2) + Math.pow(this._i, 2)),
      i: -1 * (this._i / (Math.pow(this._r, 2) + Math.pow(this._i, 2)))
    } );
  }

}
