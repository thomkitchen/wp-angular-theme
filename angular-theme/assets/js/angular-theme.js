var wpApp = new angular.module( 'wpAngularTheme', ['ui.router', 'ngResource'] );

//Setting up Post, Author and AuthorPosts factories to retrieve data from WP REST API
wpApp.factory( 'Posts', function( $resource ) {
	return $resource( appInfo.api_url + 'posts/:ID', {
		ID: '@id'
	} )
});
wpApp.factory( 'Author', function( $resource ) {
	return $resource( appInfo.api_url + 'users/:ID', {
		ID: '@id'
	})
})
wpApp.factory( 'AuthorPosts', function( $resource ) {
	return $resource( appInfo.api_url + 'posts?author=:ID', {
		ID: '@id'
	})
})

//Controller for main view. Gets and lists recent posts
wpApp.controller( 'ListCtrl', ['$scope', 'Posts', function( $scope, Posts ){
	$scope.page_title = 'Latest Posts';
	Posts.query( function( res ) {
		$scope.posts = res;
	});

}]);

//Controller for detailed view. Gets specific post by id, then grabs the author of that post
wpApp.controller( 'DetailCtrl', ['$scope', '$stateParams', 'Posts', 'Author', function( $scope, $stateParams, Posts, Author ) {
	Posts.get( { ID: $stateParams.id }, function( data ){
		console.log($stateParams);
		$scope.post = data;
		Author.get( { ID: data.author}, function( data ) {
			$scope.author = data;
		} )
	});

}]);

//Controller for detailed view. Gets specific post by id, then grabs the author of that post
wpApp.controller( 'AuthorCtrl', ['$scope', '$stateParams', 'AuthorPosts', 'Author', function( $scope, $stateParams, AuthorPosts, Author) {
	console.log($stateParams.id);
	Author.get( { ID: $stateParams.id}, function( data ) {
		$scope.author = data;
	} )
	AuthorPosts.query( { ID: $stateParams.id }, function( data ){
		$scope.posts = data;
	});
}]);

//Setting up view routes, controller for route, and view template
wpApp.config( function( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state( 'list', {
			url: '/',
			controller: 'ListCtrl',
			templateUrl: appInfo.template_directory + 'templates/list.html'
		})
		.state( 'detail', {
			url: '/posts/:id',
			controller: 'DetailCtrl',
			templateUrl: appInfo.template_directory + 'templates/detail.html'
		})
		.state( 'author', {
			url: '/writer/:id',
			controller: 'AuthorCtrl',
			templateUrl: appInfo.template_directory + 'templates/author.html'
		})
})

//Filter to display trusted html within template
wpApp.filter( 'trusted_html', ['$sce', function( $sce ) {
	return function( content ) {
		return $sce.trustAsHtml( content );
	} 
}])