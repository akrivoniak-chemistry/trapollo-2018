<?php
/**
 * Template Name: Trapollo Platform
 */

$post = new TimberPost();
$data = Timber::get_context();
$data['post'] = $post;
Timber::render('trapollo-platform.twig', $data);