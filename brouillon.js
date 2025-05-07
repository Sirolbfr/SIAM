function pouss_poss2 () {
  var force = 1;
  var i=0;
  if (est_vide(document.getElementById(devant2(i)))) {alert("Il n'y a rien à pousser"); return false;}
  while (!(devant2(i) === undefined)) {
    if (statut_case (document.getElementById(devant2(i)) === "p_iv")) {force-=1;}
    if (statut_case (document.getElementById(devant2(i)) === "p_mm")) {force += 1;}
    if (statut_case (document.getElementById(devant2(i)) === "roc")) {force-= 0.9;}
    if (force <= 0) {return false; alert("C'est trop lourd");}
    i += 1;
  }
  return true;
}

function devant2 (nb_case, pion_id=undefined) {
  var pion = document.querySelectorAll(".actif")[0];
  if (pion_id === undefined) {pion_id = id_case (pion);}
  var acc = 0;
  if (nb_case==1) {
    if (orientation (pion) == "bas") {
      if (pion_id.slice(0, 1) == "A") {pion_id = "B"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "B") {pion_id = "C"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "C") {pion_id = "D"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "D") {pion_id = "E"+pion_id.slice(1, 2)}
      else {console.log("Case inexistante");}
    }
    if (orientation (pion) == "haut") {
      if (pion_id.slice(0, 1) == "E") {pion_id = "D"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "B") {pion_id = "A"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "C") {pion_id = "B"+pion_id.slice(1, 2)}
      else if (pion_id.slice(0, 1) == "D") {pion_id = "C"+pion_id.slice(1, 2)}
      else {console.log("Case inexistante");}
    }
    if (orientation (pion) == "droite") {
      if (pion_id.slice(1, 2) == "2") {pion_id = pion_id.slice(0, 1)+"1"}
      else if (pion_id.slice(1, 2) == "3") {pion_id = pion_id.slice(0, 1)+"2"}
      else if (pion_id.slice(1, 2) == "4") {pion_id = pion_id.slice(0, 1)+"3"}
      else if (pion_id.slice(1, 2) == "5") {pion_id = pion_id.slice(0, 1)+"4"}
      else {console.log("Case inexistante");}
    }
    if (orientation (pion) == "gauche") {
      if (pion_id.slice(1, 2) == "1") {pion_id = pion_id.slice(0, 1)+"2"}
      else if (pion_id.slice(1, 2) == "2") {pion_id = pion_id.slice(0, 1)+"3"}
      else if (pion_id.slice(1, 2) == "3") {pion_id = pion_id.slice(0, 1)+"4"}
      else if (pion_id.slice(1, 2) == "4") {pion_id = pion_id.slice(0, 1)+"5"}
    }
  } else if (nb_case <5) {
    if (orientation (pion) == "bas") {
      if (pion_id.slice(0, 1) == "A") {if (nb_case+acc > 4) {return undefined;} }
      else if (pion_id.slice(0, 1) == "B") {if (nb_case+acc > 3) {return undefined;}}
      else if (pion_id.slice(0, 1) == "C") {if (nb_case+acc > 2) {return undefined;}}
      else if (pion_id.slice(0, 1) == "D") {if (nb_case+acc > 1) {return undefined;}}
    }
    if (orientation (pion) == "haut") {
      if (pion_id.slice(0, 1) == "E") {if (nb_case+acc > 4) {return undefined;}}
      else if (pion_id.slice(0, 1) == "B") {if (nb_case+acc > 1) {return undefined;}}
      else if (pion_id.slice(0, 1) == "C") {if (nb_case+acc > 2) {return undefined;}}
      else if (pion_id.slice(0, 1) == "D") {if (nb_case+acc > 3) {return undefined;}}
    }
    if (orientation (pion) == "droite") {
      if (pion_id.slice(1, 2) == "2") {if (nb_case+acc > 1) {return undefined;}}
      else if (pion_id.slice(1, 2) == "3") {if (nb_case+acc > 2) {return undefined;}}
      else if (pion_id.slice(1, 2) == "4") {if (nb_case+acc > 3) {return undefined;}}
      else if (pion_id.slice(1, 2) == "5") {if (nb_case+acc > 4) {return undefined;}}
    }
    if (orientation (pion) == "gauche") {
      if (pion_id.slice(1, 2) == "1") {if (nb_case+acc > 4) {return undefined;}}
      else if (pion_id.slice(1, 2) == "2") {if (nb_case+acc > 3) {return undefined;}}
      else if (pion_id.slice(1, 2) == "3") {if (nb_case+acc > 2) {return undefined;}}
      else if (pion_id.slice(1, 2) == "4") {if (nb_case+acc > 1) {return undefined;}}
    }
    acc += 1;
    console.log(acc);
    pion_id = devant(nb_case-1, devant(1, pion_id));
  }
  else {return undefined;}
  return pion_id;
}