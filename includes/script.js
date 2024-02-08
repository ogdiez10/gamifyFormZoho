let ZohoFirst = '', ZohoLast = '', ZohoPhone = '', 
ZohoEmail = '', ZohoRealEstate = '', ZohoCash = '', ZohoState = '', ZohoRequest = '', amount = '', comments = ''
let ZohoCode = '+1'; //Only US numbers

function PurchaseRefinance(type){
    if(type = 'purchase'){
        ZohoRealEstate = 'Yes' 
        ZohoCash = 'No'
    }
    else if(type = 'refinance'){
        ZohoRealEstate = 'No'
        ZohoCash = 'Yes'
    }
}



function updateZoho() {

amount = jQuery('#amount').val(); 
comments =  jQuery('#request').val();
ZohoFirst = jQuery('#firstname').val(); 
ZohoLast = jQuery('#lastname').val(); 
ZohoRequest = 'Amount: ' + amount + ' Details: ' + comments;
ZohoState = jQuery('#state').val(); 
ZohoPhone = jQuery('#phone').val(); 
ZohoEmail = jQuery('#email').val(); //Get values from form

jQuery('#ZohoFirst').val(ZohoFirst);
jQuery('#ZohoLast').val(ZohoLast);
jQuery('#international_PhoneNumber_countrycodeval').val(ZohoCode);
jQuery('#international_PhoneNumber_countrycode').val(ZohoPhone);
jQuery('#ZohoEmail').val(ZohoEmail);
jQuery('#ZohoRequest').val(ZohoRequest); //Show values for hidden Zoho form

if(ZohoRealEstate == 'Yes') {
    jQuery('#Radio_1').prop('checked', true);
    jQuery('#Radio2_1').prop('checked', true);
}

else if(ZohoRealEstate == 'No') {
    jQuery('#Radio_2').prop('checked', true);
    jQuery('#Radio2_2').prop('checked', true);
}

switch(ZohoState) {
    case 'Arizona':
    jQuery('#Radio1_1').prop('checked', true);
    break;

    case 'California':
    jQuery('#Radio1_2').prop('checked', true);
    break;

    case 'Minnesota':
    jQuery('#Radio1_3').prop('checked', true);
    break;

    case 'Texas':
    jQuery('#Radio1_4').prop('checked', true); //Check radios on Zoho hidden form
    break;
}


}

function show1(){ //Functions to show each step
    jQuery(".step").hide(); 
    jQuery("#step1").show();
    jQuery(".progress").removeClass("active");
    jQuery(".progress.show1").addClass("active");
    updateZoho();
}

function show2(){
    jQuery(".step").hide();
    jQuery("#step2").show();
    jQuery(".progress").removeClass("active");
    jQuery(".progress.show2").addClass("active");
    updateZoho();
}


function show3(){
    jQuery(".step").hide();
    jQuery("#step3").show();
    jQuery(".progress").removeClass("active");
    jQuery(".progress.show3").addClass("active");
    updateZoho();
}


function show4(){
    jQuery(".step").hide();
    jQuery("#step4").show();
    jQuery(".progress").removeClass("active");
    jQuery(".progress.show4").addClass("active");
    updateZoho();
}

function show5(){
    jQuery(".step").hide();
    jQuery("#step5").show();
    jQuery(".progress").removeClass("active");
    jQuery(".progress.show5").addClass("active");
    updateZoho();
}

function show6(){
    jQuery(".step").hide();
    jQuery("#step6").show();
    jQuery(".progress").removeClass("active");
    jQuery(".progress.show6").addClass("active");
    updateZoho();
}


//Email and phone custom validations
function validateEmail(email) {
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailReg.test(email);
}

function validatePhone(phone) {
    var phoneno = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    if (phone.match(phoneno)) {
        return true; 
    } else {
        return false;
    }
}

//Clean and validate with minimum amount
function validateAmount(){

        let amounttmp = jQuery("#amount").val();
        let amountrestmp = amounttmp.replace(/\D/g, "");
        if (amountrestmp != "" && amountrestmp >= 1000) {
            jQuery("#amount").removeClass("error");
            jQuery(".amounterror").fadeOut(0);
            show3()
        }
        else {
            jQuery("#amount").addClass("error");
            jQuery(".amounterror").fadeIn(300);
        }
}


//Validate step where the phone and number are
function validatePhoneEmail() {

        jQuery("#phone").removeClass("error");
        jQuery(".phoneerror").fadeOut(100);
        jQuery("#email").removeClass("error");
        jQuery(".emailerror").fadeOut(0);

    if(validatePhone(jQuery("#phone").val()) == true && validateEmail(jQuery("#email").val()) == true){
        show6();
    }
    if(validatePhone(jQuery("#phone").val()) != true ) {
        jQuery("#phone").addClass("error");
        jQuery(".phoneerror").fadeIn(100);
    }
    if(validateEmail(jQuery("#email").val()) != true) {
        jQuery("#email").addClass("error");
        jQuery(".emailerror").fadeIn(0);
    }
}

