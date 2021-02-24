page = window.location.pathname
domain = window.location.hostname



// bind sth defautl 


$(".Polaris-Frame__Content").append(`

<div id="my_footer" class="Footer"><div class="Polaris-Stack"><div class="Polaris-Stack__Item"><a href="/#" target="_blank" data-polaris-unstyled="true" class="Polaris-Link Polaris-Link--removeUnderline"><p class="Polaris-Caption"><span class="Polaris-TextStyle--variationSubdued">Home</span></p></a></div><div class="Polaris-Stack__Item"><a href="/home/about" target="_blank" data-polaris-unstyled="true" class="Polaris-Link Polaris-Link--removeUnderline"><p class="Polaris-Caption"><span class="Polaris-TextStyle--variationSubdued">About Us</span></p></a></div><div class="Polaris-Stack__Item"><a href="/home/term/" target="_blank" data-polaris-unstyled="true" class="Polaris-Link Polaris-Link--removeUnderline"><p class="Polaris-Caption"><span class="Polaris-TextStyle--variationSubdued">Terms</span></p></a></div><div class="Polaris-Stack__Item"><a href="/home/policy/" target="_blank" data-polaris-unstyled="true" class="Polaris-Link Polaris-Link--removeUnderline"><p class="Polaris-Caption"><span class="Polaris-TextStyle--variationSubdued">Privacy</span></p></a></div><div class="Polaris-Stack__Item"><p class="Polaris-Caption"><span class="Polaris-TextStyle--variationSubdued">© Hejjijein 2021</span></p></div></div></div>

`)

$(".Polaris-Frame__TopBar").html(`
<div class="Polaris-TopBar"><button type="button" class="Polaris-TopBar__NavigationIcon" aria-label="Toggle menu"><span class="Polaris-Icon"><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M19 11H1a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0-7H1a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0 14H1a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z"></path></svg></span></button><div class="Polaris-TopBar__LogoContainer Polaris-TopBar__LogoDisplayControl"><a data-polaris-unstyled="true" class="Polaris-TopBar__LogoLink" style="width: 95px;" href="/app/dashboard/"><img src="/logo.png" alt="" class="Polaris-TopBar__Logo" style="width: 95px;"></a></div><div class="Polaris-TopBar__Contents"><div class="Polaris-TopBar__SearchField"><div><div class="Polaris-TopBar-SearchField"><span class="Polaris-VisuallyHidden"><label for="PolarisSearchField1">Search</label></span><input id="PolarisSearchField1" class="Polaris-TopBar-SearchField__Input" placeholder="Search" type="search" autocapitalize="off" autocomplete="off" autocorrect="off" value=""><span class="Polaris-TopBar-SearchField__Icon"><span class="Polaris-Icon"><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293l-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z"></path></svg></span></span><div class="Polaris-TopBar-SearchField__Backdrop"></div></div></div></div><div class="Polaris-TopBar__SecondaryMenu"></div><div><div class="Polaris-TopBar-Menu__ActivatorWrapper" id="profile-zone"><button type="button" class="Polaris-TopBar-Menu__Activator" tabindex="0" aria-controls="Polarispopover1" aria-owns="Polarispopover1" aria-expanded="false"><span class="Polaris-TopBar-UserMenu__Details"><p class="Polaris-TopBar-UserMenu__Name" id="fullname"></p><p class="Polaris-TopBar-UserMenu__Detail" id="business-name"></p></span></button></div></div></div></div>
`)

$("button[aria-label='Connect Shopify shop']").click(function(){
    window.location = '/app/shops'
})



switch (page) {
    case '/account/login/':
        handle_login();
        break;
    case '/app/':
        handle_dashboard();
        break;
    case '/app/dashboard/':
        handle_dashboard();
        break;
    case '/app/products/':
        handle_products();
        break;
    case '/app/order/':
        handle_order();
        break;
    case '/account/signup/':
        handle_signup();
        break;
    case '/app/setting/':
        handle_setting();
        break;
    case '/app/shops/':
        handle_app();
        break;
    case '/home/contact/':
        handle_contact();
        break;
    case '/account/reset-password/':
        handle_reset_password();
        break;
    case '/account/forgot-password/':
        handle_forgot_password();
        break;
    default:
        // code block
}


function handle_signup(){
    // bind event

    $("#sign-up-btn").click(function(event) {
        console.log("clicked");
        if ($("#id_password1").val() != $("#id_password2").val()){
            $("#message-box").text("password did not match.")
        }
        if (!$("#id_terms").is(":checked")){
            $("#message-box").text("You must accept our Terms and Conditions.")   
        }
        else{

            $.ajax({
                method: "POST",
                dataType: "json",
                contentType: 'application/json',
                url: "https://" + domain + ":3500/api/auth/signup",
                data: JSON.stringify(
                    {
                        "email": $("#id_username").val(),
                        "password": $("#id_password1").val(),
                        "business_name" : $("#id_business").val(),
                        "first_name": $("#id_first_name").val(),
                        "last_name": $("#id_last_name").val(),
                        "country" : $("#id_country").val(),
                        "fb_profile": $("#id_facebook_profile").val(),
                        "refer_code": $("#id_invite_code").val()
                    }
                ),
                error: function(response) {
                    console.log(response)
                    window.location.href = "/account/signup"
                }, success(response) {
                    console.log("123123")
                    if(!response['success']){
                        window.location.href = "/account/signup"                        
                    }
                    else{
                        window.location.href = "/account/login"                           
                    }
                }
            });
        }

        event.preventDefault();

        //
    })

}


function handle_login(){
    // kiem tra da login hay chua
    if (localStorage.getItem("token") != null) {
        window.location.href = "/app/";
    }
    // bind event
    $("#login-btn").click(function(event) {
        console.log("clicked");

        $.ajax({
            method: "POST",
            dataType: "json",
            contentType: 'application/json',
            url: "https://" + domain + ":3500/api/auth/login",
            data: JSON.stringify({
                "email": $("#id_username").val(),
                "password": $("#id_password").val()
            })
        }).done(function(response) {
            if (response['success']) {
                localStorage.setItem("token", response['data']['token']);
                localStorage.setItem('id',response['data']['id'])
                window.location.href = "/app/";
            } else {

                $("#message-box").text("Wrong email or password.")
            }

        });

        event.preventDefault();

        //
    })
}


function handle_setting(){

    handle_app()

    // bind event
    $("#edit-business").click(function(){
        show_change_business();
    })
    $("#edit-profile").click(function(){
        show_change_account_info()
    })
    $("#change-password-btn").click(function(){
        show_change_password()
    })

    $("#setting-fullname").text(localStorage.getItem('fullname'))
    $("#setting-email").text(localStorage.getItem('email'))
    $("#setting-business-name").text(localStorage.getItem('business-name'))
    $("#setting-country").text(localStorage.getItem('country'))

}

