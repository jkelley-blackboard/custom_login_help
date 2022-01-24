# custom_login_help

These are relatively simple HTML, CSS, and Javascript snippets you can add to your login.jsp or login-ultra.jsp template files

1. Make 3rd party links more pronounced and availble elsewhere on the page
2. Toggle (show/hide) the direct login form fields
3. Basic background image updates


See this sharecast recording: https://www.screencast.com/t/B1DjvJ43rF

---- add style block above <<bbNG:jsBlock>

	<style type="text/css">
	/*Customized styles for SAML button login.*/

	/*Take the custom logo out of the circle.*/
	.bb-login .new-logo.customized-logo img {
		width: unset;
		height: unset;
		border-radius: unset;
	}

	/*Hide the redirect providers.*/
	#loginRedirectProviders {
		display:none;
	}

	/*Hide the default login form fields*/
	#loginFormFields {
		display:none;
	}

	</style>
----  
----  javaScript to get the 3rd party link

<script type="text/javascript">
  //This custom script grabs the 1st dynamic SAML link from the 3rd party drop down
  //and then sets the hyperlink to that value for a custom element with id "mySaml"
  var rlinks = document.querySelectorAll("a[href*='/auth-saml/saml/login?apId']");
  document.getElementById("mySaml").href = rlinks[0]
</script>
----
----  javaScript to toggle the local login form fields

<script type='text/javascript'>
  //This custom script creates a toggle function to show/hide the login form div.
  function buttonToggle(where, pval, nval) {
    var table = document.getElementById(where.attributes.rel.value);
    where.value = (where.value == pval) ? nval : pval;
    table.style.display = (table.style.display == 'block') ? 'none' : 'block';
  }
</script>
-------
------ html added just above <div id="login-form"
```html
<!-- START Custom HTML buttons for SAML redirect and toggle login form -->
  <div id="samlLogin">
      <p id="samlButton"><a id="mySaml" class="button expand inverse outline" href="">Click here for SAML Login</a></p>
   </div>

<div id="toggle_login_form">
      <input type="button" name="button1" id="nextbt" class="button expand inverse outline" rel="loginFormFields" value="Click for Direct Login" onclick="buttonToggle(this,' Click to Hide Direct Login ',' Click for Direct Login ')"> 
   </div>
 <!-- END custom HTML --> 
```
