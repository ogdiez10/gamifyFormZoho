<?php
/**
 * Plugin Name: Gamify Zoho Form
 * Plugin URI: https://www.diez10.mx
 * Description: Display form using shortcode [show_OGforms] and send values to Zoho form.
 * Version: 0.1
 * Text Domain: gamify-zoho-form
 * Author: OGdiez10
 */


add_action('wp_enqueue_scripts', 'callback_for_setting_up_scripts');
function callback_for_setting_up_scripts() {
    wp_register_style( 'gamifyzohoform', '/wp-content/plugins/gamifyFormZoho/includes/styles.css?v=1.0.0' );
    wp_enqueue_style( 'gamifyzohoform' );
    wp_enqueue_script( 'gamifyzohoformscript', '/wp-content/plugins/gamifyFormZoho/includes/script.js?v=1.0.0', array( 'jquery' ) );
}




function showFormsFunction() {
$thankyou = 0;
$pluginPath = 'wp-content/plugins/gamifyFormZoho';
$rURI = $_SERVER['REQUEST_URI'];

if(str_contains($rURI, '?')){   //To show the thank you message once submittef
    $actual_link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]&thankyou=1"; 
}
else {
    $actual_link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]?thankyou=1";
}

if(isset($_GET["thankyou"])){
$thankyou = $_GET["thankyou"];
}

//HTML STEPS FORM and ZOHO (html) hidden form.
$content = ' 
<div class="multiformwrapper">
<form class="multistepGriffin mini">

<div class="progressbar">
<hr >
<div class="progress show1 active"></div>
<div class="progress show2"></div>
<div class="progress show3"></div>
<div class="progress show4"></div>
<div class="progress show5"></div>
<div class="progress show6"></div>
</div>

<div class="step" id="step1">
    <h3>What are the funds for?</h3>
    <span class="sfError">Please select an option</span>
<div class="buttons full show2" data-value="Purchase" onclick="PurchaseRefinance(\'purchase\')">
    <span>Purchase Real Estate</span><img src="/'.$pluginPath.'/includes/purchase.png" />
</div>
<div class="buttons full show2" data-value="Refinance" onclick="PurchaseRefinance(\'refinance\')">
    <span>Refinance Real Estate</span><img src="/'.$pluginPath.'/includes/refinance.png">
    <div class="tooltipin" data-show="tooltip1"></div>
    <div class="tooltipintext" id="tooltip1">This includes borrowers
    who want additional cash-out on their loan.</div>
</div>
</div>

<div class="step" id="step2">
<h3>How much funding do you need?</h3>
<div class="groupfull">
<input type="text" name="amount" id="amount" placeholder="ex: 15,000" />
<span class="sfError amounterror">Minimum loan amount $1,000.</span>
</div>
<button type="button" class="show3validate continue">Continue</button>
</div>

<div class="step" id="step3">
<h3>Where is the real estate located?
<div class="tooltipin" data-show="tooltip2"></div>
</h3>
<div class="groupfull">
<select name="state" id="state" onchange="show4()">
  <option value="" selected="selected">Select a State</option>
  <option value="Arizona">Arizona</option>
  <option value="California">California</option>
  <option value="Colorado">Colorado</option>
  <option value="Minnesota">Minnesota</option>
  <option value="Texas">Texas</option>
</select>
<div class="tooltipintext" id="tooltip2">We
only lend on properties in the states listed here</div>
<span class="sfError stateerror">Field Required</span>
</div>
</div>

<div class="step" id="step4">
<h3>What is your name?</h3>
<div class="groupfull">
<label>First Name</label>
<input type="text" name="firstname" id="firstname" placeholder="John Michael" />
<span class="sfError firstnameerror">Field Required</span>
</div>
<div class="groupfull">
<label>Last Name</label>
<input type="text" name="lastname" id="lastname" placeholder="Smith" />
<span class="sfError lastnameerror">Field Required</span>
</div>
<button type="button" class="show5 continue">Continue</button>
</div>

<div class="step" id="step5">
<h3>What number can we reach you at?</h3>
<div class="groupfull">
<label>Phone Number
<div class="tooltipin" data-show="tooltip3"></div>
</label>
<input type="text" name="phone" id="phone" placeholder="(XXX) XXX-XXXX" />
<span class="sfError phoneerror">Phone number must be 10 digits</span>
</div>
<div class="groupfull">
<label>Email
<div class="tooltipin" data-show="tooltip3"></div></label>
<input type="text" name="email" id="email" placeholder="J.Smith@gmail.com" />
<span class="sfError emailerror">Please enter a valid e-mail address</span>
</div>
<div class="tooltipintext" id="tooltip3">We do not use this information for any
marketing purposes and only use this to contact you regarding this request.</div>
<button type="button" class="show6validate continue">Continue</button>
</div>

<div class="step" id="step6">
<h3>Please provide specifics to further expedite your request
<div class="tooltipin" data-show="tooltip4"></div></h3>
<div class="groupfull">
<textarea name="request" id="request" placeholder="Enter details..."></textarea>
</div>
<span class="sfError finalerror">Please complete all fields before submitting</span>
<div class="tooltipintext" id="tooltip4">Property address, current loan (if any), etc.</div>
<button id="submitContactForm" onclick="submitForm()" type="button">Submit</button>
</div>

