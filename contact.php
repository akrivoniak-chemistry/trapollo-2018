<?php
/**
 * Template Name: Contact
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;
Timber::render('contact.twig', $data);