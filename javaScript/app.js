(function () {
    function init() {
        var router = new Router([
            new Route('home', 'homepage.html', true),            
            new Route('newest-kitties', 'newest-kitties.html'),
            new Route('top-owners', 'top-owners.html'),
            new Route('kitty-profile', 'kitty-profile.html')
        ]);
    }
    init();
}());