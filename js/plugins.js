var mediaCheck = function(options) { 
    var mq,
        matchMedia = window.matchMedia !== undefined;
    if (matchMedia) {   
        mqChange = function(mq, options) {
            if (mq.matches) {
                options.entry();
            } else {
                options.exit();
            }
        };
        createListener = function(mqDetails) {
            mq = window.matchMedia(mqDetails.media);
            mq.addListener(function() {
                mqChange(mq, mqDetails);
            });
            mqChange(mq, mqDetails);
        };
        createListener(options);
    }
};

jQuery.fn.slideFadeToggle = function(speed, easing, callback) {
    return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};

function validateEmail(email) {   
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function Timer(func, delay, start) {
    this.func = func;
    this.delay = delay;
    this.running = false;
    if(start) this.start();
}
Timer.prototype.start = function(delay) {
    this.running = true;
    return this.interval = setInterval(this.func, (delay || this.delay));
}
Timer.prototype.stop = function() {
    this.running = false;
    clearInterval(this.interval);
}