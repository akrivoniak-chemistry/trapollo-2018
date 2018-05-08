<?php
/**
 * Template Name: Home
 */

$post = new TimberPost();
$context = Timber::get_context();
$context['post'] = $post;

$args = array(
'post_type' => 'customer-story',
'posts_per_page' => 2,
'orderby' => array(
    'date' => 'DESC'
));
$context['stories'] = Timber::get_posts( $args );

Timber::render('home.twig', $context);