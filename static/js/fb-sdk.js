window.fbAsyncInit = function() {
  FB.init({
    appId      : '858336981978288',
    xfbml      : true,
    version    : 'v15.0'
  })
  FB.AppEvents.logPageView()
};

(function(d, s, id){
  let js; const fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {return}
  js = d.createElement(s); js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))