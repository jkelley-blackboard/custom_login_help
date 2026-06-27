<%-- ============================================================
  annotated_login.4000.17.0-rel.28+495176f.jsp
  Clean-annotated copy of the Blackboard login-ultra.jsp from
  release 4000.17.0-rel.28+495176f.
  Original markup by Santiago Vanegas (Blackboard).
  Annotations updated by Jeff Kelley.

  See templates/login-ultra_4000.17.0-rel.28+495176f.jsp for
  the unmodified original.
  ============================================================ --%>

<%-- ── SERVLET / TAGLIB IMPORTS ────────────────────────────────
  Do not remove or reorder these. They pull in JSP includes,
  tag libraries, and server-side helpers that Blackboard requires.
  Check for changes after each SaaS release.
--%>
<%@ include file="/webapis/ui/doctype.jspf" %>
<%@ page import="blackboard.servlet.util.CourseCatalogUtil" %>
<%@ taglib uri="/bbNG" prefix="bbNG" %>
<%@ taglib uri="/loginUI" prefix="loginUI" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:set var="productName" value="${ loginUI:getProductName() }" />

<fmt:message var="viewCourseCatalogLinkText" key="gatewayButtons.view.course.catalog" bundle="${bundles.tags}"/>

<%-- ── PAGE WRAPPER ───────────────────────────────────────────
  bbNG:genericPage is the required outer wrapper for the login page.
  Do not change authentication="N", wrapper="false", or onLoad="loadLoginPage()".
  bodyClass="bb-login" and globalNavigation="false" are also load-bearing.
