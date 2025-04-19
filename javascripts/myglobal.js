

function load_plotter(){
    if (window.location.pathname === '/premi%C3%A8re/algorithmique/1.algo/') {
        console.log("sur la page");
        import('/javascripts/plotter.js').then((module) => {
        module.init();
        console.log('plotter loaded');
        });
    }
}

document$.subscribe(load_plotter);