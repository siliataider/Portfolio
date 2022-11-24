/*const light = document.getElementById('light');
//const dark = document.getElementById('dark');


light.addEventListener('click', function onClick(event) {
//document.body.style.background = "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 50%)";
document.body.style.background = 'rgb(27, 28, 32)';
// document.body.style.color = 'white';
});

dark.addEventListener('click', function onClick(event) {
  document.body.style.background = 'black';
  // document.body.style.color = 'white';
});

*/

// Notre "Base de donnée". Les destinations puis les utilisateurs.
let diplomas = [
  { school: "CPE Lyon Engineering School", diploma:"Engineering Diploma (Masters)", image: "img/cpe.png", major: "Software Design and Big Data", description: "toto", modules: "toto"},
  { school: "CPE Lyon Engineering School", diploma:"Bachelor's Degree", image: "img/cpe.png", major: "Electronics, Telecommunications and Computer Science", description: "toto", modules: "toto"},
  { school: "Universite Claude Bernard Lyon 1", diploma:"Bachelor's Degree", image: "img/ucbl1.jpg", major: "Fundamental Physics", description: "toto", modules: "toto"}
];

// Template
 let template = document.querySelector("#schools");

 /*
for (const d of diplomas) {					
    let clone = document.importNode(template.content, true);     

    newContent = clone.firstElementChild.innerHTML	
        .replace(/{{school}}/g, d.school)				
        .replace(/{{diploma}}/g, d.diploma)
        .replace(/{{image}}/g, d.image)				
        .replace(/{{major}}/g, d.major)
        .replace(/{{description}}/g, d.description)				
        .replace(/{{modules}}/g, d.modules)

        clone.firstElementChild.innerHTML = newContent
     
        //clone.firstElementChild.firstElementChild.style.backgroundImage="url('"+d.image+"')",		
        
    document.body.appendChild(clone);
    
}
*/

//Fonction qui affiche le nom de la ville que la personne veut réserver.
function reservez() {

  u = new window.URLSearchParams(window.location.search)
  //récupère la destination choisie
  const ville = u.get("destination");
  //Change l'intitulé de la page.
  let txtrecap = document.getElementById("dest")
  txtrecap.innerHTML = "Votre voyage pour " + ville ;
  }
  
  function pres() {
  let presville = document.getElementById("ville")
  presville.innerHTML = VILLE
  }

// Demande la ville de départ pour ajuster les voyages (prix, destination). 
//Enlevée car dégrade l'experience utilisateur (Fonction jamais appelée)
function ville_depart() {
  const depart=prompt("De quelle ville venez vous ?");
  let dest=document.getElementById('destination');
  dest.innerHTML= "Nos destination au départ de " + depart + ' !';
}

//Fonction météo avec l'utilisation de l'API OpenWeatherMap
var n=0
var appliAPI = function(data) {
  var element = document.getElementsByClassName("zone_meteo");
  var zone = element[n]
  n=n+1
  zone.innerHTML = "La temperature actuelle est de " + data.main.temp + " °C";

}

function appelAPI() {
  //Boucle pour appeler la fonction à chaque ville.
  filterSelection("all");

  for (var i in destinations){
    ville = new Array(destinations[i].ville)
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric"
    
    //utilisation de Jquery
    $.get(url, appliAPI).done(function() {
    })
    .always(function() {
      

    });
}
}

//Calcul du prix du voyage
function calcul(nb_adulte,nb_enfant,depart,retour,prix,dej){
  
  //duree du voyage
  d=depart.getDate()
  r=retour.getDate()
  duree=r-d

  //calcul du prix
  prix= (nb_adulte*prix+nb_enfant*(prix*0.4))*duree;

  var dej = document.getElementsByName('user_breakfast')
  
  if(dej[0].checked){
    prix=prix+ (12*(nb_adulte+nb_enfant))*duree
  }

  return prix
}

//Affichage du prix du voyage dans le formulaire de reservation
 function change() {
  //on récupère les elements du formulaire
  const nb_adulte = document.getElementById('adults').value;
  const nb_enfant = document.getElementById('kids').value;
  const depart =document.getElementById('departure').valueAsDate
  const retour =document.getElementById('return').valueAsDate  
  const dej= document.getElementsByName('dej');
  un = new window.URLSearchParams(window.location.search)
  
  const ville2 = un.get("destination");
  console.log(ville2)

  for (i=0; i< destinations.length; i++){
    if (destinations[i].ville==ville2) {
      prix=destinations[i].prix
    }
  }
  console.log(prix)
  //On vérifie que les dates sont valides
  if (depart>retour) {
    alert("La date de retour doit être superieur à la date d'arrivée")
    retour.innerHTML = ""
  }
  //on récupère le résultat du calcul
  price= calcul(nb_adulte,nb_enfant,depart,retour,prix,dej)

//on affiche le prix
  let aff_prix = document.getElementById('prix');
  aff_prix.innerHTML = "Le prix est maintenant de " + price+ "€";
}


