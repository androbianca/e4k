(function () {
    function init() {
        var router = new Router([
            new Route('home', 'homepage.html', true),            
            new Route('newest-kitties', 'newest-kitties.html'),
            new Route('top-owners', 'top-owners.html'),
            new Route('user-profile/:adress', 'user-profile.html'),
            new Route('kitty-profile/:id', 'kitty-profile.html')
        ]);
    }
    init();
}());