function handle_forgot_password(){

    $("#forgot-password-btn").click(function(event){
        event.preventDefault();

        post_data = JSON.stringify(
            {
                "email": $("#id_email").val(),
            }
        )
        $.ajax({
                method: "POST",
                dataType: "json",
                contentType: 'application/json',
                url: "https://" + domain + ":3500/api/auth/forgot",
                data: post_data,
                error: function(response) {
                    
                    alert("Something 's wrong");
                }, success(response) {

                    if(!response['success']){
                        alert("Something 's wrong");              
                    }
                    else{
                        window.location.href = '/account/login/'                   
                    }
                }
            });

    })
}


function handle_reset_password(){
    token = window.location.search.substring(1, );

    $("#login-btn").click(function(event){
        event.preventDefault();

        if ( $("#id_password1").val() !=  $("#id_password2").val()  ){
            $("#message-box").html("Please make sure your passwords match.")
        }
        else {
            post_data = JSON.stringify(
                        {
                            "password": $("#id_password1").val(),
                        }
                    )
            $.ajax({
                    method: "POST",
                    dataType: "json",
                    contentType: 'application/json',
                    url: "https://" + domain + ":3500/api/auth/reset",
                    headers: {
                        'Authorization':'Bearer '+ token,
                    },
                    data: post_data,
                    error: function(response) {
                        
                        alert("Something 's wrong");
                    }, success(response) {

                        if(!response['success']){
                            alert("Something 's wrong");              
                        }
                        else{
                            window.location.href = '/account/login/'                   
                        }
                    }
                });

            }

    })
}




function update_user_data(myfun){
    user_id = localStorage.getItem('id')
    token = localStorage.getItem('token')
    $.ajax({
        method: "GET",
        dataType: "json",
        contentType: 'application/json',
        headers: {
            'Authorization':'Bearer '+token,
        },
        url: "https://" + domain + ":3500/api/user/"+user_id,
        error: function(response) {
            localStorage.removeItem('token'); 
            window.location.href = "/account/login"
        }, success(response) {
            if(!response['success']){
                localStorage.removeItem('token');
                window.location.href = "/account/login"                        
            }
            else{
                fullname = response['data']['last_name']+ " " +response['data']['first_name']
                localStorage.setItem('fullname', fullname)
                localStorage.setItem('country', response['data']['country'])
                localStorage.setItem('email',response['data']['email'])
                localStorage.setItem('business-name',response['data']['business_name'])
                localStorage.setItem('first_name',response['data']['first_name'])
                localStorage.setItem('last_name',response['data']['last_name'])


                $("#fullname").text(fullname);
                $("#business-name").text(response['data']['business_name']);
                myfun()

            }
        }
    })
}





