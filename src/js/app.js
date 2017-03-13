//IMPORTS
import $ from 'jquery';
import { githubApiKey } from '../../secrets.js';

var pageContent = document.querySelector('.page_content')
var search = document.querySelector('.searchBarInput')

function renderContent(domEl, theRoute, theContent){
  var currentUser = theRoute
  if(currentUser === ''){
    currentUser = "wdooley827"
  }
  var profileEl = $.getJSON(`https://api.github.com/users/${currentUser}?access_token=${githubApiKey}`)
  var repositoryEl = $.getJSON(`https://api.github.com/users/${currentUser}/repos?access_token=${githubApiKey}`)


    function buildProfileTemplate(profileApiData, repositoriesApiData){

      var profileObject = profileApiData[0]
      var repositoriesList = repositoriesApiData[0]
      var createBioHtmlComponents =
        `
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
        `
      var createRepositoryHtmlComponents = repositoriesList.map(function(repositoryObj){
        return `
          <h1>${repositoryObj.name}</h1>
          <h2>${repositoryObj.description}</h2>
          <h2>${repositoryObj.language} || ${repositoryObj.created_at}</h2>
          <hr>
          `
      }).join('')

      let htmlHolder =
        `
          <div class="row">
            <div class="col-xs-6 profile">
              ${createBioHtmlComponents}
            </div>
            <div class="col-xs-6 repository">
              ${createRepositoryHtmlComponents}
            </div>
          </div>
        `
        return htmlHolder
    }


    $.when(profileEl, repositoryEl).then(function(profileData, repositoryData){
      domEl.innerHTML = buildProfileTemplate(profileData, repositoryData)
    })
}

var controllerRouter = function(){
  var currentRoute = window.location.hash.slice(1)
  renderContent(pageContent, currentRoute)
}

search.addEventListener('keydown',function(evt){
  if (evt.keyCode === 13){
    var searchInput = evt.target.value
    window.location.hash = searchInput
    evt.target.value = ""
  }
})

controllerRouter()
window.addEventListener('hashchange', controllerRouter)
