# Development Guide

## Quick Start

### Installation

1. **Install Dependencies**
   ```bash
   composer install
   npm install
   ```

2. **Build Assets**
   ```bash
   # Development build (easier debugging, no minification)
   npm run build:dev

   # Production build (minified)
   npm run build
   ```

3. **Watch Mode** (auto-rebuild on changes)
   ```bash
   npm start
   ```

## Project Structure

```
aether-site-exporter-providers/
├── aether-site-exporter-providers.php  # Main plugin file
├── includes/
│   ├── Plugin.php                       # Main plugin class
│   ├── autoloader.php                   # PSR-4 autoloader
│   └── REST/
│       ├── RESTHelpersTrait.php        # REST API helpers
│       └── WorkerScriptController.php   # Serves Cloudflare worker scripts
├── assets/
│   ├── src/
│   │   ├── providers/                   # Provider implementations
│   │   │   ├── cloudflare/             # Cloudflare Workers (edge)
│   │   │   ├── cloudflare-r2/          # R2 storage
│   │   │   ├── gitlab/                 # GitLab git
│   │   │   ├── gitlab-pages/           # GitLab Pages
│   │   │   ├── base/                   # AbstractProvider (copied from parent)
│   │   │   ├── components/             # UI components (copied from parent)
│   │   │   ├── registry/               # ProviderRegistry (copied from parent)
│   │   │   └── utils/                  # Provider utilities (copied from parent)
│   │   ├── utils/                      # Shared utilities (copied from parent)
│   │   └── constants/                  # Constants (copied from parent)
│   ├── workers/
│   │   └── CloudflareR2Worker.js       # R2 upload proxy worker
│   └── build/                          # Compiled assets (git-ignored)
│       ├── provider-cloudflare.js
│       ├── provider-cloudflare-r2.js
│       ├── provider-gitlab.js
│       └── provider-gitlab-pages.js
└── tests/                               # Unit tests
```

## Code Quality

### Linting & Formatting

```bash
# JavaScript
npm run lint:js              # Check JavaScript
npm run lint:js:fix          # Auto-fix JavaScript issues

# PHP
composer check-cs            # Check PHP code standards (PHPCS + PHP-CS-Fixer)
composer fix-cs              # Auto-fix PHP code standards
composer fix-cs-fixer        # Run PHP-CS-Fixer only
```

### Static Analysis

```bash
composer phpstan             # Run PHPStan (Level 8)
composer check-stan          # Alias for phpstan
```

### Run All Checks

```bash
composer check               # Run PHPCS + PHPStan
```

## Testing

### JavaScript Tests

```bash
npm run test:js              # Run all JavaScript tests
npm run test:js:watch        # Watch mode (re-run on changes)
npm run test:js:coverage     # Generate coverage report
```

### PHP Tests

```bash
composer test                # Run PHP unit tests (if configured)
```

## Build Process

### Webpack Configuration

The plugin uses `@wordpress/scripts` with a custom webpack configuration:

- **Entry Points**: Separate bundle for each provider
- **Output**: `assets/build/provider-{name}.js`
- **Externals**: WordPress and React packages are externalized (provided by WordPress)
- **Optimization**: Code splitting disabled, all code in single bundles
- **Minification**: Controlled by `MINIFY` environment variable

### Build Commands

```bash
# Development build (no minification, faster)
MINIFY=false npm run build

# Production build (minified)
MINIFY=true npm run build

# Or use the shortcuts
npm run build:dev            # Development
npm run build                # Production (default)
```

## Provider Development

### Provider Structure

Each provider consists of:

1. **Provider Class** (`{Name}Provider.js`)
   - Extends `AbstractProvider`
   - Implements `IProvider` interface
   - Handles deployment logic

2. **Settings Component** (`Settings.js`)
   - React component for provider configuration
   - Registers via `aether.admin.provider.settings` hook

3. **Index File** (`index.js`)
   - Registers provider with registry
   - Registers settings component
   - Entry point for webpack

4. **Tests** (`__tests__/{Name}Provider.test.js`)
   - Unit tests for provider functionality

### Creating a New Provider

1. Create provider directory in `assets/src/providers/`
2. Implement provider class extending `AbstractProvider`
3. Create settings component
4. Create index.js for registration
5. Add entry point to `webpack.config.js`
6. Update `Plugin.php` to enqueue new provider script

