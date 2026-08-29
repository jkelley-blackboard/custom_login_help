<!-- This login.jsp filee has been marked up with comments identifying sections to make it easier to make changees to the default login page for Blackboard. This is from 4000.6.0-rel.18+e230fa0. Original mark up by Santiago Vanegas from Blackboard, updated by Jeff Kelley.-->

<!-- This section calls various servlets from the Learn environment and other things you don't want to touch. Do not delete anything in this section. Check for mods in future releases. -->
<%@ include file="/webapis/ui/doctype.jspf" %>
<%@ page import="blackboard.servlet.util.CourseCatalogUtil" %>
<%@ taglib uri="/bbNG" prefix="bbNG" %>
<%@ taglib uri="/loginUI" prefix="loginUI" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:set var="productName" value="${ loginUI:getProductName() }" />

<fmt:message var="viewCourseCatalogLinkText" key="gatewayButtons.view.course.catalog" bundle="${bundles.tags}"/>

<!-- The remainder of the code should live in this bbNG:genericPage block.  -->
<bbNG:genericPage authentication="N" wrapper="false" onLoad="loadLoginPage()" bodyClass="bb-login hide-focus-outline" globalNavigation="false" skipCoreCss="true" allowScale="true">

<!-- Calls CSS and js files for elements appearing in the page -->
  <bbNG:cssFile href="/ui-ultra/css/ultra.css" />
  <bbNG:jsFile href="/ui-ultra/js/hide-focus-outline.js" />
  <bbNG:jsFile href="/ui-ultra/js/login-page.js" />
  <!-- This is the best way to call external css files using the bbNG:cssFile tag. Example provided.-->
  <!-- <bbNG:cssFile href="https://someone.blackboard.com/bbcswebdav/internal/branding/custom_css/custom_login.4000.6.css"/> -->

<!-- The jsBlock contains the js you would add in an html header. -->
  <bbNG:jsBlock>
    <script type="text/javascript">
      function loadLoginPage() {
        if(document.forms.login.user_id != undefined)
        {
          verify_username_password(document.forms.login);
        }
        setTimeout("triggerScreenreaderAlert()", 500);
      }

      function triggerScreenreaderAlert() {
        if (document.getElementById('loginErrorMessage')) {
          $('loginErrorMessage').update($('loginErrorMessage').innerHTML);
        }
      }
    </script>
	<!-- Add custom javascript(s) here in their own <script> blocks. -->
	
  </bbNG:jsBlock>
  
<!-- Local, custom CSS here. The bbng:cssBlock tag does not come in the default template file. You need to add it separately -->
  <bbNG:cssBlock>
    <style type="text/css">
	</style>
  </bbNG:cssBlock>
  
<!-- If enabled, this calls the cookie disclosure statement. Don't remove it. -->
  <%@ include file="/webapis/ui/cookie-disclosure-login.jspf"%>

<!-- Here's where the page starts with body elements. -->

  <!-- This loginUI:localePicker renders the language select element. Don't remove it. -->
  <div id="loginLang" class="clearfix">
    <loginUI:localePicker />
  </div>

  <!-- This div holds the remainder of the login page elements. --> 
  <div class="row">
    
	<!-- Holds logo, login form, and controls. -->
  	<div id="login-block" class="small-11 small-centered medium-12 medium-centered text-center columns">
  		<loginUI:loginHeaderIcon loginCssClass="login-logo new-logo" customizedCssClass="customized-logo" headerText="${productName}" />
  		<loginUI:errorMessage />

  		<c:if test="${ ( param.isSuccessfulPasswordUpdate eq 'true' ) && ( param.action eq 'relogin' )  }">
  	      <%@ include file="/passwordSuccessConfirmationReceipt.jspf"%>
  		</c:if>
        
		<!-- loginUi:login-form renders the username and password fields, forgot password and 3rd party links -->
  		<div id="login-form" class="login-form">
  			<loginUI:loginForm />
  		</div>
    </div>
	
	<!-- system announcements promoted to the login page. -->
    <div class="login-page-announcements">
      <loginUI:systemAnnouncements maxItems="5" />
    </div>
	
	<!-- footer element with catalog, copyright and resource links.  -->
    <div class="small-12 small-centered text-center columns">
	
	  <!-- if catalog is enabled...-->
      <c:if test="${ CourseCatalogUtil.getAllowCatalog() }">
        <div id="ultraCourseCatalogLink">
          <a href="${ CourseCatalogUtil.getCatalogUrl( CourseCatalogUtil.getAllowCatalog() ) }">${viewCourseCatalogLinkText}</a>
        </div>
	    </c:if>
	  <!-- Render copyright-->
      <bbNG:copyright />
	  <!--Help, Privacy and Terms of Use, Accessibility links. -->
      <div id="loginOptions">
        <loginUI:gatewayButtons />
      </div>
	  
    </div>
  </div>
</bbNG:genericPage>
