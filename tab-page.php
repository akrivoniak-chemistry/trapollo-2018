<?php
/**
 * Template Name: Tab Page
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;
Timber::render('tab-page.twig', $data);