//Fonction de connexion. Teste les mot de passe avec des conditions.
function hello() {
  const username = document.getElementById('coname').value;
  const password = document.getElementById('copass').value;
  condition = false;

  for (i=0; i< baseDonnees.length; i++){
    if (baseDonnees[i].user==username && baseDonnees[i].psw==password) {
      const connexion = document.getElementById("bonjour")
      connexion.innerHTML = "Bonjour "+ username + " !"
      connexion.style.color = "white"
      connexion.style.padding = "1em"
      connexion.style.fontWeight = "500"
      connexion.style.textShadow ="rgb(250, 250, 250) 1px 0 10px"
      condition = true;
      break
    } 
  }

  if (condition == false) {
    alert("Mot de passe incorrect")
  }
  
}

//Fonction qui récapitule les données utilisateur pour qu'il les vérifient avant de payer.
function recap() {
  u = new window.URLSearchParams(window.location.search)

  const nb_adulte = u.get("user_adults");
  const nb_enfant = u.get("user_kids");
  const nom = u.get("user_name");
  const num_reserv= 1000*Math.random()

  let txtrecap = document.getElementById("recap")
  txtrecap.innerHTML = "Bonjour M. ou Mme " + nom + "! <br\> Vous souhaitez réserver un voyage pour " + nb_adulte + " adultes, et " + nb_enfant +" enfants. <br\> Votre numero de reservation est le : " + num_reserv+ "<br\>Profitez de votre voyage !! ";
  }
  
  /// Fonction permettant d'afficher une video au survol de la ville, et de nous envoyer vers la page de reservation de la ville.
  ///Nous n'avons pas eu le temps de finir cette fonction, la soucre n'est pas modifiée selon la ville. C'est donc toujours la meme video qui s'afffiche. 
  function entreSVG(city, element) {
    document.getElementById(element).setAttribute("fill","#b95353");
    document.getElementById("video").hidden=false
    for (var i in destinations){
      if (destinations[i].ville==city){
        source = destinations[i].video
      }
    }
    document.getElementById("video").src= source + "autoplay=1"
    
  }
  
  function sortSVG(element) {
    document.getElementById(element).setAttribute("fill","#130e3b"); 
    document.getElementById("video").hidden=true

  }

  function cliqueImage(city){
    document.location.href="Reservation.html?destination=" + city; 
  }


var images = ['cpe.png', 'ucbl1.png', 'cpe.png'];
var h2 = ['BEELYS: Campus Creation - Business Creation Competition', 'Card market (Spring-Boot-Microservices-Junit-Mockito-Unit-Testing)', 'Fire Simulator', 'Les Acupuncteurs Lyonnais', 'Travel Agency Website', 'Clone Castle website'];
var i = 0;

function prev(){
	if(i <= 0) i = 3;	
	i--;
	return setImg();			 
}

function next(){
	if(i >= 3-1) i = -1;
	i++;
	return setImg();			 
}

function setImg(a){
  if(a==0) { //previous
    if(i <= 0) i = 3;	
	  i--;
  }
  else if(a==1){ //next
    if(i >= 3-1) i = -1;
	  i++;
  }

  const el = document.getElementById('project-article');
  return el.setAttribute('h2', h2[i]);
	
}


$('body').on('click', '.next', function() { 
  var id = $('.contenu:visible').data('id');
  var nextId = $('.contenu:visible').data('id')+1;
  $('[data-id="'+id+'"]').hide();
  $('[data-id="'+nextId+'"]').show();

  if($('.back:hidden').length == 1){
      $('.back').show();
  }

  if(nextId == 7){
      $('.contenu-holder').hide();
      $('.end').show();
  }
});

$('body').on('click', '.back', function() { 
  var id = $('.contenu:visible').data('id');
  var prevId = $('.contenu:visible').data('id')-1;
  $('[data-id="'+id+'"]').hide();
  $('[data-id="'+prevId+'"]').show();

  if(prevId == 1){
      $('.back').hide();
  }    
});

$('body').on('click', '.edit-previous', function() { 
  $('.end').hide();
  $('.contenu-holder').show();
  $('#contenu-6').show();
});