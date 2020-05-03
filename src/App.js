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

    this.reset = this.reset.bind(this);
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
    }
    if(data.linjastot.keltainen[i] === this.state.loppu) {
      loppupaikka = 'keltainen';
    }
  }}

  if(data.linjastot.keltainen.includes(this.state.alku) && 
    data.linjastot.keltainen.includes(this.state.loppu)) {
      samassa = true;
    this.calculateRoute(aloituspaikka, loppupaikka);
    }


    //KAtotaan onko ne punaisessa
    if (data.linjastot.punainen.includes(this.state.alku) || 
    data.linjastot.punainen.includes(this.state.loppu)) {

  for (var j=0; j < data.linjastot.punainen.length; j++) {
    if(data.linjastot.punainen[j] === this.state.alku) {
      aloituspaikka = 'punainen';
    }
    if(data.linjastot.punainen[j] === this.state.loppu) {
      loppupaikka = 'punainen';
    }
    
  }
  if(data.linjastot.punainen.includes(this.state.alku) && 
    data.linjastot.punainen.includes(this.state.loppu)) {
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
    }
      if(data.linjastot.vihreä[k] === this.state.loppu) {
        loppupaikka = 'vihreä';
      }

  }
  if(data.linjastot.vihreä.includes(this.state.alku) && 
  data.linjastot.vihreä.includes(this.state.loppu)) {
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
    }
    if(data.linjastot.sininen[l] === this.state.loppu) {
      loppupaikka = 'sininen';
    }
  }

  if(data.linjastot.sininen.includes(this.state.alku) && 
  data.linjastot.sininen.includes(this.state.loppu)) {
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
   var ap1;
   var lp1;
   var reitti;
   var reitti1;
   var k;
   var i;
   var linja;
   var j;
   var l;
   var m;
   var yksi= true;
   
  /* 
  
  KAIKKI KELTAISTEN REITTIEN VARIAATIOT
  
  */
  if(alkuLinja === 'keltainen') {
    
    ap = data.linjastot.keltainen.indexOf(this.state.alku);
    lp = data.linjastot.keltainen.indexOf(this.state.loppu);
    if(ap<lp) {
      reitti = data.linjastot.keltainen.slice(ap, (lp+1));
    } else {
      reitti = data.linjastot.keltainen.slice(lp, (ap+1));
    }
    reitti = data.linjastot.keltainen.slice(ap, lp);
    for(k=0; k<reitti.length; k++) {

    for(i=0; i<data.tiet.length; i++) {
      if(data.tiet[i].mista === reitti[k] && data.tiet[i].mihin === reitti[k+1]) {
        summa = summa+ data.tiet[i].kesto;
        linja = 'keltainen';
      }

    }}
  }
  //Alku on kolteisessa ja loput muualla
  if(alkuLinja === 'keltainen' && loppuLinja !== 'keltainen') {
    
    //Loppulinja sininen
    if(loppuLinja === 'sininen') {
      //haetaan molemmista yhteinen pysäkki
      for(k=0; k<data.linjastot.keltainen.length; k++) {
        if(yksi === true) {
        if(data.linjastot.sininen.includes(data.linjastot.keltainen[k])){
          //Keltainen reitti
          ap = data.linjastot.keltainen.indexOf(this.state.alku);
          lp = data.linjastot.keltainen.indexOf(data.linjastot.keltainen[k]);
          if(ap<lp) {
            reitti = data.linjastot.keltainen.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.keltainen.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) || 
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //sininen reitti
          ap1 = data.linjastot.sininen.indexOf(this.state.loppu);
          lp1 = data.linjastot.sininen.indexOf(data.linjastot.keltainen[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.sininen.slice(ap1, (lp1+1));
          } else {
            reitti1 = data.linjastot.sininen.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }

    //Loppulinja punainen
    if(loppuLinja === 'punainen') {
            //haetaan molemmista yhteinen pysäkki
            for(k=0; k<data.linjastot.keltainen.length; k++) {
              if(yksi === true) {
              if(data.linjastot.punainen.includes(data.linjastot.keltainen[k])){
                //Keltainen reitti
                ap = data.linjastot.keltainen.indexOf(this.state.alku);
                lp = data.linjastot.keltainen.indexOf(data.linjastot.keltainen[k]);
                if(ap<lp) {
                  reitti = data.linjastot.keltainen.slice(ap, (lp+1));
                } else {
                  reitti = data.linjastot.keltainen.slice(lp, (ap+1));
                }
                
                for(i=0; i<reitti.length; i++){
                  for(j=0; j<data.tiet.length; j++) {
                    if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) || 
                    (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                      summa = summa + data.tiet[j].kesto;
                    }
                  }
                }
                //PUNAINEN REITTI
                ap1 = data.linjastot.punainen.indexOf(this.state.loppu);
                lp1 = data.linjastot.punainen.indexOf(data.linjastot.keltainen[k]);
                if(ap1<lp1) {
                  reitti1 = data.linjastot.punainen.slice(ap1, (lp1+1));
                } else {
                  reitti1 = data.linjastot.punainen.slice(lp1, (ap1+1));
                }
                
                for(l=0; l<reitti1.length; l++){
                  for(m=0; m<data.tiet.length; m++) {
                    if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
                    (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                      summa = summa + data.tiet[m].kesto;
                    }
                  }
                }
                yksi = false;
              }
            }}
    }

    //Loppulinja on vihreä
    if(loppuLinja === 'vihreä') {
      for(k=0; k<data.linjastot.keltainen.length; k++) {
        if(yksi === true) {
        if(data.linjastot.vihreä.includes(data.linjastot.keltainen[k])){
          //Keltainen reitti
          ap = data.linjastot.keltainen.indexOf(this.state.alku);
          lp = data.linjastot.keltainen.indexOf(data.linjastot.keltainen[k]);
          if(ap<lp) {
            reitti = data.linjastot.keltainen.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.keltainen.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) || 
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //VIHREÄ REITTI
          ap1 = data.linjastot.vihreä.indexOf(this.state.loppu);
          lp1 = data.linjastot.vihreä.indexOf(data.linjastot.keltainen[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.vihreä.slice(ap1, (lp1+1));
          } else if(ap1>lp1 && ap1 === 'J') {
            reitti1 = data.linjastot.vihreä.slice(lp1, (ap1));
          } else {
            reitti1 = data.linjastot.vihreä.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }          
  }


/* 

KAIKKI PUNAISTEN REITTIEN VARIAATIOT

*/

  if(alkuLinja === 'punainen') {
    ap = data.linjastot.punainen.indexOf(this.state.alku);
    lp = data.linjastot.punainen.indexOf(this.state.loppu);
    if(ap<lp) {
      reitti = data.linjastot.punainen.slice(ap, (lp+1));
    } else {
      reitti = data.linjastot.punainen.slice(lp, (ap+1));
    }
    
    for(k=0; k<reitti.length; k++) {

    for(i=0; i<data.tiet.length; i++) {
      if((data.tiet[i].mista === reitti[k] && data.tiet[i].mihin === reitti[k+1]) || 
      (data.tiet[i].mista === reitti[k+1] && data.tiet[i].mihin === reitti[k])) {
        summa = summa+ data.tiet[i].kesto;
        linja = 'punainen';
      }

    }}
  }

  //Alku on punaisessa, loput muualla
  if(alkuLinja === 'punainen' && loppuLinja !== 'punainen') {

    //Loppulinja on keltainen
    if(loppuLinja === 'keltainen') {
      //haetaan molemmista yhteinen pysäkki
      for(k=0; k<data.linjastot.punainen.length; k++) {
        if(yksi === true) {
        if(data.linjastot.keltainen.includes(data.linjastot.punainen[k])){
          //punainen
          ap = data.linjastot.punainen.indexOf(this.state.alku);
          lp = data.linjastot.punainen.indexOf(data.linjastot.punainen[k]);
          if(ap<lp) {
            reitti = data.linjastot.punainen.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.punainen.slice(lp, (ap+1));
          }
  
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) ||
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //KELTAINEN REITTI
          ap1 = data.linjastot.keltainen.indexOf(this.state.loppu);
          lp1 = data.linjastot.keltainen.indexOf(data.linjastot.punainen[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.keltainen.slice(ap1, (lp1+1));
          } else {
            reitti1 = data.linjastot.keltainen.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }
    
    //Loppulinja on sininen
      if(loppuLinja === 'sininen') {
        //haetaan molemmista yhteinen pysäkki
        for(k=0; k<data.linjastot.punainen.length; k++) {
          if(yksi === true) {
          if(data.linjastot.sininen.includes(data.linjastot.punainen[k])){
            //PUNAINEN REITTI
            ap = data.linjastot.punainen.indexOf(this.state.alku);
            lp = data.linjastot.punainen.indexOf(data.linjastot.punainen[k]);
            if(ap<lp) {
              reitti = data.linjastot.punainen.slice(ap, (lp+1));
            } else {
              reitti = data.linjastot.punainen.slice(lp, (ap+1));
            }
            
            for(i=0; i<reitti.length; i++){
              for(j=0; j<data.tiet.length; j++) {
                if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) ||
                (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                  summa = summa + data.tiet[j].kesto;
                }
              }
            }
            //sininen reitti
            ap1 = data.linjastot.sininen.indexOf(this.state.loppu);
            lp1 = data.linjastot.sininen.indexOf(data.linjastot.punainen[k]);
            if(ap1<lp1) {
              reitti1 = data.linjastot.sininen.slice(ap1, (lp1+1));
            } else {
              reitti1 = data.linjastot.sininen.slice(lp1, (ap1+1));
            }
            
            for(l=0; l<reitti1.length; l++){
              for(m=0; m<data.tiet.length; m++) {
                if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
                (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                  summa = summa + data.tiet[m].kesto;
                }
              }
            }
            yksi = false;
          }
        }}
    }

    //Loppulinja on vihreä
    if(loppuLinja === 'vihreä') {
      for(k=0; k<data.linjastot.punainen.length; k++) {
        if(yksi === true) {
        if(data.linjastot.vihreä.includes(data.linjastot.punainen[k])){
          //PUNAINEN
          ap = data.linjastot.punainen.indexOf(this.state.alku);
          lp = data.linjastot.punainen.indexOf(data.linjastot.punainen[k]);
          if(ap<lp) {
            reitti = data.linjastot.punainen.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.punainen.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) ||
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //VIHREÄ REITTI
          ap1 = data.linjastot.vihreä.indexOf(this.state.loppu);
          lp1 = data.linjastot.vihreä.indexOf(data.linjastot.punainen[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.vihreä.slice(ap1, (lp1+1));
          } else if(ap1>lp1 && ap1 === 'J') {
            reitti1 = data.linjastot.vihreä.slice(lp1, (ap1));
          } else {
            reitti1 = data.linjastot.vihreä.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])
              ) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }   
  }


  /*
  
  KAIKKI VIHREIDEN REITTIEN VARIAATIOT

  */
  if(alkuLinja === 'vihreä') {
    ap = data.linjastot.vihreä.indexOf(this.state.alku);
    lp = data.linjastot.vihreä.indexOf(this.state.loppu);
    if(ap<lp) {
      reitti = data.linjastot.vihreä.slice(ap, (lp+1));
    } else {
      reitti = data.linjastot.vihreä.slice(lp, (ap+1));
    }
    
    for(k=0; k<reitti.length; k++) {

    for(i=0; i<data.tiet.length; i++) {
      if((data.tiet[i].mista === reitti[k] && data.tiet[i].mihin === reitti[k+1]) || 
      (data.tiet[i].mista === reitti[k+1] && data.tiet[i].mihin === reitti[k])) {
        summa = summa+ data.tiet[i].kesto;
        linja = 'vihreä';
      }

    }}
  }

  //Alkulinja on vihreä, loput on muualla
  if(alkuLinja === 'vihreä' && loppuLinja !== 'vihreä') {

    //Loppulinja on keltainen
    if(loppuLinja === 'keltainen') {
      //haetaan molemmista yhteinen pysäkki
      for(k=0; k<data.linjastot.vihreä.length; k++) {
        if(yksi === true) {
        if(data.linjastot.keltainen.includes(data.linjastot.vihreä[k])){
          //punainen
          ap = data.linjastot.vihreä.indexOf(this.state.alku);
          lp = data.linjastot.vihreä.indexOf(data.linjastot.vihreä[k]);
          if(ap<lp) {
            reitti = data.linjastot.vihreä.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.vihreä.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) ||
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //KELTAINEN REITTI
          ap1 = data.linjastot.keltainen.indexOf(this.state.loppu);
          lp1 = data.linjastot.keltainen.indexOf(data.linjastot.vihreä[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.keltainen.slice(ap1, (lp1+1));
          } else {
            reitti1 = data.linjastot.keltainen.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }
    if(loppuLinja === 'punainen') {
      //haetaan molemmista yhteinen pysäkki
      for(k=0; k<data.linjastot.vihreä.length; k++) {
        if(yksi === true) {
        if(data.linjastot.punainen.includes(data.linjastot.vihreä[k])){
          //vihreä reittin
          ap = data.linjastot.vihreä.indexOf(this.state.alku);
          lp = data.linjastot.vihreä.indexOf(data.linjastot.vihreä[k]);
          if(ap<lp) {
            reitti = data.linjastot.vihreä.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.vihreä.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) || 
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //PUNAINEN REITTI
          ap1 = data.linjastot.punainen.indexOf(this.state.loppu);
          lp1 = data.linjastot.punainen.indexOf(data.linjastot.vihreä[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.punainen.slice(ap1, (lp1+1));
          } else {
            reitti1 = data.linjastot.punainen.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }
    if(loppuLinja === 'sininen') {
      //haetaan molemmista yhteinen pysäkki
      for(k=0; k<data.linjastot.vihreä.length; k++) {
        if(yksi === true) {
        if(data.linjastot.sininen.includes(data.linjastot.vihreä[k])){
          //PUNAINEN REITTI
          ap = data.linjastot.vihreä.indexOf(this.state.alku);
          lp = data.linjastot.vihreä.indexOf(data.linjastot.vihreä[k]);
          if(ap<lp) {
            reitti = data.linjastot.vihreä.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.vihreä.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) ||
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //sininen reitti
          ap1 = data.linjastot.sininen.indexOf(this.state.loppu);
          lp1 = data.linjastot.sininen.indexOf(data.linjastot.vihreä[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.sininen.slice(ap1, (lp1+1));
          } else {
            reitti1 = data.linjastot.sininen.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }         
  }
  

/*

KAIKKI SINISTEN REITTIEN VARIAATIOT

*/
  if(alkuLinja === 'sininen') {
    ap = data.linjastot.sininen.indexOf(this.state.alku);
    lp = data.linjastot.sininen.indexOf(this.state.loppu);
    if(ap<lp) {
      reitti = data.linjastot.sininen.slice(ap, (lp+1));
    } else {
      reitti = data.linjastot.sininen.slice(lp, (ap+1));
    }
    for(k=0; k<reitti.length; k++) {

    for(i=0; i<data.tiet.length; i++) {
      if(data.tiet[i].mista === reitti[k] && data.tiet[i].mihin === reitti[k+1]) {
        summa = summa+ data.tiet[i].kesto;
        linja = 'sininen';
      }
    }}
  }

  if(alkuLinja === 'sininen' && loppuLinja !== 'sininen') {
 
    if(loppuLinja === 'keltainen') {
      //haetaan molemmista yhteinen pysäkki
      for(k=0; k<data.linjastot.vihreä.length; k++) {
        if(yksi === true) {
        if(data.linjastot.keltainen.includes(data.linjastot.vihreä[k])){
          //sininen
          ap = data.linjastot.sininen.indexOf(this.state.alku);
          lp = data.linjastot.sininen.indexOf(data.linjastot.sininen[k]);
          if(ap<lp) {
            reitti = data.linjastot.sininen.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.sininen.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) ||
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //KELTAINEN REITTI
          ap1 = data.linjastot.keltainen.indexOf(this.state.loppu);
          lp1 = data.linjastot.keltainen.indexOf(data.linjastot.sininen[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.keltainen.slice(ap1, (lp1+1));
          } else {
            reitti1 = data.linjastot.keltainen.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }

    if(loppuLinja === 'punainen') {
      //haetaan molemmista yhteinen pysäkki
      for(k=0; k<data.linjastot.vihreä.length; k++) {
        if(yksi === true) {
        if(data.linjastot.punainen.includes(data.linjastot.vihreä[k])){
          //vihreä reittin
          ap = data.linjastot.vihreä.indexOf(this.state.alku);
          lp = data.linjastot.vihreä.indexOf(data.linjastot.sininen[k]);
          if(ap<lp) {
            reitti = data.linjastot.sininen.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.sininen.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) || 
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //PUNAINEN REITTI
          ap1 = data.linjastot.punainen.indexOf(this.state.loppu);
          lp1 = data.linjastot.punainen.indexOf(data.linjastot.sininen[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.punainen.slice(ap1, (lp1+1));
          } else {
            reitti1 = data.linjastot.punainen.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }

    if(loppuLinja === 'vihreä') {
      for(k=0; k<data.linjastot.sininen.length; k++) {
        if(yksi === true) {
        if(data.linjastot.vihreä.includes(data.linjastot.sininen[k])){
          //PUNAINEN
          ap = data.linjastot.sininen.indexOf(this.state.alku);
          lp = data.linjastot.sininen.indexOf(data.linjastot.sininen[k]);
          if(ap<lp) {
            reitti = data.linjastot.sininen.slice(ap, (lp+1));
          } else {
            reitti = data.linjastot.sininen.slice(lp, (ap+1));
          }
          
          for(i=0; i<reitti.length; i++){
            for(j=0; j<data.tiet.length; j++) {
              if((data.tiet[j].mista === reitti[i] && data.tiet[j].mihin === reitti[i+1]) ||
              (data.tiet[j].mista === reitti[i+1] && data.tiet[j].mihin === reitti[i])) {
                summa = summa + data.tiet[j].kesto;
              }
            }
          }
          //VIHREÄ REITTI
          ap1 = data.linjastot.vihreä.indexOf(this.state.loppu);
          lp1 = data.linjastot.vihreä.indexOf(data.linjastot.sininen[k]);
          if(ap1<lp1) {
            reitti1 = data.linjastot.vihreä.slice(ap1, (lp1+1));
          } else if(ap1>lp1 && ap1 === 'J') {
            reitti1 = data.linjastot.vihreä.slice(lp1, (ap1));
          } else {
            reitti1 = data.linjastot.vihreä.slice(lp1, (ap1+1));
          }
          
          for(l=0; l<reitti1.length; l++){
            for(m=0; m<data.tiet.length; m++) {
              if((data.tiet[m].mista === reitti1[l] && data.tiet[m].mihin === reitti1[l+1]) ||
              (data.tiet[m].mista === reitti1[l+1] && data.tiet[m].mihin === reitti1[l])
              ) {
                summa = summa + data.tiet[m].kesto;
              }
            }
          }
          yksi = false;
        }
      }}
    }        
  }

  this.setState({search: false, route: true, linjasto: linja, aikataulu: summa});

}



handleChangeStart(event) {
  this.setState({alku: event.target.value});
}

handleChangeEnd(event) {
  this.setState({loppu: event.target.value});
}

reset(e) {
  this.setState({search:true, route: false, result: false});
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
        <div className="otsikko_logo">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>REITTIHAKU</h1>
          
        </div>
        
        
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
          <p>Näin koronan vuoksi jotkut linjat tulee ajaa pidemmän reitin kautta, pahoittelemme.</p>
          <p>Reitti pysäkiltä {this.state.alku}, pysäkille  {this.state.loppu}!</p>
          <p>meet linjaa {this.state.linjasto} ja aikaa siihen kuluu {this.state.aikataulu} minuuttia.</p>
          
        </div> : null}

          {this.state.result ? 
          <div className="results">
            <p>meet linjaa {this.state.linjasto} ja aikaa siihen kuluu {this.state.aikataulu} minuuttia.</p>
            <button className="re_button" onClick={this.reset.bind(this)}>Katso uusi reitti</button>

          </div> : null}
      </div>

    </div>);
  };
}



export default App;
