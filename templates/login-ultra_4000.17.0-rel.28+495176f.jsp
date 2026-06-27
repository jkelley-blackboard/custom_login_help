<%@ include file="/webapis/ui/doctype.jspf" %>
<%@ page import="blackboard.servlet.util.CourseCatalogUtil" %>
<%@ taglib uri="/bbNG" prefix="bbNG" %>
<%@ taglib uri="/loginUI" prefix="loginUI" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:set var="productName" value="${ loginUI:getProductName() }" />

<fmt:message var="viewCourseCatalogLinkText" key="gatewayButtons.view.course.catalog" bundle="${bundles.tags}"/>

<bbNG:genericPage authentication="N" wrapper="false" onLoad="loadLoginPage()" bodyClass="bb-login hide-focus-outline" globalNavigation="false" skipCoreCss="true" allowScale="true">
  <bbNG:cssFile href="/ui-ultra/css/ultra.css" />
  <bbNG:jsFile href="/ui-ultra/js/hide-focus-outline.js" />
  <bbNG:jsFile href="/ui-ultra/js/login-page.js" />

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
  </bbNG:jsBlock>

  <%@ include file="/webapis/ui/cookie-disclosure-login.jspf"%>

  <div id="loginLang" class="clearfix">
    <loginUI:localePicker />
  </div>

  <div class="row">
  	<div id="login-block" class="small-11 small-centered medium-12 medium-centered text-center columns">
  		<loginUI:loginHeaderIcon loginCssClass="login-logo new-logo" customizedCssClass="customized-logo" headerText="${productName}" />
  		<loginUI:errorMessage />

  		<c:if test="${ ( param.isSuccessfulPasswordUpdate eq 'true' ) && ( param.action eq 'relogin' )  }">
  	      <%@ include file="/passwordSuccessConfirmationReceipt.jspf"%>
  		</c:if>

  		<div id="login-form" class="login-form">
  			<loginUI:loginForm />
  		</div>
    </div>
    <div class="login-page-announcements">
      <loginUI:systemAnnouncements maxItems="5" />
    </div>
    <div class="small-12 small-centered text-center columns">
      <c:if test="${ CourseCatalogUtil.getAllowCatalog() }">
        <div id="ultraCourseCatalogLink">
          <a href="${ CourseCatalogUtil.getCatalogUrl( CourseCatalogUtil.getAllowCatalog() ) }">${viewCourseCatalogLinkText}</a>
        </div>
	    </c:if>
      <bbNG:copyright />
      <div id="loginOptions">
        <loginUI:gatewayButtons />
      </div>
    </div>
  </div>
</bbNG:genericPage>
