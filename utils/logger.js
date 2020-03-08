const bunyan = require('bunyan'),
    {LoggingBunyan} = require('@google-cloud/logging-bunyan'),
    loggingBunyan = new LoggingBunyan();

module.exports = bunyan.createLogger({
    // The JSON payload of the log as it appears in Stackdriver Logging
    // will contain "name": "my-service"
    name: 'sub_ssr_restful',
    streams: [
        // Log to the console at 'info' and above
        {stream: process.stdout, level: 'info'},
        // And log to Stackdriver Logging, logging at 'info' and above
        loggingBunyan.stream('info'),
    ],
});

// exports logger = logger;