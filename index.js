
var
foundArea = document.getElementById('found_area'),
searchWord = document.getElementById('search_input'),
searchCont = document.getElementById('search'),
userAns = document.getElementById('answered'),
favoritesList = document.getElementById("favorites_list"),
dictionarySec = document.getElementById("dictionary_sec"),
exercisesSec = document.getElementById("exercises_sec"),
allSections = document.getElementById("container").getElementsByTagName("section"),
allMenuBars = document.querySelectorAll(".menu_item"),
favSec = document.getElementById("favorites_sec"),
favoriteWords = [],
searchedWords = [],
writeTransDiv = document.getElementById("write_trans"),
writeTransInput,
transLang = document.getElementById("trans_lang"),
writeTransQuestion = document.getElementById("write_trans_question"),
writeTranResult = document.getElementById("trans_result"),
chooseTransQuest = document.getElementById("choose_quest"),
chooseOptions = document.getElementById("select_trans").querySelectorAll(".choose_opt"),
chooseTransLang = document.getElementById("chooseTrans_lang"),
chooseTransLearned = document.getElementById("choose_learned"),
chooseResult = document.getElementById("choose_result"),
optIndex = 0,
correctOpt = 0,
favNouns = [],
nounsIndex = 0,
artQuest = exercisesSec.querySelector("#art_quest"),
allArticles = document.getElementById("choose_art").querySelectorAll(".choose_opt"),
artLearned = document.getElementById("art_learned");

(function( win ){
	var doc = win.document;
	
	// If there's a hash, or addEventListener is undefined, stop here
	if(!win.navigator.standalone && !location.hash && win.addEventListener ){
		
		//scroll to 1
		win.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
		
			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );
		
		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		}, false );
	}
})( this );
window.addEventListener("load",()=>{
  document.getElementById("loading_cont").remove();
  document.getElementById("super").style.display="block";
   });

function displaySec(event){
for(let i=0; i < allSections.length;i++){
  allSections[i].style.display = "none";
  allSections[i].classList.remove("active_sec");
}
for (let index = 0; index < allMenuBars.length; index++) {
  if(allMenuBars[index].classList.contains("active_bar")) allMenuBars[index].classList.remove("active_bar");
}
event.target.classList.add("active_bar");
document.getElementById(event.target.classList[0]+"_sec").style.display = "block";
document.getElementById(event.target.classList[0]+"_sec").classList.add("active_sec")
}
var menuBar = document.getElementById('floating_menu');
window.addEventListener('scroll', () =>{
if(window.scrollY > 70){
  menuBar.style.display= "block";
  menuBar.style.position = "fixed";
  menuBar.style.bottom="1px";
}
else{
  menuBar.style.display= "none";
}
});
/**
* Dictionary funcions
*/
function searchable(){
let searched = searchWord.value;
if(searched[searched.length-1] === ""){
toSearch =  searched.slice(0,-1).toUpperCase();
}
return searched.toUpperCase();
}
function read(element){
let reader = new SpeechSynthesisUtterance(element.nextElementSibling.innerText);
if(element.nextElementSibling.classList[1] === "de") reader.lang = "de-DE";
else reader.lang = "en-Us";
reader.rate = 0.6;
speechSynthesis.speak(reader);
}
var enteredWord = "";
function finder(event) {
if(event.key === "Enter"){
  enteredWord = searchable().toLowerCase();
let foundWord = ``;
for (const word in NounsFromEngToDe) {
if(word === searchable()){
  let article = (NounsFromEngToDe[word][0] != "null")? NounsFromEngToDe[word][0] : "";
  foundWord += `<div class="vocabulary">`;
  foundWord += `<div class="top_area">
      <i class="word_type noun">Noun:</i>
      <i class="flag germany">&#127465;&#127466;</i>
  </div>`;
  foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found"><b class="article">${article}</b> <b class="de_noun">${NounsFromEngToDe[word][1]}</b></span><br>`;
  if(NounsFromEngToDe[word][2] != 'null'){foundWord += `Plural:  <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found"><b class="plural">${NounsFromEngToDe[word][2]}</b></span>`;}
  foundWord += `</div>`;
}
}
for (const word in NounsFromDeToEng) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type noun">Noun:</i>
  <i class="flag usa">&#127482;&#127480;</i>
  </div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word en found"><b class="en_noun">${NounsFromDeToEng[word][0]}</b></span><br>
<i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found"><b class="article">${NounsFromDeToEng[word][1]}</b> <b class="de_noun">${searchable()}</b>, <b class="plural">${NounsFromDeToEng[word][2]}</b></span>`;
foundWord += `</div>`;  
}
}
for (const word in VerbsFromDeToEng) {
if(word.split('@')[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type verb">Verb:</i>
  <i class="flag usa">&#127482;&#127480;</i>
</div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word en found">${VerbsFromDeToEng[word].split("@")[0]}</span>`;
if(VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",").length ===4){
  foundWord += `<div class="conjugation"> Irregular verb:`
  foundWord += `<p>Präsens: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found present">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",")[1]}</span></p>`;
  foundWord += `<p>Präteritum: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found imperfect">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",")[2]}</span></p>`;
  foundWord += `<p>P. Perfekt: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found p_p">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",")[3]}</span></p>`;
  foundWord += `</div>`
}
if(VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("##").length > 1){
  foundWord += `<i class="cases_eng"> ${searchable().toLowerCase()} ${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("##")[0].split(",")[1]}</i>`;
  foundWord += `<p>Beispielsatz: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found example">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("##")[1]}</p>`;
}
if(VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("**").length > 1){
  foundWord += `<br><i class="with_prep_eng"> ${searchable().toLowerCase()} + ${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split(",")[1].split("**")[0]}</i>`;
  foundWord += `<i class="cases"> + ${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("**")[1]}<i>`;
  foundWord += `<p>Beispielsatz: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found example">${VerbsFromEngToDe[VerbsFromDeToEng[word]].split("@")[0].split("**")[2]}</span>`;
}
foundWord += `</div>`;
}
}
for (const word in VerbsFromEngToDe) {
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type verb">Verb:</i>
  <i class="flag germany">&#127465;&#127466;</i>
</div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found">${VerbsFromEngToDe[word].split("@")[0].split(",")[0]}</span>`;
if(VerbsFromEngToDe[word].split("@")[0].split(",").length ===4){
  foundWord += `<div class="conjugation"> Irregular verb:`
  foundWord += `<p>Präsens: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found present">${VerbsFromEngToDe[word].split("@")[0].split(",")[1]}</span></p>`;
  foundWord += `<p>Präteritum: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found imperfect">${VerbsFromEngToDe[word].split("@")[0].split(",")[2]}</span></p>`;
  foundWord += `<p>P. Perfekt: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found p_p">${VerbsFromEngToDe[word].split("@")[0].split(",")[3]}</span></p>`;
  foundWord += `</div>`
}
if(VerbsFromEngToDe[word].split("@")[0].split("##").length > 1){
  foundWord += `<i class="cases"> ${VerbsFromEngToDe[word].split("@")[0].split(",")[1].split("##")[0]}</i>`;
  foundWord += `<p>Beispielsatz: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found example">${VerbsFromEngToDe[word].split("@")[0].split("##")[1]}</p>`;
}
if(VerbsFromEngToDe[word].split("@")[0].split("**").length > 1){
  foundWord += `<i class="with_prep"> + ${VerbsFromEngToDe[word].split("@")[0].split(",")[1].split("**")[0]}</i>`;
  foundWord += `<i class="cases"> + ${VerbsFromEngToDe[word].split("@")[0].split("**")[1]}<i>`;
  foundWord += `<p>Beispielsatz: <i class="mic" onclick="read(this)">&#128266;</i><span class="word_notes de found example">${VerbsFromEngToDe[word].split("@")[0].split("**")[2]}</span>`;
}
foundWord += `</div>`;
}
}
for (const word in AdjectivesFromEngToDe) { 
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type adjective">Adjective:</i>
  <i class="flag germany">&#127465;&#127466;</i>
</div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found">${AdjectivesFromEngToDe[word].split("@")[0]}</span>`;
foundWord += `</div>`;
}
}
for (const word in AdjectivesFromDeToEng) {
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
<i class="word_type adjective">Adjective:</i>
<i class="flag usa">&#127482;&#127480;</i>
</div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word en found">${AdjectivesFromDeToEng[word].split("@")[0]}</span>`;
foundWord += `</div>`;
}}
for (const word in AdverbsFromEngToDe) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type adverb">Adverb:</i>
  <i class="flag germany">&#127465;&#127466;</i>
  </div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found">${AdverbsFromEngToDe[word]}</span>`;
foundWord += `</div>`;
}}
for (const word in PronounsFromEngToDe) {
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
<i class="word_type pronoun">Pronoun:</i>
<i class="flag germany">&#127465;&#127466;</i>
</div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found">${PronounsFromEngToDe[word].split("@")[0]}</span>`;
foundWord += `</div>`;
}}
for (const word in PronounsFromDeToEng) {
if(word.split("@")[0] === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
<i class="word_type pronoun">Pronoun:</i>
<i class="flag usa">&#127482;&#127480;</i>
</div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word en found">${PronounsFromDeToEng[word].split("@")[0]}</span>`;
foundWord += `</div>`;
}}
for (const word in QuestionWordsFromEngToDe) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
<i class="word_type question">Question:</i>
<i class="flag germany">&#127465;&#127466;</i>
</div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found">${QuestionWordsFromEngToDe[word]}</span>`;
foundWord += `</div>`;
}}
for (const word in QuestionWordsFromDeToEng) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type question">Question:</i>
  <i class="flag usa">&#127482;&#127480;</i>
  </div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word en found">${QuestionWordsFromDeToEng[word]}</span>`;
foundWord += `</div>`;
}}
for (const word in ConjuncFromEngToDe) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type conjunction">Conjuncion:</i>
  <i class="flag germany">&#127465;&#127466;</i>
  </div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found">${ConjuncFromEngToDe[word]}</span>`;
foundWord += `</div>`;
}
}
for (const word in ConjuncFromDeToEng) {
if(word === searchable()){
foundWord += `<div class="vocabulary">`;
foundWord += `<div class="top_area">
  <i class="word_type conjunction">Conjuncions:</i>
  <i class="flag usa">&#127482;&#127480;</i>
  </div>`;
foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word en found">${ConjuncFromDeToEng[word]}</span>`;
foundWord += `</div>`;
}  
}  
for (const word in PrepositionsFromEngToDe) {
  if(word.split("@")[0] === searchable()){
    foundWord += `<div class="vocabulary">`;
  foundWord += `
  <div class="top_area">
      <i class="word_type preposition">Preposition:</i>
      <i class="flag germany">&#127465;&#127466;</i>
  </div>`;
  foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found">${PrepositionsFromEngToDe[word].split("@")[0]}</span>`;
  foundWord += `</div>`;
  }
}
for (const word in PrepositionsFromDeToEng) {
if(word.split("@")[0] === searchable()){
  foundWord += `<div class="vocabulary">`;
  foundWord += `
  <div class="top_area">
  <i class="word_type preposition">Preposition:</i>
  <i class="flag usa">&#127482;&#127480;</i>
  </div>`;
  foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word en found">${PrepositionsFromDeToEng[word].split("@")[0]}</span>`;
  foundWord += `</div>`;
}  
}
for (const word in commonFromEngToDE) {
  if(word.toUpperCase() === searchable()){
    foundWord += `<div class="vocabulary">`;
    foundWord += `
    <div class="top_area">
    <i class="word_type common">Common 2000 words:</i>
    <i class="flag usa">&#127482;&#127480;</i>
    </div>`;
    foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word en found">${commonFromEngToDE[word]}</span>`;
    foundWord += `</div>`;
  }  
}
for (const word in commonFromDeToEng) {
  if(word.toUpperCase() === searchable()){
    foundWord += `<div class="vocabulary">`;
    foundWord += `
    <div class="top_area">
    <i class="word_type common">Common 2000 words:</i>
    <i class="flag usa">&#127482;&#127480;</i>
    </div>`;
    foundWord += `<i class="mic" onclick="read(this)">&#128266;</i><span class="found_word de found">${commonFromDeToEng[word]}</span>`;
    foundWord += `</div>`;
  }  
}
  foundArea.innerHTML = foundWord.toLowerCase();
  if(foundWord == "") foundArea.innerHTML = `<span class="not_found">Not found, check spelling </span>`;
  let vocabularies = dictionarySec.querySelectorAll(".top_area");
  let founds = dictionarySec.querySelectorAll(".found");
  for (let i = 0; i < vocabularies.length; i++) {
    let addStar = document.createElement("i");
    addStar.innerHTML = `&#x2730;`;
    addStar.setAttribute("class","add_star");
    addStar.setAttribute("onclick","addToFav(event)");
   let removeStar = document.createElement("i");
    removeStar.innerHTML = `&#9733;`;
    removeStar.setAttribute("class","starred");
    removeStar.setAttribute("onclick","removeFav(event)");
    let vocab = (founds[i].children.length > 1)? founds[i].children[1].innerText: founds[i].innerText;
    let singGer = (dictionarySec.querySelectorAll(".sing_ger")[i])? dictionarySec.querySelectorAll(".sing_ger")[i].innerText.split(" ")[1]:null;
    if(searchedWords.includes(vocab)){
        vocabularies[i].appendChild(removeStar);
    }else if(searchedWords.includes(singGer)){
    vocabularies[i].appendChild(removeStar)
  }
  else vocabularies[i].appendChild(addStar);
  }
  }
}
/**
* Favorite list functions
*/
function prepareReport(){
//let tb = document.createElement("table");
document.getElementById("print").style.display="block"
let favItems = favoritesList.querySelectorAll("li");
for(let i=0; i < favoriteWords.length;i++){
let tr = document.createElement("tr");
let ser = document.createElement("td");
ser.innerHTML = i+1;
ser.style.width="10%";
tr.appendChild(ser);
let type = document.createElement("td");
type.style.width="30%";
type.innerHTML = favoriteWords[i].type;
tr.appendChild(type);
let eng = document.createElement("td");
eng.innerHTML = favoriteWords[i].en;
tr.appendChild(eng);
let de = document.createElement("td");
let pl = document.createElement("td");
if(favoriteWords[i].art){
pl.innerHTML = favoriteWords[i].pl;
de.innerHTML = favoriteWords[i].art +" "+favoriteWords[i].de;
tr.appendChild(de)
tr.appendChild(pl)
}else{
de.innerHTML = favoriteWords[i].de;
tr.appendChild(de);
} 
document.getElementById("fav_table").appendChild(tr);
}
doPrint();
}
function doPrint(){
let cln = document.getElementById("fav_table").cloneNode('true'),
a = window.open('', '', 'width = 1000px', 'height = 1000px');
a.document.write('<html><head><style>tabel{margin-left:40%}td{border-bottom:2px solid #000; border-top:1px solid #000}body{margin:5%}td,th{margin:1%;padding:1%;}</style></head><body>');
a.document.write('<div id="contianer">'); 	
a.document.write('<h1 id="heading"> Favorite words list generated by Memorizer App</h1>');
a.document.write('<div>');
let main = a.document.querySelector('div');
main.appendChild(cln);
a.document.write('</div>')
a.document.write("<h5>Made with love by Refaat Isaac</h5>")
a.document.write('</div></body></html>');
document.getElementById("print").style.display="none"
a.print();
}

function addToFav(event){
  document.getElementById("fav_container").style.display = "block";
  if(favSec.querySelector(".not_found")) favSec.querySelector(".not_found").remove();
  let favItem = document.createElement("li");
  favItem.setAttribute("class","fav_item not_learned");
  let item = event.target.parentElement.parentElement.cloneNode(true);
  favItem.appendChild(item);
  let mic = document.createElement("i");
  mic.setAttribute("onclick","read(this)");
  mic.setAttribute("class","mic");
  mic.innerHTML = `&#128266;`;
  favItem.appendChild(mic);
  let trans = document.createElement("span");
  if(event.target.parentElement.parentElement.querySelector(".de")) trans.setAttribute("class","target_word en");
  else trans.setAttribute("class","target_word de");
  trans.innerHTML = enteredWord;
  favItem.appendChild(trans);
  let removBt = document.createElement("span");
  removBt.setAttribute("class","removeItem");
  removBt.innerHTML = `<abbr title="remove">x</abbr>`;
  removBt.setAttribute("onclick","removeFavItem(this)");
  favItem.appendChild(removBt);
  let score = document.createElement("span");
  score.setAttribute("class","score");
  score.innerHTML = "0";
  favItem.appendChild(score);
  favoritesList.appendChild(favItem);
  let favItems = favoritesList.querySelectorAll("li");
  for (let i = 0; i < favItems.length; i++) {
    if(favItems[i].querySelector(".add_star")) favItems[i].querySelector(".add_star").remove();
     if(favItems[i].querySelector(".flag")) favItems[i].querySelector(".flag").remove();   
  }

  event.target.outerHTML = `<i class="starred" onclick="removeFav(event)">&#9733; </i>`;
  event.target.style.color = "yellow";
  document.querySelector("#counter").innerText =  parseInt(document.querySelector("#counter").innerText) + 1;
  if(!localStorage.FavWords){localStorage.setItem("FavWords",favoritesList.innerHTML)}
  else localStorage.FavWords = favoritesList.innerHTML;
  preparingFavorites();
  }
  function removeFavItem(ele){
    ele.parentElement.remove();
      document.getElementById("counter").innerText = parseInt(document.getElementById("counter").innerText)-1
    if(!localStorage.FavWords){localStorage.setItem("FavWords",favoritesList.innerHTML)}
    else localStorage.FavWords = favoritesList.innerHTML;
    preparingFavorites();
};
function removeFav(event){
  let favItems = favoritesList.querySelectorAll(".fav_item");
  for (let i = 0; i < favItems.length; i++) {
    if(favItems[i].querySelector(".found_word").innerText.includes(event.target.parentElement.parentElement.querySelector(".found_word").innerText)){
        favItems[i].remove();
        document.getElementById("counter").innerText = parseInt(document.getElementById("counter").innerText)-1
    }
}
if(!localStorage.FavWords){localStorage.setItem("FavWords",favoritesList.innerHTML)}
else localStorage.FavWords = favoritesList.innerHTML;
event.target.outerHTML = `<i class="add_star" onclick="addToFav(event)">&#x2730;</i>`;
preparingFavorites();
}
function filter(event){
  let filter = event.target,
  favItems = favoritesList.querySelectorAll("li"),
  filterCounter = document.getElementById("counter"),
  counter =0;
  favItems.forEach(item=>{
    item.style.display = "none";
    if(item.querySelector(".word_type").classList.contains(filter.value) || item.classList.contains(filter.value)){
        item.style.display = "flex";
        counter++;
    }
  });
  filterCounter.innerText = counter;
  if(filter.value === "all"){
    for (let x = 0; x < favItems.length; x++) {
        favItems[x].style.display = "flex";
    }
    filterCounter.innerText = favItems.length;
}
}
function changeDateArrange(e){
  if(favoritesList.style.flexDirection == "column"){
    favoritesList.style.flexDirection = "column-reverse";
    e.innerHTML = "&#x2191;";
  }else if(favoritesList.style.flexDirection == "column-reverse"){
    favoritesList.style.flexDirection = "column";
    e.innerHTML = "&#x2193";
  }

}
function preparingFavorites(){
favoriteWords = [];
searchedWords = [];
let favItems = favoritesList.querySelectorAll("li");
for (let i = 0; i < favItems.length; i++) {
  let word = favItems[i].querySelector(".found_word");
  let wordObj = {};
  wordObj.lang = word.classList[1];
  wordObj.type = favItems[i].querySelector(".word_type").classList[1];
  if(favItems[i].querySelector(".de_noun")) wordObj.de = favItems[i].querySelector(".de_noun").innerText;
  else{
    if(wordObj.lang ==="en") wordObj.de = favItems[i].querySelector(".target_word").innerText;
    else wordObj.de = word.innerText;
  }
  if(favItems[i].querySelector(".article")) wordObj.art = favItems[i].querySelector(".article").innerText;
  if(favItems[i].querySelector(".plural")) wordObj.pl = favItems[i].querySelector(".plural").innerText;
  if(favItems[i].querySelector(".present")){
    wordObj.irrg = true;
    wordObj.present = favItems[i].querySelector(".present").innerText;
  }
  if(favItems[i].querySelector(".imperfect")) wordObj.imperfect = favItems[i].querySelector(".imperfect").innerText;
  if(favItems[i].querySelector(".p_p")) wordObj.pp = favItems[i].querySelector(".p_p").innerText;
  if(wordObj.lang === "en") wordObj.en = word.innerText;
  if(wordObj.lang === "de") wordObj.en = favItems[i].querySelector(".target_word").innerText;
  wordObj.index = i;
  if(favItems[i].classList[1] === "learned") wordObj.learned = true;
  else wordObj.learned = false;
  favoriteWords.push(wordObj);
}
for (let i = 0; i < favoriteWords.length; i++) {
  searchedWords.push(favoriteWords[i].en);
  searchedWords.push(favoriteWords[i].de);
  }
}

/**
* Exercises functions
*/
const details = exercisesSec.querySelectorAll("details");
details.forEach((targetDetail) => {
  targetDetail.addEventListener("click", () => {
    details.forEach((detail) => {
        if(detail === targetDetail){
            detail.classList.add("currentExer");
        }
      if (detail !== targetDetail) {
        detail.removeAttribute("open");
        detail.classList.remove("currentExer")
      }
    });
  });
});

let soundsOff = false;
function soundControl(event){
  soundsOff = (soundsOff === true)? false:true;
  let mics = exercisesSec.querySelectorAll(".mic");
  mics.forEach(mic =>{
    if(soundsOff === false){
      mic.innerHTML = `&#128266; <i class="fa fa-volume-up"></i>`
    }else{
      mic.innerHTML = `&#128263; <i class="fa fa-volume-off"></i>`
    }
  });
}

let answerArea = document.getElementById("answer_area");
let index = 0;
function writeTrans(event){
  answerArea.innerHTML = `<input id="trans_input" type="text" onkeydown="checkTrans(event)" placeholder="write here">`;
  writeTransInput = document.getElementById("trans_input");
    if(transLang.value === "en") writeTransQuestion.innerText = favoriteWords[index].de;
  else writeTransQuestion.innerText = favoriteWords[index].en;
  if(document.getElementById("learned_select").checked !== false && favoritesList.querySelector(".learned") ) index++;

  let artSelect = document.createElement("span");
  artSelect.innerHTML = `<select id="art_selector">
  <option value="der">der</option>
  <option value="das">das</option>
  <option value="die">die</option>
  </select>`;
  let pl = document.createElement("input");
  pl.setAttribute("id","pl_answer");
  pl.setAttribute("placeholder","plural form?");
  pl.setAttribute("onkeyup","checkTrans(event)");
  let irrg = document.createElement("div");
  irrg.setAttribute("id","input_irrg");
  irrg.innerHTML = `<input type="text" class="tense_input" id="present_answer" placeholder="Präsens?"/> <input type="text" class="tense_input" id="imperfect_answer" placeholder="Präteritum?"/> <input type="text" class="tense_input" placeholder="P. Perfekt?" id="pp_answer"/>`
  if(favoriteWords[index].type === "noun" && transLang.value === 'de'){
    answerArea.insertBefore(artSelect,writeTransInput);
    answerArea.appendChild(pl);
  }
  if(favoriteWords[index].present && transLang.value === 'de'){
    answerArea.appendChild(irrg);
  }
  writeTransInput.focus();
}
function checkTrans(e){
if(e.key === "Enter" || e.type ==="click"){
  let answer = writeTransInput.value.toLowerCase();
  writeTranResult.innerText = "";
  let favItems = favoritesList.querySelectorAll("li");
  let answered = "wrong", nounAns = false, artAns = false, plurAns = false, verbAns = false, presentAns = false, imperfectAns = false, ppAns = false;
      if(transLang.value === "de"){
          if(favoriteWords[index].type ==="noun"){
            if(answer === favoriteWords[index].de){
              nounAns = true;
              writeTransInput.classList.add("rightAns");
            }
            if(document.getElementById("art_selector").value ===  favoriteWords[index].art){
              artAns = true;
              document.getElementById("art_selector").classList.add("rightAns");
            }
            if(document.getElementById("pl_answer").value.toLowerCase() === favoriteWords[index].pl){
              plurAns = true;
              document.getElementById("pl_answer").classList.add("rightAns");
            }
            if(nounAns && artAns && plurAns) answered = "right";
          }
      }

      if(transLang.value === "de" && favoriteWords[index].irrg == true){
        if(answer === favoriteWords[index].de){
          verbAns = true
          writeTransInput.classList.add("rightAns");
        }
        if(document.getElementById("present_answer").value.toLowerCase() === favoriteWords[index].present){
          presentAns = true;
          document.getElementById("present_answer").classList.add("rightAns");
        }
        if(document.getElementById("imperfect_answer").value.toLowerCase() === favoriteWords[index].imperfect){
          imperfectAns = true;
          document.getElementById("imperfect_answer").classList.add("rightAns");
        }
        if(document.getElementById("pp_answer").value.toLowerCase() === favoriteWords[index].pp){
          ppAns = true;
          document.getElementById("pp_answer").classList.add("rightAns")
        }
        if(verbAns && presentAns && imperfectAns && ppAns) answered = "right";
      }
      if(transLang.value ==="de" && favoriteWords[index].type !== "noun" && answer === favoriteWords[index].de && favoriteWords[index].irrg !== true) answered = "right";
      if(transLang.value === "en" && answer === favoriteWords[index].en) answered = "right";
      if(answered === "wrong"){
          writeTranResult.innerHTML = `wrong!, correct Answer ${favItems[favoriteWords[index].index].innerHTML}<br><button onclick="nextQuest()">Next</button>`;
          writeTranResult.style.display = "block";
          writeTranResult.setAttribute("class","wrong");
           if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) > 0)favItems[favoriteWords[index].index].querySelector(".score").innerText = parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) - 1;
          if(favItems[favoriteWords[index].index].classList.contains("learned")){
              if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText)< 5){
                  favItems[favoriteWords[index].index].classList.replace("learned","not_learned");
          } 
        }
     
      }
      if(answered === "right"){
          writeTranResult.innerText = "correct!";
          writeTranResult.style.display = "inline-block";
          writeTranResult.setAttribute("class","right");
          favItems[favoriteWords[index].index].querySelector(".score").innerText = parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) + 1;
          if(favItems[favoriteWords[index].index].classList.contains("not_learned")){
              if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) >= 5){
                  favItems[favoriteWords[index].index].classList.replace("not_learned","learned");
              }
              setTimeout(nextQuest,3000);
          }
          if(!soundsOff){
            let reader = new SpeechSynthesisUtterance(writeTransInput.value);
            reader.lang = (transLang.value === "de")? "de-DE":"en-US";
            reader.rate = 0.8;
            speechSynthesis.speak(reader);
          }

  };
  writeTransDiv.querySelector("#reveal").removeAttribute("disabled");
  localStorage.FavWords = favoritesList.innerHTML;
  preparingFavorites();
}
}
let revealIndex = 0;
let revealBtPressed = false;
function revealAns(bt){
if(revealIndex < 3){
  if(!revealBtPressed){
      if(transLang.value === "en") writeTransInput.value = (favoriteWords[index].en[revealIndex])? favoriteWords[index].en[revealIndex] :"";
      else writeTransInput.value = (favoriteWords[index].en[revealIndex])? favoriteWords[index].de[revealIndex]:"";
      revealBtPressed = true;
  }else{
      if(transLang.value === "en") writeTransInput.value +=(favoriteWords[index].en[revealIndex])? favoriteWords[index].en[revealIndex]:"";
      else writeTransInput.value +=(favoriteWords[index].en[revealIndex])? favoriteWords[index].de[revealIndex]:"";
  }
}else{
  bt.setAttribute("disabled","true");
}
revealIndex++;
writeTransInput.focus();
}
function nextQuest(){
  index++;
  revealBtPressed = false;
  answer = "";
  writeTransInput.value = "";
  writeTranResult.innerText = "";
  revealIndex = 0;
  document.getElementById("question_type").innerText = "";
  writeTranResult.style.display="none"
  if(writeTransInput.classList.contains("rightAns")) writeTransInput.classList.remove("rightAns");
  writeTranResult.parentElement.parentElement.style.backgroundColor ="#491864";
  writeTransDiv.querySelector("#reveal").removeAttribute("disabled");
  if(document.getElementById("art_selector")) document.getElementById("art_selector").remove();
  if(document.getElementById("pl_answer")) document.getElementById("pl_answer").remove();
  if(document.querySelector("#input_irrg")) document.querySelector("#input_irrg").remove();
  if(index > favoriteWords.length-1) index = 0;
  writeTrans();
}

function chooseTrans(){
  if(favoriteWords.length > 10){
    document.getElementById("not_enough_words").style.display="none";
    document.getElementById("chooseTrans_cont").style.display="block";
    optIndex++;
    chooseOptions.forEach(opt => opt.removeAttribute("style"));
    if(index > favoriteWords.length-1) index =0;
    if(chooseTransLearned.checked && favoritesList.querySelector(".learned")){index++}
    chooseTransQuest.innerText = (chooseTransLang.value === "en")? favoriteWords[index].de : favoriteWords[index].en;
    if(optIndex > favoriteWords.length-10) optIndex = 0;
    for (let i = 0; i < chooseOptions.length; i++) {
      if(favoriteWords[optIndex][chooseTransLang.value] === favoriteWords[index][chooseTransLang.value]){
        optIndex++;
      }
        chooseOptions[i].innerText = favoriteWords[optIndex][chooseTransLang.value];
        optIndex++;
    } 
    correctOpt = Math.floor((Math.random()*4));
    chooseOptions[correctOpt].innerText = favoriteWords[index][chooseTransLang.value];
    if(!soundsOff){
      let reader = new SpeechSynthesisUtterance(chooseTransQuest.innerText);
      reader.lang = (chooseTransLang.value === "en")? "de-DE": "en-US";
    reader.rate = 0.8;
    speechSynthesis.speak(reader);
    } 
  }
}
function checkChoose(event){
  let favItems = favoritesList.querySelectorAll("li");
  if(event.target.innerText === favoriteWords[index][chooseTransLang.value]){
    event.target.style.backgroundColor="green";
    favItems[favoriteWords[index].index].querySelector(".score").innerText = parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) + 1;
    if(favItems[favoriteWords[index].index].classList.contains("not_learned")){
        if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) >= 5){
            favItems[favoriteWords[index].index].classList.replace("not_learned","learned");
      }
    }
    if(!soundsOff){
    let reader = new SpeechSynthesisUtterance(event.target.innerText);
    reader.lang = (chooseTransLang.value === "de")? "de-DE": "en-US";
    reader.rate = 0.8;
    speechSynthesis.speak(reader);
    }
    setTimeout(chooseTrans,3000);
  }else{
    event.target.style.backgroundColor="red";
    for (let i = 0; i < chooseOptions.length; i++) {
      if(chooseOptions[i].innerText === favoriteWords[index][chooseTransLang.value]){
        chooseOptions[i].style.backgroundColor="green";
      }
      setTimeout(chooseTrans,3000);
    }
    if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) > 0)favItems[favoriteWords[index].index].querySelector(".score").innerText = parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText) - 1;
    if(favItems[favoriteWords[index].index].classList.contains("learned")){
      if(parseInt(favItems[favoriteWords[index].index].querySelector(".score").innerText)< 5)favItems[favoriteWords[index].index].classList.replace("learned","not_learned");
  }
  }
  index++;
  localStorage.FavWords = favoritesList.innerHTML;
}

function chooseArt(){
  if(favNouns.length > 5){
    document.getElementById("no_nouns").style.display="none";
    document.getElementById("chooseArt_cont").style.display= "block";
  if(!artLearned.checked) nounsIndex++;
  if(nounsIndex > favNouns.length-1) nounsIndex = 0;
  artQuest.innerText = favNouns[nounsIndex].de
  allArticles.forEach(art => art.removeAttribute("style"));
  if(!soundsOff){
    let reader = new SpeechSynthesisUtterance(artQuest.innerText);
    reader.lang = "de-De"
    reader.rate = 0.8;
    speechSynthesis.speak(reader);
    }
  }
}
function artChecker(event){
  if(event.target.innerText.toLowerCase() === favNouns[nounsIndex].art){
    event.target.style.backgroundColor = "green";
    setTimeout(chooseArt,3000);
  }else{
    event.target.style.backgroundColor = "red";
    allArticles.forEach(art =>{
      if(art.innerText.toLowerCase() === favNouns[nounsIndex].art) art.style.backgroundColor = "green";
    });
    setTimeout(chooseArt,3000);
  }
  nounsIndex++;
}
function startingFunctions(){
let dataList = document.createElement("datalist");
dataList.setAttribute("id","dictionary");
if(localStorage.FavWords && localStorage.FavWords !== ""){
  favoritesList.innerHTML = localStorage.FavWords;
  if(document.querySelectorAll(".not_found")){
      for (let i = 0; i < document.querySelectorAll(".not_found").length; i++) {
          const element = document.querySelectorAll(".not_found")[i];
          element.style.display= "none";  
      }
  }
}
if(favoritesList.innerHTML === ""){
  writeTransDiv.style.display = "none";
  document.getElementById("fav_container").style.display = "none";
}
if(localStorage.FavWords && localStorage.FavWords !== ""){
  preparingFavorites();
  for (let i = 0; i < favoriteWords.length; i++) {
    if(favoriteWords[i].type ==="noun") favNouns.push(favoriteWords[i])
   }
}
let favItems = (favoritesList.querySelectorAll("li"))?favoritesList.querySelectorAll("li"): null;
for (let i = 0; i < favItems.length; i++) {
  favItems[i].style.display = "flex";     
}
document.querySelector("#counter").innerText = favoritesList.querySelectorAll("li").length; 
/**creating arrays from the Nouns object in order to use them in the vocabulary objects */
let nounsGer = [];
for (const key in duetschNouns) {
nounsGer.push(duetschNouns[key])
}
let nounsEng = [];
let engArr = [];
for (const key in duetschNouns) {
engArr = Object.keys(duetschNouns);
}
for (let i = 0; i < engArr.length; i++) {
  nounsEng.push(engArr[i].split(","))
}
let gerSing = [];
for (let index = 0; index < nounsGer.length; index++) {
const element = nounsGer[index];
gerSing.push(element[1])
}
vbsEng = [];
vbsGer =[];
vbsWithIrr = []
for(let i=0;i< germanVerbs.English.length;i++){
  if(germanVerbs.English[i].split(",").length >1){
      for(let x =0; x < germanVerbs.English[i].split(",").length;x++){
          if(vbsEng.includes(germanVerbs.English[i].split(",")[x])){
              vbsEng.push(germanVerbs.English[i].split(",")[x]+"@"+x);
          }else vbsEng.push(germanVerbs.English[i].split(",")[x])
          if(vbsGer.includes(germanVerbs.German[i])){vbsGer.push(germanVerbs.German[i]+"@"+i)}
          else vbsGer.push(germanVerbs.German[i]);
      }
  }
  if(vbsEng.indexOf(germanVerbs.English[i])){
    vbsEng.push(germanVerbs.English[i]+"@"+i);
    vbsGer.push(germanVerbs.German[i]);
  }
  else{
      vbsEng.push(germanVerbs.English[i]);
      vbsGer.push(germanVerbs.German[i])
  }
}
for (let i = 0; i < vbsGer.length; i++) {
    const element = vbsGer[i];
vbsWithIrr.push(element)
}
for (let i = 0; i < vbsWithIrr.length; i++) {
    for (let x = 0; x < irregularVerbs.verbs.length; x++) {
        if(vbsWithIrr[i] === irregularVerbs.verbs[x]){
            vbsWithIrr[i] = vbsGer[i]+","+irregularVerbs.present[x].toUpperCase()+","+irregularVerbs.imperfect[x].toUpperCase()+","+irregularVerbs.pp[x].toUpperCase();
        }
    }
    for (let y = 0; y < dat_Accus_Verbs.Verbs.length; y++) {
      if(vbsWithIrr[i] === dat_Accus_Verbs.Verbs[y].toUpperCase()){
        vbsWithIrr[i] +=   ","+dat_Accus_Verbs.Cases[y].toUpperCase()+"##"+dat_Accus_Verbs.Examples[y].toUpperCase();
      }
    }
    for (let m = 0; m < verbsWithPrep.Verbs.length; m++) {
      if(verbsWithPrep.Verbs[m].includes(vbsWithIrr[i].toLowerCase())){
        vbsWithIrr[i] +=   ","+verbsWithPrep.Prep[m].toUpperCase()+"**"+verbsWithPrep.Cases[m].toUpperCase()+"**"+verbsWithPrep.Examples[m].toUpperCase();
      }
    }
}
adjEng = [];
adjGer =[];
for(let i=0;i<Adjectives.German.length;i++){
  if(Adjectives.English[i].split(",").length >1){
      for(let x =0; x < Adjectives.English[i].split(",").length;x++){
          if(adjEng.includes(Adjectives.English[i].split(", ")[x])){
              adjEng.push(Adjectives.English[i].split(", ")[x]+"@"+x);
          }else adjEng.push(Adjectives.English[i].split(", ")[x])
          adjGer.push(Adjectives.German[i]);
      }
  }else{
      adjEng.push(Adjectives.English[i]);
      adjGer.push(Adjectives.German[i])
  }
}
eng = [];
ger =[];
for(let i=0;i<Pronouns.German.length;i++){
  if(Pronouns.German[i].split(",").length >1){
      for(let x =0; x < Pronouns.German[i].split(",").length;x++){
          if(ger.includes(Pronouns.German[i].split(", ")[x])){
              ger.push(Pronouns.German[i].split(", ")[x]+"@"+x);
          }else ger.push(Pronouns.German[i].split(", ")[x])
          eng.push(Pronouns.English[i]);
      }
  }else{
      eng.push(Pronouns.English[i]);
      ger.push(Pronouns.German[i])
  }
}

/**
* Creating vocabulary objects from English to German
*/
NounsFromEngToDe = Object.assign.apply({}, nounsEng.map( (v,i) => ({[v]: (nounsGer[i][0]+","+nounsGer[i][1]+","+nounsGer[i][2]).split(",")})));
VerbsFromEngToDe = Object.assign.apply({}, vbsEng.map( (v,i) => ({[v]: vbsWithIrr[i]})));
AdjectivesFromEngToDe = Object.assign.apply({}, adjEng.map( (v,i) => ({[v]: adjGer[i]})));
AdverbsFromEngToDe = Object.assign.apply({}, Adverbs.English.map( (v,i) => ({[v]: Adverbs.German[i]})));
PrepositionsFromEngToDe = Object.assign.apply({}, Prepositions.English.map( (v,i) => ({[v]: Prepositions.German[i]})));
PronounsFromEngToDe = Object.assign.apply({}, Pronouns.English.map( (v,i) => ({[v]: Pronouns.German[i]})));
ConjuncFromEngToDe = Object.assign.apply({}, Conjunctions.English.map( (v,i) => ({[v]: Conjunctions.German[i]})));QuestionWordsFromEngToDe = Object.assign.apply({}, QuestionWords.English.map( (v,i) => ({[v]: QuestionWords.German[i]})));
commonFromEngToDE = Object.assign.apply({}, common2000.English.map( (v,i) => ({[v]: common2000.German[i]})));
/**
* Creating vocabulary objects from German to English
*/
NounsFromDeToEng = Object.assign.apply({}, gerSing.map( (v,i) => ({[v]: (nounsEng[i]+","+nounsGer[i][0]+","+nounsGer[i][2]).split(",")})));
VerbsFromDeToEng = Object.assign.apply({}, vbsGer.map( (v,i) => ({[v]: vbsEng[i]})));
AdjectivesFromDeToEng = Object.assign.apply({}, Adjectives.English.map( (v,i) => ({[v]: Adjectives.German[i]})));
AdverbsFromDeToEng = Object.assign.apply({}, Adverbs.German.map( (v,i) => ({[v]: Adverbs.English[i]})));
PrepositionsFromDeToEng = Object.assign.apply({}, Prepositions.German.map( (v,i) => ({[v]: Prepositions.English[i]})));
PronounsFromDeToEng = Object.assign.apply({}, Pronouns.German.map( (v,i) => ({[v]: Pronouns.English[i]})));
ConjuncFromDeToEng = Object.assign.apply({}, Conjunctions.German.map( (v,i) => ({[v]: Conjunctions.English[i]})));
QuestionWordsFromDeToEng = Object.assign.apply({}, QuestionWords.German.map( (v,i) => ({[v]: QuestionWords.English[i]})));
commonFromDeToEng = Object.assign.apply({}, common2000.German.map( (v,i) => ({[v]: common2000.English[i]})));

}

/**************************************************************/
let duetschNouns = {
  "TIME": [
      "DIE",
      "ZEIT",
      "ZEITEN"
  ],
  "MAN": [
      "DER",
      "MANN",
      "MÄNNER"
  ],
  "HAND": [
      "DIE",
      "HAND",
      "HÄNDE"
  ],
  "DAY": [
      "DER",
      "TAG",
      "TAGEN"
  ],
  "WAY": [
      "DER",
      "WEG",
      "WEGE"
  ],
  "EYE": [
      "DAS",
      "AUGE",
      "AUGEN"
  ],
  "THING": [
      "DAS",
      "DING",
      "DINGE"
  ],
  "HEAD": [
      "DER",
      "KOPF",
      "KÖPFE"
  ],
  "YEAR": [
      "DAS",
      "JAHR",
      "JAHRE"
  ],
  "ROOM": [
      "DAS",
      "ZIMMER",
      "ZIMMER"
  ],
  "DOOR": [
      "DIE",
      "TÜR",
      "TÜREN"
  ],
  "WOMAN": [
      "DIE",
      "FRAU",
      "FRAUEN"
  ],
  "FACE": [
      "DAS",
      "GESICHT",
      "GESICHTER"
  ],
  "MOTHER": [
      "DIE",
      "MUTTER",
      "MÜTTER"
  ],
  "PEOPLE": [
      "DAS",
      "VOLK",
      "VÖLKER"
  ],
  "NIGHT": [
      "DIE",
      "NACHT",
      "NÄCHTE"
  ],
  "HOUSE": [
      "DAS",
      "HAUS",
      "HÄUSER"
  ],
  "FATHER": [
      "DER",
      "VATER",
      "VÄTER"
  ],
  "LIFE": [
      "DAS",
      "LEBEN",
      "LEBEN"
  ],
  "BACK": [
      "DER",
      "RÜCKEN",
      "RÜCKEN"
  ],
  "VOICE": [
      "DIE",
      "STIMME",
      "STIMMEN"
  ],
  "GIRL": [
      "DAS",
      "MÄDCHEN",
      "MÄDCHEN"
  ],
  "PLACE": [
      "DER",
      "ORT",
      "ORTE"
  ],
  "BOY": [
      "DER",
      "JUNGE",
      "JUNGEN"
  ],
  "CAR": [
      "DAS",
      "AUTO",
      "AUTOS"
  ],
  "SIDE": [
      "DIE",
      "SEITE",
      "SEITEN"
  ],
  "ARM": [
      "DER",
      "ARM",
      "ARME"
  ],
  "CHILD": [
      "DAS",
      "KIND",
      "KINDER"
  ],
  "WORD": [
      "DAS",
      "WORT",
      "WORTE"
  ],
  "MOMENT": [
      "DER",
      "MOMENT",
      "MOMENTE"
  ],
  "HAIR": [
      "DAS",
      "HAAR",
      "HAARE"
  ],
  "FOOT": [
      "DER",
      "FUSS",
      "FÜSSE"
  ],
  "WATER": [
      "DAS",
      "WASSER",
      "WASSER"
  ],
  "LIGHT": [
      "DAS",
      "LICHT",
      "LICHTER"
  ],
  "WORLD": [
      "DIE",
      "WELT",
      "WELTEN"
  ],
  "NAME": [
      "DER",
      "NAME",
      "NAMEN"
  ],
  "FRIEND": [
      "DER",
      "FREUND",
      "FREUNDE"
  ],
  "WINDOW": [
      "DAS",
      "FENSTER",
      "FENSTER"
  ],
  "BODY": [
      "DER",
      "KÖRPER",
      "KÖRPER"
  ],
  "TABLE": [
      "DER",
      "TISCH",
      "TISCHE"
  ],
  "MORNING": [
      "DER",
      "MORGEN",
      "MORGEN"
  ],
  "BED": [
      "DAS",
      "BETT",
      "BETTEN"
  ],
  "WALL": [
      "DIE",
      "MAUER",
      "MAUERN"
  ],
  "STREET": [
      "DIE",
      "STRAßE",
      "STRASSEN"
  ],
  "SCHOOL": [
      "DIE",
      "SCHULE",
      "SCHULEN"
  ],
  "AIR": [
      "DIE",
      "LUFT",
      "LÜFTE"
  ],
  "FLOOR": [
      "DER",
      "BODEN",
      "BÖDEN"
  ],
  "HOUR": [
      "DIE",
      "STUNDE",
      "STUNDEN"
  ],
  "END": [
      "DAS",
      "ENDE",
      "ENDEN"
  ],
  "FAMILY": [
      "DIE",
      "FAMILIE",
      "FAMILIEN"
  ],
  "GUY": [
      "DER",
      "KERL",
      "KERLE"
  ],
  "KIND": [
      "DIE",
      "ART",
      "ARTEN"
  ],
  "MINUTE": [
      "DIE",
      "MINUTE",
      "MINUTEN"
  ],
  "STORY": [
      "DIE",
      "GESCHICHTE",
      "GESCHICHTEN"
  ],
  "GOD": [
      "DER",
      "GOTT",
      "GÖTTER"
  ],
  "WEEK": [
      "DIE",
      "WOCHE",
      "WOCHEN"
  ],
  "WORK": [
      "DIE",
      "ARBEIT",
      "WERKE"
  ],
  "SHOULDER": [
      "DIE",
      "SCHULTER",
      "SCHULTERN"
  ],
  "PART": [
      "DER",
      "TEIL",
      "TEILE"
  ],
  "MIND": [
      "DER",
      "GEIST",
      "GEISTER"
  ],
  "BOOK": [
      "DAS",
      "BUCH",
      "BÜCHER"
  ],
  "FINGER": [
      "DER",
      "FINGER",
      "FINGER"
  ],
  "MOUTH": [
      "DER",
      "MUND",
      "MÜNDER"
  ],
  "KID": [
      "DAS",
      "KIND",
      "KINDER"
  ],
  "GLASS": [
      "DAS",
      "GLAS",
      "GLÄSER"
  ],
  "TREE": [
      "DER",
      "BAUM",
      "BÄUME"
  ],
  "SOUND": [
      "DER",
      "KLANG",
      "KLÄNGE"
  ],
  "LINE": [
      "DIE",
      "LINIE",
      "LINIEN"
  ],
  "WIFE": [
      "DIE",
      "EHEFRAU",
      "EHEFRAUEN"
  ],
  "HEART": [
      "DAS",
      "HERZ",
      "HERZEN"
  ],
  "MONEY": [
      "DAS",
      "GELD",
      "GELDER"
  ],
  "PHONE": [
      "DAS",
      "TELEFON",
      "TELEFONE"
  ],
  "LOOK": [
      "DER",
      "BLICK",
      "BLICKE"
  ],
  "LEG": [
      "DAS",
      "BEIN",
      "BEINE"
  ],
  "CHAIR": [
      "DER",
      "STUHL",
      "STÜHLE"
  ],
  "OFFICE": [
      "DAS",
      "BÜRO",
      "BÜROS"
  ],
  "BROTHER": [
      "DER",
      "BRUDER",
      "BRÜDER"
  ],
  "QUESTION": [
      "DIE",
      "FRAGE",
      "FRAGEN"
  ],
  "CITY": [
      "DIE",
      "STADT",
      "STÄDTE"
  ],
  "MONTH": [
      "DER",
      "MONAT",
      "MONATE"
  ],
  "BABY": [
      "DAS",
      "BABY",
      "BABYS"
  ],
  "HOME": [
      "DAS",
      "ZUHAUSE",
      "HÄUSER"
  ],
  "DOG": [
      "DER",
      "HUND",
      "HUNDE"
  ],
  "ROAD": [
      "DIE",
      "STRASSE",
      "STRASSEN"
  ],
  "IDEA": [
      "DIE",
      "IDEE",
      "IDEEN"
  ],
  "KITCHEN": [
      "DIE",
      "KÜCHE",
      "KÜCHEN"
  ],
  "LOT": [
      "DAS",
      "LOS",
      "LOSE"
  ],
  "SON": [
      "DER",
      "SOHN",
      "SOHNE"
  ],
  "JOB": [
      "DER",
      "BERUF",
      "BERUFE"
  ],
  "PAPER": [
      "DAS",
      "PAPIER",
      "PAPIERE"
  ],
  "SISTER": [
      "DIE",
      "SCHWESTER",
      "SCHWESTERN"
  ],
  "SMILE": [
      "DAS",
      "LÄCHELN",
      "LÄCHELN"
  ],
  "POINT": [
      "DER",
      "PUNKT",
      "PUNKTE"
  ],
  "THOUGHT": [
      "DER",
      "GEDANKE",
      "GEDANKEN"
  ],
  "LOVE": [
      "DIE",
      "LIEBE",
      "LIEBEN"
  ],
  "TOWN": [
      "DIE",
      "STADT",
      "STÄDTE"
  ],
  "DEATH": [
      "DER",
      "TOD",
      "TODESFÄLLE"
  ],
  "GROUND": [
      "DER",
      "BODEN",
      "BÖDEN"
  ],
  "OTHERS": [
      "DIE",
      "ANDEREN",
      "ANDEREN"
  ],
  "FIRE": [
      "DAS",
      "FEUER",
      "FEUER"
  ],
  "STEP": [
      "DER",
      "SCHRITT",
      "SCHRITTE"
  ],
  "BLOOD": [
      "DAS",
      "BLUT",
      "BLUTE"
  ],
  "FACT": [
      "DIE",
      "TATSACHE",
      "TATSACHEN"
  ],
  "BREATH": [
      "DER",
      "ATEM",
      "ATEM"
  ],
  "LIP": [
      "DIE",
      "LIPPE",
      "LIPPEN"
  ],
  "SUN": [
      "DIE",
      "SONNE",
      "SONNEN"
  ],
  "BUILDING": [
      "DAS",
      "GEBÄUDE",
      "GEBÄUDE"
  ],
  "NUMBER": [
      "DIE",
      "ANZAHL",
      "ANZAHLEN"
  ],
  "HUSBAND": [
      "DER",
      "EHEMANN",
      "EHEMÄNNER"
  ],
  "PARENT": [
      "DAS",
      "ELTERNTEIL",
      "ELTERN"
  ],
  "CORNER": [
      "DIE",
      "ECKE",
      "ECKEN"
  ],
  "PROBLEM": [
      "DAS",
      "PROBLEM",
      "PROBLEME"
  ],
  "COUPLE": [
      "DAS",
      "EHEPAAR",
      "PAARE"
  ],
  "DAUGHTER": [
      "DIE",
      "TOCHTER",
      "TÖCHTER"
  ],
  "BAG": [
      "DER",
      "BEUTEL",
      "TASCHEN"
  ],
  "HELL": [
      "DIE",
      "HÖLLE",
      "HÖLLEN"
  ],
  "REST": [
      "DIE",
      "RAST",
      "RESTE"
  ],
  "BUSINESS": [
      "DAS",
      "GESCHÄFT",
      "UNTERNEHMEN"
  ],
  "SKY": [
      "DER",
      "HIMMEL",
      "DER HIMMEL"
  ],
  "BOX": [
      "DIE",
      "KISTE",
      "KISTEN"
  ],
  "PERSON": [
      "DIE",
      "PERSON",
      "PERSONEN"
  ],
  "REASON": [
      "DER",
      "GRUND",
      "GRÜNDE"
  ],
  "RIGHT": [
      "DAS",
      "RECHT",
      "RECHTE"
  ],
  "SKIN": [
      "DIE",
      "HAUT",
      "HÄUTE"
  ],
  "DAD": [
      "DER",
      "VATER",
      "VÄTER"
  ],
  "CASE": [
      "DER",
      "FALL",
      "FÄLLE"
  ],
  "PIECE": [
      "DAS",
      "STÜCK",
      "STÜCKE"
  ],
  "DOCTOR": [
      "DER",
      "DOKTOR",
      "DOKTOREN"
  ],
  "EDGE": [
      "DIE",
      "ECKE",
      "ECKEN"
  ],
  "MOM": [
      "DIE",
      "MAMA",
      "MÜTTER"
  ],
  "PICTURE": [
      "DAS",
      "BILD",
      "BILDER"
  ],
  "SENSE": [
      "DER",
      "SINN",
      "SINNE"
  ],
  "EAR": [
      "DAS",
      "OHR",
      "OHREN"
  ],
  "SECOND": [
      "DER",
      "ZWEITE",
      "SEKUNDEN"
  ],
  "LADY": [
      "DIE",
      "DAME",
      "DAMEN"
  ],
  "NECK": [
      "DER",
      "HALS",
      "HÄLSE"
  ],
  "WIND": [
      "DER",
      "WIND",
      "WINDE"
  ],
  "DESK": [
      "DER",
      "SCHREIBTISCH",
      "SCHREIBTISCHE"
  ],
  "GUN": [
      "DIE",
      "WAFFE",
      "WAFFEN"
  ],
  "STONE": [
      "DER",
      "STEIN",
      "STEINE"
  ],
  "COFFEE": [
      "DER",
      "KAFFEE",
      "KAFFEES"
  ],
  "SHIP": [
      "DAS",
      "SCHIFF",
      "SCHIFFE"
  ],
  "EARTH": [
      "DIE",
      "ERDE",
      "ERDEN"
  ],
  "FOOD": [
      "DAS",
      "ESSEN",
      "LEBENSMITTEL"
  ],
  "HORSE": [
      "DAS",
      "PFERD",
      "PFERDE"
  ],
  "FIELD": [
      "DAS",
      "FELD",
      "FELDER"
  ],
  "WAR": [
      "DER",
      "KRIEG",
      "KRIEGE"
  ],
  "AFTERNOON": [
      "DER",
      "NACHMITTAG",
      "NACHMITTAGE"
  ],
  "SIR": [
      "DIE",
      "SIR",
      "DAMEN UND HERREN"
  ],
  "SPACE": [
      "DER",
      "RAUM",
      "RÄUME"
  ],
  "EVENING": [
      "DER",
      "ABEND",
      "ABENDE"
  ],
  "LETTER": [
      "DER",
      "BRIEF",
      "BRIEFE"
  ],
  "BAR": [
      "DIE",
      "BAR",
      "BARS"
  ],
  "DREAM": [
      "DER",
      "TRAUM",
      "TRÄUME"
  ],
  "APARTMENT": [
      "DIE",
      "WOHNUNG",
      "WOHNUNGEN"
  ],
  "CHEST": [
      "DIE",
      "BRUST",
      "BRÜSTE"
  ],
  "GAME": [
      "DAS",
      "SPIEL",
      "SPIELE"
  ],
  "SUMMER": [
      "DER",
      "SOMMER",
      "SOMMER"
  ],
  "MATTER": [
      "DER",
      "GRUND",
      "GRÜNDE"
  ],
  "SILENCE": [
      "DIE",
      "STILLE",
      "STILLE"
  ],
  "TOP": [
      "DIE",
      "SPITZE",
      "SPITZEN"
  ],
  "ROCK": [
      "DER",
      "FELS",
      "STEINE"
  ],
  "POWER": [
      "DIE",
      "MACHT",
      "BEFUGNISSE"
  ],
  "CLOTHES": [
      "DIE",
      "KLEIDER",
      "CLOTHESES"
  ],
  "SIGN": [
      "DAS",
      "SCHILD",
      "SCHILDE"
  ],
  "ATTENTION": [
      "DIE",
      "AUFMERKSAMKEIT",
      "AUFMERKSAMKEIT"
  ],
  "MUSIC": [
      "DIE",
      "MUSIK",
      "MUSIKEN"
  ],
  "STATE": [
      "DER",
      "STAAT",
      "STAATEN"
  ],
  "POCKET": [
      "DIE",
      "TASCHE",
      "TASCHEN"
  ],
  "DINNER": [
      "DAS",
      "ABENDESSEN",
      "ABENDESSEN"
  ],
  "HALL": [
      "DIE",
      "HALLE",
      "HALLEN"
  ],
  "PAIN": [
      "DER",
      "SCHMERZ",
      "SCHMERZEN"
  ],
  "AGE": [
      "DAS",
      "ALTER",
      "ALTER"
  ],
  "RIVER": [
      "DER",
      "FLUSS",
      "FLÜSSE"
  ],
  "CHANCE": [
      "DIE",
      "CHANCE",
      "CHANCEN"
  ],
  "NOSE": [
      "DIE",
      "NASE",
      "NASEN"
  ],
  "SHADOW": [
      "DER",
      "SCHATTEN",
      "SCHATTEN"
  ],
  "POLICE": [
      "DIE",
      "POLIZEI",
      "POLIZEIEN"
  ],
  "MEMORY": [
      "DAS",
      "GEDÄCHTNIS",
      "GEDÄCHTNISSE"
  ],
  "COLOR": [
      "DIE",
      "FARBE",
      "FARBEN"
  ],
  "KNEE": [
      "DAS",
      "KNIE",
      "KNIE"
  ],
  "WOOD": [
      "DAS",
      "HOLZ",
      "DER WALD"
  ],
  "SHIRT": [
      "DAS",
      "HEMD",
      "HEMDEN"
  ],
  "PARTY": [
      "DIE",
      "PARTY",
      "PARTYS"
  ],
  "COUNTRY": [
      "DAS",
      "LAND",
      "LÄNDER"
  ],
  "TRUCK": [
      "DER",
      "LKW",
      "LASTWAGEN"
  ],
  "TOOTH": [
      "DER",
      "ZAHN",
      "ZÄHNE"
  ],
  "BILL": [
      "DIE",
      "RECHNUNG",
      "RECHNUNGEN"
  ],
  "SCENE": [
      "DIE",
      "SZENE",
      "SZENEN"
  ],
  "LAND": [
      "DAS",
      "LAND",
      "LÄNDER"
  ],
  "STAR": [
      "DER",
      "STERN",
      "STERNE"
  ],
  "BIRD": [
      "DER",
      "VOGEL",
      "VÖGEL"
  ],
  "BEDROOM": [
      "DAS",
      "SCHLAFZIMMER",
      "SCHLAFZIMMER"
  ],
  "UNCLE": [
      "DER",
      "ONKEL",
      "ONKELS"
  ],
  "SORT": [
      "DIE",
      "ART",
      "ARTEN"
  ],
  "GROUP": [
      "DIE",
      "GRUPPE",
      "GRUPPEN"
  ],
  "TRUTH": [
      "DIE",
      "WAHRHEIT",
      "WAHRHEITEN"
  ],
  "TROUBLE": [
      "DIE",
      "SCHWIERIGKEITEN",
      "PROBLEME"
  ],
  "CROWD": [
      "DIE",
      "MENGE",
      "MENGEN"
  ],
  "STATION": [
      "DER",
      "BAHNHOF",
      "BAHNHÖFE"
  ],
  "TEAR": [
      "DIE",
      "REISS",
      "TRÄNEN"
  ],
  "CLASS": [
      "DIE",
      "KLASSE",
      "KLASSEN"
  ],
  "SEA": [
      "DAS",
      "MEER",
      "MEERE"
  ],
  "ANIMAL": [
      "DAS",
      "TIER",
      "TIERE"
  ],
  "CENTER": [
      "DAS",
      "ZENTRUM",
      "ZENTREN"
  ],
  "FEELING": [
      "DAS",
      "GEFÜHL",
      "GEFÜHLE"
  ],
  "STORE": [
      "DAS",
      "GESCHÄFT",
      "LÄDEN"
  ],
  "MOUNTAIN": [
      "DER",
      "BERG",
      "BERGE"
  ],
  "NEWS": [
      "DIE",
      "NACHRICHTEN",
      "NEWSES"
  ],
  "SHOE": [
      "DER",
      "SCHUH",
      "SCHUHE"
  ],
  "CAT": [
      "DIE",
      "KATZE",
      "KATZEN"
  ],
  "SCREEN": [
      "DER",
      "BILDSCHIRM",
      "SCHIRME"
  ],
  "BOTTLE": [
      "DIE",
      "FLASCHE",
      "FLASCHEN"
  ],
  "CALL": [
      "DER",
      "ANRUF",
      "ANRUFE"
  ],
  "LIVING": [
      "DIE",
      "LEBENDEN",
      "LIVINGS"
  ],
  "CHEEK": [
      "DIE",
      "WANGE",
      "WANGEN"
  ],
  "STUDENT": [
      "DER",
      "STUDENT",
      "STUDENTEN"
  ],
  "BALL": [
      "DER",
      "BALL",
      "BÄLLE"
  ],
  "SIGHT": [
      "DIE",
      "SEHENSWÜRDIGKEIT",
      "SEHENSWÜRDIGKEITEN"
  ],
  "HILL": [
      "DER",
      "HÜGEL",
      "HÜGEL"
  ],
  "COMPANY": [
      "DAS",
      "UNTERNEHMEN",
      "BETRIEBE"
  ],
  "CHURCH": [
      "DIE",
      "KIRCHE",
      "KIRCHEN"
  ],
  "RAIN": [
      "DER",
      "REGEN",
      "REGENZEIT"
  ],
  "SUIT": [
      "DER",
      "ANZUG",
      "ANZÜGE"
  ],
  "ONE": [
      "DER",
      "EINE",
      "EINEN"
  ],
  "DIRECTION": [
      "DIE",
      "RICHTUNG",
      "RICHTUNGEN"
  ],
  "WILL": [
      "DER",
      "WILLE",
      "WILLEN"
  ],
  "THROAT": [
      "DER",
      "HALS",
      "HÄLSE"
  ],
  "MIDDLE": [
      "DIE",
      "MITTE",
      "MIDDLES"
  ],
  "ANSWER": [
      "DIE",
      "ANTWORT",
      "ANTWORTEN"
  ],
  "STUFF": [
      "DAS",
      "ZEUG",
      "STOFFE"
  ],
  "HOSPITAL": [
      "DAS",
      "KRANKENHAUS",
      "KRANKENHÄUSER"
  ],
  "CAMERA": [
      "DIE",
      "KAMERA",
      "KAMERAS"
  ],
  "DRESS": [
      "DAS",
      "KLEID",
      "KLEIDER"
  ],
  "CARD": [
      "DIE",
      "KARTE",
      "KARTEN"
  ],
  "YARD": [
      "DER",
      "HOF",
      "HÖFE"
  ],
  "DARK": [
      "DIE",
      "DUNKELHEIT",
      "DUNKELHEITEN"
  ],
  "SHIT": [
      "DIE",
      "SCHEISSE",
      "SCHEISSE"
  ],
  "IMAGE": [
      "DAS",
      "BILD",
      "BILDER"
  ],
  "MACHINE": [
      "DIE",
      "MASCHINE",
      "MASCHINEN"
  ],
  "DISTANCE": [
      "DIE",
      "DISTANZ",
      "DISTANZEN"
  ],
  "AREA": [
      "DAS",
      "GEBIET",
      "GEBIETE"
  ],
  "NARRATOR": [
      "DER",
      "ERZÄHLER",
      "ERZÄHLER"
  ],
  "ICE": [
      "DAS",
      "EIS",
      "ICES"
  ],
  "SNOW": [
      "DER",
      "SCHNEE",
      "DER SCHNEE"
  ],
  "NOTE": [
      "DIE",
      "NOTIZ",
      "NOTIZEN"
  ],
  "MIRROR": [
      "DER",
      "SPIEGEL",
      "SPIEGEL"
  ],
  "KING": [
      "DER",
      "KÖNIG",
      "KÖNIGE"
  ],
  "FEAR": [
      "DIE",
      "ANGST",
      "ÄNGSTE"
  ],
  "OFFICER": [
      "DER",
      "OFFIZIER",
      "OFFIZIERE"
  ],
  "HOLE": [
      "DAS",
      "LOCH",
      "LÖCHER"
  ],
  "SHOT": [
      "DER",
      "SCHUSS",
      "SCHÜSSE"
  ],
  "GUARD": [
      "DER",
      "WÄCHTER",
      "WACHEN"
  ],
  "CONVERSATION": [
      "DIE",
      "UNTERHALTUNG",
      "UNTERHALTUNGEN"
  ],
  "BOAT": [
      "DAS",
      "BOOT",
      "BOOTE"
  ],
  "SYSTEM": [
      "DAS",
      "SYSTEM",
      "SYSTEME"
  ],
  "CARE": [
      "DIE",
      "PFLEGE",
      "SORGEN"
  ],
  "BIT": [
      "DIE",
      "BIT",
      "BITS"
  ],
  "MOVIE": [
      "DER",
      "FILM",
      "KINO"
  ],
  "BONE": [
      "DER",
      "KNOCHEN",
      "KNOCHEN"
  ],
  "PAGE": [
      "DIE",
      "SEITE",
      "SEITEN"
  ],
  "CAPTAIN": [
      "DER",
      "KAPITÄN",
      "KAPITÄNE"
  ],
  "AUNT": [
      "DIE",
      "TANTE",
      "TANTEN"
  ],
  "DARKNESS": [
      "DIE",
      "DUNKELHEIT",
      "DUNKELHEITEN"
  ],
  "CONTROL": [
      "DIE",
      "KONTROLLE",
      "KONTROLLEN"
  ],
  "DRINK": [
      "DAS",
      "GETRÄNK",
      "GETRÄNKE"
  ],
  "HOTEL": [
      "DAS",
      "HOTEL",
      "HOTELS"
  ],
  "COAT": [
      "DER",
      "MANTEL",
      "MÄNTEL"
  ],
  "STAIR": [
      "DIE",
      "TREPPEN",
      "TREPPE"
  ],
  "ORDER": [
      "DIE",
      "BESTELLUNG",
      "BESTELLUNGEN"
  ],
  "ROSE": [
      "DIE",
      "ROSE",
      "ROSEN"
  ],
  "MISS": [
      "DER",
      "FEHL",
      "FEHLSCHÜSSE"
  ],
  "HAT": [
      "DER",
      "HUT",
      "HÜTE"
  ],
  "GOLD": [
      "DAS",
      "GOLD",
      "GOLDMEDAILLEN"
  ],
  "CIGARETTE": [
      "DIE",
      "ZIGARETTE",
      "ZIGARETTEN"
  ],
  "CLOUD": [
      "DIE",
      "WOLKE",
      "WOLKEN"
  ],
  "VIEW": [
      "DIE",
      "AUSSICHT",
      "AUSSICHTEN"
  ],
  "DRIVER": [
      "DER",
      "FAHRER",
      "FAHRER"
  ],
  "CUP": [
      "DIE",
      "TASSE",
      "TASSEN"
  ],
  "FIGURE": [
      "DIE",
      "FIGUR",
      "FIGUREN"
  ],
  "EXPRESSION": [
      "DER",
      "AUSDRUCK",
      "AUSDRUCKE"
  ],
  "PATH": [
      "DER",
      "PFAD",
      "PFADE"
  ],
  "KEY": [
      "DER",
      "SCHLÜSSEL",
      "SCHLÜSSEL"
  ],
  "COMPUTER": [
      "DER",
      "COMPUTER",
      "COMPUTER"
  ],
  "FLOWER": [
      "DIE",
      "BLUME",
      "BLUMEN"
  ],
  "RING": [
      "DER",
      "RING",
      "RINGE"
  ],
  "BATHROOM": [
      "DAS",
      "BAD",
      "BADEZIMMER"
  ],
  "METAL": [
      "DAS",
      "METALL",
      "METALLE"
  ],
  "MOON": [
      "DER",
      "MOND",
      "MONDE"
  ],
  "SONG": [
      "DAS",
      "LIED",
      "LIEDER"
  ],
  "SOLDIER": [
      "DER",
      "SOLDAT",
      "SOLDATEN"
  ],
  "RADIO": [
      "DAS",
      "RADIO",
      "RADIOS"
  ],
  "HISTORY": [
      "DIE",
      "GESCHICHTE",
      "GESCHICHTEN"
  ],
  "WAVE": [
      "DIE",
      "WELLE",
      "WELLEN"
  ],
  "PLAN": [
      "DER",
      "PLAN",
      "PLÄNE"
  ],
  "COLLEGE": [
      "DAS",
      "COLLEGE",
      "FACHHOCHSCHULEN"
  ],
  "FISH": [
      "DER",
      "FISCH",
      "FISCHE"
  ],
  "GARDEN": [
      "DER",
      "GARTEN",
      "GÄRTEN"
  ],
  "TRAIN": [
      "DER",
      "ZUG",
      "ZÜGE"
  ],
  "SHOP": [
      "DAS",
      "GESCHÄFT",
      "LÄDEN"
  ],
  "COP": [
      "DER",
      "POLIZIST",
      "POLIZISTEN"
  ],
  "ART": [
      "DIE",
      "KUNST",
      "KÜNSTE"
  ],
  "BEER": [
      "DAS",
      "BIER",
      "BIERE"
  ],
  "NORTH": [
      "DER",
      "NORDEN",
      "NORTHS"
  ],
  "ISLAND": [
      "DIE",
      "INSEL",
      "INSELN"
  ],
  "BUS": [
      "DER",
      "BUS",
      "BUSSE"
  ],
  "SMELL": [
      "DER",
      "GERUCH",
      "GERÜCHE"
  ],
  "NOISE": [
      "DAS",
      "GERÄUSCH",
      "GERÄUSCHE"
  ],
  "MAMA": [
      "DIE",
      "MAMA",
      "DAS+MAMAS"
  ],
  "PARK": [
      "DER",
      "PARK",
      "PARKS"
  ],
  "SOUTH": [
      "DER",
      "SÜDEN",
      "SOUTHS"
  ],
  "PAIR": [
      "DAS",
      "PAAR",
      "PAARE"
  ],
  "LORD": [
      "DER",
      "HERR",
      "HERREN"
  ],
  "PLATE": [
      "DIE",
      "PLATTE",
      "PLATTEN"
  ],
  "JACKET": [
      "DIE",
      "JACKE",
      "JACKEN"
  ],
  "HELP": [
      "DIE",
      "HILFE",
      "HILFT"
  ],
  "DADDY": [
      "DER",
      "PAPA",
      "VÄTER"
  ],
  "GRASS": [
      "DAS",
      "GRAS",
      "GRÄSER"
  ],
  "THANKS": [
      "DIE",
      "DANK",
      "THANKSES"
  ],
  "HEAT": [
      "DIE",
      "HITZE",
      "HEATS"
  ],
  "SLEEP": [
      "DER",
      "SCHLAF",
      "SCHLAFPLÄTZE"
  ],
  "BRAIN": [
      "DAS",
      "GEHIRN",
      "GEHIRNE"
  ],
  "SERVICE": [
      "DER",
      "SERVICE",
      "DER+DIENSTLEISTUNGEN"
  ],
  "TRIP": [
      "DIE",
      "REISE",
      "AUSFLÜGE"
  ],
  "BEAT": [
      "DER",
      "BEAT",
      "BEATS"
  ],
  "KNIFE": [
      "DAS",
      "MESSER",
      "MESSER"
  ],
  "SPOT": [
      "DER",
      "PLATZ",
      "FLECKEN"
  ],
  "MESSAGE": [
      "DIE",
      "NACHRICHT",
      "NACHRICHTEN"
  ],
  "MARK": [
      "DIE",
      "NOTE",
      "NOTEN"
  ],
  "TEACHER": [
      "DER",
      "LEHRER",
      "LEHRER"
  ],
  "GAZE": [
      "DER",
      "BLICK",
      "BLICKE"
  ],
  "VILLAGE": [
      "DAS",
      "DORF",
      "DÖRFER"
  ],
  "WINTER": [
      "DER",
      "WINTER",
      "WINTER"
  ],
  "FRONT": [
      "DIE",
      "FRONT",
      "FRONTEN"
  ],
  "LAW": [
      "DAS",
      "GESETZ",
      "GESETZE"
  ],
  "SURFACE": [
      "DIE",
      "OBERFLÄCHE",
      "OBERFLÄCHEN"
  ],
  "BANK": [
      "DIE",
      "BANK",
      "BÄNKE"
  ],
  "TEAM": [
      "DAS",
      "TEAM",
      "TEAMS"
  ],
  "MAXIMUM": [
      "DAS",
      "MAXIMUM",
      "MAXIMA"
  ],
  "POSITION": [
      "DIE",
      "POSITION",
      "POSITIONEN"
  ],
  "STOMACH": [
      "DER",
      "BAUCH",
      "BÄUCHE"
  ],
  "TURN": [
      "DIE",
      "WENDE",
      "WENDEN"
  ],
  "WEST": [
      "DER",
      "WESTEN",
      "WESTS"
  ],
  "LUNCH": [
      "DAS",
      "MITTAGESSEN",
      "MITTAGESSEN"
  ],
  "CHANGE": [
      "DER",
      "WECHSEL",
      "VERÄNDERUNGEN"
  ],
  "CREATURE": [
      "DIE",
      "KREATUR",
      "GESCHÖPFE"
  ],
  "SOUL": [
      "DIE",
      "SEELE",
      "SEELEN"
  ],
  "LEAF": [
      "DAS",
      "BLATT",
      "BLÄTTER"
  ],
  "SHOW": [
      "DIE",
      "SHOW",
      "SHOWS"
  ],
  "GATE": [
      "DIE",
      "GATE",
      "TORE"
  ],
  "PALM": [
      "DIE",
      "PALME",
      "PALMEN"
  ],
  "PLASTIC": [
      "DER",
      "KUNSTSTOFF",
      "KUNSTSTOFF"
  ],
  "FORCE": [
      "DIE",
      "KRAFT",
      "KRÄFTE"
  ],
  "BEACH": [
      "DER",
      "STRAND",
      "STRÄNDE"
  ],
  "PRESIDENT": [
      "DER",
      "PRÄSIDENT",
      "PRÄSIDENTEN"
  ],
  "SHAPE": [
      "DIE",
      "FORM",
      "FORMEN"
  ],
  "SMOKE": [
      "DER",
      "RAUCH",
      "RAUCHT"
  ],
  "WHEEL": [
      "DAS",
      "RAD",
      "RÄDER"
  ],
  "SILVER": [
      "DAS",
      "SILBER",
      "SILBER"
  ],
  "ROOF": [
      "DAS",
      "DACH",
      "DÄCHER"
  ],
  "WEIGHT": [
      "DAS",
      "GEWICHT",
      "GEWICHTE"
  ],
  "TONGUE": [
      "DIE",
      "ZUNGE",
      "ZUNGEN"
  ],
  "TEA": [
      "DER",
      "TEE",
      "TEES"
  ],
  "TRACK": [
      "DIE",
      "STRECKE",
      "STRECKEN"
  ],
  "ANGLE": [
      "DER",
      "WINKEL",
      "WINKEL"
  ],
  "FORM": [
      "DIE",
      "FORM",
      "FORMEN"
  ],
  "TONE": [
      "DER",
      "TON",
      "TÖNE"
  ],
  "CIRCLE": [
      "DER",
      "KREIS",
      "KREISE"
  ],
  "SPRING": [
      "DER",
      "FRÜHLING",
      "FEDERN"
  ],
  "PORCH": [
      "DIE",
      "VORHALLE",
      "VERANDEN"
  ],
  "SHEET": [
      "DAS",
      "BLATT",
      "BLÄTTER"
  ],
  "MEMBER": [
      "DAS",
      "MITGLIED",
      "MITGLIEDER"
  ],
  "POOL": [
      "DAS",
      "SCHWIMMBECKEN",
      "POOLS"
  ],
  "NEED": [
      "DAS",
      "BEDÜRFNIS",
      "BEDÜRFNISSE"
  ],
  "HOPE": [
      "DIE",
      "HOFFNUNG",
      "HOFFNUNGEN"
  ],
  "LAKE": [
      "DER",
      "SEE",
      "SEEN"
  ],
  "BREAST": [
      "DIE",
      "BRUST",
      "BRÜSTE"
  ],
  "SURPRISE": [
      "DIE",
      "ÜBERRASCHUNG",
      "ÜBERRASCHUNGEN"
  ],
  "INTEREST": [
      "DIE",
      "INTERESSE",
      "INTERESSEN"
  ],
  "BOTTOM": [
      "DER",
      "BODEN",
      "BÖDEN"
  ],
  "SPIRIT": [
      "DER",
      "GEIST",
      "GEISTER"
  ],
  "BLOCK": [
      "DER",
      "BLOCK",
      "BLÖCKE"
  ],
  "LANGUAGE": [
      "DIE",
      "SPRACHE",
      "SPRACHEN"
  ],
  "BRIDGE": [
      "DIE",
      "BRÜCKE",
      "BRÜCKEN"
  ],
  "DUST": [
      "DER",
      "STAUB",
      "STÄUBE"
  ],
  "CELL": [
      "DIE",
      "ZELLE",
      "ZELLEN"
  ],
  "WINE": [
      "DER",
      "WEIN",
      "WEINE"
  ],
  "BOOT": [
      "DAS",
      "BOOT",
      "BOOTE"
  ],
  "CHOICE": [
      "DIE",
      "WAHL",
      "WAHLEN"
  ],
  "ROW": [
      "DIE",
      "REIHE",
      "REIHEN"
  ],
  "TALK": [
      "DAS",
      "GESPRÄCH",
      "GESPRÄCHE"
  ],
  "PLANE": [
      "DAS",
      "FLUGZEUG",
      "FLUGZEUGE"
  ],
  "WATCH": [
      "DIE",
      "UHR",
      "UHREN"
  ],
  "INFORMATION": [
      "DIE",
      "INFORMATION",
      "INFORMATIONEN"
  ],
  "GRANDMOTHER": [
      "DIE",
      "GROSSMUTTER",
      "GROSSMÜTTER"
  ],
  "WING": [
      "DER",
      "FLÜGEL",
      "FLÜGEL"
  ],
  "BOB": [
      "DIE",
      "BOB",
      "BOBS"
  ],
  "CLUB": [
      "DER",
      "CLUB",
      "VEREINE"
  ],
  "MASTER": [
      "DER",
      "MEISTER",
      "MEISTER"
  ],
  "GRACE": [
      "DIE",
      "GNADE",
      "GNADEN"
  ],
  "FOREST": [
      "DER",
      "WALD",
      "WÄLDER"
  ],
  "SIZE": [
      "DIE",
      "GRÖSSE",
      "GRÖSSEN"
  ],
  "SET": [
      "DER",
      "SATZ",
      "SÄTZE"
  ],
  "MARRIAGE": [
      "DIE",
      "EHE",
      "EHEN"
  ],
  "FOREHEAD": [
      "DIE",
      "STIRN",
      "STIRNEN"
  ],
  "STORM": [
      "DER",
      "STURM",
      "STÜRME"
  ],
  "DOORWAY": [
      "DIE",
      "TÜRÖFFNUNG",
      "TÜREN"
  ],
  "SITUATION": [
      "DIE",
      "SITUATION",
      "SITUATIONEN"
  ],
  "COUNTER": [
      "DER",
      "ZÄHLER",
      "ZÄHLER"
  ],
  "NEIGHBOR": [
      "DER",
      "NACHBAR",
      "NACHBARN"
  ],
  "PHOTO": [
      "DAS",
      "FOTO",
      "FOTOS"
  ],
  "STAGE": [
      "DIE",
      "BÜHNE",
      "BÜHNEN"
  ],
  "MEETING": [
      "DAS",
      "TREFFEN",
      "SITZUNGEN"
  ],
  "NURSE": [
      "DIE",
      "KRANKENSCHWESTER",
      "KRANKENSCHWESTERN"
  ],
  "SECURITY": [
      "DIE",
      "SICHERHEIT",
      "SICHERHEITEN"
  ],
  "WEAPON": [
      "DIE",
      "WAFFE",
      "WAFFEN"
  ],
  "EVENT": [
      "DAS",
      "EREIGNIS",
      "EREIGNISSE"
  ],
  "CEILING": [
      "DIE",
      "DECKE",
      "DECKEN"
  ],
  "ENGINE": [
      "DER",
      "MOTOR",
      "MOTOREN"
  ],
  "GIFT": [
      "DAS",
      "GESCHENK",
      "GESCHENKE"
  ],
  "RESTAURANT": [
      "DAS",
      "RESTAURANT",
      "RESTAURANT"
  ],
  "BOARD": [
      "DIE",
      "TAFEL",
      "TAFEL"
  ],
  "HALLWAY": [
      "DER",
      "FLUR",
      "FLURE"
  ],
  "ARMY": [
      "DIE",
      "ARMEE",
      "ARMEEN"
  ],
  "EFFORT": [
      "DER",
      "AUFWAND",
      "BEMÜHUNGEN"
  ],
  "EAST": [
      "DER",
      "OSTEN",
      "EASTS"
  ],
  "AGENT": [
      "DER",
      "AGENT",
      "AGENTEN"
  ],
  "FUTURE": [
      "DIE",
      "ZUKUNFT",
      "ZUKÜNFTE"
  ],
  "PANT": [
      "DIE",
      "HOSE",
      "HOSEN"
  ],
  "LEATHER": [
      "DAS",
      "LEDER",
      "LEDER"
  ],
  "FLIGHT": [
      "DER",
      "FLUG",
      "FLÜGE"
  ],
  "SEX": [
      "DAS",
      "GESCHLECHT",
      "GESCHLECHTER"
  ],
  "COURT": [
      "DAS",
      "GERICHT",
      "GERICHTE"
  ],
  "COURSE": [
      "DER",
      "KURS",
      "KURSE"
  ],
  "DIRT": [
      "DER",
      "DRECK",
      "DIRTS"
  ],
  "EGG": [
      "DAS",
      "EI",
      "EIER"
  ],
  "CHIN": [
      "DAS",
      "KINN",
      "KINNE"
  ],
  "STRANGER": [
      "DER",
      "FREMDE",
      "FREMDEN"
  ],
  "PLEASURE": [
      "DIE",
      "FREUDE",
      "FREUDEN"
  ],
  "DETAIL": [
      "DAS",
      "DETAIL",
      "DETAILS"
  ],
  "CREW": [
      "DIE",
      "BESATZUNG",
      "BESATZUNGEN"
  ],
  "FALL": [
      "DER",
      "HERBST",
      "WASSERFÄLLE"
  ],
  "GUEST": [
      "DER",
      "GAST",
      "GÄSTE"
  ],
  "EXPERIENCE": [
      "DAS",
      "ERLEBNIS",
      "ERFAHRUNGEN"
  ],
  "JOKE": [
      "DER",
      "WITZ",
      "WITZE"
  ],
  "SAND": [
      "DER",
      "SAND",
      "DER SAND"
  ],
  "FIST": [
      "DIE",
      "FAUST",
      "FÄUSTE"
  ],
  "ACTION": [
      "DIE",
      "AKTION",
      "AKTIONEN"
  ],
  "WALK": [
      "DAS",
      "WANDERN",
      "WANDERUNGEN"
  ],
  "WEDDING": [
      "DIE",
      "HOCHZEIT",
      "HOCHZEITEN"
  ],
  "DEAL": [
      "DER",
      "DEAL",
      "ANGEBOTE"
  ],
  "NATURE": [
      "DIE",
      "NATUR",
      "NATUREN"
  ],
  "PLANET": [
      "DER",
      "PLANET",
      "PLANETEN"
  ],
  "COUSIN": [
      "DER",
      "COUSIN",
      "COUSINEN"
  ],
  "MOVEMENT": [
      "DIE",
      "BEWEGUNG",
      "BEWEGUNGEN"
  ],
  "FLESH": [
      "DAS",
      "FLEISCH",
      "KONKRETISIERT"
  ],
  "RECORD": [
      "DER",
      "DATENSATZ",
      "DATENSÄTZE"
  ],
  "CAMP": [
      "DAS",
      "CAMP",
      "LAGER"
  ],
  "NEWSPAPER": [
      "DIE",
      "ZEITUNG",
      "ZEITUNG"
  ],
  "RAY": [
      "DER",
      "STRAHL",
      "STRAHLEN"
  ],
  "HUMAN": [
      "DER",
      "MENSCH",
      "MENSCHEN"
  ],
  "COUCH": [
      "DAS",
      "SOFA",
      "SOFAS"
  ],
  "MOTION": [
      "DIE",
      "BEWEGUNG",
      "BEWEGUNGEN"
  ],
  "GRANDFATHER": [
      "DER",
      "GROSSVATER",
      "GROSSVÄTER"
  ],
  "PHOTOGRAPH": [
      "DIE",
      "FOTOGRAFIE",
      "PHOTOGRAPHES"
  ],
  "SECRET": [
      "DAS",
      "GEHEIMNIS",
      "GEHEIMNISSE"
  ],
  "BEAUTY": [
      "DIE",
      "SCHÖNHEIT",
      "SCHÖNHEITEN"
  ],
  "PRESENCE": [
      "DAS",
      "VORHANDENSEIN",
      "PRÄSENZEN"
  ],
  "BELL": [
      "DIE",
      "GLOCKE",
      "GLOCKEN"
  ],
  "FOLK": [
      "DIE",
      "VOLKS",
      "LEUTE"
  ],
  "BUTTON": [
      "DER",
      "KNOPF",
      "KNÖPFE"
  ],
  "LIST": [
      "DIE",
      "LISTE",
      "LISTEN"
  ],
  "LEVEL": [
      "DAS",
      "LEVEL",
      "NIVEAUS"
  ],
  "DATE": [
      "DAS",
      "DATUM",
      "DATEN"
  ],
  "SUBJECT": [
      "DAS",
      "THEMA",
      "THEMEN"
  ],
  "DIFFERENCE": [
      "DER",
      "UNTERSCHIED",
      "UNTERSCHIEDE"
  ],
  "PAUSE": [
      "DIE",
      "PAUSE",
      "PAUSEN"
  ],
  "VAN": [
      "DER",
      "VAN",
      "WAGEN"
  ],
  "BLADE": [
      "DIE",
      "KLINGE",
      "KLINGEN"
  ],
  "TELEVISION": [
      "DAS",
      "FERNSEHEN",
      "FERNSEHER"
  ],
  "COVER": [
      "DIE",
      "TITELSEITE",
      "ABDECKUNGEN"
  ],
  "PAST": [
      "DIE",
      "VERGANGENHEIT",
      "VERGANGENHEITEN"
  ],
  "FARM": [
      "DER",
      "BAUERNHOF",
      "BAUERNHÖFE"
  ],
  "LAP": [
      "DIE",
      "RUNDEN",
      "RUNDEN"
  ],
  "BAND": [
      "DIE",
      "BAND",
      "BANDS"
  ],
  "LAWYER": [
      "DER",
      "ANWALT",
      "ANWÄLTE"
  ],
  "MAGAZINE": [
      "DAS",
      "MAGAZIN",
      "ZEITSCHRIFTEN"
  ],
  "BRANCH": [
      "DER",
      "AST",
      "ZWEIGE"
  ],
  "FRAME": [
      "DER",
      "RAHMEN",
      "RAHMEN"
  ],
  "DECK": [
      "DAS",
      "DECK",
      "DECKS"
  ],
  "EFFECT": [
      "DER",
      "EFFEKT",
      "EFFEKTE"
  ],
  "DANCE": [
      "DER",
      "TANZ",
      "TÄNZE"
  ],
  "VISION": [
      "DIE",
      "SICHT",
      "SICHTEN"
  ],
  "GHOST": [
      "DAS",
      "GESPENST",
      "GEISTER"
  ],
  "ASS": [
      "DER",
      "ESEL",
      "ESEL"
  ],
  "CHARACTER": [
      "DER",
      "CHARAKTER",
      "CHARAKTERE"
  ],
  "GLANCE": [
      "DER",
      "BLICK",
      "BLICKE"
  ],
  "GOODBYE": [
      "DAS",
      "AUF",
      "VERABSCHIEDUNGEN"
  ],
  "PARKING": [
      "DAS",
      "PARK",
      "PARKPLÄTZE"
  ],
  "BREAKFAST": [
      "DAS",
      "FRÜHSTÜCK",
      "DAS+FRÜHSTÜCK"
  ],
  "GESTURE": [
      "DIE",
      "GESTE",
      "GESTEN"
  ],
  "LUCK": [
      "DAS",
      "GLÜCK",
      "LUCKS"
  ],
  "BLANKET": [
      "DIE",
      "DECKE",
      "DECKEN"
  ],
  "GAS": [
      "DAS",
      "GAS",
      "GASE"
  ],
  "CORRIDOR": [
      "DER",
      "KORRIDOR",
      "FLURE"
  ],
  "PROFESSOR": [
      "DER",
      "PROFESSOR",
      "PROFESSOREN"
  ],
  "PLAY": [
      "DAS",
      "SPIEL",
      "SPIELE"
  ],
  "MISTAKE": [
      "DER",
      "FEHLER",
      "FEHLER"
  ],
  "UNIVERSITY": [
      "DIE",
      "UNIVERSITÄT",
      "UNIVERSITÄTEN"
  ],
  "OCEAN": [
      "DER",
      "OZEAN",
      "OZEANE"
  ],
  "CENTURY": [
      "DAS",
      "JAHRHUNDERT",
      "JAHRHUNDERTE"
  ],
  "HONEY": [
      "DER",
      "HONIG",
      "HONIGE"
  ],
  "PILE": [
      "DER",
      "STAPEL",
      "PFÄHLE"
  ],
  "BOWL": [
      "DIE",
      "SCHALE",
      "SCHALEN"
  ],
  "BASE": [
      "DIE",
      "BASIS",
      "BASEN"
  ],
  "FENCE": [
      "DER",
      "ZAUN",
      "ZÄUNE"
  ],
  "RULE": [
      "DIE",
      "REGEL",
      "REGELN"
  ],
  "LAUGHTER": [
      "DAS",
      "GELÄCHTER",
      "GELÄCHTER"
  ],
  "ANGER": [
      "DIE",
      "WUT",
      "ANGERS"
  ],
  "SWEAT": [
      "DER",
      "SCHWEISS",
      "SCHWEISSAUSBRÜCHE"
  ],
  "ACCIDENT": [
      "DER",
      "UNFALL",
      "UNFÄLLE"
  ],
  "WEATHER": [
      "DAS",
      "WETTER",
      "WIND UND WETTER"
  ],
  "DECISION": [
      "DIE",
      "ENTSCHEIDUNG",
      "ENTSCHEIDUNGEN"
  ],
  "ANGEL": [
      "DER",
      "ENGEL",
      "ENGEL"
  ],
  "STRENGTH": [
      "DIE",
      "STÄRKE",
      "STÄRKEN"
  ],
  "CHICKEN": [
      "DAS",
      "HUHN",
      "HÜHNER"
  ],
  "STUDY": [
      "DIE",
      "STUDIUM",
      "STUDIEN"
  ],
  "TAPE": [
      "DAS",
      "BAND",
      "BÄNDER"
  ],
  "WRIST": [
      "DAS",
      "HANDGELENK",
      "HANDGELENKE"
  ],
  "STOP": [
      "DER",
      "HALT",
      "ANSCHLÄGE"
  ],
  "HIP": [
      "DIE",
      "HÜFTE",
      "HÜFTEN"
  ],
  "GOVERNMENT": [
      "DIE",
      "REGIERUNG",
      "REGIERUNGEN"
  ],
  "BELLY": [
      "DER",
      "BAUCH",
      "BÄUCHE"
  ],
  "QUEEN": [
      "DIE",
      "KÖNIGIN",
      "KÖNIGINNEN"
  ],
  "REPORT": [
      "DER",
      "BERICHT",
      "BERICHTE"
  ],
  "TAIL": [
      "DER",
      "SCHWEIF",
      "SCHWÄNZE"
  ],
  "PLANT": [
      "DIE",
      "PFLANZE",
      "PFLANZEN"
  ],
  "FLAME": [
      "DIE",
      "FLAMME",
      "FLAMMEN"
  ],
  "HEAVEN": [
      "DER",
      "HIMMEL",
      "HIMMEL"
  ],
  "BELT": [
      "DER",
      "GÜRTEL",
      "GÜRTEL"
  ],
  "NEIGHBORHOOD": [
      "DIE",
      "NACHBARSCHAFT",
      "NACHBARSCHAFTEN"
  ],
  "ENERGY": [
      "DIE",
      "ENERGIE",
      "ENERGIEN"
  ],
  "GREEN": [
      "DAS",
      "GRÜN",
      "GRÜNEN"
  ],
  "QUARTER": [
      "DAS",
      "VIERTEL",
      "VIERTEL"
  ],
  "ENEMY": [
      "DER",
      "FEIND",
      "FEINDE"
  ],
  "MOVE": [
      "DIE",
      "BEWEGUNG",
      "BEWEGUNGEN"
  ],
  "ENTRANCE": [
      "DER",
      "EINGANG",
      "EINGÄNGE"
  ],
  "LIBRARY": [
      "DIE",
      "BIBLIOTHEK",
      "BIBLIOTHEKEN"
  ],
  "WRITER": [
      "DER",
      "VERFASSER",
      "AUTOREN"
  ],
  "PEACE": [
      "DER",
      "FRIEDEN",
      "PEACES"
  ],
  "TOUCH": [
      "DIE",
      "BERÜHRUNG",
      "BERÜHRUNGEN"
  ],
  "POT": [
      "DER",
      "TOPF",
      "TÖPFE"
  ],
  "TYPE": [
      "DER",
      "TYP",
      "TYPEN"
  ],
  "CAUSE": [
      "DER",
      "GRUND",
      "GRÜNDE"
  ],
  "ROPE": [
      "DAS",
      "SEIL",
      "SEILE"
  ],
  "MUSCLE": [
      "DER",
      "MUSKEL",
      "MUSKELN"
  ],
  "PAINTING": [
      "DAS",
      "GEMÄLDE",
      "GEMÄLDE"
  ],
  "CURTAIN": [
      "DIE",
      "GARDINE",
      "GARDINEN"
  ],
  "MEAL": [
      "DIE",
      "MAHLZEIT",
      "MAHLZEITEN"
  ],
  "ACT": [
      "DER",
      "AKT",
      "HANDLUNGEN"
  ],
  "WOLF": [
      "DER",
      "WOLF",
      "WÖLFE"
  ],
  "CABIN": [
      "DIE",
      "KAJÜTE",
      "KABINEN"
  ],
  "CHARGE": [
      "DIE",
      "LADUNG",
      "LADUNGEN"
  ],
  "CLOCK": [
      "DIE",
      "UHR",
      "UHREN"
  ],
  "PASSENGER": [
      "DER",
      "PASSAGIER",
      "PASSAGIERE"
  ],
  "BUDDY": [
      "DER",
      "KUMPEL",
      "FREUNDE"
  ],
  "DRUG": [
      "DAS",
      "MEDIKAMENT",
      "MEDIKAMENTE"
  ],
  "USE": [
      "DIE",
      "VERWENDUNG",
      "VERWENDUNGEN"
  ],
  "BENCH": [
      "DIE",
      "BANK",
      "BÄNKE"
  ],
  "TRAFFIC": [
      "DER",
      "VERKEHR",
      "VERKEHRE"
  ],
  "RELIEF": [
      "DAS",
      "RELIEF",
      "RELIEFS"
  ],
  "CAP": [
      "DIE",
      "KAPPE",
      "KAPPEN"
  ],
  "PACK": [
      "DAS",
      "RUDEL",
      "PACKUNGEN"
  ],
  "WEEKEND": [
      "DAS",
      "WOCHENENDE",
      "WOCHENENDEN"
  ],
  "STAND": [
      "DER",
      "STAND",
      "STÄNDE"
  ],
  "ELEVATOR": [
      "DER",
      "AUFZUG",
      "AUFZÜGE"
  ],
  "BIRTHDAY": [
      "DER",
      "GEBURTSTAG",
      "GEBURTSTAGE"
  ],
  "LILY": [
      "DIE",
      "LILIE",
      "LILIEN"
  ],
  "IRON": [
      "DAS",
      "BÜGELEISEN",
      "EISEN"
  ],
  "MEAT": [
      "DAS",
      "FLEISCH",
      "DAS FLEISCH"
  ],
  "EYEBROW": [
      "DIE",
      "AUGENBRAUE",
      "AUGENBRAUEN"
  ],
  "RESPONSE": [
      "DIE",
      "ANTWORT",
      "ANTWORTEN"
  ],
  "SPEED": [
      "DIE",
      "GESCHWINDIGKEIT",
      "GESCHWINDIGKEITEN"
  ],
  "PURPOSE": [
      "DIE",
      "ABSICHT",
      "ABSICHTEN"
  ],
  "SKIRT": [
      "DER",
      "ROCK",
      "RÖCKE"
  ],
  "SQUARE": [
      "DAS",
      "QUADRAT",
      "QUADRATE"
  ],
  "DRIVE": [
      "DIE",
      "FAHRT",
      "ANTRIEBE"
  ],
  "ARTICLE": [
      "DER",
      "ARTIKEL",
      "ARTIKEL"
  ],
  "ENGLISH": [
      "DAS",
      "ENGLISCH",
      "ENGLISHES"
  ],
  "TOWER": [
      "DER",
      "TURM",
      "TÜRME"
  ],
  "BATTLE": [
      "DER",
      "KAMPF",
      "KÄMPFE"
  ],
  "FILM": [
      "DER",
      "FILM",
      "FILME"
  ],
  "RACE": [
      "DAS",
      "RENNEN",
      "RENNEN"
  ],
  "SHOCK": [
      "DER",
      "SCHOCK",
      "SCHOCKE"
  ],
  "SECTION": [
      "DIE",
      "SEKTION",
      "ABSCHNITTE"
  ],
  "MANNER": [
      "DIE",
      "METHODE",
      "METHODEN"
  ],
  "SWORD": [
      "DAS",
      "SCHWERT",
      "SCHWERTER"
  ],
  "STICK": [
      "DER",
      "STOCK",
      "STÖCKE"
  ],
  "FILE": [
      "DIE",
      "DATEI",
      "DATEIEN"
  ],
  "BREAD": [
      "DAS",
      "BROT",
      "BROTE"
  ],
  "OIL": [
      "DAS",
      "ÖL",
      "ÖLE"
  ],
  "CHAIN": [
      "DIE",
      "KETTE",
      "KETTEN"
  ],
  "DEPARTMENT": [
      "DIE",
      "ABTEILUNG",
      "ABTEILUNGEN"
  ],
  "PROJECT": [
      "DAS",
      "PROJEKT",
      "PROJEKTE"
  ],
  "MURDER": [
      "DER",
      "MORD",
      "MORDE"
  ],
  "BEAR": [
      "DER",
      "BÄR",
      "BÄREN"
  ],
  "TEST": [
      "DER",
      "TEST",
      "TESTS"
  ],
  "VISIT": [
      "DER",
      "BESUCH",
      "BESUCHE"
  ],
  "MILK": [
      "DIE",
      "MILCH",
      "MILCHEN"
  ],
  "BOSS": [
      "DER",
      "CHEF",
      "BOSSE"
  ],
  "ELBOW": [
      "DER",
      "ELLBOGEN",
      "ELLBOGEN"
  ],
  "DESIRE": [
      "DAS",
      "VERLANGEN",
      "WÜNSCHE"
  ],
  "PATIENT": [
      "DER",
      "PATIENT",
      "PATIENTEN"
  ],
  "GRIN": [
      "DAS",
      "GRINSEN",
      "GRINS"
  ],
  "LOVER": [
      "DER",
      "LIEBHABER",
      "LIEBHABER"
  ],
  "PRICE": [
      "DER",
      "PREIS",
      "PREISE"
  ],
  "MAP": [
      "DIE",
      "KARTE",
      "KARTEN"
  ],
  "KNOWLEDGE": [
      "DAS",
      "WISSEN",
      "ERKENNTNISSE"
  ],
  "BEGINNING": [
      "DER",
      "ANFANG",
      "ANFÄNGE"
  ],
  "COLD": [
      "DIE",
      "KÄLTE",
      "ERKÄLTUNG"
  ],
  "CLOSET": [
      "DER",
      "SCHRANK",
      "SCHRÄNKE"
  ],
  "DAWN": [
      "DIE",
      "MORGENDÄMMERUNG",
      "IM MORGENGRAUEN"
  ],
  "TEMPLE": [
      "DER",
      "TEMPEL",
      "TEMPEL"
  ],
  "JOY": [
      "DER",
      "SPASS",
      "FREUDEN"
  ],
  "DUTY": [
      "DIE",
      "PFLICHT",
      "PFLICHTEN"
  ],
  "PRACTICE": [
      "DIE",
      "ÜBUNG",
      "PRAKTIKEN"
  ],
  "HEEL": [
      "DIE",
      "FERSE",
      "FERSEN"
  ],
  "VALLEY": [
      "DAS",
      "TAL",
      "TÄLER"
  ],
  "FIGHT": [
      "DER",
      "KAMPF",
      "KÄMPFE"
  ],
  "WIRE": [
      "DAS",
      "KABEL",
      "DRÄHTE"
  ],
  "JEANS": [
      "DIE",
      "JEANS",
      "JEANSES"
  ],
  "KISS": [
      "DER",
      "KUSS",
      "KÜSSE"
  ],
  "JAW": [
      "DER",
      "KIEFER",
      "BACKEN"
  ],
  "RUN": [
      "DIE",
      "LAUF",
      "LÄUFE"
  ],
  "HOLD": [
      "DER",
      "HALT",
      "LADERÄUME"
  ],
  "RELATIONSHIP": [
      "DAS",
      "VERHÄLTNIS",
      "BEZIEHUNGEN"
  ],
  "OBJECT": [
      "DAS",
      "OBJEKT",
      "OBJEKTE"
  ],
  "ATTACK": [
      "DER",
      "ANGRIFF",
      "ANGRIFFE"
  ],
  "DISH": [
      "DAS",
      "GERICHT",
      "GERICHTE"
  ],
  "HIGHWAY": [
      "DIE",
      "AUTOBAHN",
      "AUTOBAHNEN"
  ],
  "SHADE": [
      "DIE",
      "SCHATTIERUNG",
      "SCHATTEN"
  ],
  "CRIME": [
      "DAS",
      "VERBRECHEN",
      "VERBRECHEN"
  ],
  "WHITE": [
      "DAS",
      "WEISS",
      "WEISSEN"
  ],
  "PARTNER": [
      "DER",
      "PARTNER",
      "PARTNER"
  ],
  "PRIEST": [
      "DER",
      "PRIESTER",
      "PRIESTER"
  ],
  "LAWN": [
      "DER",
      "RASEN",
      "DER RASEN"
  ],
  "LAUGH": [
      "DAS",
      "LACHEN",
      "LACHEN"
  ],
  "TRUNK": [
      "DER",
      "KOFFERRAUM",
      "STÄMME"
  ],
  "CRY": [
      "DAS",
      "WEINEN",
      "SCHREIE"
  ],
  "PROGRAM": [
      "DAS",
      "PROGRAMM",
      "PROGRAMME"
  ],
  "RIDE": [
      "DIE",
      "FAHRT",
      "FAHRTEN"
  ],
  "SHELF": [
      "DAS",
      "REGAL",
      "REGALE"
  ],
  "GENTLEMAN": [
      "DER",
      "GENTLEMAN",
      "DAS+GENTLEMANS"
  ],
  "BEING": [
      "DAS",
      "SEIN",
      "WESEN"
  ],
  "STEEL": [
      "DER",
      "STAHL",
      "STAHLE"
  ],
  "SIDEWALK": [
      "DER",
      "BÜRGERSTEIG",
      "BÜRGERSTEIGE"
  ],
  "UNIFORM": [
      "DIE",
      "UNIFORM",
      "UNIFORMEN"
  ],
  "PATTERN": [
      "DAS",
      "MUSTER",
      "MUSTER"
  ],
  "EVIDENCE": [
      "DER",
      "BEWEIS",
      "BEWEISE"
  ],
  "PLAYER": [
      "DER",
      "SPIELER",
      "SPIELER"
  ],
  "NOVEL": [
      "DER",
      "ROMAN",
      "ROMANE"
  ],
  "PILLOW": [
      "DAS",
      "KISSEN",
      "KISSEN"
  ],
  "LAMP": [
      "DIE",
      "LAMPE",
      "LAMPEN"
  ],
  "DRAWER": [
      "DIE",
      "SCHUBLADE",
      "SCHUBLADEN"
  ],
  "DANGER": [
      "DIE",
      "GEFAHR",
      "GEFAHREN"
  ],
  "DETECTIVE": [
      "DER",
      "DETEKTIV",
      "DETEKTIVE"
  ],
  "INSTANT": [
      "DIE",
      "INSTANT",
      "ZEITPUNKTE"
  ],
  "THINKING": [
      "DAS",
      "DENKEN",
      "GEDANKEN"
  ],
  "CRACK": [
      "DER",
      "RISS",
      "RISSE"
  ],
  "PRAYER": [
      "DAS",
      "GEBET",
      "GEBETE"
  ],
  "TOWEL": [
      "DAS",
      "HANDTUCH",
      "HANDTÜCHER"
  ],
  "GLOVE": [
      "DER",
      "HANDSCHUH",
      "HANDSCHUHE"
  ],
  "BAY": [
      "DIE",
      "BUCHT",
      "BUCHTEN"
  ],
  "AUDIENCE": [
      "DAS",
      "PUBLIKUM",
      "DAS PUBLIKUM"
  ],
  "CAN": [
      "DIE",
      "DOSE",
      "DOSEN"
  ],
  "CONDITION": [
      "DIE",
      "BEDINGUNG",
      "BEDINGUNGEN"
  ],
  "TRAIL": [
      "DER",
      "PFAD",
      "PFADE"
  ],
  "WAIST": [
      "DIE",
      "TAILLE",
      "TAILLE"
  ],
  "PRESSURE": [
      "DER",
      "DRUCK",
      "DRÜCKE"
  ],
  "TELEPHONE": [
      "DAS",
      "TELEFON",
      "TELEFONE"
  ],
  "SINK": [
      "DAS",
      "WASCHBECKEN",
      "WASCHBECKEN"
  ],
  "RETURN": [
      "DIE",
      "RÜCKKEHR",
      "RENDITEN"
  ],
  "BREEZE": [
      "DIE",
      "BRISE",
      "LÜFTE"
  ],
  "TASTE": [
      "DER",
      "GESCHMACK",
      "GESCHMÄCKER"
  ],
  "FAULT": [
      "DER",
      "FEHLER",
      "FEHLER"
  ],
  "STREAM": [
      "DER",
      "STROM",
      "STRÖME"
  ],
  "RESULT": [
      "DAS",
      "ERGEBNIS",
      "ERGEBNISSE"
  ],
  "AUTHOR": [
      "DER",
      "AUTOR",
      "AUTOREN"
  ],
  "TIP": [
      "DAS",
      "TRINKGELD",
      "SPITZEN"
  ],
  "SHOWER": [
      "DIE",
      "DUSCHE",
      "DUSCHEN"
  ],
  "TOE": [
      "DIE",
      "ZEHE",
      "ZEHEN"
  ],
  "SEASON": [
      "DIE",
      "JAHRESZEIT",
      "JAHRESZEITEN"
  ],
  "HALF": [
      "DIE",
      "HÄLFTE",
      "HÄLFTEN"
  ],
  "FOOL": [
      "DER",
      "DUMMKOPF",
      "NARREN"
  ],
  "TUNNEL": [
      "DER",
      "TUNNEL",
      "TUNNEL"
  ],
  "CLIENT": [
      "DER",
      "KLIENT",
      "CLIENTS"
  ],
  "GARAGE": [
      "DIE",
      "GARAGE",
      "GARAGEN"
  ],
  "MISSION": [
      "DIE",
      "MISSION",
      "MISSIONEN"
  ],
  "CHIEF": [
      "DER",
      "CHEF",
      "HÄUPTLINGE"
  ],
  "BULLET": [
      "DIE",
      "KUGEL",
      "KUGELN"
  ],
  "MARKET": [
      "DER",
      "MARKT",
      "MÄRKTE"
  ],
  "LOSS": [
      "DER",
      "VERLUST",
      "VERLUSTE"
  ],
  "SERIES": [
      "DIE",
      "REIHE",
      "REIHEN"
  ],
  "PEN": [
      "DER",
      "STIFT",
      "STIFTE"
  ],
  "TERM": [
      "DER",
      "BEGRIFF",
      "BEGRIFFE"
  ],
  "POEM": [
      "DAS",
      "GEDICHT",
      "GEDICHTE"
  ],
  "PRINCE": [
      "DER",
      "PRINZ",
      "PRINZEN"
  ],
  "CLAY": [
      "DER",
      "TON",
      "TÖNE"
  ],
  "LOCK": [
      "DAS",
      "SCHLOSS",
      "SCHLÖSSER"
  ],
  "REALITY": [
      "DIE",
      "REALITÄT",
      "WIRKLICHKEITEN"
  ],
  "SNAKE": [
      "DIE",
      "SCHLANGE",
      "SCHLANGEN"
  ],
  "APPLE": [
      "DER",
      "APFEL",
      "ÄPFEL"
  ],
  "MASK": [
      "DIE",
      "MASKE",
      "MASKEN"
  ],
  "CUSTOMER": [
      "DAS",
      "KUNDEN",
      "KUNDEN"
  ],
  "BIRTH": [
      "DIE",
      "GEBURT",
      "GEBURTEN"
  ],
  "BREAK": [
      "DIE",
      "PAUSE",
      "PAUSEN"
  ],
  "WONDER": [
      "DAS",
      "WUNDER",
      "WUNDER"
  ],
  "SUNLIGHT": [
      "DAS",
      "SONNENLICHT",
      "SUNLIGHTS"
  ],
  "TANK": [
      "DER",
      "PANZER",
      "TANKS"
  ],
  "STAFF": [
      "DAS",
      "PERSONAL",
      "MITARBEITER"
  ],
  "LIE": [
      "DIE",
      "LÜGE",
      "LÜGEN"
  ],
  "FAITH": [
      "DER",
      "GLAUBE",
      "GLAUBENSRICHTUNGEN"
  ],
  "HONOR": [
      "DIE",
      "EHRE",
      "EHREN"
  ],
  "CREAM": [
      "DIE",
      "CREME",
      "CREMES"
  ],
  "SAKE": [
      "DAS",
      "WOHL",
      "WILLEN"
  ],
  "VICTIM": [
      "DAS",
      "OPFER",
      "OPFER"
  ],
  "POSSIBILITY": [
      "DIE",
      "MÖGLICHKEIT",
      "MÖGLICHKEITEN"
  ],
  "CONTACT": [
      "DER",
      "KONTAKT",
      "KONTAKTE"
  ],
  "MOOD": [
      "DIE",
      "STIMMUNG",
      "STIMMUNG"
  ],
  "THUMB": [
      "DER",
      "DAUMEN",
      "DAUMEN"
  ],
  "READING": [
      "DAS",
      "LESEN",
      "MESSWERTE"
  ],
  "FUN": [
      "DER",
      "SPASS",
      "FUNS"
  ],
  "CANDLE": [
      "DIE",
      "KERZE",
      "KERZEN"
  ],
  "CAVE": [
      "DIE",
      "HÖHLE",
      "HÖHLEN"
  ],
  "POST": [
      "DIE",
      "POST",
      "PFOSTEN"
  ],
  "PRISON": [
      "DAS",
      "GEFÄNGNIS",
      "GEFÄNGNISSE"
  ],
  "EMOTION": [
      "DIE",
      "EMOTION",
      "EMOTIONEN"
  ],
  "LEADER": [
      "DER",
      "FÜHRER",
      "FÜHRER"
  ],
  "DEGREE": [
      "DER",
      "GRAD",
      "GRADE"
  ],
  "FEATURE": [
      "DIE",
      "EIGENSCHAFT",
      "EIGENSCHAFTEN"
  ],
  "TICKET": [
      "DAS",
      "TICKET",
      "TICKETS"
  ],
  "ALIEN": [
      "DAS",
      "ALIEN",
      "ALIENS"
  ],
  "LESSON": [
      "DER",
      "UNTERRICHT",
      "STUNDEN"
  ],
  "DESERT": [
      "DIE",
      "WÜSTE",
      "WÜSTEN"
  ],
  "CUT": [
      "DER",
      "SCHNITT",
      "SCHNITTE"
  ],
  "MESS": [
      "DIE",
      "UNORDNUNG",
      "KASINOS"
  ],
  "WARNING": [
      "DIE",
      "WARNUNG",
      "WARNUNGEN"
  ],
  "TALE": [
      "DAS",
      "MÄRCHEN",
      "MÄRCHEN"
  ],
  "FUNERAL": [
      "DAS",
      "BEGRÄBNIS",
      "BEERDIGUNGEN"
  ],
  "CAB": [
      "DAS",
      "TAXI",
      "TAXIS"
  ],
  "REPORTER": [
      "DER",
      "REPORTER",
      "REPORTER"
  ],
  "PRESENT": [
      "DAS",
      "GESCHENK",
      "GESCHENKE"
  ],
  "THEATER": [
      "DAS",
      "THEATER",
      "THEATER"
  ],
  "LENGTH": [
      "DIE",
      "LÄNGE",
      "LÄNGEN"
  ],
  "MUD": [
      "DER",
      "SCHLAMM",
      "SCHLÄMME"
  ],
  "SCIENCE": [
      "DIE",
      "WISSENSCHAFT",
      "WISSENSCHAFTEN"
  ],
  "DROP": [
      "DER",
      "FALL",
      "FÄLLE"
  ],
  "STRING": [
      "DIE",
      "SCHNUR",
      "STREICHER"
  ],
  "SPEECH": [
      "DIE",
      "REDE",
      "REDEN"
  ],
  "COPY": [
      "DIE",
      "KOPIE",
      "KOPIEN"
  ],
  "COW": [
      "DIE",
      "KUH",
      "KÜHE"
  ],
  "WORKER": [
      "DER",
      "ARBEITER",
      "ARBEITER"
  ],
  "THIGH": [
      "DER",
      "OBERSCHENKEL",
      "THIGHES"
  ],
  "LAB": [
      "DAS",
      "LABOR",
      "LABORE"
  ],
  "ROLL": [
      "DIE",
      "ROLLE",
      "WALZEN"
  ],
  "FRUIT": [
      "DAS",
      "OBST",
      "FRÜCHTE"
  ],
  "PATCH": [
      "DER",
      "PATCH",
      "PATCHES"
  ],
  "SILK": [
      "DIE",
      "SEIDE",
      "SEIDE"
  ],
  "BUCK": [
      "DER",
      "BUCK",
      "BÖCKE"
  ],
  "BRICK": [
      "DIE",
      "ZIEGEL",
      "ZIEGEL"
  ],
  "RIFLE": [
      "DAS",
      "GEWEHR",
      "GEWEHRE"
  ],
  "CAREER": [
      "DIE",
      "KARRIERE",
      "KARRIEREN"
  ],
  "ISSUE": [
      "DAS",
      "THEMA",
      "THEMEN"
  ],
  "OPPORTUNITY": [
      "DIE",
      "GELEGENHEIT",
      "GELEGENHEITEN"
  ],
  "DIRECTOR": [
      "DER",
      "DIREKTOR",
      "DIREKTOREN"
  ],
  "MONSTER": [
      "DAS",
      "MONSTER",
      "MONSTER"
  ],
  "VEHICLE": [
      "DAS",
      "FAHRZEUG",
      "FAHRZEUGE"
  ],
  "ALLEY": [
      "DIE",
      "GASSE",
      "GASSEN"
  ],
  "SLEEVE": [
      "DIE",
      "HÜLSE",
      "ÄRMEL"
  ],
  "GRAVE": [
      "DAS",
      "GRAB",
      "GRÄBERN"
  ],
  "BUSH": [
      "DER",
      "BUSCH",
      "BÜSCHE"
  ],
  "DINING": [
      "DER",
      "SPEISESAAL",
      "DININGS"
  ],
  "OPENING": [
      "DIE",
      "ERÖFFNUNG",
      "ERÖFFNUNGEN"
  ],
  "TWIN": [
      "DER",
      "ZWILLING",
      "ZWILLINGE"
  ],
  "BARN": [
      "DIE",
      "SCHEUNE",
      "SCHEUNEN"
  ],
  "POUND": [
      "DAS",
      "PFUND",
      "PFUNDE"
  ],
  "SITE": [
      "DER",
      "STANDORT",
      "WEBSITES"
  ],
  "FLASH": [
      "DER",
      "BLITZ",
      "BLITZE"
  ],
  "JUDGE": [
      "DER",
      "RICHTER",
      "RICHTER"
  ],
  "MASS": [
      "DIE",
      "MASSE",
      "MASSEN"
  ],
  "PROCESS": [
      "DER",
      "PROZESS",
      "PROZESSE"
  ],
  "TIE": [
      "DAS",
      "BAND",
      "BANDE"
  ],
  "PURSE": [
      "DER",
      "GELDBEUTEL",
      "GELDBEUTEL"
  ],
  "PIPE": [
      "DAS",
      "ROHR",
      "RÖHREN"
  ],
  "DRAGON": [
      "DER",
      "DRACHE",
      "DRACHEN"
  ],
  "HORIZON": [
      "DER",
      "HORIZONT",
      "HORIZONTE"
  ],
  "TRAY": [
      "DIE",
      "SCHALE",
      "SCHALEN"
  ],
  "ENVELOPE": [
      "DER",
      "UMSCHLAG",
      "UMSCHLÄGE"
  ],
  "CHECK": [
      "DIE",
      "PRÜFUNG",
      "PRÜFUNGEN"
  ],
  "ADULT": [
      "DIE",
      "ERWACHSENE",
      "ERWACHSENEN"
  ],
  "EMERGENCY": [
      "DER",
      "NOTFALL",
      "EMERGENCYS"
  ],
  "MATERIAL": [
      "DAS",
      "MATERIAL",
      "MATERIALIEN"
  ],
  "CHILDHOOD": [
      "DIE",
      "KINDHEIT",
      "KINDHEIT"
  ],
  "HABIT": [
      "DIE",
      "ANGEWOHNHEIT",
      "GEWOHNHEITEN"
  ],
  "ARTIST": [
      "DER",
      "KÜNSTLER",
      "ARTISTEN"
  ],
  "ADDRESS": [
      "DIE",
      "ADRESSE",
      "ADRESSEN"
  ],
  "SCENT": [
      "DER",
      "DUFT",
      "DÜFTE"
  ],
  "UNIVERSE": [
      "DAS",
      "UNIVERSUM",
      "UNIVERSEN"
  ],
  "NOD": [
      "DAS",
      "KOPFNICKEN",
      "NICKT"
  ],
  "SHELL": [
      "DIE",
      "MUSCHEL",
      "SCHALEN"
  ],
  "COMMUNITY": [
      "DIE",
      "GEMEINDE",
      "GEMEINDEN"
  ],
  "START": [
      "DER",
      "ANFANG",
      "ANFÄNGE"
  ],
  "WOUND": [
      "DIE",
      "WUNDE",
      "WUNDEN"
  ],
  "MOUSE": [
      "DIE",
      "MAUS",
      "MÄUSE"
  ],
  "PILOT": [
      "DER",
      "PILOT",
      "PILOTEN"
  ],
  "GRADE": [
      "DIE",
      "KLASSE",
      "KLASSEN"
  ],
  "VIDEO": [
      "DAS",
      "VIDEO",
      "VIDEOS"
  ],
  "BASKET": [
      "DER",
      "KORB",
      "KÖRBE"
  ],
  "WAGON": [
      "DER",
      "WAGEN",
      "WAGEN"
  ],
  "ATTEMPT": [
      "DER",
      "VERSUCH",
      "VERSUCHE"
  ],
  "SOFA": [
      "DAS",
      "SOFA",
      "SOFAS"
  ],
  "CAKE": [
      "DER",
      "KUCHEN",
      "KUCHEN"
  ],
  "FELLOW": [
      "DER",
      "KERL",
      "KERLE"
  ],
  "AFFAIR": [
      "DIE",
      "AFFÄRE",
      "ANGELEGENHEITEN"
  ],
  "SHORE": [
      "DIE",
      "KÜSTE",
      "KÜSTEN"
  ],
  "GENERAL": [
      "DIE",
      "ALLGEMEINE",
      "GENERÄLE"
  ],
  "ROOT": [
      "DER",
      "URSPRUNG",
      "URSPRÜNGE"
  ],
  "ROBE": [
      "DIE",
      "ROBE",
      "GEWÄNDER"
  ],
  "CONCERN": [
      "DIE",
      "SORGE",
      "SORGEN"
  ],
  "PRESS": [
      "DIE",
      "PRESSE",
      "PRESSEN"
  ],
  "RAT": [
      "DIE",
      "RATTE",
      "RATTEN"
  ],
  "SOCIETY": [
      "DIE",
      "GESELLSCHAFT",
      "GESELLSCHAFTEN"
  ],
  "STYLE": [
      "DER",
      "STIL",
      "STILE"
  ],
  "COUNTY": [
      "DIE",
      "KREIS",
      "KREISE"
  ],
  "COMMAND": [
      "DER",
      "BEFEHL",
      "BEFEHLE"
  ],
  "VISITOR": [
      "DER",
      "BESUCHER",
      "BESUCHER"
  ],
  "MODEL": [
      "DAS",
      "MODEL",
      "MODELLE"
  ],
  "CHAMBER": [
      "DIE",
      "KAMMER",
      "KAMMERN"
  ],
  "BEAST": [
      "DAS",
      "BIEST",
      "TIERE"
  ],
  "BUNCH": [
      "DAS",
      "BÜNDEL",
      "TRAUBEN"
  ],
  "BACKGROUND": [
      "DER",
      "HINTERGRUND",
      "HINTERGRÜNDE"
  ],
  "UNIT": [
      "DIE",
      "EINHEIT",
      "EINHEITEN"
  ],
  "FURNITURE": [
      "DIE",
      "MÖBEL",
      "MÖBEL"
  ],
  "NAIL": [
      "DER",
      "NAGEL",
      "NÄGEL"
  ],
  "SCREAM": [
      "DER",
      "SCHREI",
      "SCHREIE"
  ],
  "PROPERTY": [
      "DIE",
      "EIGENSCHAFT",
      "EIGENSCHAFTEN"
  ],
  "EQUIPMENT": [
      "DIE",
      "AUSRÜSTUNG",
      "AUSRÜSTUNGEN"
  ],
  "DRIVEWAY": [
      "DIE",
      "AUFFAHRT",
      "EINFAHRTEN"
  ],
  "GRIP": [
      "DER",
      "GRIFF",
      "GRIFFE"
  ],
  "TUBE": [
      "DAS",
      "ROHR",
      "RÖHREN"
  ],
  "ASH": [
      "DIE",
      "ASCHE",
      "ASCHE"
  ],
  "FAN": [
      "DER",
      "FAN",
      "FANS"
  ],
  "OPINION": [
      "DIE",
      "MEINUNG",
      "MEINUNGEN"
  ],
  "DATA": [
      "DIE",
      "DATEN",
      "DATEN"
  ],
  "CONNECTION": [
      "DIE",
      "VERBINDUNG",
      "VERBINDUNGEN"
  ],
  "TRICK": [
      "DER",
      "TRICK",
      "TRICKS"
  ],
  "MYSTERY": [
      "DAS",
      "MYSTERIUM",
      "GEHEIMNISSE"
  ],
  "PERIOD": [
      "DIE",
      "PERIODE",
      "PERIODEN"
  ],
  "WRITING": [
      "DAS",
      "SCHREIBEN",
      "SCHRIFTEN"
  ],
  "HORROR": [
      "DER",
      "HORROR",
      "SCHRECKEN"
  ],
  "CANDY": [
      "DIE",
      "SÜSSIGKEIT",
      "BONBONS"
  ],
  "BITCH": [
      "DIE",
      "BITCH",
      "HÜNDINNEN"
  ],
  "HEALTH": [
      "DIE",
      "GESUNDHEIT",
      "HEALTHS"
  ],
  "MANAGER": [
      "DER",
      "GESCHÄFTSFÜHRER",
      "MANAGER"
  ],
  "SAFETY": [
      "DIE",
      "SICHERHEIT",
      "SICHERHEITEN"
  ],
  "HEIGHT": [
      "DIE",
      "HÖHE",
      "HÖHEN"
  ],
  "APPEARANCE": [
      "DIE",
      "ERSCHEINUNG",
      "ERSCHEINUNGEN"
  ],
  "SIGH": [
      "DER",
      "SEUFZER",
      "SIGHES"
  ],
  "MINE": [
      "DIE",
      "MINE",
      "BERGWERKE"
  ],
  "CLOTH": [
      "DIE",
      "KLEIDUNG",
      "TÜCHER"
  ],
  "REACTION": [
      "DIE",
      "REAKTION",
      "REAKTIONEN"
  ],
  "SOURCE": [
      "DIE",
      "QUELLE",
      "QUELLEN"
  ],
  "SELF": [
      "DAS",
      "ICH",
      "SELFS"
  ],
  "PISTOL": [
      "DIE",
      "PISTOLE",
      "PISTOLEN"
  ],
  "AIRPORT": [
      "DER",
      "FLUGHAFEN",
      "FLUGHÄFEN"
  ],
  "HERO": [
      "DER",
      "HELD",
      "HELDEN"
  ],
  "PROMISE": [
      "DAS",
      "VERSPRECHEN",
      "VERSPRECHEN"
  ],
  "BOW": [
      "DER",
      "BOGEN",
      "BÖGEN"
  ],
  "TENT": [
      "DAS",
      "ZELT",
      "ZELTE"
  ],
  "BOOTH": [
      "DER",
      "MESSESTAND",
      "STÄNDE"
  ],
  "CASH": [
      "DAS",
      "GELD",
      "GELDER"
  ],
  "AVENUE": [
      "DIE",
      "STRASSE",
      "ALLEEN"
  ],
  "TSHIRT": [
      "DAS",
      "TSHIRT",
      "TSHIRTS"
  ],
  "CARPET": [
      "DER",
      "TEPPICH",
      "TEPPICHE"
  ],
  "BASEMENT": [
      "DER",
      "KELLER",
      "KELLER"
  ],
  "GIRLFRIEND": [
      "DIE",
      "FREUNDIN",
      "FREUNDINNEN"
  ],
  "BEARD": [
      "DER",
      "BART",
      "BÄRTE"
  ],
  "BROW": [
      "DIE",
      "STIRN",
      "STIRNEN"
  ],
  "DISPLAY": [
      "DER",
      "BILDSCHIRM",
      "ANZEIGEN"
  ],
  "SIGNAL": [
      "DAS",
      "SIGNAL",
      "SIGNALE"
  ],
  "SERVANT": [
      "DER",
      "DIENER",
      "DIENER"
  ],
  "WHISPER": [
      "DAS",
      "FLÜSTERN",
      "DAS+FLÜSTERN"
  ],
  "DOUBT": [
      "DER",
      "ZWEIFEL",
      "ZWEIFEL"
  ],
  "ACCOUNT": [
      "DAS",
      "KONTO",
      "ACCOUNTS"
  ],
  "MAGIC": [
      "DIE",
      "MAGIE",
      "MAGIE"
  ],
  "HANK": [
      "DIE",
      "HANK",
      "STRÄNGE"
  ],
  "LIMB": [
      "DAS",
      "GLIED",
      "GLIEDER"
  ],
  "BASTARD": [
      "DER",
      "BASTARD",
      "BASTARDE"
  ],
  "SKULL": [
      "DER",
      "SCHÄDEL",
      "SCHÄDEL"
  ],
  "SENTENCE": [
      "DER",
      "SATZ",
      "SÄTZE"
  ],
  "COLLAR": [
      "DER",
      "KRAGEN",
      "KRAGEN"
  ],
  "HORN": [
      "DAS",
      "HORN",
      "HÖRNER"
  ],
  "OAK": [
      "DIE",
      "EICHE",
      "EICHEN"
  ],
  "ANKLE": [
      "DER",
      "KNÖCHEL",
      "KNÖCHEL"
  ],
  "DOLL": [
      "DIE",
      "PUPPE",
      "PUPPEN"
  ],
  "SANDWICH": [
      "DAS",
      "SANDWICH",
      "SANDWICHES"
  ],
  "ROBIN": [
      "DAS",
      "ROTKEHLCHEN",
      "ROTKEHLCHEN"
  ],
  "JUSTICE": [
      "DIE",
      "JUSTIZ",
      "RICHTER"
  ],
  "PRIDE": [
      "DER",
      "STOLZ",
      "RUDEL"
  ],
  "YOUTH": [
      "DIE",
      "JUGEND",
      "JUGENDLICHEN"
  ],
  "SECRETARY": [
      "DER",
      "SEKRETÄR",
      "SEKRETÄRE"
  ],
  "RESEARCH": [
      "DIE",
      "FORSCHUNG",
      "FORSCHUNGEN"
  ],
  "SPORT": [
      "DER",
      "SPORT",
      "SPORT"
  ],
  "TASK": [
      "DIE",
      "AUFGABE",
      "AUFGABEN"
  ],
  "GRANT": [
      "DER",
      "ZUSCHUSS",
      "ZUSCHÜSSE"
  ],
  "SHERIFF": [
      "DER",
      "SHERIFF",
      "SHERIFFS"
  ],
  "MIDNIGHT": [
      "DIE",
      "MITTERNACHTS",
      "MITTERNÄCHTE"
  ],
  "CHIP": [
      "DER",
      "CHIP",
      "CHIPS"
  ],
  "THEORY": [
      "DIE",
      "THEORIE",
      "THEORIE"
  ],
  "ALARM": [
      "DER",
      "WECKER",
      "ALARME"
  ],
  "COLLECTION": [
      "DIE",
      "SAMMLUNG",
      "SAMMLUNGEN"
  ],
  "CROSS": [
      "DAS",
      "KREUZ",
      "KREUZE"
  ],
  "PINE": [
      "DIE",
      "KIEFER",
      "KIEFERN"
  ],
  "GENERATION": [
      "DIE",
      "GENERATION",
      "GENERATIONEN"
  ],
  "AUTHORITY": [
      "DIE",
      "AUTORITÄT",
      "BEHÖRDEN"
  ],
  "PAPA": [
      "DIE",
      "PAPA",
      "PAPAS"
  ],
  "JOURNEY": [
      "DIE",
      "REISE",
      "REISEN"
  ],
  "PEARL": [
      "DIE",
      "PERLE",
      "PERLEN"
  ],
  "TOILET": [
      "DIE",
      "TOILETTE",
      "TOILETTEN"
  ],
  "KILLER": [
      "DER",
      "MÖRDER",
      "MÖRDER"
  ],
  "TOOL": [
      "DAS",
      "WERKZEUG",
      "WERKZEUGE"
  ],
  "MEDICINE": [
      "DIE",
      "MEDIZIN",
      "MEDIKAMENTE"
  ],
  "SUGAR": [
      "DER",
      "ZUCKER",
      "ZUCKER"
  ],
  "PRINCESS": [
      "DIE",
      "PRINZESSIN",
      "PRINZESSINNEN"
  ],
  "ARGUMENT": [
      "DAS",
      "ARGUMENT",
      "ARGUMENTE"
  ],
  "CLIFF": [
      "DIE",
      "KLIPPE",
      "KLIPPEN"
  ],
  "CART": [
      "DER",
      "WAGEN",
      "WAGEN"
  ],
  "CRYSTAL": [
      "DER",
      "KRISTALL",
      "KRISTALLE"
  ],
  "BEAN": [
      "DIE",
      "BOHNE",
      "BOHNEN"
  ],
  "CAGE": [
      "DER",
      "KÄFIG",
      "KÄFIGE"
  ],
  "CHOCOLATE": [
      "DIE",
      "SCHOKOLADE",
      "PRALINEN"
  ],
  "COAST": [
      "DIE",
      "KÜSTE",
      "KÜSTEN"
  ],
  "DECADE": [
      "DAS",
      "JAHRZEHNT",
      "JAHRZEHNTE"
  ],
  "MEANING": [
      "DIE",
      "BEDEUTUNG",
      "BEDEUTUNGEN"
  ],
  "GEAR": [
      "DAS",
      "GETRIEBE",
      "ZAHNRÄDER"
  ],
  "SUITCASE": [
      "DER",
      "KOFFER",
      "KOFFER"
  ],
  "OPERATION": [
      "DIE",
      "OPERATION",
      "OPERATIONEN"
  ],
  "BREATHING": [
      "DAS",
      "ATEM",
      "BREATHINGS"
  ],
  "ROLE": [
      "DIE",
      "ROLLE",
      "ROLLEN"
  ],
  "VERSION": [
      "DIE",
      "VERSION",
      "FASSUNGEN"
  ],
  "PRISONER": [
      "DER",
      "GEFANGENE",
      "GEFANGENEN"
  ],
  "MATCH": [
      "DAS",
      "MATCH",
      "SPIELE"
  ],
  "BEAM": [
      "DER",
      "STRAHL",
      "STRAHLEN"
  ],
  "CASTLE": [
      "DIE",
      "BURG",
      "BURGEN"
  ],
  "RUSH": [
      "DER",
      "ANSTURM",
      "BINSEN"
  ],
  "LANE": [
      "DIE",
      "FAHRSPUR",
      "BAHNEN"
  ],
  "CLOTHING": [
      "DIE",
      "BEKLEIDUNG",
      "GARNITUREN"
  ],
  "POLE": [
      "DER",
      "POL",
      "POLE"
  ],
  "FREEDOM": [
      "DIE",
      "FREIHEIT",
      "FREIHEITEN"
  ],
  "SKILL": [
      "DAS",
      "KÖNNEN",
      "FÄHIGKEITEN"
  ],
  "PASSION": [
      "DIE",
      "LEIDENSCHAFT",
      "LEIDENSCHAFTEN"
  ],
  "ACTIVITY": [
      "DIE",
      "AKTIVITÄT",
      "AKTIVITÄTEN"
  ],
  "FUCK": [
      "DER",
      "TEUFEL",
      "FICKT"
  ],
  "PLATFORM": [
      "DIE",
      "PLATFORM",
      "PLATTFORMEN"
  ],
  "SALT": [
      "DAS",
      "SALZ",
      "SALZE"
  ],
  "BIKE": [
      "DAS",
      "FAHRRAD",
      "FAHRRÄDER"
  ],
  "STACK": [
      "DER",
      "STAPEL",
      "STAPEL"
  ],
  "COMPANION": [
      "DER",
      "BEGLEITER",
      "GEFÄHRTEN"
  ],
  "FATE": [
      "DAS",
      "SCHICKSAL",
      "SCHICKSALE"
  ],
  "RAGE": [
      "DIE",
      "WUT",
      "WÜTET"
  ],
  "SUPPLY": [
      "DIE",
      "VERSORGUNG",
      "LIEFERUNGEN"
  ],
  "WHALE": [
      "DER",
      "WAL",
      "WALE"
  ],
  "PIG": [
      "DAS",
      "SCHWEIN",
      "SCHWEINE"
  ],
  "RABBIT": [
      "DER",
      "HASE",
      "HASEN"
  ],
  "AISLE": [
      "DER",
      "GANG",
      "GÄNGE"
  ],
  "MONITOR": [
      "DER",
      "BILDSCHIRM",
      "MONITORE"
  ],
  "HELMET": [
      "DER",
      "HELM",
      "HELME"
  ],
  "RESPECT": [
      "DER",
      "RESPEKT",
      "BEZIEHUNG"
  ],
  "EXCITEMENT": [
      "DIE",
      "AUFREGUNG",
      "AUFREGUNGEN"
  ],
  "LOBBY": [
      "DIE",
      "LOBBY",
      "LOBBYS"
  ],
  "BOYFRIEND": [
      "DER",
      "FREUND",
      "FREUNDE"
  ],
  "FUR": [
      "DAS",
      "FELL",
      "FELLE"
  ],
  "RANGE": [
      "DER",
      "BEREICH",
      "BEREICHE"
  ],
  "DICK": [
      "DIE",
      "DICK",
      "SCHWÄNZE"
  ],
  "CODE": [
      "DER",
      "CODE",
      "CODES"
  ],
  "CHAPTER": [
      "DAS",
      "KAPITEL",
      "KAPITEL"
  ],
  "REFLECTION": [
      "DIE",
      "REFLEXION",
      "REFLEXIONEN"
  ],
  "MAIL": [
      "DIE",
      "POST",
      "EMAILS"
  ],
  "FLY": [
      "DER",
      "FLUG",
      "FLÜGE"
  ],
  "CABINET": [
      "DAS",
      "KABINETT",
      "SCHRÄNKE"
  ],
  "TOY": [
      "DAS",
      "SPIELZEUG",
      "SPIELZEUGE"
  ],
  "BASEBALL": [
      "DIE",
      "BASEBALL",
      "DAS+BASEBALLS"
  ],
  "INSIDE": [
      "DAS",
      "INNERE",
      "INNENSEITEN"
  ],
  "PACE": [
      "DIE",
      "GESCHWINDIGKEIT",
      "GESCHWINDIGKEITEN"
  ],
  "HANDLE": [
      "DER",
      "GRIFF",
      "GRIFFE"
  ],
  "LEAD": [
      "DIE",
      "FÜHRUNG",
      "ZULEITUNGEN"
  ],
  "AMOUNT": [
      "DIE",
      "SUMME",
      "SUMMEN"
  ],
  "NERVE": [
      "DER",
      "NERV",
      "NERVEN"
  ],
  "TERROR": [
      "DER",
      "SCHRECKEN",
      "SCHRECKEN"
  ],
  "SWEATER": [
      "DER",
      "PULLOVER",
      "PULLOVER"
  ],
  "QUALITY": [
      "DIE",
      "QUALITÄT",
      "QUALITÄTEN"
  ],
  "HUNTER": [
      "DER",
      "JÄGER",
      "JÄGER"
  ],
  "PAINT": [
      "DIE",
      "FARBE",
      "ANSTRICHE"
  ],
  "BUSTER": [
      "DIE",
      "BUSTER",
      "DAS+BUSTERS"
  ],
  "COTTON": [
      "DIE",
      "BAUMWOLLE",
      "BAUMWOLLSTOFFE"
  ],
  "SERGEANT": [
      "DER",
      "WACHTMEISTER",
      "FELDWEBEL"
  ],
  "CREDIT": [
      "DER",
      "KREDIT",
      "KREDITE"
  ],
  "BLOW": [
      "DER",
      "SCHLAG",
      "SCHLÄGE"
  ],
  "DEVIL": [
      "DER",
      "TEUFEL",
      "TEUFEL"
  ],
  "THREAT": [
      "DIE",
      "BEDROHUNG",
      "DROHUNGEN"
  ],
  "SUCCESS": [
      "DER",
      "ERFOLG",
      "ERFOLGE"
  ],
  "EVE": [
      "DIE",
      "VORABEND",
      "EVES"
  ],
  "CABLE": [
      "DAS",
      "KABEL",
      "KABEL"
  ],
  "PAN": [
      "DIE",
      "PFANNE",
      "PFANNEN"
  ],
  "CLERK": [
      "DER",
      "ANGESTELLTE",
      "SCHREIBER"
  ],
  "TITLE": [
      "DER",
      "TITEL",
      "TITEL"
  ],
  "METER": [
      "DAS",
      "MESSGERÄT",
      "ZÄHLER"
  ],
  "SHAME": [
      "DIE",
      "SCHANDE",
      "SCHANDE"
  ],
  "NEEDLE": [
      "DIE",
      "NADEL",
      "NADELN"
  ],
  "LUNG": [
      "DIE",
      "LUNGE",
      "LUNGEN"
  ],
  "WARRIOR": [
      "DER",
      "KRIEGER",
      "KRIEGER"
  ],
  "CIRCUMSTANCE": [
      "DER",
      "UMSTAND",
      "UMSTÄNDE"
  ],
  "STUDIO": [
      "DAS",
      "STUDIO",
      "STUDIOS"
  ],
  "PANIC": [
      "DIE",
      "PANIK",
      "PANIK"
  ],
  "LACK": [
      "DER",
      "MANGEL",
      "MÄNGEL"
  ],
  "FARMER": [
      "DER",
      "BAUER",
      "BAUERN"
  ],
  "ACCENT": [
      "DER",
      "AKZENT",
      "AKZENTE"
  ],
  "BOMB": [
      "DIE",
      "BOMBE",
      "BOMBEN"
  ],
  "PANEL": [
      "DIE",
      "PLATTE",
      "PANEELE"
  ],
  "ABILITY": [
      "DIE",
      "FÄHIGKEIT",
      "FÄHIGKEITEN"
  ],
  "FORTUNE": [
      "DAS",
      "GLÜCK",
      "GESCHICKE"
  ],
  "VICTOR": [
      "DER",
      "SIEGER",
      "SIEGER"
  ],
  "FEATHER": [
      "DIE",
      "FEDER",
      "FEDERN"
  ],
  "GRANDMA": [
      "DIE",
      "OMA",
      "GROSSMÜTTER"
  ],
  "GLOW": [
      "DAS",
      "GLÜHEN",
      "GLÜHT"
  ],
  "BEHAVIOR": [
      "DAS",
      "VERHALTEN",
      "VERHALTENSWEISEN"
  ],
  "PASSAGE": [
      "DER",
      "DURCHGANG",
      "DURCHGÄNGE"
  ],
  "SLAVE": [
      "DIE",
      "SLAVE",
      "SKLAVEN"
  ],
  "LIEUTENANT": [
      "DER",
      "LEUTNANT",
      "LEUTNANTS"
  ],
  "BARREL": [
      "DER",
      "LAUF",
      "FÄSSER"
  ],
  "WARMTH": [
      "DIE",
      "WÄRME",
      "WARMTHS"
  ],
  "IMPRESSION": [
      "DER",
      "EINDRUCK",
      "EINDRÜCKE"
  ],
  "MASON": [
      "DER",
      "MAURER",
      "MAURER"
  ],
  "BRIDE": [
      "DIE",
      "BRAUT",
      "BRÄUTE"
  ],
  "PACKAGE": [
      "DAS",
      "PAKET",
      "PAKETE"
  ],
  "FOG": [
      "DER",
      "NEBEL",
      "NEBEL"
  ],
  "WALKING": [
      "DAS",
      "GEHEN",
      "WANDERUNGEN"
  ],
  "BALANCE": [
      "DIE",
      "BALANCE",
      "BALANCEN"
  ],
  "SOCK": [
      "DIE",
      "SOCKE",
      "SOCKEN"
  ],
  "ROBOT": [
      "DER",
      "ROBOTER",
      "ROBOTER"
  ],
  "POTATO": [
      "DIE",
      "KARTOFFEL",
      "KARTOFFELN"
  ],
  "ITEM": [
      "DER",
      "GEGENSTAND",
      "GEGENSTÄNDE"
  ],
  "BATH": [
      "DAS",
      "BAD",
      "BÄDER"
  ],
  "DIAMOND": [
      "DER",
      "DIAMANT",
      "DIAMANTEN"
  ],
  "CORPSE": [
      "DIE",
      "LEICHE",
      "LEICHEN"
  ],
  "EXPLANATION": [
      "DIE",
      "ERKLÄRUNG",
      "ERLÄUTERUNGEN"
  ],
  "STRUCTURE": [
      "DIE",
      "STRUKTUR",
      "STRUKTUREN"
  ],
  "EXIT": [
      "DER",
      "AUSGANG",
      "AUSGÄNGE"
  ],
  "PAD": [
      "DAS",
      "PAD",
      "PADS"
  ],
  "STOVE": [
      "DER",
      "HERD",
      "HERDE"
  ],
  "BLUE": [
      "DAS",
      "BLAUE",
      "DER+BLUES"
  ],
  "AMERICAN": [
      "DIE",
      "AMERIKANER",
      "AMERIKANER"
  ],
  "RUBY": [
      "DER",
      "RUBIN",
      "RUBINEN"
  ],
  "LIGHTNING": [
      "DER",
      "BLITZ",
      "BLITZE"
  ],
  "PIT": [
      "DIE",
      "GRUBE",
      "GRUBEN"
  ],
  "COLONEL": [
      "DER",
      "OBERST",
      "OBERSTEN"
  ],
  "DOCK": [
      "DAS",
      "DOCK",
      "DOCKS"
  ],
  "CREEK": [
      "DER",
      "BACH",
      "BÄCHE"
  ],
  "ADVICE": [
      "DER",
      "RATSCHLAG",
      "RATSCHLÄGE"
  ],
  "TOURIST": [
      "DER",
      "TOURIST",
      "TOURISTEN"
  ],
  "GRIEF": [
      "DIE",
      "TRAUER",
      "SCHMERZEN"
  ],
  "DEFENSE": [
      "DIE",
      "VERTEIDIGUNG",
      "ABWEHRKRÄFTE"
  ],
  "BITE": [
      "DER",
      "BISS",
      "BISSE"
  ],
  "MUSEUM": [
      "DAS",
      "MUSEUM",
      "MUSEEN"
  ],
  "FAVOR": [
      "DIE",
      "GUNST",
      "WOHLTATEN"
  ],
  "SUPPER": [
      "DAS",
      "ABENDESSEN",
      "ABENDESSEN"
  ],
  "COMFORT": [
      "DER",
      "KOMFORT",
      "KOMFORT"
  ],
  "DEAN": [
      "DER",
      "DEKAN",
      "DEKANE"
  ],
  "VALUE": [
      "DER",
      "WERT",
      "WERTE"
  ],
  "MARCH": [
      "DER",
      "MARSCH",
      "MÄRSCHE"
  ],
  "ESTATE": [
      "DAS",
      "ANWESEN",
      "STÄNDE"
  ],
  "POET": [
      "DER",
      "POET",
      "DICHTER"
  ],
  "PALACE": [
      "DER",
      "PALAST",
      "PALÄSTE"
  ],
  "SOUP": [
      "DIE",
      "SUPPE",
      "SUPPEN"
  ],
  "NATION": [
      "DIE",
      "NATION",
      "NATIONEN"
  ],
  "JAR": [
      "DAS",
      "GEFÄSS",
      "GLÄSER"
  ],
  "STANDING": [
      "DER",
      "STÄNDIGE",
      "TABELLENFÜHRUNG"
  ],
  "SACK": [
      "DER",
      "SACK",
      "SÄCKE"
  ],
  "DEMON": [
      "DER",
      "DÄMON",
      "DÄMONEN"
  ],
  "CONFERENCE": [
      "DIE",
      "KONFERENZ",
      "KONFERENZEN"
  ],
  "JUICE": [
      "DER",
      "SAFT",
      "SAFTE"
  ],
  "RESPONSIBILITY": [
      "DIE",
      "VERANTWORTUNG",
      "ZUSTÄNDIGKEITEN"
  ],
  "BRUSH": [
      "DER",
      "PINSEL",
      "BÜRSTEN"
  ],
  "ROUTE": [
      "DIE",
      "ROUTE",
      "STRECKEN"
  ],
  "CHEESE": [
      "DER",
      "KÄSE",
      "KÄSE"
  ],
  "HOOD": [
      "DIE",
      "HAUBE",
      "HAUBEN"
  ],
  "DUCK": [
      "DIE",
      "ENTE",
      "ENTEN"
  ],
  "SAINT": [
      "DER",
      "HEILIGE",
      "HEILIGEN"
  ],
  "PASS": [
      "DER",
      "PASS",
      "PÄSSE"
  ],
  "TARGET": [
      "DAS",
      "ZIEL",
      "ZIELE"
  ],
  "ORANGE": [
      "DIE",
      "ORANGE",
      "ORANGEN"
  ],
  "CULTURE": [
      "DIE",
      "KULTUR",
      "KULTUREN"
  ],
  "TOUR": [
      "DIE",
      "REISE",
      "TOUREN"
  ],
  "COMMANDER": [
      "DER",
      "KOMMANDANT",
      "KOMMANDEURE"
  ],
  "HOOK": [
      "DER",
      "HAKEN",
      "HAKEN"
  ],
  "MIST": [
      "DER",
      "NEBEL",
      "NEBEL"
  ],
  "TRAINING": [
      "DAS",
      "TRAINING",
      "TRAININGS"
  ],
  "SEARCH": [
      "DIE",
      "SUCHE",
      "SUCHE"
  ],
  "COIN": [
      "DIE",
      "MÜNZE",
      "MÜNZEN"
  ],
  "MIRACLE": [
      "DAS",
      "WUNDER",
      "WUNDER"
  ],
  "ADVANTAGE": [
      "DER",
      "VORTEIL",
      "VORTEILE"
  ],
  "EXCHANGE": [
      "DER",
      "AUSTAUSCH",
      "AUSTAUSCHE"
  ],
  "FICTION": [
      "DIE",
      "FIKTION",
      "FIKTIONEN"
  ],
  "POND": [
      "DER",
      "TEICH",
      "TEICHE"
  ],
  "ASSISTANT": [
      "DER",
      "ASSISTENT",
      "ASSISTENTEN"
  ],
  "DESIGN": [
      "DAS",
      "DESIGN",
      "DESIGNS"
  ],
  "FISHING": [
      "DIE",
      "ANGEL",
      "FISHINGS"
  ],
  "SLOPE": [
      "DIE",
      "PISTE",
      "PISTEN"
  ],
  "EARL": [
      "DER",
      "GRAF",
      "GRAFEN"
  ],
  "COMMENT": [
      "DER",
      "KOMMENTAR",
      "KOMMENTARE"
  ],
  "WAITER": [
      "DER",
      "KELLNER",
      "KELLNER"
  ],
  "GROCERY": [
      "DAS",
      "LEBENSMITTEL",
      "LEBENSMITTEL"
  ],
  "LADDER": [
      "DIE",
      "LEITER",
      "LEITERN"
  ],
  "CURVE": [
      "DIE",
      "KURVE",
      "KURVEN"
  ],
  "VOLUME": [
      "DAS",
      "VOLUMEN",
      "VOLUMINA"
  ],
  "RISK": [
      "DAS",
      "RISIKO",
      "RISKEN"
  ],
  "NIGHTMARE": [
      "DER",
      "ALBTRAUM",
      "ALBTRÄUME"
  ],
  "EXISTENCE": [
      "DIE",
      "EXISTENZ",
      "EXISTENZ"
  ],
  "TRACE": [
      "DIE",
      "SPUR",
      "SPUREN"
  ],
  "DISEASE": [
      "DIE",
      "KRANKHEIT",
      "KRANKHEITEN"
  ],
  "SUPPORT": [
      "DIE",
      "UNTERSTÜTZUNG",
      "UNTERSTÜTZUNGEN"
  ],
  "WITNESS": [
      "DER",
      "ZEUGE",
      "ZEUGEN"
  ],
  "STOCK": [
      "DIE",
      "AKTIE",
      "BESTÄNDE"
  ],
  "DEVICE": [
      "DAS",
      "GERÄT",
      "GERÄTE"
  ],
  "LANDSCAPE": [
      "DIE",
      "LANDSCHAFT",
      "LANDSCHAFTEN"
  ],
  "HOLIDAY": [
      "DER",
      "URLAUB",
      "URLAUBE"
  ],
  "ACE": [
      "DAS",
      "ASS",
      "ASSE"
  ],
  "PIANO": [
      "DAS",
      "KLAVIER",
      "KLAVIERE"
  ],
  "GUT": [
      "DIE",
      "EINGEWEIDE",
      "EINGEWEIDE"
  ],
  "TALENT": [
      "DAS",
      "TALENT",
      "TALENTE"
  ],
  "IMAGINATION": [
      "DIE",
      "PHANTASIE",
      "VORSTELLUNGEN"
  ],
  "BLACK": [
      "DIE",
      "SCHWARZE",
      "SCHWARZEN"
  ],
  "REED": [
      "DER",
      "REED",
      "DAS+SCHILF"
  ],
  "LID": [
      "DER",
      "DECKEL",
      "DECKEL"
  ],
  "HINT": [
      "DER",
      "HINWEIS",
      "HINWEISE"
  ],
  "WALKER": [
      "DER",
      "WANDERER",
      "WANDERER"
  ],
  "CHILL": [
      "DIE",
      "KÄLTE",
      "SCHÜTTELFROST"
  ],
  "TRIAL": [
      "DIE",
      "STUDIE",
      "STUDIEN"
  ],
  "INTERVIEW": [
      "DAS",
      "INTERVIEW",
      "INTERVIEWS"
  ],
  "APPROACH": [
      "DER",
      "ANSATZ",
      "ANSÄTZE"
  ],
  "SCAR": [
      "DIE",
      "NARBE",
      "NARBEN"
  ],
  "FASHION": [
      "DIE",
      "MODE",
      "MODEN"
  ],
  "CHANNEL": [
      "DER",
      "KANAL",
      "KANÄLE"
  ],
  "FOOTSTEP": [
      "DIE",
      "TRITT",
      "SCHRITTE"
  ],
  "PICKUP": [
      "DER",
      "AUFNEHMER",
      "PICKUPS"
  ],
  "HAWK": [
      "DER",
      "HABICHT",
      "FALKEN"
  ],
  "TRAILER": [
      "DER",
      "ANHÄNGER",
      "ANHÄNGER"
  ],
  "STATUE": [
      "DIE",
      "STATUE",
      "STATUEN"
  ],
  "PILL": [
      "DIE",
      "PILLE",
      "PILLEN"
  ],
  "BUG": [
      "DER",
      "KÄFER",
      "BUGS"
  ],
  "BUCKET": [
      "DER",
      "EIMER",
      "EIMER"
  ],
  "VACATION": [
      "DER",
      "URLAUB",
      "URLAUBE"
  ],
  "SPECIES": [
      "DIE",
      "ARTEN",
      "SPECIESES"
  ],
  "COLUMN": [
      "DIE",
      "KOLUMNE",
      "SPALTEN"
  ],
  "DAMAGE": [
      "DER",
      "SCHADEN",
      "SCHÄDEN"
  ],
  "INSTRUMENT": [
      "DAS",
      "INSTRUMENT",
      "INSTRUMENTE"
  ],
  "PORT": [
      "DER",
      "HAFEN",
      "HÄFEN"
  ],
  "LAYER": [
      "DIE",
      "SCHICHT",
      "SCHICHTEN"
  ],
  "STRIP": [
      "DER",
      "STREIFEN",
      "STREIFEN"
  ],
  "GARBAGE": [
      "DER",
      "MÜLL",
      "GARBAGES"
  ],
  "RIB": [
      "DIE",
      "RIPPE",
      "RIPPEN"
  ],
  "NOTEBOOK": [
      "DAS",
      "NOTEBOOK",
      "NOTIZBÜCHER"
  ],
  "CORN": [
      "DER",
      "MAIS",
      "HÜHNERAUGEN"
  ],
  "OFFER": [
      "DAS",
      "ANGEBOT",
      "ANGEBOTE"
  ],
  "DRAWING": [
      "DIE",
      "ZEICHNUNG",
      "ZEICHNUNGEN"
  ],
  "STATEMENT": [
      "DIE",
      "AUSSAGE",
      "AUSSAGEN"
  ],
  "INTELLIGENCE": [
      "DIE",
      "INTELLIGENZ",
      "INTELLIGENZEN"
  ],
  "EXCUSE": [
      "DIE",
      "ENTSCHULDIGUNG",
      "AUSREDEN"
  ],
  "LANDING": [
      "DIE",
      "LANDUNG",
      "LANDUNGEN"
  ],
  "COPYRIGHT": [
      "DER",
      "URHEBERRECHTS",
      "URHEBERRECHTE"
  ],
  "ROD": [
      "DIE",
      "STANGE",
      "STÄBE"
  ],
  "FANTASY": [
      "DIE",
      "FANTASIE",
      "PHANTASIEN"
  ],
  "CURIOSITY": [
      "DIE",
      "NEUGIER",
      "KURIOSITÄTEN"
  ],
  "GOWN": [
      "DAS",
      "KLEID",
      "KLEIDER"
  ],
  "BORDER": [
      "DIE",
      "GRENZE",
      "GRENZEN"
  ],
  "POETRY": [
      "DIE",
      "POESIE",
      "DICHTUNGEN"
  ],
  "FIRM": [
      "DIE",
      "FIRMA",
      "FIRMEN"
  ],
  "RISE": [
      "DER",
      "AUFGANG",
      "DER+ANSTIEG"
  ],
  "HANDFUL": [
      "DIE",
      "HANDVOLL",
      "HÄNDE VOLL"
  ],
  "CHINA": [
      "DIE",
      "CHINA",
      "CHINAS"
  ],
  "FRENCH": [
      "DIE",
      "FRANZOSEN",
      "FRENCHES"
  ],
  "MEAN": [
      "DIE",
      "DURCHSCHNITTS",
      "MITTEL"
  ],
  "DEER": [
      "DAS",
      "REH",
      "HIRSCHE"
  ],
  "PRINT": [
      "DIE",
      "DRUCK",
      "DRUCKE"
  ],
  "RAIL": [
      "DIE",
      "SCHIENE",
      "SCHIENEN"
  ],
  "RATE": [
      "DIE",
      "RATE",
      "PREISE"
  ],
  "COURAGE": [
      "DER",
      "MUT",
      "COURAGES"
  ],
  "ARRIVAL": [
      "DIE",
      "ANKUNFT",
      "ANKÜNFTE"
  ],
  "WISH": [
      "DER",
      "WUNSCH",
      "WÜNSCHE"
  ],
  "RIDGE": [
      "DER",
      "GRAT",
      "GRATE"
  ],
  "IDIOT": [
      "DER",
      "IDIOT",
      "IDIOTEN"
  ],
  "BULL": [
      "DER",
      "BULLE",
      "BULLEN"
  ],
  "SEED": [
      "DIE",
      "SAAT",
      "SAMEN"
  ],
  "PROGRESS": [
      "DER",
      "FORTSCHRITT",
      "FORTSCHRITTE"
  ],
  "FEEL": [
      "DAS",
      "GEFÜHL",
      "GEFÜHLE"
  ],
  "SHORTS": [
      "DIE",
      "SHORTS",
      "SHORTSES"
  ],
  "CITIZEN": [
      "DER",
      "BÜRGER",
      "BÜRGER"
  ],
  "TRASH": [
      "DER",
      "MÜLL",
      "TRASHES"
  ],
  "LOG": [
      "DAS",
      "PROTOKOLL",
      "PROTOKOLLE"
  ],
  "PATIENCE": [
      "DIE",
      "GEDULD",
      "PATIENCEN"
  ],
  "BAT": [
      "DIE",
      "FLEDERMAUS",
      "FLEDERMÄUSE"
  ],
  "FOOTBALL": [
      "DER",
      "FUSSBALL",
      "FUSSBÄLLE"
  ],
  "ROUTINE": [
      "DIE",
      "ROUTINE",
      "ROUTINEN"
  ],
  "EXPLOSION": [
      "DIE",
      "EXPLOSION",
      "EXPLOSIONEN"
  ],
  "CONTENT": [
      "DER",
      "INHALT",
      "INHALTE"
  ],
  "SCIENTIST": [
      "DER",
      "WISSENSCHAFTLER",
      "WISSENSCHAFTLER"
  ],
  "FAILURE": [
      "DAS",
      "VERSAGEN",
      "AUSFÄLLE"
  ],
  "SIN": [
      "DIE",
      "SÜNDE",
      "SÜNDEN"
  ],
  "BUTT": [
      "DER",
      "HINTERN",
      "FÜSSE"
  ],
  "CONFUSION": [
      "DIE",
      "VERWIRRUNG",
      "VERWIRRUNGEN"
  ],
  "UNDERSTANDING": [
      "DAS",
      "VERSTÄNDNIS",
      "ABSPRACHEN"
  ],
  "TRADE": [
      "DER",
      "HANDEL",
      "DAS HANDWERK"
  ],
  "REFRIGERATOR": [
      "DER",
      "KÜHLSCHRANK",
      "KÜHLSCHRÄNKE"
  ],
  "MISTER": [
      "DER",
      "HERR",
      "MISTERS"
  ],
  "FLASHLIGHT": [
      "DIE",
      "TASCHENLAMPE",
      "TASCHENLAMPEN"
  ],
  "NET": [
      "DAS",
      "INTERNET",
      "NETZE"
  ],
  "SAILOR": [
      "DER",
      "SEEMANN",
      "MATROSEN"
  ],
  "ATTITUDE": [
      "DIE",
      "ATTITÜDE",
      "HALTUNGEN"
  ],
  "GUILT": [
      "DIE",
      "SCHULD",
      "SCHULDEN"
  ],
  "CRYING": [
      "DAS",
      "WEINEN",
      "GESCHREI"
  ],
  "SIP": [
      "DIE",
      "SIP",
      "SIPS"
  ],
  "TRAVEL": [
      "DIE",
      "REISE",
      "REISEN"
  ],
  "COOKIE": [
      "DER",
      "KEKS",
      "KEKSE"
  ],
  "ESCAPE": [
      "DIE",
      "FLUCHT",
      "FLUCHTEN"
  ],
  "INSTRUCTION": [
      "DIE",
      "ANLEITUNG",
      "ANLEITUNGEN"
  ],
  "FABRIC": [
      "DAS",
      "GEWEBE",
      "STOFFE"
  ],
  "MARBLE": [
      "DER",
      "MARMOR",
      "MURMELN"
  ],
  "GLIMPSE": [
      "DER",
      "BLICK",
      "BLICKE"
  ],
  "DUSK": [
      "DIE",
      "DÄMMERUNG",
      "DÄMMERUNGEN"
  ],
  "COTTAGE": [
      "DIE",
      "HÜTTE",
      "FERIENHÄUSER"
  ],
  "MONKEY": [
      "DER",
      "AFFE",
      "AFFEN"
  ],
  "MAKEUP": [
      "DAS",
      "MAKEUP",
      "MAKEUPS"
  ],
  "DOC": [
      "DIE",
      "DOC",
      "DOCS"
  ],
  "BLOUSE": [
      "DIE",
      "BLUSE",
      "BLUSEN"
  ],
  "RHYTHM": [
      "DER",
      "RHYTHMUS",
      "RHYTHMEN"
  ],
  "STEAM": [
      "DER",
      "DAMPF",
      "DÄMPFE"
  ],
  "PHRASE": [
      "DER",
      "SATZ",
      "SÄTZE"
  ],
  "NUT": [
      "DIE",
      "MUTTER",
      "MÜTTER"
  ],
  "PENCIL": [
      "DER",
      "BLEISTIFT",
      "BLEISTIFTE"
  ],
  "COOK": [
      "DER",
      "KOCH",
      "KÖCHE"
  ],
  "FLAG": [
      "DIE",
      "FLAGGE",
      "FAHNEN"
  ],
  "COACH": [
      "DER",
      "TRAINER",
      "TRAINER"
  ],
  "SWING": [
      "DIE",
      "SCHAUKEL",
      "SCHAUKELN"
  ],
  "SPEAKER": [
      "DER",
      "LAUTSPRECHER",
      "LAUTSPRECHER"
  ],
  "BOLT": [
      "DER",
      "BOLZEN",
      "BOLZEN"
  ],
  "FAT": [
      "DAS",
      "FETT",
      "FETTE"
  ],
  "RUG": [
      "DER",
      "TEPPICH",
      "TEPPICHE"
  ],
  "KNOCK": [
      "DIE",
      "KLOPF",
      "SCHLÄGE"
  ],
  "SPELL": [
      "DER",
      "ZAUBER",
      "ZAUBERSPRÜCHE"
  ],
  "TAXI": [
      "DAS",
      "TAXI",
      "TAXIS"
  ],
  "ROUND": [
      "DIE",
      "RUNDE",
      "RUNDEN"
  ],
  "STRAW": [
      "DER",
      "STROHHALM",
      "HALME"
  ],
  "HATCH": [
      "DIE",
      "LUKE",
      "LUKEN"
  ],
  "FORK": [
      "DIE",
      "GABEL",
      "GABELN"
  ],
  "EVIL": [
      "DAS",
      "BÖSE",
      "ÜBEL"
  ],
  "MAID": [
      "DAS",
      "DIENSTMÄDCHEN",
      "ZIMMERMÄDCHEN"
  ],
  "RELATIVE": [
      "DIE",
      "RELATIVE",
      "VERWANDTEN"
  ],
  "WITCH": [
      "DIE",
      "HEXE",
      "HEXEN"
  ],
  "COURTYARD": [
      "DER",
      "HOF",
      "HÖFE"
  ],
  "SENSATION": [
      "DIE",
      "SENSATION",
      "EMPFINDUNGEN"
  ],
  "BUBBLE": [
      "DIE",
      "BLASE",
      "BLASEN"
  ],
  "READER": [
      "DER",
      "LESER",
      "LESER"
  ],
  "CURL": [
      "DIE",
      "LOCKE",
      "LOCKEN"
  ],
  "PIE": [
      "DER",
      "KUCHEN",
      "TORTEN"
  ],
  "JET": [
      "DER",
      "STRAHL",
      "JETS"
  ],
  "SHIFT": [
      "DIE",
      "VERSCHIEBUNG",
      "VERSCHIEBUNGEN"
  ],
  "UNION": [
      "DIE",
      "UNION",
      "UNIONEN"
  ],
  "TEENAGER": [
      "DER",
      "TEENAGER",
      "TEENAGER"
  ],
  "PLAIN": [
      "DIE",
      "EBENE",
      "EBENEN"
  ],
  "WAITRESS": [
      "DIE",
      "KELLNERIN",
      "KELLNERINNEN"
  ],
  "REPLY": [
      "DIE",
      "ANTWORT",
      "ANTWORTEN"
  ],
  "RUMOR": [
      "DAS",
      "GERÜCHT",
      "GERÜCHTE"
  ],
  "GRAVITY": [
      "DIE",
      "SCHWERKRAFT",
      "GEWICHTE"
  ],
  "SHELTER": [
      "DIE",
      "ZUFLUCHT",
      "UNTERSTÄNDE"
  ],
  "ADVENTURE": [
      "DAS",
      "ABENTEUER",
      "ABENTEUER"
  ],
  "LION": [
      "DER",
      "LÖWE",
      "LÖWEN"
  ],
  "SPINE": [
      "DIE",
      "WIRBELSÄULE",
      "STACHELN"
  ],
  "CONFIDENCE": [
      "DAS",
      "VERTRAUEN",
      "VERTRAULICHKEITEN"
  ],
  "DEPTH": [
      "DIE",
      "TIEFE",
      "TIEFEN"
  ],
  "REACH": [
      "DIE",
      "REICHWEITE",
      "REICHWEITEN"
  ],
  "HAMMER": [
      "DER",
      "HAMMER",
      "HÄMMER"
  ],
  "BIBLE": [
      "DIE",
      "BIBEL",
      "BIBELN"
  ],
  "CONTRACT": [
      "DER",
      "VERTRAG",
      "VERTRÄGE"
  ],
  "WALLET": [
      "DER",
      "GELDBEUTEL",
      "GELDBEUTEL"
  ],
  "JUNGLE": [
      "DER",
      "DSCHUNGEL",
      "DSCHUNGEL"
  ],
  "FACTORY": [
      "DIE",
      "FABRIK",
      "FABRIKEN"
  ],
  "INDIAN": [
      "DIE",
      "INDISCHE",
      "INDIANER"
  ],
  "BALCONY": [
      "DER",
      "BALKON",
      "BALKONE"
  ],
  "RICE": [
      "DER",
      "REIS",
      "REIS"
  ],
  "KNOT": [
      "DER",
      "KNOTEN",
      "KNOTEN"
  ],
  "CORD": [
      "DIE",
      "SCHNUR",
      "SCHNÜRE"
  ],
  "COLLEAGUE": [
      "DER",
      "KOLLEGE",
      "KOLLEGEN"
  ],
  "INTENTION": [
      "DIE",
      "ABSICHT",
      "ABSICHTEN"
  ],
  "STARE": [
      "DIE",
      "STARE",
      "BLICKE"
  ],
  "MOTEL": [
      "DAS",
      "MOTEL",
      "MOTELS"
  ],
  "ATTORNEY": [
      "DER",
      "ANWALT",
      "ANWÄLTE"
  ],
  "DARLING": [
      "DER",
      "LIEBLING",
      "LIEBLINGE"
  ],
  "DISCUSSION": [
      "DIE",
      "DISKUSSION",
      "DISKUSSIONEN"
  ],
  "ATMOSPHERE": [
      "DIE",
      "ATMOSPHÄRE",
      "ATMOSPHÄREN"
  ],
  "PERFORMANCE": [
      "DIE",
      "LEISTUNG",
      "LEISTUNGEN"
  ],
  "TENSION": [
      "DIE",
      "SPANNUNG",
      "SPANNUNGEN"
  ],
  "TEXT": [
      "DER",
      "TEXT",
      "TEXTE"
  ],
  "STRAND": [
      "DER",
      "STRANG",
      "LITZEN"
  ],
  "NOON": [
      "DIE",
      "MITTAG",
      "MITTAGE"
  ],
  "VEIN": [
      "DIE",
      "VENE",
      "VENEN"
  ],
  "EXPERT": [
      "DER",
      "EXPERTE",
      "EXPERTEN"
  ],
  "GANG": [
      "DIE",
      "GRUPPE",
      "GRUPPEN"
  ],
  "POLICEMAN": [
      "DER",
      "POLIZIST",
      "POLICE"
  ],
  "CANCER": [
      "DER",
      "KREBS",
      "KREBSE"
  ],
  "FOX": [
      "DER",
      "FUCHS",
      "FOXS"
  ],
  "DIVORCE": [
      "DIE",
      "SCHEIDUNG",
      "SCHEIDUNGEN"
  ],
  "PULSE": [
      "DIE",
      "IMPULS",
      "IMPULSE"
  ],
  "ABSENCE": [
      "DIE",
      "ABWESENHEIT",
      "ABWESENHEITEN"
  ],
  "VIOLENCE": [
      "DIE",
      "GEWALT",
      "GEWALTEN"
  ],
  "HUMOR": [
      "DER",
      "HUMOR",
      "HUMORS"
  ],
  "STOOL": [
      "DER",
      "STUHL",
      "STÜHLE"
  ],
  "GRAVEL": [
      "DER",
      "KIES",
      "KIESE"
  ],
  "TREASURE": [
      "DER",
      "SCHATZ",
      "SCHÄTZE"
  ],
  "BUTTER": [
      "DIE",
      "BUTTER",
      "BUTTER"
  ],
  "SWITCH": [
      "DER",
      "SCHALTER",
      "SCHALTER"
  ],
  "CIGAR": [
      "DIE",
      "ZIGARRE",
      "ZIGARREN"
  ],
  "CANVAS": [
      "DIE",
      "LEINWAND",
      "LEINWÄNDE"
  ],
  "HAPPINESS": [
      "DIE",
      "FRÖHLICHKEIT",
      "SELIGKEITEN"
  ],
  "GUIDE": [
      "DER",
      "FÜHRER",
      "FÜHRER"
  ],
  "PIN": [
      "DER",
      "STIFT",
      "STIFTE"
  ],
  "ACTOR": [
      "DER",
      "SCHAUSPIELER",
      "AKTEURE"
  ],
  "WHOLE": [
      "DAS",
      "GANZE",
      "LÖCHER"
  ],
  "ARRANGEMENT": [
      "DIE",
      "VEREINBARUNG",
      "VEREINBARUNGEN"
  ],
  "BROWN": [
      "DIE",
      "BRAUNE",
      "BRAUNTÖNE"
  ],
  "HOST": [
      "DER",
      "GASTGEBER",
      "GASTGEBER"
  ],
  "RIBBON": [
      "DAS",
      "FARBBAND",
      "BÄNDER"
  ],
  "SCARF": [
      "DER",
      "SCHAL",
      "SCHALS"
  ],
  "SCALE": [
      "DIE",
      "SKALA",
      "WAAGEN"
  ],
  "PROOF": [
      "DER",
      "BEWEIS",
      "BEWEISE"
  ],
  "ARROW": [
      "DER",
      "PFEIL",
      "PFEILE"
  ],
  "TEMPERATURE": [
      "DIE",
      "TEMPERATUR",
      "TEMPERATUREN"
  ],
  "TECHNOLOGY": [
      "DIE",
      "TECHNOLOGIE",
      "TECHNOLOGIEN"
  ],
  "PERMISSION": [
      "DIE",
      "ERLAUBNIS",
      "BERECHTIGUNGEN"
  ],
  "LOCATION": [
      "DER",
      "ORT",
      "ORTE"
  ],
  "CLAW": [
      "DIE",
      "KLAUE",
      "KRALLEN"
  ],
  "COWBOY": [
      "DER",
      "COWBOY",
      "COWBOIES"
  ],
  "AGENCY": [
      "DIE",
      "AGENTUR",
      "AGENTUREN"
  ],
  "CONSTRUCTION": [
      "DIE",
      "KONSTRUKTION",
      "KONSTRUKTIONEN"
  ],
  "HUNTING": [
      "DAS",
      "JAGD",
      "JAGDEN"
  ],
  "VEGETABLE": [
      "DAS",
      "GEMÜSE",
      "DAS GEMÜSE"
  ],
  "TIN": [
      "DIE",
      "DOSE",
      "DOSEN"
  ],
  "HELICOPTER": [
      "DER",
      "HUBSCHRAUBER",
      "HUBSCHRAUBER"
  ],
  "TRAP": [
      "DIE",
      "FALLE",
      "FALLEN"
  ],
  "PAT": [
      "DAS",
      "PAT",
      "STREICHELEINHEITEN"
  ],
  "GAP": [
      "DIE",
      "LÜCKE",
      "LÜCKEN"
  ],
  "PET": [
      "DAS",
      "HAUSTIER",
      "HAUSTIERE"
  ],
  "EDUCATION": [
      "DIE",
      "BILDUNG",
      "BILDUNGEN"
  ],
  "SHOPPING": [
      "DAS",
      "EINKAUFEN",
      "EINKÄUFE"
  ],
  "SHED": [
      "DER",
      "SCHUPPEN",
      "SCHUPPEN"
  ],
  "AGREEMENT": [
      "DIE",
      "VEREINBARUNG",
      "VEREINBARUNGEN"
  ],
  "SOIL": [
      "DIE",
      "ERDE",
      "ERDEN"
  ],
  "DUKE": [
      "DER",
      "HERZOG",
      "HERZÖGE"
  ],
  "SHOTGUN": [
      "DIE",
      "SCHROTFLINTE",
      "SCHROTFLINTEN"
  ],
  "NOTION": [
      "DIE",
      "VORSTELLUNG",
      "VORSTELLUNGEN"
  ],
  "REAR": [
      "DIE",
      "RÜCKSEITE",
      "RÜCKSEITEN"
  ],
  "CEREMONY": [
      "DIE",
      "ZEREMONIE",
      "ZEREMONIEN"
  ],
  "SPOON": [
      "DER",
      "LÖFFEL",
      "LÖFFEL"
  ],
  "TUB": [
      "DIE",
      "WANNE",
      "WANNEN"
  ],
  "CLUE": [
      "DER",
      "SCHLÜSSEL",
      "HINWEISE"
  ],
  "IRIS": [
      "DIE",
      "IRIS",
      "IRIS"
  ],
  "INCIDENT": [
      "DER",
      "VORFALL",
      "VORFÄLLE"
  ],
  "CRASH": [
      "DER",
      "ABSTURZ",
      "ABSTÜRZE"
  ],
  "JOURNAL": [
      "DAS",
      "TAGEBUCH",
      "ZEITSCHRIFTEN"
  ],
  "ACCESS": [
      "DIE",
      "ZUGRIFFS",
      "ZUGRIFFE"
  ],
  "BRASS": [
      "DAS",
      "MISSING",
      "NULL"
  ],
  "MOMMY": [
      "DIE",
      "MAMA",
      "MAMAS"
  ],
  "SIDEBAR": [
      "DIE",
      "SEITENLEISTE",
      "SEITENLEISTEN"
  ],
  "SHEEP": [
      "DAS",
      "SCHAF",
      "SCHAFE"
  ],
  "ENGINEER": [
      "DER",
      "INGENIEUR",
      "INGENIEURE"
  ],
  "HULL": [
      "DER",
      "RUMPF",
      "RÜMPFE"
  ],
  "ODOR": [
      "DER",
      "GERUCH",
      "GERÜCHE"
  ],
  "APPOINTMENT": [
      "DER",
      "TERMIN",
      "TERMINE"
  ],
  "INVITATION": [
      "DIE",
      "EINLADUNG",
      "EINLADUNGEN"
  ],
  "RAG": [
      "DIE",
      "LAPPEN",
      "LUMPEN"
  ],
  "GOOD": [
      "DAS",
      "GUTE",
      "GÜTER"
  ],
  "DUDE": [
      "DER",
      "KUMPEL",
      "DUDES"
  ],
  "TREATMENT": [
      "DIE",
      "BEHANDLUNG",
      "BEHANDLUNGEN"
  ],
  "WISDOM": [
      "DIE",
      "WEISHEIT",
      "WEISHEITEN"
  ],
  "PRIZE": [
      "DER",
      "PREIS",
      "PREISE"
  ],
  "ELEMENT": [
      "DAS",
      "ELEMENT",
      "ELEMENTE"
  ],
  "GIANT": [
      "DER",
      "GIGANT",
      "RIESEN"
  ],
  "NAPKIN": [
      "DIE",
      "SERVIETTE",
      "SERVIETTEN"
  ],
  "LAUNDRY": [
      "DIE",
      "WÄSCHE",
      "WÄSCHEREIEN"
  ],
  "OPTION": [
      "DIE",
      "OPTION",
      "OPTIONEN"
  ],
  "RACK": [
      "DAS",
      "REGAL",
      "ZAHNSTANGEN"
  ],
  "REQUEST": [
      "DIE",
      "ANFORDERUNG",
      "ANFRAGEN"
  ],
  "JAIL": [
      "DAS",
      "GEFÄNGNIS",
      "GEFÄNGNISSE"
  ],
  "GRANDPA": [
      "DER",
      "OPA",
      "GROSSVÄTER"
  ],
  "RANCH": [
      "DIE",
      "RANCH",
      "RANCHES"
  ],
  "DOT": [
      "DER",
      "PUNKT",
      "PUNKTE"
  ],
  "SCRIPT": [
      "DAS",
      "SKRIPT",
      "SKRIPTE"
  ],
  "MALL": [
      "DIE",
      "EINKAUFSHALLE",
      "EINKAUFSZENTREN"
  ],
  "FORD": [
      "DER",
      "FORD",
      "FURTEN"
  ],
  "EXERCISE": [
      "DIE",
      "ÜBUNG",
      "ÜBUNGEN"
  ],
  "WIDOW": [
      "DIE",
      "WITWE",
      "WITWEN"
  ],
  "CROW": [
      "DIE",
      "KRÄHE",
      "KRÄHEN"
  ],
  "THREAD": [
      "DER",
      "FADEN",
      "FÄDEN"
  ],
  "SUICIDE": [
      "DIE",
      "SELBSTMORD",
      "SELBSTMORDE"
  ],
  "NOTICE": [
      "DIE",
      "NOTIZ",
      "NOTIZEN"
  ],
  "SUNSET": [
      "DER",
      "SONNENUNTERGANG",
      "SONNE GEHT UNTER"
  ],
  "GALLERY": [
      "DIE",
      "GALLERIE",
      "GALERIEN"
  ],
  "VESSEL": [
      "DAS",
      "SCHIFF",
      "SCHIFFE"
  ],
  "THUNDER": [
      "DER",
      "DONNER",
      "DER+DONNER"
  ],
  "SOAP": [
      "DIE",
      "SEIFE",
      "SEIFEN"
  ],
  "WHISKEY": [
      "DER",
      "WHISKY",
      "WHISKYS"
  ],
  "FEMALE": [
      "DAS",
      "WEIBCHEN",
      "WEIBCHEN"
  ],
  "MAYOR": [
      "DER",
      "BÜRGERMEISTER",
      "BÜRGERMEISTER"
  ],
  "STROKE": [
      "DER",
      "HUB",
      "STRICHE"
  ],
  "CLICK": [
      "DER",
      "KLICK",
      "KLICKS"
  ],
  "REPUTATION": [
      "DER",
      "RUF",
      "DER+RUF"
  ],
  "MILLER": [
      "DER",
      "MÜLLER",
      "MÜLLER"
  ],
  "COUNCIL": [
      "DER",
      "RAT",
      "RÄTE"
  ],
  "SCHEDULE": [
      "DER",
      "STUNDENPLAN",
      "DER+SPIELPLAN"
  ],
  "CEMETERY": [
      "DER",
      "FRIEDHOF",
      "FRIEDHÖFE"
  ],
  "STRUGGLE": [
      "DER",
      "KAMPF",
      "KÄMPFE"
  ],
  "INSTINCT": [
      "DER",
      "INSTINKT",
      "INSTINKTE"
  ],
  "CALM": [
      "DIE",
      "RUHE",
      "null"
  ],
  "EMPLOYEE": [
      "DER",
      "ARBEITNEHMER",
      "ANGESTELLTEN"
  ],
  "NEST": [
      "DAS",
      "NEST",
      "NESTER"
  ],
  "LIMIT": [
      "DAS",
      "LIMIT",
      "GRENZWERTE"
  ],
  "GERMAN": [
      "DER",
      "DEUTSCHE",
      "DEUTSCHEN"
  ],
  "MONK": [
      "DER",
      "MÖNCH",
      "MÖNCHE"
  ],
  "WORM": [
      "DER",
      "WURM",
      "WÜRMER"
  ],
  "DOCUMENT": [
      "DAS",
      "DOKUMENT",
      "DOKUMENTE"
  ],
  "SADNESS": [
      "DIE",
      "TRAURIGKEIT",
      "TRAURIGKEITEN"
  ],
  "HUT": [
      "DIE",
      "HÜTTE",
      "HÜTTEN"
  ],
  "LIFETIME": [
      "DIE",
      "LEBENSDAUER",
      "LEBENSDAUERN"
  ],
  "DANCER": [
      "DIE",
      "TÄNZERIN",
      "TÄNZER"
  ],
  "INSURANCE": [
      "DIE",
      "VERSICHERUNG",
      "VERSICHERUNGEN"
  ],
  "DIFFICULTY": [
      "DIE",
      "SCHWIERIGKEIT",
      "SCHWIERIGKEITEN"
  ],
  "MATTRESS": [
      "DIE",
      "MATRATZE",
      "MATRATZEN"
  ],
  "CLINIC": [
      "DIE",
      "KLINIK",
      "KLINIKEN"
  ],
  "AD": [
      "DIE",
      "AD",
      "ANZEIGEN"
  ],
  "MUG": [
      "DER",
      "BECHER",
      "BECHER"
  ],
  "KIT": [
      "DAS",
      "KIT",
      "KITS"
  ],
  "COMMUNICATION": [
      "DIE",
      "KOMMUNIKATION",
      "KOMMUNIKATIONEN"
  ],
  "DISASTER": [
      "DAS",
      "UNGLÜCK",
      "UNGLÜCKE"
  ],
  "TILE": [
      "DIE",
      "FLIESE",
      "FLIESEN"
  ],
  "RECEIVER": [
      "DER",
      "EMPFÄNGER",
      "EMPFÄNGER"
  ],
  "ROAR": [
      "DAS",
      "GEBRÜLL",
      "BRÜLLT"
  ],
  "TROOP": [
      "DIE",
      "TRUPPE",
      "TRUPPEN"
  ],
  "COFFIN": [
      "DER",
      "SARG",
      "SÄRGE"
  ],
  "FRIENDSHIP": [
      "DIE",
      "FREUNDSCHAFT",
      "FREUNDSCHAFTEN"
  ],
  "INVESTIGATION": [
      "DIE",
      "ERMITTLUNG",
      "UNTERSUCHUNGEN"
  ],
  "SALE": [
      "DER",
      "VERKAUF",
      "VERKÄUFE"
  ],
  "GOAL": [
      "DAS",
      "ZIEL",
      "ZIELE"
  ],
  "AMBULANCE": [
      "DER",
      "KRANKENWAGEN",
      "KRANKENWAGEN"
  ],
  "MOONLIGHT": [
      "DAS",
      "MONDLICHT",
      "MONDLICHT"
  ],
  "WARD": [
      "DIE",
      "WARD",
      "SCHUTZZAUBER"
  ],
  "TROUSERS": [
      "DIE",
      "HOSEN",
      "TROUSERSES"
  ],
  "WOOL": [
      "DIE",
      "WOLLE",
      "WOLLE"
  ],
  "MAC": [
      "DIE",
      "MAC",
      "MACS"
  ],
  "MINISTER": [
      "DER",
      "MINISTER",
      "MINISTER"
  ],
  "ENTRY": [
      "DER",
      "EINTRITT",
      "EINTRÄGE"
  ],
  "THIEF": [
      "DER",
      "DIEB",
      "DIEBE"
  ],
  "BRIEFCASE": [
      "DIE",
      "AKTENTASCHE",
      "AKTENTASCHEN"
  ],
  "PITY": [
      "DAS",
      "MITLEID",
      "BEMITLEIDET"
  ],
  "FINGERTIP": [
      "DIE",
      "FINGER",
      "FINGERSPITZEN"
  ],
  "NAVY": [
      "DIE",
      "MARINE",
      "MARINEN"
  ],
  "INSECT": [
      "DAS",
      "INSEKT",
      "INSEKTEN"
  ],
  "VELVET": [
      "DAS",
      "VELVET",
      "SAMT"
  ],
  "BEE": [
      "DIE",
      "BIENE",
      "BIENEN"
  ],
  "CANE": [
      "DER",
      "STOCK",
      "STÖCKE"
  ],
  "GENE": [
      "DAS",
      "GEN",
      "GENE"
  ],
  "SALAD": [
      "DER",
      "SALAT",
      "SALATE"
  ],
  "WINDSHIELD": [
      "DIE",
      "WINDSCHUTZSCHEIBE",
      "WINDSCHUTZSCHEIBEN"
  ],
  "OUTFIT": [
      "DAS",
      "OUTFIT",
      "OUTFITS"
  ],
  "SHUTTLE": [
      "DER",
      "SHUTTLE",
      "SHUTTLES"
  ],
  "SHOUT": [
      "DER",
      "SCHREI",
      "RUFE"
  ],
  "FURY": [
      "DIE",
      "WUT",
      "FURIEN"
  ],
  "CHALLENGE": [
      "DIE",
      "HERAUSFORDERUNG",
      "HERAUSFORDERUNGEN"
  ],
  "SATISFACTION": [
      "DIE",
      "ZUFRIEDENHEIT",
      "ZUFRIEDENHEITEN"
  ],
  "MOTOR": [
      "DER",
      "MOTOR",
      "MOTOREN"
  ],
  "PRODUCT": [
      "DAS",
      "PRODUKT",
      "PRODUKTE"
  ],
  "WEED": [
      "DAS",
      "UNKRAUT",
      "DAS+UNKRAUT"
  ],
  "STRETCH": [
      "DIE",
      "STRECKE",
      "STRECKEN"
  ],
  "GYM": [
      "DAS",
      "FITNESSCENTER",
      "FITNESSSTUDIOS"
  ],
  "CAPITAL": [
      "DAS",
      "KAPITAL",
      "HAUPTSTÄDTE"
  ],
  "RIM": [
      "DER",
      "RAND",
      "FELGEN"
  ],
  "PAW": [
      "DIE",
      "PFOTE",
      "PFOTEN"
  ],
  "FORT": [
      "DIE",
      "FESTUNG",
      "FORTS"
  ],
  "COST": [
      "DIE",
      "KOSTEN",
      "KOSTEN"
  ],
  "POSTER": [
      "DAS",
      "PLAKAT",
      "PLAKATE"
  ],
  "VAMPIRE": [
      "DER",
      "VAMPIR",
      "VAMPIRE"
  ],
  "SHAFT": [
      "DIE",
      "WELLE",
      "WELLEN"
  ],
  "IDENTITY": [
      "DIE",
      "IDENTITÄT",
      "IDENTITÄTEN"
  ],
  "PAVEMENT": [
      "DER",
      "BÜRGERSTEIG",
      "BÜRGERSTEIGE"
  ],
  "ASSHOLE": [
      "DAS",
      "ARSCHLOCH",
      "ARSCHLÖCHER"
  ],
  "STRAP": [
      "DER",
      "GURT",
      "GURTE"
  ],
  "PARLOR": [
      "DAS",
      "WOHNZIMMER",
      "STUBEN"
  ],
  "HARBOR": [
      "DER",
      "HAFEN",
      "HÄFEN"
  ],
  "EXAMPLE": [
      "DAS",
      "BEISPIEL",
      "BEISPIELE"
  ],
  "WEB": [
      "DAS",
      "NETZ",
      "NETZE"
  ],
  "GOLF": [
      "DER",
      "GOLF",
      "GOLFPLÄTZE"
  ],
  "CRAP": [
      "DER",
      "MIST",
      "SCHEISST"
  ],
  "DELIGHT": [
      "DIE",
      "FREUDE",
      "FREUDEN"
  ],
  "QUILT": [
      "DIE",
      "DECKE",
      "DECKEN"
  ],
  "TAX": [
      "DIE",
      "STEUER",
      "TAXS"
  ],
  "FOLD": [
      "DIE",
      "FALTE",
      "FALTEN"
  ],
  "PORTRAIT": [
      "DAS",
      "PORTRÄT",
      "PORTRÄTS"
  ],
  "TISSUE": [
      "DAS",
      "GEWEBE",
      "GEWEBE"
  ],
  "BELIEF": [
      "DER",
      "GLAUBE",
      "ÜBERZEUGUNGEN"
  ],
  "COSTUME": [
      "DAS",
      "KOSTÜM",
      "KOSTÜME"
  ],
  "MEASURE": [
      "DAS",
      "MASS",
      "MASSE"
  ],
  "CARRIAGE": [
      "DER",
      "WAGEN",
      "WAGEN"
  ],
  "GUITAR": [
      "DIE",
      "GITARRE",
      "GITARREN"
  ],
  "KNIGHT": [
      "DER",
      "RITTER",
      "RITTER"
  ],
  "RANK": [
      "DER",
      "RANG",
      "REIHEN"
  ],
  "MAJOR": [
      "DER",
      "BÜRGERMEISTER",
      "MAJORS"
  ],
  "FOUNTAIN": [
      "DER",
      "BRUNNEN",
      "BRUNNEN"
  ],
  "STALL": [
      "DER",
      "STALL",
      "STÄLLE"
  ],
  "LOAD": [
      "DIE",
      "LADUNG",
      "LASTEN"
  ],
  "SPARK": [
      "DER",
      "FUNKE",
      "FUNKEN"
  ],
  "WASTE": [
      "DER",
      "MÜLL",
      "ABFÄLLE"
  ],
  "CHAMPAGNE": [
      "DER",
      "CHAMPAGNER",
      "CHAMPAGNER"
  ],
  "DISTRICT": [
      "DAS",
      "VIERTEL",
      "BEZIRKE"
  ],
  "PROTECTION": [
      "DER",
      "SCHUTZ",
      "SCHUTZ"
  ],
  "JUDGMENT": [
      "DAS",
      "URTEIL",
      "URTEILE"
  ],
  "SYMPATHY": [
      "DIE",
      "SYMPATHIE",
      "SYMPATHIEN"
  ],
  "VIOLET": [
      "DAS",
      "VIOLETT",
      "VEILCHEN"
  ],
  "IMPACT": [
      "DER",
      "AUFPRALL",
      "AUSWIRKUNGEN"
  ],
  "DISAPPOINTMENT": [
      "DIE",
      "ENTTÄUSCHUNG",
      "ENTTÄUSCHUNGEN"
  ],
  "DRINKING": [
      "DAS",
      "TRINK",
      "DRINKINGS"
  ],
  "CONSCIOUSNESS": [
      "DAS",
      "BEWUSSTSEIN",
      "BEWUSSTS"
  ],
  "HANDKERCHIEF": [
      "DAS",
      "TASCHENTUCH",
      "TASCHENTÜCHER"
  ],
  "DANCING": [
      "DAS",
      "TANZEN",
      "DANCINGS"
  ],
  "PERFUME": [
      "DAS",
      "PARFÜM",
      "PARFÜMS"
  ],
  "NETWORK": [
      "DAS",
      "NETZWERK",
      "NETZWERKE"
  ],
  "CLAIM": [
      "DER",
      "ANSPRUCH",
      "ANSPRÜCHE"
  ],
  "NUN": [
      "DIE",
      "NONNE",
      "NONNEN"
  ],
  "CROWN": [
      "DIE",
      "KRONE",
      "KRONEN"
  ],
  "RAILING": [
      "DAS",
      "GELÄNDER",
      "GELÄNDER"
  ],
  "LICENSE": [
      "DIE",
      "LIZENZ",
      "LIZENZEN"
  ],
  "MERCY": [
      "DIE",
      "BARMHERZIGKEIT",
      "BARMHERZIGKEITEN"
  ],
  "BALLOON": [
      "DER",
      "BALLON",
      "BALLONS"
  ],
  "CHAOS": [
      "DAS",
      "CHAOS",
      "CHAOSES"
  ],
  "FEVER": [
      "DAS",
      "FIEBER",
      "FIEBER"
  ],
  "LOCKER": [
      "DAS",
      "SCHLIESSFACH",
      "SCHLIESSFÄCHER"
  ],
  "SESSION": [
      "DIE",
      "SITZUNG",
      "SITZUNGEN"
  ],
  "BURST": [
      "DIE",
      "BURST",
      "BURSTS"
  ],
  "PEAK": [
      "DER",
      "SPITZER",
      "PEAKS"
  ],
  "DRUM": [
      "DIE",
      "TROMMEL",
      "TROMMELN"
  ],
  "FOCUS": [
      "DER",
      "FOKUS",
      "SCHWERPUNKTE"
  ],
  "FROG": [
      "DER",
      "FROSCH",
      "FRÖSCHE"
  ],
  "BENEFIT": [
      "DER",
      "VORTEIL",
      "VORTEILE"
  ],
  "REMARK": [
      "DIE",
      "BEMERKUNG",
      "BEMERKUNGEN"
  ],
  "TIDE": [
      "DIE",
      "GEZEITEN",
      "GEZEITEN"
  ],
  "SUSPICION": [
      "DER",
      "VERDACHT",
      "DER+VERDACHT"
  ],
  "JEEP": [
      "DER",
      "JEEP",
      "JEEPS"
  ],
  "WORRY": [
      "DIE",
      "SORGE",
      "SORGEN"
  ],
  "LITERATURE": [
      "DIE",
      "LITERATUR",
      "LITERATUREN"
  ],
  "ARCHER": [
      "DER",
      "BOGENSCHÜTZE",
      "BOGENSCHÜTZEN"
  ],
  "HOUSEHOLD": [
      "DER",
      "HAUSHALT",
      "HAUSHALTE"
  ],
  "POWDER": [
      "DAS",
      "PULVER",
      "PULVER"
  ],
  "SHEPHERD": [
      "DER",
      "HIRTE",
      "HIRTEN"
  ],
  "LENS": [
      "DIE",
      "LINSE",
      "LINSEN"
  ],
  "FAVORITE": [
      "DER",
      "FAVORIT",
      "FAVORITEN"
  ],
  "MADAME": [
      "DIE",
      "MADAME",
      "MADAMES"
  ],
  "MANSION": [
      "DIE",
      "VILLA",
      "HERRENHÄUSER"
  ],
  "BOOM": [
      "DER",
      "BOOM",
      "AUSLEGER"
  ],
  "LACE": [
      "DIE",
      "SPITZE",
      "SCHNÜRSENKEL"
  ],
  "REVIEW": [
      "DIE",
      "ÜBERPRÜFUNG",
      "BEWERTUNGEN"
  ],
  "RECEPTION": [
      "DIE",
      "REZEPTION",
      "REZEPTIONEN"
  ],
  "SCRAP": [
      "DER",
      "SCHROTT",
      "SCHROTTE"
  ],
  "BEAD": [
      "DER",
      "WULST",
      "PERLEN"
  ],
  "GLARE": [
      "DIE",
      "BLENDUNG",
      "BLICKE"
  ],
  "FLOW": [
      "DIE",
      "STRÖMUNG",
      "STRÖME"
  ],
  "CAFE": [
      "DAS",
      "CAFE",
      "CAFÉS"
  ],
  "STATUS": [
      "DER",
      "STATUS",
      "ZUSTÄNDE"
  ],
  "POUNDING": [
      "DAS",
      "POCHEN",
      "POUNDINGS"
  ],
  "ROCKET": [
      "DIE",
      "RAKETE",
      "RAKETEN"
  ],
  "CANYON": [
      "DIE",
      "SCHLUCHT",
      "SCHLUCHTEN"
  ],
  "SORROW": [
      "DIE",
      "TRAUER",
      "LEIDEN"
  ],
  "SPIDER": [
      "DIE",
      "SPINNE",
      "SPINNEN"
  ],
  "BLAST": [
      "DIE",
      "EXPLOSION",
      "BLASTEN"
  ],
  "PERSONALITY": [
      "DIE",
      "PERSÖNLICHKEIT",
      "PERSÖNLICHKEITEN"
  ],
  "CAMPUS": [
      "DER",
      "CAMPUS",
      "CAMPUS"
  ],
  "CURSE": [
      "DER",
      "FLUCH",
      "FLÜCHE"
  ],
  "STAIRCASE": [
      "DAS",
      "TREPPENHAUS",
      "TREPPENHÄUSER"
  ],
  "URGE": [
      "DER",
      "DRANG",
      "TRIEBE"
  ],
  "FRUSTRATION": [
      "DIE",
      "FRUSTRATION",
      "FRUSTRATIONEN"
  ],
  "PUMP": [
      "DIE",
      "PUMPE",
      "PUMPEN"
  ],
  "EASE": [
      "DIE",
      "LEICHTIGKEIT",
      "KUNGEN"
  ],
  "COUNT": [
      "DIE",
      "ZÄHLUNG",
      "GRAFEN"
  ],
  "SOLUTION": [
      "DIE",
      "LÖSUNG",
      "LÖSUNGEN"
  ],
  "JEWELRY": [
      "DER",
      "SCHMUCK",
      "SCHMUCKE"
  ],
  "SIREN": [
      "DIE",
      "SIRENE",
      "SIRENEN"
  ],
  "HIT": [
      "DER",
      "SCHLAG",
      "TREFFER"
  ],
  "TRADITION": [
      "DIE",
      "TRADITION",
      "TRADITIONEN"
  ],
  "CURB": [
      "DAS",
      "LEER",
      "BORDSTEINE"
  ],
  "VARIETY": [
      "DIE",
      "VIELFALT",
      "SORTEN"
  ],
  "PIRATE": [
      "DER",
      "PIRAT",
      "PIRATEN"
  ],
  "DESCRIPTION": [
      "DIE",
      "BESCHREIBUNG",
      "BESCHREIBUNGEN"
  ],
  "DEAR": [
      "DER",
      "LIEBE",
      "LIEBEN"
  ],
  "ANXIETY": [
      "DIE",
      "ANGST",
      "ÄNGSTE"
  ],
  "PITCH": [
      "DIE",
      "TONHÖHE",
      "STELLPLÄTZE"
  ],
  "PIZZA": [
      "DIE",
      "PIZZA",
      "PIZZAS"
  ],
  "ELEPHANT": [
      "DER",
      "ELEFANT",
      "ELEFANTEN"
  ],
  "POLITICS": [
      "DIE",
      "POLITIK",
      "POLITIKEN"
  ],
  "TENNIS": [
      "DER",
      "TENNIS",
      "TENNISES"
  ],
  "HUNGER": [
      "DER",
      "HUNGER",
      "HUNGERT"
  ],
  "GENIUS": [
      "DAS",
      "GENIE",
      "GENIES"
  ],
  "GOAT": [
      "DIE",
      "ZIEGE",
      "ZIEGEN"
  ],
  "VICTORY": [
      "DER",
      "SIEG",
      "SIEGE"
  ],
  "COMBINATION": [
      "DIE",
      "KOMBINATION",
      "KOMBINATIONEN"
  ],
  "AFFILIATION": [
      "DIE",
      "ZUGEHÖRIGKEIT",
      "ZUGEHÖRIGKEITEN"
  ],
  "MOMMA": [
      "DAS",
      "MOMMA",
      "MOMMAS"
  ],
  "CAPE": [
      "DER",
      "UMHANG",
      "UMHÄNGE"
  ],
  "HEADLIGHT": [
      "DER",
      "SCHEINWERFER",
      "SCHEINWERFER"
  ],
  "GOVERNOR": [
      "DER",
      "GOUVERNEUR",
      "GOUVERNEURE"
  ],
  "OXYGEN": [
      "DIE",
      "SAUERSTOFF",
      "SAUERSTOFFE"
  ],
  "BISHOP": [
      "DER",
      "BISCHOF",
      "BISCHÖFE"
  ],
  "BUNDLE": [
      "DAS",
      "BÜNDEL",
      "BÜNDEL"
  ],
  "DEVELOPMENT": [
      "DIE",
      "ENTWICKLUNG",
      "ENTWICKLUNGEN"
  ],
  "FINGERNAIL": [
      "DER",
      "FINGERNAGEL",
      "FINGERNÄGEL"
  ],
  "SCORE": [
      "DIE",
      "PUNKTZAHL",
      "NOTEN"
  ],
  "MATE": [
      "DER",
      "STEUERMANN",
      "MATES"
  ],
  "RIDER": [
      "DER",
      "FAHRER",
      "FAHRER"
  ],
  "ORBIT": [
      "DIE",
      "UMLAUFBAHN",
      "BAHNEN"
  ],
  "VINE": [
      "DER",
      "WEINSTOCK",
      "REBEN"
  ],
  "SUITE": [
      "DIE",
      "SUITE",
      "SUITEN"
  ],
  "BARTENDER": [
      "DER",
      "BARKEEPER",
      "BARKEEPER"
  ],
  "COKE": [
      "DER",
      "KOKS",
      "KOKSE"
  ],
  "TUNE": [
      "DIE",
      "MELODIE",
      "MELODIEN"
  ],
  "GLORY": [
      "DIE",
      "HERRLICHKEIT",
      "HERRLICHKEITEN"
  ],
  "RABBI": [
      "DER",
      "RABBI",
      "RABBINER"
  ],
  "SURGERY": [
      "DIE",
      "OPERATION",
      "OPERATIONEN"
  ],
  "CATTLE": [
      "DAS",
      "VIEH",
      "RINDER"
  ],
  "RITUAL": [
      "DAS",
      "RITUAL",
      "RITUALE"
  ],
  "GREETING": [
      "DIE",
      "BEGRÜSSUNG",
      "GRÜSSE"
  ],
  "SLICE": [
      "DIE",
      "SCHEIBE",
      "SCHEIBEN"
  ],
  "HOMER": [
      "DIE",
      "HOMER",
      "HOME RUNS"
  ],
  "FIREPLACE": [
      "DER",
      "KAMIN",
      "KAMINE"
  ],
  "JERSEY": [
      "DAS",
      "TRIKOT",
      "TRIKOTS"
  ],
  "MEDIA": [
      "DIE",
      "MEDIEN",
      "MEDIEN"
  ],
  "POP": [
      "DIE",
      "POP",
      "DAS+POPS"
  ],
  "CARGO": [
      "DIE",
      "FRACHT",
      "LADUNGEN"
  ],
  "INN": [
      "DAS",
      "GASTHAUS",
      "GASTHÖFE"
  ],
  "DEPUTY": [
      "DER",
      "STELLVERTRETENDE",
      "ABGEORDNETEN"
  ],
  "DESPAIR": [
      "DIE",
      "VERZWEIFLUNG",
      "VERZWEIFLUNGEN"
  ],
  "TERRITORY": [
      "DAS",
      "TERRITORIUM",
      "GEBIETE"
  ],
  "PUNCH": [
      "DER",
      "SCHLAG",
      "STEMPEL"
  ],
  "JAZZ": [
      "DIE",
      "JAZZ",
      "JAZZS"
  ],
  "HUG": [
      "DIE",
      "UMARMUNG",
      "UMARMUNGEN"
  ],
  "WHISTLE": [
      "DIE",
      "PFEIFE",
      "PFEIFEN"
  ],
  "HUMANITY": [
      "DIE",
      "MENSCHLICHKEIT",
      "GEISTESWISSENSCHAFTEN"
  ],
  "CRAFT": [
      "DAS",
      "HANDWERK",
      "HANDWERKE"
  ],
  "DAYLIGHT": [
      "DAS",
      "TAGESLICHT",
      "DAYLIGHIES"
  ],
  "WORTH": [
      "DER",
      "WERT",
      "WERTE"
  ],
  "SLIP": [
      "DER",
      "SLIP",
      "SCHIEBER"
  ],
  "ARMOR": [
      "DIE",
      "RÜSTUNG",
      "RÜSTUNGEN"
  ],
  "BACKPACK": [
      "DER",
      "RUCKSACK",
      "RUCKSÄCKE"
  ],
  "SUGGESTION": [
      "DER",
      "VORSCHLAG",
      "VORSCHLÄGE"
  ],
  "DEN": [
      "DIE",
      "HÖHLE",
      "DENS"
  ],
  "SYMBOL": [
      "DAS",
      "SYMBOL",
      "SYMBOLE"
  ],
  "COLONY": [
      "DIE",
      "KOLONIE",
      "KOLONIEN"
  ],
  "CONCLUSION": [
      "DAS",
      "FAZIT",
      "FAZITS"
  ],
  "NOSTRIL": [
      "DAS",
      "NASENLOCH",
      "NASENLÖCHER"
  ],
  "SPEAR": [
      "DER",
      "SPEER",
      "SPEERE"
  ],
  "IMPULSE": [
      "DER",
      "IMPULS",
      "IMPULSE"
  ],
  "TOMATO": [
      "DIE",
      "TOMATE",
      "TOMATEN"
  ],
  "CALF": [
      "DAS",
      "KALB",
      "KÄLBER"
  ],
  "AUTUMN": [
      "DER",
      "HERBST",
      "HERBSTE"
  ],
  "DISCOVERY": [
      "DER",
      "FUND",
      "ENTDECKUNGEN"
  ],
  "CLASSROOM": [
      "DAS",
      "KLASSENZIMMER",
      "KLASSENZIMMER"
  ],
  "DELIVERY": [
      "DIE",
      "LIEFERUNG",
      "EINTEILUNGEN"
  ],
  "SPRAY": [
      "DAS",
      "SPRAY",
      "SPRAIES"
  ],
  "LIQUID": [
      "DIE",
      "FLÜSSIGKEIT",
      "FLÜSSIGKEITEN"
  ],
  "FUEL": [
      "DIE",
      "KRAFTSTOFF",
      "KRAFTSTOFFE"
  ],
  "UNDERWEAR": [
      "DIE",
      "UNTERWÄSCHE",
      "UNTERWÄSCHE"
  ],
  "DOME": [
      "DIE",
      "KUPPEL",
      "KUPPELN"
  ],
  "POPULATION": [
      "DIE",
      "BEVÖLKERUNG",
      "BEVÖLKERUNGEN"
  ],
  "AFFECTION": [
      "DIE",
      "NEIGUNG",
      "NEIGUNGEN"
  ],
  "RELIGION": [
      "DIE",
      "RELIGION",
      "RELIGIONEN"
  ],
  "SINGER": [
      "DER",
      "SÄNGER",
      "SÄNGER"
  ],
  "ATTENDANT": [
      "DER",
      "BEGLEITER",
      "TEILNEHMER"
  ],
  "ILLUSION": [
      "DIE",
      "ILLUSION",
      "ILLUSIONEN"
  ],
  "LINK": [
      "DER",
      "LINK",
      "LINKS"
  ],
  "LOUNGE": [
      "DAS",
      "WOHNZIMMER",
      "LOUNGES"
  ],
  "INTERIOR": [
      "DER",
      "INNENRAUM",
      "INNENRÄUME"
  ],
  "SHRUG": [
      "DIE",
      "ACHSELZUCKEN",
      "ZUCKT MIT DEN SCHULTERN"
  ],
  "ZONE": [
      "DIE",
      "ZONE",
      "ZONEN"
  ],
  "STANDARD": [
      "DER",
      "STANDARD",
      "STANDARDS"
  ],
  "COAL": [
      "DIE",
      "KOHLEN",
      "KOHLEN"
  ],
  "CHASE": [
      "DIE",
      "JAGD",
      "JAGDEN"
  ],
  "LUMP": [
      "DER",
      "KLUMPEN",
      "KLUMPEN"
  ],
  "CHARM": [
      "DER",
      "CHARM",
      "DER+CHARME"
  ],
  "LEGEND": [
      "DIE",
      "LEGENDE",
      "LEGENDEN"
  ],
  "CONSEQUENCE": [
      "DIE",
      "KONSEQUENZ",
      "KONSEQUENZEN"
  ],
  "OBSERVATION": [
      "DIE",
      "BEOBACHTUNG",
      "BEOBACHTUNGEN"
  ],
  "BICYCLE": [
      "DAS",
      "FAHRRAD",
      "FAHRRÄDER"
  ],
  "HARM": [
      "DER",
      "SCHADEN",
      "SCHÄDEN"
  ],
  "PAY": [
      "DIE",
      "ZAHLUNG",
      "DAS+ZAHLT"
  ],
  "PROSPECT": [
      "DAS",
      "PROSPEKT",
      "PROSPEKTE"
  ],
  "SUBWAY": [
      "DIE",
      "UBAHN",
      "UBAHNEN"
  ],
  "SAMPLE": [
      "DAS",
      "MUSTER",
      "BEISPIELE"
  ],
  "CHERRY": [
      "DIE",
      "KIRSCHE",
      "KIRSCHEN"
  ],
  "DEALER": [
      "DER",
      "HÄNDLER",
      "HÄNDLER"
  ],
  "ASSIGNMENT": [
      "DIE",
      "ZUORDNUNG",
      "ZUORDNUNGEN"
  ],
  "HURRY": [
      "DIE",
      "EILE",
      "EILT"
  ],
  "MISTRESS": [
      "DIE",
      "GELIEBTE",
      "MÄTRESSEN"
  ],
  "MOUND": [
      "DER",
      "HÜGEL",
      "HÜGEL"
  ],
  "NONSENSE": [
      "DER",
      "UNSINN",
      "UNSINN"
  ],
  "COMMITTEE": [
      "DAS",
      "KOMITEE",
      "AUSSCHÜSSE"
  ],
  "ECHO": [
      "DAS",
      "ECHO",
      "ECHOS"
  ],
  "SLACK": [
      "DER",
      "DURCHHANG",
      "HOSE"
  ],
  "DECKER": [
      "DIE",
      "DECKER",
      "DECKER"
  ],
  "WAREHOUSE": [
      "DAS",
      "WARENHAUS",
      "LAGERHÄUSER"
  ],
  "BOUT": [
      "DER",
      "KAMPF",
      "KÄMPFE"
  ],
  "TOAST": [
      "DER",
      "TOAST",
      "TOASTS"
  ],
  "FACILITY": [
      "DIE",
      "EINRICHTUNG",
      "EINRICHTUNGEN"
  ],
  "BASKETBALL": [
      "DER",
      "BASKETBALL",
      "BASKETBÄLLE"
  ],
  "MUSTACHE": [
      "DER",
      "SCHNURRBART",
      "SCHNURRBÄRTE"
  ],
  "SENATOR": [
      "DER",
      "SENATOR",
      "SENATOREN"
  ],
  "SHARE": [
      "DAS",
      "TEILEN",
      "AKTIEN"
  ],
  "EYELID": [
      "DAS",
      "AUGENLID",
      "AUGENLIDER"
  ],
  "ENTHUSIASM": [
      "DIE",
      "BEGEISTERUNG",
      "BEGEISTERUNG"
  ],
  "CHUNK": [
      "DIE",
      "CHUNK",
      "BROCKEN"
  ],
  "TURTLE": [
      "DIE",
      "SCHILDKRÖTE",
      "SCHILDKRÖTEN"
  ],
  "ALCOHOL": [
      "DER",
      "ALKOHOL",
      "ALKOHOLE"
  ],
  "GUM": [
      "DIE",
      "GUMMI",
      "GUMMIS"
  ],
  "TURKEY": [
      "DER",
      "TRUTHAHN",
      "TRUTHÄHNE"
  ],
  "PREACHER": [
      "DER",
      "PREDIGER",
      "PREDIGER"
  ],
  "POSSESSION": [
      "DER",
      "BESITZ",
      "BESITZUNGEN"
  ],
  "DOLLY": [
      "DER",
      "DOLLY",
      "DOLLIES"
  ],
  "LINEN": [
      "DAS",
      "LEINEN",
      "BETTWÄSCHE"
  ],
  "APOLOGY": [
      "DIE",
      "ENTSCHULDIGUNG",
      "ENTSCHULDIGUNG"
  ],
  "LECTURE": [
      "DER",
      "VORTRAG",
      "VORTRÄGE"
  ],
  "BOULDER": [
      "DER",
      "STEIN",
      "STEINE"
  ],
  "HEAP": [
      "DER",
      "HEAP",
      "HAUFEN"
  ],
  "PHOTOGRAPHER": [
      "DER",
      "FOTOGRAF",
      "FOTOGRAFEN"
  ],
  "BRAKE": [
      "DIE",
      "BREMSE",
      "BREMSEN"
  ],
  "DEMAND": [
      "DIE",
      "NACHFRAGE",
      "NACHFRAGEN"
  ],
  "APRON": [
      "DIE",
      "SCHÜRZE",
      "SCHÜRZEN"
  ],
  "CLOAK": [
      "DER",
      "MANTEL",
      "MÄNTEL"
  ],
  "JURY": [
      "DIE",
      "JURY",
      "JURYS"
  ],
  "HEARING": [
      "DIE",
      "ANHÖRUNG",
      "ANHÖRUNGEN"
  ],
  "GRAY": [
      "DAS",
      "GRAUE",
      "GRAUTÖNE"
  ],
  "CRATE": [
      "DIE",
      "KISTE",
      "KISTEN"
  ],
  "METHOD": [
      "DIE",
      "METHODE",
      "METHODEN"
  ],
  "REFERENCE": [
      "DIE",
      "REFERENZ",
      "REFERENZEN"
  ],
  "DISGUST": [
      "DER",
      "EKEL",
      "EKELT"
  ],
  "LIQUOR": [
      "DIE",
      "FLOTTE",
      "FLOTTEN"
  ],
  "LIPSTICK": [
      "DER",
      "LIPPENSTIFT",
      "LIPPENSTIFTE"
  ],
  "CORE": [
      "DER",
      "KERN",
      "KERNE"
  ],
  "INDIVIDUAL": [
      "DER",
      "EINZELNE",
      "PERSONEN"
  ],
  "CONTAINER": [
      "DER",
      "CONTAINER",
      "BEHÄLTER"
  ],
  "WHORE": [
      "DIE",
      "HURE",
      "HUREN"
  ],
  "INFANT": [
      "DAS",
      "KLEINKIND",
      "SÄUGLINGE"
  ],
  "SUNGLASSES": [
      "DIE",
      "SONNENBRILLE",
      "SONNENBRILLEN"
  ],
  "HOSE": [
      "DER",
      "SCHLAUCH",
      "SCHLÄUCHE"
  ],
  "CONCERT": [
      "DAS",
      "KONZERT",
      "KONZERTE"
  ],
  "BULLSHIT": [
      "DAS",
      "BULLSHIT",
      "BULLSHITS"
  ],
  "RAILROAD": [
      "DIE",
      "EISENBAHN",
      "EISENBAHNEN"
  ],
  "PARADE": [
      "DIE",
      "PARADE",
      "PARADEN"
  ],
  "COMPARTMENT": [
      "DAS",
      "FACH",
      "FÄCHER"
  ],
  "RESIDENT": [
      "DER",
      "BEWOHNER",
      "BEWOHNER"
  ],
  "OVEN": [
      "DER",
      "BACKOFEN",
      "BACKÖFEN"
  ],
  "TECHNICIAN": [
      "DER",
      "TECHNIKER",
      "TECHNIKER"
  ],
  "PROCEDURE": [
      "DAS",
      "VERFAHREN",
      "VERFAHREN"
  ],
  "FIGHTER": [
      "DER",
      "KÄMPFER",
      "KÄMPFER"
  ],
  "GRAIN": [
      "DAS",
      "KORN",
      "KÖRNER"
  ],
  "PICNIC": [
      "DAS",
      "PICKNICK",
      "PICKNICKS"
  ],
  "TRIBE": [
      "DER",
      "STAMM",
      "STÄMME"
  ],
  "BUD": [
      "DIE",
      "KNOSPE",
      "KNOSPEN"
  ],
  "MEADOW": [
      "DIE",
      "WIESE",
      "WIESEN"
  ],
  "PUBLIC": [
      "DIE",
      "ÖFFENTLICHKEIT",
      "ÖFFENTLICHKEIT"
  ],
  "POISON": [
      "DAS",
      "GIFT",
      "GIFTE"
  ],
  "BUFFALO": [
      "DER",
      "BÜFFEL",
      "BÜFFEL"
  ],
  "REGION": [
      "DIE",
      "REGION",
      "REGIONEN"
  ],
  "PRODUCTION": [
      "DIE",
      "PRODUKTION",
      "PRODUKTIONEN"
  ],
  "RUNNING": [
      "DAS",
      "RENNEN",
      "VORLAUF"
  ],
  "LOOP": [
      "DIE",
      "SCHLEIFE",
      "SCHLAUFEN"
  ],
  "SLEEPING": [
      "DER",
      "SCHLAF",
      "ÜBERNACHTUNGSPLÄTZEN"
  ],
  "SODA": [
      "DIE",
      "SODA",
      "LIMONADEN"
  ],
  "OWL": [
      "DIE",
      "EULE",
      "EULEN"
  ],
  "MENU": [
      "DAS",
      "MENÜ",
      " MENÜS"
  ],
  "KICK": [
      "DER",
      "KICK",
      "TRITTE"
  ],
  "RUIN": [
      "DIE",
      "RUINE",
      "RUINEN"
  ],
  "RAMP": [
      "DIE",
      "RAMPE",
      "RAMPEN"
  ],
  "STREAK": [
      "DER",
      "STREIFEN",
      "STREIFEN"
  ],
  "FOREARM": [
      "DER",
      "UNTERARM",
      "UNTERARME"
  ],
  "BUREAU": [
      "DAS",
      "BÜRO",
      "BÜROS"
  ],
  "KNUCKLE": [
      "DER",
      "ACHSSCHENKEL",
      "KNÖCHEL"
  ],
  "GOOSE": [
      "DIE",
      "GANS",
      "GÄNSE"
  ],
  "ADVANCE": [
      "DER",
      "VORMARSCH",
      "FORTSCHRITTE"
  ],
  "FAIRY": [
      "DIE",
      "FEE",
      "FEEN"
  ],
  "ILLNESS": [
      "DIE",
      "KRANKHEIT",
      "KRANKHEITEN"
  ],
  "SQUAD": [
      "DIE",
      "MANNSCHAFT",
      "MANNSCHAFTEN"
  ],
  "OFFICIAL": [
      "DAS",
      "OFFIZIELLE",
      "BEAMTEN"
  ],
  "BRAND": [
      "DIE",
      "MARKE",
      "MARKEN"
  ],
  "ORGAN": [
      "DIE",
      "ORGEL",
      "ORGANE"
  ],
  "BUTTERFLY": [
      "DER",
      "SCHMETTERLING",
      "SCHMETTERLINGE"
  ],
  "EMPIRE": [
      "DAS",
      "REICH",
      "REICHE"
  ],
  "PROFILE": [
      "DAS",
      "PROFIL",
      "PROFILE"
  ],
  "LIBERTY": [
      "DIE",
      "FREIHEIT",
      "FREIHEITEN"
  ],
  "DISBELIEF": [
      "DER",
      "UNGLAUBE",
      "UNGLAUBEN"
  ],
  "GROVE": [
      "DER",
      "HAIN",
      "HAINE"
  ],
  "SHIELD": [
      "DAS",
      "SCHILD",
      "SCHILDE"
  ],
  "SADDLE": [
      "DER",
      "SATTEL",
      "SÄTTEL"
  ],
  "ODDS": [
      "DIE",
      "CHANCEN",
      "ODDSES"
  ],
  "CLUSTER": [
      "DIE",
      "CLUSTER",
      "CLUSTER"
  ],
  "SATELLITE": [
      "DER",
      "SATELLIT",
      "SATELLITEN"
  ],
  "TRIGGER": [
      "DER",
      "ABZUG",
      "AUSLÖSER"
  ],
  "PUPPY": [
      "DER",
      "WELPE",
      "WELPEN"
  ],
  "WAITING": [
      "DIE",
      "WARTE",
      "ERWARTUNGEN"
  ],
  "BULB": [
      "DIE",
      "GLÜHBIRNE",
      "ZWIEBELN"
  ],
  "DRESSER": [
      "DIE",
      "KOMMODE",
      "KOMMODEN"
  ],
  "PATROL": [
      "DIE",
      "PATROUILLE",
      "PATROUILLEN"
  ],
  "EAGLE": [
      "DER",
      "ADLER",
      "ADLER"
  ],
  "PRIVACY": [
      "DER",
      "PRIVATSPHÄRE",
      "PRIVATSPHÄREN"
  ],
  "FLUID": [
      "DAS",
      "FLUID",
      "FLUIDE"
  ],
  "HERD": [
      "DIE",
      "HERDE",
      "HERDEN"
  ],
  "HEADACHE": [
      "DER",
      "KOPFSCHMERZ",
      "KOPFSCHMERZEN"
  ],
  "AMUSEMENT": [
      "DER",
      "VERGNÜGUNGSPARK",
      "VERGNÜGUNGEN"
  ],
  "WHEELCHAIR": [
      "DER",
      "ROLLSTUHL",
      "ROLLSTÜHLE"
  ],
  "POLICY": [
      "DIE",
      "RICHTLINIE",
      "POLITIK"
  ],
  "BELLE": [
      "DAS",
      "BELLE",
      "BELLES"
  ],
  "TOBACCO": [
      "DIE",
      "TABAK",
      "TABAKE"
  ],
  "SETTING": [
      "DIE",
      "EINSTELLUNG",
      "EINSTELLUNGEN"
  ],
  "TATTOO": [
      "DIE",
      "TÄTOWIERUNG",
      "TATTOOS"
  ],
  "BURDEN": [
      "DIE",
      "LAST",
      "LASTEN"
  ],
  "MERCHANT": [
      "DER",
      "HÄNDLER",
      "KAUFLEUTE"
  ],
  "SLIDE": [
      "DIE",
      "RUTSCHE",
      "SCHIEBER"
  ],
  "STAIN": [
      "DER",
      "FLECK",
      "FLECK"
  ],
  "EATING": [
      "DAS",
      "ESSEN",
      "EATINGS"
  ],
  "BOND": [
      "DIE",
      "BINDUNG",
      "ANLEIHEN"
  ],
  "SWIMMING": [
      "DAS",
      "SCHWIMMEN",
      "SWIMMING"
  ],
  "FOUNDATION": [
      "DIE",
      "GRUNDLAGE",
      "GRUNDLAGEN"
  ],
  "INJURY": [
      "DIE",
      "VERLETZUNG",
      "VERLETZUNGEN"
  ],
  "LEAGUE": [
      "DIE",
      "LIGA",
      "LIGEN"
  ],
  "BATTERY": [
      "DIE",
      "BATTERIE",
      "BATTERIEN"
  ],
  "UMBRELLA": [
      "DER",
      "REGENSCHIRM",
      "REGENSCHIRME"
  ],
  "EMPEROR": [
      "DER",
      "KAISER",
      "KAISER"
  ],
  "PIER": [
      "DER",
      "PIER",
      "PFEILER"
  ],
  "TAP": [
      "DER",
      "WASSERHAHN",
      "WASSERHÄHNE"
  ],
  "WIT": [
      "DER",
      "WITZ",
      "VERSTAND"
  ],
  "CUTTER": [
      "DER",
      "CUTTER",
      "SCHNEIDWERKZEUGE"
  ],
  "ATTIC": [
      "DER",
      "DACHBODEN",
      "DACHBÖDEN"
  ],
  "TIGER": [
      "DER",
      "TIGER",
      "TIGER"
  ],
  "PAL": [
      "DIE",
      "PAL",
      "KUMPELS"
  ],
  "ANCESTOR": [
      "DER",
      "VORFAHR",
      "VORFAHREN"
  ],
  "CONCENTRATION": [
      "DIE",
      "KONZENTRATION",
      "KONZENTRATIONEN"
  ],
  "MOUNT": [
      "DER",
      "BERG",
      "BERGE"
  ],
  "EXPENSE": [
      "DER",
      "AUFWAND",
      "KOSTEN"
  ],
  "BLESSING": [
      "DER",
      "SEGEN",
      "SEGNUNGEN"
  ],
  "LEAVE": [
      "DER",
      "URLAUB",
      "URLAUBE"
  ],
  "LEDGE": [
      "DIE",
      "LEISTE",
      "LEISTEN"
  ],
  "TORCH": [
      "DIE",
      "FACKEL",
      "FACKELN"
  ],
  "INK": [
      "DIE",
      "TINTEN",
      "TINTEN"
  ],
  "PLOT": [
      "DIE",
      "HANDLUNG",
      "HANDLUNGEN"
  ],
  "RENT": [
      "DIE",
      "MIETE",
      "MIETEN"
  ],
  "MULE": [
      "DAS",
      "MAULTIER",
      "MAULTIERE"
  ],
  "ARCH": [
      "DER",
      "BOGEN",
      "BÖGEN"
  ],
  "ENVIRONMENT": [
      "DIE",
      "UMGEBUNG",
      "UMGEBUNGEN"
  ],
  "FROWN": [
      "DAS",
      "STIRNRUNZELN",
      "STIRN RUNZELT"
  ],
  "INSPECTOR": [
      "DER",
      "INSPEKTOR",
      "INSPEKTOREN"
  ],
  "MIDST": [
      "DIE",
      "MITTEN",
      "MIDSTS"
  ],
  "EMBARRASSMENT": [
      "DIE",
      "VERLEGENHEIT",
      "PEINLICHKEITEN"
  ],
  "COMPLAINT": [
      "DIE",
      "BESCHWERDE",
      "BESCHWERDEN"
  ],
  "PORTION": [
      "DIE",
      "PORTION",
      "PORTIONEN"
  ],
  "CHUCK": [
      "DAS",
      "SPANNFUTTER",
      "SPANN"
  ],
  "CLEARING": [
      "DIE",
      "CLEARING",
      "LICHTUNGEN"
  ],
  "CRISIS": [
      "DIE",
      "KRISE",
      "KRISEN"
  ],
  "NECKLACE": [
      "DIE",
      "HALSKETTE",
      "HALSKETTEN"
  ],
  "LANTERN": [
      "DIE",
      "LATERNE",
      "LATERNEN"
  ],
  "WEALTH": [
      "DER",
      "REICHTUM",
      "REICHTÜMER"
  ],
  "MURDERER": [
      "DER",
      "MÖRDER",
      "MÖRDER"
  ],
  "CIVILIZATION": [
      "DIE",
      "ZIVILISATION",
      "ZIVILISATIONEN"
  ],
  "CONCEPT": [
      "DAS",
      "KONZEPT",
      "KONZEPTE"
  ],
  "LAMB": [
      "DAS",
      "LAMM",
      "LÄMMER"
  ],
  "STRIDE": [
      "DIE",
      "SCHRITT",
      "SCHRITTE"
  ],
  "CUFF": [
      "DIE",
      "MANSCHETTE",
      "MANSCHETTEN"
  ],
  "VIRGIN": [
      "DIE",
      "JUNGFRAU",
      "JUNGFRAUEN"
  ],
  "SQUIRREL": [
      "DAS",
      "EICHHÖRNCHEN",
      "EICHHÖRNCHEN"
  ],
  "BABE": [
      "DAS",
      "KIND",
      "KINDER"
  ],
  "STARLING": [
      "DER",
      "STAR",
      "STARS"
  ],
  "DEPRESSION": [
      "DIE",
      "DEPRESSION",
      "VERTIEFUNGEN"
  ],
  "STORAGE": [
      "DAS",
      "SPEICHER",
      "SPEICHER"
  ],
  "ALTAR": [
      "DER",
      "ALTAR",
      "ALTÄRE"
  ],
  "TRAGEDY": [
      "DIE",
      "TRAGÖDIE",
      "TRAGÖDIEN"
  ],
  "RESOURCE": [
      "DIE",
      "RESSOURCE",
      "RESSOURCEN"
  ],
  "TRAVELER": [
      "DER",
      "REISENDE",
      "REISENDEN"
  ],
  "TRUST": [
      "DAS",
      "VERTRAUEN",
      "TRUSTS"
  ],
  "ARC": [
      "DIE",
      "BOGEN",
      "BÖGEN"
  ],
  "KINGDOM": [
      "DAS",
      "KÖNIGREICH",
      "KÖNIGREICHE"
  ],
  "JEWEL": [
      "DAS",
      "JUWEL",
      "JUWELEN"
  ],
  "MUSICIAN": [
      "DER",
      "MUSIKER",
      "MUSIKER"
  ],
  "AIRPLANE": [
      "DAS",
      "FLUGZEUG",
      "FLUGZEUGE"
  ],
  "JUNK": [
      "DIE",
      "JUNK",
      "DSCHUNKEN"
  ],
  "SUNSHINE": [
      "DER",
      "SONNENSCHEIN",
      "SONNE SCHEINT"
  ],
  "LAD": [
      "DER",
      "KNABE",
      "JUNGS"
  ],
  "ELF": [
      "DER",
      "ELF",
      "ELFEN"
  ],
  "PROTEST": [
      "DER",
      "PROTEST",
      "PROTESTE"
  ],
  "HUNT": [
      "DIE",
      "JAGD",
      "JAGDEN"
  ],
  "EXECUTIVE": [
      "DIE",
      "EXEKUTIVE",
      "FÜHRUNGSKRÄFTE"
  ],
  "DIARY": [
      "DAS",
      "TAGEBUCH",
      "TAGEBÜCHER"
  ],
  "ASPECT": [
      "DAS",
      "ASPEKT",
      "ASPEKTE"
  ],
  "DIAL": [
      "DAS",
      "ZIFFERBLATT",
      "ZIFFERBLÄTTER"
  ],
  "SLIPPER": [
      "DER",
      "HAUSSCHUH",
      "PANTOFFELN"
  ],
  "ACTRESS": [
      "DIE",
      "SCHAUSPIELERIN",
      "SCHAUSPIELERINNEN"
  ],
  "SHOOTING": [
      "DAS",
      "SHOOTING",
      "DREHARBEITEN"
  ],
  "EARRING": [
      "DER",
      "OHRRING",
      "OHRRINGE"
  ],
  "ANT": [
      "DIE",
      "AMEISE",
      "AMEISEN"
  ],
  "PATTY": [
      "DIE",
      "PATTY",
      "BRATLINGE"
  ],
  "SAUCE": [
      "DIE",
      "SAUCE",
      "SOSSEN"
  ],
  "MISSILE": [
      "DIE",
      "RAKETE",
      "RAKETEN"
  ],
  "INTENSITY": [
      "DIE",
      "INTENSITÄT",
      "INTENSITÄTEN"
  ],
  "DITCH": [
      "DER",
      "GRABEN",
      "GRÄBEN"
  ],
  "DAISY": [
      "DAS",
      "GÄNSEBLÜMCHEN",
      "DAS+GÄNSEBLÜMCHEN"
  ],
  "CHAPEL": [
      "DIE",
      "KAPELLE",
      "KAPELLEN"
  ],
  "SWAMP": [
      "DER",
      "SUMPF",
      "SÜMPFE"
  ],
  "RELATION": [
      "DIE",
      "BEZIEHUNG",
      "BEZIEHUNGEN"
  ],
  "GUESS": [
      "DIE",
      "VERMUTUNG",
      "VERMUTUNGEN"
  ],
  "CRANE": [
      "DER",
      "KRAN",
      "KRÄNE"
  ],
  "ENCOUNTER": [
      "DIE",
      "BEGEGNUNG",
      "BEGEGNUNGEN"
  ],
  "SEQUENCE": [
      "DIE",
      "SEQUENZ",
      "SEQUENZEN"
  ],
  "FRAGMENT": [
      "DAS",
      "FRAGMENT",
      "FRAGMENTE"
  ],
  "DRAFT": [
      "DER",
      "ENTWURF",
      "ENTWÜRFE"
  ],
  "DINER": [
      "DAS",
      "DINER",
      "DINERS"
  ],
  "FUNCTION": [
      "DIE",
      "FUNKTION",
      "FUNKTIONEN"
  ],
  "ORGANIZATION": [
      "DIE",
      "ORGANISATION",
      "ORGANISATIONEN"
  ],
  "SKELETON": [
      "DAS",
      "SKELETT",
      "SKELETTE"
  ],
  "MISERY": [
      "DAS",
      "ELEND",
      "DAS ELEND"
  ],
  "HERB": [
      "DAS",
      "KRAUT",
      "KRÄUTER"
  ],
  "STUMP": [
      "DER",
      "STUMPF",
      "STÜMPFE"
  ],
  "STAKE": [
      "DER",
      "EINSATZ",
      "EINSÄTZE"
  ],
  "PUFF": [
      "DIE",
      "PUFF",
      "WINDBEUTEL"
  ],
  "CREATION": [
      "DIE",
      "KREATION",
      "KREATIONEN"
  ],
  "WAKE": [
      "DAS",
      "GEFOLGE",
      "TOTENWACHE"
  ],
  "WIZARD": [
      "DER",
      "ZAUBERER",
      "ZAUBERER"
  ],
  "MAT": [
      "DIE",
      "MATTE",
      "MATTEN"
  ],
  "SEAL": [
      "DIE",
      "DICHTUNG",
      "DICHTUNGEN"
  ],
  "TWILIGHT": [
      "DAS",
      "ZWIELICHT",
      "DÄMMERUNGEN"
  ],
  "GRUNT": [
      "DAS",
      "GRUNZEN",
      "DAS+GRUNZEN"
  ],
  "PUNISHMENT": [
      "DIE",
      "STRAFE",
      "STRAFE"
  ],
  "CLAN": [
      "DER",
      "CLAN",
      "CLANS"
  ],
  "COPPER": [
      "DAS",
      "KUPFER",
      "KUPFER"
  ],
  "DEBRIS": [
      "DIE",
      "TRÜMMER",
      "DEBRISES"
  ],
  "PAINTER": [
      "DER",
      "MALER",
      "MALER"
  ],
  "STEERING": [
      "DAS",
      "STEUER",
      "LENKUNGEN"
  ],
  "MATH": [
      "DIE",
      "MATHEMATIK",
      "MATHEMATIK"
  ],
  "RECOGNITION": [
      "DIE",
      "ERKENNUNG",
      "ANERKENNUNGEN"
  ],
  "TEMPER": [
      "DIE",
      "STIMMUNG",
      "STIMMUNG"
  ],
  "REGRET": [
      "DAS",
      "BEDAUERN",
      "REUE"
  ],
  "DESTINATION": [
      "DAS",
      "ZIEL",
      "ZIELE"
  ],
  "MILL": [
      "DIE",
      "MÜHLE",
      "MÜHLEN"
  ],
  "ERROR": [
      "DER",
      "FEHLER",
      "FEHLER"
  ],
  "ROMANCE": [
      "DIE",
      "ROMANTIK",
      "ROMANE"
  ],
  "TOPIC": [
      "DAS",
      "THEMA",
      "THEMEN"
  ],
  "PATIO": [
      "DIE",
      "TERRASSE",
      "INNENHÖFE"
  ],
  "SHOVEL": [
      "DIE",
      "SCHAUFEL",
      "SCHÄUFELEN"
  ],
  "PAJAMAS": [
      "DIE",
      "SCHLAFANZÜGE",
      "PAJAMASES"
  ],
  "EMAIL": [
      "DIE",
      "EMAIL",
      "EMAILS"
  ],
  "PIGEON": [
      "DIE",
      "TAUBE",
      "TAUBEN"
  ],
  "DINOSAUR": [
      "DER",
      "DINOSAURIER",
      "DINOSAURIER"
  ],
  "INDUSTRY": [
      "DIE",
      "BRANCHE",
      "BRANCHEN"
  ],
  "OPERATOR": [
      "DER",
      "BETREIBER",
      "BETREIBER"
  ],
  "LIFT": [
      "DER",
      "LIFT",
      "LIFTE"
  ],
  "COUNSELOR": [
      "DER",
      "RATGEBER",
      "BERATER"
  ],
  "GATHERING": [
      "DIE",
      "VERSAMMLUNG",
      "VERSAMMLUNGEN"
  ],
  "PRINCIPLE": [
      "DAS",
      "PRINZIP",
      "PRINZIPIEN"
  ],
  "DRAMA": [
      "DAS",
      "DRAMA",
      "DRAMEN"
  ],
  "CHICK": [
      "DAS",
      "KÜKEN",
      "KÜKEN"
  ],
  "CHART": [
      "DAS",
      "DIAGRAMM",
      "DIAGRAMME"
  ],
  "CAMPAIGN": [
      "DIE",
      "KAMPAGNE",
      "KAMPAGNEN"
  ],
  "LAUREL": [
      "DER",
      "LORBEER",
      "LORBEEREN"
  ],
  "STEAK": [
      "DAS",
      "STEAK",
      "STEAKS"
  ],
  "CRIMINAL": [
      "DER",
      "KRIMINELLE",
      "VERBRECHER"
  ],
  "GLOBE": [
      "DER",
      "GLOBUS",
      "KUGELN"
  ],
  "BRUISE": [
      "DER",
      "BLUTERGUSS",
      "BLAUEN FLECKEN"
  ],
  "KNOB": [
      "DER",
      "KNOPF",
      "NOPPEN"
  ],
  "KILLING": [
      "DAS",
      "TÖTEN",
      "MORDE"
  ],
  "SWEETHEART": [
      "DER",
      "SCHATZ",
      "SCHÄTZE"
  ],
  "OPERA": [
      "DIE",
      "OPER",
      "OPERN"
  ],
  "FROST": [
      "DER",
      "FROST",
      "FRÖSTE"
  ],
  "NIPPLE": [
      "DER",
      "NIPPEL",
      "BRUSTWARZEN"
  ],
  "REVEREND": [
      "DER",
      "PFARRER",
      "PASTOREN"
  ],
  "HAZE": [
      "DIE",
      "TRÜBUNG",
      "TRÜBUNGEN"
  ],
  "FLOOD": [
      "DAS",
      "HOCHWASSER",
      "FLUTEN"
  ],
  "CAROL": [
      "DAS",
      "WEIHNACHTSLIED",
      "WEIHNACHTSLIEDER"
  ],
  "WEAKNESS": [
      "DIE",
      "SCHWÄCHE",
      "SCHWÄCHEN"
  ],
  "COOKING": [
      "DAS",
      "KOCHEN",
      "COOKINGS"
  ],
  "BUTCHER": [
      "DER",
      "METZGER",
      "METZGER"
  ],
  "CUBE": [
      "DER",
      "WÜRFEL",
      "WÜRFEL"
  ],
  "CELLAR": [
      "DER",
      "KELLER",
      "KELLER"
  ],
  "HOLLOW": [
      "DER",
      "HOHL",
      "HOHLRÄUME"
  ],
  "BUMP": [
      "DER",
      "HÖCKER",
      "HÖCKER"
  ],
  "HALT": [
      "DER",
      "HALT",
      "HALTEPUNKTE"
  ],
  "HAY": [
      "DAS",
      "HEU",
      "HAYS"
  ],
  "BARK": [
      "DIE",
      "RINDE",
      "RINDEN"
  ],
  "SURVIVAL": [
      "DIE",
      "ÜBERLEBENS",
      "ÜBERRESTE"
  ],
  "BUNK": [
      "DIE",
      "ETAGEN",
      "KOJEN"
  ],
  "BEND": [
      "DIE",
      "BIEGUNG",
      "BIEGUNGEN"
  ],
  "APPROVAL": [
      "DIE",
      "FREIGABE",
      "ZULASSUNGEN"
  ],
  "DIVISION": [
      "DER",
      "UNTERNEHMENSBEREICH",
      "ABTEILUNGEN"
  ],
  "COCKTAIL": [
      "DER",
      "COCKTAIL",
      "COCKTAILS"
  ],
  "CONTEST": [
      "DER",
      "WETTBEWERB",
      "WETTBEWERBE"
  ],
  "PARADISE": [
      "DAS",
      "PARADIES",
      "PARADIESE"
  ],
  "RAZOR": [
      "DAS",
      "RASIERMESSER",
      "RASIERER"
  ],
  "CATCH": [
      "DER",
      "FANG",
      "FÄNGE"
  ],
  "BLOSSOM": [
      "DIE",
      "BLÜTE",
      "BLÜTEN"
  ],
  "PUDDLE": [
      "DIE",
      "PFÜTZE",
      "PFÜTZEN"
  ],
  "ELECTRICITY": [
      "DER",
      "STROM",
      "STRÖME"
  ],
  "ONION": [
      "DIE",
      "ZWIEBEL",
      "ZWIEBELN"
  ],
  "LASER": [
      "DIE",
      "LASER",
      "LASER"
  ],
  "CUSHION": [
      "DAS",
      "KISSEN",
      "KISSEN"
  ],
  "INFLUENCE": [
      "DER",
      "EINFLUSS",
      "EINFLÜSSE"
  ],
  "JUMP": [
      "DER",
      "SPRUNG",
      "SPRÜNGE"
  ],
  "CEMENT": [
      "DER",
      "ZEMENT",
      "ZEMENTE"
  ],
  "AMBER": [
      "DIE",
      "GELBE",
      "DAS+AMBERS"
  ],
  "GODDESS": [
      "DIE",
      "GÖTTIN",
      "GÖTTINNEN"
  ],
  "SHACK": [
      "DAS",
      "SHACK",
      "BARACKEN"
  ],
  "SALES": [
      "DIE",
      "VERKÄUFE",
      "SALESES"
  ],
  "DRIFT": [
      "DIE",
      "DRIFT",
      "DRIFTS"
  ],
  "FIGHTING": [
      "DIE",
      "KÄMPFE",
      "KÄMPFE"
  ],
  "BRAID": [
      "DAS",
      "GEFLECHT",
      "ZÖPFE"
  ],
  "THEME": [
      "DAS",
      "THEMA",
      "THEMEN"
  ],
  "DIGNITY": [
      "DIE",
      "WÜRDE",
      "WÜRDEN"
  ],
  "LEMON": [
      "DIE",
      "ZITRONE",
      "ZITRONEN"
  ],
  "CLOWN": [
      "DER",
      "CLOWN",
      "CLOWNS"
  ],
  "ASSAULT": [
      "DER",
      "ANGRIFF",
      "ANGRIFFE"
  ],
  "GOGGLE": [
      "DIE",
      "BRILLE",
      "SCHUTZBRILLEN"
  ],
  "DESTRUCTION": [
      "DIE",
      "ZERSTÖRUNG",
      "ZERSTÖRUNGEN"
  ],
  "EXCEPTION": [
      "DIE",
      "AUSNAHME",
      "AUSNAHMEN"
  ],
  "PEACH": [
      "DER",
      "PFIRSICH",
      "PFIRSICHE"
  ],
  "WASH": [
      "DIE",
      "WASCH",
      "WASCH"
  ],
  "RELEASE": [
      "DIE",
      "BEFREIUNG",
      "FREIGABEN"
  ],
  "SPY": [
      "DER",
      "SPION",
      "SPIONE"
  ],
  "TAG": [
      "DIE",
      "TAG",
      "TAGE"
  ],
  "BRA": [
      "DER",
      "BH",
      "BHS"
  ],
  "DEBT": [
      "DIE",
      "SCHULD",
      "SCHULDEN"
  ],
  "TERRACE": [
      "DIE",
      "TERRASSE",
      "TERRASSEN"
  ],
  "REMAINS": [
      "DIE",
      "ÜBERBLEIBSEL",
      "REMAINSES"
  ],
  "LOGIC": [
      "DIE",
      "LOGIK",
      "LOGIK"
  ],
  "JOINT": [
      "DER",
      "JOINT",
      "GELENKE"
  ],
  "PITCHER": [
      "DER",
      "KRUG",
      "KRÜGE"
  ],
  "PERSPECTIVE": [
      "DIE",
      "PERSPEKTIVE",
      "PERSPEKTIVEN"
  ],
  "CROP": [
      "DIE",
      "ERNTE",
      "ERNTEN"
  ],
  "GRADUATE": [
      "DER",
      "DIPLOM",
      "DIPLOME"
  ],
  "CHORUS": [
      "DER",
      "CHOR",
      "CHÖRE"
  ],
  "SURVIVOR": [
      "DER",
      "ÜBERLEBENDE",
      "ÜBERLEBENDEN"
  ],
  "PAYMENT": [
      "DIE",
      "BEZAHLUNG",
      "ZAHLUNGEN"
  ],
  "BET": [
      "DIE",
      "WETTE",
      "WETTEN"
  ],
  "REVENGE": [
      "DIE",
      "RACHE",
      "RACHE"
  ],
  "PLAZA": [
      "DER",
      "PLATZ",
      "PLÄTZE"
  ],
  "ELDER": [
      "DER",
      "ÄLTERE",
      "ÄLTESTEN"
  ],
  "GINGER": [
      "DER",
      "INGWER",
      "INGWER"
  ],
  "SURGEON": [
      "DER",
      "CHIRURG",
      "CHIRURGEN"
  ],
  "DASH": [
      "DER",
      "BINDESTRICH",
      "STRICHE"
  ],
  "SANDAL": [
      "DIE",
      "SANDALE",
      "SANDALEN"
  ],
  "HATRED": [
      "DER",
      "HASS",
      "HASS"
  ],
  "DEPARTURE": [
      "DIE",
      "ABFAHRT",
      "ABFAHRTEN"
  ],
  "OUTLINE": [
      "DER",
      "UMRISS",
      "UMRISSE"
  ],
  "RAVEN": [
      "DER",
      "RABE",
      "RABEN"
  ],
  "RUNNER": [
      "DER",
      "LÄUFER",
      "LÄUFER"
  ],
  "ANTICIPATION": [
      "DIE",
      "VORFREUDE",
      "ERWARTUNGEN"
  ],
  "TRANSLATION": [
      "DIE",
      "ÜBERSETZUNG",
      "ÜBERSETZUNGEN"
  ],
  "HEADQUARTERS": [
      "DAS",
      "HAUPTQUARTIER",
      "HEADQUARTERSES"
  ],
  "CELEBRATION": [
      "DIE",
      "FEIER",
      "FEIERN"
  ],
  "AGONY": [
      "DIE",
      "QUAL",
      "QUALEN"
  ],
  "SNEAKERS": [
      "DIE",
      "TURNSCHUHE",
      "SNEAKERSES"
  ],
  "TERMINAL": [
      "DAS",
      "TERMINAL",
      "ENDGERÄTE"
  ],
  "EXPECTATION": [
      "DIE",
      "ERWARTUNG",
      "ERWARTUNGEN"
  ],
  "PASTURE": [
      "DIE",
      "WEIDE",
      "WEIDEN"
  ],
  "CONSOLE": [
      "DIE",
      "KONSOLE",
      "KONSOLEN"
  ],
  "STRIKE": [
      "DER",
      "STREIK",
      "STREIKS"
  ],
  "RESCUE": [
      "DIE",
      "RETTUNG",
      "RETTUNGSAKTIONEN"
  ],
  "BADGE": [
      "DAS",
      "ABZEICHEN",
      "BADGES"
  ],
  "FUND": [
      "DER",
      "FONDS",
      "MITTEL"
  ],
  "TRY": [
      "DER",
      "VERSUCH",
      "VERSUCHE"
  ],
  "FOYER": [
      "DAS",
      "FOYER",
      "FOYEIES"
  ],
  "PASTOR": [
      "DER",
      "PASTOR",
      "PASTOREN"
  ],
  "EMBRACE": [
      "DIE",
      "UMARMUNG",
      "UMARMUNGEN"
  ],
  "PUZZLE": [
      "DAS",
      "PUZZLE",
      "RÄTSEL"
  ],
  "CANAL": [
      "DER",
      "KANAL",
      "KANÄLE"
  ],
  "CHARITY": [
      "DIE",
      "WOHLFAHRT",
      "WOHLTÄTIGKEITSORGANISATIONEN"
  ],
  "PRINCIPAL": [
      "DER",
      "DIREKTOR",
      "AUFTRAGGEBER"
  ],
  "APPLAUSE": [
      "DER",
      "APPLAUS",
      "BEIFALL"
  ],
  "PHILOSOPHY": [
      "DIE",
      "PHILOSOPHIE",
      "PHILOSOPHIEN"
  ],
  "TRENCH": [
      "DER",
      "GRABEN",
      "GRÄBEN"
  ],
  "UP": [
      "DIE",
      "BIS",
      "HÖHEN"
  ],
  "NEPHEW": [
      "DER",
      "NEFFE",
      "NEFFEN"
  ],
  "ESSAY": [
      "DER",
      "AUFSATZ",
      "AUFSÄTZE"
  ],
  "REPAIR": [
      "DIE",
      "REPARATUR",
      "REPARATUR"
  ],
  "MIX": [
      "DER",
      "MIX",
      "MIXS"
  ],
  "MOB": [
      "DER",
      "MOB",
      "MOBS"
  ],
  "BARRIER": [
      "DIE",
      "BARRIERE",
      "BARRIEREN"
  ],
  "DISK": [
      "DIE",
      "PLATTE",
      "SCHEIBEN"
  ],
  "GOODNESS": [
      "DIE",
      "GÜTE",
      "GOODNESSES"
  ],
  "SCOUT": [
      "DER",
      "SCOUT",
      "PFADFINDER"
  ],
  "IMPORTANCE": [
      "DIE",
      "WICHTIGKEIT",
      "WICHTIGKEITEN"
  ],
  "DESTINY": [
      "DAS",
      "SCHICKSAL",
      "SCHICKSALE"
  ],
  "AID": [
      "DIE",
      "BEIHILFEN",
      "BEIHILFEN"
  ],
  "MICROPHONE": [
      "DAS",
      "MIKROFON",
      "MIKROFONE"
  ],
  "LABEL": [
      "DAS",
      "ETIKETT",
      "ETIKETTEN"
  ],
  "PEPPER": [
      "DER",
      "PFEFFER",
      "PAPRIKA"
  ],
  "COYOTE": [
      "DER",
      "KOJOTE",
      "KOJOTEN"
  ],
  "TEACHING": [
      "DAS",
      "LEHREN",
      "LEHREN"
  ],
  "BURN": [
      "DER",
      "BRENNVORGANG",
      "VERBRENNUNGEN"
  ],
  "VEST": [
      "DIE",
      "WESTE",
      "WESTEN"
  ],
  "PONY": [
      "DAS",
      "PONY",
      "PONYS"
  ],
  "DONKEY": [
      "DER",
      "ESEL",
      "ESEL"
  ],
  "CYCLE": [
      "DER",
      "KREISLAUF",
      "ZYKLEN"
  ],
  "GASP": [
      "DAS",
      "KEUCHEN",
      "KEUCHEN"
  ],
  "IRONY": [
      "DIE",
      "IRONIE",
      "IRONIEN"
  ],
  "AWARD": [
      "DIE",
      "AUSZEICHNUNG",
      "AUSZEICHNUNGEN"
  ],
  "GRAPE": [
      "DIE",
      "TRAUBE",
      "TRAUBEN"
  ],
  "HESITATION": [
      "DAS",
      "ZÖGERN",
      "BEDENKEN"
  ],
  "TAVERN": [
      "DIE",
      "TAVERNE",
      "TAVERNEN"
  ],
  "CHORE": [
      "DIE",
      "LÄSTIGE",
      "HAUSARBEITEN"
  ],
  "SPHERE": [
      "DIE",
      "KUGEL",
      "KUGELN"
  ],
  "SAIL": [
      "DAS",
      "SEGEL",
      "SEGEL"
  ],
  "SILHOUETTE": [
      "DIE",
      "SILHOUETTE",
      "SILHOUETTEN"
  ],
  "INSTITUTE": [
      "DAS",
      "INSTITUT",
      "INSTITUTE"
  ],
  "LIAR": [
      "DER",
      "LÜGNER",
      "LÜGNER"
  ],
  "TECHNIQUE": [
      "DIE",
      "TECHNIK",
      "TECHNIKEN"
  ],
  "INDEX": [
      "DER",
      "INDEX",
      "INDEXS"
  ],
  "PLANK": [
      "DAS",
      "BRETT",
      "BRETTER"
  ],
  "JERK": [
      "DER",
      "RUCK",
      "IDIOTEN"
  ],
  "GROWTH": [
      "DAS",
      "WACHSTUM",
      "WUCHERUNGEN"
  ],
  "STOCKING": [
      "DER",
      "STRUMPF",
      "STRÜMPFE"
  ],
  "BLACKNESS": [
      "DIE",
      "SCHWÄRZE",
      "SCHWÄRZEN"
  ],
  "TEEN": [
      "DER",
      "TEENAGER",
      "JUGENDLICHEN"
  ],
  "BRACELET": [
      "DAS",
      "ARMBAND",
      "ARMBÄNDER"
  ],
  "JELLY": [
      "DAS",
      "GELEE",
      "GELEES"
  ],
  "DIET": [
      "DIE",
      "DIÄT",
      "DIÄTEN"
  ],
  "BEEF": [
      "DAS",
      "FLEISCH",
      "BEEFS"
  ],
  "CONCRETE": [
      "DER",
      "BETON",
      "BETONE"
  ],
  "CONTRAST": [
      "DER",
      "KONTRAST",
      "GEGENSÄTZE"
  ],
  "BANNER": [
      "DAS",
      "BANNER",
      "BANNER"
  ],
  "RESISTANCE": [
      "DER",
      "WIDERSTAND",
      "WIDERSTÄNDE"
  ],
  "STAY": [
      "DER",
      "AUFENTHALT",
      "AUFENTHALTE"
  ],
  "POSTURE": [
      "DIE",
      "HALTUNG",
      "HALTUNGEN"
  ],
  "VODKA": [
      "DER",
      "WODKA",
      "WODKAS"
  ],
  "ALBUM": [
      "DAS",
      "ALBUM",
      "ALBEN"
  ],
  "ERA": [
      "DIE",
      "ÄRA",
      "EPOCHEN"
  ],
  "ACQUAINTANCE": [
      "DIE",
      "BEKANNTSCHAFT",
      "BEKANNTEN"
  ],
  "REVOLUTION": [
      "DIE",
      "REVOLUTION",
      "REVOLUTIONEN"
  ],
  "NAP": [
      "DER",
      "NAP",
      "NOPPEN"
  ],
  "VEIL": [
      "DER",
      "SCHLEIER",
      "SCHLEIER"
  ],
  "SPECTACLE": [
      "DAS",
      "SCHAUSPIEL",
      "SCHAUSPIELE"
  ],
  "COMPETITION": [
      "DER",
      "WETTBEWERB",
      "WETTBEWERBE"
  ],
  "SCALP": [
      "DIE",
      "KOPFHAUT",
      "KOPFHAUT"
  ],
  "HOLLY": [
      "DIE",
      "STECHPALME",
      "DAS+HOLLIES"
  ],
  "WINNER": [
      "DER",
      "GEWINNER",
      "GEWINNER"
  ],
  "APPETITE": [
      "DER",
      "APPETIT",
      "APPETIT"
  ],
  "IVY": [
      "DER",
      "EFEU",
      "EFEU"
  ],
  "CUE": [
      "DER",
      "CUE",
      "STICHWORTE"
  ],
  "STRAIN": [
      "DER",
      "STAMM",
      "STÄMME"
  ],
  "NIECE": [
      "DIE",
      "NICHTE",
      "NICHTEN"
  ],
  "GALAXY": [
      "DIE",
      "GALAXIE",
      "GALAXIEN"
  ],
  "BEDSIDE": [
      "DIE",
      "NACHT",
      "BETTSEITEN"
  ],
  "MADNESS": [
      "DIE",
      "VERRÜCKTHEIT",
      "VERRÜCKTHEITEN"
  ],
  "BAKER": [
      "DER",
      "BÄCKER",
      "BÄCKER"
  ],
  "VIRUS": [
      "DAS",
      "VIRUS",
      "VIREN"
  ],
  "SUFFERING": [
      "DAS",
      "LEIDEN",
      "LEIDEN"
  ],
  "SLOT": [
      "DER",
      "SCHLITZ",
      "SCHLITZE"
  ],
  "FOLDER": [
      "DER",
      "ORDNER",
      "HEFTE"
  ],
  "CONFESSION": [
      "DAS",
      "BEKENNTNIS",
      "GESTÄNDNISSE"
  ],
  "PORTER": [
      "DER",
      "GEPÄCKTRÄGER",
      "TORHÜTER"
  ],
  "DESSERT": [
      "DAS",
      "DESSERT",
      "DESSERTS"
  ],
  "DUMP": [
      "DIE",
      "MÜLLHALDE",
      "DEPONIEN"
  ],
  "PACKET": [
      "DAS",
      "PAKET",
      "PAKETE"
  ],
  "PROFIT": [
      "DER",
      "GEWINN",
      "GEWINNE"
  ],
  "GRANDCHILD": [
      "DER",
      "ENKEL",
      "ENKELKINDER"
  ],
  "GOSSIP": [
      "DER",
      "TRATSCH",
      "DER+KLATSCH"
  ],
  "MARE": [
      "DIE",
      "STUTE",
      "STUTEN"
  ],
  "DNA": [
      "DIE",
      "DNA",
      "DNAS"
  ],
  "TORSO": [
      "DER",
      "RUMPF",
      "TORSI"
  ],
  "BROOM": [
      "DER",
      "BESEN",
      "BESEN"
  ],
  "HOOF": [
      "DER",
      "HUF",
      "HUFE"
  ],
  "SENSOR": [
      "DER",
      "SENSOR",
      "SENSOREN"
  ],
  "PEASANT": [
      "DER",
      "BAUER",
      "BAUERN"
  ],
  "SCHOLAR": [
      "DER",
      "GELEHRTE",
      "GELEHRTEN"
  ],
  "THERAPY": [
      "DIE",
      "THERAPIE",
      "THERAPIEN"
  ],
  "PEANUT": [
      "DIE",
      "ERDNUSS",
      "ERDNÜSSE"
  ],
  "HEADLINE": [
      "DIE",
      "SCHLAGZEILE",
      "SCHLAGZEILEN"
  ],
  "BACON": [
      "DER",
      "SPECK",
      "SPECK"
  ],
  "STERN": [
      "DAS",
      "HECK",
      "HECKS"
  ],
  "VIOLIN": [
      "DIE",
      "GEIGE",
      "VIOLINEN"
  ],
  "PLAGUE": [
      "DIE",
      "PEST",
      "PLAGEN"
  ],
  "BLUR": [
      "DIE",
      "UNSCHÄRFE",
      "UNSCHÄRFEN"
  ],
  "MEANTIME": [
      "DIE",
      "ZWISCHENZEIT",
      "ZWISCHENZEITEN"
  ],
  "DEACON": [
      "DER",
      "DIAKON",
      "DIAKONE"
  ],
  "LANCE": [
      "DIE",
      "LANZE",
      "LANZEN"
  ],
  "ARREST": [
      "DIE",
      "FESTNAHME",
      "VERHAFTUNGEN"
  ],
  "BANANA": [
      "DIE",
      "BANANE",
      "BANANEN"
  ],
  "GIN": [
      "DER",
      "GIN",
      "GINS"
  ],
  "WILLOW": [
      "DIE",
      "WEIDE",
      "WEIDEN"
  ],
  "SHARK": [
      "DER",
      "HAI",
      "HAIE"
  ],
  "PREPARATION": [
      "DIE",
      "VORBEREITUNG",
      "VORBEREITUNGEN"
  ],
  "SCRATCH": [
      "DIE",
      "KRATZ",
      "KRATZER"
  ],
  "DRESSING": [
      "DER",
      "VERBAND",
      "VERBÄNDE"
  ],
  "SIGNATURE": [
      "DIE",
      "UNTERSCHRIFT",
      "UNTERSCHRIFTEN"
  ],
  "ADMIRAL": [
      "DER",
      "ADMIRAL",
      "ADMIRALE"
  ],
  "ANALYSIS": [
      "DIE",
      "ANALYSE",
      "ANALYSISIES"
  ],
  "RAINBOW": [
      "DER",
      "REGENBOGEN",
      "REGENBOGEN"
  ],
  "LIZARD": [
      "DIE",
      "EIDECHSE",
      "EIDECHSEN"
  ],
  "DWARF": [
      "DER",
      "ZWERG",
      "ZWERGE"
  ],
  "STRESS": [
      "DER",
      "STRESS",
      "STRESSEN"
  ],
  "HOMEWORK": [
      "DIE",
      "HAUSAUFGABE",
      "HAUSAUFGABEN"
  ],
  "MIXTURE": [
      "DIE",
      "MISCHUNG",
      "MISCHUNGEN"
  ],
  "VERSE": [
      "DER",
      "VERS",
      "VERSE"
  ],
  "CONVICTION": [
      "DIE",
      "ÜBERZEUGUNG",
      "ÜBERZEUGUNGEN"
  ],
  "ROVER": [
      "DER",
      "ROVER",
      "ROVER"
  ],
  "WREN": [
      "DER",
      "ZAUNKÖNIG",
      "ZAUNKÖNIGE"
  ],
  "COMPOUND": [
      "DIE",
      "VERBINDUNG",
      "VERBINDUNGEN"
  ],
  "EXPEDITION": [
      "DIE",
      "EXPEDITION",
      "EXPEDITIONEN"
  ],
  "REWARD": [
      "DIE",
      "BELOHNUNG",
      "BELOHNUNGEN"
  ],
  "PILLAR": [
      "DIE",
      "SÄULEN",
      "SÄULEN"
  ],
  "JAM": [
      "DIE",
      "MARMELADE",
      "MARMELADEN"
  ],
  "BRANDY": [
      "DER",
      "SCHNAPS",
      "BRÄNDE"
  ],
  "RESIDENCE": [
      "DIE",
      "RESIDENZ",
      "RESIDENZEN"
  ],
  "BARON": [
      "DER",
      "BARON",
      "BARONE"
  ],
  "ENTERPRISE": [
      "DAS",
      "UNTERNEHMEN",
      "UNTERNEHMEN"
  ],
  "COMPLEX": [
      "DER",
      "KOMPLEX",
      "COMPLEXS"
  ],
  "CANDIDATE": [
      "DER",
      "KANDIDAT",
      "KANDIDATEN"
  ],
  "TRIUMPH": [
      "DER",
      "TRIUMPH",
      "TRIUMPHES"
  ],
  "TWIST": [
      "DIE",
      "WENDUNG",
      "DREHUNGEN"
  ],
  "SKETCH": [
      "DIE",
      "SKIZZE",
      "SKIZZEN"
  ],
  "REGISTER": [
      "DAS",
      "REGISTER",
      "REGISTER"
  ],
  "HEARTBEAT": [
      "DER",
      "HERZSCHLAG",
      "HERZSCHLÄGE"
  ],
  "CAFETERIA": [
      "DIE",
      "CAFETERIA",
      "CAFETERIEN"
  ],
  "FEE": [
      "DIE",
      "GEBÜHR",
      "GEBÜHREN"
  ],
  "HILLSIDE": [
      "DIE",
      "HANG",
      "HÄNGE"
  ],
  "MAZE": [
      "DAS",
      "LABYRINTH",
      "LABYRINTHE"
  ],
  "FISHERMAN": [
      "DER",
      "FISCHER",
      "DAS+FISHERMANS"
  ],
  "HUM": [
      "DAS",
      "BRUMMEN",
      "SUMMT"
  ],
  "KITTEN": [
      "DAS",
      "KÄTZCHEN",
      "KÄTZCHEN"
  ],
  "DREAD": [
      "DAS",
      "DREAD",
      "DREADS"
  ],
  "SUBSTANCE": [
      "DIE",
      "SUBSTANZ",
      "SUBSTANZEN"
  ],
  "MELODY": [
      "DIE",
      "MELODIE",
      "MELODIEN"
  ],
  "BANG": [
      "DER",
      "KNALL",
      "KNALLE"
  ],
  "DAGGER": [
      "DER",
      "DOLCH",
      "DOLCHE"
  ],
  "INTENT": [
      "DIE",
      "ABSICHT",
      "ABSICHTEN"
  ],
  "CON": [
      "DAS",
      "CON",
      "NACHTEILE"
  ],
  "LONELINESS": [
      "DIE",
      "EINSAMKEIT",
      "EINSAMKEITEN"
  ],
  "MOTORCYCLE": [
      "DAS",
      "MOTORRAD",
      "MOTORRÄDER"
  ],
  "AMAZEMENT": [
      "DAS",
      "STAUNEN",
      "AMAZEMENTS"
  ],
  "PEER": [
      "DIE",
      "PEER",
      "PEERS"
  ],
  "TECH": [
      "DIE",
      "TECH",
      "TECHES"
  ],
  "INSULT": [
      "DIE",
      "BELEIDIGUNG",
      "BELEIDIGUNGEN"
  ],
  "CAPACITY": [
      "DIE",
      "KAPAZITÄT",
      "KAPAZITÄT"
  ],
  "AWE": [
      "DIE",
      "EHRFURCHT",
      "AWES"
  ],
  "CHILI": [
      "DIE",
      "CHILI",
      "CHILIS"
  ],
  "LODGE": [
      "DIE",
      "LODGE",
      "LOGEN"
  ],
  "CLIP": [
      "DER",
      "CLIP",
      "CLIPS"
  ],
  "LIMO": [
      "DIE",
      "LIMOUSINE",
      "LIMOUSINEN"
  ],
  "MOSQUITO": [
      "DIE",
      "MÜCKE",
      "MÜCKEN"
  ],
  "DICE": [
      "DER",
      "WÜRFEL",
      "WÜRFEL"
  ],
  "SHAKE": [
      "DER",
      "SHAKE",
      "SHAKES"
  ],
  "FEAST": [
      "DAS",
      "FESTMAHL",
      "FESTE"
  ],
  "CASINO": [
      "DAS",
      "CASINO",
      "CASINOS"
  ],
  "PEA": [
      "DIE",
      "ERBSE",
      "ERBSEN"
  ],
  "MURMUR": [
      "DAS",
      "MURMELN",
      "DAS+MURMELN"
  ],
  "CONFLICT": [
      "DER",
      "KONFLIKT",
      "KONFLIKTE"
  ],
  "STEM": [
      "DER",
      "STAMM",
      "STÄMME"
  ],
  "COMRADE": [
      "DER",
      "GENOSSE",
      "GENOSSEN"
  ],
  "FLOCK": [
      "DIE",
      "HERDE",
      "HERDEN"
  ],
  "SOB": [
      "DAS",
      "SCHLUCHZEN",
      "SCHLUCHZEN"
  ],
  "PREGNANCY": [
      "DIE",
      "SCHWANGERSCHAFT",
      "SCHWANGERSCHAFTEN"
  ],
  "SUSPECT": [
      "DER",
      "VERDÄCHTIGE",
      "VERDÄCHTIGEN"
  ],
  "COINCIDENCE": [
      "DAS",
      "ZUSAMMENTREFFEN",
      "ZUFÄLLE"
  ],
  "RANGER": [
      "DER",
      "WALDLÄUFER",
      "RANGER"
  ],
  "CARTOON": [
      "DIE",
      "KARIKATUR",
      "KARIKATUREN"
  ],
  "ROOMMATE": [
      "DER",
      "MITBEWOHNER",
      "MITBEWOHNER"
  ],
  "KINDNESS": [
      "DIE",
      "FREUNDLICHKEIT",
      "FREUNDLICHKEITEN"
  ],
  "CRUISER": [
      "DER",
      "KREUZER",
      "KREUZER"
  ],
  "SLAB": [
      "DIE",
      "BRAMME",
      "BRAMMEN"
  ],
  "CONSCIENCE": [
      "DAS",
      "GEWISSEN",
      "DAS GEWISSEN"
  ],
  "CHEER": [
      "DIE",
      "CHEER",
      "DER+JUBEL"
  ],
  "CONE": [
      "DER",
      "KONUS",
      "KEGEL"
  ],
  "CIRCUIT": [
      "DIE",
      "SCHALTUNG",
      "SCHALTKREISE"
  ],
  "IVORY": [
      "DAS",
      "ELFENBEIN",
      "ELFENBEINARBEITEN"
  ],
  "CARPENTER": [
      "DER",
      "ZIMMERMANN",
      "ZIMMERLEUTE"
  ],
  "REALM": [
      "DAS",
      "REICH",
      "REICHE"
  ],
  "BUM": [
      "DER",
      "PENNER",
      "BUMS"
  ],
  "DONNA": [
      "DIE",
      "DONNA",
      "DAS+DONNAS"
  ],
  "RESERVATION": [
      "DIE",
      "RESERVIERUNG",
      "RESERVIERUNGEN"
  ],
  "ENTERTAINMENT": [
      "DIE",
      "UNTERHALTUNG",
      "UNTERHALTUNGEN"
  ],
  "CRAB": [
      "DIE",
      "KRABBE",
      "KRABBEN"
  ],
  "GROAN": [
      "DAS",
      "STÖHNEN",
      "DAS+STÖHNEN"
  ],
  "ACADEMY": [
      "DIE",
      "AKADEMIE",
      "AKADEMIEN"
  ],
  "LONGING": [
      "DIE",
      "SEHNSUCHT",
      "SEHNSÜCHTE"
  ],
  "KIP": [
      "DIE",
      "KIP",
      "KIPS"
  ],
  "DRILL": [
      "DER",
      "BOHRER",
      "BOHRER"
  ],
  "LUGGAGE": [
      "DAS",
      "GEPÄCK",
      "GEPÄCK"
  ],
  "CANOPY": [
      "DER",
      "BALDACHIN",
      "BALDACHINE"
  ],
  "THRILL": [
      "DER",
      "NERVENKITZEL",
      "DER NERVENKITZEL"
  ],
  "VIRTUE": [
      "DIE",
      "TUGEND",
      "TUGENDEN"
  ],
  "MARSH": [
      "DER",
      "SUMPF",
      "SÜMPFE"
  ],
  "CHIMNEY": [
      "DER",
      "SCHORNSTEIN",
      "SCHORNSTEINE"
  ],
  "ANCHOR": [
      "DIE",
      "ANKER",
      "ANKER"
  ],
  "HARMONY": [
      "DIE",
      "HARMONIE",
      "HARMONIEN"
  ],
  "MAPLE": [
      "DAS",
      "AHORN",
      "AHORNE"
  ],
  "BUNNY": [
      "DAS",
      "KANINCHEN",
      "HASEN"
  ],
  "MODE": [
      "DER",
      "MODUS",
      "MODI"
  ],
  "THRONE": [
      "DER",
      "THRON",
      "THRONE"
  ],
  "APPLICATION": [
      "DER",
      "ANTRAG",
      "ANTRÄGE"
  ],
  "PHYSICS": [
      "DIE",
      "PHYSIK",
      "PHYSICSIES"
  ],
  "NEON": [
      "DAS",
      "NEON",
      "NEONS"
  ],
  "AIRLOCK": [
      "DIE",
      "LUFTSCHLEUSE",
      "LUFTSCHLEUSEN"
  ],
  "FATIGUE": [
      "DIE",
      "ERMÜDUNGS",
      "STRAPAZEN"
  ],
  "THANKSGIVING": [
      "DIE",
      "DANKSAGUNG",
      "DANKSAGUNGEN"
  ],
  "MANUSCRIPT": [
      "DAS",
      "MANUSKRIPT",
      "HANDSCHRIFTEN"
  ],
  "BASIS": [
      "DIE",
      "BASIS",
      "BASEN"
  ],
  "MEMORIAL": [
      "DAS",
      "DENKMAL",
      "DENKMALE"
  ],
  "CUPBOARD": [
      "DER",
      "SCHRANK",
      "SCHRÄNKE"
  ],
  "LEAP": [
      "DER",
      "SPRUNG",
      "SPRÜNGE"
  ],
  "JAPANESE": [
      "DIE",
      "JAPANER",
      "JAPANESES"
  ],
  "ENGINEERING": [
      "DAS",
      "ENGINEERING",
      "ENGINEERINGS"
  ],
  "LEFT": [
      "DIE",
      "LINKE",
      "LINKE"
  ],
  "ACHE": [
      "DER",
      "SCHMERZ",
      "SCHMERZEN"
  ],
  "BRONZE": [
      "DIE",
      "BRONZE",
      "BRONZEN"
  ],
  "ASSOCIATION": [
      "DIE",
      "ASSOZIATION",
      "VERBÄNDE"
  ],
  "FLEET": [
      "DIE",
      "FLOTTE",
      "FLOTTEN"
  ],
  "MARKER": [
      "DER",
      "MARKER",
      "MARKER"
  ],
  "PREY": [
      "DIE",
      "BEUTE",
      "BEUTEN"
  ],
  "DOVE": [
      "DIE",
      "TAUBE",
      "TAUBEN"
  ],
  "GRASP": [
      "DER",
      "GRIFF",
      "GRIFFE"
  ],
  "EPISODE": [
      "DIE",
      "EPISODE",
      "EPISODEN"
  ],
  "ORIGIN": [
      "DER",
      "URSPRUNG",
      "URSPRÜNGE"
  ],
  "VACUUM": [
      "DAS",
      "VAKUUM",
      "STAUBSAUGER"
  ],
  "CATHEDRAL": [
      "DIE",
      "KATHEDRALE",
      "KATHEDRALEN"
  ],
  "MANAGEMENT": [
      "DAS",
      "MANAGEMENT",
      "UNTERNEHMENSLEITUNGEN"
  ],
  "DOWN": [
      "DIE",
      "NACH",
      "TIEFEN"
  ],
  "CONTINENT": [
      "DER",
      "KONTINENT",
      "KONTINENTE"
  ],
  "DICKENS": [
      "DER",
      "TEUFEL",
      "DICKENSES"
  ],
  "VOLUNTEER": [
      "DIE",
      "FREIWILLIGE",
      "FREIWILLIGEN"
  ],
  "SOCCER": [
      "DER",
      "FUSSBALL",
      "SOCCERS"
  ],
  "HEM": [
      "DER",
      "SAUM",
      "SÄUME"
  ],
  "MENTION": [
      "DIE",
      "ERWÄHNUNG",
      "NENNUNGEN"
  ],
  "LUST": [
      "DIE",
      "LUST",
      "LÜSTE"
  ],
  "GIGGLE": [
      "DIE",
      "KICHERN",
      "DAS+KICHERN"
  ],
  "CLASSMATE": [
      "DIE",
      "KLASSENKAMERADEN",
      "KLASSENKAMERADEN"
  ],
  "CLEANING": [
      "DIE",
      "REINIGUNG",
      "REINIGUNGEN"
  ],
  "RECEPTIONIST": [
      "DER",
      "REZEPTIONIST",
      "AN DER REZEPTION"
  ],
  "CALLER": [
      "DER",
      "ANRUFER",
      "ANRUFER"
  ],
  "PURSUIT": [
      "DAS",
      "STREBEN",
      "BESCHÄFTIGUNGEN"
  ],
  "CONTEMPT": [
      "DIE",
      "VERACHTUNG",
      "VERPACHTUNGEN"
  ],
  "SACRIFICE": [
      "DAS",
      "OPFER",
      "OPFER"
  ],
  "GRANDPARENT": [
      "DIE",
      "GROSSELTERN",
      "GROSSELTERN"
  ],
  "THRESHOLD": [
      "DER",
      "GRENZBEREICH",
      "SCHWELLEN"
  ],
  "DEED": [
      "DIE",
      "TAT",
      "TATEN"
  ],
  "COUNTRYSIDE": [
      "DIE",
      "LANDSCHAFT",
      "LANDSCHAFTEN"
  ],
  "ARTIFACT": [
      "DAS",
      "ARTEFAKT",
      "ARTEFAKTE"
  ],
  "WRINKLE": [
      "DIE",
      "FALTEN",
      "FALTEN"
  ],
  "MAGICIAN": [
      "DER",
      "MAGIER",
      "ZAUBERER"
  ],
  "PANG": [
      "DER",
      "STICH",
      "STICHE"
  ],
  "ITALIAN": [
      "DIE",
      "ITALIENISCHE",
      "ITALIENER"
  ],
  "ETERNITY": [
      "DIE",
      "EWIGKEIT",
      "EWIGKEIT"
  ],
  "SLATE": [
      "DER",
      "SCHIEFER",
      "SCHIEFERTAFELN"
  ],
  "STAIRWELL": [
      "DAS",
      "TREPPENHAUS",
      "TREPPENHÄUSER"
  ],
  "ANNOUNCEMENT": [
      "DIE",
      "ANKÜNDIGUNG",
      "ANKÜNDIGUNGEN"
  ],
  "MOTIVE": [
      "DAS",
      "MOTIV",
      "MOTIV"
  ],
  "MECHANIC": [
      "DER",
      "MECHANIKER",
      "MECHANIK"
  ],
  "ALLY": [
      "DER",
      "VERBÜNDETE",
      "ALLIIERTEN"
  ],
  "VASE": [
      "DIE",
      "VASE",
      "VASEN"
  ],
  "SALESMAN": [
      "DER",
      "VERKÄUFER",
      "VERKÄUFER"
  ],
  "THERAPIST": [
      "DER",
      "THERAPEUT",
      "THERAPEUTEN"
  ],
  "GRANNY": [
      "DIE",
      "OMA",
      "OMAS"
  ],
  "MAVERICK": [
      "DER",
      "AUSSENSEITER",
      "MAVERICKS"
  ],
  "BANDAGE": [
      "DIE",
      "BANDAGE",
      "BANDAGEN"
  ],
  "HAM": [
      "DER",
      "SCHINKEN",
      "SCHINKEN"
  ],
  "CARTER": [
      "DER",
      "FUHRMANN",
      "FUHR"
  ],
  "INVESTMENT": [
      "DIE",
      "INVESTITION",
      "INVESTITIONEN"
  ],
  "APPEAL": [
      "DIE",
      "BESCHWERDE",
      "BESCHWERDEN"
  ],
  "INNOCENCE": [
      "DIE",
      "UNSCHULD",
      "INNOCENCES"
  ],
  "CALENDAR": [
      "DER",
      "KALENDER",
      "KALENDER"
  ],
  "ROOFTOP": [
      "DIE",
      "DACH",
      "DÄCHER"
  ],
  "COMBAT": [
      "DER",
      "KAMPF",
      "KÄMPFE"
  ],
  "REVELATION": [
      "DIE",
      "OFFENBARUNG",
      "ENTHÜLLUNGEN"
  ],
  "PANCAKE": [
      "DER",
      "PFANNKUCHEN",
      "PFANNKUCHEN"
  ],
  "ASTEROID": [
      "DER",
      "ASTEROID",
      "ASTEROIDEN"
  ],
  "POSTCARD": [
      "DIE",
      "POSTKARTE",
      "POSTKARTEN"
  ],
  "GARMENT": [
      "DAS",
      "KLEIDUNGSSTÜCK",
      "KLEIDUNGSSTÜCKE"
  ],
  "DETERMINATION": [
      "DIE",
      "BESTIMMUNG",
      "BESTIMMUNGEN"
  ],
  "TRACTOR": [
      "DER",
      "TRAKTOR",
      "TRAKTOREN"
  ],
  "BERRY": [
      "DIE",
      "BEERE",
      "BEEREN"
  ],
  "SURROUNDINGS": [
      "DIE",
      "UMGEBUNG",
      "SURROUNDINGSES"
  ],
  "CLUMP": [
      "DER",
      "KLUMPEN",
      "KLUMPEN"
  ],
  "OFFENSE": [
      "DIE",
      "STRAFTAT",
      "STRAFTATEN"
  ],
  "INTRODUCTION": [
      "DIE",
      "EINLEITUNG",
      "EINLEITUNGEN"
  ],
  "BUTLER": [
      "DER",
      "BUTLER",
      "DAS+BUTLERS"
  ],
  "COUGH": [
      "DER",
      "HUSTEN",
      "COUGHES"
  ],
  "GRANITE": [
      "DER",
      "GRANIT",
      "GRANITE"
  ],
  "AMBASSADOR": [
      "DER",
      "BOTSCHAFTER",
      "BOTSCHAFTER"
  ],
  "TURNING": [
      "DER",
      "WENDE",
      "WENDEN"
  ],
  "SITTING": [
      "DIE",
      "SITZUNG",
      "SITZUNGEN"
  ],
  "COMPLIMENT": [
      "DAS",
      "KOMPLIMENT",
      "KOMPLIMENTE"
  ],
  "CARTON": [
      "DER",
      "KARTON",
      "SCHACHTELN"
  ],
  "DOORBELL": [
      "DIE",
      "TÜRKLINGEL",
      "TÜRKLINGELN"
  ],
  "CERTAINTY": [
      "DIE",
      "GEWISSHEIT",
      "GEWISSHEITEN"
  ],
  "POLITICIAN": [
      "DER",
      "POLITIKER",
      "POLITIKER"
  ],
  "GRATITUDE": [
      "DIE",
      "DANKBARKEIT",
      "DANKSAGUNGEN"
  ],
  "CURRENT": [
      "DIE",
      "JETZIGE",
      "STRÖME"
  ],
  "GLOOM": [
      "DAS",
      "DUNKEL",
      "DÜSTERKEIT"
  ],
  "PLASTER": [
      "DER",
      "PUTZ",
      "PFLASTER"
  ],
  "SETTLEMENT": [
      "DIE",
      "SIEDLUNG",
      "SIEDLUNGEN"
  ],
  "CHOP": [
      "DIE",
      "CHOP",
      "KOTELETTS"
  ],
  "HOMICIDE": [
      "DIE",
      "MORDKOMMISSION",
      "TÖTUNGSDELIKTE"
  ],
  "ALUMINUM": [
      "DIE",
      "ALUMINIUM",
      "ALUMINUMS"
  ],
  "BOULEVARD": [
      "DER",
      "BOULEVARD",
      "BOULEVARDS"
  ],
  "PUPIL": [
      "DER",
      "SCHÜLER",
      "SCHÜLERINNEN UND SCHÜLER"
  ],
  "FLOAT": [
      "DER",
      "SCHWIMMER",
      "SCHWIMMER"
  ],
  "PROFESSION": [
      "DER",
      "BERUF",
      "BERUFE"
  ],
  "RETREAT": [
      "DER",
      "RÜCKZUG",
      "EXERZITIEN"
  ],
  "INTERSECTION": [
      "DER",
      "SCHNITTPUNKT",
      "SCHNITTPUNKTE"
  ],
  "SCHEME": [
      "DIE",
      "REGELUNG",
      "REGELUNG"
  ],
  "EMPTINESS": [
      "DIE",
      "LEERE",
      "EMPTINESSES"
  ],
  "PUBLISHER": [
      "DER",
      "VERLAG",
      "VERLAGE"
  ],
  "CIRCUS": [
      "DER",
      "ZIRKUS",
      "ZIRKUSSE"
  ],
  "DIMENSION": [
      "DIE",
      "ABMESSUNG",
      "DIMENSIONEN"
  ],
  "ZOO": [
      "DER",
      "TIERPARK",
      "ZOOS"
  ],
  "SICKNESS": [
      "DIE",
      "KRANKHEIT",
      "KRANKHEITEN"
  ],
  "MESSENGER": [
      "DER",
      "BOTE",
      "BOTEN"
  ],
  "BEAU": [
      "DAS",
      "BEAU",
      "BEAUS"
  ],
  "TANGLE": [
      "DAS",
      "GEWIRR",
      "TANGLES"
  ],
  "PERSONNEL": [
      "DAS",
      "PERSONAL",
      "PERSONNELS"
  ],
  "STRATEGY": [
      "DIE",
      "STRATEGIE",
      "STRATEGIEN"
  ],
  "DESPERATION": [
      "DIE",
      "VERZWEIFLUNG",
      "VERZWEIFLUNGEN"
  ],
  "BUSINESSMAN": [
      "DER",
      "GESCHÄFTSMANN",
      "BUSINESS"
  ],
  "POD": [
      "DAS",
      "POD",
      "SCHOTEN"
  ],
  "DRAIN": [
      "DER",
      "ABFLUSS",
      "DRAIN"
  ],
  "STRAWBERRY": [
      "DIE",
      "ERDBEERE",
      "ERDBEEREN"
  ],
  "ANNIVERSARY": [
      "DER",
      "JAHRESTAG",
      "JAHRESTAGE"
  ],
  "BINOCULARS": [
      "DAS",
      "FERNGLAS",
      "BINOCULARSES"
  ],
  "GULF": [
      "DIE",
      "KLUFT",
      "BUCHTEN"
  ],
  "DISCIPLINE": [
      "DIE",
      "DISZIPLIN",
      "DISZIPLINEN"
  ],
  "HEDGE": [
      "DIE",
      "HECKE",
      "HECKEN"
  ],
  "MOAN": [
      "DAS",
      "STÖHNEN",
      "DAS+STÖHNEN"
  ],
  "INCOME": [
      "DAS",
      "EINKOMMEN",
      "EINKOMMEN"
  ],
  "MYTH": [
      "DER",
      "MYTHOS",
      "MYTHEN"
  ],
  "SHUTTER": [
      "DER",
      "VERSCHLUSS",
      "FENSTERLÄDEN"
  ],
  "RAFT": [
      "DAS",
      "FLOSS",
      "FLÖSSE"
  ],
  "PHYSICIAN": [
      "DER",
      "ARZT",
      "ÄRZTE"
  ],
  "AMBITION": [
      "DER",
      "EHRGEIZ",
      "AMBITIONEN"
  ],
  "CAMEL": [
      "DAS",
      "KAMEL",
      "KAMELE"
  ],
  "BEATING": [
      "DAS",
      "SCHLAGEN",
      "SCHLÄGE"
  ],
  "ACID": [
      "DIE",
      "SÄURE",
      "SÄUREN"
  ],
  "CEREAL": [
      "DAS",
      "MÜSLI",
      "GETREIDE"
  ],
  "BASIN": [
      "DAS",
      "BECKEN",
      "BECKEN"
  ],
  "NIGHTGOWN": [
      "DAS",
      "NACHTHEMD",
      "NACHTHEMDEN"
  ],
  "INTERNET": [
      "DAS",
      "INTERNET",
      "INTERNETS"
  ],
  "COCKPIT": [
      "DAS",
      "COCKPIT",
      "COCKPITS"
  ],
  "WRECK": [
      "DAS",
      "WRACK",
      "WRACKS"
  ],
  "WIG": [
      "DIE",
      "PERÜCKE",
      "PERÜCKEN"
  ],
  "REIN": [
      "DAS",
      "DARIN",
      "ZÜGEL"
  ],
  "RECORDER": [
      "DER",
      "RECORDER",
      "REKORDER"
  ],
  "PORK": [
      "DAS",
      "SCHWEINEFLEISCH",
      "PORKS"
  ],
  "HOUND": [
      "DER",
      "HUND",
      "HUNDE"
  ],
  "BOUNDARY": [
      "DIE",
      "GRENZE",
      "GRENZEN"
  ],
  "EXAM": [
      "DIE",
      "PRÜFUNG",
      "PRÜFUNGEN"
  ],
  "COURTESY": [
      "DIE",
      "HÖFLICHKEIT",
      "HÖFLICHKEITEN"
  ],
  "ASSISTANCE": [
      "DIE",
      "HILFE",
      "UNTERSTÜTZUNGEN"
  ],
  "CHEEKBONE": [
      "DIE",
      "WANGENKNOCHEN",
      "WANGENKNOCHEN"
  ],
  "WHIP": [
      "DIE",
      "PEITSCHE",
      "PEITSCHEN"
  ],
  "PILGRIM": [
      "DER",
      "PILGER",
      "PILGER"
  ],
  "GREASE": [
      "DAS",
      "FETT",
      "FETTE"
  ],
  "COLLAPSE": [
      "DER",
      "KOLLAPS",
      "ZUSAMMENBRÜCHE"
  ],
  "FACULTY": [
      "DIE",
      "FAKULTÄT",
      "FAKULTÄTEN"
  ],
  "REMINDER": [
      "DIE",
      "ERINNERUNG",
      "ERINNERUNGEN"
  ],
  "SAGE": [
      "DER",
      "WEISE",
      "WEISEN"
  ],
  "ASPHALT": [
      "DER",
      "ASPHALT",
      "ASPHALTE"
  ],
  "PRIVILEGE": [
      "DAS",
      "PRIVILEG",
      "PRIVILEGIEN"
  ],
  "STAIRWAY": [
      "DAS",
      "TREPPENHAUS",
      "TREPPEN"
  ],
  "MAINTENANCE": [
      "DIE",
      "WARTUNG",
      "WARTUNGEN"
  ],
  "SWEETIE": [
      "DIE",
      "SÜSSE",
      "SÜSSIGKEITEN"
  ],
  "ORCHARD": [
      "DER",
      "OBSTGARTEN",
      "OBSTGÄRTEN"
  ],
  "COT": [
      "DAS",
      "KINDERBETT",
      "KINDERBETTEN"
  ],
  "POUCH": [
      "DER",
      "BEUTEL",
      "TASCHEN"
  ],
  "LIGHTER": [
      "DAS",
      "FEUERZEUG",
      "FEUERZEUGE"
  ],
  "KITTY": [
      "DIE",
      "KATZE",
      "KÄTZCHEN"
  ],
  "FORMATION": [
      "DIE",
      "FORMATION",
      "FORMATIONEN"
  ],
  "SNACK": [
      "DIE",
      "SNACK",
      "SNACKS"
  ],
  "TALKING": [
      "DAS",
      "REDEN",
      "GESPRÄCHEN"
  ],
  "OP": [
      "DIE",
      "OP",
      "OPS"
  ],
  "SHRIEK": [
      "DER",
      "SCHREI",
      "SCHREIE"
  ],
  "SCULPTURE": [
      "DIE",
      "SKULPTUR",
      "SKULPTUREN"
  ],
  "CHAIRMAN": [
      "DER",
      "VORSITZENDE",
      "CHAIR"
  ],
  "SUM": [
      "DIE",
      "SUMME",
      "SUMMEN"
  ],
  "CARROT": [
      "DIE",
      "KAROTTE",
      "KAROTTEN"
  ],
  "RIPPLE": [
      "DIE",
      "WELLIGKEIT",
      "WELLEN"
  ],
  "STRIPE": [
      "DER",
      "STREIFEN",
      "STREIFEN"
  ],
  "CAVERN": [
      "DIE",
      "HÖHLE",
      "HÖHLEN"
  ],
  "RADAR": [
      "DIE",
      "RADAR",
      "RADARE"
  ],
  "PONYTAIL": [
      "DER",
      "PFERDESCHWANZ",
      "PFERDESCHWÄNZE"
  ],
  "DESIGNER": [
      "DER",
      "DESIGNER",
      "DESIGNER"
  ],
  "SURGE": [
      "DIE",
      "STOSS",
      "ÜBERSPANNUNGEN"
  ],
  "HEIR": [
      "DER",
      "ERBE",
      "ERBEN"
  ],
  "VAULT": [
      "DER",
      "BUNKER",
      "GEWÖLBE"
  ],
  "SISSY": [
      "DIE",
      "SISSY",
      "WEICHEIER"
  ],
  "SCOTCH": [
      "DIE",
      "SCHOTTEN",
      "BREMSSCHUHE"
  ],
  "STILLNESS": [
      "DIE",
      "STILLE",
      "STILLNESSES"
  ],
  "TUNIC": [
      "DIE",
      "TUNIKA",
      "TUNIKEN"
  ],
  "THINK": [
      "DER",
      "THINK",
      "DAS+DENKT"
  ],
  "PENIS": [
      "DER",
      "PENIS",
      "PENISSE"
  ],
  "NATIVE": [
      "DER",
      "EINHEIMISCHE",
      "EINGEBORENEN"
  ],
  "LOVEMAKING": [
      "DAS",
      "LIEBESSPIEL",
      "LOVEMAKINGS"
  ],
  "AIDE": [
      "DER",
      "ADJUTANT",
      "HELFER"
  ],
  "BULK": [
      "DER",
      "GROSSTEIL",
      "MASSEN"
  ],
  "POKER": [
      "DIE",
      "POKER",
      "POKER"
  ],
  "LIME": [
      "DER",
      "KALK",
      "DER+LIMES"
  ],
  "SURVEILLANCE": [
      "DAS",
      "ÜBERWACHUNGS",
      "ANWENDUNGSBEOBACHTUNGEN"
  ],
  "ASSEMBLY": [
      "DIE",
      "VERSAMMLUNG",
      "BAUGRUPPEN"
  ],
  "GRANDSON": [
      "DER",
      "ENKEL",
      "ENKEL"
  ],
  "CHOPPER": [
      "DER",
      "CHOPPER",
      "ZERHACKER"
  ],
  "CARRIER": [
      "DER",
      "TRÄGER",
      "TRÄGER"
  ],
  "ENGAGEMENT": [
      "DIE",
      "VERLOBUNG",
      "ENGAGEMENTS"
  ],
  "KIN": [
      "DAS",
      "KIN",
      "KINS"
  ],
  "MUM": [
      "DIE",
      "MAMA",
      "MÜTTER"
  ],
  "LIGHTING": [
      "DIE",
      "BELEUCHTUNG",
      "BELEUCHTUNG"
  ],
  "FIT": [
      "DIE",
      "PASSFORM",
      "ANFÄLLE"
  ],
  "PULL": [
      "DIE",
      "PULL",
      "ZIEHT"
  ],
  "VERGE": [
      "DAS",
      "VERGE",
      "SEITENSTREIFEN"
  ],
  "FARMHOUSE": [
      "DAS",
      "BAUERNHAUS",
      "BAUERNHÄUSER"
  ],
  "WAIT": [
      "DAS",
      "WARTEN",
      "WARTEZEITEN"
  ],
  "ASSASSIN": [
      "DER",
      "ATTENTÄTER",
      "ATTENTÄTER"
  ],
  "FOAM": [
      "DER",
      "SCHAUM",
      "SCHÄUME"
  ],
  "TUG": [
      "DER",
      "SCHLEPPER",
      "SCHLEPPER"
  ],
  "JOURNALIST": [
      "DER",
      "JOURNALIST",
      "JOURNALISTEN"
  ],
  "RECORDING": [
      "DIE",
      "AUFNAHME",
      "AUFNAHMEN"
  ],
  "CURE": [
      "DIE",
      "HEILUNG",
      "HEILUNGEN"
  ],
  "DESCENT": [
      "DER",
      "ABSTIEG",
      "ABFAHRTEN"
  ],
  "RINGING": [
      "DAS",
      "KLINGELN",
      "RINGINGS"
  ],
  "SCISSORS": [
      "DIE",
      "SCHERE",
      "SCHEREN"
  ],
  "TWIG": [
      "DER",
      "ZWEIG",
      "ZWEIGE"
  ],
  "RESORT": [
      "DER",
      "URLAUBSORT",
      "FERIENORTE"
  ],
  "GUARDIAN": [
      "DER",
      "BESCHÜTZER",
      "WÄCHTER"
  ],
  "OPPONENT": [
      "DER",
      "GEGNER",
      "GEGNER"
  ],
  "CHEF": [
      "DER",
      "KÜCHENCHEF",
      "KÖCHE"
  ],
  "WHEAT": [
      "DER",
      "WEIZEN",
      "WEIZEN"
  ],
  "HURRICANE": [
      "DER",
      "HURRIKAN",
      "HURRIKANE"
  ],
  "PLAYGROUND": [
      "DER",
      "SPIELPLATZ",
      "SPIELPLÄTZE"
  ],
  "MUSHROOM": [
      "DER",
      "PILZ",
      "PILZE"
  ],
  "KEYBOARD": [
      "DIE",
      "TASTATUR",
      "KEYBOARIES"
  ],
  "CEDAR": [
      "DIE",
      "ZEDER",
      "ZEDERN"
  ],
  "CREST": [
      "DAS",
      "WAPPEN",
      "KÄMME"
  ],
  "JASMINE": [
      "DER",
      "JASMIN",
      "JASMIN"
  ],
  "ARMCHAIR": [
      "DER",
      "SESSEL",
      "SESSEL"
  ],
  "ATTRACTION": [
      "DIE",
      "ATTRAKTION",
      "ATTRAKTIONEN"
  ],
  "BLIND": [
      "DIE",
      "BLINDE",
      "BLINDS"
  ],
  "CYLINDER": [
      "DER",
      "ZYLINDER",
      "ZYLINDER"
  ],
  "SWALLOW": [
      "DIE",
      "SCHWALBE",
      "SCHWALBEN"
  ],
  "CELEBRITY": [
      "DIE",
      "BERÜHMTHEIT",
      "PROMINENTEN"
  ],
  "WILDERNESS": [
      "DIE",
      "WILDNIS",
      "WILDNIS"
  ],
  "TRIANGLE": [
      "DAS",
      "DREIECK",
      "DREIECKE"
  ],
  "STENCH": [
      "DER",
      "GESTANK",
      "GESTANK"
  ],
  "LABORATORY": [
      "DAS",
      "LABOR",
      "LABORE"
  ],
  "ARRAY": [
      "DAS",
      "ARRAY",
      "ARRAIES"
  ],
  "VALENTINE": [
      "DAS",
      "VALENTINE",
      "VALENTINES"
  ],
  "RETIREMENT": [
      "DAS",
      "RENTEN",
      "PENSIONIERUNGEN"
  ],
  "SKI": [
      "DER",
      "SKI",
      "SKIER"
  ],
  "EDITION": [
      "DIE",
      "AUSGABE",
      "AUSGABEN"
  ],
  "SUPERVISOR": [
      "DER",
      "SUPERVISOR",
      "AUFSICHTSBEHÖRDEN"
  ],
  "EXPANSE": [
      "DIE",
      "WEITE",
      "WEITEN"
  ],
  "ENDING": [
      "DAS",
      "ENDE",
      "ENDUNGEN"
  ],
  "MOSS": [
      "DAS",
      "MOOS",
      "MOOSE"
  ],
  "GALE": [
      "DER",
      "STURM",
      "STÜRME"
  ],
  "LOYALTY": [
      "DIE",
      "TREUE",
      "LOYALITÄTEN"
  ],
  "LAVENDER": [
      "DER",
      "LAVENDEL",
      "LAVENDEL"
  ],
  "PARDON": [
      "DIE",
      "BEGNADIGUNG",
      "BEGNADIGUNGEN"
  ],
  "ASHTRAY": [
      "DER",
      "ASCHENBECHER",
      "ASCHENBECHER"
  ],
  "SHARD": [
      "DIE",
      "SCHERBE",
      "SCHERBEN"
  ],
  "CORPORATION": [
      "DAS",
      "UNTERNEHMEN",
      "KONZERNE"
  ],
  "DISTRACTION": [
      "DIE",
      "ABLENKUNG",
      "ABLENKUNGEN"
  ],
  "MAJESTY": [
      "DIE",
      "MAJESTÄT",
      "MAJESTÄTEN"
  ],
  "PYRAMID": [
      "DIE",
      "PYRAMIDE",
      "PYRAMIDEN"
  ],
  "FAME": [
      "DER",
      "RUHM",
      "FAMES"
  ],
  "GRADUATION": [
      "DER",
      "SCHULABSCHLUSS",
      "SCHULABSCHLÜSSE"
  ],
  "DISTRESS": [
      "DIE",
      "NOT",
      "NÖTE"
  ],
  "MAGE": [
      "DER",
      "MAGIER",
      "MAGIER"
  ],
  "INDEPENDENCE": [
      "DIE",
      "UNABHÄNGIGKEIT",
      "UNABHÄNGIGKEITEN"
  ],
  "CRUSH": [
      "DER",
      "SCHWARM",
      "ZERMALMT"
  ],
  "CHUCKLE": [
      "DAS",
      "LACHEN",
      "KICHERT"
  ],
  "DIME": [
      "DIE",
      "DIME",
      "DIMES"
  ],
  "AIM": [
      "DAS",
      "ZIEL",
      "ZIELE"
  ],
  "GUST": [
      "DIE",
      "BÖEN",
      "BÖEN"
  ],
  "RUSSIAN": [
      "DER",
      "RUSSE",
      "RUSSEN"
  ],
  "TREAT": [
      "DER",
      "FESTLICHKEIT",
      "LECKEREIEN"
  ],
  "FOREIGNER": [
      "DER",
      "AUSLÄNDER",
      "AUSLÄNDER"
  ],
  "SALARY": [
      "DAS",
      "GEHALT",
      "GEHÄLTER"
  ],
  "SCOPE": [
      "DER",
      "ANWENDUNGSBEREICH",
      "BEREICHE"
  ],
  "REBEL": [
      "DER",
      "REBELL",
      "REBELLEN"
  ],
  "THUG": [
      "DER",
      "SCHLÄGER",
      "SCHLÄGER"
  ],
  "TOMB": [
      "DAS",
      "GRAB",
      "GRÄBERN"
  ],
  "FRIDGE": [
      "DER",
      "KÜHLSCHRANK",
      "KÜHLSCHRÄNKE"
  ],
  "SOCKET": [
      "DIE",
      "STECKDOSE",
      "BUCHSEN"
  ],
  "DOSE": [
      "DIE",
      "DOSIS",
      "DOSEN"
  ],
  "ELECTION": [
      "DIE",
      "WAHL",
      "WAHLEN"
  ],
  "REFUGEE": [
      "DER",
      "FLÜCHTLING",
      "FLÜCHTLINGE"
  ],
  "PHASE": [
      "DIE",
      "PHASE",
      "PHASEN"
  ],
  "PUMPKIN": [
      "DER",
      "KÜRBIS",
      "KÜRBISSE"
  ],
  "THORN": [
      "DER",
      "DORN",
      "DORNEN"
  ],
  "HIDE": [
      "DIE",
      "HAUT",
      "HÄUTE"
  ],
  "SAUSAGE": [
      "DIE",
      "WURST",
      "WÜRSTE"
  ],
  "DIG": [
      "DIE",
      "DIG",
      "AUSGRABUNGEN"
  ],
  "TAN": [
      "DER",
      "TAN",
      "BRÄUNT"
  ],
  "LOAN": [
      "DAS",
      "DARLEHEN",
      "KREDITE"
  ],
  "SPIKE": [
      "DER",
      "DORN",
      "SPIKES"
  ],
  "CRUMB": [
      "DIE",
      "KRUME",
      "KRÜMEL"
  ],
  "WAX": [
      "DAS",
      "WACHS",
      "WAXS"
  ],
  "GROWL": [
      "DAS",
      "KNURREN",
      "GROWLS"
  ],
  "RENTAL": [
      "DIE",
      "VERMIETUNG",
      "VERMIETUNGEN"
  ],
  "FEED": [
      "DAS",
      "FUTTER",
      "ZUFÜHRUNGEN"
  ],
  "ESCORT": [
      "DIE",
      "ESKORTE",
      "BEGLEITPERSONEN"
  ],
  "ASTONISHMENT": [
      "DAS",
      "ERSTAUNEN",
      "ERSTAUNLICHKEITEN"
  ],
  "FLORA": [
      "DIE",
      "FLORA",
      "FLOREN"
  ],
  "FESTIVAL": [
      "DAS",
      "FEST",
      "FESTE"
  ],
  "DEBATE": [
      "DIE",
      "DEBATTE",
      "DEBATTEN"
  ],
  "CRITIC": [
      "DER",
      "KRITIKER",
      "KRITIKER"
  ],
  "CAST": [
      "DIE",
      "BESETZUNG",
      "MODELLE"
  ],
  "BLOOM": [
      "DIE",
      "BLÜTE",
      "BLÜTEN"
  ],
  "LOFT": [
      "DAS",
      "LOFT",
      "DACHBÖDEN"
  ],
  "COMMISSION": [
      "DIE",
      "KOMMISSION",
      "KOMMISSIONEN"
  ],
  "FLICKER": [
      "DAS",
      "FLIMMERN",
      "FLACKERT"
  ],
  "ECONOMY": [
      "DIE",
      "WIRTSCHAFT",
      "WIRTSCHAFTEN"
  ],
  "RADIATOR": [
      "DER",
      "RADIATOR",
      "RADIATOREN"
  ],
  "RADIATION": [
      "DIE",
      "STRAHLUNG",
      "STRAHLUNGEN"
  ],
  "BODYGUARD": [
      "DER",
      "LEIBWÄCHTER",
      "BODYGUARIES"
  ],
  "REALIZATION": [
      "DIE",
      "UMSETZUNG",
      "ERKENNTNISSE"
  ],
  "CRATER": [
      "DER",
      "KRATER",
      "KRATER"
  ],
  "VOYAGE": [
      "DIE",
      "REISE",
      "REISEN"
  ],
  "CONGRESS": [
      "DAS",
      "KONGRESS",
      "KONGRESSE"
  ],
  "VOTE": [
      "DIE",
      "WAHL",
      "WAHLEN"
  ],
  "PROPOSAL": [
      "DER",
      "ANTRAG",
      "ANTRÄGE"
  ],
  "FRY": [
      "DER",
      "BRATEN",
      "POMMES"
  ],
  "SHIVER": [
      "DAS",
      "ZITTERN",
      "GÄNSEHAUT"
  ],
  "OBLIGATION": [
      "DIE",
      "VERPFLICHTUNG",
      "VERPFLICHTUNGEN"
  ],
  "LOSER": [
      "DER",
      "VERLIERER",
      "VERLIERER"
  ],
  "INSTRUCTOR": [
      "DER",
      "LEHRER",
      "AUSBILDER"
  ],
  "WINK": [
      "DIE",
      "ZUZWINKERN",
      "ZWINKERT"
  ],
  "PEBBLE": [
      "DIE",
      "KIES",
      "KIESELSTEINE"
  ],
  "NECESSITY": [
      "DIE",
      "NOTWENDIGKEIT",
      "NOTWENDIGKEITEN"
  ],
  "WORKSHOP": [
      "DER",
      "WORKSHOP",
      "WORKSHOPS"
  ],
  "SUNRISE": [
      "DER",
      "SONNENAUFGANG",
      "SONNENAUFGANG"
  ],
  "EXHAUSTION": [
      "DIE",
      "ERSCHÖPFUNG",
      "ERSCHÖPFUNGS"
  ],
  "CUBICLE": [
      "DIE",
      "ZELLE",
      "ZELLEN"
  ],
  "DOUBLE": [
      "DER",
      "DOPPELGÄNGER",
      "DOPPELGÄNGER"
  ],
  "PERIMETER": [
      "DER",
      "UMFANG",
      "UMFÄNGE"
  ],
  "COMB": [
      "DER",
      "KAMM",
      "KÄMME"
  ],
  "FINISH": [
      "DAS",
      "ENDE",
      "OBERFLÄCHEN"
  ],
  "PURCHASE": [
      "DER",
      "KAUF",
      "KÄUFE"
  ],
  "INTERVAL": [
      "DAS",
      "INTERVALL",
      "INTERVALLE"
  ],
  "SPLASH": [
      "DER",
      "SPRITZ",
      "SPRITZER"
  ],
  "CONVENTION": [
      "DIE",
      "KONVENTION",
      "KONVENTIONEN"
  ],
  "AWARENESS": [
      "DAS",
      "BEWUSSTSEIN",
      "GEWAHRSEIN"
  ],
  "POSE": [
      "DIE",
      "POSE",
      "POSEN"
  ],
  "CRADLE": [
      "DIE",
      "WIEGE",
      "WIEGEN"
  ],
  "RAM": [
      "DER",
      "STÖSSEL",
      "WIDDER"
  ],
  "GENTRY": [
      "DER",
      "ADEL",
      "GENTRIES"
  ],
  "SEAM": [
      "DIE",
      "NAHT",
      "NÄHTEN"
  ],
  "ASSOCIATE": [
      "DAS",
      "ASSOZIIERTE",
      "MITARBEITER"
  ],
  "PANE": [
      "DIE",
      "SCHEIBE",
      "SCHEIBEN"
  ],
  "PUNK": [
      "DER",
      "PUNK",
      "PUNKS"
  ],
  "REMNANT": [
      "DER",
      "ÜBERREST",
      "RESTE"
  ],
  "CRACKER": [
      "DER",
      "CRACKER",
      "CRACKER"
  ],
  "BLUFF": [
      "DER",
      "BLUFF",
      "KLIPPEN"
  ],
  "DUNE": [
      "DIE",
      "DÜNE",
      "DÜNEN"
  ],
  "DENTIST": [
      "DER",
      "ZAHNARZT",
      "ZAHNÄRZTE"
  ],
  "REFUGE": [
      "DIE",
      "ZUFLUCHT",
      "SCHUTZHÜTTEN"
  ],
  "SATIN": [
      "DIE",
      "SATIN",
      "SATINS"
  ],
  "SPREAD": [
      "DIE",
      "VERBREITUNG",
      "VERBREITUNGEN"
  ],
  "ENTITY": [
      "DAS",
      "UNTERNEHMEN",
      "ENTITÄTEN"
  ],
  "MAILBOX": [
      "DAS",
      "POSTFACH",
      "MAILBOXS"
  ],
  "ANNOYANCE": [
      "DER",
      "ÄRGER",
      "ÄRGERNISSE"
  ],
  "HISS": [
      "DAS",
      "ZISCHEN",
      "ZISCHT"
  ],
  "LOCAL": [
      "DAS",
      "LOKAL",
      "EINHEIMISCHEN"
  ],
  "THUD": [
      "DER",
      "BUMS",
      "SCHLÄGE"
  ],
  "DISMAY": [
      "DIE",
      "BESTÜRZUNG",
      "BESTÜRZT"
  ],
  "FLOUR": [
      "DAS",
      "MEHL",
      "MEHLE"
  ],
  "FREAK": [
      "DER",
      "FREAK",
      "FREAKS"
  ],
  "HAIRCUT": [
      "DER",
      "HAARSCHNITT",
      "ABSCHLÄGE"
  ],
  "SWEET": [
      "DIE",
      "SÜSSE",
      "SÜSSIGKEITEN"
  ],
  "ORPHAN": [
      "DIE",
      "WAISE",
      "WAISEN"
  ],
  "CHESS": [
      "DAS",
      "SCHACH",
      "CHESSES"
  ],
  "PETAL": [
      "DIE",
      "BLÜTENBLATT",
      "BLÜTENBLÄTTER"
  ],
  "PAPERWORK": [
      "DIE",
      "SCHREIBARBEIT",
      "PAPIERARBEITEN"
  ],
  "PSYCHIATRIST": [
      "DER",
      "PSYCHIATER",
      "PSYCHIATER"
  ],
  "SINGING": [
      "DER",
      "GESANG",
      "GESÄNGE"
  ],
  "INTERRUPT": [
      "DAS",
      "INTERRUPT",
      "INTERRUPTS"
  ],
  "EXAMINATION": [
      "DIE",
      "UNTERSUCHUNG",
      "UNTERSUCHUNGEN"
  ],
  "ADMIRATION": [
      "DIE",
      "BEWUNDERUNG",
      "BEWUNDERUNG"
  ],
  "FREEZER": [
      "DAS",
      "GEFRIER",
      "GEFRIERGERÄTE"
  ],
  "ILLUSTRATION": [
      "DIE",
      "ILLUSTRATION",
      "ABBILDUNGEN"
  ],
  "STEW": [
      "DER",
      "EINTOPF",
      "EINTÖPFE"
  ],
  "INVESTIGATOR": [
      "DER",
      "ERMITTLER",
      "ERMITTLER"
  ],
  "SUBURB": [
      "DER",
      "VORORT",
      "DER+STADTRAND"
  ],
  "BISCUIT": [
      "DER",
      "KEKS",
      "KEKSE"
  ],
  "HOLSTER": [
      "DAS",
      "HOLSTER",
      "HOLSTER"
  ],
  "FACTOR": [
      "DER",
      "FAKTOR",
      "FAKTOREN"
  ],
  "INTIMACY": [
      "DIE",
      "INTIMITÄT",
      "INTIMITÄTEN"
  ],
  "LASH": [
      "DIE",
      "PEITSCHE",
      "WIMPERN"
  ],
  "SAVING": [
      "DIE",
      "EINSPARUNG",
      "EINSPARUNGEN"
  ],
  "SOFTWARE": [
      "DIE",
      "SOFTWARE",
      "SOFTWAREN"
  ],
  "HEN": [
      "DIE",
      "HENNE",
      "HENNEN"
  ],
  "BIRCH": [
      "DIE",
      "BIRKE",
      "BIRKEN"
  ],
  "INQUIRY": [
      "DIE",
      "UNTERSUCHUNG",
      "ANFRAGEN"
  ],
  "NURSERY": [
      "DER",
      "KINDERGARTEN",
      "BAUMSCHULEN"
  ],
  "TRANSPORT": [
      "DER",
      "TRANSPORT",
      "TRANSPORTE"
  ],
  "EXTENT": [
      "DAS",
      "AUSMASS",
      "AUSDEHNUNGEN"
  ],
  "DEFINITION": [
      "DIE",
      "DEFINITION",
      "DEFINITIONEN"
  ],
  "MONUMENT": [
      "DAS",
      "MONUMENT",
      "DENKMÄLER"
  ],
  "PLUM": [
      "DIE",
      "PFLAUME",
      "PFLAUMEN"
  ],
  "VOID": [
      "DAS",
      "NICHTS",
      "HOHLRÄUME"
  ],
  "DELAY": [
      "DIE",
      "VERZÖGERUNG",
      "VERZÖGERUNGEN"
  ],
  "INSPECTION": [
      "DIE",
      "INSPEKTION",
      "INSPEKTIONEN"
  ],
  "ESSENCE": [
      "DIE",
      "ESSENZ",
      "ESSENZEN"
  ],
  "CANNON": [
      "DIE",
      "KANONE",
      "KANONEN"
  ],
  "FRINGE": [
      "DIE",
      "FRANSEN",
      "FRANSEN"
  ],
  "STEREO": [
      "DIE",
      "STEREO",
      "STEREOANLAGEN"
  ],
  "FELLA": [
      "DIE",
      "FELLA",
      "FELLAS"
  ],
  "PRAISE": [
      "DAS",
      "LOB",
      "DAS LOB"
  ],
  "PENGUIN": [
      "DER",
      "PINGUIN",
      "PINGUINE"
  ],
  "TORTURE": [
      "DIE",
      "FOLTER",
      "QUALEN"
  ],
  "STAMP": [
      "DIE",
      "BRIEFMARKE",
      "BRIEFMARKEN"
  ],
  "PARTICLE": [
      "DIE",
      "PARTIKEL",
      "TEILCHEN"
  ],
  "TRANSLATOR": [
      "DER",
      "ÜBERSETZER",
      "ÜBERSETZER"
  ],
  "EASTER": [
      "DAS",
      "OSTERN",
      "EASTERS"
  ],
  "FREEZE": [
      "DAS",
      "EINFRIEREN",
      "FRIERT"
  ],
  "PEW": [
      "DIE",
      "PEW",
      "BÄNKE"
  ],
  "WAD": [
      "DER",
      "PFROPFEN",
      "BÜNDEL"
  ],
  "PANTIES": [
      "DAS",
      "HÖSCHEN",
      "PANTIESES"
  ],
  "CONSIDERATION": [
      "DIE",
      "GEGENLEISTUNG",
      "ÜBERLEGUNGEN"
  ],
  "SPIT": [
      "DER",
      "SPIESS",
      "SPIESSE"
  ],
  "COOLER": [
      "DER",
      "KÜHLER",
      "KÜHLER"
  ],
  "GRILL": [
      "DER",
      "GRILL",
      "GRILLS"
  ],
  "JUG": [
      "DER",
      "KRUG",
      "KRÜGE"
  ],
  "NICKNAME": [
      "DER",
      "SPITZNAME",
      "SPITZNAMEN"
  ],
  "REVOLVER": [
      "DER",
      "REVOLVER",
      "REVOLVER"
  ],
  "MACHINERY": [
      "DIE",
      "MASCHINEN",
      "MASCHINEN"
  ],
  "MADAM": [
      "DIE",
      "DAMEN",
      "HERREN"
  ],
  "PIKE": [
      "DER",
      "HECHT",
      "PIKES"
  ],
  "TERRORIST": [
      "DER",
      "TERRORIST",
      "TERRORISTEN"
  ],
  "LAPTOP": [
      "DER",
      "LAPTOP",
      "LAPTOPS"
  ],
  "OFFERING": [
      "DAS",
      "ANGEBOT",
      "ANGEBOTE"
  ],
  "BEAK": [
      "DER",
      "SCHNABEL",
      "SCHNÄBEL"
  ],
  "INSTITUTION": [
      "DIE",
      "INSTITUTION",
      "INSTITUTIONEN"
  ],
  "COMPARISON": [
      "DER",
      "VERGLEICH",
      "VERGLEICHE"
  ],
  "MAKER": [
      "DER",
      "MACHER",
      "MACHER"
  ],
  "INSIGHT": [
      "DIE",
      "EINSICHT",
      "EINSICHTEN"
  ],
  "SIBLING": [
      "DIE",
      "GESCHWISTER",
      "GESCHWISTER"
  ],
  "WARDROBE": [
      "DER",
      "KLEIDERSCHRANK",
      "SCHRÄNKE"
  ],
  "FLAP": [
      "DIE",
      "KLAPPE",
      "KLAPPEN"
  ],
  "SOLE": [
      "DER",
      "EINZIGE",
      "SOHLEN"
  ],
  "COMPASSION": [
      "DAS",
      "MITGEFÜHL",
      "BARMHERZIGKEIT"
  ],
  "EGO": [
      "DAS",
      "EGO",
      "EGOS"
  ],
  "ANTENNA": [
      "DIE",
      "ANTENNEN",
      "ANTENNEN"
  ],
  "CRICKET": [
      "DIE",
      "GRILLE",
      "GRILLEN"
  ],
  "TROLL": [
      "DER",
      "TROLL",
      "TROLLE"
  ],
  "BOOKSTORE": [
      "DER",
      "BÜCHERLADEN",
      "BUCHHANDLUNGEN"
  ],
  "COMING": [
      "DIE",
      "ANKUNFT",
      "ANKÜNFTE"
  ],
  "OBJECTION": [
      "DER",
      "EINWAND",
      "EINWÄNDE"
  ],
  "HOLDER": [
      "DER",
      "HALTER",
      "INHABER"
  ],
  "BACKSEAT": [
      "DER",
      "RÜCKSITZ",
      "RÜCKSITZE"
  ],
  "IGNORANCE": [
      "DIE",
      "UNWISSENHEIT",
      "UNWISSENHEIT"
  ],
  "BUDGET": [
      "DAS",
      "BUDGET",
      "BUDGETS"
  ],
  "AIRCRAFT": [
      "DAS",
      "FLUGZEUG",
      "FLUGZEUGE"
  ],
  "CORPS": [
      "DAS",
      "KORPS",
      "LEICHEN"
  ],
  "LOAF": [
      "DAS",
      "BROT",
      "BROTE"
  ],
  "EXTENSION": [
      "DIE",
      "ERWEITERUNG",
      "VERLÄNGERUNGEN"
  ],
  "FREEWAY": [
      "DIE",
      "AUTOBAHN",
      "AUTOBAHNEN"
  ],
  "SOLITUDE": [
      "DIE",
      "EINSAMKEIT",
      "EINSAMKEIT"
  ],
  "CHEMICAL": [
      "DIE",
      "CHEMISCHE",
      "CHEMIKALIEN"
  ],
  "VILLAGER": [
      "DER",
      "DORFBEWOHNER",
      "DORFBEWOHNER"
  ],
  "PERFECTION": [
      "DIE",
      "PERFEKTION",
      "VOLLKOMMEN"
  ],
  "POPE": [
      "DER",
      "PAPST",
      "PÄPSTE"
  ],
  "SEMESTER": [
      "DAS",
      "SEMESTER",
      "SEMESTER"
  ],
  "LIVER": [
      "DIE",
      "LEBER",
      "LEBERN"
  ],
  "SAUCER": [
      "DIE",
      "UNTERTASSE",
      "UNTERTASSEN"
  ],
  "URGENCY": [
      "DIE",
      "DRINGLICHKEIT",
      "DRINGLICHKEITEN"
  ],
  "VOLCANO": [
      "DER",
      "VULKAN",
      "VULKANE"
  ],
  "SPICE": [
      "DIE",
      "WÜRZE",
      "GEWÜRZE"
  ],
  "HOSTAGE": [
      "DIE",
      "GEISEL",
      "GEISELN"
  ],
  "CHOIR": [
      "DER",
      "CHOR",
      "CHÖRE"
  ],
  "DOUGH": [
      "DER",
      "TEIG",
      "TEIGRUNDER"
  ],
  "COMMOTION": [
      "DIE",
      "AUFREGUNG",
      "UNRUHEN"
  ],
  "COURTHOUSE": [
      "DAS",
      "GERICHTSGEBÄUDE",
      "GERICHTSGEBÄUDEN"
  ],
  "SALMON": [
      "DER",
      "LACHS",
      "LACHSE"
  ],
  "BOXER": [
      "DER",
      "BOXER",
      "BOXER"
  ],
  "ERRAND": [
      "DIE",
      "BESORGUNG",
      "BESORGUNGEN"
  ],
  "MECHANISM": [
      "DER",
      "MECHANISMUS",
      "MECHANISMEN"
  ],
  "TELESCOPE": [
      "DAS",
      "TELESKOP",
      "TELESKOPE"
  ],
  "FERRY": [
      "DIE",
      "FÄHRE",
      "FÄHREN"
  ],
  "NIGGER": [
      "DER",
      "NIGGER",
      "NIGGER"
  ],
  "PASSERBY": [
      "DER",
      "PASSANT",
      "PASSANTEN"
  ],
  "IRRITATION": [
      "DIE",
      "REIZUNG",
      "IRRITATIONEN"
  ],
  "SEDAN": [
      "DIE",
      "LIMOUSINE",
      "LIMOUSINEN"
  ],
  "COMMITMENT": [
      "DAS",
      "ENGAGEMENT",
      "ENGAGEMENTS"
  ],
  "COWARD": [
      "DER",
      "FEIGLING",
      "FEIGLINGE"
  ],
  "GIT": [
      "DIE",
      "GIT",
      "GITS"
  ],
  "FLARE": [
      "DIE",
      "FACKEL",
      "FACKELN"
  ],
  "HOWL": [
      "DAS",
      "HEULEN",
      "DAS+HEULEN"
  ],
  "FANG": [
      "DIE",
      "FANG",
      "REISSZÄHNE"
  ],
  "ROMAN": [
      "DIE",
      "RÖMISCH",
      "RÖMER"
  ],
  "HUE": [
      "DER",
      "FARBTON",
      "FARBTÖNE"
  ],
  "DISCOMFORT": [
      "DAS",
      "UNBEHAGEN",
      "UNANNEHMLICHKEITEN"
  ],
  "VENT": [
      "DAS",
      "ENTLÜFTUNGS",
      "LÜFTUNGSSCHLITZE"
  ],
  "CANOE": [
      "DAS",
      "KANU",
      "KANUS"
  ],
  "RECIPE": [
      "DAS",
      "REZEPT",
      "REZEPTE"
  ],
  "HAMBURGER": [
      "DER",
      "HAMBURGER",
      "HAMBURGER"
  ],
  "EAVE": [
      "DIE",
      "TRAUFE",
      "TRAUFE"
  ],
  "BARBER": [
      "DER",
      "BARBIER",
      "BARBIERE"
  ],
  "PASSING": [
      "DAS",
      "ABLEBEN",
      "PASSINGS"
  ],
  "BETRAYAL": [
      "DER",
      "VERRAT",
      "DER+VERRAT"
  ],
  "SWEATSHIRT": [
      "DAS",
      "SWEATSHIRT",
      "SWEATSHIRTS"
  ],
  "TENTACLE": [
      "DIE",
      "TENTAKEL",
      "TENTAKELN"
  ],
  "SURF": [
      "DIE",
      "BRANDUNG",
      "BRANDUNGEN"
  ],
  "PLAID": [
      "DAS",
      "PLAID",
      "PLAIDS"
  ],
  "WALKWAY": [
      "DER",
      "GEHWEG",
      "GEHWEGE"
  ],
  "LIMP": [
      "DAS",
      "HINKEN",
      "HINKT"
  ],
  "ADMINISTRATION": [
      "DIE",
      "VERWALTUNG",
      "VERWALTUNGEN"
  ],
  "CONVENIENCE": [
      "DIE",
      "BEQUEMLICHKEIT",
      "BEQUEMLICHKEITEN"
  ],
  "DIAPER": [
      "DIE",
      "WINDEL",
      "WINDELN"
  ],
  "MOLE": [
      "DER",
      "MAULWURF",
      "MAULWÜRFE"
  ],
  "CLEANER": [
      "DER",
      "REINIGER",
      "REINIGUNGSKRÄFTE"
  ],
  "SWELL": [
      "DIE",
      "DÜNUNG",
      "SCHWILLT"
  ],
  "GROWNUP": [
      "DER",
      "ERWACHSENE",
      "ERWACHSENEN"
  ],
  "SCAN": [
      "DIE",
      "SCAN",
      "ABTASTUNGEN"
  ],
  "CLARITY": [
      "DIE",
      "KLARHEIT",
      "KLARHEITEN"
  ],
  "SALON": [
      "DER",
      "SALON",
      "SALONS"
  ],
  "PRODUCER": [
      "DER",
      "PRODUZENT",
      "HERSTELLER"
  ],
  "FLYING": [
      "DIE",
      "FLUG",
      "FLÜGE"
  ],
  "PLEA": [
      "DER",
      "RECHTSMITTELGRUND",
      "RECHTSMITTELGRÜNDE"
  ],
  "PRAIRIE": [
      "DIE",
      "PRÄRIE",
      "PRÄRIEN"
  ],
  "PASSPORT": [
      "DER",
      "PASS",
      "PÄSSE"
  ],
  "ALTERNATIVE": [
      "DIE",
      "ALTERNATIVE",
      "ALTERNATIVEN"
  ],
  "VANITY": [
      "DIE",
      "EITELKEIT",
      "EITELKEITEN"
  ],
  "DAM": [
      "DER",
      "DAMM",
      "DÄMME"
  ],
  "ABUSE": [
      "DER",
      "MISSBRAUCH",
      "MISSBRÄUCHE"
  ],
  "OLIVE": [
      "DIE",
      "OLIVE",
      "OLIVEN"
  ],
  "MINER": [
      "DER",
      "BERGMANN",
      "BERGLEUTE"
  ],
  "RESERVE": [
      "DIE",
      "RESERVE",
      "RESERVEN"
  ],
  "BACKUP": [
      "DIE",
      "SICHERUNGS",
      "SICHERUNGEN"
  ],
  "INTERCOM": [
      "DIE",
      "GEGENSPRECHANLAGE",
      "GEGENSPRECHANLAGEN"
  ],
  "SHAWL": [
      "DAS",
      "TUCH",
      "TÜCHER"
  ],
  "PLATTER": [
      "DER",
      "PLATTENTELLER",
      "PLATTEN"
  ],
  "IMPLICATION": [
      "DIE",
      "IMPLIKATION",
      "AUSWIRKUNGEN"
  ],
  "RUMBLE": [
      "DAS",
      "POLTERN",
      "RUMPELT"
  ],
  "ANNOUNCER": [
      "DER",
      "ANSAGER",
      "ANSAGER"
  ],
  "RUBBLE": [
      "DIE",
      "TRÜMMER",
      "TRÜMMERN"
  ],
  "AXE": [
      "DIE",
      "AXT",
      "ACHSEN"
  ],
  "TRANSMISSION": [
      "DIE",
      "ÜBERTRAGUNGS",
      "ÜBERTRAGUNGEN"
  ],
  "CRIB": [
      "DIE",
      "KRIPPE",
      "KRIPPEN"
  ],
  "HOP": [
      "DIE",
      "SPRUNG",
      "DER+HOPFEN"
  ],
  "GRAVEYARD": [
      "DER",
      "FRIEDHOF",
      "FRIEDHÖFE"
  ],
  "AROMA": [
      "DAS",
      "AROMA",
      "AROMEN"
  ],
  "DIALOGUE": [
      "DER",
      "DIALOG",
      "DIALOGE"
  ],
  "ROLLER": [
      "DIE",
      "WALZE",
      "ROLLEN"
  ],
  "CONGREGATION": [
      "DIE",
      "GEMEINDE",
      "GEMEINDEN"
  ],
  "TERRAIN": [
      "DAS",
      "GELÄNDE",
      "TERRAINS"
  ],
  "TRANSFER": [
      "DER",
      "TRANSFER",
      "TRANSFERS"
  ],
  "HARDWARE": [
      "DIE",
      "HARDWARE",
      "HARDWARES"
  ],
  "GENERATOR": [
      "DER",
      "GENERATOR",
      "GENERATOREN"
  ],
  "LUXURY": [
      "DIE",
      "LUXUS",
      "DER+LUXUS"
  ],
  "AUDITORIUM": [
      "DAS",
      "AUDITORIUM",
      "AUDITORIEN"
  ],
  "GOBLIN": [
      "DER",
      "KOBOLD",
      "GOBLINS"
  ],
  "PEG": [
      "DER",
      "ZAPFEN",
      "ZAPFEN"
  ],
  "DEFEAT": [
      "DIE",
      "NIEDERLAGE",
      "NIEDERLAGEN"
  ],
  "HAVEN": [
      "DAS",
      "HAVEN",
      "OASEN"
  ],
  "SPECIMEN": [
      "DIE",
      "PROBE",
      "PROBE"
  ],
  "HEARTH": [
      "DER",
      "HERD",
      "HERDE"
  ],
  "ADMISSION": [
      "DIE",
      "ZULASSUNG",
      "ZULASSUNGS"
  ],
  "OBSESSION": [
      "DIE",
      "BESESSENHEIT",
      "OBSESSIONEN"
  ],
  "LAUNCH": [
      "DER",
      "START",
      "STARTS"
  ],
  "PATSY": [
      "DIE",
      "PATSY",
      "SÜNDENBÖCKE"
  ],
  "DORM": [
      "DAS",
      "WOHNHEIM",
      "SCHLAFSÄLE"
  ],
  "GLEN": [
      "DAS",
      "GLEN",
      "TÄLER"
  ],
  "SAW": [
      "DIE",
      "SÄGE",
      "SÄGEN"
  ],
  "TIL": [
      "DIE",
      "TIL",
      "TILS"
  ],
  "APE": [
      "DER",
      "AFFE",
      "AFFEN"
  ],
  "STAGGER": [
      "DER",
      "STAFFELUNGS",
      "WANKT"
  ],
  "PUSSY": [
      "DIE",
      "FOTZE",
      "FOTZEN"
  ],
  "COLLECTOR": [
      "DER",
      "SAMMLER",
      "KOLLEKTOREN"
  ],
  "EARTHQUAKE": [
      "DAS",
      "ERDBEBEN",
      "ERDBEBEN"
  ],
  "FLAKE": [
      "DIE",
      "FLOCKE",
      "FLOCKEN"
  ],
  "SYLLABLE": [
      "DIE",
      "SILBE",
      "SILBEN"
  ],
  "BOUQUET": [
      "DAS",
      "BOUQUET",
      "BLUMENSTRÄUSSE"
  ],
  "SELECTION": [
      "DIE",
      "AUSWAHL",
      "AUSWAHLEN"
  ],
  "VOW": [
      "DER",
      "SCHWUR",
      "GELÜBDE"
  ],
  "GRANDDAUGHTER": [
      "DIE",
      "ENKELIN",
      "ENKEL"
  ],
  "SYMPTOM": [
      "DAS",
      "SYMPTOM",
      "SYMPTOME"
  ],
  "SCENARIO": [
      "DAS",
      "SZENARIO",
      "SZENARIEN"
  ],
  "RIOT": [
      "DER",
      "AUFRUHR",
      "UNRUHEN"
  ],
  "TIMING": [
      "DAS",
      "TIMING",
      "ZEITPUNKTE"
  ],
  "BURGER": [
      "DER",
      "BURGER",
      "BURGER"
  ],
  "PLUS": [
      "DIE",
      "PLUS",
      "PLUSPUNKTE"
  ],
  "SPARROW": [
      "DER",
      "SPATZ",
      "SPATZEN"
  ],
  "EMBASSY": [
      "DIE",
      "BOTSCHAFT",
      "BOTSCHAFTEN"
  ],
  "PODIUM": [
      "DAS",
      "PODIUM",
      "PODESTPLÄTZE"
  ],
  "ACCUSATION": [
      "DER",
      "VORWURF",
      "VORWÜRFE"
  ],
  "MANOR": [
      "DAS",
      "HERRENHAUS",
      "HERRENHÄUSER"
  ],
  "SHUFFLING": [
      "DAS",
      "SCHLURFEN",
      "SHUFFLINGS"
  ],
  "DOLPHIN": [
      "DER",
      "DELFIN",
      "DELPHINE"
  ],
  "KETTLE": [
      "DER",
      "WASSERKOCHER",
      "KESSEL"
  ],
  "TROOPER": [
      "DER",
      "SOLDAT",
      "SOLDATEN"
  ],
  "SALVATION": [
      "DIE",
      "RETTUNG",
      "RETTUNGEN"
  ],
  "VET": [
      "DER",
      "TIERARZT",
      "TIERÄRZTE"
  ],
  "RUNWAY": [
      "DIE",
      "LANDEBAHN",
      "START UND LANDEBAHNEN"
  ],
  "POPPY": [
      "DER",
      "MOHN",
      "DER+MOHN"
  ],
  "UPSTAIRS": [
      "DAS",
      "OBERGESCHOSS",
      "OBERGESCHOSSE"
  ],
  "LAVA": [
      "DIE",
      "LAVA",
      "LAVEN"
  ],
  "INSPIRATION": [
      "DIE",
      "INSPIRATION",
      "INSPIRATIONEN"
  ],
  "BOSOM": [
      "DER",
      "BUSEN",
      "BUSEN"
  ],
  "INTRUDER": [
      "DER",
      "EINDRINGLING",
      "EINDRINGLINGE"
  ],
  "SUPERMARKET": [
      "DER",
      "SUPERMARKT",
      "SUPERMÄRKTE"
  ],
  "TROPHY": [
      "DER",
      "POKAL",
      "TROPHÄEN"
  ],
  "JEALOUSY": [
      "DIE",
      "EIFERSUCHT",
      "EIFERSUCHT"
  ],
  "WARDEN": [
      "DER",
      "AUFSEHER",
      "DES DIREKTORS"
  ],
  "PASSAGEWAY": [
      "DER",
      "DURCHGANG",
      "DURCHGÄNGE"
  ],
  "MARINA": [
      "DER",
      "YACHTHAFEN",
      "JACHTHÄFEN"
  ],
  "FAREWELL": [
      "DAS",
      "LEBEWOHL",
      "ABSCHIEDE"
  ],
  "BELONGINGS": [
      "DIE",
      "GEGENSTÄNDE",
      "DER+ZUGEHÖRIGKEIT"
  ],
  "PROCESSION": [
      "DIE",
      "PROZESSION",
      "PROZESSIONEN"
  ],
  "ASTRONAUT": [
      "DER",
      "ASTRONAUT",
      "ASTRONAUTEN"
  ],
  "CROTCH": [
      "DER",
      "SCHRITT",
      "SCHRITTE"
  ],
  "SWEEP": [
      "DIE",
      "SWEEP",
      "SWEEPS"
  ],
  "RECOVERY": [
      "DIE",
      "ERHOLUNG",
      "ERHOLUNGEN"
  ],
  "HARNESS": [
      "DER",
      "KABELBAUM",
      "KABELBÄUME"
  ],
  "ANGUISH": [
      "DIE",
      "ANGST",
      "ÄNGSTE"
  ],
  "LOGO": [
      "DAS",
      "LOGO",
      "LOGOS"
  ],
  "LITTER": [
      "DER",
      "WURF",
      "WÜRFE"
  ],
  "MARINE": [
      "DIE",
      "MARINE",
      "MARINES"
  ],
  "RESENTMENT": [
      "DER",
      "GROLL",
      "RESSENTIMENTS"
  ],
  "COOP": [
      "DER",
      "COOP",
      "GENOSSENSCHAFTEN"
  ],
  "DRAKE": [
      "DAS",
      "DRAKE",
      "DRACHEN"
  ],
  "GYPSY": [
      "DER",
      "ZIGEUNER",
      "ZIGEUNER"
  ],
  "IMITATION": [
      "DIE",
      "NACHAHMUNG",
      "IMITATIONEN"
  ],
  "EMPLOYER": [
      "DER",
      "ARBEITGEBER",
      "ARBEITGEBER"
  ],
  "FRESHMAN": [
      "DER",
      "NEULING",
      "FRESHMANS"
  ],
  "PHENOMENON": [
      "DAS",
      "PHÄNOMEN",
      "PHÄNOMENE"
  ],
  "FLUTE": [
      "DIE",
      "FLÖTE",
      "FLÖTEN"
  ],
  "GREEK": [
      "DER",
      "GRIECHE",
      "GRIECHEN"
  ],
  "CONDO": [
      "DIE",
      "WOHNUNG",
      "EIGENTUMSWOHNUNGEN"
  ],
  "FOREFINGER": [
      "DER",
      "ZEIGEFINGER",
      "ZEIGEFINGERN"
  ],
  "BURIAL": [
      "DAS",
      "BEGRÄBNIS",
      "BESTATTUNGEN"
  ],
  "REPUBLIC": [
      "DIE",
      "REPUBLIK",
      "REPUBLIKEN"
  ],
  "EMERALD": [
      "DER",
      "SMARAGD",
      "SMARAGDE"
  ],
  "BATHROBE": [
      "DER",
      "BADEMANTEL",
      "BADEMÄNTEL"
  ],
  "TESTIMONY": [
      "DAS",
      "ZEUGNIS",
      "ZEUGENAUSSAGEN"
  ],
  "HINGE": [
      "DAS",
      "SCHARNIER",
      "SCHARNIERE"
  ],
  "BAKERY": [
      "DIE",
      "BÄCKEREI",
      "BÄCKEREIEN"
  ],
  "CONTEXT": [
      "DER",
      "KONTEXT",
      "KONTEXTE"
  ],
  "BARGAIN": [
      "DAS",
      "SCHNÄPPCHEN",
      "SCHNÄPPCHEN"
  ],
  "SAYING": [
      "DAS",
      "SPRICHWORT",
      "SPRICHWÖRTER"
  ],
  "FOREMAN": [
      "DER",
      "VORARBEITER",
      "FOREMANS"
  ],
  "SWAN": [
      "DER",
      "SCHWAN",
      "SCHWÄNE"
  ],
  "FLANNEL": [
      "DIE",
      "FLANELL",
      "WASCHLAPPEN"
  ],
  "INDICATION": [
      "DIE",
      "ANGABE",
      "INDIKATIONEN"
  ],
  "SIGNIFICANCE": [
      "DIE",
      "SIGNIFIKANZ",
      "BEDEUTUNGEN"
  ],
  "BEETLE": [
      "DER",
      "KÄFER",
      "KÄFER"
  ],
  "LEARNING": [
      "DIE",
      "LERN",
      "ERKENNTNISSE"
  ],
  "PUB": [
      "DAS",
      "LOKAL",
      "PUBS"
  ],
  "FRACTION": [
      "DIE",
      "FRAKTION",
      "FRAKTIONEN"
  ],
  "TROUT": [
      "DIE",
      "FORELLE",
      "FORELLEN"
  ],
  "CRUST": [
      "DIE",
      "KRUSTE",
      "KRUSTEN"
  ],
  "OVERCOAT": [
      "DIE",
      "ÜBERZUGS",
      "MÄNTEL"
  ],
  "GLINT": [
      "DAS",
      "GLITZERN",
      "REFLEXEN"
  ],
  "MEDAL": [
      "DIE",
      "MEDAILLE",
      "MEDAILLEN"
  ],
  "PERCEPTION": [
      "DIE",
      "WAHRNEHMUNG",
      "WAHRNEHMUNGEN"
  ],
  "WELCOME": [
      "DAS",
      "WILLKOMMEN",
      "WILLKOMMEN"
  ],
  "DICTIONARY": [
      "DAS",
      "WÖRTERBUCH",
      "WÖRTERBÜCHER"
  ],
  "METAPHOR": [
      "DIE",
      "METAPHER",
      "METAPHERN"
  ],
  "POVERTY": [
      "DIE",
      "ARMUT",
      "POVERTIES"
  ],
  "MAIN": [
      "DIE",
      "HAUPT",
      "HÄUPTER"
  ],
  "CLIMB": [
      "DER",
      "ANSTIEG",
      "ANSTIEGE"
  ],
  "LEASH": [
      "DIE",
      "LEINE",
      "LEINEN"
  ]
};
let Adjectives = {
English: [
"THIS",
"THAT",
"THESE",
"THOSE",
"ADVENTUROUS",
"DEPENDANT",
"ABSENT",
"AGRESSIVE",
"CLUELESS, INNOCENT",
"ACTIVE",
"CURRENT",
"ALL",
"ALONE",
"GENERAL",
"OLD",
"OLD-FASHIONED",
"OTHER",
"ADAPTABLE, FLEXIBLE",
"DECENT, MORAL",
"AMUSING",
"ANNOYING",
"POOR",
"ARROGANT",
"KIND",
"WELL BEHAVED",
"ATTRACTIVE",
"CAUSTIC, HARSH, ANNOYING",
"ENLIGHTENED, WELL-INFORMED",
"UPSET, EXCITED",
"OPEN-MINDED",
"EXCITING",
"UPRIGHT, SINCERE, PROPER",
"CRAZY, FLIPPED-OUT",
"EXCELLENT",
"TALENTED, GIFTED",
"EXCITED, ENTHUSIASTIC, PSYCHED",
"WELL-KNOWN, FAMOUS",
"POPULAR",
"COMFORTABLE, RELAXED",
"READY",
"WELL-KNOWN, FAMOUS",
"BUSY",
"MODEST, HUMBLE",
"DEMENTED, CRAZY",
"DEFINITE, CERTAIN",
"SPELLBINDING, FASCINATING",
"INEXPENSIVE, CHEAP",
"BITTER",
"IGNORANT, STUPID",
"BLONDE",
"ANGRY",
"MEAN",
"WELL-BEHAVED, GOOD",
"BROAD",
"CHARMING",
"COOL",
"THANKFUL, GRATEFUL",
"DEMOTIVATED",
"GERMAN",
"DENSE",
"FAT, THICK",
"STUPID",
"OUTSIDE",
"DIRTY",
"INSIDE",
"STUPID, DUMB",
"DARK",
"THIN, SKINNY",
"DYNAMIC",
"EVEN",
"REAL",
"SELFISH",
"SELF-CENTERED",
"OLD, FORMER",
"AMBITIOUS",
"HONEST",
"JEALOUS",
"OWN",
"IN A HURRY",
"SIMPLE, PLAIN, SIMPLY",
"CONCEITED, ARROGANT",
"UNIQUE, RARE",
"LONELY",
"AGREED, OF THE SAME MIND",
"ONLY",
"VERY MEAN, DETESTABLE, DISGUSTING",
"GROSS, DISGUSTING",
"ELEGANT, CLASSY",
"TOUCHY, SENSITIVE",
"NARROW, TIGHT",
"COMMITTED, DEDICATED",
"ENGLISH",
"NARROW-MINDED",
"LAID-BACK",
"SUCCESSFUL",
"TIRING",
"SERIOUS",
"EXHAUSTED",
"FIRST",
"ASTONISHED",
"FIRST-CLASS",
"FAIR",
"WRONG",
"FANTASTIC, GREAT",
"FASCINATING",
"LAZY",
"COWARDLY",
"COWARD",
"FINE, REFINED",
"READY",
"SOLID, STRONG, UNCHANGING",
"FATTY, FAT",
"FIT, FEELING GOOD",
"HARD-WORKING, INDUSTRIOUS, DILLIGENT",
"FLEXIBLE",
"ADVANCED",
"FRENCH",
"SAUCY, SMART-ALECKY",
"FREE",
"KIND, FRIENDLY",
"FRESH",
"HAPPY",
"HAPPY, MERRY, CHEERFUL",
"PIOUS",
"EARLY",
"CARING",
"HOSPITABLE, GENEROUS",
"EDUCATED",
"BROKEN",
"PATIENT",
"DANGEROUS",
"SENSITIVE, WITH FEELING",
"WITTY, BRILLIANT",
"STINGY, CHEAP",
"RUDE, LOW, IGNORANT",
"PLEASANT",
"EXACT",
"GENERAL",
"BRILLIANT, GENIUS",
"OPEN",
"STRAIGHT",
"JUST, RIGHT",
"VALUED, DEAR",
"CLEVER, SKILLFUL",
"SKILLFUL",
"CLOSED, RESERVED",
"TALKATIVE",
"SOCIAL, FRIENDLY",
"TALKATIVE",
"HEALTHY",
"GREEDY",
"POISONOUS",
"SMOOTH",
"CREDIBLE, BELIEVABLE",
"SIMILAR, SAME",
"HAPPY, LUCKY",
"CHARMING",
"CRUEL",
"COARSE, RUDE",
"BIG, LARGE, TALL",
"MAGNIFICENT",
"GENEROUS",
"CRABBY (DIALECT)",
"VALID",
"GOOD",
"WELL-DRESSED",
"IN A GOOD MOOD",
"WELL INFORMED",
"HALF",
"STUBBORN",
"SEVERE, UNKIND, HARD",
"HARD-HEADED, STUBBORN",
"UGLY",
"UGLY, HORRIBLE",
"UGLY",
"FREQUENT",
"HOT",
"CHEERFUL",
"LIGHT, BRIGHT",
"UNINHIBITED, UNWORRIED",
"CONVENTIONAL",
"WONDERFUL, MAGNIFICENT",
"HEARTLESS",
"HELPFUL",
"DECEITFUL, TRICKY",
"HIGH",
"HAUGHTY, PROUD",
"SNOOTY, STUCK UP",
"POLITE",
"HANDSOME, PRETTY",
"HUNGRY",
"IDEALISTIC",
"INTELLIGENT, SMART",
"INTERESTING",
"INTOLERANT",
"SAD",
"YOUNG",
"YOUNGER",
"COLD, UNFRIENDLY",
"BROKEN",
"CHILDISH",
"CLEAR",
"SENSATIONAL, GREAT, SUPAR",
"SMALL, LITTLE, SHORT",
"PETTY, NIT-PICKY",
"CLEVER, SMART",
"STRANGE, FUNNY",
"COMPLICATED",
"CONSISTENT",
"CONSERVATIVE",
"OUTGOING",
"FREE",
"STRONG",
"ILL, SICK",
"CREATIVE",
"CRITICAL",
"CROOKED",
"SHORT",
"UNSTABLE, MOODY",
"LONG",
"SLOW",
"BORING",
"LAZY, SLUGGISH",
"MOODY, CHANGING",
"NOISY",
"LOUD",
"SILENT",
"LIVING, ALIVE",
"EMPTY",
"EASY, LIGHT",
"AIRHEADED, SHALLOW",
"PASSIONATE, SERIOUS",
"QUIET, SOFT",
"LAST",
"LIBERAL",
"DEAR, NICE",
"LOVABLE",
"FAVOURITE",
"FUNNY",
"MELANCHOLY, PENSIVE",
"UNUSUAL, STRANGE",
"MISERABLE",
"MISTRUSTFUL",
"MODERN",
"FASHIONABLE, STYLISH",
"POSSIBLE",
"PLUMP, CHUBBY",
"MORAL",
"MOTIVATED",
"TIRED",
"ALERT, UPBEAT",
"MUSICAL",
"COURAGEOUS",
"CARELESS, NEGLIGENT",
"NEXT",
"NEAR",
"NAIVE",
"WET",
"WET",
"ENVIOUS",
"NERVOUS",
"NICE (PERSON), KIND",
"NEW, RECENT",
"CURIOUS",
"DEPRESSED",
"CUTE",
"LOW, MEAN",
"NORMAL",
"NECESSARY",
"NECESSARY",
"USEFUL",
"SUPERFICIAL, SHALLOW",
"OPEN",
"OPTIMISTIC",
"ORDERLY",
"PARTIAL, BIASED",
"PASSIVE",
"EMBARRASSING",
"PERFECT",
"PERSONAL",
"PESSIMISTIC",
"POPULAR",
"PRACTICAL",
"GREAT, MARVELLOUS",
"PUNCTUAL, ON TIME",
"RADICAL, REVOLUTIONARY",
"REFINED, ELEGANT",
"ROUGH",
"ROUGH",
"REALISTIC",
"REBELLIOUS",
"JUST",
"ALWAYS MUST BE RIGHT",
"HONEST, HAS INTEGRITY",
"RICH",
"RICH",
"MATURE, RIPE",
"RELIGIOUS",
"CORRECT, PROPER, TRUE, RIGHT",
"GIGANTIC",
"ROMANTIC",
"INCONSIDERATE",
"CONSIDERATE",
"PEACEFUL, CALM",
"ROUND",
"FULL",
"CLEAN, OWN",
"ANGRY, SOUR",
"CHIC, STYLISH",
"ASKEW",
"MESSY, DIRTY",
"SLENDER, SLIM",
"CLEVER, TRICKY, SMART",
"BAD, POOR",
"BAD",
"NARROW",
"DIRTY, NOT CLEAN",
"FAST, QUICK, RAPID",
"PRETTY",
"BEAUTIFUL, PRETTY, NICE",
"AWFUL, TERRIBLE",
"SHY",
"WEAK, POOR",
"HARD, HEAVY, DIFFICULT",
"HEAVY, AWKWARD",
"DEPRESSED, MELANCHOLIC",
"DIFFICULT",
"UNSELFISH",
"SELF-CONFIDENT",
"EGOTISTICAL",
"STRANGE, WIERD",
"SENSITIVE",
"SAFE, SECURE, CERTAINLY",
"CAREFREE, UNTROUBLED",
"CAREFREE, UNTROUBLED",
"CAREFUL",
"SPANISH",
"EXCITING, TENSE",
"LATE",
"SPONTANEOUS",
"ATHLETIC",
"MOCKING, MAKING FUN OF",
"STRONG, COOL",
"STEEP",
"PROUD",
"PROUD (OF)",
"STUBBORN",
"LOVES TO ARGUE",
"STRICT",
"MUTE",
"GREAT, SUPER",
"SWEET, NICE",
"LIKABLE, FRIENDLY",
"TACTLESS, HARSH",
"TACTFUL, SKILLFUL",
"BRAVE",
"LIVELY, HAS MUCH CHARACTER",
"EXPENSIVE, DEAR, VALUABLE",
"GREAT, SUPER",
"DEAD",
"SAD",
"LOYAL, FAITHFUL",
"DRY",
"TYPICAL(LY)",
"CRAZY, TOO TIGHTLY WOUND",
"SURPRISED",
"ENVIRONMENTALLY CONSCIOUS",
"ENVIRONMENTALLY DAMAGING",
"ENVIRONMENTALLY FRIENDLY",
"INDEPENDANT",
"DISAGREEABLE",
"CLUMSY",
"UNTROUBLED, WORRY-FREE",
"INCALCULABLE, UNPREDICTABLE",
"CARELESS",
"INFLEXIBLE",
"FAKE",
"INEXPERIENCED",
"UNFRIENDLY",
"SAFE",
"DISOBEDIENT",
"CLUMSY, UNSKILLFUL",
"NONPOISONOUS",
"UNBELIEVABLE",
"WEIRD",
"IMPOLITE, RUDE",
"VARIABLE",
"UNIMAGINABLE",
"INEVITABLE, IRRESISTABLE",
"RESPONSIBLE",
"UPTIGHT, MEAN, SPITEFUL",
"GLUM, DEPRESSING, ANNOYED",
"DEPENDABLE",
"EMBARASSED",
"REASONABLE, SENSIBLE",
"CRAZY",
"VARIOUS",
"TRUSTWORTHY",
"CONFUSED",
"SPOILED (BRAT)",
"IN DOUBT, DESPERATE",
"FULL",
"PERFECT",
"CAUTIOUS, CAREFUL",
"AWAKE",
"INSANE, CRAZY",
"TRUE",
"WARM, FRIENDLY",
"WARM HEARTED",
"SOFT",
"WHITE",
"FAR",
"LITTLE, SMALL",
"FEW, A LITTLE",
"VALUABLE",
"IMPORTANT",
"GROSS, DISGUSTING",
"WILD",
"TINY",
"REAL",
"FUNNY, SMART-ALECKY",
"WONDERFUL, GREAT, MARVELLOUS",
"BEAUTIFUL, FABULOUS",
"NUMEROUS",
"ABSENT-MINDED, CONFUSED",
"PRETTY",
"ANGRY",
"COINCIDENTAL, ACCIDENTAL",
"SATISFIED, CONTENT, PLEASED",
"TOGETHER",
"RELIABLE"
],
German: [
"DAS",
"DAS@2",
"DIESE",
"JENE",
"ABENTEUERLICH",
"ABHÄNGIG",
"ABWESEND",
"AGGRESSIV",
"AHNUNGSLOS",
"AKTIV",
"AKTUELL",
"ALL-",
"ALLEIN",
"ALLGEMEIN",
"ALT",
"ALTMODISCH",
"ANDER-",
"ANPASSUNGSFÄHIG",
"ANSTÄNDIG",
"AMÜSANT",
"ÄRGERLICH",
"ARM",
"ARROGANT",
"ART",
"ARTIG",
"ATTRAKTIV",
"ÄTZEND",
"AUFGEKLÄRT",
"AUFGEREGT",
"AUFGESCHLOSSEN",
"AUFREGEND",
"AUFRICHTIG",
"AUSGEFLIPPT",
"AUSGEZEICHNET",
"BEGABT",
"BEGEISTERT",
"BEKANNT",
"BELIEBT / POPULÄR",
"BEQUEM",
"BEREIT",
"BERÜHMT",
"BESCHÄFTIGT",
"BESCHEIDEN",
"BESCHEUERT",
"BESTIMMT",
"BEZAUBERND",
"BILLIG",
"BITTER",
"BLÖD",
"BLONDINE",
"BÖSE",
"BOSHAFT",
"BRAV",
"BREIT",
"CHARMANT",
"COOL",
"DANKBAR",
"DEMOTIVIERT",
"DEUTSCH",
"DICHT",
"DICK",
"DOOF",
"DRAUSSEN",
"DRECKIG",
"DRINNEN",
"DUMM",
"DUNKEL",
"DÜNN",
"DYNAMISCH",
"EBEN",
"ECHT",
"EGOISTISCH",
"EGOZENTRISCH",
"EHEMALIG",
"EHRGEIZIG",
"EHRLICH",
"EIFERSÜCHTIG",
"EIGEN",
"EILIG",
"EINFACH",
"EINGEBILDET",
"EINMALIG",
"EINSAM",
"EINVERSTANDEN",
"EINZIG",
"EKELHAFT",
"EKLIG",
"ELEGANT",
"EMPFINDLICH",
"ENG",
"ENGAGIERT",
"ENGLISCH",
"ENGSTIRNIG",
"ENTSPANNEND",
"ERFOLGREICH",
"ERMÜDEND",
"ERNST",
"ERSCHÖPFT",
"ERST",
"ERSTAUNT",
"ERSTKLASSIG",
"FAIR",
"FALSCH",
"FANTASTISCH",
"FASZINIEREND",
"FAUL",
"FEIG",
"FEIGLING",
"FEIN",
"FERTIG",
"FEST",
"FETT",
"FIT",
"FLEISSIG",
"FLEXIBEL",
"FORTGESCHRITTEN",
"FRANZÖSISCH",
"FRECH",
"FREI",
"FREUNDLICH",
"FRISCH",
"FROH",
"FRÖHLICH",
"FROMM",
"FRÜH",
"FÜRSORGLICH",
"GASTFREUNDLICH",
"GEBILDET",
"GEBROCHEN",
"GEDULDIG",
"GEFÄHRLICH",
"GEFÜHLVOLL",
"GEISTREICH",
"GEIZIG",
"GEMEIN",
"GEMÜTLICH",
"GENAU",
"GENERAL",
"GENIAL",
"GEÖFFNET",
"GERADE",
"GERECHT",
"GESCHÄTZT",
"GESCHEIT",
"GESCHICKT",
"GESCHLOSSEN",
"GESCHWÄTZIG",
"GESELLIG",
"GESPRÄCHIG",
"GESUND",
"GIERIG",
"GIFTIG",
"GLATT",
"GLAUBWÜRDIG",
"GLEICH",
"GLÜCKLICH",
"GOLDIG",
"GRAUSAM",
"GROB",
"GROSS",
"GROSSARTIG",
"GROSSZÜGIG",
"GRÜNTIG",
"GÜLTIG",
"GUT",
"GUT ANGEZOGEN",
"GUT GELAUNT",
"GUT INFORMIERT",
"HALB",
"HALSSTARRIG",
"HART",
"HARTNÄCKIG",
"HÄSSLICH",
"HÄSSLICH",
"HÄSSLICH",
"HÄUFIG",
"HEISS",
"HEITER",
"HELL",
"HEMMUNGSLOS",
"HERKÖMMLICH",
"HERRLICH",
"HERZLOS",
"HILFREICH",
"HINTERLISTIG",
"HOCH",
"HOCHMÜTIG",
"HOCHNÄSIG",
"HÖFLICH",
"HÜBSCH",
"HUNGRIG",
"IDEALISTISCH",
"INTELLIGENT",
"INTERESSANT",
"INTOLERANT",
"JÄMMERLICH",
"JUNG",
"JÜNGER",
"KALT",
"KAPUTT",
"KINDISCH",
"KLAR",
"KLASSE",
"KLEIN",
"KLEINLICH",
"KLUG",
"KOMISCH",
"KOMPLIZIERT",
"KONSEQUENT",
"KONSERVATIV",
"KONTAKTFREUDIG",
"KOSTENLOS",
"KRÄFTIG",
"KRANK",
"KREATIV",
"KRITISCH",
"KRUMM",
"KURZ",
"LABIL",
"LANG",
"LANGSAM",
"LANGWEILIG",
"LÄSSIG",
"LAUNISCH",
"LAUT",
"LAUT",
"LAUTLOS",
"LEBENDIG",
"LEER",
"LEICHT",
"LEICHTSINNIG",
"LEIDENSCHAFTLICH",
"LEISE",
"LETZT",
"LIBERAL",
"LIEB",
"LIEBENSWÜRDIG",
"LIEBLINGS-",
"LUSTIG",
"MELANCHOLISCH",
"MERKWÜRDIG",
"MISERABEL",
"MISSTRAUISCH",
"MODERN",
"MODISCH",
"MÖGLICH",
"MOLLIG",
"MORALISCH",
"MOTIVIERT",
"MÜDE",
"MUNTER",
"MUSIKALISCH",
"MUTIG",
"NACHLÄSSIG",
"NÄCHST-",
"NAH",
"NAIV",
"NASS",
"NASS",
"NEIDISCH",
"NERVÖS",
"NETT",
"NEU",
"NEUGIERIG",
"NIEDERGESCHLAGEN",
"NIEDLICH",
"NIEDRIG",
"NORMAL",
"NÖTIG",
"NOTWENDIG",
"NÜTZLICH",
"OBERFLÄCHLICH",
"OFFEN",
"OPTIMISTISCH",
"ORDENTLICH",
"PARTEIISCH",
"PASSIV",
"PEINLICH",
"PERFEKT",
"PERSÖNLICHER",
"PESSIMISTISCH",
"POPULÄR",
"PRAKTISCH",
"PRIMA",
"PÜNKTLICH",
"RADIKAL",
"RAFFINIERT",
"RAU",
"RAUH",
"REALISTISCH",
"REBELLISCH",
"RECHT",
"RECHTHABERISCH",
"REDLICH",
"REICH",
"REICH",
"REIF",
"RELIGIÖS",
"RICHTIG",
"RIESIG",
"ROMANTISCH",
"RÜCKSICHTSLOS",
"RÜCKSICHTSVOLL",
"RUHIG",
"RUND",
"SATT",
"SAUBER",
"SAUER",
"SCHICK",
"SCHIEF",
"SCHLAMPIG",
"SCHLANK",
"SCHLAU",
"SCHLECHT",
"SCHLIMM",
"SCHMAL",
"SCHMUTZIG",
"SCHNELL",
"SCHÖN",
"SCHÖN",
"SCHRECKLICH",
"SCHÜCHTERN",
"SCHWACH",
"SCHWER",
"SCHWERFÄLLIG",
"SCHWERMÜTIG",
"SCHWIERIG",
"SELBSTLOS",
"SELBSTSICHER",
"SELBSTSÜCHTIG",
"SELTSAM",
"SENSIBEL",
"SICHER",
"SORGENFREI",
"SORGENLOS",
"SORGFÄLTIG",
"SPANISCH",
"SPANNEND",
"SPÄT",
"SPONTAN",
"SPORTLICH",
"SPÖTTISCH",
"STARK",
"STEIL",
"STOLZ",
"STOLZ (AUF)",
"STÖRRISCH",
"STREITSÜCHTIG",
"STRENG",
"STUMM",
"SUPER",
"SÜSS",
"SYMPATHISCH",
"TAKTLOS",
"TAKTVOLL",
"TAPFER",
"TEMPERAMENTVOLL",
"TEUER",
"TOLL",
"TOT",
"TRAURIG",
"TREU",
"TROCKEN",
"TYPISCH",
"ÜBERGESCHNAPPT",
"ÜBERRASCHT",
"UMWELTBEWUSST",
"UMWELTFEINDLICH",
"UMWELTFREUNDLICH",
"UNABHÄNGIG",
"UNANGENEHM",
"UNBEHOLFEN",
"UNBEKÜMMERT",
"UNBERECHENBAR",
"UNBESONNEN",
"UNBEUGSAM",
"UNECHT",
"UNERFARHREN",
"UNFREUNDLICH",
"UNGEFÄHRLICH",
"UNGEHORSAM",
"UNGESCHICKT",
"UNGIFTIG",
"UNGLAUBLICH",
"UNHEIMLICH",
"UNHÖFLICH",
"UNTERSCHIEDLICH",
"UNVORSTELLBAR",
"UNWIDERSTEHLICH",
"VERANTWORTLICH",
"VERBISSEN",
"VERDRIESSLICH",
"VERLÄSSLICH",
"VERLEGEN",
"VERNÜNFTIG",
"VERRÜCKT",
"VERSCHIEDEN",
"VERTRAUENSWÜRDIG",
"VERWIRRT",
"VERWÖHNT",
"VERZWEIFELT",
"VOLL",
"VOLLKOMMEN",
"VORSICHTIG",
"WACH",
"WAHNSINNIG",
"WAHR",
"WARM",
"WARMHERZIG",
"WEICH",
"WEISS",
"WEIT",
"WENIG",
"WENIGE, EIN WENIG",
"WERTVOLL",
"WICHTIG",
"WIDERLICH",
"WILD",
"WINZIG",
"WIRKLICH",
"WITZIG",
"WUNDERBAR",
"WUNDERSCHÖN",
"ZAHLREICH",
"ZERSTREUT",
"ZIEMLICH",
"ZORNIG",
"ZUFÄLLIG",
"ZUFRIEDEN",
"ZUSAMMEN",
"ZUVERLÄSSIG"
]
}

let germanVerbs = {
English:
[
"DO","STRETCH OUT","WASTE","CASTRATE","ALIENATE","ALTER","ABANDON","WORK OFF","DEGENERATE","CLEAN","EXCAVATE","MARK",
"SKIN","BLOW AWAY","TAKE DOWN","WAIVE","KEEP OFF","BITE OFF","STRIP","GET","RECALL","CANCEL","WHEEDLE","PAY OFF","TURN OFF","PORTRAY","UNTIE","BEG SOMEONES PARDON FOR SOMETHING","BLOW AWAY","FLAKE OFF","GET TO","FADE","STOP DOWN","REBUFF","BLOCK","FADE","SLANT","BREAK OFF","RETARD","BURN OUT","ABBREVIATE","DISSUADE","CRUMBLE AWAY","SCALD","DEBIT","BUFF","BRUSH OFF","BRUSH OFF","SERVE","CHECK OUT","BE FOR THE CHOP","DAM","ABDICATE","REMOVE","DISTIL OFF","SEAL","CEDE","ABDICATE","RELEGATE","TURN OFF","DRIFT","THROTTLE BACK","PRINT","PULL THE TRIGGER","REDUCE","ROAR OFF","ABDUCT","ABATE","DEPRIVE","HARVEST","ABERRATE","DEPART","FALL OFF","DEFLECT","INTERCEPT","RUN","CHAMFER","WRITE","CUSHION","SWEEP OFF","DISPATCH","FIRE","FILTER OFF","COMPENSATE","FISH OUT","FLATTEN OUT","SHOOT DOWN WITH ANTIAIRCRAFT FIRE","FALL","DEPART","DRAIN","TAKE A PHOTO","QUERY","CHAMFER","FREEZE OFF","PAY","FILL","DELIVER","DEPART","BREAK THE HABIT","STRAIN","DELIMIT","CHOP OFF","TICK OFF","PREVENT","TREAT","GET LOST","HANG OFF","PISS OFF","FLAY","CUT","FILE","REMEDY","TIRE OUT","PLANE OFF","PICK UP","CLEAR A FOREST","WIRETAP A PHONE CALL","STRIP","TIRE OUT","ABJUDGE","DIE","SEARCH AN AREA","LASH","SEQUESTER","CASH UP","BUY","SCOUR","CLARIFY","PARRY","PINCH OFF","SHOOT DOWN","BREAK","CANOODLE","DETACH","RUN","UNCOUPLE","SCRAPE","COOL","DISCONTINUE","COPY","ABBREVIATE","UNLOAD","DEPOSIT","UNLOAD","SURCEASE","DECEASE","LICK OFF","PUT DOWN","DECLINE","DIVERT","DISTRACT","READ","DELIVER","WIPE OFF","REMOVE","REMOVE","LOSE WEIGHT","ADMONISH","LOG OUT","MEASURE","SCRAG","CUT A BABYS UMBILICAL CORD","TAKE OVER","AGREE","ABRADE","ABRADE","ABOLISH","SUBSCRIBE","HAVE A MISCARRIAGE","PACK","TRACE","PEEL OFF","TRICKLE DOWN","PICK","EXTORT","UNLIMBER","DISQUALIFY","CRUSH","SHAVE OFF","CLEAR AWAY","WORK OFF","SETTLE","RUB OFF","DEPLETE","DEPART","TEAR OFF","BOLT","FORCE OUT","ROCK OUT","ABROGATE","MOVE AWAY","RETRIEVE","ROUND DOWN","DISARM","SLIP DOWN","CALL OFF","SAW OFF","SKIM","DROWN","VACUUM","ABOLISH","TURN OFF","PEEK","SECRETE","SEND","GO AWAY","SCREEN","SLAUGHTER","KNOCK OFF","TOW","END","SHOOT DOWN","GREASE","REMOVE MAKE UP","RUB OFF WITH EMERY","LOP","SKIM","SCARE","PLAGIARIZE","DIGRESS","ABJURE","SAIL OFF","BLESS","FORESEE","SIEVE","ROPE DOWN","FORWARD","LOWER","SELL","MAKE SURE","SINK","PASS","SECRETE","IMBIBE","SPLIT OFF","SLIM","STORE","PLAY","DENY","JUMP OFF","CUM","RINSE","UNWIND","DUST OFF","CUT OFF","STAKE OUT","DESCEND","PUT DOWN","STAMP","ATROPHY","WEAN","VOTE","REPEL","PUNISH","ABSTRACT","RING","DENY","BLUNT","CRASH","BRACE","UNRIG","SUBMERGE","PARTITION OFF","TYPEWRITE","RELIGION","OUTWEAR","TAKE TO HOSPITAL","ABORT","SEPARATE","WEAR OUT","DRAIN","DISMISS","DAB AWAY","WEIGH","VOTE OUT","MODIFY","EMIGRATE","AWAIT","WASH","ALTERNATE","BEAT BACK","DIFFER","REJECT","AVERT","ENTICE","UNHORSE","DEVALUE","WIND UP","APPEASE","WEIGH OUT","WIPE","BREAK UP","CRUSH","COUNT","FENCE OFF","COPY","WITHDRAW","BE AIMED","BUZZ OFF","EXTORT","BE CAREFUL","OUTLAW","RESPECT","BE CAREFUL","GROAN","PLUG AWAY","ADAPT","ADD","ENNOBLE","ADJOIN","ADOPT","ADMIRE","ADDRESS","ADSORB","AERATE","PLACARD","AFFIX","AFFECT","SPEAK ILL OF","AGGRAVATE","AGGREGATE","ACT","AGITATE","AVENGE","RESEMBLE","SUSPECT","LOOK SIMILAR","AIRBRUSH","ACCOMMODATE","ACCREDIT","ACCUMULATE","ACQUIRE","ACTIVATE","UPDATE","ACCENTUATE","ACCEPT","ALARM","PLAY UP","ALIMENT","ALIQUOT","STAND ALONE","ALLERGISE","ADDRESS","ALLOCATE","ALPHABETIZE","ALPHABETIZE","AGE","ALUMINIZE","AMALGAMATE","AMELIORATE","LAY OUT","RUN AMOK","AMORTIZE","AMPUTATE","HOLD OFFICE","AMUSE","ANALYZE","ANESTHETIZE","ANASTOMOSE","BE IN THE OFFING","PANDER","GROW","BITE","BARK","APPOINT A TIME FOR","WORSHIP","OFFER","LOOK AT","WINK AT","SEAR","IN HOT FAT","START","KINDLE","INSTALL","CONTINUE","CHANGE","HINT","THICKEN","TENDER","FLOG","THREATEN","APPROPRIATE","NAUSEATE","TENDER","ACKNOWLEDGE","HIT","BE INCURRED","BEGIN","CHAMFER","TOUCH","APPEAL","CREATE","MOISTEN","CHEER","FLANGE","BEG","REQUEST","BEFRIEND","APPEND","FEEL","LEAD","STATE","COME ON","BELONG TO","ANGLE",
"ADAPT","ANNEX","ATTACK","BORDER ON","WORRY","WATCH","WEAR","STOP","PILE UP","RISE","ATTACH","LEAVE TO SMB S DISCRETION","HEAT",
"SIGN UP","IDOLIZE","HEAR","ANIMATE","CAST ANCHOR","CHAIN","ACCUSE","STICK","CLICK","KNOCK","ARRIVE","PUKE","SCRATCH","HOLD AGAINST",
"CHECK","ANNOUNCE","CRANK UP","SMILE","SMILE AT","BIND","ARRIVE","START UP","START","RING","CREATE","ALLOY","GUIDE","LIGHT UP","ATTRACT",
"LIE TO SOMEBODY","DRESS","SEND A REMINDER","PAINT","ARROGATE","ANNOUNCE","MARK","RENT","APPROXIMATE","ASSUME","ANNEX","ADVERTISE","ANNOTATE","ANNUL","ANODIZE","ORDER","ADAPT","GROW","PING","PISS ON","MOB","DENOUNCE","TRY ON","SNARL AT","ADDRESS","ENRICH","ARRIVE","MARK OUT","PERPETRATE","CALL","TOUCH","ANNOUNCE","ACCUMULATE","ACIDIFY","PURCHASE","SWITCH ON","LOOK AT","GET READY","HARNESS","BUMP","CREEP UP ON","AFFILIATE","NESTLE","SMEAR","BUCKLE ON","YELL AT","SCREW ON","WRITE TO","SHOUT AT","ACCUSE","BLACKEN","SWELL","SWEAT","LOOK AT","COUNTERSINK","IMPLEMENT","SETTLE","SPIT","ALLUDE","SHARPEN","SPUR","ADDRESS","WASH UP","INCITE","STARE","INFECT","QUEUE","INCREASE","EMPLOY","HEAD FOR","STARE","STRIKE UP","NUDGE","STRIVE FOR","COLOR","MAKE AN EFFORT","POKE","SWAMP","TAP","ANTICIPATE","URGE","BEGIN","ANSWER","ENTRUST","ASSIMILATE","TARGET","ACCRUE","COME OVER","WARM UP","INSTRUCT","APPLY","DISGUST","REPORT","PUT ON","LIGHT","DOUBT","DEFECATE","APPEAL","APPLAUD","APPLY","FETCH","QUALIFY","APPROPRIATE","PAINT IN WATERCOLOURS","WORK","ARCHIVE","ANNOY","ARGUE","SUSPECT","ARRANGE","ARREST","ARREST","REALIGN","ARTICULATE","BROWSE","ASPHALT","ASPIRATE","PRESERVE","ASSIMILATE","ASSIST","ASSOCIATE","ESTEEM","BREATHE","ATOMIZE","ATTACK","CERTIFY","ATTRACT","ETCH","FEED","AUDIT","GET ON SOMEONES NERVES","BE UP","REFURBISH","DRAW A DEEP BREATH","LAY OUT","BUILD","BLOW UP","CONVULSE","BITE OPEN","PREPARE","IMPROVE","PRESERVE","MUSTER","UNTIE","INFLATE","STAY UP","FLASH","FLOURISH","JACK UP","USE UP","OPEN","SEX UP","UPSET","PRANG","IRON ON","BURDEN","DETECT","OBTRUDE","UNSCREW","DISENTANGLE","CLENCH","RISE FROM THE DEAD","EAT UP","STAND OUT","CATCH","UNDERSTAND","FIND","BLAZE","ASK","EAT UP","FREEZE UP","BUILD","FILL UP","RELINQUISH","OPEN","EXCITE","POUR WATER ON","GLOW","CAPTURE","BALK","HANG UP","PICK UP","HEAT UP","CATCH UP","CEASE","CLEAR","ENLIGHTEN","AFFIX","HANG","BRING TO THE BOIL","ARISE","CONCENTRATE SOMETHING BY BOILING AWAY","TURN UP","REVOKE","CHARGE","LEAVE OPEN","WAYLAY","RUN AGROUND","HANG UP","REBEL","LIST","DISSOLVE","OPEN","MARCH UP","PAY ATTENTION","SHAKE UP","REBEL","CHEER","ACCEPT","IMPOSE ON","IMPOSE ON","FEED UP","PAY ATTENTION","FIX","BURST","RUFFLE UP","IMPRINT","THUD","PUMP UP","GATHER UP","ROUGHEN","CLEAN UP","CHARGE UP","MAINTAIN","EXCITE","WEAR OUT","RIP","UNRAVEL","RAISE","UNBOLT","UNBOLT","ROLL UP","CALL","ROUND UP","INCREASE ARMAMENT","RECITE","SUCK UP","LIGHT UP","STARTLE","PUSH OPEN","OPEN","UNLOCK","GIVE A SOB","PICK UP","CUT OPEN","WRITE DOWN","CRY OUT","RAISE","WELD","LOOK UP","PUT ON","MOUNT","SPLIT UP","UNLOCK","GIVE AIRS","JUMP UP","SPLASH UP","TRACK DOWN","STACK UP","RISE","ASCEND","PUT UP","EMBROIDER","INCREASE","BUMP OPEN","VISIT","RIG","REFUEL","COME UP","THAW","DIVIDE","PRESENT","APPLY","BLOAT","UNDO","APPEAR","OPEN UP","WAKE UP","GROW UP","HEAT UP","COME UP","WAKE UP","SOAK","FEATURE","SPEND","POSE","APPRECIATE","WRAP","INCITE","CHURN","LIST","RECORD","SHOW","TEASE","TWIRL UP","WORK OUT","DEGENERATE","BREATHE OUT","PAY FOR","DREDGE","NOSE OUT","REMOVE","BONE","MEND","EXPLOIT","EDUCATE","STAY OUT","BLEED OUT","BOMB OUT","BORROW","BREAK OUT","SPREAD OUT","HATCH","IRON OUT","BOO","EXPAND","THINK UP","PRINT OUT","SQUEEZE","FALL APART","GAPE","DEAL WITH","CHOOSE","SELECT","FAIL","FLIP OUT","FORMULATE","QUESTION","EXECUTE","FILL IN","SPEND","GO OUT","BALANCE","SLIP","DIG UP","EXCLUDE","EXCLUDE","HAMMER OUT","NEGOTIATE","DELIVER","HARDEN","LEVER","DIG","HELP OUT","HAUL OFF","STARVE OUT","CROSS OUT","SWEEP OUT","BE FAMILIAR WITH STH","EXCLUDE","KNOCK","EXCAVATE","MAKE DO","COMMENT OUT","VENT","LAUGH AT","UNLOAD","SWAP","LEAVE OUT","USE TO CAPACITY","DISCONTINUE","EXHAUST","LIVE","INTERPRET","WEAR OUT","LEND","THIN OUT","EXTRADITE","BE DISPLAYED","OFFER A REWARD","SPOON UP","LOG OUT","EXTINGUISH","INDUCE","TRIGGER","SOUND","TURN OFF","COLOUR IN","OUTMANEUVER","ELIMINATE","MUCK OUT","DRESS","USE","UNPACK","WHIP","BLAZON ABROAD","TRY OUT","MOVE OUT","SORT OUT","FREAK OUT","ROB","SMOKE OUT","CALCULATE","TALK OUT OF","SUFFICE","DEPART","TEAR OUT","EXHAUST","ALIGN","ERADICATE","DISENGAGE","EXCLAIM","REST","EQUIP","SLIP","TESTIFY","SUCK OUT","SWITCH OFF","EXCRETE","SERVE DRINKS","DISEMBARK","SIGNPOST","TELL OFF","GUT","SLEEP OFF","DISLODGE","LOCK OUT","HATCH","DECORATE","WRITE OUT","SHAKE OUT","DISTRIBUTE","LOOK","EMIT","EXPRESS","OVERRIDE WAS","EXPOSE","SIT OUT","SORT OUT","AVOID","SPIN OUT","SPY ON","PRONOUNCE","SPIT","RINSE","EQUIP","STAND","GET OFF A VEHICLE","EXHIBIT","BECOME EXTINCT","STUFF","EMIT","EMANATE","STRETCH OUT","SELECT","TARE","EXCHANGE","DELIVER","SEEP OUT","DRINK UP","EXERCISE","SELL OUT","RIGHT","SELECT","ROLL OUT","EMIGRATE","DODGE","DISEMBOWEL","EXPEL","EXPAND","EJECT","EVALUATE","UNWRAP","AFFECT","WIPE OUT","BALANCE","INDENT","COUNT","PAY OUT","DRAIN","AWARD","SET FORTH","PLUCK","AUTHENTICATE","AUTHENTICATE","AUTOGRAPH","AUTOCLAVE","AUTOMATE","ADVANCE","ADVISE","SOFTEN","AXIOMATISE","ACETYLATE","BABBLE","BABYSIT","STICK","BATHE","TRIVIALIZE","EXCAVATE","TOAST","BAYONET","BALANCE","SCRAP","BALKANIZE","BALLAST","CLENCH","BANG","EMBALM","BANALIZE","BANDAGE","TAME","FEAR","GO BANKRUPT","GO BANKRUPT","ORDER","STICK","SHAVE","WRAP IN BACON","LAMENT","BE BASED ON","HYBRIDIZE","TINKER","BATIK","BUILD","DANGLE","INTEND","NOTICE","PLOUGH","BEAM","CLAIM","COMPLAIN ABOUT","APPLY FOR","ANSWER","HANDLE","SUPERVISE","ASK TO DO","EYE","BUILD","TREMBLE","ILLUSTRATE","BECK KNIVES","ROOF","THANK","DEPLORE","COVER","CONSIDER","MEAN","SERVE","CAUSE","PRESS HARD","THREATEN","DEPRESS","PRINT ON","NEED","HURRY","IMPRESS","INFLUENCE","SPOIL","END","BURY","ENABLE","CRUISE","AFFECT","DEAL","ORDER","AFFIX","MOISTEN","BE LOCATED","STAIN","FLOCK","SPUR","OBEY","BRING","ASK","FREE","DISCONCERT","PACIFY","SATISFY","LIMIT","FERTILISE","FEEL","FILL","FEEL UP","FEAR","BACK","OGLE","GAS","COPULATE","HAPPEN","ENCOUNTER","COMMIT","DESIRE","FILL WITH ENTHUSIASM","BEGIN","ACQUIT","ACCOMPANY","MAKE HAPPY","CONGRATULATE",
"REPRIEVE","BE CONTENT","BURY","GROPE",
"UNDERSTAND","LIMIT","JUSTIFY","PLANT","GREET","FAVOR","AFFLICT","KEEP","TREAT","INSIST","CLAIM","RECTIFY",
"MAKE SOMETHING HOMELIKE FOR SOMEONE",
"HEAT","MAKE DO","BOTHER","ACCOMMODATE",
"MONOPOLIZE","HEED","HINDER","PROTECT","MAINTAIN","PRODUCE","CONFESS"
,"CONFESS","ADD","STACK","ATTACH","INCLUDE","ENDORSE","STASH","PUSH ASIDE","ENTOMB","COME TO THE ASSISTANCE","BITE","ASSIST","CONTRIBUTE","AGREE","CONTRIBUTE","JOIN","WITNESS","PICKLE","HUNT","APPROVE","LAMENT","CHEER","ANTAGONIZE","BECOME KNOWN","PROSELYTIZE","CONFESS","COMPLAIN","APPLAUD","DRESS","OPPRESS","COOK FOR","GET","SOIL WITH FECES","CONFIRM","WREATH","CROSS","BATTLE","CRITICIZE","PROVE","SMILE AT","BELEAGUER","PROSECUTE","LEAVE","BURDEN","BADGER","WATCH","EAVESDROP","INVIGORATE","LICK","DOCUMENT","AFFRONT","ILLUMINATE","PROVIDE","BARK","COMMEND","REWARD","VENTILATE","LIE TO","AMUSE","SEIZE HOLD","PAINT","CRITICIZE","FLOUR","NOTICE","PITY","MAKE AN EFFORT","MOTHER","INFORM","DISCRIMINATE AGAINST","BEHAVE","ENVY","NAME","MOISTEN","GRADE","NEED","USE","USE","WATCH","PLANT","PISS ON","DECIDE TO SOMETHING","ADVISE","DELIBERATE","DEPRIVE","CALCULATE","ENTITLE","DISCUSS","WATER","ENRICH","SETTLE","RIDE OVER","STAND BY","PROVIDE","REGRET","SAVE","GO MOUNTAINEERING","REPORT","CORRECT","RING","BURST","CONSIDER","APPOINT","BE BASED","CALM","TOUCH","SMUT","MEAN","INSEMINATE","CALM DOWN","DAMAGE","PROCURE","ABSORB","ABASH","SHADOW","SHINE","ATTEST","SCREW","CROP BEARD","COAT","GET","BOMBARD","ABUSE","PROTECT","STEAM UP","CONFISCATE","CREEP UP ON","ACCELERATE","DECIDE","SPREAD","SOIL","CUT","COVER WITH ARTIFICIAL SNOW","EUPHEMIZE","GRAVEL","LIMIT","DESCRIBE","LABEL","ACCUSE","PROVIDE WITH","PROTECT","WEIGHT DOWN","BILK","CONJURE","CHEAT","ANIMATE","DISPOSE","RESERVE","COLLATERALIZE","VISIT","VISIT","BEAT","HONOUR","BETHINK","POSSESS","SOLE","GET","ENTERTAIN","SPIT","DISCUSS","SPRINKLE","BETTER","ENCOURAGE","CONFIRM","MARVEL AT","BRIBE","SUCCEED","STEAL FROM","CLIMB","ORDER","TAX","EMBROIDER","DETERMINE","PUNISH","IRRADIATE","ENDEAVOUR","PATROL","DENY","SPRINKLE","PUT SEATING IN","VISIT","BEFOUL","FUEL","OPERATE","NUMB","PARTICIPATE","PRAY","ASSEVERATE","STRESS","STRESS","BEWITCH","LOOK AT","COME","MOURN","CONCERN","RUN","ENTER","TAKE CARE OF","GET DRUNK","SADDEN","BETRAY","BEG","BED","BEND","WORRY","JUDGE","POPULATE","TELL WHAT TO DO","BE IMMINENT","PREFER","GUARD","ARM","KEEP","PROVE TRUE","WATER","INDUCE","ARMOR","MOURN","PROVE","APPLY","EFFECT","EVALUATE","APPROVE","BRING ABOUT","TREAT","INHABIT","ADMIRE","PAY","ENCHANT","DENOTE","WITNESS","ACCUSE","MOVE IN","ESTIMATE","BEWITCH","SUBSIDIZE","DOUBT","BEAT","BEND","DRINK BEER","BID","BIKE","FORM","AGREE","JINGLE","TIE","RAIN CATS AND DOGS","BIOPSY","ASK","BIVOUAC","BARK BRIEFLY","SWELL","SMOKE","DISGRACE","BLANCH","BLOW","SCROLL","BLUE","SKIVE","COUGH UP","COUGH UP","STAY","BLEACH","BLIND","WOUND","LOOK","FLASH","SQUINT","OBSTRUCT","FOOL AROUND","BLEAT","DYE BLOND","BUBBLE","BLUFF","BLOOM","BLEED","POLISH WITH WAX","BORE","BAWL","FIRE","THUD","BOMB","EXAMINE","BOOM","BOOT","LEND","BOTANIZE","BOWL","BOX","BOYCOTT","BABBLE","BOAST","SURGE","DENOUNCE","FRY","PLAY A VIOLA","NEED","BREW","TAN","RUSH","BREAK","BRAKE","BURN","SWISH","SHINE","BRING","BREAK","BRAKE","SEETHE","BROMINATE","CRUMBLE","BROWSE","CRASHLAND","BREAK EXPECTED","BREW","SHOUT","GROWL","AFFRONT","BROOD","SPELL","BEND DOWN","DIG","BUDGET","SWOT","BUFF","IRON","TOW","BOO","COURT","LOITER","BANG","BUNDLE","VOUCH","BRUSH","EXPIATE","CHURN","KISS","CAMOUFLAGE","CAMP","CANCEL","CAST","CHAM BRATE","IRIDESCE","CHARACTERIZE","OVERACT","CHARTER",
"CHAT","CHAUFFEUR","CHECK","ENCIPHER","CHILL","CHIP","CHLOROFORM","CHRISTIANIZE","COLLAGE","COLOUR","CONCH",
"CONTAINERIZE","COVER","CUT","BE THERE","PLAY","SPEAK FOOLISHLY","WASTE AWAY","DAM","DAWN","DEMONIZE","FUME","STEAM","GIVE THANKS","THANK","GIVE THANKS","STARVE","PRESENT","PRESENT","LANGUISH","DESICCATE","REPRESENT","DEMONSTRATE","OVERLAY","MAKE A PROMISE THAT CANNOT","STAND","DATE","LAST","PRESS THUMBS","HURRY AWAY","GET OFF","SAY","LOOK","ADD UNTO","DEACTIVATE","DEAL","DEBATE","DEBUT","DECIPHER","TOP","ROOF","DEDICATE","DEDUCE","DEESCALATE","DEFECATE","DEFECATE","DEFENESTRATE","DEFILE","DEFINE","DEFLOWER","DEFORM","DEFRAGMENT","DEGLAZE","NAUSEATE","DEMOTE","DEGUST","EXPAND","DEHYDRATE","BECOME DRY","UNINSTALL","DECANT","DECLAIM","DECLARE","OUTCLASS","DECLINE","DECOMPILE","DECOMPOSE","DECORATE","DECREMENT","EXPOSE","DELEGATE","BE DELIRIOUS","DEMARCATE","UNMASK","DEMATERIALIZE","DENY","DEMOBILIZE","DEMOCRATIZE","VANDALIZE","DEMONSTRATE","DISMANTLE","DEMORALIZE","DEMOTIVATE","ABASE","DENATURE","PEEN","THINK","INDENT","DENOUNCE","DEPOSIT","DEPORT","DEPORT","DEPRESS","DEPUTIZE","ROUGH LICKING","DEREGULATE","DERIVE","DEROGATE","DISAVOW","DESENSITIZE","DESERT","DESIGN","DESIGNATE","DISILLUSION","DISINFECT","DESIST","DEOXIDIZE","DESTABILIZE","DISTIL","DESTROY","DETACH","DETECT","DETERMINE","EXPLODE","POINT","HAND OVER","DECIDE","DECIMATE","DIAGNOSE","CHAT","SEAL","SERVE","DEFAME","DIFFERENTIATE","DIFFER","DIFFUSE","DIGEST","DIGITALISE","DICTATE","DILATE","DABBLE","DILUTE","DIMENSION","DIMERIZE DIMERISE","DIM","HIRE","DINE","DIP THE FLAG","CONDUCT","CONDUCT","DISAMBIGUATE","DISCREDIT","DISCRIMINATE","DISCUSS","DISLOCATE","DISPENSE","DISPERSE","PREDISPOSE","DISPUTE","DIS","DISAGREE","DISSOCIATE","OUTDISTANCE","DISCIPLINE","DIVERGE","DIVERSIFY","DIVIDE","DOCTOR","DOCUMENT","INTERPRET","DOMESTICATE","DOMINATE","THUNDER","DOPE","DOUBLE","DRY","DOZE","DOSE","ENDOW","STAND IN FOR","DOWNLOAD","SUGARCOAT","WIRE UP","DRAMATIZE","PUSH","BULLY","NAIL","DRAPE","PRESS","FALL APART","PAY MORE","TURN","THRESH","TRAIN","DRIBBLE","DRIFT","DRILL","OOZE","THREATEN","BOOM","CHOKE","PRINT","PUSH","DOUBLE","DUCK","BE SUBMISSIVE","DUEL","SMELL VERY PLEASANTLY","TOLERATE","BE ON FIRSTNAME TERMS","MANURE","DARKEN","SEEM","STEAM","STEAM","DUPLICATE","PULL SOMEONES LEG","WADE THROUGH","BREATHE","BITE THROUGH","BLEED THROUGH","BREAK THROUGH","THINK THROUGH","MINCE","PENETRATE","GO THROUGH","IMBUE","FLOW THROUGH","CARRY OUT","WALK THROUGH","HANG ON","SAG","HEAT RIGHT THROUGH","EX OUT","COMB","COME THROUGH","LET PASSSOMEONE","RUN THROUGH","AIR THOROUGHLY","GO THROUGH","HAVE TO GO THROUGH","THRASH","CROSS","SHAKE","SAW THROUGH","SEE THROUGH","GLEAM","CUT THROUGH","CROSS","ENFORCE","FILTER","REV UP","CROSS OUT","PERFUSE","SEARCH","SEVER","SPEND AWAKE","WALK","RANSACK","COUNT UP","PULL THROUGH","FLASH THROUGH","SQUEEZE THROUGH","MAY","SHOWER","JET","BE ON FIRSTNAME TERMS","EMAIL","EBB","LEVEL","LEVEL","EDIT","EDIT","REALIZE","LEVEL","HARROW","ESPOUSE","HONOR","CALIBRATE","WOBBLE","STRIVE","SUIT","HURRY","INCORPORATE","CREMATE","EMBALM","BUILD IN","CONCRETE TO ENCASE IN","EMBED","INCLUDE","IMAGINE","INTEGRATE","BLOW IN","BEAT INTO","BREAK IN","INTRODUCE","LAND IN THE SOUP","NATURALIZE","LOSE","CHECK IN","EVAPORATE","STOCK UP","EMPATHIZE","GERMANIZE TO ADAPT TO THE","INTRUDE","UNITE","CONCENTRATE","DRIVE IN","OCCUR TO","CAPTURE","DYE","GREASE","ARRIVE","INFUSE","WHISPER","FENCE IN","FREEZE","INSERT","IMPORT","POUR IN","ADMINISTER A DRUG","ADMINISTER A DRUG","ADMIT","POUR IN","INTERFERE","ENCLOSE","FOLLOW","SWOP","BREATHE","BASTE","EARN","ACCOMPANY","CATCH UP","UNITE",
"AGREE","INCULCATE","ENCAPSULATE","BUY","INCARCERATE","ATTIRE","CLAMP","BOIL DOWN","COUPLE INTO","CIRCLE","INVITE","STORE","LET INSOMEONE","SHRINK","SETTLE IN","INSERT","START","RELENT","LOG IN","REDEEM","CAN","ASK","INVADE","INTERFERE","MOTHBALL","WET","OCCUPY","DOZE OFF","ORIENT","OIL","CLASSIFY","WRAP UP","POPULATE","MEMORIZE","SET THE PRICES","PROGRAM","BASH","MOVE IN","TALK INTO","SUBMIT","ENTER","ADJUST","MARCH IN","ONE AGEN","SALVE","COFFIN","DIRTY","SCAN","SWITCH ON","ASSESS","POUR","SLIDE IN","EMBARK","FALL ASLEEP","GOUGE","BRING IN","INFILTRATE","LOCK UP","INGRATIATE","ENGRAVE","BE SNOWED IN","RESTRAIN","ENROLL","INTERVENE","INTIMIDATE","ENROLL","LOOK INTO","RIP OFF","APPOINT","REDUCE","FEED IN","PUT AWAY","UPLOAD","COCOON","INJECT","ONE METALS","VOUCH FOR","BOARD","EMPLOY","TUNE","INTERSPERSE","COLLAPSE","PLUNGE","DIVIDE","TYPE IN","DIVIDE","ARRIVE","ENTER","FUNNEL","ARRIVE","DUNK","INCORPORATE","IMMIGRATE","EXCHANGE","CAN","SOAK","INAUGURATE","OBJECT","ATTRACT","INTERJECT","ENVELOP","COMPLY","AFFECT","DEPOSIT","FENCE IN","MARK","PENETRATE","FREEZE","SKATE","FESTER","EJACULATE","BE DISGUSTED","PLASTICIZE","ELECTRIFY","ELECTRIFY","ELIDE","ELIMINATE","ELICIT","ANODIZE","EMAIL","ENAMEL","EMEND","EMIGRATE","ISSUE","RECEIVE","RECOMMEND","SENSE","BE OUTRAGED","GROW UP","EMULATE","ENCOURAGE","END","STORE PERMANENTLY","ENERVATE","ENGAGE SOMEBODY FOR SOMETHING","BORE","MISS","RELEASE","DENUDE","DISCOVER","DISHONOR","EXPROPRIATE","HURRY AWAY","DEICE","DISINHERIT","BOARD","IGNITE","FALL","UNFOLD","DISCOLOUR","DETACH","UNLEASH","INFLAME","DETANGLE","ESCAPE","UNFOLLOW","ESTRANGE","DEFROST","KIDNAP","ACT CONTRARY TO","COME TOWARDS SO","ASSAIL SOMEONE","CONTRARY SHOUT","COUNTERACT","ESCAPE","DETOXIFY","DERAIL","BONE","DEPILATE","INCLUDE","SOFTEN","BEHEAD","SKIN","RELIEVE","DESECRATE","DEHORN","REVEAL","DEIONIZE","DEFLOWER","STERILIZE","UNDRESS","DECOCAINIZE","ESCAPE","UNCORK","DISEMBODY","DECRIMINALIZE","DRIVE ALONG","UNCOVER","RELEASE","RELIEVE","DEFOLIATE","DELOUSE","EMPTY","BORROW","BORROW","COMPENSATE","BLEED","EMASCULATE","DEMILITARIZE","DEMINE","DEMINERALIZE","UNMIX","INCAPACITATE","DISCOURAGE","TAKE","UNPACK","DEPOLITICIZE","SKIM","SOLVE","WREST","PAY","UNLOCK","DECORTICATE","ESCAPE","TIDY OUT","RENOUNCE","COMPENSATE","DEFUSE","DECIDE","FALL ASLEEP","DIVEST","UNVEIL","DECELERATE","DECIDE","DECIPHER","APOLOGIZE","DISAPPEAR","DISPATCH","SHOCK","DECONTAMINATE","RELEASE THE SAFETY CATCH","RECALL","DISPOSE","RELAX","ACCORD","BE DESCENDED FROM","DUST","ARISE","DISFIGURE","DISCLOSE","DISAPPOINT","REMOVE THE TAR","DETHRONE","DEPOPULATE","DISARM","DEFOREST","GIVE THE ALL CLEAR","DRAIN","ESCAPE","DEFILE","SEIZE","DESIGN","DEVELOP","WREST","DISENTANGLE","ESCAPE","WEAN","UPROOT","UPROOT","MAKE OUT","IGNITE","DIVIDE","EPILATE","CONSIDER","WORK OUT","PITY","BUILD","INHERIT","OFFER TO DO SOMETHING","SOLICIT","ENRAGE","TURN PALE","BLANCH","VOMIT","RAISE","HATCH","EARTH","DEVISE","INVENT","PONIARD","THROTTLE","SQUEEZE DEAD","OCCUR","GRASP","INVENT","HAPPEN","NECESSITATE","RESEARCH","INQUIRE","ENJOY","REFRESH","ELATE","ADD","GET HOLD OF","GRIFT","POUR","DELIGHT","GREY","GRAB","DETERMINE","BARGAIN FOR","HANG","HARDEN","RAISE","ILLUMINATE","HEAT","HOPE","RAISE","RELAX","GRANT","BECOME ERECT","REMEMBER","CATCH A COLD","COOL DOWN","PAY","RECOGNIZE","CHOOSE","EXPLAIN","SCALE","SOUND","GET ILL","EXPLORE","INQUIRE","CHOOSE","INVIGORATE","ATTAIN","ENACT","ALLOW","EXPLAIN","EXPERIENCE","FINISH","MAKE EASIER","INCUR","SELECT","ENLIGHTEN","SUCCUMB","BECOME EXTINCT","RELEASE","AUTHORIZE","SCOLD","FIND OUT","MAKE POSSIBLE","ASSASSINATE","TIRE","ANIMATE","ENCOURAGE","FEED","APPOINT","CHANGE","ABASE","HARVEST","SOBER",
"CONQUER","ERODE","OPEN","DEBATE","BLACKMAIL","TEST","REFRESH","GUESS","RECKON","AROUSE","REACH","BUILD","BLUSH","DROWN","DROWN","CREATE","SOUND","APPEAR","SHOOT DEAD","SLAY","OBTAIN SURREPTITIOUSLY","TAP","EXHAUST","SCARE","SHAKE","COMPLICATE","REPLACE","IMAGINE","ACQUIRE BY ADVERSE POSSESSION","AWAIT","SAVE","EARN","CONGEAL","REIMBURSE","ASTONISH","KNIFE","PURCHASE","CLIMB","BUY AT AN AUCTION","CREATE","SUFFOCATE","AIM FOR","EXTEND","TAKE BY STORM","ASK","CATCH","CATCH","SOUND","STIFLE","BEAR","DROWN","DROWN","BECOME UNIMPORTANT","ELICIT","AWAKE","ARISE","CONSIDER","MENTION","WARM UP","ABIDE","AWAKE","PROVE","ENLARGE","ACQUIRE","REPLY","EARN","GRAB","CHOKE","NARRATE","GENERATE","EDUCATE","ACHIEVE","ANGER","FORCE","ESCALATE","ANTICIPATE","ESCORT","EAT","ESTABLISH","LABEL","ETIOLATE","EUROPEANIZE","EVACUATE","EVALUATE","EVANGELIZE","EVOLVE","EVOKE","EXECUTE","EXEMPLIFY","DOWN","DRILL","EXHALE","EXHUME","EXIST","EXCLUDE","EXCOMMUNICATE","EXCULPATE","TAKE SOMEONES NAME OFF THE","EXORCISE","EXORCISE","EXPAND","EXPERIMENT","EXPLANT","EXPLICATE","EXPLODE","EXPLOIT","EXPOSE","EXPORT","EXTIRPATE","EXTEMPORIZE","EXTERMINATE","EXTERNALISE","EXTRACT","EXTRUDE","EXTUBATE","EXCERPT","FABRICATE","FABRICATE","KINDLE","SEARCH","GO","BILL","FALL","FELL",
"FAIL","FAKE","FALSIFY","FOLD","FOLD","FANATICIZE","CAPTURE","FANTASIZE","DYE","FILL","MINCE","BABBLE","GRASP","FAST","FASCINATE","HISS","IDLE","FIST FUCK","FAVOUR","FAX","FENCE","SWEEP CLEAN","MISCAST","MISS","ABORT","IMMUNIZE","CELEBRATE","PEDDLE","FILE","HAWK","HAGGLE","SMIRK","FELLATE","PIG","WATCH TELEVISION","KEEP AWAY","WATCH TV","CRAFT","COMPLETE","ACCOMPLISH","CHAIN","FIRM","SOUTH AFRICA","HOLD TIGHT","STRENGTHEN","STIPULATE","NAIL DOWN","ARREST","STRAP","SCREW DOWN","CODIFY","FIX","NOTE","GREASE","FIGHT","MOISTEN","FIRE","HOT DIP GALVANIZATION","FUCK","HAVE A HIGH TEMPERATURE","CHEEP","VEER","FILLET","FILIBUSTER","FILM","FILTER","FILTRATE","FRISK","FINANCE","MACHINATE","FIND","FUMBLE","FEIGN","FINISH","CONFIRM","TRADE UNDER THE NAME OF","TRADE UNDER THE NAME OF","VARNISH","FISH","FIX","FIX","KID AROUND","FLICKER","STEAL","STROLL","FLANK","FLASH","FLUTTER","FLATULATE","FLOP","PLAIT","ROB","IMPLORE","FLEHM","INFLECT","SNIVEL","FLENSE","BARE","FLY","MEND","FLY","FLEE","TILE","FLOW","FLICKER","WHIR","COQUET","GLISTEN","WHIZ","FLOAT","FLOURISH","GET LOST","WHISTLE","FLOAT","SWEAR","ALIGN","ESCAPE","FLUCTUATE","FIB","FLUORESCE","FLUORINATE","WORK","WHISPER","FLOOD","GO SMOOTHLY","BLOWDRY","FOCUS","FOLLOW","CONCLUDE","TORTURE","TEASE","EXPEDITE","ADVANCE","DEMAND","FORMAT","FORM","DEPLOY","COUCH","RESEARCH","MOVE","STAY AWAY","HURRY AWAY","DRIVE AWAYDRIVE AWAY ENGLISCHDRIVE AWAY","FALL AWAY","LEAVE","GET AWAY","RUN AWAY","PUT ASIDE","REPRODUCE","SEND AWAY","UPDATE","CONTINUE","CONTINUE","PUSH AWAY","WIPE AWAY","TAKE A PHOTO","PHOTOCOPY","SLAP SOMEONE IN THE FACE","FOUL","FRACK","ASK","FRAGMENT","GALLICIZE","GALLICIZE","AMAZE","MILL","FRATERNISE","LEAVE A TABLE FREE","COURT","RELEASE","FREE","FRANK","RELEASE","ACQUIT","RELEASE","CHEAT","FREQUENT","GORGE","GLADDEN","FIDGET","BE COLD","FRICASSEE","REFINE","TWEAK","FRY","EXULT","INDULGE","FREEZE","RUB DOWN","TEASE","HAVE BREAKFAST","FRUSTRATE","BRANDISH","PUT","FEEL","LEAD","FILL","FUMBLE","ERECT","ACT AS","SPARKLE","FUNCTIONALIZE","FUNCTION","FUNCTION","FEAR","FART","EXECUTE BY FIRING SQUAD","MERGE","PILL","BE BASED ON","FEED","FEED","FORK","GAGGLE","GAPE","GAPE","GALLOP","GALVANIZE","LOAF AROUND","SPOONFEED","GUARANTEE","COOK","FERMENT","GARNISH","GARDEN","GUEST","LOOK AFTER","COUCH","BEHAVE","GIVE BIRTH","GIVE","COMMAND","USE","PROSPER","COMMEMORATE","ENDANGER","PLEASE","ARREST","FREEZE","RECRIMINATE","CHECK","FACE","CONTRAST","COUNTERSIGN","WALK","OBEY","BELONG","MITER","SLAVER","SCOURGE","BE MISERLY","REACH","ESCORT","GELATINIZE GELATINISE","SUCCEED","SWEAR","BE VALID","GENDER","PERMIT","GENERALIZE","RECONDITION","GENERATE","RECOVER","BE EMBARASSED","ENJOY","SUFFICE","MAKE SATISFACTION","GET INTO","TAN","REDOUND","TALK AND ACT","CLOT","BE FOND OF","BE FOND OF","DEIGN","HAPPEN","HAPPEN","PERMIT","CONFESS","GESTICULATE","RIGHTSIZE","DARE","GRANT","ASSURE","WIN","ACCLIMATE","GIGGLE","BE GREEDY FOR","POUR","RILE","COUNT","CULMINATE","PLASTER","ENDORSE","COO","GLARE","GLAZE","SMOOTH","CLOSE OUT","BELIEVE","EMULATE","GLEAM","FLOAT","STRUCTURE","GLOW","SLITHER","SLITHER","GLOBALIZE","GLORIFY","SMOULDER","MAKE FUN OF","GLOTTALIZE","GAPE","SUCCEED","GLUG","GLOW","GAPE","GOLF","AFFORD","GOOGLE","APPROVE","RUMMAGE","DIG","GRAB","GRADUATE","GRIEVE","GRAPHITIZE","SNATCH","GRAZE","RAGE","STRADDLE","CONGRATULATE","TERRIFY","GRAVITATE","GRAB","WHINE","ABUT","SMIRK","BARBECUE","GRIMACE","GRIN","BRAG","RUMBLE","CAPITALIZE","BRAG","GRUB BERN","BROOD","GRUMBLE","FOUND","PRIME","GREEN","GRUNT","GROUP","GREET","LOOK","GUILLOTINE","GUM","GARGLE","COO","GIRD","APPRECIATE","OPINION","DO GOOD","LOSE HAIR","HAVE","HABILITATE","HACK","SHRED","QUARREL WITH","ADHERE","HAIL","CROCHET","HOOK","BISECT","ECHO","HALOGENATE","JIBE","HOLD","HAMMER","FIDGET","FORAGE","HANDLE","HANG","TEASE","HANDLE","HARMONIZE","HARMONIZE","HARMONIZE","AWAIT","TEMPER","GAMBLE","HASH","SPUTTER","HATE","HURRY","FONDLE","BREATHE","BEAT","HEAP","DWELL","KEEP HOUSE","HAWK","MOLT","HEADBANG","LEVER","LIFT","PANT","HATCH","STAPLE","CHERISH","HEAL","CANONIZE","HOME FOUND","LEAD HOME","RETURN HOME","COME HOME","HOME LIGHTING","AFFLICT","PAY BACK","MARRY","DEMAND","RUN HOT","BE CALLED","HEAT","HELP","BRIGHTEN","DAM","HEPARINIZE","LOOK DOWN","FALL","FLY DOWN","ABATE","DEMOTE","DEBASE","LEAD SO","DEBASE","APPROACH","GROW","UP TRANSPORT","GO UP","CLIMB UP","COME UP","UP BLANK","RAISE PRICES","UP SPIT","UP RIGID","WORK WAY OUT","OUT BITE","RELEASE","OUT ROAR","FIND OUT","CHALLENGE","FIND OUT","COME OUT","CRYSTALLIZE","DISSOLVE OUT","REMOVE","OUT FIGHT","BURST OUT WITH SOMETHING WHILE","TASTE","SMUGGLE OUT","CUT OUT","SHOUT","COME TO LIGHT","OUT LIKE","ZOOM OUT","COME RUNNING","PRECIPITATE","CONDESCEND","CALL","BRING","COME IN","LET IN","CALL IN","FOLLOW","LISTEN","COME OVER","COME RUNNING","DEDUCE","HEROIZE","GET READY",
"RULE","ARISE","PRODUCE","FART AROUND","HUM AND HAW","BUSTLE AROUND","MUCK AROUND","PICK ON","FORNICATE","HUNT AROUND","HUNT AROUND","CHITCHAT","FAWN","YELL","STAND AROUND","RUN AROUND","WANDER","SCURRY","SHOW AROUND","DOWN MAY","SHUT DOWN","FALL","BARGAIN DOWN","COME DOWN","DOWNLOAD","LOWER","TAKE DOWN","DOWNPLAY","DOWNGRADE","DOWN ECONOMIES","BRING ABOUT","RESULT","EMPHASIZE","CAUSE","EXCEL","SCAMPER","FEIGN","HIRE","BAWL","CAST A SPELLSPELLS","HICCUP","HEAVE","LOOK DOWN","WORK TOWARDS","UP FOUND","CLIMB UP","AND BEYOND","FLY OUT","LEAD OUT","GO OUT","LEAN OUT","PROJECT","POSTPONE","MANAGE","LEAD OUT","PREVENT","PASS","BITE","BROWSE","LOOK IN","EMPATHIZE","GO INTO ENTER","PLAY INTO","PUT IN","ZOOM IN","GO FORTH","HOLD OUT","LIMP","KNEEL","MANAGE","PUT DOWN","TAKE","ENRAPTURE","EXECUTE","SIT DOWN","STARE AT","PUT","STRETCH OUT","QUESTION","LEAVE","DEPOSIT","THWART","EVADE","DRAW NEAR","DOWN","WASH DOWN","LOOK OVER","BELIE","POINT","WANT TO GO THERE","DRAG","GET IN ADDITION","ADD","HOIST","PLANE","GO UP","FLY UP","LIFT","HEAVE","COME UP","ROLL UP","HIGH CATCH","UPLOAD","TEASE","PROJECT","HEAVE UP","SQUAT","HOPE","COURT","MOCK","TRADE","GET","JOLT","HOMOGENIZE","HONE","HONOR","HOP","HOP","LISTEN","HEAR","STOCKPILE","SIT IN ON LECTURES","HUDDLE","PAY HOMAGE TO","COVER","HOBBLE","HUNGER","HONK","HOP","FLIT","AGITATE","COUGH","LOOK AFTER","ROCK","HYBRIDIZE","HYDROGENATE","HYDROLYZE HYDROLYSE","HYPE","HYPERVENTILATE","HYPNOTIZE","BRAY","IDEALIZE","IDENTIFY","IGNORE","ILLUMINATE","ILLUSTRATE","IMAGINE","COPY","KEEP BEES","REGISTER","IMMIGRATE","IMMORTALISE","IMMUNIZE","VACCINATE","IMPLANT","IMPLEMENT","IMPLY","IMPLODE","IMPRESS","IMPORT","WATERPROOF","IMPROVISE","DENY","QUESTION","GET INTO GOOD CONDITION","FALL FROM GRACE","QUESTION","INACTIVATE","INDEX","INDIVIDUALIZE","INDEX","INDOCTRINATE","ENDORSE","INDUSTRIALIZE","INDUCE","INFILTRATE","INFECT","INFECT","INFORM","QUESTION","INFUSE","ARREST","INHALE","INHIBIT","INITIALIZE","INITIATE","INJECT","INCLUDE","INCOMMODE","INCREMENT","INCRIMINATE","INCUBATE","INLINE SKATING","PAUSE","INNERVATE","INQUIRE","GO INTO DETAILS","GO INTO DETAILS","CARRY WEIGHT","ADVERTISE","INSINUATE","INSIST","REGISTER","INSPIRE","CHECK","INSTALL","MAINTAIN","REPAIR","INSTANTIATE","INSTITUTE","INSTRUCT","EXPLOIT","STAGE","INTEGRATE","INTEND","INTENSIFY","INTERACT","INTEREST","INTERCULTURALIZE","INTERNALISE","INTERNATIONALIZE","INTERN","INTERPELLATE","INTERPOLATE","INTERPRET","PUNCTUATE","INTERCEDE","INTERVIEW","ENTHRONE","INTONE","INTRIGUE","INTUBATE","INVADE","INVENTORY","INVENT","INVERT","INVEST","INVESTIGATE","INVOLVE","INCISE","IONIZE","IRONIZE","MISLEAD","ERR","IRRIGATE","DISTURB","INSULATE","ISOMERISE ISOMERIZE","ITERATE","CHASE","BECOME ONE YEAR OLDER","WHINE","GASP FOR AIR","GASP","VERNALIZE","WEED","EXULT","HOWL","JET","JOB","YODEL","IODISE","JOG","HOOT","JUGGLE","CHEER","CAROL","ITCH","ADJUST","TEASE EACH OTHER","CABLE","TILE","SHIT","CANCEL","MAKE JOKES","CALVE","CAULK","CALIBRATE","COMPUTE","OFF SOMEONE","COMB","FIGHT","CAMP","CHANNEL","CONTEST","CANDY","EDGE","CAPTURE","TWIG","CASH IN","CAPITULATE","CUT","ENCAPSULATE","BREAK","BREAK SOMETHING IN AN ATTEMPT","CARAMELISE","CARD","CARESS","CARICATURE","CART","PLAY CARDS","MAP","MAP OUT","NAB","COVER UP","BARRACK","CASCADE","CLOWN AROUND","COLLECT","MORTIFY","CASTRATE","CATALOG","CATALYZE CATALYSE","CATAPULT","CATEGORIZE","GROVEL","TALK GIBBERISH","CHEW","BE HUDDLED SOMEWHERE","BUY","BOWL","SWEEP","TURN ROUND","BADGER","SPROUT","WAIT","GET TO KNOW","KNOW","GET TO KNOW","MARK","CAPSIZE","NAG","NOTCH","WHEEZE","CULL","GIGGLE","KICKBOX","KICK","KIDNAP","KIBITZ","KIBITZ","CAREEN","GRAVEL","SMOKE DOPE","KILL","TILT","TAME","KIT","CEMENT","TICKLE","CLICK","GAPE","YAP","WAIL","BRACKET","PUZZLE OVER","CLAP","CLATTER","CLEAR","CLEAR","COPE","MAKE CLEAR","CLARIFY","DREAM LUCIDLY","CLASSIFY","CLASSIFY","CLAP","COLLECT","RIP","GLUE","DRIBBLE","DRESS","SMASH","DOWNPLAY","JAM","CLIMB","CLICK","CHOP","SCRAWL","CLAMBER","JINGLE","RING","RING","CLINK","CONCOCT","CLONE","NATTER","KNOCK","FIGHT","CLATTER","SHOW OFF","SPEAK AS A KNOWITALL","LUMP","NIBBLE","CRACK","BANG","SCRIMP","CRACKLE","CRACKLE","CRUMPLE","GAG","ENSLAVE","NIP","KNEAD","SCRAPE WITH FINGERNAILS SO","KNEEL","KNEE TSCHEN","SNAP","CRUNCH","CRACKLE","CREASE","BUTTON","KNOT","CUDDLE","POKE","CRUMPLE","KNOT","BLUDGEON","GROWL","CRACKLE","SNOG","COAGULATE","FORM A COALITION","SIMMER","COOK","BAIT","CODE","CODIFY","COEXIST","HAVE SEX","FLIRT","COKE","COLLAPSE","COLLABORATE","COLLATE","GOBBLE","COLLIDE","COLONIZE","COLORIZE","SPREAD","COMBINE","COMMAND","COME","ANNOTATE","COMMERCIALIZE","COMMISSION","COMMUNICATE","COMPENSATE","COMPILE","COMPLEX","ESCORT","COMPLICATE","COMPOSE","COMPOST","COMPRESS","COMPROMISE","CONDENSE","CONDOLE","CONFABULATE","CONFABULATE","CONFER","CONFIGURE","CONFISCATE","CONFLICT","CONFRONT","CONFOUND","CONJUGATE","CONCATENATE","CONCRETE","COMPETE","CAN","CONNOTE","CONSECRATE","PRESERVE","CONSOLIDATE","CONSPIRE","NOTE","CONSTERNATE","ESTABLISH","DESIGN","CONSULT","CONSUME","CONTACT","CONTAMINATE","FOIL","COUNTER","CONTRACT","CONTRAST","CHECK","OUTLINE","OUTLINE","CONVERGE","CONVERSE","CONVERT","CONCEDE","CONCENTRATE","CONCEPTUALIZE","CONCERT","OPERATE","PLAN","COOPERATE","COOPT","COORDINATE","BEHEAD","COPY","COUPLE","COPRODUCE","COPULATE","SELECT FOR BREEDING PURPOSES",
"CORRELATE","CORRESPOND","CORRECT","CORRODE","CORRUPT","CARESS","COST","DEFECATE","LIST","SPEW","CRAWL","CRACK","CAW","STRENGTHEN","CAW","BRAWL","DOODLE","CLAMP","RUMMAGE ABOUT","KINK","AIL","OFFEND","SUFFER","MAKE SICK","REPORT SICK","SICK LEAVE","SCRATCH","FONDLE","CRIMP","CLAMBER","GO CRABBING","PROFFER","CREDIT","CREATE","SHRIEK","CIRCLE","BE IN LABOR","CREMATE","DIE","HYBRIDIZE","CRUCIFY","PRICKLE","CREEP","GET","CRIMINALIZE","CRYSTALLIZE","CRITICIZE","QUIBBLE","DOODLE","CROWN","POTTER","CROOK","CRUMPLE","LOOK","ROLL","COOL","BULLY","ROLL SLOWLY","CULMINATE","CULTIVATE","TAKE CARE","CUMULATE","GIVE NOTICE","MAKE KNOWN","FIDDLE","DOCK","COUPLE","CURATE","TURN","CHOOSE","CIRCULATE","SHORTEN","BRIEF","CUDDLE","TOADY","KISS","FEAST","BLATHER","LABIALIZE","BE PLAGUED","SMILE","LAUGH","VARNISH","INVITE","DAMAGE","STORE","PARALYZE","PARALYZE","SPAWN","LACTATE","BABBLE","LAMENT","LAMB","LAUNCH","LAND","LONG","BORE","LAP","MOUNT UP FROM SMALL INDIVIDUAL","BRAWL","LET","WEIGH ON","BLASPHEME","LATINISE","TRAIPSE","WATCH","RUN","EAVESDROP","LOUSE","GO","RING","RING","MAKE SOUNDS","WASH","LEAK","LEASE","LIVE","LUST","LICK","LEATHER","EMPTY","EMPTY","LEGALIZE","LAY","ALLOY","LEAN","TEACH","LIGHTEN","SUFFER","HURT","LEND","GLUE","RELINQUISH","MANAGE","LEMMATIZE","STEER","PUMP","LEARN","READ","REFRESH","SHINE","DENY","DENY","LEXICALISE","THIN","KEEP LOVING","FANCY","FOND RESERVE","LOVE","LOVE","CUDDLE","DELIVER","LIE","MISPLACE","LIFT","ALLY","LIKE ON SOCIAL MEDIA","LIMIT","ALLEVIATE","LINK","LIQUIDATE","LISP","LIST","LITHOGRAPH","LITHOGRAPH","LICENSE","PRAISE","ADULATE","EXTOL","SING","PIERCE","CURL","MAN LEAP","LOOSEN","BLAZE","SPOON UP","LOG","STAY","BLAZE","REWARD","SHELL OUT","PINPOINT","LONGE","SCRUTINIZE","UNLOAD","DISJOIN","SOLVE","RELEASE","START","UNCHAIN","LET GO","START FORCEFULLY","MARCH OFF","START BEATING","SCREAM","SOLDER","AIR","LIE","LOOK","LULL","SUCK","LUXATE","LYNCH","MEANDER","MEANDER","MAKE","CABAL","MAGNETIZE MAGNETISE","BLEAT","GRIND","DUN","MAIL","OUTVOTE","CONDEMN","COAT","DRUDGE","MALTREAT","MUNCH","MANAGE","MANGLE","MANGLE","MANIPULATE","MANEUVER","MARGINALIZE","MARINATE","MARK","MARBLE","MARAUD","MARCH","TORTURE","MASK","MASSACRE","MASSACRE","MODERATE","DISCIPLINE","FEED UP","MASTICATE","MASTURBATE","MATERIALIZE","PULP","LAY BRICKS","MEW","FIDDLE","PINCH","MOULT","MAXIMIZE","BITCH","MEDIATIZE","MEDICATE","MEDITATE","MULTIPLY","AVOID","THINK","CHISEL","MASTER","REPORT","MIX","IMPROVE","MILK","MENSTRUATE","KEEP IN MIND","MERCERIZE","MESMERIZE","MEASURE","METABOLIZE","ASSASSINATE","MUTINY","MEOW","STINK","RENT","MIGRATE","MICROMINIATURIZE","URINATE","SOFTEN","MIME","DECLINE","MINERALIZE","MINIMIZE","MIX","IGNORE","DISAPPROVE","ABUSE","DO WITHOUT","DO WITHOUT","MISTREAT","PROSELYTIZE","FAIL","DISTRUST","MISUNDERSTAND","GET","BID","BRING","THINK AHEAD","FEEL TOO","WITNESS","DRIVE","CHEER","COFINANCE","SYMPATHIZE","SYMPATHIZE","STEAL","COME ALONG","KEEP UP WITH","HELP","OVERHEAR","COME ALONG","PARTICIPATE","BE IN ON IT","TAKE WITH","JOIN IN A CONVERSATION","RECORD","RESONATE","CREW","PLAY ALONG","INFORM","CONTRIBUTE","COUNT IN","MIX","BULLY","MOBILIZE","MOBILIZE","FURNISH","MODEL","MODERATE","MOULDER","MODERNIZE","CHANGE","MODULATE","CHEAT","LIKE","MOCK","MOLEST","MONETIZE","CRITICIZE","MONOGRAM","MONOLOGUE","INSTALL","MOP","GRUMP","FILCH","MURDER","MOTIVATE","GROUCH","POTTER ABOUT","MUTTER","SMELL MUSTY","LOW","MULCH","MULTIPLY","MUMMIFY","NIBBLE","FLOW","MUNICIPALIZE","BUNGLE","PLAY MARBLES","MURMUR","MAKE MUSIC","MUST","SCRUTINIZE","MUTE","MUTATE","CONJECTURE","APE","COPY","TOUCH UP","RECONSTRUCT","FOLLOW UP","REPRODUCE","THINK","REPRINT","EMULATE","EMPATHIZE","PROVIDE SUPPLEMENTARY FINANCING","FOLLOW AFTER","INVESTIGATE","SYMPATHIZE","GIVE","FOLLOW","BROOD","DIG DEEPER","HELP OUT","MAKE UP","COMPLY","RELOAD","ABATE","FOLLOW","IMITATE","CHECK","CHECK AGAIN","REPEAT","ADD SALT","RESHARPEN","LOOK","LOOK UP","REPOSITION","REPEAT","READJUST","PASS THE NIGHT","SLEEPWALK","UNDERSTAND","PROVE","SPICE UP","SKINNYDIP","NAIL","GNAW","APPROACH","RECOMMEND","BE APPROACHING","STITCH","BRING CLOSER","APPROACH","FEED","COAT","ANESTHETIZE","FOOL","NASALIZE","GRAZE","TALK THROUGH NOSE","WET","WETTEN","NATIONALIZE","NATURALIZE","NAVIGATE","NAZIFY","FOG","TEASE","NEGATE","NEGOTIATE","TAKE","ENVY","BEND","NAME","BUG","FIDDLE","MORE RECENT","RESTART","NEUTRALIZE","NOD","KNEEL DOWN","LAY DOWN","MASSACRE","FALL","HOOT DOWN","SIT DOWN","STAB DOWN","THRUST DOWN","TRAMPLE","SNEEZE","RIVET","SIP","NITRATE","EVEN OUT","DAWDLE","NOMINALIZE","NOMINATE","BEEF","STANDARDIZE","MAKE A NOTE","COMPEL","MAKE AN EMERGENCY LANDING","AMEND","COMPEL","SUCK","ZERO","NUMBER","MUMBLE","GROOVE","USE","USE","DO A POSTMORTEM","OBFUSCATE","OBJECTIFY","BE SOMEBODYS RESPONSIBILITY","OBLIGE","KEEP","OBSERVE","WIN","OBSIGN","OBSTRUCT","SWOT UP","REVEAL","UNFOLD","OFFER","OPEN","BOX SOMEONES EARS","OCCUPY","FORCE","OPEN","MASTURBATE","CRIMP","OPERATIONALIZE","OPERATE","SACRIFICE","OPPOSE","OPT","OPTIMIZE","PROGNOSTICATE","ORCHESTRATE","ORDER","ARRANGE","ORGANIZE","ORIENTATE","LOCATE","OSCILLATE","OUT","EXAGGERATE","OXIDIZE","MATE","LEASE","PACK","PADDLE","PUFF","PAGINATE","PALAVER","CROSSVOTE","BREAD","MIX","NOURISH","STICK","PARALLELIZE","PARALYZE","PARAMETERIZE","INITIAL","PARAPHRASE","PERFUME","PARRY","PARK","PARQUET","PARK","CONVERSE","PARSE","PARTITION","PARTICIPATE","PARCEL","FIT","PASS","PASSIVATE","PASTEURISE","PATCH","PATENT","PATROL","BLUNDER","SWOT","GENERALISE","PAUSE","PEDAL","TAKE A BEARING","EXCRUCIATE","DO SOMETHING STUPID","PEEL","COMMUTE","PENETRATE","KIP","PENSION","PERFECT","PERFORATE","PEROXIDE","PERPETUATE","PERSEVERATE","SATIRIZE","PERSONIFY","PERCEIVE","PELT","PETRIFY","PINCH","IMPALE","DISTRAIN",
"PEPPER","WHISTLE","PLANT","PAVE","TEND","PLUCK","PLOW","PLUG","BUNGLE","PHARYNGEALIZE","PHILOSOPHIZE","PHOTOCOPY","TIPPLE","PECK","PICNIC","BLEEP","PEEP","PIERCE","BADGER","PEE","PRICK","PIQUE","PRICK","PILGRIMAGE","PILOT","SHAG","PEE","PAINT","PIPET","PIROUETTE","PISS","ADVOCATE","AFFLICT","PLAGIARIZE","PLAN","SKIRMISH","FLOUNDER ABOUT","SPLASH","BAWL","PLASTICIZE","PLASH","PURL","BURST","PLACE","CHAT","DAWDLE","USE NEEDLE BLANKS","PLEAT","SEAL","BAG","FLOP","LOOT","SLANDER","BEAT","POACH","PODCAST","KIP","POGO","SALT","PLAY POKER","TIPPLE","POLARIZE","POLEMIZE","POLISH","POLITICIZE","POLL","JANGLE","POLYMERIZE","PENALIZE","PICK THE NOSE","FUCK","PORT","PORTRAY","TRUMPET","POSE","POSITION","POST","POSITION","POSTULATE","RAISE TO THE POWER","FLIRT","PREFER","EMBOSS","BRAG","PRECLUDE","PRACTICE","COLLIDE","PRELUDE","PREPARE","PRESENT","LAY CLAIM","SPECIFY","PREACH","GLORIFY","DIVULGE","CHEAT","RUN","PRESS","BE URGENT","PRICKLE","CHEW TOBACCO","PRIORITIZE","PRIVATISE","PRIVILEGE","REHEARSE","TRY","PROBLEMATIZE","PRODUCE","PROFANE","DISTINGUISH","PROFIT","PROGNOSTICATE","PROGRAM","PROGRAM","PROJECT","PROCLAIM","PROCRASTINATE","PROLONG","PROMOTE","DODO ARECEIVEEARN DOCTORATE","PRONATE","PRONOUNCE","PROPAGATE","PROPHESY","PROSPER","RAISE GLASS","PROSTITUTE","SPONSOR","PROTEST","LOG","LOG","SHOW OFF","PROVOKE","LITIGATE","CHECK","BEAT","SNORT","CHANT","GO THROUGH PUBERTY","PUBLISH","PUDDLE","POWDER","PUFF","PEE","PULSE","PULVERIZE","PUMP","SCORE","DOT","FART","CLEAN","PUREE","FALL","PEE","PUSH","FIDDLE ABOUT","BLOW","REVOLT","CLEAN","QUACK","SQUARE","QUACK","SQUAWK","TORTURE","QUALIFY","SMOKE","QUANTIFY","QUANTIZE","BLETHER","BLETHER","WELL","MOAN","CROSS","SQUEEZE","SQUEAL","SQUEAK","SQUEAK","QUIT","QUIZ","AVENGE","SLAVE AWAY","CYCLE","TURN A CARTWHEEL","SMATTER","RIDE A BIKE","DELETE","RADICALIZE","SQUARE ROOT","DRIVEL","SNATCH UP","REFINE","TOWER","LOLL","RAMIFY","CHARGE AROUND","RAM","RUIN","RIOT","RANDOMISE","SCUFFLE","SCUFFLE","GROW IN TENDRILS","SHORT FOR HERANKOMMEN","RATTLE","WILL REPORT","RACE","SHAVE","GRUMBLE","RASP","REST","ADVISE","RATIFY","RATION","BLATHER","PUZZLE OVER","CLATTER","KIP","PLUNDER","SMOKE","BURN INCENSE","ROUGHEN","PULL","CLEAR","MURMUR","COMPLAIN","RUSTLE","FIND OUT","BE KICKED OUT","FIND OUT","CLEAR THROAT","KICK OUT","REACT","IMPLEMENT","REANIMATE","REBEL","RAKE","RESEARCH","CALCULATE","ARGUE","JUSTIFY","STRETCH","RECYCLE","RECYCLE","SPEAK","EDIT","REDUCE","REFERENCE","REFER","REEF","REFLECT","REFORM","REFUSE","REFUTE","REGALE","CONTROL","STIR","REGENERATE","GOVERN","NOTICE","REGULATE","RAIN","RAIN","REGULATE","REHABILITATE","RUB","HAND","RIPEN","REIFY","TACK","PUKE","RHYME","REIMPORT","CLEAN","SPOOF","BARGE IN","REINSTITUTIONALIZE","PULL IN","TRAVEL","TEAR","RIDE","TOUR","RECAPITULATE","STRETCH OUT","COMPLAIN","RECONNOITRE","RECONSTRUCT","RECRUIT","RECTIFY","RECUPERATE","RETURN","QUALIFY","RELAX","RELEGATE","DRAW","PUSH","RUN","BRAG","RENOVATE","PAY","REORGANIZE","REPAIR","REPATRIATE","REVISE","REPLY","RESTORE","REPRESENT","REPRESS","REPRIVATIZE","REPRODUCE","REQUISITION","RESERVE","RESET","RESIDE","RESIGN","RESONATE","RESORB","RESPECT","RESTORE","RESTRICT","RESTRUCTURE","RESULT","SUM UP","RETURN","SAVE","RETOUCH","HAVE A SUCCESS","RETURN THE FAVOR","REVERSE","REVISE","REVOLT","REVOLUTIONIZE","REVOKE","RECEIVE","RECITE","RECYCLE","STRAIGHTEN","SMELL","GROOVE","TWINE","WRESTLE","FLOW","RIP","RISK","SCRATCH","RIVAL","CREEP","GASP","CASTLE","ROCK","TOBOGGAN","TOBOGGAN","ROAR","ROLL","ROMANTICIZE","ROAST","RUST","REDDEN","GYRATE","BLOW NOSE","RUB","CATEGORIZE","JERK","MOVE","ROW","SHRIEK","TELL OFF","REPROVE","REST","PRAISE","MOVE","RUIN","BURP","GOOF OFF","RUMBA PREPARERS","SLEEP AROUND","RUMINATE","HANG OUT","RUMBLE","MAKE A NOISE","ROUND","FALL DOWN","PLAY WITH","SHORT FOR HERUNTERKOMMEN","DOWN ROCK","DOWN ECONOMIES","FURROW","PLUCK","SMOKE","ARM","SLIDE","QUESTION","BLATHER","DRIBBLE","SABOTAGE","SOW","SAW","SAY","SPEECHIFY","BALANCE","SALUTE","EXCULPATE","SALT","COLLECT","SANDBLAST","REDEVELOP","SANCTION","SADDLE","SATISFY","SATURATE","CLEAN","CLEAN","MAKE A MESS","DRINK","SUCK","SUCKLE","LINE","SAUNA","WHISPER","WHISTLE","SCAN","CHAFE","EXCAVATE","HURT","HARM","MAKE","JOKE","PEEL","SOUND","SHIFT","BE ASHAMED","DISHONOUR","SHANGHAI","DIG TRENCHES","SPICE UP","SCRAPE","FAWN","KICK OUT","SHADE","ESTIMATE","SHUDDER","LOOK","SHIVER","SCOOP","FOAM","ACT","ACCUMULATE","SEPARATE","SHINE","SHIT","FAIL","RING","SCOLD","GIVE","RATTLE","SHAVE","JOKE","SHOO","FIGHT SHY","SCRUB","LAYER","SEND","DRINK","PUSH","SHATTER","SQUINT","SPLINT","SHOOT","RAIN","JIBE","BULLY","DEPICT","IRIDESCE","MILDEW","GLEAM","SCOLD","SCOLD","SHOVEL","SHIELD","SLURP","BUTCHER","TREMBLE","SLEEP","SLEEPWALK","BEAT","BRAWL","HEADLINE","BE SLOPPY","SNAKE","BADMOUTH","BADMOUTH","LICK","CREEP","SAND","FAWN","WEAR OUT","DEBAUCH","STROLL","SCOOP","DRAG","HURL","SMUGGLE","MEDIATE","SLIP DOWN","STREAK","SHUT","LURCH","SLIDE","SLIT","SHIVER","SOB","SWALLOW","WORK SLOPPILY","SLUMBER","HATCH","SLIP","SHUFFLE","SIP","CONCLUDE","LANGUISH","BERATE","REDUCE","OIL","SPONGE","SMACK","PUFF AWAY","FEAST","TASTE","FLATTER","THROW","MELT","HURT","SMASH","FORGE","SPREAD","MAKE UP","SAND","BROWSE THROUGH","POUT","BRAISE","ADORN","SMUGGLE","SMILE","SMOOCH","NIBBLE","CHAT","HAVE SEX","GRAB","SNORE","CHATTER","SNORT","WHEEZE","BLOW NOSE","CUT","SNOW","FAST","SNIP","CARVE","BROWSE","SNORKEL","CADGE","SNIFF","SNORT","SNIFF","TIE","PURR","SHOCK","SHOCK","CLARIFY","HANDLE","WHITEWASH","BLANDISH","BUTTER UP","DRAW","CHORE","GRAVEL","HATCH","SCREW","SCARE","SHRED","WRITE","CRY OUT","DO CARPENTRY","STRIDE","SHRILL","SCRAP","SHRINK","SHOVE","WORK LIKE A HORSE","OWE","INSTRUCT","CHEAT","SCALE","POKE","MINE","BULLY","PURSE","SHAKE","POUR","PROTECT","WEAKEN SLIGHTLY","WEAKEN","SWAGGER","WAFFLE","MAKE PREGNANT","VACILLATE","SASHAY","PLAY HOOKY","FESTER","SWARM","BLACKEN","BLACK HEAR","DODGE THE TV LICENSE","BABBLE","BABBLE","FLOAT","BE SILENT","WELD","SMOULDER","DELIGHT","SWELL","SWIM","CHEAT","DWINDLE","BUZZ","SWEAT","SHAKE A LEG","SWEAR","SCREEN","SCROLL","SEDATE","SEDIMENT","GLIDE","SEGMENT","BLESS","SEGREGATE","SEE","PISS","SEGREGATE","STRAIN","ABSEIL","BE","ANNOY","SECOND","SELECT","SEND","SEND","LOWER","SCYTHE","SENSITISE","SEPARATE","SERVE","SET","SIGH","BE SEXUALLY ACTIVE","SEX","SECRETE","DISSECT","SHOP","SLAVE AWAY","CURRY FAVOR","STALK","PREPARE","AFFILIATE","SETTLE","CONVULSE","GET WORKED UP","THANK","HURRY","BE CONTENT","BE STONED","TRY","BEND DOWN","APPLY THEMSELVES","GET AWAY","DISPORT","DUEL","ROLL LIKE A HEDGEHOG","SETTLE DOWN","INGRATIATE","EMANCIPATE","RELAX","CATCH A COLD","INQUIRE","CHAFE","BE HAPPY","BE PATIENT","CHAT UP","GROPE","WADE IN","SQUABBLE","SET HEART ON SOMETHING","CONCENTRATE","BECOME CLOSE FRIENDS WITH EACH","MOCK","APPROACH","DIE FOR","TAKE REVENGE","BE ASHAMED","LONG","MAKE SCARCE","GET LOST","FALL OUT","FALL IN LOVE",
"AMUSE","FRITTER","SCRAPE BY","DEFEND","REFUSE","RESIST","FIGHT","QUARREL","RECEDE","CUT WITH A SICKLE","MAKE SURE","SAFEGUARD","CONFISCATE","SIGHT","OOZE","SIFT","WASTE AWAY","SETTLE","BOIL","WIN","BE ON FORMAL TERMS","SIGNAL","SIGN","SIMPLIFY","SMS","SIMULATE","SING","SINK","MAKE SENSE","MUSE","PONDER","SINTER","SWOOSH","ADJOURN","SITUATE","SIT","STAY DOWN","SCALE","SCALP","SCANDALIZE","CHANT","SKETCH","SKYPE","SNOWBOARD","DECLARE SOLIDARITY","SHALL","SOLICIT STH","SEPARATE","SOUND","SUN","CARE","SORT","PROMPT","SOCIALIZE","PEEK","SPLIT","TIGHTEN","SAVE","JOKE","WALK","STROLL","STORE","SPIT","DINE","SPECULATE","SPECULATE","SPEND","BLOCK","SPECIALIZE","SPECIFY","LARD","MIRROR","PLAY","SPIN","SPY","SHARPEN","SPLICE","SPLINTER","SPONSOR","MAKE MOCKING REMARKS","SCOFF","SPEAK","SPREAD WELL","SPREAD","BLOW UP","SPRINKLE","PROP UP","JUMP","SPRINT","SPLASH","BUBBLE","SPRAY","SPIT","HAUNT","RINSE","FEEL","FEEL","SPRINT","HURRY","STABILIZE","EQUIP","STAGNATE","TOUGHEN","PUNT","STALK","STAMMER","COME FROM","STOMP","STANDARDIZE","WITHSTAND","BITCH","PRESS","STACK","TRUDGE","STRENGTHEN","STARE","START","DEPLOY","TAKE PLACE","DUST","VACUUM","COMPRESS","DAM UP","BE ASTONISHED","STING","INSERT","STAND","STEAL","RISE","INCREASE","STONE","PLACE","STALK","LIFT","STAMP","QUILT","DIE","STERILIZE","CONTROL","PILFER","EMBROIDER","SCATTER","HOOF IT","GOGGLE","ENDOW","STIGMATIZE","STYLIZE","ALLAY","SHUT DOWN","STAND STILL","TUNE","STIMULATE","STINK","DIP","STIPULATE","RUMMAGE","KINDLE","PICK","HALT","MOAN","STUMBLE","SWAGGER","STUFF","STOP","DISTURB","CANCEL","PUSH","MAFFLE","PUNISH","TIGHTEN","RADIATE","STAND AT ATTENTION","CYCLE","RUN AGROUND","STRANGLE","STRAIN","STAND ON END","STUMBLE","STREAM","STRIVE","STRETCH","PET","PAINT","STREAK","STRIKE","ARGUE","STRESS","STRAY","KNIT","CURRY","HARASS","STRIP","STREAM","WANDER AROUND","ABOUND","STRUCTURE","URINATE","BREAKFAST","STUDY","DIP SOMETHING ININTO A LIQUID","DEFER","STIPPLE","NUDGE","STORM","FALL","CUT SHORT","SUPPORT","STYLE","SUBJECTIVIZE","SUBLIME","SUBSCRIBE","SUBSTANTIVISE","SUBSTANTIATE","SUBSTITUTE","SUBSUME","SUBTRACT","SUBSIDIZE","SEARCH","SUGGEST","WALLOW","ATONE","WAFFLE","HUM","SUM UP","SIN","SUPINATE","SUPPOSE","SURF","BUZZ","SUSPEND","SWEETEN","SYMBOLIZE","SYMPATHIZE","SYNCHRONIZE","SYNTHESIZE","ARRANGE","PELLET","TABOO","BLAME","PANEL","DAWN","TAG","DAYDREAM","RIG","BEAT TIME","TAMPON","DALLY","BOTHER","REFUEL","PRANCE","DANCE","DODDER","WALLPAPER","PAD","TODDLE","MASK","FUMBLE","EFFECT","TATTOO","PAT","PAW","SHAKE","DIVE","MELT","BAPTIZE","BE GOOD FOR","STAGGER","BARTER","DECEIVE","ESTIMATE","TAR","DIVIDE","ATTEND","TELEPHONE","TELEGRAPH","TELEPORT","TEMPER","TEMPER","TEND","SCHEDULE","TERRORIZE","TEST","MAKE A WILL","BRING UP","THEOLOGIZE","THEORIZE","SIT ENTHRONED","TICK","PAY OFF","DYE","TAP","TAP","PUBLISH A STORY UNDER A","TITRATE","ENTITLE","TOAST","RAGE","ACCEPT","FROLIC","SOUND","DO POTTERY","BEAT","REEL","TORPEDO","BLUSTER","KILL","KILL","HUSH UP","GRAZE","TEASE","TOUR","TROT","TRACHEOTOMIZE","STRIVE","TRACK","HAND DOWN","CARRY","TRAIN","PUT ON THE AGENDA","MALTREAT","TRILL","TRAMP","HITCHHIKE","CARVE","WATER","WATER","TRANSFER","TRANSFORM","TRANSFUSE","TRANSIT","TRANSCRIBE","TRANSLITERATE","TRANSLOCATE","TRANSMUTE","TRANSPOSE","TRANSPORT","TRANSCEND","LAY OUT","GOSSIP","TRUST","MOURN","TRICKLE","TRAUMATISE","DREAM","DREAM WALK","TRAVERSE","MEET","DRIVE","DRIVE","QUAVER","SEPARATE","TREPAN","STEP","TRIANGULATE","CHEAT","DRIP","SLAVER","PESTER","TRIGGER","TRIM","DRINK","TODDLE","TRIUMPH","DRAIN","DRY","DAWDLE","DRUM","TRUMPET","DRIP","DRIP","CONSOLE","TROT","AFFRONT","MAKE GO MURKY","DECEIVE","CHIRP","FIDDLE ABOUT","HURRY","WHITEWASH","TUNE","NUTMEG","SPECKLE","DECEIVE","PILE UP","DO GYMNASTICS","CURR","WHISPER","TWEET","TYRANNIZE","EXERCISE","OVEREXERT","OVERWORK","OVERUSE","OVERRATE","OUTDO","OVERVIEW","DELIVER","BRIDGE","OUTLAST","RECONSIDER","RUSH","AGREE","AGREE","RUN OVER","RAID","OVERFISH","FLY OVER","FLOOD","OVERCHARGE","CONVICT","HAND OVER","IGNORE","SHOWER","ABOUND","SUPERELEVATE","FERRY OVER","COME OVER","CROSS","OVERLOAD","OVERLAP","LEAVE OVER","RUN OVER","SURVIVE","HAND DOWN","OUTWIT","TRANSMIT","SLEEP OVER","TAKE OVER","CHECK","CROSS","OVERTOP","SURPRISE","OVERREACT","TALK OVER","HAND OVER","LAP","OVERSHADOW","OVERESTIMATE","FOAM OVER","INTERSECT","OVERWRITE","EXCEED","FLOOD","OVERLOOK","PASS OVER","MOVE","DUB","JUT OUT","EXCEED","OVERSTRAIN","IMPOSE","RUSH","OVERPRICE","TRANSFER","EXCEL","EXAGGERATE","OVERTRUMP","CHEAT","SURVEY","OVERGROW","ON BOIL","OVERCOME","TRANSFER","TRANSFER","OVERCOME","HIBERNATE","CONVINCE","COVER","REMAIN","MODIFY","REWORK","EMBRACE","CONVERT","RENAME","CHANGE THE ORDER","PUT ON","LOOK AROUND","MAKE UP","KILL","RETHINK","TURN","RELABEL","RUN OVER","FALL DOWN","CLASP","REDYE","CHANGE GRIP","FLY AROUND","TRANSFORM","REPHRASE","REPURPOSE","ENSNARE","SURROUND","HANDLE","REDESIGN","JUMP AROUND","ROAM","ENCASE","RETURN","GET KILLED","ROLL UP","RECRYSTALLIZE","ORBIT","APPORTION","REROUTE","ENCASE","CONVERT","CHANGE THE POLARITY","CONVERT","OUTLINE","RIDE DOWN","CHANGE MONEY","HEM","SWITCH","REGROUP","SURROUND","REMELT","BUCKLE ON","REWRITE","CONVERT DEBTS","RETRAIN","KNOCK OVER","LOOK AROUND","RETRAIN","RESETTLE","CARE FOR","CHANGE","CHANGE","RELOCATE","KNOCK OVER","RESTRUCTURE","EXCHANGE","REPOT","REDISTRIBUTE","CONVERT","KNOCK OVER","FENCE ROUND","MOVE","ENCIRCLE","UNIFY","UNDERRATE","UNDERCUT","STOP","DISRUPT","ACCOMMODATE","OPPRESS","OPPRESS","UNDERFUND","UNDERCHALLENGE","SINK","ENTERTAIN","TREAT","SUBJUGATE","FOIST","STOP","BE SUBJECT TO","UNDERPIN","UNDERMINE","SUBORDINATE","PLOUGH UNDER","TEACH","BAN","UNDERESTIMATE","DISTINGUISH","FOIST","EMBEZZLE","SIGN","UNDERMINE","COME UNDER","UNDERLINE","SUPPORT","INVESTIGATE","SUBMERGE","SUBDIVIDE","UNDERSTATE","INSTRUCT","SUBDUE","SIGN","SUBJECT TO","UPGRADE","URBANIZE","URGE","URINATE","HOLIDAY","JUDGE","USURP","TEASE","ROVE AROUND","ROAM","VALIDATE","VALORIZE","VANDALIZE","VAPORISE","VARY","VELARIZE","VENTILATE","MAKE AN APPOINTMENT","ADMINISTER","NEGLECT","ABHOR","TAKE LEAVE","ABSOLUTIZE","DESPISE","GENERALIZE","OBSOLESCE","CHANGE","ANCHOR","ASSESS","ARRANGE","EXEMPLIFY","ESTIMATE","ORGANIZE","TAKE RESPONSIBILITY","KID","CONVERT","ANNOY","BECOME IMPOVERISHED","TRICK","BRANCH OUT","EXPEND","SELL","VERBALIZE","BOWDLERIZE","BANISH","BARRICADE","LOSE","BLOCK","BITE","HIDE","CORRECT","BOW DOWN","BEND STH","FORBID","BANDAGE","EMBITTER","FADE","BASH","REMAIN","GROW PALE","LEAD","AMAZE","BLEED TO DEATH","LEND","EMBELLISH","BLOW","CONSUME","OFFEND","SPREAD","INCINERATE","DOCUMENT","ACQUIRE","FRATERNISE","ENTER","BURY","ALLY","GUARANTEE","SERVE","SUSPECT","CONDEMN","VAPORISE","OWE","DIGEST","CONCEAL","BLAME","SPOIL","GERMANIZE","CONDENSE","EARN","HIRE","REIFY","CONDEMN","DOUBLE","DISPLACE","TWIST","TREBLE","THRASH","IRRITATE","POLISH OFF","BEAT IT","INFLUENCE","DARKEN","DILUTE","EVAPORATE","PERPLEX","REFINE","ADORE","ARRANGE","UNITE","SIMPLIFY","BAND","COLLECT","FREEZE OVER","THWART","INHERIT","IMMORTALIZE","PROCESS","DECAY","DISTORT","WORK","DISCOLOUR","INDITE","ADVOCATE","FAIL","OSTRACIZE","SOLIDIFY","BECOME FAT","FUCK OFF","MAKE A FILM OF","ECLIPSE","INTERWEAVE","DISAPPEAR","CURSE","FOLLOW","DEFORM","GROUT","ORDER","SEDUCE","GASIFY","IMPOSE A DUTY","FORGIVE","PASS","REPAY","FORGET",
"SQUANDER","RAPE","SPILL","CONTAMINATE","TURN YELLOW","GRATE","COMPARE","BURN UP","GILD","BURY","SCARE AWAY","LAY HANDS","AGE","ENLARGE","ARREST","BE DAMAGED BY HAIL","BEHAVE","NEGOTIATE","IMPOSE","PAMPER","TANGLE UP","CONCEAL","HEAL","KEEP SECRET","MARRY","PROMISE","HELP","GLORIFY","BEWITCH","PREVENT","JEER","SEND UP","SELL OFF","INTERROGATE","CLOAK","FAMISH","AVERT","VERIFY","GET LOST","CHASE AWAY","REJUVENATE","HOOK UP WITH CABLES","ENCAPSULATE","SELL","OPERATE","MISJUDGE","SUE","GLORIFY","DRESS UP","MAKE SMALLER","FADE AWAY","BEAT UP","BECOME INFATUATED","HIDE","CRUMPLE","KNOT","COMBINE","GO BAD","EMBODY","COPE WITH","CREEP AWAY","CAKE","ANNOUNCE","SHORTEN","LOAD","RELOCATE","DEMAND","LENGTHEN","SLOW","STRAY","ANNOUNCE","ANNOUNCE","SPEND","FORGET","READ WRONGLY","HURT","ASPERSE","FALL IN LOVE","LOSE","LINK","AFFIANCE","ENTICE","GO OUT","SOLDER","LEAVE","MARRY","CONDEMN","MARKET","FUCK UP","MARRY","AVOID","SUPPOSE","MIX","HUMANIZE","MENTION","MEASURE","SPOIL","LET","REDUCE","MINE","MIX","MISS","MEDIATE","BE ABLE","GUESS","NEGLECT","EAT UP","HEAR","ABNEGATE","NETWORK","ANNIHILATE","PUBLISH","PRESCRIBE","PACK","MISS","BUNGLE","POLLUTE","TELL ON","PAWN","TELL ON","FEED","OBLIGATE","PISS OFF","SQUANDER","CONFUSE","CRIMP","VICTUAL","BEAT UP","DEFLAGRATE","PUPATE","PLASTER","BRING TOGETHER","SELL OFF","REVEAL","MISCALCULATE","COME TO A MISERABLE END","GO AWAY","GO AWAY","DECREASE","TRICKLE AWAY","CASE","RUST","STIR UP","FAIL","SPOIL","ASSEMBLE","MESS UP","GO STALE","MISS","BARTER AWAY","INTERLACE","PROCURE","BATTEN","ENTRENCH","TIGHTEN","BURY","TAKE FOR A RIDE","PASS AWAY","FOOL SOMEONE","GIVE AS A PRESENT","SELL OFF","SHOO","SEND OUT","MOVE","USE UP","GO MOULDY","SLAG","LOSE","MAKE WORSE","VEIL","SLUR","WEAR OUT","ABDUCT","DUMP","LOCK","KILL THE PATIENT WITH THE","AGGRAVATE","DEVOUR","SWALLOW","LOSE","CIPHER","LANGUISH","SCORN","BLEND","GET OVER","SOIL","CATCH BREATH","NEUTER","SPARE","ENTANGLE","SCARE","SCARE","PROVOKE","SCRAP","SHRIVEL","CAUSE","SPILL","CONCEAL","WASTE","BLUR","DISAPPEAR","CONSPIRE","PROVIDE","INJURE","SAPONIFY","SCREW UP","SEND","SCORCH","SINK","RELOCATE","CONTAMINATE","INSURE","SEAL","VERSIFY","SILVER","SINK","ENSLAVE","RECONCILE","PROVIDE","BE LATE","CONSUME","BAR","GAMBLE AWAY","SPIN","RIDICULE","PROMISE","SCATTER","MAKE BRITTLE","FEEL","NATIONALIZE","ALERT","INVIGORATE","STOW","HIDE","SPEND","STIFFEN","AUCTION","BE PETRIFIED","BLOCK","PASS AWAY","METABOLIZE","PLUG","UNSETTLE","INFRINGE","EXPOSE TO RADIATION","ELAPSE","SCATTER","MUTILATE","BECOME SILENT","TRY","STAGNATE","SWEETEN","DELAY","MOOR","EXCHANGE","DEFEND","DISTRIBUTE","CONDEMN","DEEPEN","THATCH","ERADICATE","MISTYPE","SET TO MUSIC","TOLERATE","TRUST","EXPEL","ACT FOR","SQUANDER","COVER UP","COMMIT","HAVE","DISPARAGE","HAVE AN ACCIDENT","MAKE IT IMPOSSIBLE","IRRITATE","DEFACE","DISFIGURE","CAUSE","CONVICT","BLUR","MISDIAL","KEEP","FALL INTO DISREPAIR","BE ORPHANED","MANAGE","TRANSMUTE","BUG","WARN","DILUTE","CONFUSE","BLOW AWAY","DENY","REFUSE","ABIDE","REFER","WITHER","USE","ERASE","EXPLOIT","DECAY","GAMBLE AWAY","INVOLVE","OVERGROW","OVERCOME","FORFEIT","REALIZE","CONFUSE","ERODE","WOUND","ASTONISH","ASTONISH","DEVASTATE","DESPOND","SELL ON DRAUGHT","BEWITCH","HEDGE UP","TENFOLD","CONSUME","LIST","REPORT","FORGIVE","DISTORT","FRITTER","RENOUNCE","WARP","DECORATE","ZINC","TIN","GAMBLE AWAY","DELAY","PAY DUTY","ENRAPTURE","DESPAIR","BRANCH","VIBRATE","QUARTER","CLAIM","VIRTUALIZE","FOWL","ACCOMPLISH","PERFORM","PUKE","FULL LOAD","CLUTTER","EXECUTE","FILL UP","EXECUTE","VOMIT","ADVANCE","ADVANCE","ANTICIPATE","ADVANCE CONSIDER","THINK AHEAD","HURRY AHEAD","PRECEDE","RUN ON AHEAD","PREDICT","FORESEE","PRESUME","FORESEE","PRETREAT","PASS","LET PAST","PREPARE","PREVENT","THINK AHEAD","PUSH TO THE FRONT","ADVANCE","DRIVE UP","HAPPEN","PREFINANCE","FIND","SHOW","LEAD TO BELIEVE","PRETEND","HAPPEN","INTEND","HOLD","PREHEAT","PRECEDE","PREDOMINATE","PREDICT","FORESEE","TAKE SOMEONE TO TASK","ADVANCE","SUMMONS","BIDE","RUN ON AHEAD","SUBMIT","READ OUT","PUT UP WITH","BE EXISTENT","SHOW","RESERVE","CONDUCT","RECKON","ADVANCE","RECITE","ADVANCE","PROPOSE","DICTATE","BE CAREFUL","MAKE PROVISION","AUDITION","PRESENT","ADVANCE","PRETEND","RECITE","REHEARSE UPON","PASS","PASS BY","TIN","ANTICIPATE","SHOW","REPROACH","SHOW","BRING FORWARD","VOTE","VOTE","SUMMON","VULGARIZE","VULCANIZE","UNDULATE","WATCH OVER","KISS AWAKE","ROUSE","WAX","WAG","DARE","WEIGH","CHOOSE","IMAGINE","LAST","MAINTAIN","REALISE","FLEX","UNDULATE","MAKE A PILGRIMAGE","GO ON A PILGRIMAGE","RULE OVER","ROLL","ROLL","STROLL","TRAVEL","FOREARM","HEAT TREAT","WARM","KEEP WARM","WARN","WAIT","WASH","LAND ON WATER","WATER","WADE","WADDLE","WAD","WEAVE","CHANGE","INTERACT","WAKE","WAVE","TAKE AWAY","EDGE AWAY","PUSH OFF","LEAVE","FLY AWAY","LEAVE","CHASE AWAY","GET AWAY","LEAVE OUT","RUN AWAY","PUT AWAY","REMOVE","TAKE AWAY","REMOVE","THROW AWAY","LOOK AWAY","PUT AWAY","BREAK RANKS","THROW AWAY","ZAP","MOVE AWAY","HURT","BLOW","LAMENT","DEFEND","HURT","GIVE WAY","GRAZE","REFUSE","CONSECRATE","MUSS FRES WEIHNACHTETJE NACH KONTEXT","STAY","CRY","POINT","MAKE BELIEVE","PREDICT","WHITEN","WHITEN","WIDEN","CONTINUE BUILDING","THINK AHEAD","PASS ON","PROCEED","HELP","LIVE ON","FORWARD","CONTINUE","SPIN OUT","WILT","WAVE","WELSH","PUT ABOUT","ADVERTISE","BECOME","THROW","POTTER ABOUT","RATE","APPRECIATE","COMPETE","BET","BET","FULMINATE","RECOUP","WHET","BLACK","WRAP","DISPROVE","RECANT","CONTRADICT","RESIST","DEDICATE","RECYCLE","BE RESURRECTED","REANIMATE","REINTEGRATE","REDISCOVER","REGAIN","REOPEN","RECOVER","GIVE BACK","REGAIN","ATONE FOR","RECOVER","ITERATE","RUMINATE","RETURN","MEET AGAIN","REUNIFY","REELECT","ROCK","WHINNY","POACH","WELCOME","SWARM","SNIVEL","WIND","BECK","WHINE","BOB","SWIRL","WORK","WHIRL AROUND","WIPE","WHISPER","KNOW","SMELL","QUIP","QUIP","LIVE","WINNOW","PROLIFERATE","HEAVE","DIG","SURPRISE","WISH","ACKNOWLEDGE","PLAY DICE","CHOKE","MEDDLE","BE ROOTED","SEASON","TOUSLE","SCURRY","RAGE","XEROX","PROVIDE WITH A JAGGED EDGE","HESITATE","COUNT","PAY","TAME","INDENT","DISPUTE","TAP","FIDGET","ZAP","DO MAGIC","HESITATE","BRIDLE","FENCE","CAROUSE","ASSIGN","GNAW","DRAW","SHOW","ACCUSE","BRING ABOUT","CELEBRATE","CAMP","CEMENT","MARK","CENSOR","CENTER","CENTRIFUGE","CHEW","TOBURST","DENT","BREAK","CRUMBLE","SMASH","CRUSH","DILAPIDATE","FRAY OUT","TEAR APART","CRUSH","TATTER","LACERATE","MELT","MELT","CHEW","CHOP","INDENT","CRUMPLE","SCRATCH","MELT","DISMANTLE","CRUSH","SQUASH","CHEW TO PIECES","ANNIHILATE","BESIEGE","PICK SOMETHING TO PIECES","BURST","CRUSH","DISCUSS TO DEATH","BRAY","TEAR UP","DRAG","MELT AWAY","RUIN","SAW UP","SMASH","SHOOT","SMASH","SMASH","CUT UP","SNIP TO PIECES","SCRATCH TO PIECES","CORRODE","SPLINTER","POUND","SPRAY","SHALL THRUST","DISPERSE","DESTROY","DEMATERIALIZE","QUARREL","SCATTER","DIVIDE","CERTIFY","TRAMPLE","SMASH","COMPLAIN","STREW","PROCREATE","PULL","AIM","CHIRP","DECORATE","ZIP","CIRCULATE","CHIRP","WHISPER","HISS","CHASE","CITE","TREMBLE","CIVILIZE","GAMBLE","HESITATE","PAY","ZOOM","UNDERLIE","RUIN","WRECK","UNEARTH","BITE","PREPARE","BRING","CHIP IN","BREED","TWITCH","WHIP OUT","SUGAR","THINK","FIND EACH OTHER","ACCRUE TO","WHISPER","CONTENT","FREEZE OVER","INFLICT","SUPPLY","ADMIT","REACH","REIN IN","ABIDE BY","UNDERLIE","RUIN","BENEFIT","LISTEN","SEAL","BUTTON UP","BECOME","TOLERATE","GAIN","CLOSE","EXPECT","SEW UP","PLAY WITH FIRE","CATCH FIRE","INCREASE","DART","NULLIFY","ASSIGN","MAKE A GRAB","HAVE COME AT THE RIGHT","PLUCK","ADVISE","ACCOUNT FOR","FIND THEIR WAY","COPE","REPRIMAND","GET ANGRY","LASH","GET BACK","STAY BEHIND","BRING BACK","THINK BACK","PUSH BACK","BACK FIND","RESTORE","RETURN","GO BACK","WIN BACK","FALL BACK ON","RESTRAIN","RETURN","RETURN","LEAVE BEHIND","COVER","GO BACK","BE BACK","WITHDRAW","RUN BACK","CALL BACK","SEND BACK","WRITE","RESET","RESIGN","TRACE BACK","RECONVERT","REFUSE","TURN BACK","PAY BACK","PULL BACK","RECOIL","PROMISE","WORK TOGETHER","CLENCH","BREW","COLLAPSE","COMPRESS","COLLAPSE","SUMMARIZE","GET TOGETHER","FLOW TOGETHER","JOIN TOGETHER","CONSOLIDATE","HOLD TOGETHER","BE INVOLVED","GLUE","CRUMBLE UP","SCRAPE TOGETHER","LIVE TOGETHER","GLUE TOGETHER","COMPRESS","ADD UP","PULL TOGETHER","SCRAPE UP","UNITE","SPLICE","SCREW TOGETHER","JUMP","PUT TOGETHER","SAVE UP","COMPILE","COMPILE","COLLAPSE","RALLY","BAND TOGETHER","SHRINK","WINCE","CONFOUND","LOOK ON","STRIKE","LOCK","CUT OUT","ASCRIBE","CRY OUT TO","FILL UP","WATCH","PLEDGE","SPEAK","CLIMB","BLOCK","AGREE","HAPPEN TO","UNEARTH","BE BESTOWED","SPOUT","BEFALL","ATTEST THE CAPABILITY","IMMIGRATE","ASSIGN","THROW","CONTRAVENE","PAY","SUCK","SQUEEZE","USE FOR A PURPOSE NOT","DOUBT","PINCH","FORCE","BLINK",
"TWIST",
"READ BETWEEN THE LINES","CHIRP","BE",
"HAVE",
"BECOME",
"BE ABLE TO",
"HAVE TO",
"SAY",
"DO, MAKE",
"GIVE",
"COME",
"SHOULD OR OUGHT TO",
"WANT",
"GO",
"KNOW",
"SEE",
"LET, ALLOW, HAVE DONE",
"STAND",
"FIND",
"STAY, REMAIN",
"LIE, BE LYING",
"BE CALLED",
"THINK",
"TAKE",
"DO",
"MAY, TO BE ALLOWED",
"BELIEVE",
"STOP, HOLD",
"NAME,",
"LIKE",
"SHOW",
"LEAD",
"SPEAK",
"BRING, TAKE",
"LIVE",
"DRIVE, RIDE, GO",
"THINK, HAVE AN OPINION",
"ASK",
"KNOW",
"BE VALID",
"PLACE, SET",
"PLAY",
"WORK",
"NEED",
"FOLLOW",
"LEARN",
"EXIST, INSIST, PASS (AN EXAM)",
"UNDERSTAND",
"SET, PUT, PLACE",
"GET, RECEIVE",
"BEGIN",
"NARRATE, TELL",
"TRY, ATTEMPT",
"WRITE",
"RUN",
"EXPLAIN",
"CORRESPOND",
"SIT",
"PULL, MOVE",
"SHINE, SEEM, APPEAR",
"FALL",
"BELONG",
"ORIGINATE, DEVELOP",
"RECEIVE",
"MEET",
"SEARCH, LOOK FOR",
"LAY, PUT",
"INTRODUCE, IMAGINE",
"DEAL, TRADE",
"ACHIEVE, REACH",
"CARRY, WEAR",
"MANAGE, CREATE",
"READ",
"LOSE",
"DEPICT, PORTRAY",
"RECOGNIZE, ADMIT",
"DEVELOP",
"TALK",
"APPEAR, LOOK (A CERTAIN WAY)",
"APPEAR",
"FORM, EDUCATE",
"BEGIN",
"EXPECT",
"LIVE",
"AFFECT, CONCERN",
"WAIT",
"ELAPSE; TO DECAY",
"HELP",
"WIN",
"CLOSE",
"FEEL",
"OFFER",
"INTEREST",
"REMEMBER",
"RESULT IN",
"OFFER",
"STUDY",
"CONNECT, LINK",
"LOOK AT, WATCH",
"LACK, BE MISSING, BE ABSENT",
"MEAN","COMPARE"
],
German:[
  "TUN","AALEN","AASEN","ABÄLARDISIEREN","ABALIENIEREN","ABÄNDERN","ABANDONNIEREN","ABARBEITEN","ABARTEN","ABÄTZEN","ABBAGGERN","ABBAKEN","ABBALGEN","ABBALLERN","ABBAUEN","ABBEDINGEN","ABBEHALTEN","ABBEISSEN","ABBEIZEN","ABBEKOMMEN","ABBERUFEN","ABBESTELLEN","ABBETTELN","ABBEZAHLEN","ABBIEGEN","ABBILDEN","ABBINDEN","ABBITTEN","ABBLASEN","ABBLÄTTERN","ABBLEIBEN","ABBLEICHEN","ABBLENDEN","ABBLITZEN","ABBLOCKEN","ABBLÜHEN","ABBÖSCHEN","ABBRECHEN","ABBREMSEN","ABBRENNEN","ABBREVIIEREN","ABBRINGEN","ABBRÖCKELN","ABBRÜHEN","ABBUCHEN","ABBUFFEN","ABBÜGELN","ABBÜRSTEN","ABBÜSSEN","ABCHECKEN","ABCHOPPEN","ABDÄMMEN","ABDANKEN","ABDECKEN","ABDESTILLIEREN","ABDICHTEN","ABDINGEN","ABDIZIEREN","ABDRÄNGEN","ABDREHEN","ABDRIFTEN","ABDROSSELN","ABDRUCKEN","ABDRÜCKEN","ABDUNKELN","ABDÜSEN","ABDUZIEREN","ABEBBEN","ABERKENNEN","ABERNTEN","ABERRIEREN","ABFAHREN","ABFALLEN","ABFÄLSCHEN","ABFANGEN","ABFÄRBEN","ABFASEN","ABFASSEN","ABFEDERN","ABFEGEN","ABFERTIGEN","ABFEUERN","ABFILTERN","ABFINDEN","ABFISCHEN","ABFLACHEN","ABFLAKEN","ABFLAUEN","ABFLIEGEN",
  "ABFLIESSEN","ABFOTOGRAFIEREN","ABFRAGEN","ABFRÄSEN","ABFRIEREN","ABFÜHREN","ABFÜLLEN","ABGEBEN","ABGEHEN","ABGEWÖHNEN","ABGIESSEN","ABGRENZEN","ABHACKEN","ABHAKEN","ABHALTEN","ABHANDELN","ABHANDENKOMMEN","ABHÄNGEN","ABHAUEN","ABHÄUTEN","ABHEBEN","ABHEFTEN","ABHELFEN","ABHETZEN","ABHOBELN","ABHOLEN","ABHOLZEN","ABHÖREN","ABISOLIEREN","ABJAGEN","ABJUDIZIEREN","ABKACKEN","ABKÄMMEN","ABKANZELN","ABKAPSELN","ABKASSIEREN","ABKAUFEN","ABKLAPPERN","ABKLÄREN","ABKLATSCHEN","ABKLEMMEN","ABKNALLEN","ABKNICKEN","ABKNUTSCHEN","ABKOMMANDIEREN","ABKOMMEN","ABKOPPELN","ABKRATZEN","ABKÜHLEN","ABKÜNDIGEN","ABKUPFERN","ABKÜRZEN","ABLADEN","ABLAGERN","ABLAKTIEREN","ABLASSEN","ABLEBEN","ABLECKEN","ABLEGEN","ABLEHNEN","ABLEITEN","ABLENKEN","ABLESEN","ABLIEFERN","ABLÖSCHEN","ABLÖSEN","ABMACHEN","ABMAGERN","ABMAHNEN","ABMELDEN","ABMESSEN","ABMURKSEN","ABNABELN","ABNEHMEN","ABNICKEN","ABNUTZEN","ABNÜTZEN","ABOLIEREN","ABONNIEREN","ABORTIEREN","ABPACKEN","ABPAUSEN","ABPELLEN","ABPERLEN","ABPFLÜCKEN","ABPRESSEN","ABPROTZEN","ABQUALIFIZIEREN","ABQUETSCHEN","ABRASIEREN","ABRÄUMEN","ABREAGIEREN","ABRECHNEN","ABREIBEN","ABREICHERN","ABREISEN","ABREISSEN","ABRIEGELN","ABRINGEN","ABROCKEN","ABROGIEREN","ABRÜCKEN","ABRUFEN","ABRUNDEN","ABRÜSTEN","ABRUTSCHEN",
  "ABSAGEN","ABSÄGEN","ABSAHNEN","ABSAUFEN","ABSAUGEN","ABSCHAFFEN","ABSCHALTEN","ABSCHAUEN","ABSCHEIDEN","ABSCHICKEN","ABSCHIEBEN","ABSCHIRMEN","ABSCHLACHTEN","ABSCHLAGEN","ABSCHLEPPEN","ABSCHLIESSEN","ABSCHMETTERN","ABSCHMIEREN","ABSCHMINKEN","ABSCHMIRGELN","ABSCHNEIDEN","ABSCHÖPFEN","ABSCHRECKEN","ABSCHREIBEN","ABSCHWEIFEN","ABSCHWÖREN","ABSEGELN","ABSEGNEN","ABSEHEN","ABSEIHEN","ABSEILEN","ABSENDEN","ABSENKEN","ABSETZEN","ABSICHERN","ABSINKEN","ABSOLVIEREN","ABSONDERN","ABSORBIEREN","ABSPALTEN","ABSPECKEN","ABSPEICHERN","ABSPIELEN","ABSPRECHEN","ABSPRINGEN","ABSPRITZEN","ABSPÜLEN","ABSPULEN","ABSTAUBEN","ABSTECHEN","ABSTECKEN","ABSTEIGEN","ABSTELLEN","ABSTEMPELN","ABSTERBEN","ABSTILLEN","ABSTIMMEN","ABSTOSSEN","ABSTRAFEN","ABSTRAHIEREN","ABSTREIFEN","ABSTREITEN","ABSTUMPFEN","ABSTÜRZEN","ABSTÜTZEN","ABTAKELN","ABTAUCHEN","ABTEILEN","ABTIPPEN","ABTÖTEN","ABTRAGEN","ABTRANSPORTIEREN","ABTREIBEN","ABTRENNEN","ABTRETEN","ABTROPFEN","ABTUN","ABTUPFEN",
  "ABWÄGEN","ABWÄHLEN","ABWANDELN","ABWANDERN","ABWARTEN","ABWASCHEN","ABWECHSELN","ABWEHREN","ABWEICHEN","ABWEISEN","ABWENDEN","ABWERBEN","ABWERFEN","ABWERTEN","ABWICKELN","ABWIEGELN","ABWIEGEN","ABWISCHEN","ABWRACKEN","ABWÜRGEN","ABZÄHLEN","ABZÄUNEN","ABZEICHNEN","ABZIEHEN","ABZIELEN","ABZISCHEN","ABZWACKEN","ACHT GEBEN","ÄCHTEN","ACHTEN","ACHTGEBEN","ÄCHZEN","ACKERN","ADAPTIEREN","ADDIEREN","ADELN","ADJUNGIEREN","ADOPTIEREN","ADORIEREN","ADRESSIEREN","ADSORBIEREN","AERIFIZIEREN","AFFICHIEREN","AFFIGIEREN","AFFIZIEREN","AFTERREDEN","AGGRAVIEREN","AGGREGIEREN","AGIEREN","AGITIEREN","AHNDEN","ÄHNELN","AHNEN","ÄHNLICHSEHEN","AIRBRUSHEN","AKKOMMODIEREN","AKKREDITIEREN","AKKUMULIEREN","AKQUIRIEREN","AKTIVIEREN","AKTUALISIEREN","AKZENTUIEREN","AKZEPTIEREN","ALARMIEREN","ALBERN","ALIMENTIEREN","ALIQUOTIEREN","ALLEINSTEHEN","ALLERGISIEREN","ALLOKIEREN","ALLOZIEREN","ALPHABETISIEREN","ALTERIEREN","ALTERN","ALUMINIEREN","AMALGAMIEREN","AMELIORIEREN","AMENAGIEREN","AMOK LAUFEN","AMORTISIEREN","AMPUTIEREN","AMTIEREN","AMÜSIEREN","ANALYSIEREN","ANÄSTHESIEREN","ANASTOMOSIEREN","ANBAHNEN","ANBANDELN","ANBAUEN","ANBEISSEN","ANBELLEN","ANBERAUMEN","ANBETEN","ANBIETEN","ANBLICKEN","ANBLINZELN","ANBRATEN","ANBRÄUNEN","ANBRECHEN","ANBRENNEN","ANBRINGEN","ANDAUERN","ÄNDERN","ANDEUTEN","ANDICKEN","ANDIENEN","ANDREHEN","ANDROHEN","ANEIGNEN","ANEKELN","ANERBIETEN","ANERKENNEN","ANFAHREN","ANFALLEN","ANFANGEN","ANFASEN","ANFASSEN","ANFECHTEN","ANFERTIGEN",
  "ANFEUCHTEN","ANFEUERN","ANFLANSCHEN","ANFLEHEN","ANFORDERN","ANFREUNDEN","ANFÜGEN","ANFÜHLEN","ANFÜHREN","ANGEBEN","ANGEHEN","ANGEHÖREN","ANGELN","ANGLEICHEN","ANGLIEDERN","ANGREIFEN","ANGRENZEN","ÄNGSTIGEN","ANGUCKEN","ANHABEN","ANHALTEN","ANHÄUFEN","ANHEBEN","ANHEFTEN","ANHEIMSTELLEN","ANHEIZEN","ANHEUERN","ANHIMMELN","ANHÖREN","ANIMIEREN","ANKERN","ANKETTEN","ANKLAGEN","ANKLEBEN","ANKLICKEN","ANKLOPFEN","ANKOMMEN","ANKOTZEN","ANKRATZEN","ANKREIDEN","ANKREUZEN","ANKÜNDIGEN","ANKURBELN","ANLÄCHELN","ANLACHEN","ANLAGERN","ANLANGEN","ANLASSEN","ANLAUFEN","ANLÄUTEN","ANLEGEN","ANLEGIEREN","ANLEITEN","ANLEUCHTEN","ANLOCKEN","ANLÜGEN","ANMACHEN","ANMAHNEN","ANMALEN","ANMASSEN","ANMELDEN","ANMERKEN","ANMIETEN","ANNÄHERN","ANNEHMEN","ANNEKTIEREN","ANNONCIEREN","ANNOTIEREN","ANNULLIEREN","ANODISIEREN","ANORDNEN","ANPASSEN","ANPFLANZEN","ANPINGEN","ANPISSEN","ANPÖBELN","ANPRANGERN","ANPROBIEREN","ANRANZEN","ANREDEN","ANREICHERN","ANREISEN","ANREISSEN","ANRICHTEN","ANRUFEN","ANRÜHREN","ANSAGEN","ANSAMMELN","ANSÄUERN","ANSCHAFFEN","ANSCHALTEN","ANSCHAUEN","ANSCHICKEN","ANSCHIRREN","ANSCHLAGEN","ANSCHLEICHEN","ANSCHLIESSEN","ANSCHMIEGEN","ANSCHMIEREN","ANSCHNALLEN","ANSCHNAUZEN","ANSCHRAUBEN","ANSCHREIBEN","ANSCHREIEN","ANSCHULDIGEN","ANSCHWÄRZEN","ANSCHWELLEN","ANSCHWITZEN","ANSEHEN","ANSENKEN","ANSETZEN","ANSIEDELN","ANSPEIEN","ANSPIELEN","ANSPITZEN","ANSPORNEN","ANSPRECHEN","ANSPÜLEN","ANSTACHELN","ANSTARREN","ANSTECKEN","ANSTEHEN","ANSTEIGEN","ANSTELLEN","ANSTEUERN","ANSTIEREN","ANSTIMMEN","ANSTOSSEN","ANSTREBEN","ANSTREICHEN","ANSTRENGEN","ANSTUPSEN","ANSUMPFEN","ANTIPPEN","ANTIZIPIEREN","ANTREIBEN","ANTRETEN","ANTWORTEN","ANVERTRAUEN","ANVERWANDELN","ANVISIEREN","ANWACHSEN","ANWANDELN","ANWÄRMEN","ANWEISEN","ANWENDEN","ANWIDERN","ANZEIGEN","ANZIEHEN","ANZÜNDEN","ANZWEIFELN","ÄPFELN",
  "APPELLIEREN","APPLAUDIEREN","APPLIZIEREN","APPORTIEREN","APPROBIEREN","APPROPRIIEREN","AQUARELLIEREN","ARBEITEN","ARCHIVIEREN","ÄRGERN","ARGUMENTIEREN","ARGWÖHNEN","ARRANGIEREN","ARRESTIEREN","ARRETIEREN","ARRONDIEREN","ARTIKULIEREN","ÄSEN","ASPHALTIEREN","ASPIRIEREN","ASSERVIEREN","ASSIMILIEREN","ASSISTIEREN","ASSOZIIEREN","ÄSTIMIEREN","ATMEN","ATOMISIEREN","ATTACKIEREN","ATTESTIEREN","ATTRAHIEREN","ÄTZEN","ATZEN","AUDITIEREN","AUF DEN KEKS GEHEN","AUF SEIN","AUFARBEITEN","AUFATMEN","AUFBAHREN","AUFBAUEN","AUFBAUSCHEN",
  "AUFBEGEHREN","AUFBEISSEN","AUFBEREITEN","AUFBESSERN","AUFBEWAHREN","AUFBIETEN","AUFBINDEN","AUFBLASEN","AUFBLEIBEN","AUFBLITZEN","AUFBLÜHEN","AUFBOCKEN","AUFBRAUCHEN","AUFBRECHEN","AUFBREZELN","AUFBRINGEN","AUFBRUMMEN","AUFBÜGELN","AUFBÜRDEN","AUFDECKEN","AUFDRÄNGEN","AUFDREHEN","AUFDRÖSELN","AUFEINANDERBEISSEN","AUFERSTEHEN","AUFESSEN","AUFFALLEN","AUFFANGEN","AUFFASSEN","AUFFINDEN","AUFFLAMMEN","AUFFORDERN","AUFFRESSEN","AUFFRIEREN","AUFFÜHREN","AUFFÜLLEN","AUFGEBEN","AUFGEHEN","AUFGEILEN","AUFGIESSEN","AUFGLÜHEN","AUFGREIFEN","AUFHALTEN","AUFHÄNGEN","AUFHEBEN","AUFHEIZEN","AUFHOLEN","AUFHÖREN","AUFKLAREN","AUFKLÄREN","AUFKLEBEN","AUFKNÜPFEN","AUFKOCHEN","AUFKOMMEN","AUFKONZENTRIEREN","AUFKREUZEN","AUFKÜNDEN","AUFLADEN","AUFLASSEN","AUFLAUERN","AUFLAUFEN","AUFLEGEN","AUFLEHNEN","AUFLISTEN","AUFLÖSEN","AUFMACHEN","AUFMARSCHIEREN","AUFMERKEN","AUFMISCHEN","AUFMUCKEN","AUFMUNTERN","AUFNEHMEN","AUFNÖTIGEN","AUFOKTROYIEREN","AUFPÄPPELN","AUFPASSEN","AUFPFLANZEN","AUFPLATZEN","AUFPLUSTERN","AUFPRÄGEN","AUFPRALLEN","AUFPUMPEN","AUFRAFFEN","AUFRAUEN","AUFRÄUMEN","AUFRECHNEN","AUFRECHTERHALTEN","AUFREGEN",
  "AUFREIBEN","AUFREISSEN","AUFRIBBELN","AUFRICHTEN","AUFRIEGELN","AUFRINGEN","AUFROLLEN","AUFRUFEN","AUFRUNDEN","AUFRÜSTEN","AUFSAGEN","AUFSAUGEN","AUFSCHEINEN","AUFSCHEUCHEN","AUFSCHIEBEN","AUFSCHLAGEN","AUFSCHLIESSEN","AUFSCHLUCHZEN","AUFSCHNAPPEN","AUFSCHNEIDEN","AUFSCHREIBEN","AUFSCHREIEN","AUFSCHÜTTEN","AUFSCHWEISSEN","AUFSEHEN","AUFSETZEN","AUFSITZEN","AUFSPALTEN","AUFSPERREN","AUFSPIELEN","AUFSPRINGEN","AUFSPRITZEN","AUFSPÜREN","AUFSTAPELN","AUFSTEHEN","AUFSTEIGEN","AUFSTELLEN","AUFSTICKEN","AUFSTOCKEN","AUFSTOSSEN","AUFSUCHEN","AUFTAKELN","AUFTANKEN","AUFTAUCHEN","AUFTAUEN","AUFTEILEN","AUFTISCHEN","AUFTRAGEN","AUFTREIBEN","AUFTRENNEN","AUFTRETEN","AUFTUN","AUFWACHEN","AUFWACHSEN","AUFWÄRMEN","AUFWARTEN","AUFWECKEN","AUFWEICHEN","AUFWEISEN","AUFWENDEN","AUFWERFEN","AUFWERTEN","AUFWICKELN","AUFWIEGELN","AUFWÜHLEN","AUFZÄHLEN","AUFZEICHNEN","AUFZEIGEN","AUFZIEHEN","AUFZWIRBELN","AUSARBEITEN","AUSARTEN","AUSATMEN","AUSBADEN","AUSBAGGERN","AUSBALDOWERN","AUSBAUEN","AUSBEINEN","AUSBESSERN","AUSBEUTEN","AUSBILDEN","AUSBLEIBEN","AUSBLUTEN","AUSBOMBEN","AUSBORGEN","AUSBRECHEN","AUSBREITEN","AUSBRÜTEN","AUSBÜGELN","AUSBUHEN","AUSDEHNEN","AUSDENKEN","AUSDRUCKEN","AUSDRÜCKEN","AUSEINANDERFALLEN","AUSEINANDERKLAFFEN","AUSEINANDERSETZEN","AUSERKIESEN",
  "AUSERLESEN","AUSFALLEN","AUSFLIPPEN","AUSFORMULIEREN","AUSFRAGEN","AUSFÜHREN","AUSFÜLLEN","AUSGEBEN","AUSGEHEN","AUSGLEICHEN","AUSGLEITEN","AUSGRABEN","AUSGRENZEN","AUSHALTEN","AUSHÄMMERN","AUSHANDELN","AUSHÄNDIGEN","AUSHÄRTEN","AUSHEBELN","AUSHEBEN","AUSHELFEN","AUSHOLEN","AUSHUNGERN","AUSIXEN","AUSKEHREN","AUSKENNEN","AUSKLAMMERN","AUSKNOCKEN","AUSKOFFERN","AUSKOMMEN","AUSKOMMENTIEREN","AUSKOTZEN","AUSLACHEN","AUSLADEN","AUSLAGERN","AUSLASSEN","AUSLASTEN","AUSLAUFEN","AUSLAUGEN","AUSLEBEN","AUSLEGEN","AUSLEIERN","AUSLEIHEN","AUSLICHTEN","AUSLIEFERN","AUSLIEGEN","AUSLOBEN","AUSLÖFFELN","AUSLOGGEN","AUSLÖSCHEN","AUSLÖSEN","AUSLOSEN","AUSLOTEN","AUSMACHEN","AUSMALEN","AUSMANÖVRIEREN","AUSMERZEN","AUSMISTEN","AUSNEHMEN","AUSNUTZEN","AUSPACKEN","AUSPEITSCHEN","AUSPOSAUNEN","AUSPROBIEREN","AUSQUARTIEREN","AUSRANGIEREN","AUSRASTEN","AUSRAUBEN","AUSRÄUCHERN","AUSRECHNEN","AUSREDEN","AUSREICHEN","AUSREISEN","AUSREISSEN","AUSREIZEN","AUSRICHTEN","AUSROTTEN","AUSRÜCKEN","AUSRUFEN","AUSRUHEN","AUSRÜSTEN","AUSRUTSCHEN","AUSSAGEN","AUSSAUGEN","AUSSCHALTEN","AUSSCHEIDEN","AUSSCHENKEN","AUSSCHIFFEN","AUSSCHILDERN","AUSSCHIMPFEN","AUSSCHLACHTEN","AUSSCHLAFEN","AUSSCHLAGEN","AUSSCHLIESSEN","AUSSCHLÜPFEN","AUSSCHMÜCKEN","AUSSCHREIBEN","AUSSCHÜTTELN","AUSSCHÜTTEN",
  "AUSSEHEN","AUSSENDEN","ÄUSSERN","AUSSERSTAND SETZEN","AUSSETZEN","AUSSITZEN","AUSSORTIEREN","AUSSPAREN","AUSSPINNEN","AUSSPIONIEREN","AUSSPRECHEN","AUSSPUCKEN","AUSSPÜLEN","AUSSTATTEN","AUSSTEHEN","AUSSTEIGEN","AUSSTELLEN","AUSSTERBEN","AUSSTOPFEN","AUSSTOSSEN","AUSSTRAHLEN","AUSSTRECKEN","AUSSUCHEN","AUSTARIEREN","AUSTAUSCHEN","AUSTRAGEN","AUSTRETEN","AUSTRINKEN","AUSÜBEN","AUSVERKAUFEN","AUSWACHSEN","AUSWÄHLEN","AUSWALZEN","AUSWANDERN","AUSWEICHEN","AUSWEIDEN","AUSWEISEN","AUSWEITEN","AUSWERFEN","AUSWERTEN","AUSWICKELN","AUSWIRKEN","AUSWISCHEN","AUSWUCHTEN","AUSZACKEN","AUSZÄHLEN","AUSZAHLEN","AUSZEHREN","AUSZEICHNEN","AUSZIEHEN","AUSZUPFEN","AUTHENTIFIZIEREN","AUTHENTISIEREN","AUTOGRAPHIEREN","AUTOKLAVIEREN","AUTOMATISIEREN","AVANCIEREN","AVISIEREN",
  "AVIVIEREN","AXIOMATISIEREN","AZETYLIEREN","BABBELN","BABYSITTEN","BACKEN","BADEN","BAGATELLISIEREN","BAGGERN","BÄHEN","BAJONETTIEREN","BALANCIEREN","BALGEN","BALKANISIEREN","BALLASTEN","BALLEN","BALLERN","BALSAMIEREN","BANALISIEREN","BANDAGIEREN","BÄNDIGEN","BANGEN","BANKROTTGEHEN","BANKROTTIEREN","BANNEN","BAPPEN","BARBIEREN","BARDIEREN","BARMEN","BASIEREN","BASTARDIEREN","BASTELN","BATIKEN","BAUEN","BAUMELN","BEABSICHTIGEN","BEACHTEN","BEACKERN","BEAMEN","BEANSPRUCHEN","BEANSTANDEN","BEANTRAGEN","BEANTWORTEN","BEARBEITEN","BEAUFSICHTIGEN","BEAUFTRAGEN","BEÄUGEN","BEBAUEN","BEBEN","BEBILDERN","BECKMESSERN","BEDACHEN","BEDANKEN","BEDAUERN","BEDECKEN","BEDENKEN","BEDEUTEN","BEDIENEN","BEDINGEN","BEDRÄNGEN","BEDROHEN","BEDRÜCKEN","BEDRUCKEN","BEDÜRFEN","BEEILEN","BEEINDRUCKEN","BEEINFLUSSEN","BEEINTRÄCHTIGEN","BEENDEN","BEERDIGEN","BEFÄHIGEN","BEFAHREN","BEFALLEN","BEFASSEN","BEFEHLEN","BEFESTIGEN","BEFEUCHTEN","BEFINDEN","BEFLECKEN","BEFLOCKEN","BEFLÜGELN","BEFOLGEN","BEFÖRDERN","BEFRAGEN","BEFREIEN","BEFREMDEN","BEFRIEDEN","BEFRIEDIGEN","BEFRISTEN","BEFRUCHTEN","BEFÜHLEN",
  "BEFÜLLEN","BEFUMMELN","BEFÜRCHTEN","BEFÜRWORTEN","BEGAFFEN","BEGASEN","BEGATTEN","BEGEBEN","BEGEGNEN","BEGEHEN","BEGEHREN","BEGEISTERN","BEGINNEN","BEGLEICHEN","BEGLEITEN","BEGLÜCKEN","BEGLÜCKWÜNSCHEN","BEGNADIGEN","BEGNÜGEN","BEGRABEN","BEGRAPSCHEN","BEGREIFEN","BEGRENZEN","BEGRÜNDEN","BEGRÜNEN","BEGRÜSSEN","BEGÜNSTIGEN","BEHAFTEN","BEHALTEN","BEHANDELN","BEHARREN","BEHAUPTEN","BEHEBEN","BEHEIMATEN","BEHEIZEN","BEHELFEN","BEHELLIGEN","BEHERBERGEN","BEHERRSCHEN","BEHERZIGEN","BEHINDERN","BEHÜTEN","BEIBEHALTEN","BEIBRINGEN","BEICHTEN","BEIFÜGEN","BEIGEBEN","BEIGEN","BEILEGEN","BEINHALTEN","BEIPFLICHTEN","BEISEITELEGEN","BEISEITESCHIEBEN","BEISETZEN","BEISPRINGEN","BEISSEN","BEISTEHEN","BEISTEUERN","BEISTIMMEN","BEITRAGEN","BEITRETEN","BEIWOHNEN",
  "BEIZEN","BEJAGEN","BEJAHEN","BEJAMMERN","BEJUBELN","BEKÄMPFEN","BEKANNTWERDEN","BEKEHREN","BEKENNEN","BEKLAGEN","BEKLATSCHEN","BEKLEIDEN","BEKLEMMEN","BEKOCHEN","BEKOMMEN","BEKOTEN","BEKRÄFTIGEN","BEKRÄNZEN","BEKREUZIGEN","BEKRIEGEN","BEKRITTELN","BEKUNDEN","BELÄCHELN","BELAGERN","BELANGEN","BELASSEN","BELASTEN","BELÄSTIGEN","BELAUERN","BELAUSCHEN","BELEBEN","BELECKEN","BELEGEN","BELEIDIGEN","BELEUCHTEN","BELIEFERN","BELLEN","BELOBIGEN","BELOHNEN","BELÜFTEN","BELÜGEN","BELUSTIGEN","BEMÄCHTIGEN","BEMALEN","BEMÄNGELN","BEMEHLEN","BEMERKEN","BEMITLEIDEN","BEMÜHEN","BEMUTTERN","BENACHRICHTIGEN","BENACHTEILIGEN","BENEHMEN","BENEIDEN","BENENNEN","BENETZEN","BENOTEN","BENÖTIGEN","BENUTZEN","BENÜTZEN","BEOBACHTEN","BEPFLANZEN","BEPISSEN","BEQUEMEN","BERATEN","BERATSCHLAGEN","BERAUBEN","BERECHNEN","BERECHTIGEN","BEREDEN","BEREGNEN","BEREICHERN","BEREINIGEN","BEREITEN","BEREITSTEHEN","BEREITSTELLEN","BEREUEN","BERGEN","BERGSTEIGEN","BERICHTEN","BERICHTIGEN","BERINGEN","BERSTEN","BERÜCKSICHTIGEN","BERUFEN","BERUHEN","BERUHIGEN","BERÜHREN","BERUSSEN","BESAGEN","BESAMEN","BESÄNFTIGEN","BESCHÄDIGEN","BESCHAFFEN","BESCHÄFTIGEN","BESCHÄMEN","BESCHATTEN","BESCHEINEN","BESCHEINIGEN","BESCHEISSEN","BESCHEREN","BESCHICHTEN","BESCHICKERN","BESCHIESSEN",
  "BESCHIMPFEN","BESCHIRMEN","BESCHLAGEN","BESCHLAGNAHMEN","BESCHLEICHEN","BESCHLEUNIGEN","BESCHLIESSEN","BESCHMIEREN","BESCHMUTZEN","BESCHNEIDEN","BESCHNEIEN","BESCHÖNIGEN","BESCHOTTERN","BESCHRÄNKEN","BESCHREIBEN","BESCHRIFTEN","BESCHULDIGEN","BESCHULEN","BESCHÜTZEN","BESCHWEREN","BESCHWINDELN","BESCHWÖREN","BESEBELN","BESEELEN","BESEITIGEN","BESETZEN","BESICHERN","BESICHTIGEN","BESIEGELN","BESIEGEN","BESINGEN","BESINNEN","BESITZEN","BESOHLEN","BESORGEN","BESPASSEN","BESPEIEN","BESPRECHEN","BESPRENGEN","BESSERN","BESTÄRKEN","BESTÄTIGEN","BESTAUNEN","BESTECHEN","BESTEHEN","BESTEHLEN","BESTEIGEN","BESTELLEN","BESTEUERN","BESTICKEN","BESTIMMEN","BESTRAFEN","BESTRAHLEN","BESTREBEN","BESTREIFEN","BESTREITEN","BESTREUEN","BESTUHLEN","BESUCHEN","BESUDELN","BETANKEN","BETÄTIGEN","BETÄUBEN","BETEILIGEN","BETEN","BETEUERN","BETONEN","BETONIEREN","BETÖREN","BETRACHTEN","BETRAGEN","BETRAUERN","BETREFFEN","BETREIBEN","BETRETEN","BETREUEN","BETRINKEN","BETRÜBEN","BETRÜGEN","BETTELN","BETTEN","BEUGEN","BEUNRUHIGEN","BEURTEILEN","BEVÖLKERN","BEVORMUNDEN",
  "BEVORSTEHEN","BEVORZUGEN","BEWACHEN","BEWAFFNEN","BEWAHREN","BEWAHRHEITEN","BEWÄSSERN","BEWEGEN","BEWEHREN","BEWEINEN","BEWEISEN","BEWERBEN","BEWERKSTELLIGEN","BEWERTEN","BEWILLIGEN","BEWIRKEN","BEWIRTEN","BEWOHNEN","BEWUNDERN","BEZAHLEN","BEZAUBERN","BEZEICHNEN","BEZEUGEN","BEZICHTIGEN","BEZIEHEN","BEZIFFERN","BEZIRZEN","BEZUSCHUSSEN","BEZWEIFELN","BEZWINGEN","BIEGEN","BIEREN","BIETEN","BIKEN","BILDEN","BILLIGEN","BIMMELN","BINDEN","BINDFÄDEN REGNEN","BIOPSIEREN","BITTEN","BIWAKIEREN","BLAFFEN","BLÄHEN","BLAKEN","BLAMIEREN","BLANCHIEREN","BLASEN","BLÄTTERN","BLAUEN","BLAUMACHEN","BLECHEN","BLECKEN","BLEIBEN","BLEICHEN","BLENDEN","BLESSIEREN","BLICKEN","BLINKEN","BLINZELN","BLOCKIEREN","BLÖDELN","BLÖKEN","BLONDIEREN","BLUBBERN","BLUFFEN","BLÜHEN","BLUTEN",
  "BOHNERN","BOHREN","BÖLKEN","BÖLLERN","BOLLERN","BOMBARDIEREN","BONITIEREN","BOOMEN","BOOTEN","BORGEN","BOTANISIEREN","BOWLEN","BOXEN","BOYKOTTIEREN","BRABBELN","BRAMARBASIEREN","BRANDEN","BRANDMARKEN","BRATEN","BRATSCHEN","BRAUCHEN","BRAUEN","BRÄUNEN","BRAUSEN","BRECHEN","BREMSEN","BRENNEN","BRETTERN","BRILLIEREN","BRINGEN","BRÖCKELN","BROCKEN","BRODELN","BROMIEREN","BRÖSELN","BROWSEN","BRUCHLANDEN","BRUCHRECHNEN","BRÜHEN","BRÜLLEN","BRUMMEN","BRÜSKIEREN","BRÜTEN","BUCHSTABIEREN","BÜCKEN","BUDDELN","BUDGETIEREN","BÜFFELN","BUFFIEREN","BÜGELN","BUGSIEREN","BUHEN","BUHLEN","BUMMELN","BUMSEN","BÜNDELN","BÜRGEN","BÜRSTEN","BÜSSEN","BUTTERN","BÜTZEN","CAMOUFLIEREN","CAMPEN","CANCELN","CASTEN","CHAMBRIEREN","CHANGIEREN","CHARAKTERISIEREN","CHARGIEREN","CHARTERN","CHATTEN","CHAUFFIEREN","CHECKEN","CHIFFRIEREN","CHILLEN","CHIPPEN","CHLOROFORMIEREN","CHRISTIANISIEREN","COLLAGIEREN","COLORIEREN","CONCHIEREN","CONTAINERISIEREN","COVERN","CUTTEN","DABEI SEIN","DADDELN","DAHERREDEN","DAHINSIECHEN","DÄMMEN","DÄMMERN","DÄMONISIEREN","DAMPFEN","DÄMPFEN","DANK SAGEN","DANKEN","DANKSAGEN","DARBEN","DARBIETEN","DARLEGEN","DARNIEDERLIEGEN","DARREN","DARSTELLEN","DARTUN","DARÜBERLIEGEN","DAS BLAUE VOM HIMMEL VERSPRECHEN","DASTEHEN","DATIEREN","DAUERN","DAUMEN DRÜCKEN","DAVONEILEN","DAVONKOMMEN","DAZUSAGEN","DAZUSCHAUEN","DAZUTUN","DEAKTIVIEREN","DEALEN","DEBATTIEREN","DEBÜTIEREN","DECHIFFRIEREN","DECKELN","DECKEN","DEDIZIEREN","DEDUZIEREN","DEESKALIEREN","DEFÄKIEREN","DEFÄZIEREN","DEFENESTRIEREN","DEFILIEREN","DEFINIEREN","DEFLORIEREN","DEFORMIEREN","DEFRAGMENTIEREN","DEGLACIEREN","DEGOUTIEREN","DEGRADIEREN","DEGUSTIEREN","DEHNEN","DEHYDRATISIEREN","DEHYDRIEREN","DEINSTALLIEREN","DEKANTIEREN","DEKLAMIEREN","DEKLARIEREN","DEKLASSIEREN","DEKLINIEREN","DEKOMPILIEREN","DEKOMPONIEREN","DEKORIEREN","DEKREMENTIEREN","DEKUVRIEREN","DELEGIEREN","DELIRIEREN","DEMARKIEREN","DEMASKIEREN","DEMATERIALISIEREN","DEMENTIEREN","DEMOBILISIEREN","DEMOKRATISIEREN","DEMOLIEREN","DEMONSTRIEREN","DEMONTIEREN","DEMORALISIEREN","DEMOTIVIEREN","DEMÜTIGEN","DENATURIEREN","DENGELN","DENKEN","DENTELIEREN","DENUNZIEREN","DEPONIEREN","DEPORTIEREN","DEPRAVIEREN","DEPRIMIEREN","DEPUTIEREN","DERBLECKEN","DEREGULIEREN","DERIVIEREN","DEROGIEREN","DESAVOUIEREN","DESENSIBILISIEREN","DESERTIEREN","DESIGNEN","DESIGNIEREN","DESILLUSIONIEREN","DESINFIZIEREN","DESISTIEREN","DESOXIDIEREN",
  "DESTABILISIEREN","DESTILLIEREN","DESTRUIEREN","DETACHIEREN","DETEKTIEREN","DETERMINIEREN","DETONIEREN","DEUTEN","DEVOLVIEREN","DEZIDIEREN","DEZIMIEREN","DIAGNOSTIZIEREN","DIBBERN","DICHTEN","DIENEN","DIFFAMIEREN","DIFFERENZIEREN","DIFFERIEREN","DIFFUNDIEREN","DIGERIEREN","DIGITALISIEREN","DIKTIEREN","DILATIEREN","DILETTIEREN","DILUIEREN","DIMENSIONIEREN","DIMERISIEREN","DIMMEN","DINGEN","DINIEREN","DIPPEN","DIRIGIEREN","DIRIMIEREN","DISAMBIGUIEREN","DISKREDITIEREN","DISKRIMINIEREN","DISKUTIEREN",
  "DISLOZIEREN","DISPENSIEREN","DISPERGIEREN","DISPONIEREN","DISPUTIEREN","DISSEN","DISSENTIEREN","DISSOZIIEREN","DISTANZIEREN","DISZIPLINIEREN","DIVERGIEREN","DIVERSIFIZIEREN","DIVIDIEREN","DOKTERN","DOKUMENTIEREN","DOLMETSCHEN","DOMESTIZIEREN","DOMINIEREN","DONNERN","DOPEN","DOPPELN","DÖRREN","DÖSEN","DOSIEREN","DOTIEREN","DOUBELN","DOWNLOADEN","DRAGIEREN","DRAHTEN","DRAMATISIEREN","DRÄNGEN","DRANGSALIEREN","DRANKRIEGEN","DRAPIEREN","DRAUFDRÜCKEN","DRAUFGEHEN","DRAUFZAHLEN","DREHEN","DRESCHEN","DRESSIEREN","DRIBBELN","DRIFTEN","DRILLEN","DRINGEN","DROHEN","DRÖHNEN","DROSSELN","DRUCKEN","DRÜCKEN","DUBLIEREN","DUCKEN","DUCKMÄUSERN","DUELLIEREN","DUFTEN","DULDEN","DÜMPELN","DÜNGEN","DUNKELN","DÜNKEN","DÜNSTEN","DÜPIEREN","DUPLIZIEREN","DURCH DEN KAKAO ZIEHEN","DURCHACKERN","DURCHATMEN","DURCHBEISSEN","DURCHBLUTEN","DURCHBRECHEN","DURCHDENKEN","DURCHDREHEN","DURCHDRINGEN","DURCHFAHREN","DURCHFÄRBEN","DURCHFLIESSEN","DURCHFÜHREN","DURCHGEHEN","DURCHHALTEN","DURCHHÄNGEN","DURCHHEIZEN","DURCHIXEN","DURCHKÄMMEN","DURCHKOMMEN","DURCHLASSEN","DURCHLAUFEN","DURCHLÜFTEN","DURCHMACHEN","DURCHMÜSSEN","DURCHPRÜGELN","DURCHQUEREN","DURCHRÜTTELN","DURCHSÄGEN","DURCHSCHAUEN","DURCHSCHIMMERN","DURCHSCHNEIDEN","DURCHSCHREITEN","DURCHSETZEN","DURCHSICKERN","DURCHSTARTEN","DURCHSTREICHEN","DURCHSTRÖMEN","SUCHEN","DURCHTRENNEN","DURCHWACHEN","DURCHWANDERN","DURCHWÜHLEN","DURCHZÄHLEN","DURCHZIEHEN","DURCHZUCKEN","DURCHZWÄNGEN","DÜRFEN","DUSCHEN","DÜSEN","DUZEN","E-MAILEN",
  "EBBEN","EBNEN","ECHAUFFIEREN","EDIEREN","EDITIEREN","EFFEKTUIEREN","EGALISIEREN","EGGEN","EHELICHEN","EHREN","EICHEN","EIERN","EIFERN","EIGNEN","EILEN","EINARBEITEN","EINÄSCHERN","EINBALSAMIEREN","EINBAUEN","EINBETONIEREN","EINBETTEN","EINBEZIEHEN","EINBILDEN","EINBINDEN","EINBLASEN","EINBLÄUEN","EINBRECHEN","EINBRINGEN","EINBROCKEN","EINBÜRGERN","EINBÜSSEN","EINCHECKEN","EINDAMPFEN","EINDECKEN","EINDENKEN","EINDEUTSCHEN","EINDRINGEN","EINEN","EINENGEN","EINFAHREN","EINFALLEN","EINFANGEN","EINFÄRBEN","EINFETTEN","EINFINDEN","EINFLÖSSEN","EINFLÜSTERN","EINFRIEDEN","EINFRIEREN","EINFÜGEN","EINFÜHREN","EINFÜLLEN","EINGEBEN","EINGEHEN","EINGESTEHEN","EINGIESSEN","EINGREIFEN","EINGRENZEN","EINHALTEN","EINHANDELN","EINHAUCHEN","EINHEFTEN","EINHEIMSEN","EINHERGEHEN",
  "EINHOLEN","EINIGEN","EINIGGEHEN","EINIMPFEN","EINKAPSELN","EINKAUFEN","EINKERKERN","EINKLEIDEN","EINKLEMMEN","EINKOCHEN","EINKOPPELN","EINKREISEN","EINLADEN","EINLAGERN","EINLASSEN","EINLAUFEN","EINLEBEN","EINLEGEN","EINLEITEN","EINLENKEN","EINLOGGEN","EINLÖSEN","EINMACHEN","EINMAHNEN","EINMARSCHIEREN","EINMISCHEN","EINMOTTEN","EINNÄSSEN","EINNEHMEN","EINNICKEN","EINNORDEN","EINÖLEN","EINORDNEN","EINPACKEN","EINPFLEGEN","EINPRÄGEN","EINPREISEN","EINPROGRAMMIEREN","EINPRÜGELN","EINRÄUMEN","EINREDEN","EINREICHEN","EINREISEN","EINRICHTEN","EINRÜCKEN","EINSAGEN","EINSALBEN","EINSARGEN","EINSAUEN","EINSCANNEN","EINSCHALTEN","EINSCHÄTZEN","EINSCHENKEN","EINSCHIEBEN","EINSCHIFFEN","EINSCHLAFEN","EINSCHLAGEN","EINSCHLEPPEN","EINSCHLEUSEN","EINSCHLIESSEN","EINSCHMEICHELN","EINSCHNEIDEN","EINSCHNEIEN","EINSCHRÄNKEN","EINSCHREIBEN","EINSCHREITEN","EINSCHÜCHTERN","EINSCHULEN","EINSEHEN","EINSEIFEN","EINSETZEN","EINSPAREN","EINSPEISEN","EINSPERREN","EINSPIELEN","EINSPINNEN","EINSPRITZEN","EINSTALLEN","EINSTEHEN","EINSTEIGEN","EINSTELLEN","EINSTIMMEN",
  "EINSTREUEN","EINSTÜRZEN","EINTAUCHEN","EINTEILEN","EINTIPPEN","EINTRAGEN","EINTREFFEN","EINTRETEN","EINTRICHTERN","EINTRUDELN","EINTUNKEN","EINVERLEIBEN","EINWANDERN","EINWECHSELN","EINWECKEN","EINWEICHEN","EINWEIHEN","EINWENDEN","EINWERBEN","EINWERFEN","EINWICKELN","EINWILLIGEN","EINWIRKEN","EINZAHLEN","EINZÄUNEN","EINZEICHNEN","EINZIEHEN","EISEN","EISLAUFEN","EITERN","EJAKULIEREN","EKELN","ELASTIFIZIEREN","ELEKTRIFIZIEREN","ELEKTRISIEREN","ELIDIEREN","ELIMINIEREN","ELIZITIEREN","ELOXIEREN","EMAILEN","EMAILLIEREN","EMENDIEREN","EMIGRIEREN","EMITTIEREN","EMPFANGEN","EMPFEHLEN","EMPFINDEN","EMPÖREN","EMPORWACHSEN","EMULIEREN","ENCOURAGIEREN","ENDEN","ENDLAGERN","ENERVIEREN","ENGAGIEREN","ENNUYIEREN","ENTBEHREN","ENTBINDEN","ENTBLÖSSEN","ENTDECKEN","ENTEHREN","ENTEIGNEN","ENTEILEN","ENTEISEN","ENTERBEN","ENTERN","ENTFACHEN","ENTFALLEN","ENTFALTEN","ENTFÄRBEN","ENTFERNEN","ENTFESSELN","ENTFLAMMEN","ENTFLECHTEN","ENTFLIEHEN","ENTFOLGEN","ENTFREMDEN","ENTFROSTEN","ENTFÜHREN","ENTGEGENHANDELN","ENTGEGENKOMMEN","ENTGEGENSCHLAGEN","ENTGEGENSCHREIEN","ENTGEGENWIRKEN","ENTGEHEN","ENTGIFTEN","ENTGLEISEN","ENTGRÄTEN","ENTHAAREN","ENTHALTEN","ENTHÄRTEN","ENTHAUPTEN","ENTHÄUTEN","ENTHEBEN","ENTHEILIGEN","ENTHORNEN","ENTHÜLLEN","ENTIONISIEREN","ENTJUNGFERN","ENTKEIMEN","ENTKLEIDEN","ENTKOKAINISIEREN","ENTKOMMEN","ENTKORKEN","ENTKÖRPERLICHEN",
  "ENTKRIMINALISIEREN","ENTLANGFAHREN","ENTLARVEN","ENTLASSEN","ENTLASTEN","ENTLAUBEN","ENTLAUSEN","ENTLEEREN","ENTLEHNEN","ENTLEIHEN","ENTLOHNEN","ENTLÜFTEN","ENTMANNEN","ENTMILITARISIEREN","ENTMINEN","ENTMINERALISIEREN","ENTMISCHEN","ENTMÜNDIGEN","ENTMUTIGEN","ENTNEHMEN","ENTPACKEN","ENTPOLITISIEREN","ENTRAHMEN","ENTRÄTSELN","ENTREISSEN","ENTRICHTEN","ENTRIEGELN","ENTRINDEN","ENTRINNEN","ENTRÜMPELN","ENTSAGEN","ENTSCHÄDIGEN","ENTSCHÄRFEN","ENTSCHEIDEN","ENTSCHLAFEN","ENTSCHLAGEN","ENTSCHLEIERN","ENTSCHLEUNIGEN","ENTSCHLIESSEN","ENTSCHLÜSSELN","ENTSCHULDIGEN","ENTSCHWINDEN","ENTSENDEN","ENTSETZEN","ENTSEUCHEN","ENTSICHERN","ENTSINNEN","ENTSORGEN","ENTSPANNEN","ENTSPRECHEN","ENTSTAMMEN","ENTSTAUBEN","ENTSTEHEN","ENTSTELLEN","ENTTARNEN","ENTTÄUSCHEN","ENTTEEREN","ENTTHRONEN","ENTVÖLKERN","ENTWAFFNEN","ENTWALDEN","ENTWARNEN","ENTWÄSSERN","ENTWEICHEN","ENTWEIHEN","ENTWENDEN","ENTWERFEN","ENTWICKELN","ENTWINDEN","ENTWIRREN","ENTWISCHEN","ENTWÖHNEN","ENTWURZELN",
  "ENTZIEHEN","ENTZIFFERN","ENTZÜNDEN","ENTZWEIEN","EPILIEREN","ERACHTEN","ERARBEITEN","ERBARMEN","ERBAUEN","ERBEN","ERBIETEN","ERBITTEN","ERBITTERN","ERBLASSEN","ERBLEICHEN","ERBRECHEN","ERBRINGEN","ERBRÜTEN","ERDEN","ERDENKEN","ERDICHTEN","ERDOLCHEN","ERDROSSELN","ERDRÜCKEN","EREIGNEN","ERFASSEN","ERFINDEN","ERFOLGEN","ERFORDERN","ERFORSCHEN","ERFRAGEN","ERFREUEN","ERFRISCHEN","ERFÜLLEN","ERGÄNZEN","ERGATTERN","ERGAUNERN","ERGIESSEN","ERGÖTZEN","ERGRAUEN","ERGREIFEN","ERGRÜNDEN","ERHANDELN","ERHÄNGEN","ERHÄRTEN","ERHEBEN","ERHELLEN","ERHITZEN","ERHOFFEN","ERHÖHEN","ERHOLEN","ERHÖREN","ERIGIEREN","ERINNERN","ERKÄLTEN","ERKALTEN","ERKAUFEN","ERKENNEN","ERKIESEN","ERKLÄREN","ERKLIMMEN","ERKLINGEN","ERKRANKEN","ERKUNDEN","ERKUNDIGEN","ERKÜREN","ERLABEN","ERLANGEN",
  "ERLASSEN","ERLAUBEN","ERLÄUTERN","ERLEBEN","ERLEDIGEN","ERLEICHTERN","ERLEIDEN","ERLESEN","ERLEUCHTEN","ERLIEGEN","ERLÖSCHEN","ERLÖSEN","ERMÄCHTIGEN","ERMAHNEN","ERMITTELN","ERMÖGLICHEN","ERMORDEN","ERMÜDEN","ERMUNTERN","ERMUTIGEN","ERNÄHREN","ERNENNEN","ERNEUERN","ERNIEDRIGEN","ERNTEN","ERNÜCHTERN","EROBERN","ERODIEREN","ERÖFFNEN","ERÖRTERN","ERPRESSEN","ERPROBEN","ERQUICKEN","ERRATEN","ERRECHNEN","ERREGEN","ERREICHEN","ERRICHTEN","ERRÖTEN","ERSAUFEN","ERSÄUFEN","ERSCHAFFEN","ERSCHALLEN","ERSCHEINEN","ERSCHIESSEN","ERSCHLAGEN","ERSCHLEICHEN","ERSCHLIESSEN","ERSCHÖPFEN","ERSCHRECKEN","ERSCHÜTTERN","ERSCHWEREN","ERSETZEN","ERSINNEN","ERSITZEN","ERSORGEN","ERSPAREN","ERSPIELEN","ERSTARREN","ERSTATTEN","ERSTAUNEN","ERSTECHEN","ERSTEHEN","ERSTEIGEN","ERSTEIGERN","ERSTELLEN","ERSTICKEN","ERSTREBEN","ERSTRECKEN","ERSTÜRMEN","ERSUCHEN","ERTAPPEN","ERTEILEN","ERTÖNEN","ERTÖTEN","ERTRAGEN","ERTRÄNKEN","ERTRINKEN","ERÜBRIGEN","ERUIEREN","ERWACHEN","ERWACHSEN","ERWÄGEN","ERWÄHNEN","ERWÄRMEN","ERWARTEN","ERWECKEN","ERWEISEN","ERWEITERN","ERWERBEN","ERWIDERN","ERWIRTSCHAFTEN","ERWISCHEN","ERWÜRGEN","ERZÄHLEN","ERZEUGEN","ERZIEHEN","ERZIELEN","ERZÜRNEN",
  "ERZWINGEN","ESKALIEREN","ESKOMPTIEREN","ESKORTIEREN","ESSEN","ETABLIEREN","ETIKETTIEREN","ETIOLIEREN","EUROPÄISIEREN","EVAKUIEREN","EVALUIEREN","EVANGELISIEREN","EVOLVIEREN","EVOZIEREN","EXEKUTIEREN","EXEMPLIFIZIEREN","EXEN","EXERZIEREN","EXHALIEREN","EXHUMIEREN","EXISTIEREN","EXKLUDIEREN","EXKOMMUNIZIEREN","EXKULPIEREN","EXMATRIKULIEREN","EXORZIEREN","EXORZISIEREN","EXPANDIEREN","EXPERIMENTIEREN","EXPLANTIEREN","EXPLIZIEREN","EXPLODIEREN","EXPLOITIEREN","EXPONIEREN","EXPORTIEREN","EXSTIRPIEREN","EXTEMPORIEREN","EXTERMINIEREN","EXTERNALISIEREN","EXTRAHIEREN","EXTRUDIEREN","EXTUBIEREN","EXZERPIEREN","FABRIZIEREN","FABULIEREN","FACHEN","FAHNDEN","FAHREN","FAKTURIEREN","FALLEN","FÄLLEN","FALLIEREN","FÄLSCHEN","FALSIFIZIEREN","FALTEN","FALZEN","FANATISIEREN","FANGEN","FANTASIEREN","FÄRBEN","FARCIEREN","FASCHIEREN","FASELN","FASSEN","FASTEN","FASZINIEREN","FAUCHEN","FAULENZEN","FAUSTFICKEN","FAVORISIEREN","FAXEN","FECHTEN","FEGEN","FEHLBESETZEN","FEHLEN","FEHLSCHLAGEN","FEIEN","FEIERN","FEILBIETEN","FEILEN","FEILHALTEN","FEILSCHEN","FEIXEN",
  "FELLIEREN","FERKELN","FERNGUCKEN","FERNHALTEN","FERNSEHEN","FERTIGEN","FERTIGMACHEN","FERTIGSTELLEN","FESSELN","FESTEN","FESTFRAGEN","FESTHALTEN","FESTIGEN","FESTLEGEN","FESTNAGELN","FESTNEHMEN","FESTSCHNALLEN","FESTSCHRAUBEN","FESTSCHREIBEN","FESTSETZEN","FESTSTELLEN","FETTEN","FETZEN","FEUCHTEN","FEUERN","FEUERVERZINKEN","FICKEN","FIEBERN","FIEPEN","FIEREN","FILETIEREN","FILIBUSTERN","FILMEN","FILTERN","FILTRIEREN","FILZEN","FINANZIEREN","FINASSIEREN","FINDEN","FINGERN","FINGIEREN","FINISHEN","FIRMEN","FIRMIEREN","FIRNEN","FIRNISSEN","FISCHEN","FIXEN","FIXIEREN","FLACHSEN","FLACKERN","FLADERN","FLANIEREN","FLANKIEREN","FLASHEN","FLATTERN","FLATULIEREN","FLÄZEN","FLECHTEN","FLEDDERN","FLEHEN","FLEHMEN","FLEKTIEREN","FLENNEN","FLENSEN","FLETSCHEN","FLEUCHEN","FLICKEN","FLIEGEN","FLIEHEN","FLIESEN","FLIESSEN","FLIMMERN","FLIRREN","FLIRTEN","FLITTERN","FLITZEN","FLÖHEN","FLORIEREN","FLÖTEN GEHEN","FLÖTEN","FLOTTIEREN","FLUCHEN","FLUCHTEN","FLÜCHTEN","FLUKTUIEREN","FLUNKERN","FLUORESZIEREN","FLUORIEREN","FLUPPEN","FLÜSTERN","FLUTEN","FLUTSCHEN","FÖHNEN","FOKUSSIEREN","FOLGEN","FOLGERN","FOLTERN","FOPPEN","FORCIEREN","FÖRDERN","FORDERN","FORMATIEREN","FORMEN","FORMIEREN","FORMULIEREN","FORSCHEN","FORTBEWEGEN","FORTBLEIBEN","FORTEILEN",
  "FORTFAHREN","FORTFALLEN","FORTGEHEN","FORTKOMMEN","FORTLAUFEN","FORTLEGEN","FORTPFLANZEN","FORTSCHICKEN","FORTSCHREIBEN","FORTSCHREITEN","FORTSETZEN","FORTSTOSSEN","FORTWISCHEN","FOTOGRAFIEREN","FOTOKOPIEREN","FOTZEN","FOULEN","FRACKEN","FRAGEN","FRAGMENTIEREN","FRANZÖSIEREN","FRANZÖSISIEREN","FRAPPIEREN","FRÄSEN","FRATERNISIEREN","FREI LASSEN","FREIEN","FREIGEBEN","FREILASSEN","FREIMACHEN","FREISETZEN","FREISPRECHEN","FREISTELLEN","FREMDGEHEN","FREQUENTIEREN","FRESSEN","FREUEN","FRIEMELN","FRIEREN","FRIKASSIEREN","FRISCHEN","FRISIEREN","FRITTIEREN","FROHLOCKEN","FRÖNEN","FROSTEN","FROTTIEREN","FROTZELN","FRÜHSTÜCKEN","FRUSTRIEREN","FUCHTELN","FÜGEN","FÜHLEN","FÜHREN","FÜLLEN","FUMMELN","FUNDIEREN","FUNGIEREN","FUNKELN","FUNKTIONALISIEREN","FUNKTIONIEREN","FUNZEN","FÜRCHTEN","FURZEN","FÜSILIEREN","FUSIONIEREN","FUSSELN","FUSSEN","FUTTERN","FÜTTERN","GABELN","GACKERN","GAFFEN","GÄHNEN","GALOPPIEREN","GALVANISIEREN","GAMMELN","GÄNGELN","GARANTIEREN","GAREN","GÄREN","GARNIEREN","GÄRTNERN","GASTIEREN","GAUMEN","GAUTSCHEN","GEBÄRDEN","GEBÄREN","GEBEN","GEBIETEN","GEBRAUCHEN","GEDEIHEN","GEDENKEN","GEFÄHRDEN","GEFALLEN","GEFANGEN NEHMEN",
  "GEFRIEREN","GEGENBESCHULDIGEN","GEGENLESEN","GEGENÜBERSTEHEN","GEGENÜBERSTELLEN","GEGENZEICHNEN","GEHEN","GEHORCHEN","GEHÖREN","GEHREN","GEIFERN","GEISSELN","GEIZEN","GELANGEN","GELEITEN","GELIEREN","GELINGEN","GELOBEN","GELTEN","GENDERN","GENEHMIGEN","GENERALISIEREN","GENERALÜBERHOLEN","GENERIEREN","GENESEN","GENIEREN","GENIESSEN","GENÜGEN","GENUGTUN","GERATEN","GERBEN","GEREICHEN","GERIEREN","GERINNEN","GERN HABEN","GERNHABEN","GERUHEN","GESCHEHEN","GESTALTEN","GESTATTEN","GESTEHEN","GESTIKULIEREN","GESUNDSCHRUMPFEN","GETRAUEN","GEWÄHREN","GEWÄHRLEISTEN","GEWINNEN","GEWÖHNEN","GIBBELN","GIEREN","GIESSEN","GIFTEN","GILDEN","GIPFELN","GIPSEN","GIRIEREN","GIRREN","GLÄNZEN","GLASIEREN","GLÄTTEN","GLATTSTELLEN","GLAUBEN","GLEICHTUN","GLEISSEN","GLEITEN","GLIEDERN","GLIMMEN","GLITSCHEN","GLITZERN","GLOBALISIEREN","GLORIFIZIEREN","GLOSEN","GLOSSIEREN","GLOTTALISIEREN","GLOTZEN","GLÜCKEN","GLUCKSEN","GLÜHEN","GLUPSCHEN","GOLFEN","GÖNNEN","GOOGELN","GOUTIEREN","GRABBELN","GRABEN","GRABSCHEN","GRADUIEREN","GRÄMEN","GRAPHITIEREN","GRAPSCHEN","GRASEN","GRASSIEREN","GRÄTSCHEN","GRATULIEREN","GRAUEN","GRAVITIEREN","GREIFEN","GREINEN","GRENZEN","GRIENEN",
  "GRILLEN","GRIMASSIEREN","GRINSEN","GRÖLEN","GROLLEN","GROSSSCHREIBEN","GROSSTUN","GRUBBERN","GRÜBELN","GRUMMELN","GRÜNDEN","GRUNDIEREN","GRÜNEN","GRUNZEN","GRUPPIEREN","GRÜSSEN","GUCKEN","GUILLOTINIEREN","GUMMIEREN","GURGELN","GURREN","GÜRTEN","GUSTIEREN","GUTACHTEN","GUTTUN","HAAREN","HABEN","HABILITIEREN","HACKEN","HÄCKSELN","HADERN","HAFTEN","HAGELN","HÄKELN","HAKEN","HALBIEREN","HALLEN","HALOGENIEREN","HALSEN","HALTEN","HÄMMERN","HAMPELN","HAMSTERN","HANDHABEN","HÄNGEN","HÄNSELN","HANTIEREN","HARMONIEREN","HARMONISIEREN","HARNEN","HARREN","HÄRTEN","HASARDIEREN","HASCHIEREN","HASPELN","HASSEN","HASTEN","HÄTSCHELN","HAUCHEN","HAUEN","HÄUFEN","HAUSEN","HAUSHALTEN","HAUSIEREN","HÄUTEN","HEADBANGEN","HEBELN","HEBEN","HECHELN","HECKEN","HEFTEN","HEGEN","HEILEN","HEILIGSPRECHEN","HEIMFINDEN","HEIMFÜHREN","HEIMKEHREN","HEIMKOMMEN","HEIMLEUCHTEN","HEIMSUCHEN","HEIMZAHLEN","HEIRATEN","HEISCHEN","HEISS LAUFEN","HEISSEN","HEIZEN","HELFEN","HELLEN","HEMMEN","HEPARINISIEREN","HERABBLICKEN","HERABFALLEN","HERABFLIEGEN","HERABSETZEN","HERABSTUFEN",
  "HERABWÜRDIGEN","HERANFÜHREN","HERANKOMMEN","HERANNAHEN","HERANWACHSEN","HERAUFBEFÖRDERN","HERAUFGEHEN","HERAUFKLETTERN","HERAUFKOMMEN","HERAUFLASSEN","HERAUFSETZEN","HERAUFSPUCKEN","HERAUFSTARREN","HERAUSARBEITEN","HERAUSBEISSEN","HERAUSBRINGEN","HERAUSBRÜLLEN","HERAUSFINDEN","HERAUSFORDERN","HERAUSGEBEN","HERAUSKOMMEN","HERAUSKRISTALLISIEREN","HERAUSLÖSEN","HERAUSNEHMEN","HERAUSPRÜGELN","HERAUSPRUSTEN","HERAUSSCHMECKEN","HERAUSSCHMUGGELN","HERAUSSCHNEIDEN","HERAUSSCHREIEN","HERAUSSTELLEN","HERAUSWOLLEN","HERAUSZOOMEN","HERBEIEILEN","HERBEIFÜHREN","HERBEILASSEN","HERBEIRUFEN","HERBRINGEN","HEREINKOMMEN","HEREINLASSEN","HEREINRUFEN","HERGEHEN","HERHÖREN","HERKOMMEN","HERLAUFEN","HERLEITEN","HEROISIEREN","HERRICHTEN","HERRSCHEN","HERRÜHREN","HERSTELLEN","HERUMBUMMELN","HERUMDRUCKSEN","HERUMFUHRWERKEN","HERUMGAMMELN","HERUMHACKEN","HERUMHUREN","HERUMKRAMEN","HERUMLAUFEN","HERUMQUASSELN","HERUMSCHARWENZELN","HERUMSCHREIEN","HERUMSTEHEN","HERUMTREIBEN","HERUMWANDELN","HERUMWUSELN","HERUMZEIGEN","HERUNTERDÜRFEN","HERUNTERFAHREN","HERUNTERFALLEN","HERUNTERHANDELN","HERUNTERKOMMEN","HERUNTERLADEN","HERUNTERLASSEN","HERUNTERNEHMEN",
  "HERUNTERSPIELEN","HERUNTERSTUFEN","HERUNTERWIRTSCHAFTEN","HERVORBRINGEN","HERVORGEHEN","HERVORHEBEN","HERVORRUFEN","HERVORTUN","HETZEN","HEUCHELN","HEUERN","HEULEN","HEXEN","HICKSEN","HIEVEN","HINABBLICKEN","HINARBEITEN","HINAUFFINDEN","HINAUFKLETTERN","HINAUSDENKEN","HINAUSFLIEGEN","HINAUSFÜHREN","HINAUSGEHEN","HINAUSLEHNEN","HINAUSRAGEN","HINAUSSCHIEBEN","HINBEKOMMEN","HINDACKELN","HINDERN","HINDURCHGEHEN","HINEINBEISSEN","HINEINBLÄTTERN","HINEINBLICKEN","HINEINDENKEN","HINEINGEHEN","HINEINSPIELEN","HINEINTUN","HINEINZOOMEN","HINGEHEN","HINHALTEN","HINKEN","HINKNIEN","HINKRIEGEN","HINLEGEN","HINNEHMEN","HINREISSEN","HINRICHTEN","HINSETZEN","HINSTARREN","HINSTELLEN","HINSTRECKEN","HINTERFRAGEN","HINTERLASSEN","HINTERLEGEN","HINTERTREIBEN","HINTERZIEHEN","HINTRETEN","HINUNTERFINDEN","HINUNTERSPÜLEN","HINWEGSEHEN","HINWEGTÄUSCHEN","HINWEISEN","HINWOLLEN",
  "HINZIEHEN","HINZUBEKOMMEN","HINZUFÜGEN","HISSEN","HOBELN","HOCHFAHREN","HOCHFLIEGEN","HOCHHEBEN","HOCHHIEVEN","HOCHKOMMEN","HOCHKREMPELN","HOCHKRIEGEN","HOCHLADEN","HOCHNEHMEN","HOCHRECHNEN","HOCHSTEMMEN","HOCKEN","HOFFEN","HOFIEREN","HÖHNEN","HÖKERN","HOLEN","HOLPERN","HOMOGENISIEREN","HONEN","HONORIEREN","HOPPELN","HOPSEN","HORCHEN","HÖREN","HORTEN","HOSPITIEREN","HUDELN","HULDIGEN","HÜLLEN","HUMPELN","HUNGERN","HUPEN","HÜPFEN","HUSCHEN","HUSSEN","HUSTEN","HÜTEN","HUTSCHEN","HYBRIDISIEREN","HYDRIEREN","HYDROLYSIEREN","HYPEN","HYPERVENTILIEREN","HYPNOTISIEREN","IAHEN","IDEALISIEREN","IDENTIFIZIEREN","IGNORIEREN","ILLUMINIEREN","ILLUSTRIEREN","IMAGINIEREN","IMITIEREN","IMKERN","IMMATRIKULIEREN","IMMIGRIEREN","IMMORTALISIEREN","IMMUNISIEREN","IMPFEN","IMPLANTIEREN","IMPLEMENTIEREN","IMPLIZIEREN","IMPLODIEREN","IMPONIEREN","IMPORTIEREN","IMPRÄGNIEREN","IMPROVISIEREN","IN ABREDE STELLEN","IN FRAGE STELLEN","IN STAND SETZEN","IN UNGNADE FALLEN","IN ZWEIFEL ZIEHEN","INAKTIVIEREN","INDEXIEREN","INDIVIDUALISIEREN","INDIZIEREN","INDOKTRINIEREN","INDOSSIEREN","INDUSTRIALISIEREN","INDUZIEREN","INFILTRIEREN","INFIZIEREN","INFLUENZIEREN","INFORMIEREN","INFRAGE STELLEN","INFUNDIEREN","INHAFTIEREN","INHALIEREN","INHIBIEREN","INITIALISIEREN","INITIIEREN","INJIZIEREN","INKLUDIEREN","INKOMMODIEREN","INKREMENTIEREN","INKRIMINIEREN","INKUBIEREN",
  "INLINESKATEN","INNEHALTEN","INNERVIEREN","INQUIRIEREN","INS DETAIL GEHEN","INS EINZELNE GEHEN","INS GEWICHT FALLEN","INSERIEREN","INSINUIEREN","INSISTIEREN","INSKRIBIEREN","INSPIRIEREN","INSPIZIEREN","INSTALLIEREN","INSTAND HALTEN","INSTAND SETZEN","INSTANZIIEREN","INSTITUIEREN","INSTRUIEREN","INSTRUMENTALISIEREN","INSZENIEREN","INTEGRIEREN","INTENDIEREN","INTENSIVIEREN","INTERAGIEREN","INTERESSIEREN","INTERKULTURALISIEREN","INTERNALISIEREN","INTERNATIONALISIEREN","INTERNIEREN","INTERPELLIEREN","INTERPOLIEREN","INTERPRETIEREN","INTERPUNKTIEREN","INTERVENIEREN","INTERVIEWEN","INTHRONISIEREN","INTONIEREN","INTRIGIEREN","INTUBIEREN","INVADIEREN","INVENTARISIEREN","INVENTIEREN","INVERTIEREN","INVESTIEREN","INVESTIGIEREN","INVOLVIEREN",
  "INZIDIEREN","IONISIEREN","IRONISIEREN","IRREFÜHREN","IRREN","IRRIGIEREN","IRRITIEREN","ISOLIEREN","ISOMERISIEREN","ITERIEREN","JAGEN","JÄHREN","JAMMERN","JAPPEN","JAPSEN","JAROWISIEREN","JÄTEN","JAUCHZEN","JAULEN","JETTEN","JOBBEN","JODELN","JODIEREN","JOGGEN","JOHLEN","JONGLIEREN","JUBELN","JUBILIEREN","JUCKEN","JUSTIEREN","KABBELN","KABELN","KACHELN","KACKEN","KADUZIEREN","KALAUERN","KALBEN","KALFATERN","KALIBRIEREN","KALKULIEREN","KALTMACHEN","KÄMMEN","KÄMPFEN","KAMPIEREN","KANALISIEREN","KANDIDIEREN","KANDIEREN","KANTEN","KAPERN","KAPIEREN","KAPITALISIEREN","KAPITULIEREN","KAPPEN","KAPSELN","KAPUTTMACHEN","KAPUTTREPARIEREN","KARAMELLISIEREN","KARDEN","KARESSIEREN","KARIKIEREN","KARREN","KARTELN","KARTOGRAFIEREN","KARTOGRAPHIEREN","KASCHEN","KASCHIEREN","KASERNIEREN","KASKADIEREN","KASPERN","KASSIEREN","KASTEIEN","KASTRIEREN","KATALOGISIEREN","KATALYSIEREN","KATAPULTIEREN","KATEGORISIEREN","KATZBUCKELN","KAUDERWELSCHEN","KAUEN","KAUERN","KAUFEN","KEGELN","KEHREN","KEHRTMACHEN","KEIFEN","KEIMEN","KELLNERN","KENNEN LERNEN","KENNEN","KENNENLERNEN","KENNZEICHNEN","KENTERN","KEPPELN","KERBEN","KEUCHEN","KEULEN","KICHERN","KICKBOXEN","KICKEN","KIDNAPPEN","KIEBITZEN","KIEKEN","KIELHOLEN","KIESEN","KIFFEN","KILLEN","KIPPEN","KIRREN","KITEN","KITTEN","KITZELN","KLACKERN","KLAFFEN","KLÄFFEN","KLAGEN","KLAMMERN","KLAMÜSERN","KLAPPEN","KLAPPERN","KLÄREN",
  "KLARIEREN","KLARKOMMEN","KLARMACHEN","KLARSTELLEN","KLARTRÄUMEN","KLASSIEREN","KLASSIFIZIEREN","KLATSCHEN","KLAUBEN","KLAUEN","KLEBEN","KLECKERN","KLEIDEN","KLEINKRIEGEN","KLEINREDEN","KLEMMEN","KLETTERN","KLICKEN","KLIEBEN","KLIEREN","KLIMMEN","KLIMPERN","KLINGELN","KLINGEN","KLIRREN","KLITTERN","KLONEN","KLÖNEN","KLOPFEN","KLOPPEN","KLÖTERN","KLOTZEN","KLUGREDEN","KLUMPEN","KNABBERN","KNACKEN","KNALLEN","KNAPSEN","KNATTERN","KNAUSERN","KNAUTSCHEN","KNEBELN","KNECHTEN","KNEIFEN","KNETEN","KNIBBELN","KNIEN","KNIETSCHEN","KNIPSEN","KNIRSCHEN","KNISTERN","KNITTERN","KNÖPFEN","KNOTEN","KNUDDELN","KNUFFEN","KNÜLLEN","KNÜPFEN","KNÜPPELN","KNURREN","KNUSPERN","KNUTSCHEN","KOAGULIEREN","KOALIEREN","KÖCHELN","KOCHEN","KÖDERN","KODIEREN","KODIFIZIEREN","KOEXISTIEREN","KOITIEREN","KOKETTIEREN","KOKSEN","KOLLABIEREN","KOLLABORIEREN","KOLLATIONIEREN","KOLLERN","KOLLIDIEREN","KOLONISIEREN","KOLORIEREN","KOLPORTIEREN","KOMBINIEREN","KOMMANDIEREN","KOMMEN","KOMMENTIEREN","KOMMERZIALISIEREN","KOMMISSIONIEREN","KOMMUNIZIEREN","KOMPENSIEREN","KOMPILIEREN","KOMPLEXIEREN","KOMPLIMENTIEREN","KOMPLIZIEREN","KOMPONIEREN","KOMPOSTIEREN","KOMPRIMIEREN","KOMPROMITTIEREN","KONDENSIEREN","KONDOLIEREN","KONFABULIEREN","KONFEKTIONIEREN","KONFERIEREN","KONFIGURIEREN","KONFISZIEREN","KONFLIGIEREN","KONFRONTIEREN","KONFUNDIEREN","KONJUGIEREN","KONKATENIEREN","KONKRETISIEREN","KONKURRIEREN","KÖNNEN","KONNOTIEREN",
  "KONSEKRIEREN","KONSERVIEREN","KONSOLIDIEREN","KONSPIRIEREN","KONSTATIEREN","KONSTERNIEREN","KONSTITUIEREN","KONSTRUIEREN",
  "KONSULTIEREN","KONSUMIEREN","KONTAKTIEREN","KONTAMINIEREN","KONTERKARIEREN","KONTERN","KONTRAHIEREN","KONTRASTIEREN","KONTROLLIEREN","KONTURIEREN","KONVENIEREN","KONVERGIEREN","KONVERSIEREN","KONVERTIEREN","KONZEDIEREN","KONZENTRIEREN","KONZEPTUALISIEREN","KONZERTIEREN","KONZESSIONIEREN","KONZIPIEREN","KOOPERIEREN","KOOPTIEREN","KOORDINIEREN","KÖPFEN","KOPIEREN","KOPPELN","KOPRODUZIEREN","KOPULIEREN","KÖREN","KORRELIEREN","KORRESPONDIEREN","KORRIGIEREN","KORRODIEREN","KORRUMPIEREN","KOSEN","KOSTEN","KOTEN","KOTIEREN","KOTZEN","KRABBELN","KRACHEN","KRÄCHZEN","KRÄFTIGEN","KRÄHEN","KRAKEELEN","KRAKELN","KRALLEN","KRAMEN","KRANGELN","KRÄNKELN","KRÄNKEN","KRANKEN","KRANKMACHEN","KRANKMELDEN","KRANKSCHREIBEN","KRATZEN","KRAULEN","KRÄUSELN","KRAXELN","KREBSEN","KREDENZEN","KREDITIEREN","KREIEREN","KREISCHEN","KREISEN","KREISSEN","KREMIEREN","KREPIEREN","KREUZEN","KREUZIGEN","KRIBBELN","KRIECHEN","KRIEGEN","KRIMINALISIEREN","KRISTALLISIEREN","KRITISIEREN","KRITTELN","KRITZELN","KRÖNEN","KRÖSEN","KRÜMMEN","KRUMPELN","KUCKEN","KUGELN","KÜHLEN","KUJONIEREN","KULLERN","KULMINIEREN","KULTIVIEREN","KÜMMERN","KUMULIEREN","KÜNDIGEN","KUNDTUN","KUNGELN","KUPIEREN","KUPPELN","KURATIEREN","KURBELN","KÜREN","KURSIEREN","KÜRZEN","KURZFASSEN","KUSCHELN","KUSCHEN","KÜSSEN","LABEN","LABERN","LABIALISIEREN","LABORIEREN","LÄCHELN","LACHEN","LACKIEREN","LADEN","LÄDIEREN","LAGERN","LÄHMEN","LAHMLEGEN","LAICHEN","LAKTIEREN","LALLEN","LAMENTIEREN","LAMMEN","LANCIEREN","LANDEN","LANGEN","LANGWEILEN","LÄPPEN","LÄPPERN","LÄRMEN","LASSEN","LASTEN","LÄSTERN","LATINISIEREN","LATSCHEN","LAUERN","LAUFEN","LAUSCHEN","LAUSEN","LAUTEN","LÄUTEN","LÄUTERN","LAUTIEREN","LAVIEREN","LEAKEN","LEASEN","LEBEN","LECHZEN","LECKEN","LEDERN","LEEREN","LEERLAUFEN","LEGALISIEREN","LEGEN","LEGIEREN","LEHNEN","LEHREN","LEICHTERN","LEIDEN","LEIDTUN","LEIHEN","LEIMEN","LEISTEN","LEITEN","LEMMATISIEREN","LENKEN","LENZEN","LERNEN","LESEN","LETZEN","LEUCHTEN","LEUGNEN","LEVITIEREN","LEXIKALISIEREN","LICHTEN","LIEB BEHALTEN","LIEBÄUGELN","LIEBBEHALTEN","LIEBEN","LIEBHABEN","LIEBKOSEN","LIEFERN","LIEGEN","LIEGENLASSEN","LIFTEN","LIIEREN","LIKEN","LIMITIEREN","LINDERN","LINKEN","LIQUIDIEREN","LISPELN","LISTEN","LITHOGRAFIEREN","LITHOGRAPHIEREN","LIZENZIEREN","LOBEN","LOBHUDELN","LOBPREISEN","LOBSINGEN","LOCHEN","LOCKEN","LÖCKEN","LOCKERN","LODERN","LÖFFELN","LOGGEN","LOGIEREN","LOHEN","LOHNEN","LÖHNEN","LOKALISIEREN","LONGIEREN","LORGNETTIEREN","LÖSCHEN","LÖSEN","LOSEN","LOSGEBEN","LOSGEHEN","LOSKETTEN","LOSLASSEN","LOSLEGEN","LOSMARSCHIEREN","LOSPRÜGELN","LOSSCHREIEN","LÖTEN","LÜFTEN","LÜGEN","LUGEN","LULLEN","LUTSCHEN","LUXIEREN","LYNCHEN","MÄANDERN","MÄANDRIEREN","MACHEN","MACHINIEREN","MAGNETISIEREN","MÄHEN","MAHLEN","MAHNEN","MAILEN","MAJORISIEREN","MALEDEIEN","MALEN","MALOCHEN","MALTRÄTIEREN","MAMPFEN","MANAGEN","MANGELN","MANIFESTIEREN","MANIPULIEREN","MANÖVRIEREN","MARGINALISIEREN","MARINIEREN","MARKIEREN","MARMORIEREN","MARODIEREN","MARSCHIEREN","MARTERN","MASKIEREN","MASSAKRIEREN","MASSIEREN","MÄSSIGEN","MASSREGELN","MÄSTEN","MASTIZIEREN","MASTURBIEREN","MATERIALISIEREN","MATSCHEN","MAUERN","MAUNZEN","MAUSCHELN","MAUSEN","MAUSERN","MAXIMIEREN","MECKERN","MEDIATISIEREN","MEDIKAMENTIEREN","MEDITIEREN","MEHREN","MEIDEN","MEINEN","MEISSELN","MEISTERN",
  "MELDEN","MELIEREN","MELIORIEREN","MELKEN","MENSTRUIEREN","MERKEN","MERZERISIEREN","MESMERISIEREN","MESSEN","METABOLISIEREN",
  "MEUCHELN","MEUTERN","MIAUEN","MIEFEN","MIETEN","MIGRIEREN","MIKROMINIATURISIEREN","MIKTURIEREN","MILDERN","MIMEN","MINDERN","MINERALISIEREN","MINIMIEREN","MISCHEN","MISSACHTEN","MISSBILLIGEN","MISSBRAUCHEN","MISSEN","MISSGLÜCKEN","MISSHANDELN","MISSIONIEREN","MISSLINGEN","MISSTRAUEN","MISSVERSTEHEN","MITBEKOMMEN","MITBIETEN","MITBRINGEN","MITDENKEN","MITEMPFINDEN","MITERLEBEN","MITFAHREN","MITFIEBERN","MITFINANZIEREN","MITFÜHLEN","MITGEBEN","MITGEHEN LASSEN","MITGEHEN","MITHALTEN","MITHELFEN","MITHÖREN","MITKOMMEN","MITMACHEN","MITMISCHEN","MITNEHMEN","MITREDEN","MITSCHNEIDEN","MITSCHWINGEN","MITSEGELN","MITSPIELEN","MITTEILEN","MITWIRKEN","MITZÄHLEN","MIXEN","MOBBEN","MOBILISIEREN","MOBILMACHEN","MÖBLIEREN","MODELLIEREN","MODERIEREN","MODERN","MODERNISIEREN","MODIFIZIEREN","MODULIEREN","MOGELN","MÖGEN","MOKIEREN","MOLESTIEREN","MONETARISIEREN","MONIEREN","MONOGRAMMIEREN","MONOLOGISIEREN","MONTIEREN","MOPPEN","MÖPPERN","MOPSEN","MORDEN","MOTIVIEREN","MOTZEN","MUDDELN","MUFFELN","MÜFFELN","MUHEN","MULCHEN","MULTIPLIZIEREN","MUMIFIZIEREN","MÜMMELN","MÜNDEN","MUNIZIPALISIEREN","MURKSEN","MURMELN","MURREN","MUSIZIEREN","MÜSSEN","MUSTERN","MUTEN","MUTIEREN","MUTMASSEN","NACHÄFFEN","NACHAHMEN","NACHARBEITEN","NACHBAUEN","NACHBEREITEN","NACHBILDEN","NACHDENKEN","NACHDRUCKEN","NACHEIFERN","NACHEMPFINDEN","NACHFINANZIEREN","NACHFOLGEN","NACHFORSCHEN","NACHFÜHLEN","NACHGEBEN","NACHGEHEN","NACHGRÜBELN","NACHHAKEN","NACHHELFEN","NACHHOLEN","NACHKOMMEN","NACHLADEN","NACHLASSEN","NACHLEBEN","NACHMACHEN","NACHPRÜFEN","NACHRECHNEN","NACHSAGEN","NACHSALZEN","NACHSCHÄRFEN","NACHSCHAUEN","NACHSCHLAGEN","NACHSETZEN","NACHSPRECHEN","NACHSTELLEN","NÄCHTIGEN","NACHTWANDELN","NACHVOLLZIEHEN","NACHWEISEN","NACHWÜRZEN","NACKTBADEN","NAGELN","NAGEN","NAHEKOMMEN","NAHELEGEN","NAHEN","NÄHEN","NÄHERBRINGEN","NÄHERN","NÄHREN","NAPPIEREN","NARKOTISIEREN","NARREN","NASALIEREN","NASCHEN","NÄSELN","NÄSSEN","NASSMACHEN","NATIONALISIEREN","NATURALISIEREN","NAVIGIEREN","NAZIFIZIEREN","NEBELN","NECKEN","NEGIEREN","NEGOZIIEREN","NEHMEN","NEIDEN","NEIGEN","NENNEN","NERVEN","NESTELN","NEUERN","NEUSTARTEN","NEUTRALISIEREN","NICKEN","NIEDERKNIEN","NIEDERLEGEN","NIEDERMETZELN","NIEDERSCHLAGEN","NIEDERSCHREIEN","NIEDERSETZEN","NIEDERSTECHEN","NIEDERSTOSSEN","NIEDERTRETEN","NIESEN","NIETEN","NIPPEN","NITRIEREN","NIVELLIEREN","NÖLEN","NOMINALISIEREN","NOMINIEREN","NÖRGELN","NORMIEREN","NOTIEREN","NÖTIGEN","NOTLANDEN","NOVELLIEREN","NUANCIEREN","NUCKELN","NULLEN","NUMMERIEREN","NUSCHELN","NUTEN","NUTZEN","NÜTZEN","OBDUZIEREN","OBFUSKIEREN","OBJEKTIVIEREN","OBLIEGEN","OBLIGIEREN","OBSEN","OBSERVIEREN","OBSIEGEN","OBSIGNIEREN","OBSTRUIEREN","OCHSEN","OFFENBAREN","OFFENLEGEN","OFFERIEREN","ÖFFNEN","OHRFEIGEN","OKKUPIEREN","OKTROYIEREN","ÖLEN","ONANIEREN","ONDULIEREN","OPERATIONALISIEREN","OPERIEREN","OPFERN","OPPONIEREN","OPTIEREN","OPTIMIEREN","ORAKELN","ORCHESTRIEREN","ORDERN","ORDNEN","ORGANISIEREN","ORIENTIEREN","ORTEN","OSZILLIEREN","OUTEN","OUTRIEREN","OXIDIEREN","PAAREN","PACHTEN","PACKEN","PADDELN","PAFFEN","PAGINIEREN","PALAVERN","PANASCHIEREN","PANIEREN","PANSCHEN","PÄPPELN","PAPPEN","PARALLELISIEREN","PARALYSIEREN","PARAMETRISIEREN","PARAPHIEREN","PARAPHRASIEREN","PARFÜMIEREN","PARIEREN","PARKEN","PARKETTIEREN","PARKIEREN","PARLIEREN","PARSEN","PARTITIONIEREN","PARTIZIPIEREN","PARZELLIEREN","PASSEN","PASSIEREN","PASSIVIEREN","PASTEURISIEREN","PATCHEN","PATENTIEREN","PATROUILLIEREN","PATZEN","PAUKEN","PAUSCHALISIEREN","PAUSIEREN","PEDALIEREN","PEILEN","PEINIGEN","PEKZIEREN","PELLEN","PENDELN","PENETRIEREN","PENNEN","PENSIONIEREN","PERFEKTIONIEREN","PERFORIEREN","PEROXIDIEREN","PERPETUIEREN","PERSEVERIEREN","PERSIFLIEREN","PERSONIFIZIEREN","PERZIPIEREN","PESEN","PETRIFIZIEREN","PETZEN","PFÄHLEN","PFÄNDEN","PFEFFERN","PFEIFEN","PFLANZEN","PFLASTERN","PFLEGEN","PFLÜCKEN","PFLÜGEN","PFROPFEN","PFUSCHEN","PHARYNGALISIEREN","PHILOSOPHIEREN",
  "PHOTOKOPIEREN","PICHELN","PICKEN","PICKNICKEN","PIEPEN","PIEPSEN","PIERCEN","PIESACKEN","PIESELN","PIKEN","PIKIEREN","PIKSEN",
  "PILGERN","PILOTIEREN","PIMPERN","PINKELN","PINSELN","PIPETTIEREN","PIROUETTIEREN","PISSEN","PLÄDIEREN","PLAGEN","PLAGIIEREN","PLANEN","PLÄNKELN","PLANSCHEN","PLANTSCHEN","PLÄRREN","PLASTIFIZIEREN","PLATSCHEN","PLÄTSCHERN","PLATZEN","PLATZIEREN","PLAUDERN","PLEMPERN","PLENKEN","PLISSIEREN","PLOMBIEREN","PLUDERN","PLUMPSEN","PLÜNDERN","PÖBELN","POCHEN","POCHIEREN","PODCASTEN","POFEN","POGEN","PÖKELN","POKERN","POKULIEREN","POLARISIEREN","POLEMISIEREN","POLIEREN","POLITISIEREN","POLLEN","POLTERN","POLYMERISIEREN","PÖNALISIEREN","POPELN","POPPEN","PORTIEREN","PORTRÄTIEREN","POSAUNEN","POSIEREN","POSITIONIEREN","POSTEN","POSTIEREN","POSTULIEREN","POTENZIEREN","POUSSIEREN","PRÄFERIEREN","PRÄGEN","PRAHLEN","PRÄKLUDIEREN","PRAKTIZIEREN","PRALLEN","PRÄLUDIEREN","PRÄPARIEREN","PRÄSENTIEREN","PRÄTENDIEREN","PRÄZISIEREN","PREDIGEN","PREISEN","PREISGEBEN","PRELLEN","PRESCHEN","PRESSEN","PRESSIEREN","PRICKELN","PRIEMEN","PRIORISIEREN","PRIVATISIEREN","PRIVILEGIEREN","PROBEN","PROBIEREN","PROBLEMATISIEREN","PRODUZIEREN","PROFANIEREN","PROFILIEREN","PROFITIEREN","PROGNOSTIZIEREN","PROGRAMMIEREN","PROJEKTIEREN","PROJIZIEREN","PROKLAMIEREN","PROKRASTINIEREN","PROLONGIEREN","PROMOTIEREN","PROMOVIEREN","PRONIEREN","PRONONCIEREN","PROPAGIEREN","PROPHEZEIEN","PROSPERIEREN","PROSTEN","PROSTITUIEREN","PROTEGIEREN","PROTESTIEREN","PROTOKOLLIEREN","PROTRAHIEREN","PROTZEN","PROVOZIEREN","PROZESSIEREN","PRÜFEN","PRÜGELN","PRUSTEN","PSALMODIEREN","PUBERTIEREN","PUBLIZIEREN","PUDDELN","PUDERN","PUFFEN","PULLERN","PULSIEREN","PULVERISIEREN","PUMPEN","PUNKTEN","PUNKTIEREN","PUPSEN","PURGIEREN","PÜRIEREN","PURZELN","PUSCHEN","PUSHEN","PUSSELN","PUSTEN","PUTSCHEN","PUTZEN","QUACKSALBERN","QUADRIEREN","QUAKEN","QUÄKEN","QUÄLEN","QUALIFIZIEREN","QUALMEN","QUANTIFIZIEREN","QUANTISIEREN","QUASSELN","QUATSCHEN","QUELLEN","QUENGELN","QUEREN","QUETSCHEN","QUIEKEN","QUIEKSEN","QUIETSCHEN","QUITTIEREN","QUIZZEN","RÄCHEN","RACKERN","RAD FAHREN","RAD SCHLAGEN","RADEBRECHEN","RADELN","RADIEREN","RADIKALISIEREN","RADIZIEREN","RADOTIEREN","RAFFEN","RAFFINIEREN","RAGEN","RÄKELN","RAMIFIZIEREN","RAMMELN","RAMMEN","RAMPONIEREN","RANDALIEREN","RANDOMISIEREN","RANGELN","RANGIEREN","RANKEN","RANKOMMEN","RAPPELN","RAPPORTIEREN","RASEN","RASIEREN","RÄSONIEREN","RASPELN","RASTEN","RATEN","RATIFIZIEREN","RATIONIEREN","RATSCHEN","RÄTSELN","RATTERN","RATZEN","RAUBEN","RAUCHEN","RÄUCHERN","RAUEN","RAUFEN","RÄUMEN","RAUNEN","RAUNZEN","RAUSCHEN","RAUSFINDEN","RAUSFLIEGEN","RAUSKRIEGEN","RÄUSPERN","RAUSSCHMEISSEN","REAGIEREN","REALISIEREN","REANIMIEREN","REBELLIEREN","RECHEN","RECHERCHIEREN","RECHNEN","RECHTEN","RECHTFERTIGEN","RECKEN","RECYCELN","RECYCLEN","REDEN","REDIGIEREN","REDUZIEREN","REFERENZIEREN","REFERIEREN","REFFEN","REFLEKTIEREN","REFORMIEREN","REFÜSIEREN","REFUTIEREN","REGALIEREN","REGELN","REGEN","REGENERIEREN","REGIEREN","REGISTRIEREN","REGLEMENTIEREN","REGNEN","REGREDIEREN","REGULIEREN","REHABILITIEREN","REIBEN","REICHEN","REIFEN","REIFIZIEREN","REIHEN","REIHERN","REIMEN","REIMPORTIEREN","REINIGEN","REINLEGEN","REINPLATZEN","REINSTITUTIONALISIEREN","REINZIEHEN","REISEN","REISSEN","REITEN","REIZEN","REKAPITULIEREN","REKELN","REKLAMIEREN","REKOGNOSZIEREN","REKONSTRUIEREN","REKRUTIEREN","REKTIFIZIEREN","REKUPERIEREN","REKURRIEREN","RELATIVIEREN","RELAXEN","RELEGIEREN","REMISIEREN","REMPELN","RENNEN","RENOMMIEREN","RENOVIEREN","RENTIEREN","REORGANISIEREN","REPARIEREN","REPATRIIEREN","REPETIEREN","REPLIZIEREN","REPONIEREN","REPRÄSENTIEREN","REPRIMIEREN","REPRIVATISIEREN","REPRODUZIEREN","REQUIRIEREN","RESERVIEREN","RESETTEN","RESIDIEREN","RESIGNIEREN","RESONIEREN","RESORBIEREN","RESPEKTIEREN","RESTAURIEREN","RESTRINGIEREN","RESTRUKTURIEREN","RESULTIEREN","RESÜMIEREN","RETOURNIEREN","RETTEN","RETUSCHIEREN","REÜSSIEREN","REVANCHIEREN","REVERSIEREN","REVIDIEREN","REVOLTIEREN","REVOLUTIONIEREN","REVOZIEREN","REZIPIEREN","REZITIEREN","REZYKLIEREN","RICHTEN","RIECHEN","RIFFELN","RINGELN","RINGEN","RINNEN","RIPPEN","RISKIEREN","RITZEN","RIVALISIEREN","ROBBEN","RÖCHELN","ROCHIEREN","ROCKEN","RODELN","RODEN","RÖHREN","ROLLEN","ROMANTISIEREN","RÖSTEN","ROSTEN","RÖTEN","ROTIEREN","ROTZEN","RUBBELN","RUBRIZIEREN","RUCKELN","RÜCKEN","RUDERN","RUFEN","RÜFFELN","RÜGEN","RUHEN","RÜHMEN","RÜHREN","RUINIEREN","RÜLPSEN","RUMALBERN","RUMBALLERN","RUMHUREN","RUMINIEREN","RUMKÜMMELN","RUMMELN","RUMOREN","RUNDEN","RUNTERFALLEN","RUNTERHOLEN","RUNTERKOMMEN","RUNTERROCKEN","RUNTERWIRTSCHAFTEN","RUNZELN","RUPFEN","RUSSEN","RÜSTEN","RUTSCHEN","RÜTTELN","SABBELN","SABBERN","SABOTIEREN","SÄEN","SÄGEN","SAGEN","SALBADERN","SALDIEREN","SALUTIEREN","SALVIEREN","SALZEN","SAMMELN","SANDSTRAHLEN","SANIEREN","SANKTIONIEREN","SATTELN","SÄTTIGEN","SATURIEREN","SAUBERMACHEN","SÄUBERN","SAUEN","SAUFEN","SAUGEN","SÄUGEN","SÄUMEN","SAUNIEREN","SÄUSELN","SAUSEN","SCANNEN","SCHABEN","SCHACHTEN","SCHADEN","SCHÄDIGEN","SCHAFFEN","SCHÄKERN","SCHÄLEN","SCHALLEN","SCHALTEN","SCHÄMEN","SCHÄNDEN","SCHANGHAIEN","SCHANZEN","SCHÄRFEN","SCHARREN","SCHARWENZELN","SCHASSEN","SCHATTIEREN","SCHÄTZEN","SCHAUDERN","SCHAUEN","SCHAUERN","SCHAUFELN","SCHÄUMEN","SCHAUSPIELERN","SCHEFFELN","SCHEIDEN","SCHEINEN","SCHEISSEN","SCHEITERN","SCHELLEN","SCHELTEN","SCHENKEN","SCHEPPERN","SCHEREN","SCHERZEN","SCHEUCHEN","SCHEUEN","SCHEUERN","SCHICHTEN","SCHICKEN","SCHICKERN","SCHIEBEN","SCHIEFERN","SCHIELEN","SCHIENEN","SCHIESSEN","SCHIFFEN","SCHIFTEN","SCHIKANIEREN","SCHILDERN","SCHILLERN","SCHIMMELN","SCHIMMERN","SCHIMPFEN","SCHINDEN","SCHIPPEN","SCHIRMEN","SCHLABBERN","SCHLACHTEN","SCHLACKERN","SCHLAFEN","SCHLAFWANDELN","SCHLAGEN","SCHLÄGERN","SCHLAGZEILEN","SCHLAMPEN","SCHLÄNGELN","SCHLECHTMACHEN","SCHLECHTREDEN","SCHLECKEN","SCHLEICHEN","SCHLEIFEN","SCHLEIMEN","SCHLEISSEN","SCHLEMMEN","SCHLENDERN","SCHLENZEN","SCHLEPPEN","SCHLEUDERN","SCHLEUSEN","SCHLICHTEN","SCHLIDDERN","SCHLIEREN","SCHLIESSEN","SCHLINGERN","SCHLITTERN","SCHLITZEN","SCHLOTTERN","SCHLUCHZEN","SCHLUCKEN","SCHLUDERN","SCHLUMMERN","SCHLÜPFEN","SCHLUPFEN","SCHLURFEN","SCHLÜRFEN","SCHLUSSFOLGERN","SCHMACHTEN","SCHMÄHEN","SCHMÄLERN","SCHMÄLZEN","SCHMAROTZEN","SCHMATZEN","SCHMAUCHEN","SCHMAUSEN","SCHMECKEN","SCHMEICHELN","SCHMEISSEN","SCHMELZEN","SCHMERZEN","SCHMETTERN","SCHMIEDEN","SCHMIEREN","SCHMINKEN","SCHMIRGELN","SCHMÖKERN","SCHMOLLEN","SCHMOREN","SCHMÜCKEN","SCHMUGGELN","SCHMUNZELN","SCHMUSEN","SCHNABULIEREN","SCHNACKEN","SCHNACKSELN","SCHNAPPEN","SCHNARCHEN","SCHNATTERN","SCHNAUBEN","SCHNAUFEN","SCHNÄUZEN","SCHNEIDEN","SCHNEIEN","SCHNELLEN","SCHNIPPELN","SCHNITZEN","SCHNÖKERN","SCHNORCHELN","SCHNORREN",
  "SCHNÜFFELN","SCHNUPFEN","SCHNUPPERN","SCHNÜREN","SCHNURREN","SCHOCKEN","SCHOCKIEREN","SCHÖNEN","SCHONEN","SCHÖNFÄRBEN",
  "SCHÖNREDEN","SCHÖNTUN","SCHÖPFEN","SCHOREN","SCHOTTERN","SCHRAFFIEREN","SCHRAUBEN","SCHRECKEN","SCHREDDERN","SCHREIBEN",
  "SCHREIEN","SCHREINERN","SCHREITEN","SCHRILLEN","SCHROTTEN","SCHRUMPFEN","SCHUBSEN","SCHUFTEN","SCHULDEN","SCHULEN","SCHUMMELN","SCHUPPEN","SCHÜREN","SCHÜRFEN","SCHURIGELN","SCHÜRZEN","SCHÜTTELN","SCHÜTTEN","SCHÜTZEN","SCHWÄCHELN","SCHWÄCHEN","SCHWADRONIEREN","SCHWAFELN","SCHWÄNGERN","SCHWANKEN","SCHWÄNZELN","SCHWÄNZEN","SCHWÄREN","SCHWÄRMEN","SCHWÄRZEN","SCHWARZHÖREN","SCHWARZSEHEN","SCHWATZEN","SCHWÄTZEN","SCHWEBEN","SCHWEIGEN","SCHWEISSEN","SCHWELEN","SCHWELGEN","SCHWELLEN","SCHWIMMEN","SCHWINDELN","SCHWINDEN","SCHWIRREN","SCHWITZEN","SCHWOFEN","SCHWÖREN","SCREENEN","SCROLLEN","SEDIEREN","SEDIMENTIEREN","SEGELN","SEGMENTIEREN","SEGNEN","SEGREGIEREN","SEHEN","SEICHEN","SEIGERN","SEIHEN","SEILEN","SEIN","SEKKIEREN","SEKUNDIEREN","SELEGIEREN","SENDEN","SENGEN","SENKEN","SENSEN","SENSIBILISIEREN","SEPARIEREN","SERVIEREN","SETZEN","SEUFZEN","SEXELN","SEXEN","SEZERNIEREN","SEZIEREN","SHOPPEN","SICH ABRACKERN","SICH ANBIEDERN","SICH ANPIRSCHEN","SICH ANSCHICKEN","SICH ANSCHMIEGEN","SICH ANSIEDELN","SICH AUFBÄUMEN","SICH AUFMANDELN","SICH BEDANKEN","SICH BEEILEN","SICH BEGNÜGEN","SICH BEKIFFEN","SICH BEMÜHEN","SICH BÜCKEN","SICH DARANMACHEN","SICH DAVONMACHEN","SICH DELEKTIEREN","SICH DUELLIEREN","SICH EINIGELN","SICH EINLEBEN","SICH EINSCHMEICHELN","SICH EMANZIPIEREN","SICH ERHOLEN","SICH ERKÄLTEN","SICH ERKUNDIGEN","SICH FRETTEN","SICH FREUEN","SICH GEDULDEN","SICH HERANMACHEN","SICH HERANTASTEN","SICH HINEINKNIEN","SICH KABBELN","SICH KAPRIZIEREN","SICH KONZENTRIEREN","SICH LIIEREN","SICH MOKIEREN","SICH NÄHERN","SICH REINKNIEN","SICH REVANCHIEREN","SICH SCHÄMEN","SICH SEHNEN","SICH VERDÜNNISIEREN","SICH VERIRREN","SICH VERKRACHEN","SICH VERLIEBEN","SICH VERLUSTIEREN","SICH VERZETTELN","SICH VORBEIZWÄNGEN","SICH WEHREN","SICH WEIGERN","SICH WIDERSETZEN","SICH ZANKEN","SICH ZOFFEN","SICH ZURÜCKBILDEN","SICHELN","SICHERGEHEN","SICHERN","SICHERSTELLEN","SICHTEN","SICKERN","SIEBEN","SIECHEN","SIEDELN","SIEDEN","SIEGEN","SIEZEN","SIGNALISIEREN","SIGNIEREN","SIMPLIFIZIEREN","SIMSEN","SIMULIEREN","SINGEN","SINKEN","SINN MACHEN","SINNEN","SINNIEREN","SINTERN","SIRREN","SISTIEREN","SITUIEREN","SITZEN","SITZENBLEIBEN","SKALIEREN","SKALPIEREN","SKANDALISIEREN","SKANDIEREN","SKIZZIEREN","SKYPEN","SNÖBEN","SOLIDARISIEREN","SOLLEN","SOLLIZITIEREN","SONDERN","SONDIEREN","SONNEN","SORGEN","SORTIEREN","SOUFFLIEREN","SOZIALISIEREN","SPÄHEN","SPALTEN","SPANNEN","SPAREN","SPASSEN","SPAZIEREN GEHEN","SPAZIEREN","SPEICHERN","SPEIEN","SPEISEN","SPEKULIEREN","SPENDEN","SPENDIEREN","SPERREN","SPEZIALISIEREN","SPEZIFIZIEREN","SPICKEN","SPIEGELN","SPIELEN","SPINNEN","SPIONIEREN","SPITZEN","SPLEISSEN","SPLITTERN","SPONSERN","SPÖTTELN","SPOTTEN","SPRECHEN","SPREITEN","SPREIZEN","SPRENGEN","SPRENKELN","SPRIESSEN","SPRINGEN","SPRINTEN","SPRITZEN","SPRUDELN","SPRÜHEN","SPUCKEN","SPUKEN","SPÜLEN","SPUREN","SPÜREN","SPURTEN","SPUTEN","STABILISIEREN","STAFFIEREN","STAGNIEREN","STÄHLEN","STAKEN","STALKEN","STAMMELN","STAMMEN","STAMPFEN","STANDARDISIEREN","STANDHALTEN","STÄNKERN","STANZEN","STAPELN","STAPFEN",
  "STÄRKEN","STARREN","STARTEN","STATIONIEREN","STATTFINDEN","STAUBEN","STAUBSAUGEN","STAUCHEN","STAUEN","STAUNEN","STECHEN",
  "STECKEN","STEHEN","STEHLEN","STEIGEN","STEIGERN","STEINIGEN","STELLEN","STELZEN","STEMMEN","STEMPELN","STEPPEN","STERBEN",
  "STERILISIEREN","STEUERN","STIBITZEN","STICKEN","STIEBEN","STIEFELN","STIEREN","STIFTEN","STIGMATISIEREN","STILISIEREN",
  "STILLEN","STILLLEGEN","STILLSTEHEN","STIMMEN","STIMULIEREN","STINKEN","STIPPEN","STIPULIEREN","STÖBERN","STOCHEN","STOCHERN",
  "STOCKEN","STÖHNEN","STOLPERN","STOLZIEREN","STOPFEN","STOPPEN","STÖREN","STORNIEREN","STOSSEN","STOTTERN","STRAFEN","STRAFFEN",
  "STRAHLEN","STRAMMSTEHEN","STRAMPELN","STRANDEN","STRANGULIEREN","STRAPAZIEREN","STRÄUBEN","STRAUCHELN","STREAMEN","STREBEN","STRECKEN","STREICHELN","STREICHEN","STREIFEN","STREIKEN","STREITEN","STRESSEN","STREUNEN","STRICKEN","STRIEGELN","STRIEZEN","STRIPPEN","STRÖMEN","STROMERN","STROTZEN","STRUKTURIEREN","STRULLERN","STÜCKEN","STUDIEREN","STUKEN","STUNDEN","STUPFEN","STUPSEN","STÜRMEN","STÜRZEN","STUTZEN","STÜTZEN","STYLEN","SUBJEKTIVIEREN","SUBLIMIEREN","SUBSKRIBIEREN","SUBSTANTIVIEREN","SUBSTANZIIEREN","SUBSTITUIEREN","SUBSUMIEREN","SUBTRAHIEREN","SUBVENTIONIEREN","SUCHEN","SUGGERIEREN","SUHLEN","SÜHNEN","SÜLZEN","SUMMEN","SUMMIEREN","SÜNDIGEN","SUPINIEREN","SUPPONIEREN","SURFEN","SURREN","SUSPENDIEREN","SÜSSEN","SYMBOLISIEREN","SYMPATHISIEREN","SYNCHRONISIEREN","SYNTHETISIEREN","SYSTEMATISIEREN","TABLETTIEREN","TABUISIEREN","TADELN","TAFELN","TAGEN","TAGGEN","TAGTRÄUMEN","TAKELN","TAKTIEREN","TAMPONIEREN","TÄNDELN","TANGIEREN","TANKEN","TÄNZELN","TANZEN","TAPERN","TAPEZIEREN","TAPPEN","TAPSEN","TARNEN","TASTEN","TÄTIGEN","TÄTOWIEREN","TÄTSCHELN","TATSCHEN","TATTERN","TAUCHEN","TAUEN","TAUFEN","TAUGEN","TAUMELN","TAUSCHEN","TÄUSCHEN","TAXIEREN","TEEREN","TEILEN","TEILNEHMEN","TELEFONIEREN","TELEGRAFIEREN","TELEPORTIEREN","TEMPERIEREN","TEMPERN","TENDIEREN","TERMINIEREN","TERRORISIEREN","TESTEN","TESTIEREN","THEMATISIEREN","THEOLOGISIEREN","THEORETISIEREN","THRONEN","TICKEN","TILGEN","TINGIEREN","TIPPEN","TIRILIEREN","TITELN","TITRIEREN","TITULIEREN","TOASTEN","TOBEN","TOLERIEREN","TOLLEN","TÖNEN","TÖPFERN","TOPPEN","TORKELN","TORPEDIEREN","TOSEN","TÖTEN","TOTMACHEN","TOTSCHWEIGEN","TOUCHIEREN","TOUPIEREN","TOUREN","TRABEN","TRACHEOTOMIEREN","TRACHTEN","TRACKEN","TRADIEREN","TRAGEN","TRAINIEREN","TRAKTANDIEREN","TRAKTIEREN","TRÄLLERN","TRAMPELN","TRAMPEN","TRANCHIEREN","TRÄNEN","TRÄNKEN","TRANSFERIEREN","TRANSFORMIEREN","TRANSFUNDIEREN","TRANSITIEREN","TRANSKRIBIEREN","TRANSLITERIEREN","TRANSLOZIEREN","TRANSMUTIEREN","TRANSPONIEREN","TRANSPORTIEREN","TRANSZENDIEREN","TRASSIEREN","TRATSCHEN","TRAUEN","TRAUERN","TRÄUFELN","TRAUMATISIEREN","TRÄUMEN","TRAUMWANDELN","TRAVERSIEREN","TREFFEN","TREIBEN","TREIDELN","TREMOLIEREN","TRENNEN","TREPANIEREN","TRETEN","TRIANGULIEREN","TRICKSEN","TRIEFEN","TRIELEN","TRIEZEN","TRIGGERN","TRIMMEN","TRINKEN","TRIPPELN","TRIUMPHIEREN","TROCKENLEGEN","TROCKNEN","TRÖDELN","TROMMELN","TROMPETEN","TRÖPFELN","TROPFEN","TRÖSTEN","TROTTEN","TROTZEN","TRÜBEN","TRÜGEN","TSCHILPEN","TÜFTELN","TUMMELN","TÜNCHEN","TUNEN","TUNNELN","TUPFEN","TÜRKEN","TÜRMEN","TURNEN","TURTELN","TUSCHELN","TWITTERN","TYRANNISIEREN","ÜBEN","ÜBERANSTRENGEN","ÜBERARBEITEN","ÜBERBEANSPRUCHEN","ÜBERBEWERTEN","ÜBERBIETEN","ÜBERBLICKEN","ÜBERBRINGEN","ÜBERBRÜCKEN","ÜBERDAUERN","ÜBERDENKEN","ÜBEREILEN","ÜBEREINKOMMEN","ÜBEREINSTIMMEN","ÜBERFAHREN","ÜBERFALLEN","ÜBERFISCHEN","ÜBERFLIEGEN","ÜBERFLUTEN","ÜBERFORDERN","ÜBERFÜHREN","ÜBERGEBEN","ÜBERGEHEN","ÜBERGIESSEN","ÜBERHANDNEHMEN","ÜBERHÖHEN","ÜBERHOLEN","ÜBERKOMMEN","ÜBERKREUZEN","ÜBERLADEN","ÜBERLAPPEN","ÜBERLASSEN","ÜBERLAUFEN","ÜBERLEBEN","ÜBERLIEFERN","ÜBERLISTEN","ÜBERMITTELN","ÜBERNACHTEN","ÜBERNEHMEN","ÜBERPRÜFEN","ÜBERQUEREN","ÜBERRAGEN","ÜBERRASCHEN","ÜBERREAGIEREN","ÜBERREDEN","ÜBERREICHEN","ÜBERRUNDEN","ÜBERSCHATTEN","ÜBERSCHÄTZEN","ÜBERSCHÄUMEN","ÜBERSCHNEIDEN","ÜBERSCHREIBEN","ÜBERSCHREITEN","ÜBERSCHWEMMEN","ÜBERSEHEN","ÜBERSETZEN","ÜBERSIEDELN","ÜBERSPIELEN","ÜBERSTEHEN","ÜBERSTEIGEN","ÜBERSTRAPAZIEREN","ÜBERSTÜLPEN","ÜBERSTÜRZEN","ÜBERTEUERN","ÜBERTRAGEN","ÜBERTREFFEN","ÜBERTREIBEN","ÜBERTRUMPFEN","ÜBERVORTEILEN","ÜBERWACHEN","ÜBERWACHSEN","ÜBERWALLEN","ÜBERWÄLTIGEN","ÜBERWEISEN","ÜBERWIEGEN","ÜBERWINDEN","ÜBERWINTERN","ÜBERZEUGEN","ÜBERZIEHEN","ÜBRIGBLEIBEN","UMÄNDERN","UMARBEITEN","UMARMEN","UMBAUEN","UMBENENNEN","UMBESTELLEN","UMBINDEN","UMBLICKEN","UMBRECHEN","UMBRINGEN","UMDENKEN","UMDREHEN","UMETIKETTIEREN","UMFAHREN","UMFALLEN","UMFANGEN","UMFÄRBEN","UMFASSEN","UMFLIEGEN","UMFORMEN","UMFORMULIEREN","UMFUNKTIONIEREN","UMGARNEN","UMGEBEN","UMGEHEN","UMGESTALTEN","UMHERSPRINGEN","UMHERSTREIFEN","UMHÜLLEN","UMKEHREN","UMKOMMEN","UMKREMPELN","UMKRISTALLISIEREN","UMLAUFEN","UMLEGEN","UMLEITEN","UMMANTELN","UMMÜNZEN","UMPOLEN","UMRECHNEN","UMREISSEN","UMREITEN","UMRUBELN","UMSÄUMEN","UMSCHALTEN","UMSCHICHTEN","UMSCHLIESSEN","UMSCHMELZEN","UMSCHNALLEN","UMSCHREIBEN","UMSCHULDEN","UMSCHULEN","UMSCHÜTTEN","UMSEHEN","UMSETZEN","UMSIEDELN","UMSORGEN","UMSPANNEN","UMSTEIGEN","UMSTELLEN","UMSTOSSEN","UMSTRUKTURIEREN","UMTAUSCHEN","UMTOPFEN","UMVERTEILEN","UMWANDELN","UMWERFEN","UMZÄUNEN","UMZIEHEN","UMZINGELN","UNIEREN","UNTERBEWERTEN","UNTERBIETEN","UNTERBINDEN","UNTERBRECHEN","UNTERBRINGEN","UNTERDRÜCKEN","UNTERFERTIGEN","UNTERFINANZIEREN","UNTERFORDERN","UNTERGEHEN","UNTERHALTEN","UNTERHANDELN","UNTERJOCHEN","UNTERJUBELN","UNTERLASSEN","UNTERLIEGEN","UNTERMAUERN","UNTERMINIEREN","UNTERORDNEN","UNTERPFLÜGEN","UNTERRICHTEN","UNTERSAGEN","UNTERSCHÄTZEN","UNTERSCHEIDEN","UNTERSCHIEBEN","UNTERSCHLAGEN","UNTERSCHREIBEN","UNTERSPÜLEN","UNTERSTEHEN","UNTERSTREICHEN","UNTERSTÜTZEN","UNTERSUCHEN","UNTERTAUCHEN","UNTERTEILEN","UNTERTREIBEN","UNTERWEISEN","UNTERWERFEN","UNTERZEICHNEN","UNTERZIEHEN","UPGRADEN","URBANISIEREN","URGIEREN","URINIEREN","URLAUBEN","URTEILEN","USURPIEREN","UZEN","VAGABUNDIEREN","VAGIEREN","VALIDIEREN","VALORISIEREN","VANDALIEREN","VAPORISIEREN","VARIIEREN","VELARISIEREN","VENTILIEREN","VERABREDEN","VERABREICHEN","VERABSÄUMEN","VERABSCHEUEN","VERABSCHIEDEN","VERABSOLUTIEREN","VERACHTEN","VERALLGEMEINERN","VERALTEN","VERÄNDERN","VERANKERN","VERANLAGEN","VERANLASSEN","VERANSCHAULICHEN","VERANSCHLAGEN","VERANSTALTEN","VERANTWORTEN","VERÄPPELN","VERARBEITEN","VERÄRGERN","VERARMEN","VERARSCHEN","VERÄSTELN","VERAUSGABEN","VERÄUSSERN","VERBALISIEREN","VERBALLHORNEN","VERBANNEN","VERBARRIKADIEREN","VERBASELN","VERBAUEN","VERBEISSEN","VERBERGEN","VERBESSERN","VERBEUGEN","VERBIEGEN","VERBIETEN","VERBINDEN","VERBITTERN","VERBLASSEN","VERBLÄUEN","VERBLEIBEN","VERBLEICHEN","VERBLEIEN","VERBLÜFFEN","VERBLUTEN","VERBORGEN","VERBRÄMEN","VERBRATEN","VERBRAUCHEN","VERBRECHEN","VERBREITEN","VERBRENNEN","VERBRIEFEN","VERBRINGEN","VERBRÜDERN","VERBUCHEN","VERBUDDELN","VERBÜNDEN","VERBÜRGEN","VERBÜSSEN","VERDÄCHTIGEN","VERDAMMEN","VERDAMPFEN","VERDANKEN","VERDAUEN","VERDECKEN","VERDENKEN","VERDERBEN","VERDEUTSCHEN","VERDICHTEN","VERDIENEN","VERDINGEN","VERDINGLICHEN","VERDONNERN","VERDOPPELN","VERDRÄNGEN","VERDREHEN","VERDREIFACHEN","VERDRESCHEN","VERDRIESSEN","VERDRÜCKEN","VERDUFTEN","VERDUMMEN","VERDUNKELN","VERDÜNNEN","VERDUNSTEN","VERDUTZEN","VEREDELN","VEREHREN","VEREINBAREN","VEREINEN","VEREINFACHEN","VEREINIGEN","VEREINNAHMEN","VEREISEN","VEREITELN","VERERBEN","VEREWIGEN","VERFAHREN","VERFALLEN","VERFÄLSCHEN","VERFANGEN","VERFÄRBEN","VERFASSEN","VERFECHTEN","VERFEHLEN","VERFEMEN","VERFESTIGEN",
  "VERFETTEN","VERFICKEN","VERFILMEN","VERFINSTERN","VERFLECHTEN","VERFLIEGEN","VERFLUCHEN","VERFOLGEN","VERFORMEN","VERFUGEN","VERFÜGEN","VERFÜHREN","VERGASEN","VERGATTERN","VERGEBEN","VERGEHEN","VERGELTEN","VERGESSEN","VERGEUDEN","VERGEWALTIGEN","VERGIESSEN","VERGIFTEN","VERGILBEN","VERGITTERN","VERGLEICHEN","VERGLÜHEN","VERGOLDEN","VERGRABEN","VERGRAULEN","VERGREIFEN","VERGREISEN","VERGRÖSSERN","VERHAFTEN","VERHAGELN","VERHALTEN","VERHANDELN","VERHÄNGEN","VERHÄTSCHELN","VERHEDDERN","VERHEHLEN","VERHEILEN","VERHEIMLICHEN","VERHEIRATEN","VERHEISSEN","VERHELFEN","VERHERRLICHEN","VERHEXEN","VERHINDERN","VERHÖHNEN","VERHOHNEPIEPELN","VERHÖKERN","VERHÖREN","VERHÜLLEN","VERHUNGERN","VERHÜTEN","VERIFIZIEREN","VERIRREN","VERJAGEN","VERJÜNGEN","VERKABELN","VERKAPSELN","VERKAUFEN","VERKEHREN","VERKENNEN","VERKLAGEN","VERKLÄREN","VERKLEIDEN","VERKLEINERN","VERKLINGEN","VERKLOPPEN","VERKNALLEN","VERKNEIFEN","VERKNITTERN","VERKNOTEN","VERKNÜPFEN","VERKOMMEN","VERKÖRPERN","VERKRAFTEN","VERKRIECHEN","VERKRUSTEN","VERKÜNDEN","VERKÜRZEN","VERLADEN","VERLAGERN","VERLANGEN","VERLÄNGERN","VERLANGSAMEN","VERLAUFEN","VERLAUTBAREN","VERLAUTEN","VERLEBEN","VERLERNEN","VERLESEN","VERLETZEN","VERLEUMDEN","VERLIEBEN","VERLIEREN","VERLINKEN","VERLOBEN","VERLOCKEN","VERLÖSCHEN","VERLÖTEN","VERMACHEN","VERMÄHLEN","VERMALEDEIEN","VERMARKTEN","VERMASSELN","VERMEHREN","VERMEIDEN","VERMEINEN","VERMENGEN","VERMENSCHLICHEN","VERMERKEN","VERMESSEN","VERMIESEN","VERMIETEN","VERMINDERN","VERMINEN","VERMISCHEN","VERMISSEN","VERMITTELN","VERMÖGEN","VERMUTEN","VERNACHLÄSSIGEN","VERNASCHEN","VERNEHMEN","VERNEINEN","VERNETZEN","VERNICHTEN","VERÖFFENTLICHEN","VERORDNEN","VERPACKEN","VERPASSEN","VERPATZEN","VERPESTEN","VERPETZEN","VERPFÄNDEN","VERPFEIFEN","VERPFLEGEN","VERPFLICHTEN","VERPISSEN","VERPLEMPERN","VERPRELLEN","VERPRESSEN","VERPROVIANTIEREN","VERPRÜGELN","VERPUFFEN","VERPUPPEN","VERPUTZEN","VERQUICKEN","VERRAMSCHEN","VERRATEN","VERRECHNEN","VERRECKEN","VERREISEN","VERRICHTEN","VERRINGERN","VERRINNEN","VERROHREN","VERROSTEN","VERRÜHREN","VERSAGEN","VERSALZEN","VERSAMMELN","VERSAUEN","VERSAUERN","VERSÄUMEN","VERSCHACHERN","VERSCHACHTELN","VERSCHAFFEN","VERSCHALKEN","VERSCHANZEN","VERSCHÄRFEN","VERSCHARREN","VERSCHAUKELN","VERSCHEIDEN","VERSCHEISSERN","VERSCHENKEN","VERSCHERBELN","VERSCHEUCHEN","VERSCHICKEN","VERSCHIEBEN","VERSCHIESSEN","VERSCHIMMELN","VERSCHLACKEN","VERSCHLAMPEN","VERSCHLECHTERN","VERSCHLEIERN","VERSCHLEIFEN","VERSCHLEISSEN","VERSCHLEPPEN","VERSCHLEUDERN","VERSCHLIESSEN","VERSCHLIMMBESSERN","VERSCHLIMMERN","VERSCHLINGEN","VERSCHLUCKEN","VERSCHLUDERN","VERSCHLÜSSELN","VERSCHMACHTEN","VERSCHMÄHEN","VERSCHMELZEN","VERSCHMERZEN","VERSCHMUTZEN","VERSCHNAUFEN","VERSCHNEIDEN","VERSCHONEN","VERSCHRÄNKEN","VERSCHRECKEN","VERSCHREIBEN","VERSCHREIEN","VERSCHROTTEN","VERSCHRUMPELN","VERSCHULDEN","VERSCHÜTTEN","VERSCHWEIGEN","VERSCHWENDEN","VERSCHWIMMEN","VERSCHWINDEN","VERSCHWÖREN","VERSEHEN","VERSEHREN","VERSEIFEN","VERSEMMELN","VERSENDEN","VERSENGEN","VERSENKEN","VERSETZEN","VERSEUCHEN","VERSICHERN","VERSIEGELN","VERSIFIZIEREN","VERSILBERN","VERSINKEN","VERSKLAVEN","VERSÖHNEN","VERSORGEN","VERSPÄTEN","VERSPEISEN","VERSPERREN","VERSPIELEN","VERSPINNEN","VERSPOTTEN","VERSPRECHEN","VERSPRENGEN","VERSPRÖDEN","VERSPÜREN","VERSTAATLICHEN","VERSTÄNDIGEN","VERSTÄRKEN","VERSTAUEN","VERSTECKEN","VERSTEHEN","VERSTEIFEN","VERSTEIGERN","VERSTEINERN","VERSTELLEN","VERSTERBEN","VERSTOFFWECHSELN","VERSTOPFEN","VERSTÖREN","VERSTOSSEN","VERSTRAHLEN","VERSTREICHEN","VERSTREUEN","VERSTÜMMELN","VERSTUMMEN","VERSUCHEN","VERSUMPFEN","VERSÜSSEN","VERTAGEN","VERTÄUEN","VERTAUSCHEN","VERTEIDIGEN","VERTEILEN","VERTEUFELN","VERTIEFEN","VERTIKUTIEREN","VERTILGEN","VERTIPPEN","VERTONEN","VERTRAGEN","VERTRAUEN","VERTREIBEN","VERTRETEN","VERTUN","VERTUSCHEN","VERÜBEN","VERUNFALLEN","VERUNGLIMPFEN","VERUNGLÜCKEN","VERUNMÖGLICHEN","VERUNSICHERN","VERUNSTALTEN","VERUNZIEREN","VERURSACHEN","VERURTEILEN","VERWACKELN","VERWÄHLEN","VERWAHREN","VERWAHRLOSEN","VERWAISEN","VERWALTEN","VERWANDELN","VERWANZEN","VERWARNEN","VERWÄSSERN","VERWECHSELN","VERWEHEN","VERWEHREN","VERWEIGERN","VERWEILEN","VERWEISEN","VERWELKEN","VERWENDEN","VERWERFEN","VERWERTEN","VERWESEN","VERWETTEN","VERWICKELN","VERWILDERN","VERWINDEN","VERWIRKEN","VERWIRKLICHEN","VERWIRREN","VERWITTERN","VERWUNDEN","VERWUNDERN","VERWÜNSCHEN","VERWÜSTEN","VERZAGEN","VERZAPFEN","VERZAUBERN","VERZÄUNEN","VERZEHNFACHEN","VERZEHREN","VERZEICHNEN","VERZEIGEN","VERZEIHEN","VERZERREN","VERZETTELN","VERZICHTEN","VERZIEHEN","VERZIEREN","VERZINKEN","VERZINNEN","VERZOCKEN","VERZÖGERN","VERZOLLEN","VERZÜCKEN","VERZWEIFELN","VERZWEIGEN","VIBRIEREN","VIERTEILEN","VINDIZIEREN","VIRTUALISIEREN","VÖGELN","VOLLENDEN","VOLLFÜHREN","VOLLKOTZEN","VOLLLADEN","VOLLSTOPFEN","VOLLSTRECKEN","VOLLTANKEN","VOLLZIEHEN","VOMIEREN","VORANBRINGEN","VORANTREIBEN","VORAUSAHNEN","VORAUSBEDENKEN","VORAUSDENKEN","VORAUSEILEN","VORAUSGEHEN","VORAUSLAUFEN","VORAUSSAGEN","VORAUSSEHEN","VORAUSSETZEN","VORAUSWISSEN","VORBEHANDELN","VORBEIFAHREN","VORBEILASSEN","VORBEREITEN","VORBEUGEN","VORDENKEN","VORDRÄNGELN","VORDRINGEN","VORFAHREN","VORFALLEN","VORFINANZIEREN","VORFINDEN","VORFÜHREN","VORGAUKELN","VORGEBEN","VORGEHEN","VORHABEN","VORHALTEN","VORHEIZEN","VORHERGEHEN","VORHERRSCHEN","VORHERSAGEN","VORHERSEHEN","VORKNÖPFEN","VORKOMMEN","VORLADEN","VORLASSEN","VORLAUFEN","VORLEGEN","VORLESEN","VORLIEBNEHMEN","VORLIEGEN","VORMACHEN","VORMERKEN","VORNEHMEN","VORRECHNEN","VORRÜCKEN","VORSAGEN","VORSCHIESSEN","VORSCHLAGEN","VORSCHREIBEN","VORSEHEN","VORSORGEN","VORSPIELEN","VORSTELLEN","VORSTOSSEN","VORTÄUSCHEN","VORTRAGEN","VORTURNEN","VORÜBERFAHREN","VORÜBERGEHEN","VORVERZINNEN","VORWEGNEHMEN","VORWEISEN","VORWERFEN","VORZEIGEN","VORZIEHEN","VOTEN","VOTIEREN","VOZIEREN","VULGARISIEREN","VULKANISIEREN","WABERN","WACHEN","WACHKÜSSEN","WACHRÜTTELN","WACHSEN","WACKELN","WAGEN","WÄGEN","WÄHLEN","WÄHNEN","WÄHREN","WAHREN","WAHRNEHMEN","WALKEN","WALLEN","WALLFAHREN","WALLFAHRTEN","WALTEN","WALZEN","WÄLZEN","WANDELN","WANDERN","WAPPNEN","WÄRMEBEHANDELN","WÄRMEN","WARMHALTEN","WARNEN","WARTEN","WASCHEN","WASSERN","WÄSSERN","WATEN","WATSCHELN","WATTIEREN","WEBEN","WECHSELN","WECHSELWIRKEN","WECKEN","WEDELN","WEGBRINGEN","WEGDRÄNGEN","WEGDRÜCKEN","WEGFAHREN","WEGFLIEGEN","WEGGEHEN","WEGJAGEN","WEGKOMMEN","WEGLASSEN","WEGLAUFEN","WEGLEGEN","WEGMACHEN","WEGNEHMEN","WEGRÄUMEN","WEGSCHMEISSEN","WEGSEHEN","WEGSTECKEN","WEGTRETEN","WEGWERFEN","WEGZAPPEN","WEGZIEHEN","WEH TUN","WEHEN","WEHKLAGEN","WEHREN","WEHTUN","WEICHEN","WEIDEN","WEIGERN","WEIHEN","WEIHNACHTEN","WEILEN","WEINEN","WEISEN","WEISMACHEN","WEISSAGEN","WEISSELN","WEISSEN","WEITEN","WEITERBAUEN","WEITERDENKEN","WEITERGEBEN","WEITERGEHEN","WEITERHELFEN","WEITERLEBEN","WEITERLEITEN","WEITERMACHEN","WEITERSPINNEN","WELKEN","WELLEN","WELSCHEN","WENDEN","WERBEN","WERDEN","WERFEN","WERKELN","WERTEN","WERTSCHÄTZEN","WETTEIFERN","WETTEN","WETTERLEUCHTEN","WETTERN","WETTMACHEN","WETZEN","WICHSEN","WICKELN","WIDERLEGEN","WIDERRUFEN","WIDERSPRECHEN","WIDERSTEHEN","WIDMEN","WIEDERAUFBEREITEN","WIEDERAUFERSTEHEN","WIEDERBELEBEN","WIEDEREINGLIEDERN","WIEDERENTDECKEN","WIEDERERLANGEN","WIEDERERÖFFNEN","WIEDERFINDEN","WIEDERGEBEN","WIEDERGEWINNEN","WIEDERGUTMACHEN","WIEDERHERSTELLEN","WIEDERHOLEN","WIEDERKÄUEN","WIEDERKOMMEN","WIEDERSEHEN","WIEDERVEREINIGEN","WIEDERWÄHLEN","WIEGEN","WIEHERN","WILDERN","WILLKOMMEN HEISSEN","WIMMELN","WIMMERN","WINDEN","WINKEN","WINSELN","WIPPEN","WIRBELN","WIRKEN","WIRREN","WISCHEN","WISPERN","WISSEN","WITTERN","WITZELN","WOGEN","WOHNEN","WORFELN","WUCHERN","WUCHTEN","WÜHLEN","WUNDERN","WÜNSCHEN","WÜRDIGEN","WÜRFELN","WÜRGEN","WURSTELN","WURZELN","WÜRZEN","WUSCHELN","WUSELN","WÜTEN","XEROKOPIEREN","ZACKEN","ZAGEN","ZÄHLEN","ZAHLEN","ZÄHMEN","ZÄHNEN","ZANKEN","ZAPFEN","ZAPPELN","ZAPPEN","ZAUBERN","ZAUDERN","ZÄUMEN","ZÄUNEN","ZECHEN","ZEDIEREN","ZEHREN","ZEICHNEN","ZEIGEN","ZEIHEN","ZEITIGEN","ZELEBRIEREN","ZELTEN","ZEMENTIEREN","ZENSIEREN","ZENSURIEREN","ZENTRIEREN","ZENTRIFUGIEREN","ZERBEISSEN","ZERBERSTEN","ZERBEULEN","ZERBRECHEN","ZERBRÖSELN","ZERDEPPERN","ZERDRÜCKEN","ZERFALLEN","ZERFASERN","ZERFETZEN","ZERFICKEN","ZERFLEDDERN","ZERFLEISCHEN","ZERFLIESSEN","ZERGEHEN","ZERKAUEN","ZERKLEINERN","ZERKLÜFTEN","ZERKNITTERN","ZERKRATZEN","ZERLASSEN","ZERLEGEN","ZERMALMEN","ZERMATSCHEN","ZERNAGEN","ZERNICHTEN","ZERNIEREN","ZERPFLÜCKEN","ZERPLATZEN","ZERQUETSCHEN","ZERREDEN","ZERREIBEN","ZERREISSEN","ZERREN","ZERRINNEN","ZERRÜTTEN","ZERSÄGEN","ZERSCHELLEN","ZERSCHIESSEN","ZERSCHLAGEN","ZERSCHMETTERN","ZERSCHNEIDEN","ZERSCHNIPPELN","ZERSCHRAMMEN","ZERSETZEN","ZERSPLITTERN","ZERSTAMPFEN","ZERSTÄUBEN","ZERSTECHEN","ZERSTIEBEN","ZERSTÖREN","ZERSTRAHLEN","ZERSTREITEN","ZERSTREUEN","ZERTEILEN","ZERTIFIZIEREN","ZERTRAMPELN","ZERTRÜMMERN","ZETERN","ZETTELN","ZEUGEN","ZIEHEN","ZIELEN","ZIEPEN","ZIEREN","ZIPPEN","ZIRKULIEREN","ZIRPEN","ZISCHELN","ZISCHEN","ZISELIEREN","ZITIEREN","ZITTERN","ZIVILISIEREN","ZOCKEN","ZÖGERN","ZOLLEN","ZOOMEN","ZU GRUNDE LIEGEN","ZU GRUNDE RICHTEN","ZU SCHANDEN MACHEN","ZU TAGE FÖRDERN","ZUBEISSEN","ZUBEREITEN","ZUBRINGEN","ZUBUTTERN","ZÜCHTEN","ZUCKEN","ZÜCKEN","ZUCKERN","ZUDENKEN","ZUEINANDERFINDEN","ZUFLIESSEN","ZUFLÜSTERN","ZUFRIEDENSTELLEN","ZUFRIEREN","ZUFÜGEN","ZUFÜHREN",
  "ZUGEBEN","ZUGEHEN","ZÜGELN","ZUGRUNDE LEGEN","ZUGRUNDE LIEGEN","ZUGRUNDE RICHTEN","ZUGUTEKOMMEN","ZUHÖREN","ZUKLEBEN","ZUKNÖPFEN","ZUKOMMEN","ZULASSEN","ZULEGEN","ZUMACHEN","ZUMUTEN","ZUNÄHEN","ZÜNDELN","ZÜNDEN","ZUNEHMEN","ZÜNGELN","ZUNICHTEMACHEN","ZUORDNEN","ZUPACKEN","ZUPASSKOMMEN","ZUPFEN","ZURATEN","ZURECHNEN","ZURECHTFINDEN","ZURECHTKOMMEN","ZURECHTWEISEN","ZÜRNEN","ZURREN","ZURÜCKBEKOMMEN","ZURÜCKBLEIBEN","ZURÜCKBRINGEN","ZURÜCKDENKEN","ZURÜCKDRÄNGEN","ZURÜCKFINDEN","ZURÜCKFÜHREN","ZURÜCKGEBEN","ZURÜCKGEHEN","ZURÜCKGEWINNEN","ZURÜCKGREIFEN","ZURÜCKHALTEN","ZURÜCKKEHREN","ZURÜCKKOMMEN","ZURÜCKLASSEN","ZURÜCKLEGEN","ZURÜCKMACHEN","ZURÜCKMELDEN","ZURÜCKNEHMEN","ZURÜCKRENNEN","ZURÜCKRUFEN","ZURÜCKSCHICKEN","ZURÜCKSCHREIBEN","ZURÜCKSETZEN","ZURÜCKTRETEN","ZURÜCKVERFOLGEN","ZURÜCKVERWANDELN","ZURÜCKWEISEN","ZURÜCKWENDEN","ZURÜCKZAHLEN","ZURÜCKZIEHEN","ZURÜCKZUCKEN","ZUSAGEN","ZUSAMMENARBEITEN","ZUSAMMENBEISSEN","ZUSAMMENBRAUEN","ZUSAMMENBRECHEN","ZUSAMMENDRÜCKEN","ZUSAMMENFALLEN","ZUSAMMENFASSEN","ZUSAMMENFINDEN","ZUSAMMENFLIESSEN","ZUSAMMENFÜGEN","ZUSAMMENFÜHREN","ZUSAMMENHALTEN","ZUSAMMENHÄNGEN","ZUSAMMENKLEBEN","ZUSAMMENKNÜLLEN","ZUSAMMENKRATZEN","ZUSAMMENLEBEN","ZUSAMMENLEIMEN","ZUSAMMENPRESSEN","ZUSAMMENRECHNEN","ZUSAMMENREISSEN","ZUSAMMENSCHARREN","ZUSAMMENSCHLIESSEN","ZUSAMMENSCHNEIDEN","ZUSAMMENSCHRAUBEN","ZUSAMMENSCHRECKEN","ZUSAMMENSETZEN","ZUSAMMENSPAREN","ZUSAMMENSTELLEN","ZUSAMMENSTOSSEN","ZUSAMMENSTÜRZEN","ZUSAMMENTROMMELN","ZUSAMMENTUN","ZUSAMMENZIEHEN","ZUSAMMENZUCKEN","ZUSCHANDEN MACHEN","ZUSCHAUEN","ZUSCHLAGEN","ZUSCHLIESSEN","ZUSCHNEIDEN","ZUSCHREIBEN","ZUSCHREIEN","ZUSCHÜTTEN","ZUSEHEN","ZUSICHERN","ZUSPRECHEN","ZUSTEIGEN","ZUSTELLEN","ZUSTIMMEN","ZUSTOSSEN","ZUTAGE FÖRDERN","ZUTEILWERDEN","ZUTEXTEN","ZUTRAGEN","ZUTRAUEN","ZUWANDERN","ZUWEISEN","ZUWERFEN","ZUWIDERHANDELN","ZUZAHLEN","ZUZELN","ZWÄNGEN","ZWECKENTFREMDEN","ZWEIFELN","ZWICKEN","ZWINGEN","ZWINKERN","ZWIRNEN","ZWISCHEN DEN ZEILEN LESEN","ZWITSCHERN",
  "SEIN",
  "HABEN",
  "WERDEN",
  "KÖNNEN",
  "MÜSSEN MUST,",
  "SAGEN",
  "MACHEN",
  "GEBEN",
  "KOMMEN",
  "SOLLEN",
  "WOLLEN",
  "GEHEN",
  "WISSEN",
  "SEHEN",
  "LASSEN",
  "STEHEN",
  "FINDEN",
  "BLEIBEN",
  "LIEGEN",
  "HEISSEN",
  "DENKEN",
  "NEHMEN",
  "TUN",
  "DÜRFEN",
  "GLAUBEN",
  "HALTEN",
  "NENNEN",
  "MÖGEN",
  "ZEIGEN",
  "FÜHREN",
  "SPRECHEN",
  "BRINGEN",
  "LEBEN",
  "FAHREN",
  "MEINEN",
  "FRAGEN",
  "KENNEN",
  "GELTEN",
  "STELLEN",
  "SPIELEN",
  "ARBEITEN",
  "BRAUCHEN",
  "FOLGEN",
  "LERNEN",
  "BESTEHEN",
  "VERSTEHEN",
  "SETZEN",
  "BEKOMMEN",
  "BEGINNEN",
  "ERZÄHLEN",
  "VERSUCHEN",
  "SCHREIBEN",
  "LAUFEN",
  "ERKLÄREN",
  "ENTSPRECHEN",
  "SITZEN",
  "ZIEHEN",
  "SCHEINEN",
  "FALLEN",
  "GEHÖREN",
  "ENTSTEHEN",
  "ERHALTEN",
  "TREFFEN",
  "SUCHEN",
  "LEGEN",
  "VOR·STELLEN",
  "HANDELN",
  "ERREICHEN",
  "TRAGEN",
  "SCHAFFEN",
  "LESEN",
  "VERLIEREN",
  "DAR·STELLEN",
  "ERKENNEN",
  "ENTWICKELN",
  "REDEN",
  "AUS·SEHEN",
  "ERSCHEINEN",
  "BILDEN",
  "AN·FANGEN",
  "ERWARTEN",
  "WOHNEN",
  "BETREFFEN",
  "WARTEN",
  "VERGEHEN",
  "HELFEN",
  "GEWINNEN",
  "SCHLIESSEN",
  "FÜHLEN",
  "BIETEN",
  "INTERESSIEREN",
  "ERINNERN",
  "ERGEBEN",
  "AN·BIETEN",
  "STUDIEREN",
  "VERBINDEN",
  "AN·SEHEN",
  "FEHLEN",
  "BEDEUTEN",
  "VERGLEICHEN",
]
};
let Adverbs = {
English: [
"ABNORMALLY",
"ABSENTMINDEDLY",
"ACCIDENTALLY",
"ACTUALLY",
"ADVENTUROUSLY",
"AFTERWARDS",
"ALMOST",
"ALWAYS",
"ANNUALLY",
"ANXIOUSLY",
"ARROGANTLY",
"AWKWARDLY",
"BASHFULLY",
"BEAUTIFULLY",
"BITTERLY",
"BLEAKLY",
"BLINDLY",
"BLISSFULLY",
"BOASTFULLY",
"BOLDLY",
"BRAVELY",
"BRIEFLY",
"BRIGHTLY",
"BRISKLY",
"BROADLY",
"BUSILY",
"CALMLY",
"CAREFULLY",
"CARELESSLY",
"CAUTIOUSLY",
"CERTAINLY",
"CHEERFULLY",
"CLEARLY",
"CLEVERLY",
"CLOSELY",
"COAXINGLY",
"COLORFULLY",
"COMMONLY",
"CONTINUALLY",
"COOLLY",
"CORRECTLY",
"COURAGEOUSLY",
"CROSSLY",
"CRUELLY",
"CURIOUSLY",
"DAILY",
"DAINTILY",
"DEARLY",
"DECEIVINGLY",
"DEEPLY",
"DEFIANTLY",
"DELIBERATELY",
"DELIGHTFULLY",
"DILIGENTLY",
"DIMLY",
"DOUBTFULLY",
"DREAMILY",
"EASILY",
"ELEGANTLY",
"ENERGETICALLY",
"ENORMOUSLY",
"ENTHUSIASTICALLY",
"EQUALLY",
"ESPECIALLY",
"EVEN",
"EVENLY",
"EVENTUALLY",
"EXACTLY",
"EXCITEDLY",
"EXTREMELY",
"FAIRLY",
"FAITHFULLY",
"FAMOUSLY",
"FAR",
"FAST",
"FATALLY",
"FEROCIOUSLY",
"FERVENTLY",
"FIERCELY",
"FONDLY",
"FOOLISHLY",
"FORTUNATELY",
"FRANKLY",
"FRANTICALLY",
"FREELY",
"FRENETICALLY",
"FRIGHTFULLY",
"FULLY",
"FURIOUSLY",
"GENERALLY",
"GENEROUSLY",
"GENTLY",
"GLADLY",
"GLEEFULLY",
"GRACEFULLY",
"GRATEFULLY",
"GREATLY",
"GREEDILY",
"HAPPILY",
"HASTILY",
"HEALTHILY",
"HEAVILY",
"HELPFULLY",
"HELPLESSLY",
"HIGHLY",
"HONESTLY ",
"HOURLY",
"HUNGRILY",
"IMMEDIATELY",
"INNOCENTLY",
"INQUISITIVELY",
"INSTANTLY",
"INTENSELY",
"INTENTLY",
"INTERESTINGLY",
"INWARDLY",
"IRRITABLY",
"JAGGEDLY",
"JEALOUSLY",
"JOVIALLY",
"JOYFULLY",
"JOYOUSLY",
"JUBILANTLY",
"JUDGMENTALLY",
"JUSTLY",
"KEENLY",
"KIDDINGLY",
"KINDHEARTEDLY",
"KINDLY",
"KNAVISHLY",
"KNOWINGLY",
"KNOWLEDGEABLY",
"KOOKILY",
"LAZILY",
"LES",
"LIGHTLY",
"LIKELY",
"LIMPLY",
"LIVELY",
"LOFTILY",
"LONGINGLY",
"LOOSELY",
"LOUDLY",
"LOVINGLY",
"LOYALLY",
"MADLY",
"MAJESTICALLY",
"MEANINGFULLY",
"MECHANICALLY",
"MERRILY",
"MISERABLY",
"MOCKINGLY",
"MONTHLY",
"MORE",
"MORTALLY",
"MOSTLY",
"MYSTERIOUSLY",
"NATURALLY",
"HOPELESSLY",
"HOURLY",
"HUNGRILY",
"IMMEDIATELY",
"INNOCENTLY",
"INQUISITIVELY",
"INSTANTLY",
"INTENSELY",
"INTENTLY",
"INTERESTINGLY",
"INWARDLY",
"IRRITABLY",
"JAGGEDLY",
"JEALOUSLY",
"JOVIALLY",
"JOYFULLY",
"JOYOUSLY",
"JUBILANTLY",
"JUDGMENTALLY",
"JUSTLY",
"KEENLY",
"KIDDINGLY",
"KINDHEARTEDLY",
"KINDLY",
"KNAVISHLY",
"KNOWINGLY",
"KNOWLEDGEABLY",
"KOOKILY",
"LAZILY",
"LESS",
"LIGHTLY",
"LIKELY",
"LIMPLY",
"LIVELY",
"LOFTILY",
"LONGINGLY",
"LOOSELY",
"LOUDLY",
"LOVINGLY",
"LOYALLY",
"MADLY",
"MAJESTICALLY",
"MEANINGFULLY",
"MECHANICALLY",
"MERRILY",
"MISERABLY",
"MOCKINGLY",
"MONTHLY",
"MORE",
"MORTALLY",
"MOSTLY",
"MYSTERIOUSLY",
"NATURALLY ",
"NEARLY",
"NEATLY",
"NERVOUSLY",
"NEVER",
"NICELY",
"NOISILY",
"NOT",
"OBEDIENTLY",
"OBNOXIOUSLY",
"ODDLY",
"OFFENSIVELY",
"OFFICIALLY",
"OFTEN",
"ONLY",
"OPENLY",
"OPTIMISTICALLY",
"OVERCONFIDENTLY",
"PAINFULLY",
"PARTIALLY",
"PATIENTLY",
"PERFECTLY",
"PHYSICALLY",
"PLAYFULLY",
"POLITELY",
"POORLY",
"POSITIVELY",
"POTENTIALLY",
"POWERFULLY",
"PROMPTLY",
"PROPERLY",
"PUNCTUALLY",
"QUAINTLY",
"QUEASILY",
"QUEERLY",
"QUESTIONABLY",
"QUICKER",
"QUICKLY",
"QUIETLY",
"QUIRKILY",
"QUIZZICALLY",
"RANDOMLY",
"RAPIDLY",
"RARELY",
"READILY",
"REALLY",
"REASSURINGLY",
"RECKLESSLY",
"REGULARLY",
"RELUCTANTLY",
"REPEATEDLY",
"REPROACHFULLY",
"RESTFULLY",
"RIGHTEOUSLY",
"RIGHTFULLY",
"RIGIDLY",
"ROUGHLY",
"RUDELY",
"SAFELY",
"SCARCELY",
"SCARILY",
"SEARCHINGLY",
"SEDATELY",
"SEEMINGLY",
"SELDOM",
"SELFISHLY",
"SEPARATELY",
"SERIOUSLY",
"SHAKILY",
"SHARPLY",
"SHEEPISHLY",
"SHRILLY",
"SHYLY",
"SILENTLY",
"SLEEPILY",
"SLOWLY",
"SMOOTHLY",
"SOFTLY",
"SOLEMNLY",
"SOLIDLY",
"SOMETIMES",
"SOON",
"SPEEDILY",
"STEALTHILY",
"STERNLY",
"STRICTLY",
"SUCCESSFULLY",
"SUDDENLY",
"SUPPOSEDLY",
"SURPRISINGLY",
"SUSPICIOUSLY",
"SWEETLY",
"SWIFTLY",
"SYMPATHETICALLY",
"TENDERLY",
"TENSELY",
"TERRIBLY",
"THANKFULLY",
"THOROUGHLY",
"THOUGHTFULLY",
"TIGHTLY",
"TOMORROW",
"TOO",
"TREMENDOUSLY",
"TRIUMPHANTLY",
"TRULY",
"TRUTHFULLY",
"ULTIMATELY",
"UNABASHEDLY",
"UNACCOUNTABLY",
"UNBEARABLY",
"UNETHICALLY",
"UNEXPECTEDLY",
"UNFORTUNATELY",
"UNIMPRESSIVELY",
"UNNATURALLY",
"UNNECESSARILY",
"UPBEAT",
"UPRIGHT",
"UPSIDE-DOWN",
"UPWARD",
"URGENTLY",
"USEFULLY",
"USELESSLY",
"USUALLY",
"UTTERLY",
"VACANTLY",
"VAGUELY",
"VAINLY",
"VALIANTLY",
"VASTLY",
"VERBALLY",
"VERY",
"VICIOUSLY",
"VICTORIOUSLY",
"VIOLENTLY",
"VIVACIOUSLY",
"VOLUNTARILY",
"WARMLY",
"WEAKLY",
"WEARILY",
"WELL",
"WETLY",
"WHOLLY",
"WILDLY",
"WILLFULLY",
"WISELY",
"WOEFULLY",
"WONDERFULLY",
"WORRIEDLY",
"WRONGLY",
"YAWNINGLY",
"YEARLY",
"YEARNINGLY",
"YESTERDAY",
"YIELDINGLY",
"YOUTHFULLY",
"ZEALOUSLY",
"ZESTFULLY",
"ZESTILY "
],
German: [
"ABNORM",
"GEISTESABWESEND",
"VERSEHENTLICH",
"EIGENTLICH",
"ABENTEUERLICH",
"NACHHER",
"FAST",
"STETS",
"JÄHRLICH",
"BESORGT",
"ARROGANT",
"UNBEHOLFEN",
"SCHÜCHTERN",
"SCHÖN",
"BITTERLICH",
"DÜSTER",
"BLINDLINGS",
"SELIG",
"PRAHLERISCH",
"KÜHN",
"TAPFER",
"KNAPP",
"HELL",
"LEBHAFT",
"BREIT",
"BESCHÄFTIGT",
"RUHIG",
"SORGFÄLTIG",
"NACHLÄSSIG",
"VORSICHTIG",
"BESTIMMT",
"FRÖHLICH",
"DEUTLICH",
"GESCHICKT",
"ENG",
"SCHMEICHELND",
"FARBENFROH",
"HÄUFIG",
"STÄNDIG",
"KÜHL",
"KORREKT",
"MUTIG",
"BÖSE",
"GRAUSAM",
"NEUGIERIG",
"TÄGLICH",
"ZIERLICH",
"TEUER",
"TÄUSCHEND",
"TIEF",
"TROTZIG",
"BEWUSST",
"ENTZÜCKEND",
"FLEISSIG",
"SCHWACH",
"ZWEIFELHAFT",
"VERTRÄUMT",
"LEICHT",
"ELEGANT",
"ENERGISCH",
"ENORM",
"BEGEISTERT",
"GLEICHERMASSEN",
"BESONDERS",
"AUCH",
"GLEICHMÄSSIG",
"LETZTLICH",
"EXAKT",
"AUFGEREGT",
"ÄUSSERST",
"ZIEMLICH",
"TREU",
"BERÜHMT",
"WEIT",
"SCHNELL",
"TÖDLICH",
"WILD",
"INBRÜNSTIG",
"HEFTIG",
"LIEBEVOLL",
"TÖRICHT",
"GLÜCKLICHERWEISE",
"GERADEHERAUS",
"HEKTISCH",
"FREI",
"FRENETISCH",
"SCHRECKLICH",
"VÖLLIG",
"WÜTEND",
"ALLGEMEIN",
"GROSSZÜGIG",
"SANFT",
"GERN",
"FRÖHLICH",
"ANMUTIG",
"DANKBAR",
"SEHR",
"GIERIG",
"GLÜCKLICH",
"HASTIG",
"GESUND",
"SCHWER",
"HILFREICH",
"HILFLOS",
"HÖCHST",
"EHRLICH",
"STÜNDLICH",
"HUNGRIG",
"SOFORT",
"UNSCHULDIG",
"NEUGIERIG",
"SOFORT",
"INTENSIV",
"AUFMERKSAM",
"INTERESSANT",
"INNERLICH",
"GEREIZT",
"ZACKIG",
"EIFERSÜCHTIG",
"JOVIAL",
"FREUDIG",
"FREUDIG",
"JUBELND",
"WERTEND",
"MIT RECHT",
"SCHARF",
"SCHERZHAFT",
"GUTHERZIG",
"FREUNDLICH",
"SCHELMISCH",
"WISSENTLICH",
"KENNTNISREICH",
"VERRÜCKT",
"TRÄGE",
"LES",
"LEICHT",
"WAHRSCHEINLICH",
"SCHLAFF",
"LEBHAFT",
"ERHABEN",
"SEHNSÜCHTIG",
"LOSE",
"LAUT",
"LIEBEVOLL",
"LOYAL",
"VERRÜCKT",
"MAJESTÄTISCH",
"SINNVOLL",
"MECHANISCH",
"FRÖHLICH",
"KLÄGLICH",
"SPÖTTISCH",
"MONATLICH",
"MEHR",
"TÖDLICH",
"MEIST",
"GEHEIMNISVOLL",
"NATÜRLICH",
"HOFFNUNGSLOS",
"STÜNDLICH",
"HUNGRIG",
"SOFORT",
"UNSCHULDIG",
"NEUGIERIG",
"SOFORT",
"INTENSIV",
"AUFMERKSAM",
"INTERESSANT",
"INNERLICH",
"GEREIZT",
"ZACKIG",
"EIFERSÜCHTIG",
"JOVIAL",
"FREUDIG",
"FREUDIG",
"JUBELND",
"WERTEND",
"MIT RECHT",
"SCHARF",
"SCHERZHAFT",
"GUTHERZIG",
"FREUNDLICH",
"SCHELMISCH",
"WISSENTLICH",
"KENNTNISREICH",
"VERRÜCKT",
"TRÄGE",
"WENIGER",
"LEICHT",
"WAHRSCHEINLICH",
"SCHLAFF",
"LEBHAFT",
"ERHABEN",
"SEHNSÜCHTIG",
"LOSE",
"LAUT",
"LIEBEVOLL",
"LOYAL",
"VERRÜCKT",
"MAJESTÄTISCH",
"SINNVOLL",
"MECHANISCH",
"FRÖHLICH",
"KLÄGLICH",
"SPÖTTISCH",
"MONATLICH",
"MEHR",
"TÖDLICH",
"MEIST",
"GEHEIMNISVOLL",
"NATÜRLICH",
"FAST",
"ORDENTLICH",
"NERVÖS",
"NOCH NIE",
"SCHÖN",
"GERÄUSCHVOLL",
"NICHT",
"GEHORSAM",
"WIDERLICH",
"SELTSAM",
"OFFENSIV",
"OFFIZIELL",
"OFT",
"NUR",
"OFFEN",
"OPTIMISTISCH",
"ÜBERMÜTIG",
"SCHMERZLICH",
"TEILWEISE",
"GEDULDIG",
"PERFEKT",
"PHYSISCH",
"SPIELERISCH",
"HÖFLICH",
"SCHLECHT",
"POSITIV",
"MÖGLICHERWEISE",
"KRAFTVOLL",
"SOFORT",
"RICHTIG",
"PÜNKTLICH",
"URIG",
"MULMIG",
"SELTSAM",
"FRAGLICH",
"SCHNELLER",
"SCHNELL",
"RUHIG",
"SCHRULLIG",
"FRAGEND",
"NACH DEM ZUFALLSPRINZIP",
"SCHNELL",
"SELTEN",
"LEICHT",
"JA WIRKLICH",
"BERUHIGEND",
"RÜCKSICHTSLOS",
"REGELMÄSSIG",
"WIDERWILLIG",
"WIEDERHOLT",
"VORWURFSVOLL",
"ERHOLSAM",
"GERECHT",
"RECHTMÄSSIG",
"STARR",
"GROB",
"GROB",
"SICHER",
"KAUM",
"BEÄNGSTIGEND",
"FORSCHEND",
"RUHIG",
"SCHEINBAR",
"SELTEN",
"EGOISTISCH",
"SEPARAT",
"ERNSTHAFT",
"WACKELIG",
"SCHARF",
"VERLEGEN",
"SCHRILL",
"SCHÜCHTERN",
"SCHWEIGEND",
"SCHLÄFRIG",
"LANGSAM",
"GLATT",
"LEISE",
"FEIERLICH",
"FEST",
"MANCHMAL",
"BALD",
"SCHNELL",
"HEIMLICH",
"STRENG",
"STRENG",
"ERFOLGREICH",
"PLÖTZLICH",
"ANGEBLICH",
"ÜBERRASCHENDERWEISE",
"VERDÄCHTIG",
"SÜSS",
"SCHNELL",
"MITFÜHLEND",
"ZÄRTLICH",
"GESPANNT",
"FÜRCHTERLICH",
"GOTT SEI DANK",
"GRÜNDLICH",
"NACHDENKLICH",
"DICHT",
"MORGEN",
"AUCH",
"ENORM",
"TRIUMPHIEREND",
"WIRKLICH",
"WAHRHEITSGEMÄSS",
"LETZTEN ENDES",
"UNVERFROREN",
"UNERKLÄRLICHERWEISE",
"UNERTRÄGLICH",
"UNETHISCH",
"UNERWARTET",
"BEDAUERLICHERWEISE",
"UNSCHEINBAR",
"UNNATÜRLICH",
"UNNÖTIGERWEISE",
"OPTIMISTISCH",
"AUFRECHT",
"KOPFÜBER",
"NACH OBEN",
"DRINGEND",
"NÜTZLICH",
"NUTZLOS",
"MEISTENS",
"VOLLKOMMEN",
"FREI",
"VAGE",
"VERGEBLICH",
"TAPFER",
"ERHEBLICH",
"MÜNDLICH",
"SEHR",
"BÖSARTIG",
"SIEGREICH",
"HEFTIG",
"LEBHAFT",
"FREIWILLIG",
"HERZLICH",
"SCHWACH",
"MÜDE",
"GUT",
"NASS",
"GANZ",
"WILD",
"ABSICHTLICH",
"WEISE",
"ERBÄRMLICH",
"WUNDERBAR",
"BESORGT",
"ZU UNRECHT",
"GÄHNEND",
"JÄHRLICH",
"SEHNSÜCHTIG",
"GESTERN",
"NACHGIEBIG",
"JUGENDLICH",
"EIFRIG",
"SCHWUNGVOLL",
"LEBHAFT"
]
}

let Prepositions = {
German: ['BIS', 'BIS@1', 'BIS@2', 'BIS@3', 'DURCH', 'DURCH@1', 'ENTLANG', 'ENTLANG@1', 'FÜR', 'GEGEN', 'GEGEN@1', 'OHNE', 'UM', 'UM@1', 'AUS', 'AUS@1', 'BEI', 'BEI@1', 'MIT', 'NACH', 'NACH@1', 'SEIT', 'SEIT@1', 'VON', 'VON@1', 'ZU', 'AN', 'AN@1', 'AUF', 'AUF@1', 'HINTER', 'IN', 'IN@1', 'NEBEN'],
English: ['BY', 'TO@1', 'UNTIL', 'UP TO', 'THROUGH', 'ACROSS', 'ALONG', 'DOWN', 'FOR', 'AGAINST', 'FOR@1', 'WITHOUT', 'AT', 'AROUND', 'FORM', 'OUT OF', 'AT@2', 'NEAR', 'WITH', 'AFTER', 'TO@3', 'SINCE', 'FOR@1', 'FROM', 'OF', 'TO@4', 'TO@0', 'ON', 'ON@0', 'UPON', 'BEHIND', 'IN', 'INTO', 'NEXT TO']
}
let QuestionWords = {
English : ['HOW','WHAT','WHEN','WHERE','WHY','WHERE TO','WHO','SINCE WHEN','HOW LONG','ABOUT WHICH','BY WHICH','WHICH','WHOSE','HOW MUCH','HOW MANY','WITH WHOM','BY WHAT','IS THERE','WHEREBY'],
German: ["WIE", 'WAS','WANN','WO','WARUM','WOHIN','WER','SEIT WANN', 'WIE LANGE','WORÜBER',"WORAN", 'WELCHE','WESSEN','WIE VIEL','WIE VIELE','MIT WEM','WOMIT','GIBT ES','WODURCH']
}

let Conjunctions = {
English: ['LIKE','BUT', 'BECAUSE', ' AFTER ALL, BUT', ' NATURALLY, OF COURSE', 'ALTHOUGH, EVEN THOUGH', ' OTHERWISE, OR', ' BECAUSE ', ' FOR EXAMPLE', ' AT FIRST, AT THE BEGINNING', ' LASTLY, FINALLY, IN THE END', ' SUDDENLY, AT ONCE', ' SOON, SHORTLY', ' UP UNTIL NOW, SO FAR', ' BACK THEN', ' AFTER, AFTERWARD', ' THEN ', ' MORE LIKELY, RATHER', ' BACK THEN, EARLIER, PREVIOUSLY', ' AT THE SAME TIME, SIMULTANEOUSLY', ' STILL', ' IN THE FUTURE', ' MEANWHILE, IN THE MEANTIME', 
'NOW', ' MEANWHILE, FOR THE TIME BEING', 'AFTER', ' LATER, AFTERWARD', ' RECENTLY', 'STILL', ' SUDDENLY', ' EVENTUALLY, AFTER ALL, ULTIMATELY', ' SINCE THEN', ' AS SOON AS', ' RECENTLY, LATELY', ' FIRST, AT FIRST', ' AT THE END, LAST', ' FOR THE FIRST/SECOND TIME', ' FOR NOW, FIRST OF ALL', ' ON THE OTHER HAND', ' ON THE ONE HAND', ' DEFINITELY, IN ANY CASE', ' FOR THIS REASON', ' IT SEEMS TO ME THAT…', ' SO TO SPEAK, IN A MATTER OF SPEAKING', ' HENCE, SO', 
'IN ADDITION, BESIDES', ' FOR EXAMPLE', ' THAT MEANS', "THAT'S WHY", ' ON THE CONTRARY', ' AFTER ALL, AT LEAST', ' WHEREBY', ' AT LEAST', ' THEREFORE, BECAUSE OF THAT', ' CONSEQUENTLY, SUBSEQUENTLY, WITH REGARD TO', ' FURTHERMORE, IN ADDITION', ' NEVERTHELESS, YET, STILL', ' ESSENTIALLY, FUNDAMENTALLY', ' MEANWHILE', ' INSTEAD ', ' JUST', ' ONCE', ' ONLY', ' BASICALLY', ' OVERALL ', ' IN A NUTSHELL ', ' ACTUALLY, REALLY', ' NEVERTHELESS, NONETHELESS', 'BY THE WAY', ' FURTHER', 'AT LEAST', 'MOSTLY'],
German: ['WIE, GLEICH, ÄHNLICH','ABER', 'DENN', 'DOCH', 'NATÜRLICH', 'OBWOHL', 'SONST', 'WEIL', 'ZUM BEISPIEL', 'AM ANFANG, ANFANGS', 'AM ENDE, ENDLICH, ZUM SCHLUSS, SCHLIESSLICH', 'AUF EINMAL', 'BALD', 'BISHER', 'DAMALS', 'DANACH', 'DANN', 'EHER', 'FRÜHER, VORHER', 'GLEICHZEITIG, ZUR GLEICHEN ZEIT', 'IMMER NOCH', 'IN DER ZUKUNFT, ZUKÜNFTIG', 'INZWISCHEN', 'JETZT', 'MITTLERWEILE, UNTERDESSEN', 'NACHDEM', 'NACHHER', 'NEULICH',
'NOCH ', 'PLÖTZLICH', 'SCHLIESSLICH', 'SEITDEM, SEITHER', 'SOBALD ', 'VOR KURZEM', 'ZUERST', 'ZULETZT', 'ZUM ERSTEN/ZWEITEN MAL', 'ZUNÄCHST', 'AUF DER ANDEREN SEITE, ANDERERSEITS', 'AUF DER EINEN SEITE, EINERSEITS', 'AUF JEDEN FALL, JEDENFALLS', 'AUS DIESEM GRUND', 'ES SCHEINT MIR, DASS', 
'SOZUSAGEN', 'ALSO', 'AUSSERDEM', 'BEISPIELSWEISE, ZUM BEISPIEL', 'DAS HEISST', 'DESHALB, DESWEGEN', 'GANZ IM GEGENTEIL', 'IMMERHIN', 'WOBEI', 'ZUMINDEST ', 'DAHER, DARUM ', 'DARAUFHIN ', 'DARÜBER HINAUS', 'DENNOCH, JEDOCH', 'IM WESENTLICHEN', 'INDESSEN ', 
'STATTDESSEN', 'EBEN, GERADE', 'EINMAL', 'ERST', 'GRUNDSÄTZLICH', 'IM GROSSEN UND GANZEN', 'KURZ GESAGT', 'TATSÄCHLICH', 'TROTZDEM', 'ÜBRIGENS ', 'WEITER', 'WENIGSTENS', 'ZUMEIST'],
}

let Pronouns = {
English: ['I', 'YOU@0', 'YOU', 'HE', 'SHE', 'WE', 'THEY', 'ME', 'ME@0', 'YOU', 'YOU@0', 'YOU@1', 'YOU@2', 'HIM', 'HIM', 'HER', 'HER@0', 'US', 'THEM', 'THEM@1', 'MY@0', 'MY', 'YOUR', 'YOUR@1', 'YOUR', 'YOUR@2', 'HIS', 'HIS@0', 'HER', 'HER@1', 'OUR', 'THEIR', 'THEIR@3', 'MINE', 'YOURS', 'HIS@5', 'OURS@6'],
German: ['ICH', 'DU', 'SIE', 'ER', 'SIE@2', 'WIR', 'SIE', 'MIR', 'MICH', 'DIR', 'DICH', 'IHNEN', 'SIE@3', 'IHM', 'IHN', 'IHR', 'SIE@1', 'UNS', 'INHEN@3', 'SIE@1', 'MEIN', 'MEINE', 'DEIN', 'DEINE', 'IHR@2', 'IHRE@1', 'SEIN@4', 'SEINE@6', 'IHR@0', 'IHRE@1', 'MEINS@1', 'DEINS@9', 'IHRES@4', 'SEINS', 'IHRES', 'UNSERES', 'IHRES@5'],
}

let irregularVerbs = {
 verbs: [
    "BACKEN",
    "BEFEHLEN",
    "BEGINNEN",
    "BEISSEN",
    "BETRÜGEN",
    "BEWEGEN",
    "BIEGEN",
    "BIETEN",
    "BINDEN",
    "BITTEN",
    "BLASEN",
    "BLEIBEN",
    "BRATEN",
    "BRECHEN",
    "BRENNEN",
    "BRINGEN",
    "DENKEN",
    "DÜRFEN",
    "EMPFEHLEN",
    "ERSCHRECKEN",
    "ESSEN",
    "FAHREN",
    "FALLEN",
    "FANGEN",
    "FINDEN",
    "FLIEGEN",
    "FLIEHEN",
    "FLIESSEN",
    "FRESSEN",
    "FRIEREN",
    "GEBEN",
    "GEDEIHEN",
    "GEHEN",
    "GELINGEN4",
    "GELTEN",
    "GENIESSEN",
    "GERATEN",
    "GESCHEHEN7",
    "GEWINNEN",
    "GIESSEN",
    "GLEICHEN",
    "GLEITEN",
    "GRABEN",
    "GREIFEN",
    "HABEN",
    "HALTEN8",
    "HÄNGEN9",
    "HEBEN",
    "HEISSEN",
    "HELFEN",
    "KENNEN",
    "KLINGEN",
    "KOMMEN",
    "KÖNNEN",
    "KRIECHEN",
    "LADEN",
    "LASSEN",
    "LAUFEN",
    "LEIDEN",
    "LEIHEN",
    "LESEN",
    "LIEGEN",
    "LÜGEN",
    "MESSEN",
    "MÖGEN",
    "MÜSSEN",
    "NEHMEN",
    "NENNEN",
    "PFEIFEN",
    "RATEN",
    "REIBEN",
    "REISSEN",
    "REITEN",
    "RENNEN",
    "RIECHEN",
    "RUFEN",
    "SCHEIDEN",
    "SCHEINEN",
    "SCHIEBEN",
    "SCHIESSEN",
    "SCHLAFEN",
    "SCHLAGEN",
    "SCHLIESSEN",
    "SCHNEIDEN",
    "SCHREIBEN",
    "SCHREIEN",
    "SCHWEIGEN",
    "SCHWELLEN",
    "SCHWIMMEN",
    "SCHWINGEN",
    "SCHWÖREN",
    "SEHEN",
    "SEIN",
    "SENDEN",
    "SINGEN",
    "SINKEN",
    "SITZEN",
    "SOLLEN",
    "SPRECHEN",
    "SPRINGEN",
    "STECHEN",
    "STEHEN",
    "STEHLEN",
    "STEIGEN",
    "STERBEN",
    "STINKEN",
    "STOSSEN",
    "STREITEN",
    "TRAGEN",
    "TREFFEN",
    "TREIBEN",
    "TRETEN",
    "TRINKEN",
    "TUN",
    "VERBERGEN",
    "VERDERBEN",
    "VERGESSEN",
    "VERLASSEN",
    "VERLIEREN",
    "VERMEIDEN",
    "VERSCHWINDEN",
    "VERZEIHEN",
    "WACHSEN",
    "WASCHEN",
    "WENDEN",
    "WERBEN",
    "WERDEN",
    "WERFEN",
    "WIEGEN",
    "WISSEN",
    "WOLLEN",
    "ZIEHEN",
    "ZWINGEN"
],
present:[
    "backt",
    "befiehlt",
    "beginnt",
    "beißt",
    "betrügt",
    "bewegt",
    "biegt",
    "bietet",
    "bindet",
    "bittet",
    "bläst",
    "bleibt",
    "brät",
    "bricht",
    "brennt",
    "bringt",
    "denkt",
    "darf",
    "empfiehlt",
    "erschrickt",
    "isst",
    "fährt",
    "fällt",
    "fängt",
    "findet",
    "fliegt",
    "flieht",
    "fließt",
    "frisst",
    "friert",
    "gibt",
    "gedeiht",
    "geht",
    "gelingt",
    "gilt",
    "genießt",
    "gerät",
    "geschieht",
    "gewinnt",
    "gießt",
    "gleicht",
    "gleitet",
    "gräbt",
    "greift",
    "hat",
    "hält",
    "hängt",
    "hebt",
    "heißt",
    "hilft",
    "kennt",
    "klingt",
    "kommt",
    "kann",
    "kriecht",
    "lädt",
    "lässt",
    "läuft",
    "leidet",
    "leiht",
    "liest",
    "liegt",
    "lügt",
    "misst",
    "mag",
    "muss",
    "nimmt",
    "nennt",
    "pfeift",
    "rät",
    "reibt",
    "reißt",
    "reitet",
    "rennt",
    "riecht",
    "ruft",
    "scheidet",
    "scheint",
    "schiebt",
    "schießt",
    "schläft",
    "schlägt",
    "schließt",
    "schneidet",
    "schreibt",
    "schreit",
    "schweigt",
    "schwillt",
    "schwimmt",
    "schwingt",
    "schwört",
    "sieht",
    "ist",
    "sendet",
    "singt",
    "sinkt",
    "sitzt",
    "soll",
    "spricht",
    "springt",
    "sticht",
    "steht",
    "stiehlt",
    "steigt",
    "stirbt",
    "stinkt",
    "stößt",
    "streitet",
    "trägt",
    "trifft",
    "treibt",
    "tritt",
    "trinkt",
    "tut",
    "verbirgt",
    "verdirbt",
    "vergisst",
    "verlässt",
    "verliert",
    "vermeidet",
    "verschwindet",
    "verzeiht",
    "wächst",
    "wäscht",
    "wendet",
    "wirbt",
    "wird",
    "wirft",
    "wiegt",
    "weiß18",
    "will",
    "zieht",
    "zwingt"
],
imperfect:[
    "backte",
    "befahl",
    "begann",
    "biss",
    "betrog",
    "bewog",
    "bog",
    "bot",
    "band",
    "bat",
    "blies",
    "blieb",
    "briet",
    "brach",
    "brannte",
    "brachte",
    "dachte",
    "durfte",
    "empfahl",
    "erschrak",
    "aß",
    "fuhr",
    "fiel",
    "fing",
    "fand",
    "flog",
    "floh",
    "floss",
    "fraß",
    "fror",
    "gab",
    "gedieh",
    "ging",
    "gelang",
    "galt",
    "genoss",
    "geriet",
    "geschah",
    "gewann",
    "goss",
    "glich",
    "glitt",
    "grub",
    "griff",
    "hatte",
    "hielt",
    "hing",
    "hob",
    "hieß",
    "half",
    "kannte",
    "klang",
    "kam",
    "konnte",
    "kroch",
    "lud",
    "ließ",
    "lief",
    "litt",
    "lieh",
    "las",
    "lag",
    "log",
    "maß",
    "mochte",
    "musste",
    "nahm",
    "nannte",
    "pfiff",
    "riet",
    "rieb",
    "riss",
    "ritt",
    "rannte",
    "roch",
    "rief",
    "schied",
    "schien",
    "schob",
    "schoss",
    "schlief",
    "schlug",
    "schloss",
    "schnitt",
    "schrieb",
    "schrie",
    "schwieg",
    "schwoll",
    "schwamm",
    "schwang",
    "schwur",
    "sah",
    "war",
    "sandte",
    "sang",
    "sank",
    "saß",
    "sollte",
    "sprach",
    "sprang",
    "stach",
    "stand",
    "stahl",
    "stieg",
    "starb",
    "stank",
    "stieß",
    "stritt",
    "trug",
    "traf",
    "trieb",
    "trat",
    "trank",
    "tat",
    "verbarg",
    "verdarb",
    "vergaß",
    "verließ",
    "verlor",
    "vermied",
    "verschwand",
    "verzieh",
    "wuchs",
    "wusch",
    "wandte",
    "warb",
    "wurde",
    "warf",
    "wog",
    "wusste",
    "wollte",
    "zog",
    "zwang"
],
pp : [
    "gebacken",
    "befohlen",
    "begonnen",
    "gebissen",
    "betrogen",
    "bewogen",
    "gebogen",
    "geboten",
    "gebunden",
    "gebeten",
    "geblasen",
    "geblieben",
    "gebraten",
    "gebrochen",
    "gebrannt",
    "gebracht",
    "gedacht",
    "gedurft",
    "empfohlen",
    "erschrocken",
    "gegessen",
    "gefahren",
    "gefallen",
    "gefangen",
    "gefunden",
    "geflogen",
    "geflohen",
    "geflossen",
    "gefressen",
    "gefroren",
    "gegeben",
    "gediehen",
    "gegangen",
    "gelungen",
    "gegolten",
    "genossen",
    "geraten",
    "geschehen",
    "gewonnen",
    "gegossen",
    "geglichen",
    "geglitten",
    "gegraben",
    "gegriffen",
    "gehabt",
    "gehalten",
    "gehangen",
    "gehoben",
    "geheißen",
    "geholfen",
    "gekannt",
    "geklungen",
    "gekommen",
    "gekonnt",
    "gekrochen",
    "geladen",
    "gelassen",
    "gelaufen",
    "gelitten",
    "geliehen",
    "gelesen",
    "gelegen",
    "gelogen",
    "gemessen",
    "gemocht",
    "gemusst",
    "genommen",
    "genannt",
    "gepfiffen",
    "geraten",
    "gerieben",
    "gerissen",
    "geritten",
    "gerannt",
    "gerochen",
    "gerufen",
    "geschieden",
    "geschienen",
    "geschoben",
    "geschossen",
    "geschlafen",
    "geschlagen",
    "geschlossen",
    "geschnitten",
    "geschrieben",
    "geschrie(e)n",
    "geschwiegen",
    "geschwollen",
    "geschwommen",
    "geschwungen",
    "geschworen",
    "gesehen",
    "gewesen",
    "gesandt",
    "gesungen",
    "gesunken",
    "gesessen",
    "gesollt",
    "gesprochen",
    "gesprungen",
    "gestochen",
    "gestanden",
    "gestohlen",
    "gestiegen",
    "gestorben",
    "gestunken",
    "gestoßen",
    "gestritten",
    "getragen",
    "getroffen",
    "getrieben",
    "getreten",
    "getrunken",
    "getan",
    "verborgen",
    "verdorben",
    "vergessen",
    "verlassen",
    "verloren",
    "vermieden",
    "verschwunden",
    "verziehen",
    "gewachsen",
    "gewaschen",
    "gewandt",
    "geworben",
    "geworden",
    "geworfen",
    "gewogen",
    "gewusst",
    "gewollt",
    "gezogen",
    "gezwungen"
]
};
let common2000 ={
  German: [
  "ich",
  "sie",
  "das",
  "ist",
  "du",
  "nicht",
  "die",
  "und",
  "es",
  "der",
  "was",
  "wir",
  "er",
  "zu",
  "ein",
  "in",
  "mit",
  "mir",
  "den",
  "wie",
  "ja",
  "auf",
  "mich",
  "so",
  "eine",
  "aber",
  "hier",
  "sind",
  "für",
  "von",
  "haben",
  "hat",
  "dich",
  "war",
  "dass",
  "wenn",
  "an",
  "da",
  "nein",
  "bin",
  "noch",
  "dir",
  "nur",
  "habe",
  "ihr",
  "sich",
  "einen",
  "uns",
  "hast",
  "dem",
  "ihn",
  "aus",
  "kann",
  "gut",
  "auch",
  "schon",
  "jetzt",
  "im",
  "sein",
  "mal",
  "dann",
  "meine",
  "als",
  "um",
  "mein",
  "doch",
  "bist",
  "wird",
  "keine",
  "nach",
  "alles",
  "man",
  "lch",
  "oder",
  "nichts",
  "wo",
  "werden",
  "weiß",
  "will",
  "geht",
  "mehr",
  "warum",
  "hab",
  "ihnen",
  "bitte",
  "etwas",
  "bei",
  "muss",
  "los",
  "immer",
  "oh",
  "vor",
  "mann",
  "zum",
  "wieder",
  "sehr",
  "sehen",
  "sagen",
  "also",
  "gehen",
  "wer",
  "alle",
  "denn",
  "machen",
  "ihm",
  "können",
  "diese",
  "komm",
  "danke",
  "euch",
  "einem",
  "tun",
  "einer",
  "gibt",
  "nie",
  "über",
  "des",
  "soll",
  "kein",
  "vielleicht",
  "weg",
  "deine",
  "wissen",
  "am",
  "werde",
  "leben",
  "kommen",
  "kommt",
  "müssen",
  "viel",
  "wirklich",
  "frau",
  "hatte",
  "heute",
  "ok",
  "willst",
  "dein",
  "würde",
  "tut",
  "ihre",
  "ganz",
  "zeit",
  "bis",
  "wollen",
  "einfach",
  "macht",
  "gott",
  "zurück",
  "nun",
  "weil",
  "damit",
  "dieser",
  "kannst",
  "wurde",
  "gesagt",
  "wäre",
  "seine",
  "wollte",
  "na",
  "zwei",
  "hallo",
  "meinen",
  "sicher",
  "weißt",
  "sir",
  "morgen",
  "ab",
  "leid",
  "lassen",
  "hey",
  "waren",
  "zur",
  "lass",
  "e",
  "geld",
  "liebe",
  "tag",
  "leute",
  "vater",
  "genau",
  "sagte",
  "hätte",
  "mach",
  "raus",
  "durch",
  "lhr",
  "könnte",
  "schön",
  "wohl",
  "gesehen",
  "keinen",
  "klar",
  "glaube",
  "her",
  "okay",
  "mutter",
  "sag",
  "dieses",
  "nacht",
  "besser",
  "ohne",
  "unsere",
  "jemand",
  "sei",
  "reden",
  "gerade",
  "ob",
  "gehört",
  "geh",
  "möchte",
  "dort",
  "sagt",
  "anderen",
  "gemacht",
  "hör",
  "sollte",
  "selbst",
  "diesen",
  "gute",
  "dachte",
  "paar",
  "weiter",
  "vom",
  "ins",
  "herr",
  "wirst",
  "geben",
  "ordnung",
  "passiert",
  "meiner",
  "lange",
  "gar",
  "mädchen",
  "meinem",
  "hören",
  "sieht",
  "daß",
  "guten",
  "hin",
  "gleich",
  "ach",
  "diesem",
  "freund",
  "seit",
  "welt",
  "musst",
  "hause",
  "natürlich",
  "abend",
  "angst",
  "drei",
  "recht",
  "richtig",
  "viele",
  "deinen",
  "finden",
  "wieso",
  "bleiben",
  "tot",
  "unter",
  "junge",
  "haus",
  "rein",
  "essen",
  "davon",
  "nehmen",
  "sollen",
  "helfen",
  "schnell",
  "machst",
  "eines",
  "andere",
  "unser",
  "warte",
  "wegen",
  "menschen",
  "stimmt",
  "dafür",
  "darf",
  "kinder",
  "genug",
  "sonst",
  "ganze",
  "scheiße",
  "he",
  "halt",
  "sollten",
  "zusammen",
  "gegen",
  "jahre",
  "erst",
  "denke",
  "steht",
  "habt",
  "verdammt",
  "moment",
  "ihren",
  "glauben",
  "bringen",
  "gib",
  "seid",
  "niemand",
  "warten",
  "brauchen",
  "lhre",
  "fragen",
  "arbeit",
  "wann",
  "heißt",
  "sprechen",
  "siehst",
  "jeder",
  "kam",
  "sofort",
  "getan",
  "fertig",
  "kennen",
  "einmal",
  "sohn",
  "halten",
  "dabei",
  "hatten",
  "männer",
  "kind",
  "jahren",
  "beim",
  "seinen",
  "mag",
  "komme",
  "allein",
  "bevor",
  "bruder",
  "musik",
  "wahr",
  "konnte",
  "lieber",
  "uhr",
  "kopf",
  "sache",
  "gern",
  "denken",
  "brauche",
  "ende",
  "später",
  "gehe",
  "vergessen",
  "runter",
  "fahren",
  "sieh",
  "warst",
  "stadt",
  "namen",
  "problem",
  "sehe",
  "augen",
  "gab",
  "dank",
  "sage",
  "würden",
  "eins",
  "daran",
  "dazu",
  "egal",
  "frage",
  "weit",
  "familie",
  "sterben",
  "könnten",
  "jungs",
  "jeden",
  "minuten",
  "verstehe",
  "deiner",
  "hilfe",
  "beide",
  "bald",
  "all",
  "deinem",
  "nimm",
  "kleine",
  "baby",
  "glück",
  "freunde",
  "wusste",
  "verrückt",
  "ruhig",
  "land",
  "darüber",
  "gefunden",
  "tür",
  "mache",
  "seiner",
  "wasser",
  "auto",
  "sah",
  "dies",
  "eigentlich",
  "eure",
  "ruhe",
  "stehen",
  "hand",
  "ihrer",
  "frauen",
  "meinst",
  "töten",
  "fall",
  "ging",
  "polizei",
  "vorbei",
  "krieg",
  "je",
  "darauf",
  "vielen",
  "letzte",
  "lang",
  "bisschen",
  "dran",
  "hoch",
  "kenne",
  "fast",
  "ganzen",
  "schau",
  "sogar",
  "spielen",
  "wurden",
  "hinter",
  "teufel",
  "dinge",
  "keiner",
  "mama",
  "spät",
  "bekommen",
  "oben",
  "name",
  "hört",
  "hätten",
  "bereit",
  "drin",
  "neue",
  "kommst",
  "woher",
  "ihrem",
  "wagen",
  "arbeiten",
  "verstehen",
  "jahr",
  "tod",
  "etwa",
  "echt",
  "seinem",
  "geschichte",
  "bringt",
  "braucht",
  "treffen",
  "toll",
  "gerne",
  "draußen",
  "fünf",
  "lhnen",
  "zimmer",
  "job",
  "nett",
  "weiss",
  "the",
  "spiel",
  "verstanden",
  "miss",
  "große",
  "anders",
  "sorgen",
  "welche",
  "einzige",
  "art",
  "liegt",
  "verloren",
  "ahnung",
  "vier",
  "alter",
  "gekommen",
  "jemanden",
  "gehst",
  "woche",
  "kerl",
  "hi",
  "john",
  "gestern",
  "wenig",
  "bestimmt",
  "kurz",
  "überhaupt",
  "finde",
  "darum",
  "tage",
  "erste",
  "schwester",
  "schwer",
  "suchen",
  "bleibt",
  "tochter",
  "typ",
  "guter",
  "gewesen",
  "grund",
  "zeigen",
  "film",
  "schlecht",
  "schatz",
  "deshalb",
  "holen",
  "hoffe",
  "tu",
  "sagst",
  "bett",
  "muß",
  "seite",
  "gefällt",
  "eben",
  "lasst",
  "gefallen",
  "stunden",
  "herz",
  "wohin",
  "trinken",
  "letzten",
  "mensch",
  "ersten",
  "n",
  "unten",
  "gesicht",
  "versuchen",
  "wort",
  "denen",
  "verlassen",
  "endlich",
  "denkst",
  "solltest",
  "schlafen",
  "ziemlich",
  "jack",
  "dollar",
  "arsch",
  "manchmal",
  "fest",
  "wiedersehen",
  "beste",
  "kleinen",
  "kriegen",
  "läuft",
  "wahrheit",
  "zwischen",
  "niemals",
  "bring",
  "unserer",
  "nehme",
  "allen",
  "während",
  "glaubst",
  "ding",
  "idee",
  "wollten",
  "lässt",
  "musste",
  "sachen",
  "ah",
  "bleib",
  "kleiner",
  "euer",
  "nummer",
  "sondern",
  "frei",
  "oft",
  "entschuldigung",
  "wen",
  "ernst",
  "alte",
  "schule",
  "ort",
  "erzählt",
  "anderes",
  "new",
  "alt",
  "chance",
  "einige",
  "bloß",
  "entschuldigen",
  "setzen",
  "bedeutet",
  "erzählen",
  "feuer",
  "pass",
  "würdest",
  "schuld",
  "dad",
  "getötet",
  "jungen",
  "drauf",
  "platz",
  "wären",
  "tust",
  "papa",
  "spaß",
  "versucht",
  "wichtig",
  "besten",
  "sorge",
  "kennst",
  "lst",
  "hund",
  "blut",
  "hierher",
  "reicht",
  "alten",
  "wär",
  "glücklich",
  "brauchst",
  "hände",
  "unseren",
  "hättest",
  "kaum",
  "rede",
  "zuerst",
  "stellen",
  "beiden",
  "falls",
  "früh",
  "wartet",
  "neuen",
  "sechs",
  "jede",
  "freundin",
  "i",
  "lieben",
  "teil",
  "stunde",
  "langsam",
  "scheint",
  "früher",
  "großen",
  "waffe",
  "telefon",
  "himmel",
  "lernen",
  "you",
  "äh",
  "zehn",
  "gedacht",
  "willkommen",
  "frank",
  "luft",
  "licht",
  "hol",
  "seht",
  "menge",
  "voll",
  "überall",
  "tat",
  "erde",
  "gebe",
  "a",
  "ruf",
  "möglich",
  "spricht",
  "könig",
  "eltern",
  "außer",
  "nächsten",
  "ziehen",
  "wahrscheinlich",
  "wollt",
  "dürfen",
  "nennen",
  "falsch",
  "ehrlich",
  "irgendwas",
  "nächste",
  "wochen",
  "meines",
  "herren",
  "straße",
  "hm",
  "heiraten",
  "stück",
  "sam",
  "doktor",
  "neues",
  "gegeben",
  "kaffee",
  "möchten",
  "verstehst",
  "krank",
  "danach",
  "geworden",
  "arzt",
  "schaffen",
  "stelle",
  "groß",
  "wem",
  "hölle",
  "völlig",
  "weh",
  "s",
  "fehler",
  "drüben",
  "harry",
  "büro",
  "captain",
  "rufen",
  "irgendwie",
  "eigenen",
  "probleme",
  "allem",
  "mr",
  "wert",
  "tue",
  "buch",
  "lebt",
  "scheiß",
  "kaufen",
  "erinnern",
  "direkt",
  "laufen",
  "george",
  "trotzdem",
  "schreiben",
  "still",
  "kleines",
  "körper",
  "retten",
  "fand",
  "unserem",
  "solche",
  "denkt",
  "könnt",
  "ln",
  "alleine",
  "sitzen",
  "höre",
  "millionen",
  "tagen",
  "york",
  "suche",
  "vergiss",
  "gutes",
  "leider",
  "sagten",
  "typen",
  "schlüssel",
  "tragen",
  "mund",
  "worden",
  "hält",
  "zwar",
  "bereits",
  "leicht",
  "spielt",
  "schiff",
  "hörst",
  "lhren",
  "onkel",
  "glaub",
  "verlieren",
  "großer",
  "klingt",
  "irgendwo",
  "zukunft",
  "kennt",
  "plan",
  "schöne",
  "verschwinden",
  "interessiert",
  "waffen",
  "kämpfen",
  "party",
  "bringe",
  "hinten",
  "setz",
  "kumpel",
  "wolltest",
  "boden",
  "general",
  "zeig",
  "böse",
  "halte",
  "gegangen",
  "richtige",
  "liebling",
  "acht",
  "froh",
  "machte",
  "jedes",
  "hart",
  "vorsichtig",
  "joe",
  "versuch",
  "getroffen",
  "mögen",
  "zeug",
  "damals",
  "stimme",
  "gefühl",
  "leuten",
  "lesen",
  "mist",
  "zug",
  "hattest",
  "verdammte",
  "geschäft",
  "arschloch",
  "rest",
  "mom",
  "de",
  "aufhören",
  "könntest",
  "klasse",
  "lasse",
  "boss",
  "erklären",
  "fliegen",
  "laden",
  "stolz",
  "stark",
  "hasse",
  "wohnung",
  "gebracht",
  "fort",
  "genauso",
  "mai",
  "entschuldige",
  "besonders",
  "seien",
  "tages",
  "weniger",
  "zieh",
  "ärger",
  "fühle",
  "schauen",
  "idiot",
  "o",
  "schneller",
  "denk",
  "geschafft",
  "verzeihung",
  "daddy",
  "charlie",
  "tja",
  "schicken",
  "erwartet",
  "nachricht",
  "findet",
  "funktioniert",
  "werd",
  "stand",
  "traum",
  "sollst",
  "t",
  "fallen",
  "wovon",
  "gefängnis",
  "aufs",
  "hotel",
  "krankenhaus",
  "umbringen",
  "fällt",
  "redest",
  "weisst",
  "gottes",
  "total",
  "fenster",
  "lebens",
  "glaubt",
  "vorstellen",
  "and",
  "sinn",
  "ändern",
  "versuche",
  "heraus",
  "heißen",
  "tanzen",
  "monate",
  "lachen",
  "kampf",
  "nachdem",
  "arm",
  "wenigstens",
  "geschehen",
  "hörte",
  "kamen",
  "passt",
  "liebt",
  "folgen",
  "eher",
  "gefragt",
  "dumm",
  "deswegen",
  "solange",
  "lustig",
  "starb",
  "unmöglich",
  "bild",
  "boot",
  "genommen",
  "dame",
  "führen",
  "unglaublich",
  "vertrauen",
  "verletzt",
  "passieren",
  "cool",
  "meisten",
  "tom",
  "vorher",
  "plötzlich",
  "angerufen",
  "bewegung",
  "kümmern",
  "rüber",
  "komisch",
  "paris",
  "super",
  "sieben",
  "erinnere",
  "lhrer",
  "ne",
  "rufe",
  "bier",
  "augenblick",
  "herum",
  "kalt",
  "wunderbar",
  "großartig",
  "wahl",
  "auge",
  "fahr",
  "konnten",
  "länger",
  "m",
  "johnny",
  "tisch",
  "rum",
  "antwort",
  "jedem",
  "david",
  "arme",
  "umgebracht",
  "schlimm",
  "verheiratet",
  "steh",
  "anrufen",
  "worte",
  "möchtest",
  "vorsicht",
  "hilf",
  "bezahlt",
  "voller",
  "links",
  "sekunden",
  "werdet",
  "wärst",
  "liegen",
  "fühlen",
  "nochmal",
  "armee",
  "bitten",
  "gestorben",
  "finger",
  "meinung",
  "nimmt",
  "zahlen",
  "sicherheit",
  "verkaufen",
  "gesprochen",
  "wozu",
  "müde",
  "seele",
  "welcher",
  "schießen",
  "michael",
  "arbeite",
  "sitzt",
  "to",
  "sonne",
  "damen",
  "laß",
  "bezahlen",
  "selber",
  "reise",
  "team",
  "sobald",
  "meister",
  "majestät",
  "anfang",
  "fangen",
  "außerdem",
  "geschrieben",
  "sex",
  "hole",
  "kriegt",
  "yeah",
  "magst",
  "laut",
  "klappe",
  "amerika",
  "nahm",
  "niemanden",
  "gefährlich",
  "r",
  "mörder",
  "gewinnen",
  "gedanken",
  "obwohl",
  "monat",
  "mike",
  "arbeitet",
  "herrn",
  "behalten",
  "legen",
  "bob",
  "person",
  "herzen",
  "brief",
  "präsident",
  "rechts",
  "anfangen",
  "schluss",
  "hübsch",
  "don",
  "gewonnen",
  "wisst",
  "versprochen",
  "chef",
  "findest",
  "perfekt",
  "schlagen",
  "tatsächlich",
  "pferd",
  "dagegen",
  "erfahren",
  "monsieur",
  "mord",
  "paul",
  "nähe",
  "nötig",
  "wow",
  "aller",
  "offen",
  "wach",
  "singen",
  "beispiel",
  "ais",
  "sowieso",
  "jedenfalls",
  "schwein",
  "bank",
  "ziel",
  "klein",
  "verdient",
  "band",
  "geist",
  "ma",
  "max",
  "neu",
  "schreit",
  "anwalt",
  "monaten",
  "show",
  "heim",
  "führt",
  "lauf",
  "ehre",
  "unterwegs",
  "gelernt",
  "minute",
  "reich",
  "wunder",
  "opfer",
  "erzähl",
  "bekannt",
  "hau",
  "haut",
  "weder",
  "rücken",
  "bekommt",
  "peter",
  "jemals",
  "partner",
  "h",
  "zieht",
  "nase",
  "gefahr",
  "regeln",
  "absolut",
  "tief",
  "flugzeug",
  "befehl",
  "geschickt",
  "wette",
  "nennt",
  "jung",
  "sucht",
  "gehabt",
  "geboren",
  "rolle",
  "l",
  "schönen",
  "leg",
  "holt",
  "erinnerst",
  "heiße",
  "kraft",
  "lhrem",
  "lacht",
  "bar",
  "richtung",
  "tasche",
  "schlag",
  "professor",
  "steckt",
  "ständig",
  "erwischt",
  "stell",
  "schrecklich",
  "verschwinde",
  "weise",
  "schlimmer",
  "ließ",
  "frieden",
  "verliebt",
  "bleibe",
  "ehe",
  "kriege",
  "näher",
  "gelesen",
  "dahin",
  "wofür",
  "dauert",
  "neben",
  "gold",
  "raum",
  "benutzt",
  "welches",
  "regierung",
  "fährt",
  "volk",
  "fernsehen",
  "zeiten",
  "toten",
  "achtung",
  "karte",
  "hunger",
  "diesmal",
  "preis",
  "benutzen",
  "scheisse",
  "hilft",
  "geschenk",
  "hoffentlich",
  "manche",
  "ansehen",
  "kriegst",
  "lage",
  "wünschte",
  "fehlt",
  "willen",
  "bescheid",
  "heiß",
  "kamera",
  "gleiche",
  "ruft",
  "unfall",
  "ans",
  "bullen",
  "szene",
  "gericht",
  "gerettet",
  "schlaf",
  "schicksal",
  "gesetz",
  "fürs",
  "d",
  "verkauft",
  "bewegen",
  "leiche",
  "lm",
  "jesus",
  "soldaten",
  "geburtstag",
  "lebe",
  "darfst",
  "ewig",
  "ben",
  "schade",
  "seh",
  "witz",
  "müsste",
  "it",
  "erwarten",
  "aiies",
  "ihres",
  "fahre",
  "ähm",
  "pro",
  "traurig",
  "hältst",
  "doc",
  "jemandem",
  "b",
  "setzt",
  "gesellschaft",
  "punkt",
  "freiheit",
  "jimmy",
  "darin",
  "brachte",
  "weile",
  "jawohl",
  "dasselbe",
  "maul",
  "zeigt",
  "taxi",
  "erreichen",
  "redet",
  "foto",
  "gekauft",
  "meer",
  "sheriff",
  "liebst",
  "unbedingt",
  "aussehen",
  "tante",
  "drehen",
  "stirbt",
  "bord",
  "kirche",
  "tee",
  "of",
  "erledigt",
  "wein",
  "weihnachten",
  "irgendwann",
  "billy",
  "euren",
  "brauch",
  "hochzeit",
  "dorf",
  "sagtest",
  "james",
  "lady",
  "lust",
  "kontrolle",
  "tolle",
  "beine",
  "hut",
  "wiii",
  "hoffnung",
  "firma",
  "me",
  "lügen",
  "sergeant",
  "fürchte",
  "kaputt",
  "bekam",
  "is",
  "nachrichten",
  "ball",
  "haare",
  "tschüss",
  "seltsam",
  "vergnügen",
  "sauber",
  "bill",
  "zuhause",
  "anderer",
  "zeichen",
  "herein",
  "liste",
  "haltet",
  "normal",
  "see",
  "schätze",
  "bewegt",
  "wussten",
  "blick",
  "naja",
  "gesucht",
  "gestohlen",
  "vorne",
  "jim",
  "kindern",
  "frag",
  "bleibst",
  "nachts",
  "neun",
  "nämlich",
  "wunderschön",
  "stecken",
  "großes",
  "freut",
  "weitere",
  "gehören",
  "schwöre",
  "nervös",
  "hals",
  "henry",
  "gearbeitet",
  "eigene",
  "glas",
  "versteckt",
  "feind",
  "schönes",
  "verzeihen",
  "öffnen",
  "meter",
  "drogen",
  "schöner",
  "nehmt",
  "madame",
  "mary",
  "süß",
  "entscheidung",
  "erschossen",
  "verändert",
  "la",
  "wind",
  "ray",
  "wohnen",
  "schuhe",
  "interessant",
  "übrigens",
  "letzter",
  "müsst",
  "nächstes",
  "schaut",
  "armen",
  "verstand",
  "verraten",
  "besuch",
  "beweise",
  "sekunde",
  "polizist",
  "meint",
  "fur",
  "insel",
  "beweisen",
  "antworten",
  "fotos",
  "passen",
  "werfen",
  "persönlich",
  "fragte",
  "namens",
  "gegenüber",
  "unsinn",
  "drink",
  "fuß",
  "besuchen",
  "güte",
  "lieb",
  "guck",
  "deines",
  "roger",
  "richtigen",
  "übrig",
  "major",
  "bein",
  "messer",
  "geheimnis",
  "kannte",
  "gegessen",
  "ungefähr",
  "ran",
  "maria",
  "nahe",
  "meinte",
  "nimmst",
  "gruppe",
  "bücher",
  "weib",
  "geschlafen",
  "g",
  "london",
  "letztes",
  "zeitung",
  "zufrieden",
  "verdammten",
  "zweite",
  "geliebt",
  "freude",
  "loch",
  "stellt",
  "statt",
  "fleisch",
  "ganzes",
  "verschwunden",
  "ee",
  "worauf",
  "sauer",
  "erkennen",
  "weißen",
  "entfernt",
  "nick",
  "mut",
  "mitnehmen",
  "anruf",
  "lied",
  "träume",
  "for",
  "kostet",
  "fisch",
  "amerikaner",
  "schuldig",
  "zumindest",
  "entweder",
  "mark",
  "sprach",
  "informationen",
  "miteinander",
  "sowas",
  "gibst",
  "sahen",
  "schmerz",
  "furchtbar",
  "niemandem",
  "vaters",
  "vorwärts",
  "computer",
  "teilen",
  "gefahren",
  "erster",
  "eier",
  "seines",
  "kontakt",
  "situation",
  "bus",
  "verstecken",
  "händen",
  "ehren",
  "entlang",
  "küche",
  "wütend",
  "mami",
  "fühlt",
  "eddie",
  "überraschung",
  "tony",
  "haar",
  "schwert",
  "schreien",
  "lag",
  "fräulein",
  "ha",
  "hielt",
  "richter",
  "gespielt",
  "gegend",
  "red",
  "gebäude",
  "geredet",
  "rat",
  "schlechte",
  "süße",
  "hängt",
  "eis",
  "big",
  "zerstört",
  "koffer",
  "wohnt",
  "schwarze",
  "versteht",
  "kümmere",
  "erledigen",
  "lieutenant",
  "alex",
  "männern",
  "witzig",
  "schließlich",
  "position",
  "drinnen",
  "fbi",
  "soweit",
  "falsche",
  "entscheiden",
  "erhalten",
  "bauen",
  "kleid",
  "dachten",
  "übel",
  "überleben",
  "hinaus",
  "beeil",
  "wald",
  "töte",
  "beschäftigt",
  "ring",
  "verbindung",
  "königin",
  "ecke",
  "halb",
  "bericht",
  "gingen",
  "vergangenheit",
  "spiele",
  "angefangen",
  "weinen",
  "welchen",
  "radio",
  "nah",
  "beziehung",
  "hängen",
  "feiern",
  "w",
  "mussten",
  "verhaftet",
  "maschine",
  "ermordet",
  "aiie",
  "richard",
  "größte",
  "betrunken",
  "mußt",
  "soldat",
  "irgendetwas",
  "on",
  "gefühle",
  "rauf",
  "rief",
  "beginnt",
  "anna",
  "witze",
  "engel",
  "quatsch",
  "hälfte",
  "spreche",
  "lehrer",
  "england",
  "charles",
  "dessen",
  "schwierig",
  "fang",
  "gleichen",
  "respekt",
  "adresse",
  "brücke",
  "falschen",
  "blumen",
  "bobby",
  "besorgen",
  "sommer",
  "bilder",
  "park",
  "flug",
  "agent",
  "schlampe",
  "hunde",
  "geschlagen",
  "beginnen",
  "danken",
  "schritt",
  "zerstören",
  "au",
  "martin",
  "bombe",
  "san",
  "schwarzen",
  "ted",
  "gelassen",
  "aufgabe",
  "jerry",
  "allerdings",
  "unseres",
  "washington",
  "prinzessin",
  "colonel",
  "kümmert",
  "treten",
  "unterschied",
  "gesund",
  "stimmen",
  "knast",
  "fahrt",
  "heisst",
  "steig",
  "gehirn",
  "besorgt",
  "fluss",
  "tiere",
  "bekomme",
  "brüder",
  "indem",
  "trägt",
  "gewartet",
  "bisher",
  "tor",
  "glückwunsch",
  "tommy",
  "gebt",
  "schafft",
  "planeten",
  "wünsche",
  "blöd",
  "rom",
  "hintern",
  "falle",
  "singt",
  "dach",
  "tötet",
  "helfe",
  "pistole",
  "freunden",
  "karten",
  "leiden",
  "wünschen",
  "gewehr",
  "fühlst",
  "kapitän",
  "neuer",
  "reichen",
  "system",
  "sprich",
  "schläft",
  "worüber",
  "katze",
  "vogel",
  "rennen",
  "erinnert",
  "rechte",
  "bringst",
  "tier",
  "steigen",
  "flasche",
  "traf",
  "k",
  "küssen",
  "deren",
  "leisten",
  "halbe",
  "eurer",
  "verspreche",
  "vermisst",
  "genannt",
  "fragt",
  "verbrechen",
  "aussieht",
  "melden",
  "stehe",
  "verantwortlich",
  "pferde",
  "erfolg",
  "lee",
  "ohren",
  "bad",
  "keinem",
  "weiße",
  "besonderes",
  "theater",
  "natur",
  "lächeln",
  "club",
  "auftrag",
  "wichser",
  "aufhalten",
  "schmerzen",
  "by",
  "davor",
  "wüsste",
  "abendessen",
  "sarah",
  "verdienen",
  "trifft",
  "deutschen",
  "überrascht",
  "baum",
  "kosten",
  "leer",
  "morgens",
  "gefangen",
  "van",
  "wand",
  "city",
  "haufen",
  "schließen",
  "möglichkeit",
  "schützen",
  "besteht",
  "rauchen",
  "schwierigkeiten",
  "stein",
  "mitten",
  "hinein",
  "hose",
  "verdammter",
  "autos",
  "zuvor",
  "prima",
  "schwanz",
  "lächerlich",
  "schickt",
  "j",
  "wieviel",
  "beschützen",
  "liebes",
  "befehle",
  "echte",
  "vermutlich",
  "robert",
  "englisch",
  "bedeuten",
  "junger",
  "lüge",
  "uh",
  "gemeinsam",
  "pause",
  "versteh",
  "aufpassen",
  "einverstanden",
  "brechen",
  "grad",
  "prinz",
  "polizisten",
  "lord",
  "druck",
  "heilige",
  "daher",
  "schwarz",
  "solchen",
  "übernehmen",
  "nachmittag",
  "regen",
  "schätzchen",
  "my",
  "zweiten",
  "rock",
  "fassen",
  "tote",
  "fiel",
  "madam",
  "mitgebracht",
  "mannes",
  "mochte",
  "wart",
  "lief",
  "dorthin",
  "unterhalten",
  "schuss",
  "angriff",
  "freue",
  "gebaut",
  "gebrochen",
  "fanden",
  "aiso",
  "beruhige",
  "offensichtlich",
  "versprechen",
  "monster",
  "fängt",
  "kapiert",
  "ehemann",
  "geschlossen",
  "frühstück",
  "gebeten",
  "stören",
  "irre",
  "farbe",
  "chris",
  "taten",
  "zufällig",
  "geschieht",
  "pfund",
  "mission",
  "thomas",
  "zeige",
  "wochenende",
  "unternehmen",
  "fantastisch",
  "kate",
  "geb",
  "schlägt",
  "entschieden",
  "spur",
  "liebte",
  "hieß",
  "vertrag",
  "dienst",
  "held",
  "verpasst",
  "irgendwelche",
  "filme",
  "stock",
  "louis",
  "meilen",
  "wahnsinn",
  "erschießen",
  "nee",
  "einzigen",
  "mitkommen",
  "braut",
  "reisen",
  "gewissen",
  "schmeckt",
  "sprache",
  "begann",
  "eigenes",
  "reihe",
  "fern",
  "drüber",
  "mond",
  "gang",
  "schauspieler",
  "vollkommen",
  "runde",
  "restaurant",
  "dreck",
  "schrieb",
  "untertitel",
  "arthur",
  "sprichst",
  "warm",
  "mistkerl",
  "nette",
  "bekommst",
  "lager",
  "atmen",
  "legt",
  "daraus",
  "schloss",
  "danny",
  "geschossen",
  "gespräch",
  "usa",
  "leise",
  "flughafen",
  "wunsch",
  "schwanger",
  "operation",
  "anzug",
  "gelegenheit",
  "folge",
  "kunden",
  "dankbar",
  "welchem",
  "gewusst",
  "tanz",
  "füße",
  "thema",
  "v",
  "brauchte",
  "dreh",
  "netter",
  "verantwortung",
  "umsonst",
  "geändert",
  "subtitles",
  "verboten",
  "schlechter",
  "million",
  "dick",
  "größer",
  "nerven",
  "schaden",
  "erreicht",
  "jagen",
  "urlaub",
  "erlaubt",
  "gäste",
  "erfahrung",
  "viei",
  "rot",
  "getrunken",
  "freuen",
  "besseres",
  "wache",
  "gewalt",
  "entkommen",
  "wußte",
  "hasst",
  "riecht",
  "strand",
  "sterbe",
  "konntest",
  "aufstehen",
  "wahnsinnig",
  "nachgedacht",
  "oberst",
  "william",
  "beenden",
  "kino",
  "lauter",
  "folgt",
  "aha",
  "wahre",
  "angebot",
  "erklärt",
  "trink",
  "soii",
  "stört",
  "gilt",
  "keller",
  "post",
  "senator",
  "eurem",
  "isst",
  "geschichten",
  "frankreich",
  "no",
  "gentlemen",
  "kugel",
  "gemeint",
  "milch",
  "machten",
  "kleider",
  "herausfinden",
  "mindestens",
  "eh",
  "einigen",
  "trottel",
  "schaffst",
  "kuss",
  "geholfen",
  "knie",
  "worum",
  "grab",
  "voraus",
  "robin",
  "blind",
  "that",
  "schande",
  "carl",
  "schönheit",
  "versuchte",
  "fuhr",
  "steve",
  "dave",
  "schatten",
  "schulden",
  "dauern",
  "mister",
  "schwimmen",
  "such",
  "beruhigen",
  "form",
  "bessere",
  "verschwindet",
  "zweimal",
  "präsidenten",
  "wei",
  "dunkel",
  "idioten",
  "sieg",
  "riggs",
  "pläne",
  "bat",
  "zufall",
  "eingeladen",
  "scherz",
  "gezeigt",
  "geheiratet",
  "ed",
  "fahrer",
  "ähnlich",
  "verhalten",
  "staaten",
  "garten",
  "großvater",
  "schreibt",
  "pflicht",
  "spielte",
  "deckung",
  "energie",
  "zeugen",
  "star",
  "fährst",
  "nachdenken",
  "roy",
  "risiko",
  "geschäfte",
  "www",
  "z",
  "erstes",
  "kunst",
  "behandelt",
  "geschah",
  "com",
  "helft",
  "dürfte",
  "heiligen",
  "mädels",
  "beweis",
  "priester",
  "wusstest",
  "stopp",
  "zustand",
  "direktor",
  "gehalten",
  "grenze",
  "juden",
  "geblieben",
  "erzählte",
  "vieiieicht",
  "brennt",
  "interesse",
  "seiten"
],
English:[
  "I",
  "she",
  "that",
  "is",
  "you",
  "not",
  "the",
  "and",
  "it",
  "the",
  "What",
  "weather",
  "he",
  "to",
  "one",
  "in",
  "With",
  "me",
  "the",
  "how",
  "Yes",
  "on",
  "me",
  "so",
  "one",
  "but",
  "here",
  "are",
  "for",
  "from",
  "to have",
  "has",
  "you",
  "was",
  "that",
  "if",
  "on",
  "there",
  "no",
  "am",
  "still",
  "to you",
  "only",
  "have",
  "her",
  "himself",
  "a",
  "US",
  "have",
  "to the",
  "him",
  "out",
  "can",
  "Well",
  "also",
  "beautiful",
  "now",
  "in the",
  "being",
  "just",
  "then",
  "my",
  "as",
  "around",
  "my",
  "indeed",
  "are you",
  "will",
  "none",
  "after",
  "everything",
  "one",
  "loll",
  "or",
  "Nothing",
  "Where",
  "will",
  "White",
  "want",
  "goes",
  "more",
  "why",
  "have",
  "you",
  "You're welcome",
  "something",
  "at",
  "got to",
  "Come on",
  "always",
  "Oh",
  "before",
  "husband",
  "to the",
  "again",
  "very",
  "see",
  "to say",
  "so",
  "walk",
  "who",
  "Everyone",
  "then",
  "do",
  "him",
  "be able",
  "this",
  "come",
  "thank you",
  "you",
  "a",
  "to do",
  "a",
  "are",
  "never",
  "over",
  "of",
  "target",
  "no",
  "perhaps",
  "path",
  "your",
  "to know",
  "at the",
  "become",
  "Life",
  "come",
  "comes",
  "have to",
  "a lot",
  "really",
  "Mrs",
  "had",
  "today",
  "OK",
  "want",
  "your",
  "would",
  "does",
  "their",
  "all",
  "time",
  "until",
  "want",
  "simple",
  "power",
  "God",
  "back",
  "well",
  "because",
  "in order to",
  "this",
  "can",
  "would",
  "said",
  "would",
  "his",
  "wanted",
  "n / A",
  "two",
  "Hi",
  "think",
  "secure",
  "whisper",
  "sir",
  "tomorrow",
  "away",
  "suffering",
  "leave",
  "hey",
  "was",
  "to the",
  "let",
  "e",
  "money",
  "love",
  "Day",
  "People",
  "father",
  "I agree",
  "said",
  "had",
  "make up",
  "Out",
  "through",
  "Lohr",
  "could",
  "Nice",
  "well",
  "seen",
  "none",
  "clear",
  "faith",
  "on",
  "OK",
  "mother",
  "say",
  "this",
  "night",
  "better",
  "without",
  "our",
  "someone",
  "may be",
  "talk",
  "just",
  "if",
  "heard",
  "go",
  "would like",
  "there",
  "says",
  "others",
  "did",
  "hear",
  "should",
  "self",
  "this",
  "quality",
  "thought",
  "pair",
  "further",
  "from the",
  "into the",
  "Mister",
  "become",
  "give",
  "order",
  "happens",
  "mine",
  "Long",
  "at all",
  "girl",
  "my",
  "Listen",
  "sees",
  "that",
  "good",
  "there",
  "same",
  "Oh",
  "This",
  "friend",
  "since",
  "world",
  "must",
  "home",
  "Naturally",
  "Eve",
  "fear",
  "three",
  "law",
  "correct",
  "lots",
  "yours",
  "Find",
  "how so",
  "remain",
  "dead",
  "under",
  "Boy",
  "House",
  "pure",
  "meal",
  "of that",
  "to take",
  "should",
  "help",
  "fast",
  "make",
  "one",
  "other",
  "our",
  "wait",
  "because",
  "People",
  "Right",
  "Therefore",
  "may",
  "children",
  "enough",
  "otherwise",
  "whole",
  "crap",
  "head",
  "stop",
  "should",
  "together",
  "against",
  "years",
  "first",
  "think",
  "stands",
  "have",
  "Damn it",
  "moment",
  "your",
  "believe",
  "bring",
  "give",
  "are",
  "nobody",
  "wait",
  "to need",
  "lair",
  "questions",
  "work",
  "when",
  "is called",
  "to speak",
  "see",
  "everyone",
  "came",
  "immediately",
  "did",
  "done",
  "know",
  "once",
  "son",
  "keep",
  "included",
  "had",
  "Men",
  "child",
  "Years",
  "at the",
  "his",
  "like",
  "come",
  "alone",
  "before",
  "brothers",
  "music",
  "true",
  "could",
  "rather",
  "Clock",
  "head",
  "matter",
  "gladly",
  "think",
  "need",
  "end",
  "later",
  "go",
  "forget",
  "down",
  "drive",
  "look",
  "wicked",
  "city",
  "name",
  "problem",
  "see",
  "eyes",
  "gave",
  "thanks to",
  "legend",
  "would",
  "one",
  "to it",
  "to",
  "no matter",
  "ask",
  "far",
  "family",
  "to die",
  "could",
  "guys",
  "every",
  "minute",
  "understand",
  "yours",
  "help",
  "both",
  "soon",
  "Alles",
  "your",
  "take",
  "small",
  "infant",
  "happiness",
  "friends",
  "knew",
  "crazy",
  "quiet",
  "country",
  "about it",
  "found",
  "door",
  "make",
  "his",
  "water",
  "automobile",
  "saw",
  "this",
  "actually",
  "your",
  "Quiet",
  "stand",
  "hand",
  "of their",
  "women",
  "mean",
  "kill",
  "case",
  "went",
  "police",
  "past",
  "war",
  "ever",
  "thereon",
  "many",
  "last",
  "long",
  "little",
  "your turn",
  "high",
  "know",
  "nearly",
  "entire",
  "show",
  "even",
  "play",
  "became",
  "Behind",
  "Devil",
  "things",
  "none",
  "mummy",
  "late",
  "to get",
  "above",
  "Surname",
  "hearing",
  "have",
  "ready",
  "in it",
  "new",
  "come",
  "where from",
  "Yours",
  "car",
  "work",
  "to understand",
  "year",
  "death",
  "about",
  "real",
  "his",
  "story",
  "brings",
  "needs",
  "meeting",
  "Great",
  "gladly",
  "outside",
  "five",
  "hide",
  "room",
  "job",
  "kind",
  "White",
  "The",
  "game",
  "Roger that",
  "miss",
  "size",
  "different",
  "ensure, to care",
  "Which",
  "only",
  "kind",
  "located",
  "lost",
  "idea",
  "four",
  "old",
  "came",
  "someone",
  "go",
  "week",
  "Guy",
  "Hi",
  "John",
  "yesterday",
  "little",
  "definitely",
  "short",
  "at all",
  "find",
  "therefore",
  "day",
  "first",
  "sister",
  "heavy",
  "search",
  "remains",
  "daughter",
  "Type",
  "goods",
  "been",
  "ground",
  "show",
  "Movie",
  "bad",
  "Darling",
  "for this reason",
  "fetch",
  "hope",
  "tu",
  "tell",
  "bed",
  "got to",
  "page",
  "like",
  "even",
  "leaves",
  "please",
  "hours",
  "heart",
  "where",
  "drink",
  "last",
  "human",
  "first",
  "n",
  "below",
  "face",
  "to attempt",
  "word",
  "to them",
  "leaving",
  "at last",
  "think",
  "ward",
  "sleep",
  "pretty much",
  "Jack",
  "dollar",
  "ass",
  "sometimes",
  "fixed",
  "reunion",
  "best",
  "small",
  "Obtain",
  "running",
  "truth",
  "between",
  "No way",
  "bring",
  "our",
  "take",
  "all",
  "while",
  "believe",
  "thing",
  "idea",
  "wanted to",
  "leaves",
  "had to",
  "things",
  "Ah",
  "stay",
  "smaller",
  "your",
  "number",
  "but",
  "free",
  "often",
  "Excuse me",
  "whom",
  "serious",
  "old",
  "school",
  "location",
  "told",
  "other",
  "New",
  "old",
  "chance",
  "some",
  "just",
  "apologize",
  "set",
  "means",
  "tell",
  "Fire",
  "passport",
  "thought",
  "blame",
  "dad",
  "killed",
  "boys",
  "on it",
  "place",
  "be",
  "tu",
  "father",
  "fun",
  "tries",
  "important",
  "best",
  "worries",
  "know",
  "litt",
  "dog",
  "blood",
  "here",
  "suffices",
  "old",
  "would be",
  "happy",
  "need",
  "hands",
  "Our",
  "had",
  "barely",
  "speech",
  "first",
  "put",
  "both",
  "if",
  "early",
  "wait",
  "new",
  "six",
  "every",
  "friend",
  "I",
  "love",
  "part",
  "lesson",
  "slow",
  "seems",
  "earlier",
  "huge",
  "weapon",
  "phone",
  "heaven",
  "to learn",
  "you",
  "Ah",
  "ten",
  "thought",
  "welcome",
  "frank",
  "air",
  "light",
  "hold",
  "look",
  "crowd",
  "fully",
  "all over",
  "did",
  "Earth",
  "giving",
  "a",
  "call",
  "possible",
  "speaks",
  "king",
  "parents",
  "except",
  "next",
  "draw",
  "probably",
  "want",
  "may",
  "to name",
  "not correct",
  "honest",
  "anything",
  "next",
  "weekly",
  "mine",
  "Men's",
  "Street",
  "Hm",
  "marry",
  "piece",
  "sam",
  "doctor",
  "new",
  "given",
  "coffee",
  "would",
  "understand",
  "ill",
  "after that",
  "become",
  "doctor",
  "create",
  "Job",
  "large",
  "whom",
  "hell",
  "fully",
  "sore",
  "s",
  "error",
  "over there",
  "Harry",
  "office",
  "captain",
  "call",
  "somehow",
  "own",
  "problems",
  "all",
  "mr",
  "worth",
  "do",
  "a book",
  "lives",
  "shit",
  "to buy",
  "remember",
  "direct",
  "to run",
  "George",
  "despite this",
  "to write",
  "quiet",
  "small",
  "body",
  "rescue",
  "found",
  "ours",
  "such",
  "thinks",
  "can",
  "LN",
  "alone",
  "sit",
  "hear",
  "millions",
  "days",
  "York",
  "seek",
  "forget",
  "good",
  "Unfortunately",
  "told",
  "types",
  "key",
  "carry",
  "mouth",
  "has been",
  "hold",
  "that is",
  "already",
  "easy",
  "play",
  "ship",
  "hear",
  "carry",
  "uncle",
  "belie",
  "lose",
  "greater",
  "sound",
  "somewhere",
  "future",
  "knows",
  "plan",
  "lovely",
  "disappear",
  "Interested",
  "weapons",
  "battle",
  "party",
  "bring",
  "rear",
  "sitting",
  "Dude",
  "wanted",
  "floor",
  "general",
  "show",
  "evil",
  "hold",
  "went",
  "right one",
  "Darling",
  "eight",
  "joyful",
  "bother",
  "each",
  "hard",
  "carefully",
  "joe",
  "attempt",
  "met",
  "like",
  "things",
  "back then",
  "voice",
  "feeling",
  "people",
  "read",
  "damn",
  "train",
  "had",
  "damn",
  "shop",
  "asshole",
  "rest",
  "Mom",
  "de",
  "stop",
  "could",
  "class",
  "laser",
  "boss",
  "to explain",
  "to fly",
  "load",
  "proudly",
  "strong",
  "hate",
  "apartment",
  "brought",
  "forth",
  "just like that",
  "May",
  "Excuse me",
  "especially",
  "be",
  "day",
  "fewer",
  "pull",
  "trouble",
  "feel",
  "look",
  "idiot",
  "O",
  "more quickly",
  "think",
  "made",
  "forgiveness",
  "daddy",
  "Charlie",
  "well",
  "send",
  "expected",
  "news",
  "find",
  "is working",
  "be",
  "was standing",
  "dream",
  "shorter",
  "t",
  "fall",
  "About what",
  "prison",
  "onto",
  "hotel",
  "hospital",
  "kill",
  "fall",
  "talk",
  "knows",
  "God",
  "total",
  "window",
  "life",
  "believe",
  "introduce",
  "and",
  "sense",
  "to change",
  "tries",
  "out",
  "mean",
  "to dance",
  "months",
  "laugh",
  "battle",
  "after",
  "poor",
  "at least",
  "happen",
  "heard",
  "came",
  "fits",
  "loving",
  "Follow",
  "rather",
  "asked",
  "stupid",
  "because of this",
  "so long",
  "fun",
  "died",
  "impossible",
  "image",
  "boat",
  "taken",
  "lady",
  "to lead",
  "unbelievable",
  "trust",
  "injured",
  "happen",
  "cool",
  "most",
  "Tom",
  "before",
  "suddenly",
  "called",
  "Move",
  "To take care of",
  "over",
  "Strange",
  "Paris",
  "great",
  "seven",
  "recall",
  "leer",
  "ne",
  "call",
  "beer",
  "moment",
  "hereabouts",
  "cold",
  "Marvelous",
  "Great",
  "choice",
  "eye",
  "driving",
  "could",
  "longer",
  "m",
  "Johnny",
  "table",
  "rum",
  "reply",
  "each",
  "David",
  "poor",
  "killed",
  "terrible",
  "married",
  "stand up",
  "call up",
  "words",
  "want",
  "caution",
  "help",
  "paid",
  "full of",
  "Left",
  "seconds",
  "become",
  "be",
  "lie",
  "feel",
  "once again",
  "army",
  "request",
  "died",
  "finger",
  "opinion",
  "takes",
  "numbers",
  "safety",
  "to sell",
  "spoken",
  "for what reason",
  "tired",
  "soul",
  "which one",
  "shoot",
  "Michael",
  "work",
  "sitting",
  "to",
  "Sun",
  "ladies",
  "let",
  "pay",
  "myself",
  "trip",
  "team",
  "as soon",
  "master",
  "majesty",
  "beginning",
  "catch",
  "Besides that",
  "written",
  "sex",
  "go",
  "wart",
  "yeah",
  "like",
  "according to",
  "flap",
  "America",
  "took",
  "no one",
  "dangerous",
  "r",
  "murderer",
  "to win",
  "thoughts",
  "although",
  "month",
  "mike",
  "is working",
  "Mr",
  "to keep",
  "lay",
  "bob",
  "person",
  "heart",
  "letter",
  "president",
  "right",
  "begin",
  "Enough",
  "pretty",
  "Don",
  "won",
  "scoff",
  "promised",
  "boss",
  "find",
  "Perfect",
  "hit",
  "indeed",
  "horse",
  "on the other hand",
  "Experienced",
  "monsoon",
  "murder",
  "paul",
  "vicinity",
  "necessary",
  "Wow",
  "all",
  "open minded",
  "awake",
  "to sing",
  "example",
  "ais",
  "anyway",
  "in any case",
  "pig",
  "Bank",
  "aim",
  "small",
  "deserved",
  "tape",
  "spirit",
  "ma",
  "Max",
  "New",
  "cries",
  "attorney",
  "monthly",
  "show",
  "home",
  "leads",
  "run",
  "honor",
  "On the way",
  "learned",
  "minute",
  "rich",
  "wonder",
  "victim",
  "narrow",
  "known",
  "haunt",
  "skin",
  "neither",
  "move",
  "receives",
  "Peter",
  "ever",
  "partner",
  "H",
  "pull",
  "nose",
  "danger",
  "rules",
  "absolutely",
  "deep",
  "plane",
  "command",
  "sent",
  "bet",
  "names",
  "young",
  "seeks",
  "false",
  "born",
  "role",
  "l",
  "breeze",
  "leg",
  "get",
  "remember",
  "name is",
  "power",
  "your",
  "laugh",
  "bar",
  "direction",
  "bag",
  "punch",
  "professor",
  "plugged",
  "constant",
  "Caught",
  "set",
  "terrible",
  "disappear",
  "wise",
  "worse",
  "pitch",
  "peace",
  "in love",
  "stay",
  "marriage",
  "wars",
  "closer",
  "had read",
  "there",
  "for what",
  "take",
  "Next",
  "gold",
  "space",
  "used",
  "which",
  "government",
  "moves",
  "people",
  "TV",
  "time",
  "kill",
  "danger",
  "map",
  "hunger",
  "this time",
  "price",
  "use",
  "Shit",
  "help",
  "gift",
  "hopefully",
  "some",
  "look at",
  "get",
  "position",
  "wished",
  "is missing",
  "saw",
  "notice",
  "hot",
  "camera",
  "same",
  "calls",
  "accident",
  "to",
  "cops",
  "scene",
  "court",
  "saved",
  "sleep",
  "fate",
  "law",
  "for",
  "D",
  "sold",
  "move",
  "corpse",
  "lm",
  "Jesus",
  "soldiers",
  "birthday",
  "live",
  "can",
  "eternal",
  "ben",
  "a pity",
  "see",
  "joke",
  "might",
  "it",
  "expect",
  "aiie",
  "Yours",
  "ride",
  "um",
  "Per",
  "Sad",
  "hold",
  "Doc",
  "someone",
  "b",
  "puts",
  "society",
  "Point",
  "freedom",
  "Jimmy",
  "in this",
  "brought",
  "while",
  "Yes sir",
  "the same thing",
  "mouth",
  "indicates",
  "taxi",
  "reach",
  "talk",
  "photo",
  "bought",
  "sea",
  "sheriff",
  "lovely",
  "necessarily",
  "look",
  "aunt",
  "rotate",
  "dying",
  "board",
  "church",
  "tea",
  "of",
  "completed",
  "Wine",
  "Christmas",
  "Sometime",
  "billy",
  "go",
  "custom",
  "wedding",
  "Village",
  "assessed",
  "james",
  "lady",
  "desire",
  "control",
  "great",
  "legs",
  "cap",
  "Wiii",
  "hope",
  "company",
  "Me",
  "lying",
  "sergeant",
  "fear",
  "broken",
  "got",
  "is",
  "Messages",
  "ball",
  "hair",
  "bye",
  "strange",
  "pleasure",
  "clean",
  "bill",
  "at home",
  "another",
  "sign",
  "in",
  "list",
  "holding",
  "normal",
  "lake",
  "treasures",
  "emotional",
  "knew",
  "view",
  "Oh well",
  "searched",
  "stolen",
  "in front",
  "Jim",
  "children",
  "question",
  "stay",
  "at night",
  "nine",
  "namely",
  "beautiful",
  "put",
  "big",
  "is happy",
  "Further",
  "belong",
  "swear",
  "nervous",
  "neck",
  "henry",
  "worked",
  "own",
  "Glass",
  "hidden",
  "enemy",
  "beautiful",
  "pardon",
  "to open",
  "meter",
  "drugs",
  "more beautiful",
  "taking",
  "madame",
  "Mary",
  "Sweet",
  "decision",
  "shot",
  "changes",
  "la",
  "wind",
  "ray",
  "reside",
  "Shoes",
  "Interesting",
  "by the way",
  "last",
  "must",
  "next",
  "looks",
  "poor",
  "understanding",
  "reveal",
  "visit",
  "proofs",
  "second",
  "police officer",
  "means",
  "for",
  "Island",
  "to prove",
  "answer",
  "photos",
  "fit",
  "throw",
  "personally",
  "asked",
  "called",
  "opposite to",
  "nonsense",
  "drink",
  "foot",
  "visit",
  "quality",
  "Dear",
  "look",
  "Your",
  "Roger",
  "right",
  "left over",
  "major",
  "leg",
  "knife",
  "secret",
  "knew",
  "eaten",
  "approximately",
  "ran",
  "Maria",
  "vicinity",
  "mean",
  "take",
  "group",
  "Books",
  "woman",
  "sleep",
  "G",
  "London",
  "last",
  "newspaper",
  "satisfied",
  "damn",
  "second",
  "loved",
  "joy",
  "hole",
  "set",
  "instead of",
  "meat",
  "whole",
  "disappeared",
  "ee",
  "what",
  "angry",
  "recognize",
  "white",
  "removed",
  "nick",
  "courage",
  "take along",
  "phone call",
  "song",
  "dreams",
  "for",
  "cost",
  "fish",
  "American",
  "guilty",
  "at least",
  "either",
  "mark",
  "spoke",
  "information",
  "together",
  "like this",
  "give",
  "saw",
  "pain",
  "awful",
  "no one",
  "father",
  "forward",
  "computer",
  "divide",
  "driven",
  "first",
  "eggs",
  "his",
  "Contact",
  "situation",
  "bus",
  "hide",
  "hands",
  "to honor",
  "along",
  "kitchen",
  "furious",
  "mum",
  "feels",
  "Eddie",
  "surprise",
  "tony",
  "hair",
  "sword",
  "scream",
  "lay",
  "young lady",
  "Ha",
  "held",
  "judge",
  "played",
  "area",
  "red",
  "building",
  "talked",
  "advice",
  "bad",
  "sweetness",
  "hangs",
  "ice cream",
  "big",
  "destroyed",
  "suitcase",
  "lover",
  "black",
  "understands",
  "caring",
  "take care of",
  "Lieutenant",
  "Alex",
  "men",
  "funny",
  "in the end",
  "position",
  "inside",
  "FBI",
  "so far",
  "false",
  "decide",
  "receive",
  "to build",
  "dress",
  "thought",
  "bad",
  "survive",
  "out",
  "hurry",
  "Forest",
  "kill",
  "employed",
  "ring",
  "connection",
  "queen",
  "corner",
  "half",
  "report",
  "worn",
  "past",
  "games",
  "begun",
  "cry",
  "which",
  "radio",
  "close",
  "relationship",
  "hang",
  "celebrate",
  "w",
  "had",
  "arrested",
  "machine",
  "murdered",
  "aiie",
  "Richard",
  "largest",
  "drunk",
  "must",
  "soldier",
  "anything",
  "on",
  "feelings",
  "up",
  "shouted",
  "begins",
  "Anna",
  "jokes",
  "Angel",
  "crap",
  "half",
  "speak",
  "teacher",
  "England",
  "Charles",
  "whose",
  "difficult",
  "catch",
  "equal",
  "respect",
  "address",
  "bridge",
  "false",
  "flower",
  "Bobby",
  "obtain",
  "summer",
  "photos",
  "park",
  "flight",
  "agent",
  "slut",
  "dogs",
  "beaten",
  "start",
  "to thank",
  "step",
  "destroy",
  "au",
  "Martin",
  "bomb",
  "san",
  "black",
  "ted",
  "calmly",
  "task",
  "jerry",
  "Indeed",
  "our",
  "Washington",
  "princess",
  "colonel",
  "takes care",
  "to step",
  "difference",
  "healthy",
  "voices",
  "jail",
  "trip",
  "is called",
  "climb",
  "brain",
  "concerned",
  "flow",
  "animals",
  "get",
  "brothers",
  "by doing",
  "wearing",
  "waited",
  "until now",
  "goal",
  "congratulation",
  "tommy",
  "giving",
  "manage",
  "planet",
  "wishes",
  "silly",
  "Rome",
  "butt",
  "cases",
  "sings",
  "roof",
  "killing",
  "help",
  "pistol",
  "friends",
  "cards",
  "Suffer",
  "wish",
  "gun",
  "feel",
  "captain",
  "news",
  "pass",
  "system",
  "speak",
  "is sleeping",
  "about what",
  "cat",
  "bird",
  "run",
  "remind",
  "right",
  "bring",
  "animal",
  "rise",
  "bottle",
  "met",
  "k",
  "kiss",
  "whose",
  "Afford",
  "half",
  "your",
  "promising",
  "missing",
  "called",
  "inquire",
  "crime",
  "look",
  "Report",
  "stand",
  "responsible",
  "horses",
  "success",
  "lee",
  "ear",
  "bath",
  "no",
  "white",
  "special",
  "theatre",
  "nature",
  "smile",
  "club",
  "order",
  "wanker",
  "stop",
  "pains",
  "by",
  "before",
  "knew",
  "dinner",
  "Sarah",
  "earn",
  "meets",
  "German",
  "surprised",
  "tree",
  "costs",
  "empty",
  "In the morning",
  "caught",
  "van",
  "Wall",
  "City",
  "heap",
  "shut down",
  "opportunity",
  "protection",
  "consists",
  "smoking",
  "trouble",
  "stone",
  "in the middle",
  "inside",
  "trousers",
  "damn",
  "cars",
  "before",
  "great",
  "tail",
  "ridiculous",
  "send",
  "j",
  "how much",
  "to protect",
  "Dear",
  "commands",
  "true",
  "allegedly",
  "Robert",
  "English",
  "mean",
  "younger",
  "lie",
  "uh",
  "together",
  "Break",
  "understanding",
  "watch out",
  "I Agree",
  "break",
  "Degree",
  "prince",
  "police officers",
  "lord",
  "pressure",
  "saint",
  "hence",
  "black",
  "such",
  "take over",
  "afternoon",
  "rain",
  "baby",
  "my",
  "second",
  "skirt",
  "grasp",
  "dead",
  "fell",
  "madam",
  "brought",
  "man",
  "would like",
  "wart",
  "ran",
  "there",
  "to chat",
  "shot",
  "attack",
  "am happy",
  "built",
  "Broken",
  "found",
  "aiso",
  "calm down",
  "obviously",
  "promise",
  "monster",
  "catches",
  "Got it",
  "husband",
  "closed",
  "breakfast",
  "prayer",
  "disturb",
  "crazy",
  "color",
  "Chris",
  "do",
  "coincidentally",
  "happening",
  "lb",
  "mission",
  "Thomas",
  "show",
  "weekend",
  "company",
  "fantastic",
  "kate",
  "boom",
  "beat",
  "decided",
  "track",
  "loved",
  "was called",
  "contract",
  "service",
  "hero",
  "lost",
  "any",
  "movie",
  "floor",
  "Louis",
  "miles",
  "insanity",
  "shoot",
  "no",
  "single",
  "come along",
  "bride",
  "journeys",
  "conscience",
  "tastes",
  "language",
  "started",
  "own",
  "row",
  "remote",
  "over",
  "moon",
  "gear",
  "actor",
  "completely",
  "round",
  "restaurant",
  "dirt",
  "wrote",
  "subtitle",
  "Arthur",
  "speak",
  "warm",
  "Mistker",
  "cute",
  "get",
  "warehouse",
  "breathe",
  "lay",
  "from this",
  "Castle",
  "Danny",
  "shot",
  "conversation",
  "USA",
  "quietly",
  "Airport",
  "wish",
  "pregnant",
  "surgery",
  "men's suit",
  "opportunity",
  "consequence",
  "customers",
  "thankful",
  "which",
  "knew",
  "dance",
  "feet",
  "theme",
  "v",
  "needed",
  "turn",
  "cute",
  "responsibility",
  "for free",
  "changed",
  "subtitle",
  "forbidden",
  "worse",
  "million",
  "thick",
  "greater",
  "annoy",
  "damage",
  "achieved",
  "to hunt",
  "holidays",
  "permitted",
  "Guests",
  "Experience",
  "Viei",
  "Red",
  "drunk",
  "be happy",
  "better",
  "guard",
  "violence",
  "escape",
  "knew",
  "hate",
  "smell",
  "Beach",
  "dying",
  "met",
  "stand up",
  "insane",
  "thoughtful",
  "colonel",
  "William",
  "break up",
  "movie theater",
  "volume up",
  "follow",
  "Aha",
  "real",
  "offer",
  "explained",
  "drinking",
  "SOII",
  "disturbs",
  "is applicable",
  "basement, cellar",
  "post",
  "senator",
  "your",
  "eat",
  "stories",
  "France",
  "no",
  "gentlemen",
  "Bullet",
  "meant",
  "milk",
  "put",
  "Dresses",
  "find out",
  "at least",
  "anyway",
  "agree",
  "jerk",
  "man",
  "kiss",
  "help",
  "knee",
  "what",
  "dig",
  "in advance",
  "robin",
  "blind",
  "that",
  "shame",
  "Carl",
  "beauty",
  "tried",
  "drove",
  "steve",
  "Dave",
  "the shade",
  "debts",
  "last",
  "mister",
  "to swim",
  "search",
  "calm",
  "shape",
  "better",
  "disappears",
  "twice",
  "president",
  "white",
  "dark",
  "idiot",
  "victory",
  "riggs",
  "plans",
  "bat",
  "coincidence",
  "invited",
  "hoax",
  "shown",
  "got married",
  "ED",
  "driver",
  "similar",
  "behavior",
  "states",
  "garden",
  "grandfather",
  "writing",
  "duty",
  "play",
  "cover",
  "energy",
  "witness",
  "star",
  "ferry",
  "think",
  "roy",
  "risk",
  "shops",
  "www",
  "Z",
  "first",
  "art",
  "treated",
  "happen",
  "com",
  "help",
  "might",
  "saint",
  "maid",
  "proof",
  "priest",
  "knotted",
  "stop",
  "Status",
  "director",
  "held",
  "border",
  "Jews",
  "remained",
  "told",
  "vivid",
  "burning",
  "interest",
  "pages"
]
}
let dat_Accus_Verbs = {
  Verbs: [
    "abnehmen",
    "abtrocknen",
    "anbieten",
    "annehmen",
    "anrufen",
    "anschauen",
    "ansehen",
    "anstrengen",
    "antworten",
    "anvertrauen",
    "anziehen",
    "anzünden",
    "auffallen",
    "aufgeben",
    "aufheben",
    "aufmachen",
    "aufnehmen",
    "aufräumen",
    "ausgeben",
    "auspacken",
    "ausschalten",
    "aussprechen",
    "aussuchen",
    "ausweichen",
    "ausziehen",
    "backen",
    "baden",
    "bauen",
    "beachten",
    "beantragen",
    "beantworten",
    "bedienen",
    "begegnen",
    "beginnen",
    "begründen",
    "begrüßen",
    "behalten",
    "bekommen",
    "bemerken",
    "benachrichtigen",
    "benutzen, benützen",
    "beraten",
    "berücksichtigen",
    "beruhigen",
    "beschreiben",
    "besichtigen",
    "besitzen",
    "bestellen",
    "bestimmen",
    "besuchen",
    "betrügen",
    "beweisen",
    "bezahlen",
    "bieten",
    "borgen",
    "brauchen",
    "bringen",
    "danken",
    "dienen",
    "drehen",
    "drohen",
    "drücken",
    "drucken",
    "ehren",
    "einfallen",
    "einkaufen",
    "einladen",
    "einpacken",
    "empfehlen",
    "enthalten",
    "entlassen",
    "erfahren",
    "erfinden",
    "erfüllen",
    "erhalten",
    "erhöhen",
    "erkennen",
    "erklären",
    "erlauben",
    "erledigen",
    "eröffnen",
    "erreichen",
    "erschrecken",
    "erwarten",
    "erzählen",
    "erziehen",
    "essen",
    "fehlen",
    "feiern",
    "finden",
    "folgen",
    "fordern",
    "fördern",
    "fotografieren",
    "fragen",
    "frühstücken",
    "fühlen",
    "führen",
    "geben",
    "gefallen",
    "gehorchen",
    "gehören",
    "gelingen",
    "genügen",
    "geschehen",
    "glauben",
    "gratulieren",
    "grüßen",
    "haben",
    "hassen",
    "heben",
    "heizen",
    "helfen",
    "herstellen",
    "holen",
    "hören",
    "informieren",
    "kaufen",
    "kennen",
    "kochen",
    "kontrollieren",
    "korrigieren",
    "kündigen",
    "küssen",
    "lassen",
    "leid tun",
    "leihen",
    "leiten",
    "lernen",
    "lesen",
    "lieben",
    "liefern",
    "loben",
    "lösen",
    "machen",
    "malen",
    "markieren",
    "meinen",
    "melden",
    "merken",
    "messen",
    "mieten",
    "mitbringen",
    "mitteilen",
    "nachgehen",
    "nehmen",
    "nennen",
    "nutzen",
    "nützen",
    "passen",
    "pflegen",
    "prüfen",
    "putzen",
    "raten",
    "rauchen",
    "reichen",
    "reparieren",
    "reservieren",
    "riechen",
    "sammeln",
    "schaden",
    "schenken",
    "schlagen",
    "schließen",
    "schmecken",
    "schneiden",
    "schreiben",
    "schulden",
    "sehen",
    "senden",
    "sparen",
    "spielen",
    "spülen",
    "starten",
    "stehlen",
    "stoppen",
    "stören",
    "studieren",
    "suchen",
    "tanzen",
    "teilen",
    "töten",
    "tragen",
    "transportieren",
    "treffen",
    "trinken",
    "trocknen",
    "überfahren",
    "überholen",
    "übernehmen",
    "überqueren",
    "überraschen",
    "überreden",
    "übersetzen",
    "überweisen",
    "überzeugen",
    "umtauschen",
    "unterrichten",
    "unterschreiben",
    "unterstützen",
    "untersuchen",
    "verändern",
    "verbieten",
    "verbrauchen",
    "verdächtigen",
    "verdienen",
    "vergessen",
    "vergleichen",
    "vergrößern",
    "verhaften",
    "verheimlichen",
    "verhindern",
    "verkaufen",
    "verlängern",
    "verlassen",
    "verlieren",
    "vermieten",
    "verpassen",
    "verraten",
    "verschreiben",
    "verschweigen",
    "versichern",
    "versprechen",
    "verstecken",
    "verstehen",
    "verteilen",
    "vertrauen",
    "vertreten",
    "verursachen",
    "verwenden",
    "verzeihen",
    "vorbereiten",
    "vorlesen",
    "vorschlagen",
    "vorstellen",
    "warnen",
    "waschen",
    "wechseln",
    "wecken",
    "weh tun",
    "werfen",
    "widersprechen",
    "wiederholen",
    "wiegen",
    "winken",
    "wissen",
    "wünschen",
    "zählen",
    "zahlen",
    "zeichnen",
    "zeigen",
    "zerstören",
    "zuhören",
    "zumachen",
    "zuschauen",
    "zusehen",
    "zustimmen"
  ],
  Cases: [
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Dativ + Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Dativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Dativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Dativ",
    "+ Dativ",
    "+ Dativ",
    "+ Dativ",
    "+ Dativ",
    "+ Dativ",
    "+ Dativ (+ Akkusativ)",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Dativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Dativ",
    "(+ Dativ) + Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "(+ Dativ) + Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Akkusativ",
    "(+ Dativ) + Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Akkusativ",
    "+ Dativ + Akkusativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Akkusativ",
    "+ Dativ",
    "+ Dativ",
    "+ Dativ"
  ],
  Examples: [
    "Ich nehme dir den Koffer ab.",
    "Sie trocknet das Geschirr ab.",
    "Kann ich Ihnen einen Kaffee anbieten?",
    "Ich will das Geschenk nicht annehmen.",
    "Ruf mich an!",
    "Ich schaue mir den neuen Film an.",
    "Ich sehe mir den neuen Film an.",
    "Der neue Job strengt mich an.",
    "Er antwortet mir nicht.",
    "Ich möchte dir ein Geheimnis anvertrauen.",
    "Ich ziehe meinem Kind eine Jacke an.",
    "Er zündet die Kerze an.",
    "Er ist mir gleich aufgefallen.",
    "Ich habe meinen Job aufgegeben.",
    "Ich habe die Tasche aufgehoben.",
    "Mach mir bitte die Tür auf!",
    "Sie hat ihn aufgenommen.",
    "Ich räume die Wohnung auf.",
    "Er hat viel Geld ausgegeben.",
    "Ich habe das Geschenk ausgepackt.",
    "Schalte bitte das Radio aus!",
    "Ich kann das Wort nicht aussprechen.",
    "Ich habe mir ein neues Kleid ausgesucht.",
    "Sie konnte dem Radfahrer ausweichen.",
    "Ich habe mir den Mantel ausgezogen.",
    "Ich backe einen Kuchen.",
    "Sie badet ihr Kind.",
    "Er baut ein Haus.",
    "Kinder müssen lernen, die Regeln zu beachten.",
    "Letzte Woche habe ich mein Visum beantragt.",
    "Ich konnte die Frage schnell beantworten.",
    "Der Techniker bedient die Maschinen.",
    "Ich bin gestern einem alten Freund begegnet.",
    "Ich werde eine neue Diät beginnen.",
    "Er war nicht in der Lage, seine Meinung zu begründen.",
    "Er hat mich herzlich begrüßt.",
    "Ich behalte den Hund.",
    "Ich bekomme einen neuen Computer.",
    "Ich habe den Fehler nicht bemerkt.",
    "Benachrichtigen Sie mich sofort!",
    "Ich benutze mein Handy, um SMS zu senden.",
    "Die Expertin berät die Regierung.",
    "Eine Expertin berücksichtigt alle Faktoren.",
    "Der Vater hat seinen Sohn beruhigt.",
    "Beschreiben Sie bitte das Bild!",
    "Wir haben ein Schloss besichtigt.",
    "Ich besitze eine Wohnung.",
    "Ich bestelle einen Salat.",
    "Der Kunde kann den Liefertermin bestimmen.",
    "Wann kommst du mich besuchen?",
    "Er hat mich betrogen.",
    "Er hat mir seine Liebe bewiesen.",
    "Ich bezahle die Rechnung.",
    "Er bietet mir einen neuen Job.",
    "Kannst du mir Geld borgen?",
    "Ich brauche keinen Mercedes.",
    "Ich bringe dir einen Kuchen.",
    "Ich danke Ihnen.",
    "Er dient seinen Gästen.",
    "Ich drehe den Deckel im Uhrzeigersinn.",
    "Er drohte mir.",
    "Ich drücke Ihnen die Daumen.",
    "Ich drucke den Text.",
    "Das ehrt mich sehr.",
    "Mir fällt nichts ein.",
    "Ich kaufe die Milch in dem Geschäft um die Ecke ein.",
    "Ich lade dich ein.",
    "Ich packe das Geschenk ein.",
    "Er empfiehlt mir den neuen Film.",
    "Milch enthält viel Calcium.",
    "Der Chef hat seine Angestellten entlassen.",
    "Ich habe die traurige Nachricht erfahren.",
    "Mark Zuckerberg hat Facebook erfunden.",
    "Ich erfülle mir einen Traum.",
    "Ich habe kein Geschenk erhalten.",
    "Die Firma hat ihre Preise erhöht.",
    "Ich habe dich nicht erkannt.",
    "Ich kann dir das erklären.",
    "Meine Mutter hat mir das Rauchen nicht erlaubt.",
    "Sie hat die Aufgabe erledigt.",
    "Ich möchte ein Sparbuch eröffnen.",
    "Ich konnte dich nicht erreichen.",
    "Der Hund hat mich erschreckt.",
    "Ich erwarte dich um 8.",
    "Meine beste Freundin erzählte mir das.",
    "Sie hat das Kind gut erzogen.",
    "Ich esse einen Hamburger.",
    "Du fehlst mir.",
    "Ich feiere meinen Geburtstag nicht.",
    "Ich kann meine Brille nicht finden.",
    "Folgen Sie mir auf Instagram!",
    "Die Gewerkschaft hat höhere Löhne gefordert.",
    "Der Lehrer hat die Studenten gefördert.",
    "Sie hat ihren Sohn fotografiert.",
    "Darf ich Sie etwas fragen?",
    "Ich habe ein weiches Ei gefrühstückt.",
    "Ich fühle die warme Sonne auf meiner Haut.",
    "Er hat mich aus dem Wald geführt.",
    "Geben Sie mir bitte die Zeitung!",
    "Das gefällt mir nicht.",
    "Kinder sollten ihren Eltern gehorchen.",
    "Wem gehört das?",
    "Das ist dir sehr gut gelungen.",
    "Das genügt mir nicht.",
    "Was ist dir geschehen?",
    "Ich glaube dir kein Wort.",
    "Ich gratuliere dir zum Geburtstag.",
    "Ich grüße dich.",
    "Hast du einen Bruder?",
    "Sie hasst ihn.",
    "Ich kann die schwere Kiste nicht heben.",
    "Ich heize mein Haus mit Sonnenergie.",
    "Kannst du mir helfen?",
    "Die Firma stellt Autos her.",
    "Hol mir bitte einen Kaffee!",
    "Ich höre den Hund bellen.",
    "Informiere mich bitte rechtzeitig!",
    "Ich habe (mir) ein neues Kleid gekauft.",
    "Ich kenne diese Frau seit Jahren.",
    "Ich koche mir ein gutes Essen.",
    "Die Polizei kontrolliert die Ausweise.",
    "Korrigiere bitte meine Fehler!",
    "Er kündigt ihm die Wohnung.",
    "Er hat mich geküsst.",
    "Ich lasse mir die Haare schneiden.",
    "Es tut mir leid.",
    "Er hat mir ein Buch geliehen.",
    "Ich leite die Abteilung.",
    "Ich lerne täglich neue Vokabeln.",
    "Ich lese ein neues Buch.",
    "Ich liebe dich.",
    "Können Sie mir die Matratze liefern?",
    "Die Lehrerin lobt die Schüler.",
    "Wir müssen dieses Problem bald lösen.",
    "Mach mir bitte einen Kaffee!",
    "Das Kind malt ein Bild.",
    "Markieren Sie bitte alle Fehler im Text!",
    "Ich meine die Frau mit den langen Haaren.",
    "Ich meldete der Polizei den Vorfall.",
    "Ich muss mir das Rezept merken.",
    "Er misst den Stromverbrauch.",
    "Ich habe (mir) ein Auto gemietet.",
    "Bring mir ein Geschenk mit!",
    "Teilen Sie mir Ihre neue Adresse mit!",
    "Die Polizei geht einer Spur nach.",
    "Nimm dir einen Kuchen!",
    "Kannst du mir ein Beispiel nennen?",
    "Ich nutze das Internet täglich.",
    "Umweltschutz nützt allen.",
    "Die Hose passt mir gut.",
    "Er pflegt seine Frau.",
    "Die Lehrerin prüft ihre Schüler.",
    "Ich putze die Fenster.",
    "Er hat mir geraten, zu Hause zu bleiben.",
    "Ich rauche eine Zigarette.",
    "Kannst du mir bitte eine Serviette reichen?",
    "Können Sie meine Waschmaschine reparieren?",
    "Reservieren Sie mir zwei Karten!",
    "Ich kann dich nicht riechen.",
    "Er sammelt Briefmarken.",
    "Er würde nie absichtlich jemandem schaden.",
    "Ich schenke dir einen Hund.",
    "Er hat mich geschlagen.",
    "Schließen Sie die Tür!",
    "Schmeckt dir das?",
    "Ich schneide mir die Haare.",
    "Schreiben Sie mir einen Brief!",
    "Er schuldet mir Geld.",
    "Siehst du das große Haus?",
    "Senden Sie mir das Paket!",
    "Er spart Geld, um sich ein Haus zu kaufen.",
    "Er spielte die Hauptrolle.",
    "Spülen Sie die Gläser mit heißem Wasser.",
    "Starten Sie Ihren Computer neu.",
    "Er hat mir Geld gestohlen.",
    "Die Polizei stoppt das Auto.",
    "Das stört mich.",
    "Sie studiert Informatik.",
    "Ich suche eine neue Wohnung.",
    "Kannst du Walzer tanzen?",
    "Wir haben die Rechnung geteilt.",
    "Er hat seine Frau getötet.",
    "Sie trägt ein neues Kleid.",
    "Wir haben die Möbel in einem Lieferwagen nach Hause transportiert.",
    "Ich treffe ihn morgen.",
    "Ich trinke ein Bier.",
    "Ich lasse die Wäsche draußen trocknen.",
    "Er hat ein Reh überfahren.",
    "Er hat mich überholt.",
    "Das Hotel übernimmt keine Haftung für verlorene Gegenstände.",
    "Sie müssen die Straße überqueren.",
    "Der Mann überraschte seine Frau mit einem schönen Blumenstrauß.",
    "Er hat mich überredet.",
    "Übersetzen Sie den Text ins Englische!",
    "Die Firma hat mir das Gehalt überwiesen.",
    "Er hat mich nicht überzeugt.",
    "Sie können die Hose umtauschen.",
    "Ich unterrichte Deutsch.",
    "Ich habe den Vertrag unterschrieben.",
    "Ich unterstütze eine Hilfsorganisation.",
    "Die Ärztin hat mich eingehend untersucht.",
    "Er hat mein Leben verändert.",
    "Er verbietet ihr alles.",
    "Die Amerikaner verbrauchen viel Strom.",
    "Die Polizei hat den Mann verdächtigt.",
    "Sie verdient viel Geld.",
    "Ich habe den Termin vergessen.",
    "Man darf nicht Äpfel mit Birnen vergleichen.",
    "Die Firma vergrößert das Angebot.",
    "Die Polizei hat den Verdächtigen verhaftet.",
    "Er hat mir seine Affäre verheimlicht.",
    "Die Polizei versucht Gewalt zu verhindern.",
    "Er hat mir eine teure Uhr verkauft.",
    "Ich habe meinen Urlaub verlängert.",
    "Ich habe meinen Mann verlassen.",
    "Ich habe mein Handy verloren.",
    "Er hat mir die Wohnung vermietet.",
    "Ich habe den Zug verpasst.",
    "Er hat mir seinen Trick verraten.",
    "Meine Ärztin hat mir ein Medikament verschrieben.",
    "Er hat mir seine Affäre verschwiegen.",
    "Ich habe mein Auto versichert.",
    "Er hat mir ewige Treue versprochen.",
    "Er hat sein Geld gut versteckt.",
    "Ich verstehe dich nicht.",
    "Als Studentin verteilte ich Flyer, um etwas Geld zu verdienen.",
    "Ich vertraue dir nicht.",
    "Ich vertrete meine Kollegin.",
    "Er hat einen Unfall verursacht.",
    "Ich verwende täglich ein Wörterbuch.",
    "Er hat ihr den Seitensprung nie verziehen.",
    "Ich habe ein Essen vorbereitet.",
    "Mein Opa hat mir Märchen vorgelesen.",
    "Kannst du mir einen Termin vorschlagen?",
    "Kannst du mir deinen Freund vorstellen?",
    "Er hat mich gewarnt.",
    "Ich wasche meine Wäsche in der Waschmaschine.",
    "Kannst du bitte die CD wechseln?",
    "Er hat mich geweckt.",
    "Das tut mir weh.",
    "Ich werfe den Brief in den Briefkasten.",
    "Er hat mir ständig widersprochen.",
    "Man muss die Vokabeln wiederholen.",
    "Der Verkäufer wiegt das Obst.",
    "Ich winke mit dem Taschentuch.",
    "Ich weiß nicht alles.",
    "Ich wünsche dir gute Besserung.",
    "Er zählte das Geld.",
    "Ich zahle die Rechnung.",
    "Ich zeichne ein Haus.",
    "Zeig mir dein neues Handy!",
    "Das Feuer hat das Haus zerstört.",
    "Hör mir zu!",
    "Mach das Fenster zu!",
    "Er hat mir beim Kochen zugeschaut.",
    "Er hat mir beim Kochen zugesehen.",
    "Ich stimme dem zu."
  ]
}
let verbsWithPrep = {
  Examples: ['Ob wir fahren, hängt vom Wetter ab.', 'Bitte achte auf den neuen Mantel.', 'Ich fange mit der Übung an.', 'Es kommt auf den richtigen Preis an.', 'Bitte antworten Sie heute auf den Brief.', 'Wir ärgern uns über den Regen.', 'Er hört um 17.00 Uhr mit der Arbeit auf.', 'Ein Babysitter passt auf kleine Kinder auf.', 'Deutsche regen sich über Unpünktlichkeit auf.', 'Frauen geben viel Geld für Schuhe aus.', 'Ich bedanke mich herzlich bei dir.', 'Martin bedankt sich für das Geschenk.', 'Wir beginnen pünktlich mit dem Deutschkurs.', 'Karla bemüht sich um eine Arbeit.', 'Der Reporter berichtet über die Wahlen.', 'Ich beschäftige mich gern mit Pflanzen.', 'Der Gast beschwert sich beim Kellner. Eheringe ', 'bestehen aus Gold.', 'Ich bestehe auf sofortiger Bezahlung des Autos.', 'Viele Studenten beteiligen sich an den Streiks.', 'Er bewirbt sich bei einer Bäckerei.', 'Sie bewirbt sich um eine Stelle als Sekretärin.', 'Meine Frage bezieht sich auf Ihr Angebot. Der ', 'Redner bittet um Aufmerksamkeit.', 'Sam dankt für Ritas Hilfe.', 'Maria denkt oft an den Urlaub.', 'Das Kabinett diskutiert über eine neue Steuer.', 'Ich lade dich zu meinem Geburtstag ein. Frauen ', 'entscheiden sich gern für Gold.', 'Karl entschließt sich zu einem Studium.', 'Mia entschuldigt sich bei ihrem Mann.'
      ,'Ich entschuldige mich für das Verhalten meiner Tochter.', 'Heute haben wir von dem Bauprojekt erfahren.', 'Von dem Schock muss ich mich erst erholen.', 'Wir erinnern uns gern an unser erstes Ehejahr.', 'Man erkennt Pinocchio an seiner langen Nase. ', 'Oma erkundigt sich oft nach meinen Plänen.', 'Die Frau erschrickt über eine Maus.', 'Ein Ostberliner erzählt über sein Leben in der ehemaligen DDR.', 'Der Bischoff erzählt von der Reise nach Rom.', 'Die Journalistin fragt nach den Konsequenzen der Gesetzesänderung.', 'Kinder freuen sich auf Weihnachten.', 'Jeder freut sich über eine Gehaltserhöhung.', 'Immer geht es um Geld.', 'Das Elsass gehört zu Frankreich.', 'Ich kann mich nicht an den Euro gewöhnen.', 'Teenager glauben an die große Liebe.', 'Wir gratulieren dir zum 18. Geburtstag.', 'Ich halte das für keine gute Idee.', 'Kinder halten nicht viel von Ordnung.', 'Bei der Kopie handelt es sich nicht um Originalsoftware.', 'Märchen handeln von Gut und Böse.', 
      'Kann ich dir beim Tischdecken helfen?', 'Ein langsamer Fahrer hindert Greta am Überholen.', 'Im März hoffen alle auf warme Frühlingstage.', 'Ich habe seit Sonntag nichts von Piet gehört.', 'Auf der Messe kann man sich über die neue Technologie informieren.', 'Monika interessiert sich für ein Smartphone.', 'Frauen klagen häufig über Kopfschmerzen.', 'Die Gewerkschaft kämpft für höhere Löhne', 'In der Besprechung kam es zu einem Streit.', 'Karl konzentriert sich auf seine Hausaufgaben.', 'Im Pflegeheim kümmert man sich um alte Leute, die krank sind.', 'Über einen guten Witz muss man laut lachen.', 'Jeder fünfte Manager leidet an Burn-out.', 'Kaffeetrinker leiden unter Schlafproblemen.', 'Beamte müssen nicht über ihre Rente nachdenken.', 'Viele Menschen protestieren gegen Atomkraft.', 'Im Januar muss man mit Schnee rechnen.', 'Deine Mutter redet gern über Krankheiten.', 'Großvater redet von den guten alten Zeiten.',
       'Hier riecht es nach Kuchen.', 'Brigitte sagt über Dietmar, dass er oft lügt.', 'Was sagst du zu meinem neuen Haarschnitt?', 'Die E-Mail schicke ich dir morgen.', 'Der Allgemeinmediziner schickt den Patienten zu einem Spezialisten.', 'Alle schimpfen über den Regen.', 'Muscheln schmecken nach Meerwasser.', 'Bitte schreibe noch heute an deine Mutter.', 'Den Computer des Ministers muss man vor Hackern schützen.', 'Ich bin für die Abschaffung der Kinderarbeit.', 'Viele sind gegen Steuererhöhungen.', 'Kinder müssen im Alter für ihre Eltern sorgen.', 'Ich spreche noch einmal mit deinem Vater.', 'Lass uns über deine Zukunft sprechen.', 'Zwei Deutsche sind an der Grippe gestorben.', 'Ich möchte nicht mit dir streiten.', 'Die USA und Deutschland streiten über eine neue Strategie.', 'Nordkorea nimmt an der Fußball-WM teil.', 'Hast du schon mit dem Arzt telefoniert?']
,Cases: ['Dativ ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Dativ', 'Dativ', 'Dativ', 'Dativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Dativ',
        'Akkusativ', 'Dativ', 'Dativ', 'Akkusativ', 'Dativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Dativ', 'Dativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Dativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Akkusativ', 'Akkusativ', 'Dativ', 'Akkusativ', 'Dativ', 'Dativ', 'Akkusativ', 'Dativ', 'Dativ']
,Verbs :['abhängen', 'achten', 'anfangen', 'ankommen', 'antworten', 'sich ärgern', 'aufhören', 'aufpassen', 'sich aufregen', 'ausgeben', 'sich bedanken', 'sich bedanken', 'beginnen', 'sich bemühen', 'berichten', 'sich beschäftigen', 'sich beschweren', 'bestehen', 'bestehen', 'sich beteiligen', 'sich bewerben', 'sich bewerben', 'sich beziehen', 'bitten', 'danken',
 'denken', 'diskutieren', 'einladen', 'sich entscheiden', 'sich entschließen', 'sich entschuldigen', 'sich entschuldigen', 'erfahren', 'sich erholen', 'sich erinnern', 'erkennen', 'sich erkundigen', 'erschrecken', 'erzählen', 'erzählen', 'fragen', 'sich freuen', 'sich freuen', 'gehen', 'gehören', 'sich', 'glauben', 'gratulieren', 'halten', 'halten', 'sich handeln', 'handeln', 'helfen', 'hindern', 'hoffen', 'hören', 'sich informieren', 'sich interessieren', 'klagen', 'kämpfen', 'kommen', 'sich konzentrieren', 'sich kümmern', 'lachen', 'leiden', 'leiden', 'nachdenken', 'protestieren', 'rechnen', 'reden', 'reden', 'riechen', 'sagen', 'sagen', 'schicken', 'schicken', 'schimpfen', 'schmecken', 'schreiben', 'sich schützen', 'sein', 'sein', 'sorgen', 'sprechen', 'sprechen', 'sterben', 'streiten', 'streiten', 'teilnehmen', 'telefonieren']
,Prep:['von', 'auf', 'mit', 'auf', 'auf', 'über', 'mit', 'auf', 'über', 'für', 'bei', 'für', 'mit', 'um', 'über', 'mit', 'bei', 'aus', 'auf', 'an', 'bei', 'um', 'auf', 'um', 'für', 'an', 'über', 'zu', 'für', 'zu', 'bei', 'für', 'von', 'von', 'an', 'an', 'nach', 'über', 'über', 'von', 'nach', 'auf', 'über', 'um', 'zu', 'an', 'an', 'zu', 'für', 'von', 'um', 'von', 'bei', 'an', 'auf', 'von', 'über', 'für', 'über', 'für', 'zu', 'auf', 'um', 'über', 'an', 'unter', 'über', 'gegen', 'mit', 'über', 'von', 'nach', 'über', 'zu', 'an', 'zu', 'über', 'nach', 'an', 'vor', 'für', 'gegen', 'für', 'mit', 'über', 'an', 'mit', 'über', 'an', 'mit']
}
startingFunctions()