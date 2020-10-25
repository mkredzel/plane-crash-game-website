<?php

/* Include the PHP functions to be used on the page */
include('common.php');

/* Output header for the page and assign title for it */
output_header("Ranking");

/* Output navigation bar and specify 'active' highlight */
output_navigation("notActive", "notActive", "notActive", "notActive", "active");

/* Output text information of the page */
output_content("Here are the top 10 scorers!", "content", "contentblock");

/* Output ranking with top 10 scorers */
output_ranking();

/* Output footer */
output_footer();

/* Output social media icons */
output_icons();

?>