var actives;
var queltour = "e";
var j_actif = document.getElementById("j_actif");
var pion = undefined;
var dest = undefined;
var mvt_utilise = false;
var stock = [];
var stock_2 = [];
stock_2 [0] = undefined;

function main (cellule, est_pion) { // Exécute les fonctions principales du jeu [div, bool]
  actives = document.querySelectorAll(".actif");
  activ_p (cellule);
  pion = bouger (pion, cellule, est_pion);
}

function entrer (cellule) { // Met en surbrillance les cases où il est possible d'entrer [div, bool]
  if (est_ext(cellule)){
    if (cellule.classList.contains('eleph') || cellule.classList.contains('rhino')) {
      var i;
      for (i = 0; i < document.querySelectorAll(".entr_p").length; i+=1) {
        document.querySelectorAll(".entr_p")[i].classList.add("entree");
      }
      if (nb_tour() > 4) {
        var c1 = document.getElementById("C1");
        var c5 = document.getElementById("C5");
        c1.classList.add("entree");
        c5.classList.add("entree");
      }
    }
  }
}

function nb_tour () {
  return parseInt(document.getElementById("nb_tour").innerHTML.slice(8));
}

function bouger (pion, dest, est_pion) { // Bouge pion à dest [div, div, bool]
  if (mvt_utilise == false) {
    if (est_pion) {
      pion = document.querySelectorAll(".actif")[0];
      return pion;
    } else {
      }
      entrer(pion);
      case_poss (pion);
      if (dest.classList.contains('entree') || dest.classList.contains('case_p')) {
        dest.classList.add('dest');
        var c_dest = document.querySelectorAll(".dest")[0];
        var dest_st = window.getComputedStyle(c_dest);
        pion.style.setProperty ("top", dest_st.getPropertyValue ("top"));
        pion.style.setProperty ("left", dest_st.getPropertyValue ("left"));
        var i;
        for (i=0; i<document.querySelectorAll(".dest").length; i+=1) {
          document.querySelectorAll(".dest")[i].classList.remove('entree');
          document.querySelectorAll(".dest")[i].classList.remove('case_p');
          document.querySelectorAll(".dest")[i].classList.remove('dest');
        }
        alert ("Choisissez maintenant l'orientation du pion");
        activ_p(pion);
        mvt_utilise = true;
      } else { 
        alert("Vous ne pouvez aller que sur les cases rouges.");
      }
     stock[0] = pion
     //Retire les cases rouges
     retire_case_r ();
  } else {
    retire_case_r ();
    alert ("Vous avez déjà bougé un pion");
    alert ("Choisissez maintenant l'orientation du pion");
    activ_p(pion);
  }
}

function bouger_inv (depart, dest) {  // Bouge un pion départ à dest sans mettre en surbrillance les cases  [div, div]
    var dest_st = window.getComputedStyle(dest);
    if (est_vide(depart).style !== undefined) {
      est_vide(depart).style.setProperty ("top", dest_st.getPropertyValue ("top"));
      est_vide(depart).style.setProperty ("left", dest_st.getPropertyValue ("left"));
    }
}

function gagner () {  // Affiche le gagnant
  var j_agagne = document.getElementById("j_actif").innerHTML.toLowerCase();
  var sens_pion_ac = orientation (document.querySelectorAll(".actif")[0]);
  var i = 1;
  while (! (est_rocher (est_vide(document.getElementById(devant(i))))) && (devant(i+1) != undefined)) {
    if (est_vide (document.getElementById(devant(i+1)))) {
      if (devant(i) !== undefined ) {
      if ((orientation (est_vide(document.getElementById(devant(i)))) == sens_pion_ac) && (est_pion (est_vide (document.getElementById (devant(i)))))) {
        if (est_vide (document.getElementById (devant(i))).classList.contains('rhino')) {
          j_agagne = 'rhinocéros';
        } else if (est_vide (document.getElementById (devant(i))).classList.contains('eleph')) {
          j_agagne = 'éléphants';
        }
      }
    }
  }
  i += 1;
  }
  alert("Les "+j_agagne+" ont gagné !");
}