function handle_app(){

    // bind logout
    $("#profile-zone").click(function(){
        $("div[data-portal-id='popover-Polarisportal3']").html('<div class="Polaris-PositionedOverlay Polaris-PositionedOverlay--fixed Polaris-Popover__PopoverOverlay Polaris-Popover__PopoverOverlay--open" style="top: 56px; right: 0px; z-index: 513;"><div class="Polaris-Popover" data-polaris-overlay="true"><div class="Polaris-Popover__FocusTracker" tabindex="0"></div><div style="--p-background:rgba(246, 246, 247, 1); --p-background-hovered:rgba(241, 242, 243, 1); --p-background-pressed:rgba(237, 238, 239, 1); --p-background-selected:rgba(237, 238, 239, 1); --p-surface:rgba(255, 255, 255, 1); --p-surface-neutral:rgba(228, 229, 231, 1); --p-surface-neutral-hovered:rgba(219, 221, 223, 1); --p-surface-neutral-pressed:rgba(201, 204, 208, 1); --p-surface-neutral-disabled:rgba(241, 242, 243, 1); --p-surface-neutral-subdued:rgba(246, 246, 247, 1); --p-surface-subdued:rgba(250, 251, 251, 1); --p-surface-disabled:rgba(250, 251, 251, 1); --p-surface-hovered:rgba(246, 246, 247, 1); --p-surface-pressed:rgba(241, 242, 243, 1); --p-surface-depressed:rgba(237, 238, 239, 1); --p-backdrop:rgba(0, 0, 0, 0.5); --p-overlay:rgba(255, 255, 255, 0.5); --p-shadow-from-dim-light:rgba(0, 0, 0, 0.2); --p-shadow-from-ambient-light:rgba(23, 24, 24, 0.05); --p-shadow-from-direct-light:rgba(0, 0, 0, 0.15); --p-hint-from-direct-light:rgba(0, 0, 0, 0.15); --p-on-surface-background:rgba(241, 242, 243, 1); --p-border:rgba(140, 145, 150, 1); --p-border-neutral-subdued:rgba(186, 191, 195, 1); --p-border-hovered:rgba(153, 158, 164, 1); --p-border-disabled:rgba(210, 213, 216, 1); --p-border-subdued:rgba(201, 204, 207, 1); --p-border-depressed:rgba(87, 89, 89, 1); --p-border-shadow:rgba(174, 180, 185, 1); --p-border-shadow-subdued:rgba(186, 191, 196, 1); --p-divider:rgba(225, 227, 229, 1); --p-icon:rgba(92, 95, 98, 1); --p-icon-hovered:rgba(26, 28, 29, 1); --p-icon-pressed:rgba(68, 71, 74, 1); --p-icon-disabled:rgba(186, 190, 195, 1); --p-icon-subdued:rgba(140, 145, 150, 1); --p-text:rgba(32, 34, 35, 1); --p-text-disabled:rgba(140, 145, 150, 1); --p-text-subdued:rgba(109, 113, 117, 1); --p-interactive:rgba(44, 110, 203, 1); --p-interactive-disabled:rgba(189, 193, 204, 1); --p-interactive-hovered:rgba(31, 81, 153, 1); --p-interactive-pressed:rgba(16, 50, 98, 1); --p-focused:rgba(69, 143, 255, 1); --p-surface-selected:rgba(242, 247, 254, 1); --p-surface-selected-hovered:rgba(237, 244, 254, 1); --p-surface-selected-pressed:rgba(229, 239, 253, 1); --p-icon-on-interactive:rgba(255, 255, 255, 1); --p-text-on-interactive:rgba(255, 255, 255, 1); --p-action-secondary:rgba(255, 255, 255, 1); --p-action-secondary-disabled:rgba(255, 255, 255, 1); --p-action-secondary-hovered:rgba(246, 246, 247, 1); --p-action-secondary-pressed:rgba(241, 242, 243, 1); --p-action-secondary-depressed:rgba(109, 113, 117, 1); --p-action-primary:rgba(120, 31, 239, 1); --p-action-primary-disabled:rgba(241, 241, 241, 1); --p-action-primary-hovered:rgba(108, 27, 217, 1); --p-action-primary-pressed:rgba(97, 23, 195, 1); --p-action-primary-depressed:rgba(69, 14, 142, 1); --p-icon-on-primary:rgba(255, 255, 255, 1); --p-text-on-primary:rgba(255, 255, 255, 1); --p-text-primary:rgba(120, 31, 239, 1); --p-text-primary-hovered:rgba(120, 31, 239, 1); --p-text-primary-pressed:rgba(103, 25, 206, 1); --p-surface-primary-selected:rgba(247, 246, 248, 1); --p-surface-primary-selected-hovered:rgba(202, 199, 213, 1); --p-surface-primary-selected-pressed:rgba(184, 179, 199, 1); --p-border-critical:rgba(253, 87, 73, 1); --p-border-critical-subdued:rgba(224, 179, 178, 1); --p-border-critical-disabled:rgba(255, 167, 163, 1); --p-icon-critical:rgba(215, 44, 13, 1); --p-surface-critical:rgba(254, 211, 209, 1); --p-surface-critical-subdued:rgba(255, 244, 244, 1); --p-surface-critical-subdued-hovered:rgba(255, 240, 240, 1); --p-surface-critical-subdued-pressed:rgba(255, 233, 232, 1); --p-surface-critical-subdued-depressed:rgba(254, 188, 185, 1); --p-text-critical:rgba(215, 44, 13, 1); --p-action-critical:rgba(216, 44, 13, 1); --p-action-critical-disabled:rgba(241, 241, 241, 1); --p-action-critical-hovered:rgba(188, 34, 0, 1); --p-action-critical-pressed:rgba(162, 27, 0, 1); --p-action-critical-depressed:rgba(108, 15, 0, 1); --p-icon-on-critical:rgba(255, 255, 255, 1); --p-text-on-critical:rgba(255, 255, 255, 1); --p-interactive-critical:rgba(216, 44, 13, 1); --p-interactive-critical-disabled:rgba(253, 147, 141, 1); --p-interactive-critical-hovered:rgba(205, 41, 12, 1); --p-interactive-critical-pressed:rgba(103, 15, 3, 1); --p-border-warning:rgba(185, 137, 0, 1); --p-border-warning-subdued:rgba(225, 184, 120, 1); --p-icon-warning:rgba(185, 137, 0, 1); --p-surface-warning:rgba(255, 215, 157, 1); --p-surface-warning-subdued:rgba(255, 245, 234, 1); --p-surface-warning-subdued-hovered:rgba(255, 242, 226, 1); --p-surface-warning-subdued-pressed:rgba(255, 235, 211, 1); --p-text-warning:rgba(145, 106, 0, 1); --p-border-highlight:rgba(68, 157, 167, 1); --p-border-highlight-subdued:rgba(152, 198, 205, 1); --p-icon-highlight:rgba(0, 160, 172, 1); --p-surface-highlight:rgba(164, 232, 242, 1); --p-surface-highlight-subdued:rgba(235, 249, 252, 1); --p-surface-highlight-subdued-hovered:rgba(228, 247, 250, 1); --p-surface-highlight-subdued-pressed:rgba(213, 243, 248, 1); --p-text-highlight:rgba(52, 124, 132, 1); --p-border-success:rgba(0, 164, 124, 1); --p-border-success-subdued:rgba(149, 201, 180, 1); --p-icon-success:rgba(0, 127, 95, 1); --p-surface-success:rgba(174, 233, 209, 1); --p-surface-success-subdued:rgba(241, 248, 245, 1); --p-surface-success-subdued-hovered:rgba(236, 246, 241, 1); --p-surface-success-subdued-pressed:rgba(226, 241, 234, 1); --p-text-success:rgba(0, 128, 96, 1); --p-decorative-one-icon:rgba(126, 87, 0, 1); --p-decorative-one-surface:rgba(255, 201, 107, 1); --p-decorative-one-text:rgba(61, 40, 0, 1); --p-decorative-two-icon:rgba(175, 41, 78, 1); --p-decorative-two-surface:rgba(255, 196, 176, 1); --p-decorative-two-text:rgba(73, 11, 28, 1); --p-decorative-three-icon:rgba(0, 109, 65, 1); --p-decorative-three-surface:rgba(146, 230, 181, 1); --p-decorative-three-text:rgba(0, 47, 25, 1); --p-decorative-four-icon:rgba(0, 106, 104, 1); --p-decorative-four-surface:rgba(145, 224, 214, 1); --p-decorative-four-text:rgba(0, 45, 45, 1); --p-decorative-five-icon:rgba(174, 43, 76, 1); --p-decorative-five-surface:rgba(253, 201, 208, 1); --p-decorative-five-text:rgba(79, 14, 31, 1); --p-border-radius-base:0.4rem; --p-border-radius-wide:0.8rem; --p-border-radius-full:50%; --p-card-shadow:0px 0px 5px var(--p-shadow-from-ambient-light), 0px 1px 2px var(--p-shadow-from-direct-light); --p-popover-shadow:-1px 0px 20px var(--p-shadow-from-ambient-light), 0px 1px 5px var(--p-shadow-from-direct-light); --p-modal-shadow:0px 26px 80px var(--p-shadow-from-dim-light), 0px 0px 1px var(--p-shadow-from-dim-light); --p-top-bar-shadow:0 2px 2px -1px var(--p-shadow-from-direct-light); --p-button-drop-shadow:0 1px 0 rgba(0, 0, 0, 0.05); --p-button-inner-shadow:inset 0 -1px 0 rgba(0, 0, 0, 0.2); --p-button-pressed-inner-shadow:inset 0 1px 0 rgba(0, 0, 0, 0.15); --p-override-none:none; --p-override-transparent:transparent; --p-override-one:1; --p-override-visible:visible; --p-override-zero:0; --p-override-loading-z-index:514; --p-button-font-weight:500; --p-non-null-content:&quot;&quot;; --p-choice-size:2rem; --p-icon-size:1rem; --p-choice-margin:0.1rem; --p-control-border-width:0.2rem; --p-banner-border-default:inset 0 0.1rem 0 0 var(--p-border-neutral-subdued), inset 0 0 0 0.1rem var(--p-border-neutral-subdued); --p-banner-border-success:inset 0 0.1rem 0 0 var(--p-border-success-subdued), inset 0 0 0 0.1rem var(--p-border-success-subdued); --p-banner-border-highlight:inset 0 0.1rem 0 0 var(--p-border-highlight-subdued), inset 0 0 0 0.1rem var(--p-border-highlight-subdued); --p-banner-border-warning:inset 0 0.1rem 0 0 var(--p-border-warning-subdued), inset 0 0 0 0.1rem var(--p-border-warning-subdued); --p-banner-border-critical:inset 0 0.1rem 0 0 var(--p-border-critical-subdued), inset 0 0 0 0.1rem var(--p-border-critical-subdued); --p-badge-mix-blend-mode:luminosity; --p-thin-border-subdued:0.1rem solid var(--p-border-subdued); --p-text-field-spinner-offset:0.2rem; --p-text-field-focus-ring-offset:-0.4rem; --p-text-field-focus-ring-border-radius:0.7rem; --p-button-group-item-spacing:-0.1rem; --p-duration-1-0-0:100ms; --p-duration-1-5-0:150ms; --p-ease-in:cubic-bezier(0.5, 0.1, 1, 1); --p-ease:cubic-bezier(0.4, 0.22, 0.28, 1); --p-range-slider-thumb-size-base:1.6rem; --p-range-slider-thumb-size-active:2.4rem; --p-range-slider-thumb-scale:1.5; --p-badge-font-weight:400; --p-frame-offset:0px; color: rgb(32, 34, 35);"><div class="Polaris-Popover__Wrapper"><div id="Polarispopover1" tabindex="100" class="Polaris-Popover__Content" style="height: 57px;"><div class="Polaris-Popover__Pane Polaris-Scrollable Polaris-Scrollable--vertical" data-polaris-scrollable="true"><div class="Polaris-ActionList"><div class="Polaris-ActionList__Section--withoutTitle"><ul class="Polaris-ActionList__Actions"><li><button id="logout-btn" ype="button" class="Polaris-ActionList__Item"><div class="Polaris-ActionList__Content"><div class="Polaris-ActionList__Prefix"><span class="Polaris-Icon"><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M10 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.293 8.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L10.586 12H7a1 1 0 1 1 0-2h3.586L9.293 8.707z"></path></svg></span></div><div class="Polaris-ActionList__Text">Logout</div></div></button></li></ul></div></div></div></div></div></div><div class="Polaris-Popover__FocusTracker" tabindex="0"></div></div></div>');
        $("#logout-btn").click(function(){
            localStorage.removeItem('token'); 
            window.location.href = "/account/login"
        });
        setTimeout(function(){
            $("div[data-portal-id='popover-Polarisportal3']").html("");
            }, 1000);


    })





    user_id = localStorage.getItem('id')
    token = localStorage.getItem('token')
    $.ajax({
        method: "GET",
        dataType: "json",
        contentType: 'application/json',
        headers: {
            'Authorization':'Bearer '+token,
        },
        url: "https://" + domain + ":3500/api/user/"+user_id,
        error: function(response) {
            localStorage.removeItem('token'); 
            window.location.href = "/account/login"
        }, success(response) {
            if(!response['success']){
                localStorage.removeItem('token');
                window.location.href = "/account/login"                        
            }
            else{
                fullname = response['data']['last_name']+ " " +response['data']['first_name']
                localStorage.setItem('fullname', fullname)
                localStorage.setItem('country', response['data']['country'])
                localStorage.setItem('email',response['data']['email'])
                localStorage.setItem('business-name',response['data']['business_name'])
                localStorage.setItem('first_name',response['data']['first_name'])
                localStorage.setItem('last_name',response['data']['last_name'])


                $("#fullname").text(fullname);
                $("#business-name").text(response['data']['business_name']);

            }
        }
    })
    
}