Example:

```javascript
// assets/src/providers/my-provider/MyProvider.js
import { AbstractProvider } from '../base/AbstractProvider';

export class MyProvider extends AbstractProvider {
    static ID = 'my-provider';

    getId() {
        return MyProvider.ID;
    }

    getName() {
        return 'My Provider';
    }

    // ... implement other methods
}

// assets/src/providers/my-provider/index.js
import { addAction } from '@wordpress/hooks';
import { MyProvider } from './MyProvider';

addAction('aether.providers.register', 'my-provider', (registry) => {
    registry.register(MyProvider.ID, MyProvider);
});
```

## REST API

### Endpoints

This plugin provides:

- `GET /wp-json/aether/site-exporter/providers/worker-scripts/{type}`
  - Get Cloudflare Worker script content
  - Types: `r2`
  - Auth: Requires `manage_options` capability

### Testing Endpoints

```bash
# Get R2 worker script
curl -H "X-WP-Nonce: $(wp eval 'echo wp_create_nonce("wp_rest");')" \
     http://localhost/wp-json/aether/site-exporter/providers/worker-scripts/r2
```

## Debugging

### JavaScript Debugging

1. Build with development mode: `npm run build:dev`
2. Open browser dev tools
3. Sources are available in the build directory (not minified)

### PHP Debugging

1. Enable WordPress debug mode in `wp-config.php`:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```

2. Check `wp-content/debug.log` for PHP errors

### Provider Registration Debugging

Check if providers are registered:

```javascript
// In browser console
console.log(window.wp.hooks.doAction('aether.providers.register'));
```

## Common Issues

### Build Failures

**Issue**: `Module not found` errors during build

**Solution**: Run `npm install` to ensure all dependencies are installed

### Provider Not Appearing

**Issue**: Provider doesn't appear in Aether Site Exporter

**Solution**:
1. Check that provider script is built (`assets/build/provider-{name}.js` exists)
2. Verify provider is enqueued in `Plugin.php`
3. Check browser console for JavaScript errors
4. Ensure parent plugin is active

### REST API 404 Errors

**Issue**: Worker script endpoint returns 404

**Solution**:
1. Flush WordPress permalinks: Settings → Permalinks → Save Changes
2. Verify REST API is working: Visit `/wp-json/`
3. Check `.htaccess` file for proper rewrite rules

## Coding Standards

### PHP

- **Standard**: PSR-12 with WordPress Coding Standards
- **PHPStan**: Level 8
- **PHP Version**: 7.4+ (type hints, typed properties)

### JavaScript

- **Standard**: WordPress JavaScript Coding Standards
- **Framework**: React with WordPress packages
- **Hooks**: WordPress hooks system (`@wordpress/hooks`)

### Best Practices

1. **No Backwards Compatibility Hacks**: Delete old code, don't add compatibility layers
2. **Type Safety**: Use PHPDoc and JSDoc for type hints
3. **Security**: Sanitize inputs, escape outputs, use nonces
4. **Error Handling**: Return `{ success: false, error: 'message' }` on errors
5. **Async Methods**: Always catch errors, never throw to caller

## Git Workflow

### Commit Messages

Follow Conventional Commits:

```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
style: Code style/formatting
refactor: Code refactoring
test: Test updates
chore: Maintenance tasks
```

### Before Committing

```bash
# Run all checks
npm run lint:js:fix
composer fix-cs
composer phpstan

# Run tests
npm run test:js
```

## Release Process

1. Update version in:
   - `aether-site-exporter-providers.php` (plugin header)
   - `package.json`
   - `AETHER_SEP_VERSION` constant

2. Build production assets:
   ```bash
   npm run build
   ```

3. Commit version bump:
   ```bash
   git commit -m "chore: Bump version to 1.x.x"
   git tag v1.x.x
   ```

4. Push to repository:
   ```bash
   git push origin main --tags
   ```

## Useful Resources

- [Aether Site Exporter](https://github.com/aristath/aether-site-exporter) - Parent plugin
- [WordPress Hooks](https://developer.wordpress.org/plugins/hooks/) - Hook system documentation
- [WordPress REST API](https://developer.wordpress.org/rest-api/) - REST API reference
- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) - Build tool documentation
