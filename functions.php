<?php
@ini_set( 'upload_max_size' , '64M' );
@ini_set( 'post_max_size', '64M');
@ini_set( 'max_execution_time', '300' );

add_filter('upload_size_limit', 'increase_upload');
function increase_upload($bytes) {
    return 262144000;
}

function wpshock_search_filter( $query ) {
    if ( $query->is_search ) {
        $query->set( 'post_type', array('post','page') );
        $query->set( 'posts_per_page', -1 );
    }
    return $query;
}
add_filter('pre_get_posts','wpshock_search_filter');

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'options_page' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'loadScripts' ) );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function options_page () {
		if( function_exists('acf_add_options_page') ) {
			acf_add_options_page();	
		}
	}

	function add_to_context( $context ) {
		$context['logo'] = get_field('logo', 'option');

		// // Company Info
		$context['company_name'] = get_field('company_name', 'option');
		$context['company_twitter'] = get_field('company_twitter', 'option');
		$context['company_facebook'] = get_field('company_facebook', 'option');
		$context['company_linkedin'] = get_field('company_linkedin', 'option');
		$context['head_code'] = get_field('head_code', 'option');
		$context['footer_code'] = get_field('footer_code', 'option');

		// Header 
		$context['header_link_text'] = get_field('header_link_text', 'option');
		$context['header_link_url'] = get_field('header_link_url', 'option');
		$context['include_search_in_menu'] = get_field('include_search_in_menu', 'option');
		
		// Footer
		$context['footer_copyright'] = get_field('footer_copyright', 'option');
		$context['footer_small_links'] = get_field('footer_small_links', 'option');

		// news and ideas
		
		$context['news_page_headline'] = get_field('news_page_headline', 'option');
		$context['news_page_description'] = get_field('news_page_description', 'option');
		$context['featured_post'] = get_field('featured_post', 'option');

		// 404
		$context['notfound_title'] = get_field('404_title', 'option');
		$context['notfound_content'] = get_field('404_content', 'option');
		$context['include_three_blocks_from_homepage'] = get_field('include_three_blocks_from_homepage', 'option');

		$context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['main_header'] = new TimberMenu('main-header');
		$context['main_footer'] = new TimberMenu('main-footer');
		$context['site'] = $this;
		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function loadScripts() {
		wp_enqueue_script( 'ajax', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', array(), '1.0.0', true );
		wp_enqueue_script( 'validate', get_template_directory_uri() . '/js/jquery.validate.js', array(), '1.0.0', true );
		wp_enqueue_script( 'tween-max', get_template_directory_uri() . '/js/TweenMax.min.js', array(), '1.0.0', true );
		wp_enqueue_script( 'animate', get_template_directory_uri() . '/js/animate.js', array(), '1.0.0', true );
        wp_enqueue_script( 'main', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true );
    }


	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}

}

new StarterSite();