function handle_dashboard(){
    handle_app()
	
}


function handle_contact(){
    $("#contact-btn").click(function(event){
        $.ajax({
        method: "POST",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(
                    {
                        "email": $("#email-ee5e4047-6116-4b6d-965d-5ea1377ba280").val(),
                        "first_name" : $("#firstname-ee5e4047-6116-4b6d-965d-5ea1377ba280").val(),
                        "last_name" : $("#lastname-ee5e4047-6116-4b6d-965d-5ea1377ba280").val(),
                        "message" : $("#message-ee5e4047-6116-4b6d-965d-5ea1377ba280").val(),
                    }
                ),
        url: "https://" + domain + ":3500/api/contact",
        error: function(response) {
            window.location.reload();
        }, success(response) {
            window.location.reload();
        }
    })

        
    })
    
}




function handle_order(){
    handle_app()
    $("#create-order-btn").click(function(event){
        show_create_order()
        event.preventDefault();
    })
    
}

function handle_products(){
    handle_app()
    
}





function show_change_business(){
    content = `
<div>
   <div class="Polaris-Modal-Dialog__Container" data-polaris-layer="true" data-polaris-overlay="true">
      <div>
         <div role="dialog" aria-labelledby="Polarismodal-header6" tabindex="-1" class="Polaris-Modal-Dialog">
            <div class="Polaris-Modal-Dialog__Modal">
               <div class="Polaris-Modal-Header">
                  <div id="Polarismodal-header6" class="Polaris-Modal-Header__Title">
                     <h2 class="Polaris-DisplayText Polaris-DisplayText--sizeSmall">Edit Business Info</h2>
                  </div>
                  <button class="Polaris-Modal-CloseButton" aria-label="Close">
                     <span class="Polaris-Icon Polaris-Icon--colorBase Polaris-Icon--isColored">
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                           <path d="M11.414 10l6.293-6.293a1 1 0 1 0-1.414-1.414L10 8.586 3.707 2.293a1 1 0 0 0-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 1 0 1.414 1.414L10 11.414l6.293 6.293A.998.998 0 0 0 18 17a.999.999 0 0 0-.293-.707L11.414 10z"></path>
                        </svg>
                     </span>
                  </button>
               </div>
               <div class="Polaris-Modal__BodyWrapper">
                  <div class="Polaris-Modal__Body Polaris-Scrollable Polaris-Scrollable--vertical" data-polaris-scrollable="true">
                     <section class="Polaris-Modal-Section">
                        <form method="post">
                           <div class="Polaris-FormLayout">
                              <div class="Polaris-FormLayout__Item">
                                 <div class="">
                                    <div class="Polaris-Labelled__LabelWrapper">
                                       <div class="Polaris-Label"><label id="PolarisTextField20Label" for="PolarisTextField20" class="Polaris-Label__Text">Name</label></div>
                                    </div>
                                    <div class="Polaris-Connected">
                                       <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                          <div class="Polaris-TextField Polaris-TextField--hasValue">
                                             <input id="PolarisTextField20" class="Polaris-TextField__Input" aria-labelledby="PolarisTextField20Label" aria-invalid="false" value="">
                                             <div class="Polaris-TextField__Backdrop"></div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="Polaris-FormLayout__Item">
                                 <div class="">
                                    <div class="Polaris-Labelled__LabelWrapper">
                                       <div class="Polaris-Label"><label id="PolarisSelect9Label" for="PolarisSelect9" class="Polaris-Label__Text">Country</label></div>
                                    </div>
                                    <div class="Polaris-Select">
                                       <select id="PolarisSelect9" class="Polaris-TextField__Input Polaris-Select__Content" aria-invalid="false">
                                          <option value="" disabled="">Select country</option>
                                          <option value="AF">Afghanistan</option>
                                          <option value="AX">Åland Islands</option>
                                          <option value="AL">Albania</option>
                                          <option value="DZ">Algeria</option>
                                          <option value="AS">American Samoa</option>
                                          <option value="AD">Andorra</option>
                                          <option value="AO">Angola</option>
                                          <option value="AI">Anguilla</option>
                                          <option value="AQ">Antarctica</option>
                                          <option value="AG">Antigua and Barbuda</option>
                                          <option value="AR">Argentina</option>
                                          <option value="AM">Armenia</option>
                                          <option value="AW">Aruba</option>
                                          <option value="AU">Australia</option>
                                          <option value="AT">Austria</option>
                                          <option value="AZ">Azerbaijan</option>
                                          <option value="BS">Bahamas</option>
                                          <option value="BH">Bahrain</option>
                                          <option value="BD">Bangladesh</option>
                                          <option value="BB">Barbados</option>
                                          <option value="BY">Belarus</option>
                                          <option value="BE">Belgium</option>
                                          <option value="BZ">Belize</option>
                                          <option value="BJ">Benin</option>
                                          <option value="BM">Bermuda</option>
                                          <option value="BT">Bhutan</option>
                                          <option value="BO">Bolivia, Plurinational State of</option>
                                          <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                          <option value="BA">Bosnia and Herzegovina</option>
                                          <option value="BW">Botswana</option>
                                          <option value="BV">Bouvet Island</option>
                                          <option value="BR">Brazil</option>
                                          <option value="IO">British Indian Ocean Territory</option>
                                          <option value="BN">Brunei Darussalam</option>
                                          <option value="BG">Bulgaria</option>
                                          <option value="BF">Burkina Faso</option>
                                          <option value="BI">Burundi</option>
                                          <option value="CV">Cabo Verde</option>
                                          <option value="KH">Cambodia</option>
                                          <option value="CM">Cameroon</option>
                                          <option value="CA">Canada</option>
                                          <option value="KY">Cayman Islands</option>
                                          <option value="CF">Central African Republic</option>
                                          <option value="TD">Chad</option>
                                          <option value="CL">Chile</option>
                                          <option value="CN">China</option>
                                          <option value="CX">Christmas Island</option>
                                          <option value="CC">Cocos (Keeling) Islands</option>
                                          <option value="CO">Colombia</option>
                                          <option value="KM">Comoros</option>
                                          <option value="CG">Congo</option>
                                          <option value="CD">Congo, Democratic Republic of the</option>
                                          <option value="CK">Cook Islands</option>
                                          <option value="CR">Costa Rica</option>
                                          <option value="HR">Croatia</option>
                                          <option value="CU">Cuba</option>
                                          <option value="CW">Curaçao</option>
                                          <option value="CY">Cyprus</option>
                                          <option value="CZ">Czechia</option>
                                          <option value="CI">Côte d'Ivoire</option>
                                          <option value="DK">Denmark</option>
                                          <option value="DJ">Djibouti</option>
                                          <option value="DM">Dominica</option>
                                          <option value="DO">Dominican Republic</option>
                                          <option value="EC">Ecuador</option>
                                          <option value="EG">Egypt</option>
                                          <option value="SV">El Salvador</option>
                                          <option value="GQ">Equatorial Guinea</option>
                                          <option value="ER">Eritrea</option>
                                          <option value="EE">Estonia</option>
                                          <option value="SZ">Eswatini</option>
                                          <option value="ET">Ethiopia</option>
                                          <option value="FK">Falkland Islands (Malvinas)</option>
                                          <option value="FO">Faroe Islands</option>
                                          <option value="FJ">Fiji</option>
                                          <option value="FI">Finland</option>
                                          <option value="FR">France</option>
                                          <option value="GF">French Guiana</option>
                                          <option value="PF">French Polynesia</option>
                                          <option value="TF">French Southern Territories</option>
                                          <option value="GA">Gabon</option>
                                          <option value="GM">Gambia</option>
                                          <option value="GE">Georgia</option>
                                          <option value="DE">Germany</option>
                                          <option value="GH">Ghana</option>
                                          <option value="GI">Gibraltar</option>
                                          <option value="GR">Greece</option>
                                          <option value="GL">Greenland</option>
                                          <option value="GD">Grenada</option>
                                          <option value="GP">Guadeloupe</option>
                                          <option value="GU">Guam</option>
                                          <option value="GT">Guatemala</option>
                                          <option value="GG">Guernsey</option>
                                          <option value="GN">Guinea</option>
                                          <option value="GW">Guinea-Bissau</option>
                                          <option value="GY">Guyana</option>
                                          <option value="HT">Haiti</option>
                                          <option value="HM">Heard Island and McDonald Islands</option>
                                          <option value="VA">Holy See</option>
                                          <option value="HN">Honduras</option>
                                          <option value="HK">Hong Kong</option>
                                          <option value="HU">Hungary</option>
                                          <option value="IS">Iceland</option>
                                          <option value="IN">India</option>
                                          <option value="ID">Indonesia</option>
                                          <option value="IR">Iran, Islamic Republic of</option>
                                          <option value="IQ">Iraq</option>
                                          <option value="IE">Ireland</option>
                                          <option value="IM">Isle of Man</option>
                                          <option value="IL">Israel</option>
                                          <option value="IT">Italy</option>
                                          <option value="JM">Jamaica</option>
                                          <option value="JP">Japan</option>
                                          <option value="JE">Jersey</option>
                                          <option value="JO">Jordan</option>
                                          <option value="KZ">Kazakhstan</option>
                                          <option value="KE">Kenya</option>
                                          <option value="KI">Kiribati</option>
                                          <option value="KP">Korea, Democratic People's Republic of</option>
                                          <option value="KR">Korea, Republic of</option>
                                          <option value="KW">Kuwait</option>
                                          <option value="KG">Kyrgyzstan</option>
                                          <option value="LA">Lao People's Democratic Republic</option>
                                          <option value="LV">Latvia</option>
                                          <option value="LB">Lebanon</option>
                                          <option value="LS">Lesotho</option>
                                          <option value="LR">Liberia</option>
                                          <option value="LY">Libya</option>
                                          <option value="LI">Liechtenstein</option>
                                          <option value="LT">Lithuania</option>
                                          <option value="LU">Luxembourg</option>
                                          <option value="MO">Macao</option>
                                          <option value="MG">Madagascar</option>
                                          <option value="MW">Malawi</option>
                                          <option value="MY">Malaysia</option>
                                          <option value="MV">Maldives</option>
                                          <option value="ML">Mali</option>
                                          <option value="MT">Malta</option>
                                          <option value="MH">Marshall Islands</option>
                                          <option value="MQ">Martinique</option>
                                          <option value="MR">Mauritania</option>
                                          <option value="MU">Mauritius</option>
                                          <option value="YT">Mayotte</option>
                                          <option value="MX">Mexico</option>
                                          <option value="FM">Micronesia, Federated States of</option>
                                          <option value="MD">Moldova, Republic of</option>
                                          <option value="MC">Monaco</option>
                                          <option value="MN">Mongolia</option>
                                          <option value="ME">Montenegro</option>
                                          <option value="MS">Montserrat</option>
                                          <option value="MA">Morocco</option>
                                          <option value="MZ">Mozambique</option>
                                          <option value="MM">Myanmar</option>
                                          <option value="NA">Namibia</option>
                                          <option value="NR">Nauru</option>
                                          <option value="NP">Nepal</option>
                                          <option value="NL">Netherlands</option>
                                          <option value="NC">New Caledonia</option>
                                          <option value="NZ">New Zealand</option>
                                          <option value="NI">Nicaragua</option>
                                          <option value="NE">Niger</option>
                                          <option value="NG">Nigeria</option>
                                          <option value="NU">Niue</option>
                                          <option value="NF">Norfolk Island</option>
                                          <option value="MK">North Macedonia</option>
                                          <option value="MP">Northern Mariana Islands</option>
                                          <option value="NO">Norway</option>
                                          <option value="OM">Oman</option>
                                          <option value="PK">Pakistan</option>
                                          <option value="PW">Palau</option>
                                          <option value="PS">Palestine, State of</option>
                                          <option value="PA">Panama</option>
                                          <option value="PG">Papua New Guinea</option>
                                          <option value="PY">Paraguay</option>
                                          <option value="PE">Peru</option>
                                          <option value="PH">Philippines</option>
                                          <option value="PN">Pitcairn</option>
                                          <option value="PL">Poland</option>
                                          <option value="PT">Portugal</option>
                                          <option value="PR">Puerto Rico</option>
                                          <option value="QA">Qatar</option>
                                          <option value="RO">Romania</option>
                                          <option value="RU">Russian Federation</option>
                                          <option value="RW">Rwanda</option>
                                          <option value="RE">Réunion</option>
                                          <option value="BL">Saint Barthélemy</option>
                                          <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                          <option value="KN">Saint Kitts and Nevis</option>
                                          <option value="LC">Saint Lucia</option>
                                          <option value="MF">Saint Martin (French part)</option>
                                          <option value="PM">Saint Pierre and Miquelon</option>
                                          <option value="VC">Saint Vincent and the Grenadines</option>
                                          <option value="WS">Samoa</option>
                                          <option value="SM">San Marino</option>
                                          <option value="ST">Sao Tome and Principe</option>
                                          <option value="SA">Saudi Arabia</option>
                                          <option value="SN">Senegal</option>
                                          <option value="RS">Serbia</option>
                                          <option value="SC">Seychelles</option>
                                          <option value="SL">Sierra Leone</option>
                                          <option value="SG">Singapore</option>
                                          <option value="SX">Sint Maarten (Dutch part)</option>
                                          <option value="SK">Slovakia</option>
                                          <option value="SI">Slovenia</option>
                                          <option value="SB">Solomon Islands</option>
                                          <option value="SO">Somalia</option>
                                          <option value="ZA">South Africa</option>
                                          <option value="GS">South Georgia and the South Sandwich Islands</option>
                                          <option value="SS">South Sudan</option>
                                          <option value="ES">Spain</option>
                                          <option value="LK">Sri Lanka</option>
                                          <option value="SD">Sudan</option>
                                          <option value="SR">Suriname</option>
                                          <option value="SJ">Svalbard and Jan Mayen</option>
                                          <option value="SE">Sweden</option>
                                          <option value="CH">Switzerland</option>
                                          <option value="SY">Syrian Arab Republic</option>
                                          <option value="TW">Taiwan, Province of China</option>
                                          <option value="TJ">Tajikistan</option>
                                          <option value="TZ">Tanzania, United Republic of</option>
                                          <option value="TH">Thailand</option>
                                          <option value="TL">Timor-Leste</option>
                                          <option value="TG">Togo</option>
                                          <option value="TK">Tokelau</option>
                                          <option value="TO">Tonga</option>
                                          <option value="TT">Trinidad and Tobago</option>
                                          <option value="TN">Tunisia</option>
                                          <option value="TR">Turkey</option>
                                          <option value="TM">Turkmenistan</option>
                                          <option value="TC">Turks and Caicos Islands</option>
                                          <option value="TV">Tuvalu</option>
                                          <option value="UG">Uganda</option>
                                          <option value="UA">Ukraine</option>
                                          <option value="AE">United Arab Emirates</option>
                                          <option value="GB">United Kingdom</option>
                                          <option value="UM">United States Minor Outlying Islands</option>
                                          <option value="US">United States</option>
                                          <option value="UY">Uruguay</option>
                                          <option value="UZ">Uzbekistan</option>
                                          <option value="VU">Vanuatu</option>
                                          <option value="VE">Venezuela, Bolivarian Republic of</option>
                                          <option value="VN">Viet Nam</option>
                                          <option value="VG">Virgin Islands, British</option>
                                          <option value="VI">Virgin Islands, U.S.</option>
                                          <option value="WF">Wallis and Futuna</option>
                                          <option value="EH">Western Sahara</option>
                                          <option value="YE">Yemen</option>
                                          <option value="ZM">Zambia</option>
                                          <option value="ZW">Zimbabwe</option>
                                       </select>
                                       
                                       <div class="Polaris-Select__Backdrop"></div>
                                    </div>
                                 </div>
                              </div>
                              <div class="Polaris-FormLayout__Item">
                                 <div class="Polaris-ButtonGroup">
                                    <div class="Polaris-ButtonGroup__Item"><button id="polar-save" class="Polaris-Button Polaris-Button--primary" type="submit"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Save</span></span></button></div>
                                    <div class="Polaris-ButtonGroup__Item"><button id="polar-cancel" class="Polaris-Button" type="button"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Cancel</span></span></button></div>
                                 </div>
                              </div>
                           </div>
                           <span class="Polaris-VisuallyHidden"><button type="submit" aria-hidden="true" tabindex="-1">Submit</button></span>
                        </form>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

`
    backdrop = '<div id="polaris-backdrop" class="Polaris-Backdrop"></div>'
    $("div[data-portal-id='modal-Polarisportal5']").html(content+backdrop);

    $(".Polaris-Modal-CloseButton").click(function(){
        $("div[data-portal-id='modal-Polarisportal5']").html("");
    });

    $("#polar-cancel").click(function(){
        $("div[data-portal-id='modal-Polarisportal5']").html("");
    });


    $("#PolarisTextField20").val(localStorage.getItem('business-name'));

    $("#polar-save").click(function(){
        
        $.ajax({
                method: "PUT",
                dataType: "json",
                contentType: 'application/json',
                url: "https://" + domain + ":3500/api/user/"+ localStorage.getItem('id'),
                headers: {
                    'Authorization':'Bearer '+ localStorage.getItem('token'),
                },
                data: JSON.stringify(
                    {
                        "business_name": $("#PolarisTextField20").val(),
                        "country" : $("#PolarisSelect9 option:selected").text(),
                    }
                ),
                error: function(response) {
                    
                    alert("Something 's wrong");
                    $("div[data-portal-id='modal-Polarisportal5']").html("");
                }, success(response) {

                    if(!response['success']){
                        alert("Something 's wrong");              
                    }
                    else{
                        update_user_data(function(){
                            $("#setting-business-name").text(localStorage.getItem('business-name'))
                            $("#setting-country").text(localStorage.getItem('country'))
                        })
                                            
                    }
                    $("div[data-portal-id='modal-Polarisportal5']").html("");                   

                }
            });
        
        event.preventDefault();
    });


}