function id_case (pion) {  // Renvoie l'id de la case en-dessous de pion [div]
  var A_st = window.getComputedStyle(document.getElementById('A1')).getPropertyValue("left");;
  var B_st = window.getComputedStyle(document.getElementById('B1')).getPropertyValue("left");;
  var C_st = window.getComputedStyle(document.getElementById('C1')).getPropertyValue("left");;
  var D_st = window.getComputedStyle(document.getElementById('D1')).getPropertyValue("left");;
  var E_st = window.getComputedStyle(document.getElementById('E1')).getPropertyValue("left");;
  var one_st = window.getComputedStyle(document.getElementById('A1')).getPropertyValue("top");;
  var two_st = window.getComputedStyle(document.getElementById('A2')).getPropertyValue("top");;
  var three_st = window.getComputedStyle(document.getElementById('A3')).getPropertyValue("top");;
  var four_st = window.getComputedStyle(document.getElementById('A4')).getPropertyValue("top");;
  var five_st = window.getComputedStyle(document.getElementById('A5')).getPropertyValue("top");;
  var pion_st = window.getComputedStyle(pion);
  var cell_id = ""
  if (pion_st.getPropertyValue ("left") == A_st) {cell_id += 'A';}
  else if (pion_st.getPropertyValue ("left") == B_st) {cell_id += 'B';}
  else if (pion_st.getPropertyValue ("left") == C_st) {cell_id += 'C';}
  else if (pion_st.getPropertyValue ("left") == D_st) {cell_id += 'D';}
  else if (pion_st.getPropertyValue ("left") == E_st) {cell_id += 'E';}
  if (pion_st.getPropertyValue ("top") == one_st) {cell_id += '1';}
  else if (pion_st.getPropertyValue ("top") == two_st) {cell_id += '2';}
  else if (pion_st.getPropertyValue ("top") == three_st) {cell_id += '3';}
  else if (pion_st.getPropertyValue ("top") == four_st) {cell_id += '4';}
  else if (pion_st.getPropertyValue ("top") == five_st) {cell_id += '5';}
  return cell_id;
}

function case_poss (pion) {  // Ajoute la classe case_p aux cases où pion peut se déplacer [div]
  var cell_id = id_case (pion);
  var i;
  for (i=0; i<document.querySelectorAll(".poss_"+cell_id).length; i+=1) {
    if (nb_tour () < 5) {
      if ((document.querySelectorAll(".poss_"+cell_id)[i] != document.getElementById("C1")) && (document.querySelectorAll(".poss_"+cell_id)[i] != document.getElementById("C5"))) {
        document.querySelectorAll(".poss_"+cell_id)[i].classList.add('case_p');
      }
    } else {
      document.querySelectorAll(".poss_"+cell_id)[i].classList.add('case_p');
    }
  }
}

function retire_case_r () {  // Retire les case en surbrillance (rouge)
  var i;
  var entr_p = document.querySelectorAll(".entr_p");
  var entr_p2 = document.querySelectorAll(".entr_p2");
  var case_p = document.querySelectorAll(".case_p");
  if (entr_p.length != 0) {for (i=0; i<entr_p.length; i+=1) {entr_p[i].classList.remove('entree');}}
  if (entr_p2.length != 0) {for (i=0; i<entr_p2.length; i+=1) {entr_p2[i].classList.remove('entree');}}
  if (case_p.length != 0) {for (i=0; i<case_p.length; i+=1) {case_p[i].classList.remove('case_p');}}
}

