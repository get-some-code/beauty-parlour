const { execSync } = require('child_process');
try {
    execSync('npx next build', { stdio: 'pipe', encoding: 'utf-8', env: { ...process.env, CI: '1', FORCE_COLOR: '0' } });
    console.log('Build succeeded');
} catch (e) {
    require('fs').writeFileSync('build-error.txt', e.stdout + '\n' + e.stderr);
    console.log('Build failed, error written to build-error.txt');
}
