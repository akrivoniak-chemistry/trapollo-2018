<?php
/**
 * Template Name: About
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;
Timber::render('about.twig', $data);