function sortir () { // Repositionne les pions à leur position d'origine
  if (!mvt_utilise) {
    var pion = document.querySelectorAll(".actif")[0];
    var pion_st = window.getComputedStyle(pion);
    var A_st = window.getComputedStyle(document.getElementById('A1')).getPropertyValue("left");
    var E_st = window.getComputedStyle(document.getElementById('E1')).getPropertyValue("left");
    var one_st = window.getComputedStyle(document.getElementById('A1')).getPropertyValue("top");
    var five_st = window.getComputedStyle(document.getElementById('A5')).getPropertyValue("top");
    if (pion_st.getPropertyValue("left") == A_st || pion_st.getPropertyValue("left") == E_st || pion_st.getPropertyValue("top") == one_st || pion_st.getPropertyValue("top") == five_st) {
      if (pion.id == 'e1') {
        pion.style.setProperty ("top", "80.65%");
        pion.style.setProperty ("left", "4%");
      } else if (pion.id == "e2") {
        pion.style.setProperty ("top", "80.65%");
        pion.style.setProperty ("left", "22.5%");
      } else if (pion.id == "e3") {
        pion.style.setProperty ("top", "80.65%");
        pion.style.setProperty ("left", "41.1%");
      } else if (pion.id == "e4") {
        pion.style.setProperty ("top", "80.65%");
        pion.style.setProperty ("left", "59.65%");
      } else if (pion.id == "e5") {
        pion.style.setProperty ("top", "80.65%");
        pion.style.setProperty ("left", "78.2%");
      } else if (pion.id == "r1") {
        pion.style.setProperty ("top", "7.15%");
        pion.style.setProperty ("left", "4%");
      } else if (pion.id == "r2") {
        pion.style.setProperty ("top", "7.15%");
        pion.style.setProperty ("left", "22.5%");
      } else if (pion.id == "r3") {
        pion.style.setProperty ("top", "7.15%");
        pion.style.setProperty ("left", "41.1%");
      } else if (pion.id == "r4") {
        pion.style.setProperty ("top", "7.15%");
        pion.style.setProperty ("left", "59.65%");
      } else if (pion.id == "r5") {
        pion.style.setProperty ("top", "7.15%");
        pion.style.setProperty ("left", "78.2%");
      }
    } else {
      alert ("Ce pion n'est pas sur une case extérieure.");
    }
    mvt_utilise = true;
    fin_tour ();
  } else {alert ("Vous avez déjà bougé un pion")}
}

function est_pion (cellule) {
  if (est_vide (cellule) !== true) {
    return (est_vide(cellule).classList.contains('eleph') || est_vide(cellule).classList.contains('rhino'));
  }
  return false;
}

function est_rocher (cellule) {
  var bool = false;
  if (est_vide(cellule) !== true && est_vide(cellule).classList.contains('roc')) {bool = true;}
  return bool;
}

function sortir_inv (cellule) {
  if (est_pion (cellule)) {
    var pion = cellule
    if (pion.id == 'e1') {
      pion.style.setProperty ("top", "80.65%");
      pion.style.setProperty ("left", "4%");
    } else if (pion.id == "e2") {
      pion.style.setProperty ("top", "80.65%");
      pion.style.setProperty ("left", "22.5%");
    } else if (pion.id == "e3") {
      pion.style.setProperty ("top", "80.65%");
      pion.style.setProperty ("left", "41.1%");
    } else if (pion.id == "e4") {
      pion.style.setProperty ("top", "80.65%");
      pion.style.setProperty ("left", "59.65%");
    } else if (pion.id == "e5") {
      pion.style.setProperty ("top", "80.65%");
      pion.style.setProperty ("left", "78.2%");
    } else if (pion.id == "r1") {
      pion.style.setProperty ("top", "7.15%");
      pion.style.setProperty ("left", "4%");
    } else if (pion.id == "r2") {
      pion.style.setProperty ("top", "7.15%");
      pion.style.setProperty ("left", "22.5%");
    } else if (pion.id == "r3") {
      pion.style.setProperty ("top", "7.15%");
      pion.style.setProperty ("left", "41.1%");
    } else if (pion.id == "r4") {
      pion.style.setProperty ("top", "7.15%");
      pion.style.setProperty ("left", "59.65%");
    } else if (pion.id == "r5") {
      pion.style.setProperty ("top", "7.15%");
      pion.style.setProperty ("left", "78.2%");
    }
  } else if (est_rocher (cellule)) {
    gagner ();
  }
}

