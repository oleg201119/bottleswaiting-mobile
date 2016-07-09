angular.module('bwcapp.constant', [])

    .constant('constant', (function() {

        return {
            serviceUrl: "http://api-bw.dev.dfusiontech.com:8088",
            serviceAPIPath: "api/1"
        }

    })())
;