function show_change_password(){
    content = `
<div>
   <div class="Polaris-Modal-Dialog__Container" data-polaris-layer="true" data-polaris-overlay="true">
      <div>
         <div role="dialog" aria-labelledby="Polarismodal-header4" tabindex="-1" class="Polaris-Modal-Dialog">
            <div class="Polaris-Modal-Dialog__Modal">
               <div class="Polaris-Modal-Header">
                  <div id="Polarismodal-header4" class="Polaris-Modal-Header__Title">
                     <h2 class="Polaris-DisplayText Polaris-DisplayText--sizeSmall">Change Password</h2>
                  </div>
                  <button class="Polaris-Modal-CloseButton" aria-label="Close">
                     <span class="Polaris-Icon Polaris-Icon--colorBase Polaris-Icon--isColored">
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                           <path d="M11.414 10l6.293-6.293a1 1 0 1 0-1.414-1.414L10 8.586 3.707 2.293a1 1 0 0 0-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 1 0 1.414 1.414L10 11.414l6.293 6.293A.998.998 0 0 0 18 17a.999.999 0 0 0-.293-.707L11.414 10z"></path>
                        </svg>
                     </span>
                  </button>
               </div>
               <div class="Polaris-Modal__BodyWrapper">
                  <div class="Polaris-Modal__Body Polaris-Scrollable Polaris-Scrollable--vertical" data-polaris-scrollable="true">
                     <section class="Polaris-Modal-Section">
                        <form method="post">
                           <div class="Polaris-FormLayout">
                              <div class="Polaris-FormLayout__Item">
                                 <div class="">
                                    <div class="Polaris-Labelled__LabelWrapper">
                                       <div class="Polaris-Label"><label id="PolarisTextField1Label" for="PolarisTextField1" class="Polaris-Label__Text">Old Password</label></div>
                                    </div>
                                    <div class="Polaris-Connected">
                                       <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                          <div class="Polaris-TextField">
                                             <input id="PolarisTextField1" class="Polaris-TextField__Input" type="password" aria-labelledby="PolarisTextField1Label" aria-invalid="false" value="">
                                             <div class="Polaris-TextField__Backdrop"></div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="Polaris-FormLayout__Item">
                                 <div class="">
                                    <div class="Polaris-Labelled__LabelWrapper">
                                       <div class="Polaris-Label"><label id="PolarisTextField2Label" for="PolarisTextField2" class="Polaris-Label__Text">New Password</label></div>
                                    </div>
                                    <div class="Polaris-Connected">
                                       <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                          <div class="Polaris-TextField">
                                             <input id="PolarisTextField2" class="Polaris-TextField__Input" type="password" aria-labelledby="PolarisTextField2Label" aria-invalid="false" value="">
                                             <div class="Polaris-TextField__Backdrop"></div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="Polaris-FormLayout__Item">
                                 <div class="Polaris-ButtonGroup">
                                    <div class="Polaris-ButtonGroup__Item"><button id="polar-save" class="Polaris-Button Polaris-Button--primary" type="submit"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Save</span></span></button></div>
                                    <div class="Polaris-ButtonGroup__Item"><button id="polar-cancel" class="Polaris-Button" type="button"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Cancel</span></span></button></div>
                                 </div>
                              </div>
                           </div>
                           <span class="Polaris-VisuallyHidden"><button type="submit" aria-hidden="true" tabindex="-1">Submit</button></span>
                        </form>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

`
    backdrop = '<div id="polaris-backdrop" class="Polaris-Backdrop"></div>'
    $("div[data-portal-id='modal-Polarisportal5']").html(content+backdrop);

    $(".Polaris-Modal-CloseButton").click(function(){
        $("div[data-portal-id='modal-Polarisportal5']").html("");
    });

    $("#polar-cancel").click(function(){
        $("div[data-portal-id='modal-Polarisportal5']").html("");
    });

    $("#polar-save").click(function(){

        post_data = JSON.stringify(
                    {
                        "password_old": $("#PolarisTextField1").val(),
                        "password_new" : $("#PolarisTextField2").val(),
                    }
                )
        $.ajax({
                method: "PUT",
                dataType: "json",
                contentType: 'application/json',
                url: "https://" + domain + ":3500/api/user/"+ localStorage.getItem('id'),
                headers: {
                    'Authorization':'Bearer '+ localStorage.getItem('token'),
                },
                data: post_data,
                error: function(response) {
                    
                    alert("Something 's wrong");
                }, success(response) {

                    if(!response['success']){
                        alert("Something 's wrong");              
                    }
                    else{
                        $("div[data-portal-id='modal-Polarisportal5']").html("");                        
                    }
                }
            });
        $("div[data-portal-id='modal-Polarisportal5']").html("");
        event.preventDefault();
    });


}








