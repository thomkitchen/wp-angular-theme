		</div><!-- END CONTAINER -->  
		</div><!-- END FLUID CONTAINER -->	
		
		<footer class="container-fluid">
			<div class="container">
				<div class="row">
					<div class="col-sm-12 text-center">
						<h3 ng-bind-html="post.custom_field | trusted_html"></h3>
						<p>
							&copy; <?php echo esc_html( Date('Y') ); ?>
						</p>
					</div>
				</div>
			</div>
		</footer>  
    <!-- WP FOOTER -->
  	<?php wp_footer(); ?>
	    
</body>
</html>
