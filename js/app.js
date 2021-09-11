//Define Global Variables
const navUl = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const header = document.querySelector(".page__header");
const upPage = document.querySelector(".hide_backup");

// Creating Nav iteams
function creatNav(){
  sections.forEach(function(el){
    el.classList.remove("your-active-class")
    const htmlCode = `<li ><a id="${el.id}" class="menu__link">${el.dataset.nav}</a></li>`
    navUl.insertAdjacentHTML("beforeend" , htmlCode)
  });
}
// Respond to click on Nav Iteams and go to the specific sectiong
navUl.addEventListener("click" , function(e){
  if(e.target.classList.contains("menu__link")){
    e.preventDefault();
    const getID =  e.target.getAttribute("id");
    const sectionsArr = [...sections];
    const currSection = sectionsArr.find(el => el.id === getID);
    
    currSection.scrollIntoView({behavior:"smooth"});
  }
})

// Add Active Class To The specific section in the viewPort 
const addingActiveClass = function(){

  const funCall = function(e , observer){
    const [x] = e;

    if(x.isIntersecting){
      sections.forEach(el=> el.classList.remove("your-active-class"))
      x.target.classList.add("your-active-class");
    }
  };
  
  const obs = new IntersectionObserver(funCall , {root:null , threshold : 0.4});
  for(i=0;i <=sections.length - 1;i++){
  obs.observe(sections[i]);
    }
  }

// Define Current ScrollY Value
let coords = window.scrollY;
// Creating Functiong To hide nav When User No Longer Scrolling
const hideNav = function(){

    setInterval(function(){
      if(coords == window.scrollY){
        header.classList.remove("page__header");
        header.classList.add("page__hideHeader");

      } else{
        header.classList.remove("page__hideHeader");
        header.classList.add("page__header");
      }
      coords = window.scrollY
    }, 1250)

}


// Configuration to Up Page button
const upButtonConfing = function(){
setInterval(function(){
  if(window.scrollY >= 600){
    upPage.classList.remove("hide_backup");
    upPage.classList.add("back_up")
    
  } else {
    upPage.classList.remove("back_up")
    upPage.classList.add("hide_backup");
  }
} , 1000)

// listening To click on up Page Buttong
upPage.addEventListener("click" , function(e){
window.scrollTo({
  top:0,
  left:0,
  behavior:"smooth"
})
});
}
// I Created These Functiong That Contain All Functions we Need to run to be more organized 
const initialization = function(){
  creatNav ();
  hideNav();
  addingActiveClass();
  upButtonConfing();
}

initialization();