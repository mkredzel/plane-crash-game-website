<?php

/* Include the PHP functions to be used on the page */
include('common.php');

/* Output header for the page and assign title for it */
output_header("Play");

/* Output navigation bar and specify 'active' highlight */
output_navigation("notActive", "notActive", "notActive", "active", "notActive");

/* Output the game */
output_game();

/* Output footer */
output_footer();

/* Output social media icons */
output_icons();

?>