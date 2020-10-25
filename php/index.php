<?php

/* Include the PHP functions to be used on the page */
include('common.php');

/* Outputs header for the page and assigns title of it */
output_header("Home");

/* Outputs navigation bar and specifies 'active' highlight */
output_navigation("active", "notActive", "notActive", "notActive", "notActive");

/* Outputs text information of the page */
output_content("Welcome to the website I have created. <br>I highly recommend registering before playing, as you can get your score saved. <br> Don't forget to leave game feedback by clicking on of the stars below &dArr;", "content");

/* Outputs footer */
output_footer();

/* Outputs feedback window */
output_feedback();

/* Outputs social media icons */
output_icons();

?>