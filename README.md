# custom_login_help

These are relatively simple HTML, CSS, and Javascript snippets you can add to your login.jsp or login-ultra.jsp template files

1. Make 3rd party links more pronounced and availble elsewhere on the page
2. Toggle (show/hide) the direct login form fields


See this screencast recording: https://www.screencast.com/t/R1URYcxcIz

---- add style block above <<bbNG:jsBlock>

  <!-- Custom styles -->
  <style type="text/css">
	/*Hide the redirect providers.*/
	#loginRedirectProviders {
		display:none;
	}

	/*Hide the login form fields*/
	#loginFormFields {
		display:none;
	}
	
	/*Provider link button style*/
	.provlink {
		zoom:150%;
		-moz-transform: scale(1.50);  /* firefox compatible */
		background-color:#c56fd5!important;
	}
	</style>
-------------------------------------------------- 
----  javaScript to get the 3rd party links
----  I updated this to work with all 3rd party links, not just SAML. 

    <script type="text/javascript">
      //This custom script grabs the dynamic links from the 3rd party drop down
      //and then inserts them as button styled links in a div with id = 3rdPartyLinks
      //links with text that start with a colon : are not displayed.
      var providerList = document.querySelectorAll("ul#loginRedirectProviderList li");
      destContainer = document.getElementById("3rdPartyLinks");
      for (p in providerList) {
		  if (providerList[p].firstElementChild.innerText.charAt(0) != ':') {
		      var newElement = document.createElement('a');
			  newElement.id = 'providerLink' + [p];
		      newElement.className = "button expand inverse outline provlink";
		      newElement.href = providerList[p].firstElementChild.href;
		      newElement.innerText = providerList[p].firstElementChild.innerText;
		      destContainer.appendChild(newElement);
		  }
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
--------------------------------------------------
------ html added just above <div id="login-form"

    <!-- Custom HTML buttons for 3rd party providers -->
      <div id="3rdPartyLinks"></div>

   <div id="toggle_login_form">
      <input type="button" name="button1" id="nextbt" class="button expand inverse outline" rel="loginFormFields" value="Click for Direct Login" onclick="buttonToggle(this,' Click to Hide Direct Login ',' Click for Direct Login ')"> 
   </div>
 <!-- END custom HTML --> 
```