--%>
<bbNG:genericPage authentication="N" wrapper="false" onLoad="loadLoginPage()" bodyClass="bb-login hide-focus-outline" globalNavigation="false" skipCoreCss="true" allowScale="true">

  <%-- ── REQUIRED PLATFORM ASSETS ────────────────────────────
    These load Blackboard's own CSS and JS. Do not remove them.
    ultra.css  → base styles for the Ultra login page
    hide-focus-outline.js → keyboard nav behavior
    login-page.js → core login logic (form validation, FastInit, etc.)
  --%>
  <bbNG:cssFile href="/ui-ultra/css/ultra.css" />
  <bbNG:jsFile href="/ui-ultra/js/hide-focus-outline.js" />
  <bbNG:jsFile href="/ui-ultra/js/login-page.js" />

  <%-- ── CUSTOM EXTERNAL CSS ──────────────────────────────────
    The recommended way to load a custom CSS file.
    Host the file in bbcswebdav/internal/branding/ and reference
    it with the full server hostname.
    Uncomment and update the URL to use it.
  --%>
  <%-- <bbNG:cssFile href="https://your-institution.blackboard.com/bbcswebdav/internal/branding/custom_login.css"/> --%>

  <%-- ── REQUIRED PLATFORM JAVASCRIPT BLOCK ──────────────────
    bbNG:jsBlock renders as an inline <script> in the page <head>.
    loadLoginPage() and triggerScreenreaderAlert() are called by
    the platform — do not rename or remove them.
  --%>
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

    <%-- ── CUSTOM JAVASCRIPT ────────────────────────────────
      Add custom <script> blocks here, inside bbNG:jsBlock.
      These execute in page-head context before the body renders.

      Blackboard uses Prototype.js — use FastInit.addOnLoad()
      or standard DOMContentLoaded for DOM-dependent code.

      LOAD ORDER MATTERS if using both custom JS files:
        1. custom_login_buttons.js  (populates #3rdPartyLinks)
        2. login_toggle.js          (depends on #3rdPartyLinks being populated)

      Example — load from bbcswebdav:
      <script src="https://your-institution.blackboard.com/bbcswebdav/internal/branding/custom_login_buttons.js"></script>
      <script src="https://your-institution.blackboard.com/bbcswebdav/internal/branding/login_toggle.js"></script>
    --%>
  </bbNG:jsBlock>

  <%-- ── CUSTOM INLINE CSS ────────────────────────────────────
    bbNG:cssBlock renders as an inline <style> block in the <head>.
    This tag is NOT present in the default template — add it here.
    Prefer an external CSS file (bbNG:cssFile above) for larger
    rule sets. Use this block for small, page-specific overrides.
  --%>
  <bbNG:cssBlock>
    <style type="text/css">
      /* Hide the default third-party provider dropdown —
         custom_login_buttons.js clones the links into #3rdPartyLinks instead. */
      /* #loginRedirectProviders { display: none; } */

      /* Hide the username/password fields on initial load —
         login_toggle.js or the toggle button will reveal them. */
      /* #loginFormFields { display: none; } */
    </style>
  </bbNG:cssBlock>

  <%-- ── COOKIE DISCLOSURE ────────────────────────────────────
    Renders a cookie consent banner when the feature is enabled
    in System Admin. Do not remove.
  --%>
  <%@ include file="/webapis/ui/cookie-disclosure-login.jspf"%>

  <%-- ── LANGUAGE PICKER ──────────────────────────────────────
    Renders the language selector dropdown in the top-left corner.
    Do not remove. The loadLocale() function it depends on is
    defined inside loginUI:localePicker's own output.
  --%>
  <div id="loginLang" class="clearfix">
    <loginUI:localePicker />
  </div>

  <%-- ── MAIN PAGE BODY ────────────────────────────────────────
    Everything visible on the login page lives inside this .row div.
    Three children:
      #login-block   → logo, login form, and all auth controls
      .login-page-announcements → system announcements
      .small-12      → footer (copyright, catalog link, option links)
  --%>
  <div class="row">

    <%-- ── LOGIN BLOCK ─────────────────────────────────────────
      Contains the logo, error messages, and the login form.
      The Foundation CSS grid classes (small-11, medium-12, columns)
      control responsive width — avoid changing them.
    --%>
  	<div id="login-block" class="small-11 small-centered medium-12 medium-centered text-center columns">

      <%-- loginUI:loginHeaderIcon renders the logo <h1>.
           If a custom logo image has been uploaded in Institution
           Branding, the customized-logo class is applied and the
           <img> src points to your uploaded file.
           Do not remove this tag. --%>
  		<loginUI:loginHeaderIcon loginCssClass="login-logo new-logo" customizedCssClass="customized-logo" headerText="${productName}" />

      <%-- Renders the login error message container.
           Do not remove — it is populated dynamically by the platform. --%>
  		<loginUI:errorMessage />

  		<c:if test="${ ( param.isSuccessfulPasswordUpdate eq 'true' ) && ( param.action eq 'relogin' )  }">
  	      <%@ include file="/passwordSuccessConfirmationReceipt.jspf"%>
  		</c:if>

      <%-- ── CUSTOM HTML INJECTION POINT ───────────────────────
        Place custom HTML ABOVE <div id="login-form"> so that
        it appears above the username/password fields.

        #3rdPartyLinks   → populated by custom_login_buttons.js with
                           cloned provider links as styled buttons.
        #toggle_login_form → a button that shows/hides #loginFormFields
                             (the username/password inputs).

        The toggle button uses buttonToggle(), defined in the
        examples/mods_to_login-utra-jsp.txt legacy snippet, or you
        can use login_toggle.js for the checkbox-based version.
      --%>
      <!-- Custom: third-party provider buttons -->
      <div id="3rdPartyLinks"></div>

      <!-- Custom: toggle button for the direct login form -->
      <%--
      <div id="toggle_login_form">
        <input type="button" id="nextbt" class="button expand inverse outline"
               rel="loginFormFields"
               value="Click for Direct Login"
               onclick="buttonToggle(this,'Click to Hide Direct Login','Click for Direct Login')">
      </div>
      --%>
      <%-- ── END CUSTOM HTML INJECTION POINT ────────────────── --%>

      <%-- loginUI:loginForm renders the full login form including:
             - Username field       (id="user_id")
             - Password field       (id="password")
             - Sign In button       (id="entry-login")
             - MFA dialogs
             - Third-party provider dropdown (#loginRedirectProviders)
               containing #loginRedirectProviderList

           IMPORTANT: Do not modify the <form> structure, field ids,
           or MFA placeholder values (${mfaSecretKey}, etc.).
           These are tied to Blackboard's authentication backend.
      --%>
  		<div id="login-form" class="login-form">
  			<loginUI:loginForm />
  		</div>

    </div>

    <%-- ── SYSTEM ANNOUNCEMENTS ─────────────────────────────────
      Renders up to 5 active system announcements below the login form.
      Safe to style with CSS targeting #loginAnnouncements.
      Do not remove the tag.
    --%>
    <div class="login-page-announcements">
      <loginUI:systemAnnouncements maxItems="5" />
    </div>

    <%-- ── FOOTER ───────────────────────────────────────────────
      Contains the course catalog link (if enabled), copyright
      notice, and gateway buttons (Help, Privacy, Terms of Use,
      Accessibility).
    --%>
    <div class="small-12 small-centered text-center columns">

      <%-- Course catalog link — only renders if catalog is enabled. --%>
      <c:if test="${ CourseCatalogUtil.getAllowCatalog() }">
        <div id="ultraCourseCatalogLink">
          <a href="${ CourseCatalogUtil.getCatalogUrl( CourseCatalogUtil.getAllowCatalog() ) }">${viewCourseCatalogLinkText}</a>
        </div>
	    </c:if>

      <%-- Renders the copyright line. Do not remove. --%>
      <bbNG:copyright />

      <%-- Renders Help, Privacy Policy, Terms of Use, and
           Accessibility links. Do not remove. --%>
      <div id="loginOptions">
        <loginUI:gatewayButtons />
      </div>

    </div>
  </div>
</bbNG:genericPage>
