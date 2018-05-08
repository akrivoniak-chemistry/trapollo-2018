<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = Timber::query_post();
$context['post'] = $post;
$currentID = get_the_ID();

$posttags = get_the_tags();
$context['related_posts'] = '';
if ($posttags) {
	foreach($posttags as $tag) {
		$args= array('tag_id'=>$tag->term_id,
            'posts_per_page'=>3, 
            'post__not_in'=> array($currentID),
        );
        $context['related_posts'] = Timber::get_posts( $args );
	}
}

$context['categories'] = $post->terms( 'category' );

if ( post_password_required( $post->ID ) ) {
	Timber::render( 'single-password.twig', $context );
} else {
	Timber::render( array( 'single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig' ), $context );
}
