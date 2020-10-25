<?php

/* Include the PHP functions to be used on the page */
include('common.php');

/* Output header for the page and assign title for it */
output_header("Register");

/* Output navigation bar and specify 'active' highlight */
output_navigation("notActive", "active", "notActive", "notActive", "notActive");

/* Output text information of the page */
output_content("To register, please provide user name, e-mail address and password <br> you would like to use.", "content");

/* Output register forms */
output_registerForm();

/* Output footer */
output_footer();

/* Output social media icons */
output_icons();

?>