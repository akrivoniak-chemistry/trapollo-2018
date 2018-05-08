<?php
/**
 * Template Name: Subpage
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;
Timber::render('subpage.twig', $data);