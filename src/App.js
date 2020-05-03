import React, {Component} from 'react';
import logo from './bus_logo.svg';
import './App.css';
import data from './reittiopas.json';




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      valittu: '',
      alku: 'A',
      loppu:'B',
      aloitus: '',
      lopetus: '',
      linjasto: '',
      aikataulu: 0,
      search: true,
      route: false, 
      result: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.calculateRoute = this.calculateRoute.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this); 
    this.handleChangeEnd = this.handleChangeEnd.bind(this); 
  }
 
    
handleClick(e) {
  
var aloituspaikka;
var loppupaikka;
var samassa = false;

  //KAtotaan onko ne keltaisessa
  if (data.linjastot.keltainen.includes(this.state.alku) || 
  data.linjastot.keltainen.includes(this.state.loppu)) {

  for (var i=0; i < data.linjastot.keltainen.length; i++) {
    if(data.linjastot.keltainen[i] === this.state.alku) {
      aloituspaikka = 'keltainen';
      console.log('keltainen'+i);
    }
    if(data.linjastot.keltainen[i] === this.state.loppu) {
      loppupaikka = 'keltainen';
      console.log('LOPPU keltainen'+i);
    }
  }}

  if(data.linjastot.keltainen.includes(this.state.alku) && 
    data.linjastot.keltainen.includes(this.state.loppu)) {
      console.log("MOLEMMAT KELTAISESSA");
      samassa = true;
    this.calculateRoute(aloituspaikka, loppupaikka);
    }


    //KAtotaan onko ne punaisessa
    if (data.linjastot.punainen.includes(this.state.alku) || 
    data.linjastot.punainen.includes(this.state.loppu)) {

  for (var j=0; j < data.linjastot.punainen.length; j++) {
    if(data.linjastot.punainen[j] === this.state.alku) {
      aloituspaikka = 'punainen';
      console.log('punainen'+j);
    }
    if(data.linjastot.punainen[j] === this.state.loppu) {
      loppupaikka = 'punainen';
      console.log('LOPPU punainen'+j);
    }
    
  }
  if(data.linjastot.punainen.includes(this.state.alku) && 
    data.linjastot.punainen.includes(this.state.loppu)) {
      console.log("MOLEMMAT PUNAISESSA");
      samassa = true;
      this.calculateRoute(aloituspaikka, loppupaikka);
    }
  } 
  

  //KAtotaan onko ne vihreässä
  if (data.linjastot.vihreä.includes(this.state.alku) || 
    data.linjastot.vihreä.includes(this.state.loppu)) {

  for (var k=0; k < data.linjastot.vihreä.length; k++) {
    if(data.linjastot.vihreä[k] === this.state.alku) {
      aloituspaikka = 'vihreä';
      console.log('viherä' +k);
    }
      if(data.linjastot.vihreä[k] === this.state.loppu) {
        loppupaikka = 'vihreä';
        console.log(' LOPPU viherä' +k);
      }

  }
  if(data.linjastot.vihreä.includes(this.state.alku) && 
  data.linjastot.vihreä.includes(this.state.loppu)) {
    console.log("MOLEMMAT VIHREÄSSÄ");
    samassa = true;
    this.calculateRoute(aloituspaikka, loppupaikka);
  }
}


 //KAtotaan onko ne sinisessä 
if (data.linjastot.sininen.includes(this.state.alku) || 
data.linjastot.sininen.includes(this.state.loppu)) {  

  for (var l=0; l < data.linjastot.sininen.length; l++) {  
    if(data.linjastot.sininen[l] === this.state.alku) {
      aloituspaikka = 'sininen';
      console.log('sininen'+l);
    }
    if(data.linjastot.sininen[l] === this.state.loppu) {
      loppupaikka = 'sininen';
      console.log('LOPPU sininen'+l);
    }
  }

  if(data.linjastot.sininen.includes(this.state.alku) && 
  data.linjastot.sininen.includes(this.state.loppu)) {
    console.log("MOLEMMAT SINISESSÄ");
    samassa = true;
    this.calculateRoute(aloituspaikka, loppupaikka);
}} 
if (samassa === false) {
  this.calculateRoute(aloituspaikka, loppupaikka);
}

} 