function pousser () {
  if (mvt_utilise === false) {
    var i=pouss_compt()
    if (pouss_poss()) {
      while ( i!==0 ) {
        if (devant(i+1) !== undefined) {
          bouger_inv(est_vide(document.getElementById(devant(i))), document.getElementById(devant(i+1)));
          i -= 1 }
        else if(devant(i+1) === undefined) {
          sortir_inv(est_vide(document.getElementById(devant(i))));
          i-=1
        }
      }
    mvt_utilise= false;
    bouger(document.querySelectorAll(".actif")[0],document.getElementById(devant(1)))
    mvt_utilise= true;
    fin_tour ();
    }
  }
  else {alert("Vous avez déjà utilisé votre action.")}
}


function entrer_en_poussant () {
  
}

function deselect () {  // Retire toutes les cases en surbrillance et désélectionne le pion activé
  retire_case_r ();
  actives = document.querySelectorAll(".actif");
  if (actives.length != 0) {actives[0].classList.remove('actif');}
}

function rester () {
  alert("Choisissez l'orientation du pion ou finissez votre tour")
}

function est_ext (cellule) { // Détermine si la cellule/le pion est en réserve [div]
  var el_st = window.getComputedStyle(document.getElementById('ref_e')).getPropertyValue("top");
  var rh_st = window.getComputedStyle(document.getElementById('ref_r')).getPropertyValue("top");
  var plat_st = window.getComputedStyle(document.getElementById('plateau')).getPropertyValue("height");
  var cel = window.getComputedStyle(cellule);
  var cel_st = ((cel.getPropertyValue("top").slice(0,-2) / plat_st.slice(0,-2))*100).toFixed(2) +'%';
  if (cel_st == el_st || cel_st == rh_st ) {return true}
  return false
}

function activ_p (cellule) { // Ajoute la classe actif à cellule afin de la sélectionner [div]
  retire_case_r ();
  if (! (0 in stock) || cellule == stock[0]) { 
    if (actives.length != 0) {actives[0].classList.remove('actif');}
    if (queltour === "e") {                              //Permet d'activer uniquement les pions éléphant
      if (cellule.classList.contains('eleph')) {
        cellule.classList.add("actif");
        case_poss (cellule);
        if (est_ext (cellule)) {entrer (cellule);}
      }
    } else {
      if (cellule.classList.contains('rhino')) {         //Permet d'activer uniquement les pions rhino
        cellule.classList.add("actif");
        case_poss (cellule);
        if (est_ext (cellule)) {entrer (cellule);}
      }
    }
  } else if (est_pion (cellule)) {alert ('Vous ne pouvez pas sélectionner un autre pion.')}
}

function fin_tour () {
  //Retire les cases actives
  actives = document.querySelectorAll(".actif");
  if (mvt_utilise == false && (stock_2[0] == undefined) || stock_2[0] == orientation (document.querySelectorAll(".actif")[0])) {alert ("Vous n'avez effectué aucune action pendant ce tour")}
  else {
    if (actives.length != 0) {actives[0].classList.remove('actif');};

    //Actualise le numéro de tour
    var j_actif = document.getElementById("j_actif");
    var str_tour = document.getElementById("nb_tour").innerHTML;
    var nb_tour = str_tour.slice(8);
    var tour_suiv = parseInt(nb_tour,10)+1;
    document.getElementById("nb_tour").innerHTML = 'Tour n° '+ tour_suiv;

    mvt_utilise = false;

    //Actualise le nom du joueur actif
    if (queltour === "e") {
        j_actif.innerHTML = "Rhinocéros";
        j_actif.className = "j_actif_r";
        queltour = "r";
      } else {
        j_actif.innerHTML = "Éléphants";
        j_actif.className = "j_actif_e";
        queltour = "e";
      }
    stock = [];
    retire_case_r ();
    alert ('Le tour est aux '+j_actif.innerHTML.toLowerCase()+'.')
  }
}

