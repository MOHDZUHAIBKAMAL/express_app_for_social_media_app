const { spawn } = require('child_process');

// Run the service corresponding to the user_app
function runUserService() {
    return spawn('node', ['user_app/app.js'], {
        stdio: 'inherit', // Directly inherit the parent process's stdin, stdout, and stderr
        shell: true       // Required for proper execution on some platforms like Windows
    });
}

// Run the service corresponding to the post_app
function runPostService() {
    return spawn('node', ['post_app/app.js'], {
        stdio: 'inherit',
        shell: true
    });
}

if (require.main === module) {
    const userService = runUserService();
    const postService = runPostService();

    // Graceful termination of the two subprocesses
    process.on('SIGINT', () => {
        console.log("\nTerminating both the processes. Alvida!");

        // Terminate the subprocesses
        userService.kill('SIGINT');
        postService.kill('SIGINT');
        process.exit(0);
    });
}