jQuery(window).on("load", function() {
    
    jQuery(".tooltipin, .notooltip").hover(function() {
        var toolshow = jQuery(this).data("show");
        jQuery("#" + toolshow).fadeIn(100);
    }, function() {
        var toolshow = jQuery(this).data("show");
        jQuery("#" + toolshow).fadeOut(100);
    });  //Tooltips

    //Format the amount to money $100,000
    jQuery("#amount").keyup(function(){

        const value = this.value.replace(/\D/g, "");
        this.value = parseFloat(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
        minimumFractionDigits: 0

        }) 
    
    });


    //Format the phone (XX)XXX-XXXX
	jQuery("#phone").keyup(function (e) {
		var key = e.which || e.charCode || e.keyCode || 0;
		$phone = jQuery(this);

    // Don"t let them remove the starting "("
    if ($phone.val().length === 1 && (key === 8 || key === 46)) {
			$phone.val("("); 
      return false;
		} 
    // Reset if they highlight and type over first char.
    else if ($phone.val().charAt(0) !== "(") {
			$phone.val("("+String.fromCharCode(e.keyCode)+""); 
		}

		// Auto-format- do not expose the mask as the user begins to type
		if (key !== 8 && key !== 9) {
			if ($phone.val().length === 4) {
				$phone.val($phone.val() + ")");
			}
			if ($phone.val().length === 5) {
				$phone.val($phone.val() + " ");
			}			
			if ($phone.val().length === 9) {
				$phone.val($phone.val() + "-");
			}
            if ($phone.val().length >= 14) {
                tempval = $phone.val();
                tempval = tempval.substring(0, 14)
				$phone.val( tempval );
			}
		}

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));	
	})
	
	.bind("focus click", function () {
		$phone = jQuery(this);
		
		if ($phone.val().length === 0) {
			$phone.val("(");
		}
		else {
			var val = $phone.val();
			$phone.val("").val(val); // Ensure cursor remains at the end
		}
	})
	
	.blur(function () {
		$phone = jQuery(this);
		
		if ($phone.val() === "(") {
			$phone.val("");
		}
	});


    //Show each step when clicking button with class
    jQuery(".show1").click(function() { show1(); });
    jQuery(".show2").click(function() { show2(); });
    jQuery(".show3").click(function() { show3(); });
    jQuery(".show3validate").click(function() { validateAmount() });
    jQuery(".show4").click(function() { show4(); });
    jQuery(".show5").click(function() { show5(); });
    jQuery(".show6").click(function() { show6(); });
    jQuery(".show6validate").click(function() { validatePhoneEmail(); });
});


//Check everything on submit
function submitForm() {
    //console.log('trying to submit');
    let amount = jQuery("#amount").val();
    let amountres = amount.replace(/\D/g, "");
    if (amountres != "" && amountres >= 100000) {
        jQuery("#amount").removeClass("error");
        jQuery(".amounterror").fadeOut(0);
    }
    else {
        jQuery("#amount").addClass("error");
        jQuery(".amounterror").fadeIn(300);
    }


    if (jQuery("#phone").val() != "") {
        jQuery("#phone").removeClass("error");
        jQuery(".phoneerror").fadeOut(0);
    }
    if (jQuery("#email").val() != "" && validateEmail(jQuery("#email").val()) == true) {
        jQuery("#email").removeClass("error");
        jQuery(".emailerror").fadeOut(0);
    }
    if (jQuery("#state").val() != "") {
        jQuery("#state").removeClass("error");
        jQuery(".stateerror").fadeOut(0);
    }

    if (validatePhone(jQuery("#phone").val()) == true
        && jQuery("#phone").val() != "" 
        && jQuery("#email").val() != "" 
        && jQuery("#state").val() != "" 
        && amountres != "" && amountres >= 1000 
        && validateEmail(jQuery("#email").val()) == true
        && jQuery("#firstname").val() != ""
        && jQuery("#lastname").val() != "") {

        jQuery(".finalerror").fadeOut(500);

        updateZoho();

        jQuery("#submitZoho").click() //Submit the real form (Zoho hidden) simulating a click on submit
        //console.log("sending");
    } 
     else {
            jQuery(".finalerror").fadeIn(100); //...or show errors

        if (validatePhone(jQuery("#phone").val()) == false || jQuery("#phone").val() == "") {
            jQuery("#phone").addClass("error");
            jQuery(".phoneerror").fadeIn(100);
        }
        if (validateEmail(jQuery("#email").val()) == false || jQuery("#email").val() == "") {
            jQuery("#email").addClass("error");
            jQuery(".emailerror").fadeIn(100);
        }
        if (jQuery("#state").val() == "") {
            jQuery("#state").addClass("error");
            jQuery(".stateerror").fadeIn(100);
        }
        if (jQuery("#amount").val() == "") {
            jQuery("#amount").addClass("error");
            jQuery(".amounterror").fadeIn(100);
        }
        if (jQuery("#firstname").val() == "") {
            jQuery("#firstname").addClass("error");
            jQuery(".firstnameerror").fadeIn(100);
        }
        if (jQuery("#lastname").val() == "") {
            jQuery("#lastname").addClass("error");
            jQuery(".lastnameerror").fadeIn(100);
        }
    }

};