function hover (cellule) { // Ajoute la classe hoverable aux pions de l'équipe active [div]
  if (queltour === "e" && cellule.className == 'eleph') {
    cellule.classList.add('hoverable');
  }
  else if (queltour === "r" && cellule.className == 'rhino') {
    cellule.classList.add('hoverable');
  }
}

function out (cellule) {  //Retire la classe hoverable de l'élement cellule [div]
  cellule.classList.remove('hoverable');
}

function orientation (pion) {  //Récupère l'orientation du pion pion [div]
  if (est_pion(pion)) {
    var sens;
    var tr = window.getComputedStyle(pion).getPropertyValue("transform");
    var values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];
    var scale = Math.sqrt(a*a + b*b);
    var sin = b/scale;
    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    if (angle == "180") {sens = "gauche";}
    else if (angle == "90") {sens = "bas";}
    else if (angle == "0") {sens = "droite";}
    else {sens = "haut";}  
    return sens;
  }
}

function rotate (sens) {  // Tourne le pion actif du sens sens [str]
  let pion = document.querySelectorAll(".actif")[0];
  if (!(0 in stock)) {stock[0] = pion; stock_2[0] = orientation (pion)}
  actives = document.querySelectorAll(".actif");
  if (sens == "gauche") {actives[0].style.transform = 'rotate(180deg)';}
  else if (sens == "droite") {actives[0].style.transform = 'rotate(0deg)';}
  else if (sens == "haut") {actives[0].style.transform = 'rotate(270deg)';}
  else if (sens == "bas") {actives[0].style.transform = 'rotate(90deg)';}
}

function sens_inverse (pion) {  // Détermine le sens inverse de pion [div]
  var sens = orientation (pion);
  if (sens == "gauche") {return 'droite';}
  else if (sens == "droite") {return 'gauche';}
  else if (sens == "haut") {return 'bas';}
  else if (sens == "bas") {return 'haut';}
}

function statut_case (cellule) {  // [div]
  var pion = document.querySelectorAll(".actif")[0];
  var cel = window.getComputedStyle(cellule);
  var cel_top = cel.getPropertyValue("top");
  var cel_left = cel.getPropertyValue("left");
  if (orientation(pion) == sens_inverse(cellule) && (cellule.classList.contains('eleph') || cellule.classList.contains('rhino'))) {return "p_iv"} // Détecte si cellule est dans le sens inverse de pion
  else if (orientation(pion) == orientation(cellule) && (cellule.classList.contains('eleph') || cellule.classList.contains('rhino'))) {return "p_mm"} // Détecte si cellule est dans le même sens que pion
  var i;
  for (i=1; i<=document.querySelectorAll(".roc").length; i+=1) {
    let actu = document.getElementById("roc"+i)
    if (cel_top == window.getComputedStyle(actu).getPropertyValue("top")) {
      if (cel_left == window.getComputedStyle(actu).getPropertyValue("left")) {
        return "roc";  // Détecte si cellule est un rocher
      }
    }
  }
}

