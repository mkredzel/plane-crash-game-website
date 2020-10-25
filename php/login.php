<?php

/* Include the PHP functions to be used on the page */
include('common.php');

/* Output header for the page and assign title for it */
output_header("Login");

/* Output navigation bar and specify 'active' highlight */
output_navigation("notActive", "notActive", "active", "notActive", "notActive");

/* Output text information of the page */
output_content("In order to log in, <br> please provide your user name and password.", "content");

/* Output login forms */
output_loginForm();

/* Output footer */
output_footer();

/* Output social media icons */
output_icons();

?>