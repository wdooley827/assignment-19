import $ from 'jquery'
import { githubApiKey } from '../../secrets.js'


var pageContent = document.querySelector('.page_content')
var tabsContainer = document.querySelector('.tabcontent__list')
    //${githubApiKey}
  $.getJSON('https://api.github.com/users/wdooley827?access_token=70cf004c363aecad949cf44bbe62053e4ed5bd0f').then(function(serverRes){
    // console.log(serverRes)
    //wrong
    var profileContainer = document.querySelector('.profileSideBar')
    var profileObject = serverRes
    var profileDiv = `
    <div class="profileSideBar__info">
      <div class="row">
        <div class="col-xs-12">
          <div class="thumbnail">
            <img src=${profileObject.avatar_url}>
            <div class="caption">
              <h2>${profileObject.name}</h2>
              <h3>${profileObject.login}</h3>
              <p><a href="#" class="btn btn-primary profileBtn" role="button">Follow</a></p>
              <p>Block or report user</p>
              <hr>
              <h4>${profileObject.company}</h4>
              <h5>${profileObject.location}</h5>
              <p>${profileObject.email}</p>
              <a href="${profileObject.html_url}">${profileObject.html_url}</a>

            </div>
          </div>
        </div>
      </div>
    </div>`

    profileContainer.innerHTML = profileDiv
  })

// Render the tab
function renderActiveTab(theCurrentRoute){
  var previousTab = document.querySelector('[class="tabcontent__tab active"]')
  previousTab.classList.remove('active')

  var currentTab = document.querySelector(`[data-route="${theCurrentRoute}"]`)
  currentTab.classList.add('active')
}

// Render content on tab
function renderContent(domEl, theRoute, theContent){

  if(theRoute === 'overview'){
    domEl.innerHTML = 'hello'
  }
  if(theRoute === 'repositories'){
    function buildProfileTemplate(bioApiData, repositoriesApiData){
      var bioList = bioApiData[0].results
      return bioList
      }
      console.log(bioList)
  }
  if(theRoute === 'stars'){
    domEl.innerHTML = 'oh hi'
  }
  if(theRoute === 'followers'){
    domEl.innerHTML = 'oh heeeey'
  }
  if(theRoute === 'following'){
    domEl.innerHTML = 'goodbye'
  }
}

var controllerRouter = function(){
  var currentRoute = window.location.hash.slice(1)
  //the fix
  if (currentRoute === "overview"){
    renderContent(pageContent, currentRoute)
  }
  if (currentRoute === "repositories"){
    renderContent(pageContent, currentRoute)
  }
  if (currentRoute === "stars"){
    renderContent(pageContent, currentRoute)
  }
  if (currentRoute === "followers"){
    renderContent(pageContent, currentRoute)
  }
  if (currentRoute === "following"){
    renderContent(pageContent, currentRoute)
  }
  renderActiveTab(currentRoute)
}

tabsContainer.addEventListener('click',function(evt){
  var clickedTab = evt.target
  var route = clickedTab.dataset.route
  window.location.hash = route
})

controllerRouter()
window.addEventListener('hashchange', controllerRouter)