function devant (nb_case, pion_id=undefined) {  // Détermine l'id de la case devant le pion actif [int, str]
  var pion = document.querySelectorAll(".actif")[0];
  if (pion_id === undefined) {pion_id = id_case (pion);}
  var acc = 0;
  if (nb_case==1) {
    if (orientation (pion) == "bas") {
      if (pion_id.slice(0, 1) == "A") {pion_id = "B"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "B") {pion_id = "C"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "C") {pion_id = "D"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "D") {pion_id = "E"+pion_id.slice(1, 2)}
      else {return undefined;}
    }
    if (orientation (pion) == "haut") {
      if (pion_id.slice(0, 1) == "E") {pion_id = "D"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "B") {pion_id = "A"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "C") {pion_id = "B"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "D") {pion_id = "C"+pion_id.slice(1, 2)}
      else {return undefined;}
    }
    if (orientation (pion) == "droite") {
      if (pion_id.slice(1, 2) == "2") {pion_id = pion_id.slice(0, 1)+"1"}
      else if (pion_id.slice(1, 2) == "3") {pion_id = pion_id.slice(0, 1)+"2"}
      else if (pion_id.slice(1, 2) == "4") {pion_id = pion_id.slice(0, 1)+"3"}
      else if (pion_id.slice(1, 2) == "5") {pion_id = pion_id.slice(0, 1)+"4"}
      else {return undefined;}
    }
    if (orientation (pion) == "gauche") {
      if (pion_id.slice(1, 2) == "1") {pion_id = pion_id.slice(0, 1)+"2"}
      else if (pion_id.slice(1, 2) == "2") {pion_id = pion_id.slice(0, 1)+"3"}
      else if (pion_id.slice(1, 2) == "3") {pion_id = pion_id.slice(0, 1)+"4"}
      else if (pion_id.slice(1, 2) == "4") {pion_id = pion_id.slice(0, 1)+"5"}
      else {return undefined;}
    }
  } else if (nb_case < 5) {pion_id = devant(nb_case-1, devant(1, pion_id));}
  else {return undefined;}
  return pion_id;
}

function est_vide (cellule) {  // Retourne true si case vide, sinon retourne le pion qui l'occupe [div]
  var cel = window.getComputedStyle(cellule);
  var cel_top = cel.getPropertyValue("top");
  var cel_left = cel.getPropertyValue("left");
  var i;
  for (i=1; i<=document.querySelectorAll(".eleph").length; i+=1) {
    let actu = document.getElementById("e"+i)
    if (cel_top == window.getComputedStyle(actu).getPropertyValue("top")) {
      if (cel_left == window.getComputedStyle(actu).getPropertyValue("left")) {
        return actu;
      }
    }
  }
  for (i=1; i<=document.querySelectorAll(".rhino").length; i+=1) {
    let actu = document.getElementById("r"+i)
    if (cel_top == window.getComputedStyle(actu).getPropertyValue("top")) {
      if (cel_left == window.getComputedStyle(actu).getPropertyValue("left")) {
        return actu;
      }
    }
  }
  for (i=1; i<=document.querySelectorAll(".roc").length; i+=1) {
    let actu = document.getElementById("roc"+i)
    if (cel_top == window.getComputedStyle(actu).getPropertyValue("top")) {
      if (cel_left == window.getComputedStyle(actu).getPropertyValue("left")) {
        return actu;
      }
    }
  }
  return true;
}

function pouss_poss () { // Détermine si la poussée est possible
  var force = 1;
  var i=1;
  if (est_vide(document.getElementById(devant(i))) === true) {alert("Il n'y a rien à pousser"); return false;}
  while (!(devant(i) === undefined)) {
    if (est_vide(document.getElementById(devant(i))) === true) {break;}
    if (statut_case (est_vide(document.getElementById(devant(i)))) === "p_iv") {force-=1;}
    if (statut_case (est_vide(document.getElementById(devant(i)))) === "p_mm") {force += 1;}
    if (statut_case (document.getElementById(devant(i))) === "roc") {force-= 0.9;}
    if (force <= 0) {alert("C'est trop lourd");
                           return false;}
    i += 1;
  }
  return true;
}

function pouss_compt () { // Détermine si la poussée est possible
  var force = 1;
  var i=1;
  if (est_vide(document.getElementById(devant(i))) === true) {return false;}
  while (!(devant(i) === undefined)) {
    if (est_vide(document.getElementById(devant(i))) === true) {break;}
    if (statut_case (est_vide(document.getElementById(devant(i)))) === "p_iv") {force-=1;}
    if (statut_case (est_vide(document.getElementById(devant(i)))) === "p_mm") {force += 1;}
    if (statut_case (document.getElementById(devant(i))) === "roc") {force-= 0.9;}
    if (force <= 0) {;}
    i += 1;
  }
  return i-1;
}