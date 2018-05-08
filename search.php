<?php
/**
 * Search results page
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$templates = array( 'search.twig', 'archive.twig', 'index.twig' );
$context = Timber::get_context();

$context['search_query'] = get_search_query();
$context['posts'] = new Timber\PostQuery();
$context['pagination'] = Timber::get_pagination();

// print_r($context['pagination']);
// echo $context['pagination']; 

Timber::render( $templates, $context );