//Lasketaan reitille aika
 calculateRoute(alkuLinja, loppuLinja) {
   var summa =0;
   var ap;
   var lp;
   var reitti;
  var k;
  var i;
  var linja;
 
  console.log(alkuLinja);
  console.log(loppuLinja);
  console.log("pääset perille käyttäen linjaa "+ alkuLinja);
  if(alkuLinja === 'keltainen') {
    
    ap = data.linjastot.keltainen.indexOf(this.state.alku);
    lp = data.linjastot.keltainen.indexOf(this.state.loppu) +1;
    reitti = data.linjastot.keltainen.slice(ap, lp);
    for(k=0; k<reitti.length; k++) {

    for(i=0; i<data.tiet.length; i++) {
      if(data.tiet[i].mista === reitti[k] && data.tiet[i].mihin === reitti[k+1]) {
        summa = summa+ data.tiet[i].kesto;
        linja = 'keltainen';
      }

    }}
    console.log("koko reitin kesto on "+summa);
  }

  if(alkuLinja === 'punainen') {
    ap = data.linjastot.punainen.indexOf(this.state.alku);
    lp = data.linjastot.punainen.indexOf(this.state.loppu) +1;
    reitti = data.linjastot.punainen.slice(ap, lp);
    for(k=0; k<reitti.length; k++) {

    for(i=0; i<data.tiet.length; i++) {
      if(data.tiet[i].mista === reitti[k] && data.tiet[i].mihin === reitti[k+1]) {
        summa = summa+ data.tiet[i].kesto;
        linja = 'punainen';
      }

    }}
    console.log("koko reitin kesto on "+summa);
  }


  if(alkuLinja === 'vihreä') {
    ap = data.linjastot.vihreä.indexOf(this.state.alku);
    lp = data.linjastot.vihreä.indexOf(this.state.loppu) +1;
    reitti = data.linjastot.vihreä.slice(ap, lp);
    for(k=0; k<reitti.length; k++) {

    for(i=0; i<data.tiet.length; i++) {
      if(data.tiet[i].mista === reitti[k] && data.tiet[i].mihin === reitti[k+1]) {
        summa = summa+ data.tiet[i].kesto;
        linja = 'vihreä';
      }

    }}
    alert(this.state.linjasto);
    console.log("koko reitin kesto on "+summa);
  }


  if(alkuLinja === 'sininen') {
    ap = data.linjastot.sininen.indexOf(this.state.alku);
    lp = data.linjastot.sininen.indexOf(this.state.loppu) +1;
    reitti = data.linjastot.sininen.slice(ap, lp);
    for(k=0; k<reitti.length; k++) {

    for(i=0; i<data.tiet.length; i++) {
      if(data.tiet[i].mista === reitti[k] && data.tiet[i].mihin === reitti[k+1]) {
        summa = summa+ data.tiet[i].kesto;
        linja = 'sininen';
      }

    }}
    console.log("koko reitin kesto on "+summa);
  }

  if(alkuLinja === 'sininen' && loppuLinja !== 'sininen') {
    alert('just näin');
  }

  this.setState({search: false, route: true, linjasto: linja, aikataulu: summa});

}



handleChangeStart(event) {
  this.setState({alku: event.target.value});
}

handleChangeEnd(event) {
  this.setState({loppu: event.target.value});
}

    render() 
    {
      
      let valueList = data.pysakit.length > 0 
      && data.pysakit.map((value, i)=> {
        return(
        <option key={i} value={value}>{value}</option>
        )
      }, this);

    return (<div className="App">
      <div className="App-header">
        <h1>REITTIHAKU</h1>
        <img src={logo} className="App-logo" alt="logo" />
        
        {this.state.search ? <div className="dd">
          <p>
          Hae reitin alku- ja loppupisteet valikoista ja si mennää.
        </p>
          <div className="value_list">
          <select  value={this.state.alku} onChange={this.handleChangeStart}>
            {valueList}
          </select> </div>

          <div className="value_list">
          <select  value={this.state.loppu} onChange={this.handleChangeEnd}>
            {valueList}
          </select></div><br></br>
          <button className="opt_btn" onClick={this.handleClick.bind(this, 0)}>Alku</button>
        </div> : null }

        {this.state.route ? 
        <div className="routes">
          <p>you want to go to {this.state.alku} to {this.state.loppu}, ok</p>
          <p>meet linjaa {this.state.linjasto} ja aikaa siihen kuluu {this.state.aikataulu} minuuttia.</p>
          
        </div> : null}

          {this.state.result ? 
          <div className="results">
            <p>meet linjaa {this.state.linjasto} ja aikaa siihen kuluu {this.state.aikataulu} minuuttia.</p>

          </div> : null}
      </div>

    </div>);
  };
}



export default App;