function show_change_account_info(){
    content = `
    <div>
   <div class="Polaris-Modal-Dialog__Container" data-polaris-layer="true" data-polaris-overlay="true">
      <div>
         <div role="dialog" aria-labelledby="Polarismodal-header3" tabindex="-1" class="Polaris-Modal-Dialog">
            <div class="Polaris-Modal-Dialog__Modal">
               <div class="Polaris-Modal-Header">
                  <div id="Polarismodal-header3" class="Polaris-Modal-Header__Title">
                     <h2 class="Polaris-DisplayText Polaris-DisplayText--sizeSmall">Edit Account Info</h2>
                  </div>
                  <button class="Polaris-Modal-CloseButton" aria-label="Close">
                     <span class="Polaris-Icon Polaris-Icon--colorBase Polaris-Icon--isColored">
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                           <path d="M11.414 10l6.293-6.293a1 1 0 1 0-1.414-1.414L10 8.586 3.707 2.293a1 1 0 0 0-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 1 0 1.414 1.414L10 11.414l6.293 6.293A.998.998 0 0 0 18 17a.999.999 0 0 0-.293-.707L11.414 10z"></path>
                        </svg>
                     </span>
                  </button>
               </div>
               <div class="Polaris-Modal__BodyWrapper">
                  <div class="Polaris-Modal__Body Polaris-Scrollable Polaris-Scrollable--vertical" data-polaris-scrollable="true">
                     <section class="Polaris-Modal-Section">
                        <form method="post">
                           <div class="Polaris-FormLayout">
                              <div role="group" class="Polaris-FormLayout--grouped">
                                 <div class="Polaris-FormLayout__Items">
                                    <div class="Polaris-FormLayout__Item">
                                       <div class="">
                                          <div class="Polaris-Labelled__LabelWrapper">
                                             <div class="Polaris-Label"><label id="PolarisTextField9Label" for="PolarisTextField9" class="Polaris-Label__Text">First Name</label></div>
                                          </div>
                                          <div class="Polaris-Connected">
                                             <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                                <div class="Polaris-TextField Polaris-TextField--hasValue">
                                                   <input id="PolarisTextField9" class="Polaris-TextField__Input" aria-labelledby="PolarisTextField9Label" aria-invalid="false" value="Ngô">
                                                   <div class="Polaris-TextField__Backdrop"></div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="Polaris-FormLayout__Item">
                                       <div class="">
                                          <div class="Polaris-Labelled__LabelWrapper">
                                             <div class="Polaris-Label"><label id="PolarisTextField10Label" for="PolarisTextField10" class="Polaris-Label__Text">Last Name</label></div>
                                          </div>
                                          <div class="Polaris-Connected">
                                             <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                                <div class="Polaris-TextField Polaris-TextField--hasValue">
                                                   <input id="PolarisTextField10" class="Polaris-TextField__Input" aria-labelledby="PolarisTextField10Label" aria-invalid="false" value="Quí">
                                                   <div class="Polaris-TextField__Backdrop"></div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="Polaris-FormLayout__Item">
                                 <div class="">
                                    <div class="Polaris-Labelled__LabelWrapper">
                                       <div class="Polaris-Label"><label id="PolarisTextField11Label" for="PolarisTextField11" class="Polaris-Label__Text">Email</label></div>
                                    </div>
                                    <div class="Polaris-Connected">
                                       <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                          <div class="Polaris-TextField Polaris-TextField--hasValue">
                                             <input id="PolarisTextField11" class="Polaris-TextField__Input" type="email" aria-labelledby="PolarisTextField11Label" aria-invalid="false" value="ngohongqui@gmail.com">
                                             <div class="Polaris-TextField__Backdrop"></div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div class="Polaris-FormLayout__Item">
                                 <div class="Polaris-ButtonGroup">
                                    <div class="Polaris-ButtonGroup__Item"><button id="polar-save" class="Polaris-Button Polaris-Button--primary" type="submit"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Save</span></span></button></div>
                                    <div class="Polaris-ButtonGroup__Item"><button id="polar-cancel" class="Polaris-Button" type="button"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Cancel</span></span></button></div>
                                 </div>
                              </div>
                           </div>
                           <span class="Polaris-VisuallyHidden"><button type="submit" aria-hidden="true" tabindex="-1">Submit</button></span>
                        </form>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

`
    backdrop = '<div id="polaris-backdrop" class="Polaris-Backdrop"></div>'
    $("div[data-portal-id='modal-Polarisportal5']").html(content+backdrop);

    $(".Polaris-Modal-CloseButton").click(function(){
        $("div[data-portal-id='modal-Polarisportal5']").html("");
    });

    $("#polar-cancel").click(function(){
        $("div[data-portal-id='modal-Polarisportal5']").html("");
    });


    $("#PolarisTextField9").val(localStorage.getItem('first_name'))
    $("#PolarisTextField10").val(localStorage.getItem('last_name'))
    $("#PolarisTextField11").val(localStorage.getItem('email'))

    $("#polar-save").click(function(){
        $.ajax({
                method: "PUT",
                dataType: "json",
                contentType: 'application/json',
                url: "https://" + domain + ":3500/api/user/"+ localStorage.getItem('id'),
                headers: {
                    'Authorization':'Bearer '+ localStorage.getItem('token'),
                },
                data: JSON.stringify(
                    {
                        "first_name": $("#PolarisTextField9").val(),
                        "last_name": $("#PolarisTextField10").val(),
                        "email" : $("#PolarisTextField11").val(),
                    }
                ),
                error: function(response) {
                    
                    alert("Something 's wrong");
                    $("div[data-portal-id='modal-Polarisportal5']").html("");
                }, success(response) {

                    if(!response['success']){
                        alert("Something 's wrong");              
                    }
                    else{
                        
                        update_user_data(function(){
                            $("#setting-fullname").text(localStorage.getItem('fullname'))
                            $("#setting-email").text(localStorage.getItem('email'))
                        })
                        
                    }
                    $("div[data-portal-id='modal-Polarisportal5']").html("");    
                }
            });
        
        event.preventDefault();
    });


}