<div class="step" id="stepThanks">
<p><img src="/'.$pluginPath.'/includes/sent.png" /></p>
<h2>Thank you.</h2>
<p class="thanks">Your answer has been submitted. A member of our team will be in touch shortly.</p>
</div>
</form>
</div>

<form action="ACTION_REMOVED" name="form" id="Zohoform" method="POST" accept-charset="UTF-8" enctype="multipart/form-data" class="realForm multistepGriffin">
<input type="hidden" name="zf_referrer_name" value=""><!-- To Track referrals , place the referrer name within the " " in the above hidden input field -->
<input type="hidden" name="zf_redirect_url" value="'.$actual_link.'"><!-- To redirect to a specific page after record submission , place the respective url within the " " in the above hidden input field -->
<input type="hidden" name="zc_gad" value=""><!-- If GCLID is enabled in Zoho CRM Integration, click details of AdWords Ads will be pushed to Zoho CRM -->
<input type="hidden" name="utm_source" value=""/>
<input type="hidden" name="utm_medium" value=""/>
<input type="hidden" name="utm_campaign" value=""/>
<input type="hidden" name="utm_term" value=""/>
<input type="hidden" name="utm_content" value=""/>
<input type="hidden" name="aid" value=""/>
<input type="hidden" name="keyword" value=""/>
<input type="hidden" name="gclid" value=""/>
<input type="hidden" name="distribution" value=""/>
<h2>Loan Request Dept</h2>
<p></p>
<!--Name-->
<label> Name 
<em>*</em>
</label>
<input type="text" maxlength="255" name="Name_First" id="ZohoFirst" fieldType=7 placeholder="" />
<label>First</label>
<input type="text" maxlength="255" name="Name_Last" fieldType=7 id="ZohoLast" placeholder="" />
<label>Last</label>
<!--Phone-->
<label> Phone 
<em>*</em>
</label>
<input type="text" compname="PhoneNumber_countrycodeval" name="PhoneNumber_countrycodeval" phoneFormat="1" maxlength="10" id="international_PhoneNumber_countrycodeval" placeholder=""/>
<label>Code</label>
<input type="text" compname="PhoneNumber" name="PhoneNumber_countrycode" phoneFormat="1" isCountryCodeEnabled=true maxlength="20" value="" fieldType=11 id="international_PhoneNumber_countrycode" placeholder="" />
<label>Number</label>
<!--Email-->
<label> Email 
<em>*</em>
</label>
<input type="text" maxlength="255" name="Email" value="" id="ZohoEmail" fieldType=9 placeholder="" />
<!--Radio-->
<label>Is your loan request to purchase real estate?
<em>*</em>
</label>
<input type="radio" id="Radio_1" name="Radio" value="Yes">
<label for="Radio_1" >Yes</label>
<input type="radio" id="Radio_2" name="Radio" value="No">
<label for="Radio_2" >No</label>
<!--Radio-->
<label>Is your loan to refinance or get cash-out of a property you own?
<em>*</em>
</label>
<input type="radio" id="Radio2_1" name="Radio2" value="Yes">
<label for="Radio2_1" >Yes</label>
<input type="radio" id="Radio2_2" name="Radio2" value="No">
<label for="Radio2_2" >No</label>
<!--Radio-->
<label>In what State is the property located that you are using as collateral for the loan?
<em>*</em>
</label>
<input type="radio" id="Radio1_1" name="Radio1" value="Arizona">
<label for="Radio1_1" >Arizona</label>
<input type="radio" id="Radio1_2" name="Radio1" value="California">
<label for="Radio1_2" >California</label>
<input type="radio" id="Radio1_3" name="Radio1" value="Colorado">
<label for="Radio1_3" >Colorado</label>
<input type="radio" id="Radio1_4" name="Radio1" value="Minnesota">
<label for="Radio1_4" >Minnesota</label>
<input type="radio" id="Radio1_5" name="Radio1" value="Texas">
<label for="Radio1_5" >Texas</label>
<p>* We ONLY fund loans secured by real estate in AZ, CA, MN and TX.</p>
<!--Multi Line-->
<label> Please provide specifics about your request: 
</label>
<textarea name="MultiLine" id="ZohoRequest" maxlength="65535" placeholder="" ></textarea>
<label><div><br /></div></label>
<label><div><br /></div></label>
<label><div class="align-justify" style="text-align: justify"><b><span class="size" style="font-size: 18.6667px"><span class="font" style="font-family: arial, helvetica, sans-serif, sans-serif">All of our loans are secured by real estate only. If you are NOT purchasing a property or using an existing property as collateral (security) for the loan, we cannot help. Please feel free to call us at 888.334.6636 with questions.​</span></span></b><br /></div></label>
<label><div><br /></div></label>
<label><div><br /></div></label>
<label><div><br /></div></label>
<label><div><br /></div></label>
<label><div><br /></div></label>
<button type="submit" id="submitZoho"><em>Submit</em></button></form>
';

if($thankyou == 1){ //Hide the form and show the thank you message
    $content .= '<script> 
    jQuery(document).ready(function(){
        jQuery(".progressbar").fadeOut(0);
        jQuery("#stepThanks").fadeIn(0); 
    });
   </script>';
}


else { 
    $content .= '<script>  
    jQuery(document).ready(function(){  //Show Step 1
          jQuery("#step1").fadeIn(0);
          jQuery("div.form").fadeIn(500);
    });
    </script>';
}



 return $content;

}


add_shortcode('show_OGforms', 'showFormsFunction');

?>