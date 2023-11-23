
const config = {
    iterations: 1, // Number of times to run the test
    concurrency: 1, // Number of concurrent users
    rampUpTime: 1, // Number of seconds to wait before starting the test
    thinkTime: 1, // Number of seconds to wait between each request
    duration: 600, // max number of seconds for each iteration
    url: "https://dev.trakr.live/", // URL of the application to test
    deviceToken: "X1LGQWtOmRGbDQiOF3Pd" // Device token to use for the test
}

export default config;
