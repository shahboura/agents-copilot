#!/usr/bin/env node

/**
 * Agents Copilot Installation Script
 * Cross-platform installer for Windows, Linux, and macOS
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// Colors for output
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(color, prefix, message) {
    console.log(`${color}[${prefix}]${colors.reset} ${message}`);
}

function info(message) {
    log(colors.blue, 'INFO', message);
}

function success(message) {
    log(colors.green, 'SUCCESS', message);
}

function warning(message) {
    log(colors.yellow, 'WARNING', message);
}

function error(message) {
    log(colors.red, 'ERROR', message);
}

// Check if command exists
function commandExists(command) {
    try {
        const testCmd = os.platform() === 'win32' ? `where ${command}` : `which ${command}`;
        execSync(testCmd, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

// Cross-platform path handling
function getHomeDir() {
    return os.homedir();
}

function getGlobalConfigDir() {
    const home = getHomeDir();
    return path.join(home, '.config', 'agents-copilot');
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;

    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        ensureDir(dest);
        const files = fs.readdirSync(src);
        files.forEach(file => {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            copyRecursive(srcPath, destPath);
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function cloneRepository(tempDir) {
    info('Cloning Agents Copilot repository...');

    try {
        execSync('git clone --depth 1 --quiet https://github.com/shahboura/agents-copilot.git .', {
            cwd: tempDir,
            stdio: 'pipe'
        });
        return true;
    } catch (err) {
        error('Failed to clone repository. Please check your internet connection.');
        return false;
    }
}

function validateRepository(repoDir) {
    const agentsDir = path.join(repoDir, '.github', 'agents');
    if (!fs.existsSync(agentsDir)) {
        error('Invalid repository structure. Missing .github/agents directory.');
        return false;
    }
    return true;
}

function checkVersion(tempDir) {
    try {
        const versionPath = path.join(tempDir, 'VERSION');
        if (fs.existsSync(versionPath)) {
            const version = fs.readFileSync(versionPath, 'utf8').trim();
            info(`Installing Agents Copilot v${version}`);
            return version;
        }
    } catch (err) {
        // Ignore version check errors
    }
    return null;
}

function installGlobal(tempDir) {
    info('Installing agents globally...');

    const globalConfigDir = getGlobalConfigDir();

    // Backup existing installation if it exists
    if (fs.existsSync(globalConfigDir)) {
        const backupDir = `${globalConfigDir}.backup.${Date.now()}`;
        try {
            fs.renameSync(globalConfigDir, backupDir);
            info(`Backed up existing installation to ${backupDir}`);
        } catch (err) {
            warning(`Could not backup existing installation: ${err.message}`);
        }
    }

    // Copy all .github/agents/ contents
    const agentsSrc = path.join(tempDir, '.github', 'agents');
    if (fs.existsSync(agentsSrc)) {
        copyRecursive(agentsSrc, globalConfigDir);
        success(`✓ Copied all agent configurations`);
    }

    // Copy instructions
    const instructionsSrc = path.join(tempDir, '.github', 'instructions');
    if (fs.existsSync(instructionsSrc)) {
        copyRecursive(instructionsSrc, path.join(globalConfigDir, 'instructions'));
        success(`✓ Copied language instructions`);
    }

    // Copy prompts
    const promptsSrc = path.join(tempDir, '.github', 'prompts');
    if (fs.existsSync(promptsSrc)) {
        copyRecursive(promptsSrc, path.join(globalConfigDir, 'prompts'));
        success(`✓ Copied reusable prompts`);
    }

    // Copy AGENTS.md template only if it doesn't exist (preserve user history)
    const agentsMdSrc = path.join(tempDir, 'AGENTS.md');
    const agentsMdDest = path.join(globalConfigDir, 'AGENTS.md');
    if (fs.existsSync(agentsMdSrc) && !fs.existsSync(agentsMdDest)) {
        fs.copyFileSync(agentsMdSrc, agentsMdDest);
        success(`✓ Session log template created`);
    } else if (fs.existsSync(agentsMdDest)) {
        info(`✓ Preserved existing session history`);
    }

    success('✅ Global installation completed successfully!');
    info(`Configuration location: ${globalConfigDir}`);
    info('Agents are now available in all your projects.');
}

function installProject(tempDir, projectDir) {
    info(`Installing agents for project: ${projectDir}`);

    // Check if project directory exists
    if (!fs.existsSync(projectDir)) {
        error(`Project directory does not exist: ${projectDir}`);
        return false;
    }

    // Check if it's a git repository (optional but recommended)
    const gitDir = path.join(projectDir, '.git');
    if (!fs.existsSync(gitDir)) {
        warning('Project directory is not a git repository. Agent session logging may be limited.');
    }

    // Create .agents-copilot directory
    const agentsDir = path.join(projectDir, '.agents-copilot');
    ensureDir(agentsDir);

    // Backup existing .agents-copilot if it exists
    if (fs.existsSync(agentsDir) && fs.readdirSync(agentsDir).length > 0) {
        const backupDir = `${agentsDir}.backup.${Date.now()}`;
        try {
            fs.renameSync(agentsDir, backupDir);
            info(`Backed up existing .agents-copilot to ${backupDir}`);
            ensureDir(agentsDir); // Recreate the directory
        } catch (err) {
            warning(`Could not backup existing .agents-copilot: ${err.message}`);
        }
    }

    // Copy all .github/agents/ contents
    const agentsSrc = path.join(tempDir, '.github', 'agents');
    if (fs.existsSync(agentsSrc)) {
        copyRecursive(agentsSrc, agentsDir);
        success(`✓ Copied all agent configurations`);
    }

    // Copy instructions
    const instructionsSrc = path.join(tempDir, '.github', 'instructions');
    if (fs.existsSync(instructionsSrc)) {
        copyRecursive(instructionsSrc, path.join(agentsDir, 'instructions'));
        success(`✓ Copied language instructions`);
    }

    // Copy prompts
    const promptsSrc = path.join(tempDir, '.github', 'prompts');
    if (fs.existsSync(promptsSrc)) {
        copyRecursive(promptsSrc, path.join(agentsDir, 'prompts'));
        success(`✓ Copied reusable prompts`);
    }

    // Copy AGENTS.md template if it doesn't exist (preserve user history)
    const agentsMdSrc = path.join(tempDir, 'AGENTS.md');
    const agentsMdDest = path.join(projectDir, 'AGENTS.md');
    if (fs.existsSync(agentsMdSrc) && !fs.existsSync(agentsMdDest)) {
        fs.copyFileSync(agentsMdSrc, agentsMdDest);
        success(`✓ Session log template created`);
    } else if (fs.existsSync(agentsMdDest)) {
        info(`✓ Preserved existing session history`);
    }

    success('✅ Project installation completed successfully!');
    info(`Agents configured for: ${projectDir}`);
    info(`Configuration: ${path.join(projectDir, '.agents-copilot/')}`);
    return true;
}

function uninstall() {
    info('Uninstalling Agents Copilot from current directory...');

    const currentDir = process.cwd();
    const agentsDir = path.join(currentDir, '.agents-copilot');
    const agentsMdPath = path.join(currentDir, 'AGENTS.md');

    let foundInstallation = false;

    try {
        // Check for any Agents Copilot installation files/directories
        if (fs.existsSync(agentsDir) || fs.existsSync(agentsMdPath)) {
            foundInstallation = true;

            // Backup AGENTS.md with timestamp
            if (fs.existsSync(agentsMdPath)) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
                const backupAgentsMd = path.join(currentDir, `AGENTS.${timestamp}.bk.md`);
                fs.renameSync(agentsMdPath, backupAgentsMd);
                success(`✅ Session history backed up to: AGENTS.${timestamp}.bk.md`);
            }

            // Remove .agents-copilot directory entirely
            if (fs.existsSync(agentsDir)) {
                fs.rmSync(agentsDir, { recursive: true, force: true });
                success(`✅ Removed agent configurations`);
            }

            success('✅ Agents Copilot uninstalled from current directory!');
            info('Agent configurations removed (can be re-installed).');

            // Remove the install script itself after process exits
            const scriptPath = path.join(currentDir, 'install.js');
            if (fs.existsSync(scriptPath)) {
                process.on('exit', () => {
                    try {
                        fs.unlinkSync(scriptPath);
                    } catch (err) {
                        // Silent fail - script may be locked
                    }
                });
                success(`✅ Installation script will be removed`);
            }
        }

        if (!foundInstallation) {
            warning('No Agents Copilot installation found in current directory.');
        }

    } catch (err) {
        error(`❌ Failed to uninstall: ${err.message}`);
        return false;
    }

    return true;
}

function showVersion(tempDir) {
    try {
        const versionPath = path.join(tempDir, 'VERSION');
        if (fs.existsSync(versionPath)) {
            const version = fs.readFileSync(versionPath, 'utf8').trim();
            console.log(`Agents Copilot v${version}`);
            console.log(`Repository: https://github.com/shahboura/agents-copilot`);
        } else {
            console.log('Agents Copilot (version unknown)');
        }
    } catch (err) {
        console.log('Agents Copilot (version check failed)');
    }
}

function showUsage() {
    console.log(`
🤖 Agents Copilot Installation Script

USAGE:
    node install.js [OPTIONS]

OPTIONS:
    -g, --global                Install agents globally (available in all projects)
    -p, --project DIR           Install agents for specific project directory
    -u, --uninstall             Remove agents from current directory
    -v, --version               Show version information
    -h, --help                  Show this help message

EXAMPLES:
    node install.js --global                    # Install globally
    node install.js --project /path/to/project  # Install for specific project
    node install.js --project .                 # Install in current directory
    node install.js --uninstall                 # Remove from current directory

PREREQUISITES:
    - Git (for downloading)
    - Node.js/npm
    - Internet connection

 FEATURES:
    ✓ Cross-platform (Windows/Linux/macOS)
    ✓ Automatic backups of existing installations
    ✓ Preserves user session history (AGENTS.md)
    ✓ Post-installation verification
    ✓ Automatic cleanup (removes installation script)

 INSTALLATION LOCATIONS:
    Global: ~/.config/agents-copilot/ (Linux/macOS/Windows)
    Project: ./.agents-copilot/ in your project directory

For more information, visit: https://github.com/shahboura/agents-copilot
`);
    process.exit(1);
}

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
        showUsage();
    }

    // Handle uninstall separately (doesn't need repository clone)
    const hasUninstall = args.includes('-u') || args.includes('--uninstall');
    if (hasUninstall) {
        if (uninstall()) {
            success('Uninstallation completed!');
        }
        return;
    }

    // Check prerequisites for install operations
    if (!commandExists('git')) {
        error('Git is required but not installed. Please install git first.');
        process.exit(1);
    }

    if (!commandExists('npm')) {
        error('Node.js/npm is required but not installed. Please install Node.js first.');
        process.exit(1);
    }

    // Create temporary directory
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agents-copilot-install-'));

    try {
        info('🚀 Starting Agents Copilot installation...');

        // Clone repository
        if (!cloneRepository(tempDir)) {
            error('❌ Repository download failed');
            process.exit(1);
        }

        // Check version
        const version = checkVersion(tempDir);
        if (version) {
            info(`📦 Installing version ${version}`);
        }

        // Validate repository
        if (!validateRepository(tempDir)) {
            error('❌ Repository validation failed');
            process.exit(1);
        }

        // Parse arguments and install
        const command = args[0];
        switch (command) {
            case '-g':
            case '--global':
                installGlobal(tempDir);
                info("\n🎯 Next steps:");
                info("1. Run 'opencode' or configure your preferred chat interface");
                info("2. Type '@' to see available agents");
                info("3. Try: @orchestrator Build a user API endpoint");
                info("\n📚 Documentation: https://github.com/shahboura/agents-copilot");
                break;
            case '-p':
            case '--project':
                if (args.length < 2) {
                    error('Project directory required');
                    showUsage();
                }
                if (!installProject(tempDir, args[1])) {
                    error('❌ Project installation failed');
                    process.exit(1);
                } else {
                    const projectPath = path.resolve(args[1]);
                    info("\n🎯 Next steps:");
                    info(`1. cd ${projectPath}`);
                    info("2. Run 'opencode' or configure your preferred chat interface");
                    info("3. Type '@' to see available agents");
                    info("\n📚 Documentation: https://github.com/shahboura/agents-copilot");
                }
                break;
            case '-v':
            case '--version':
                showVersion(tempDir);
                break;
            default:
                error(`Unknown option: ${command}`);
                showUsage();
        }

    } finally {
        // Clean up temporary directory
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
        } catch (err) {
            warning(`Failed to clean up temporary directory: ${tempDir}`);
        }
    }
}

if (require.main === module) {
    main();
}