function show_create_order(){
    content = `
    <div>
   <div class="Polaris-Modal-Dialog__Container" data-polaris-layer="true" data-polaris-overlay="true">
      <div>
         <div role="dialog" aria-labelledby="Polarismodal-header6" tabindex="-1" class="Polaris-Modal-Dialog">
            <div class="Polaris-Modal-Dialog__Modal">
               <div class="Polaris-Modal-Header">
                  <div id="Polarismodal-header6" class="Polaris-Modal-Header__Title">
                     <h2 class="Polaris-DisplayText Polaris-DisplayText--sizeSmall">Upload your design</h2>
                  </div>
                  <button class="Polaris-Modal-CloseButton" aria-label="Close">
                     <span class="Polaris-Icon Polaris-Icon--colorBase Polaris-Icon--isColored">
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                           <path d="M11.414 10l6.293-6.293a1 1 0 1 0-1.414-1.414L10 8.586 3.707 2.293a1 1 0 0 0-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 1 0 1.414 1.414L10 11.414l6.293 6.293A.998.998 0 0 0 18 17a.999.999 0 0 0-.293-.707L11.414 10z"></path>
                        </svg>
                     </span>
                  </button>
               </div>
               <div class="Polaris-Modal__BodyWrapper">
                  <div class="Polaris-Modal__Body Polaris-Scrollable Polaris-Scrollable--vertical" data-polaris-scrollable="true">
                     <section class="Polaris-Modal-Section">
                        <form method="post">
                           <div class="Polaris-FormLayout">
                              <div class="Polaris-FormLayout__Item">
                                 

<style type="text/css">
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

</style>


<div class="upload-btn-wrapper">
  <button class="btn">Upload a file</button>
  <input id="upload-btn" type="file" name="myfile">
</div>
                              </div>
                              
                              
                           </div>
                           <span class="Polaris-VisuallyHidden"><button type="submit" aria-hidden="true" tabindex="-1">Submit</button></span>
                        </form>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

`
    backdrop = '<div id="polaris-backdrop" class="Polaris-Backdrop"></div>'
    $("div[data-portal-id='modal-Polarisportal5']").html(content+backdrop);

    $(".Polaris-Modal-CloseButton").click(function(){
        $("div[data-portal-id='modal-Polarisportal5']").html("");
    });

    $("#upload-btn").change(function(){
        $("button.btn").css('color','#4fb648');

        var formData = new FormData();
        formData.append('file', $('#upload-btn')[0].files[0]);

        $.ajax({

               url : "https://" + domain + ":3500/api/orders" ,
               type : 'POST',
               headers: {
                    'Authorization':'Bearer '+ localStorage.getItem('token'),
                },
                // dataType: "json",
                contentType: false,
               data : formData,

               processData: false,  // tell jQuery not to process the data
               success : function(data) {
                   setTimeout(function(){ 
                       $("div[data-portal-id='modal-Polarisportal5']").html(""); 

                   }, 500);
               }
        });
    })
    


}