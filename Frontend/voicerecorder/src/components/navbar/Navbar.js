import React from 'react'
import './Navbar.css';

const Navbar = () => {
  
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
     return (
<div>
<div class="sidenav">
  <h1 className="goodfont title"></h1>
  <div class="col">
    <h4 className="goodfont title"><b><span
    className="txt-rotate"
    data-period="2000"
    data-rotate='[ "ELECTRONIC", "EARS"]'></span></b></h4>
  </div>
  <p className="teamkm">work by team <b>KING MAKERS</b></p>
  <h2 className="emojisss">😂😊😎😍😡🤫😳😐😑💪😄😤😵😔🙄😥</h2>
  <p className="quotes">"Only through focus you can do world class things ! No matter how much capable you are !"</p>
  <img className="bill" src="https://i.pinimg.com/originals/70/fc/11/70fc116d166a387869f6d356b64a3388.png"/>
</div>
<div class="main">
  <h2 className="instructions">It's a pleasure seeing you back Mr. Nithishvaran TP !<br/><br/>To do some analysis, go inside the audio room and after completing it, go to the award room and star ! </h2>
</div>
</div>
)
}

export default Navbar