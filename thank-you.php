<?php
/**
 * Template Name: Thank You
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;
Timber::render('thank-you.twig', $data);