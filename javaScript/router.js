function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var r = this.routes;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) { 
            var url = 'Views/' + htmlName;
            if(htmlName=="newest-kitties.html") {
                loadJsURL("/javaScript/newest-kitties.js");
            }

            if(htmlName=="kitty-profile.html"){
                loadJsURL("/javaScript/kitty-profile.js");
            }

            if(htmlName=="user-profile.html"){
                loadJsURL("/javaScript/user-profile.js");
            }

            if(htmlName=="family-tree.html"){
                loadJsURL("/javaScript/family-tree.js");
            }

            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();

          
        })(this);
    }
};

var loadJsURL = function(url) {

    var canJsLoad = function(url) {
        if (!url) return false;
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            // *td
            // better with substring or pos, thinking of // start
            if (scripts[i].src == url) return false;
        }
        return true;
    }

    // Load js url
    var insertJsUrl = function(url) {
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.body.appendChild(script);
    }

    if ( canJsLoad(url) ) {
        insertJsUrl(url)
    }
}

