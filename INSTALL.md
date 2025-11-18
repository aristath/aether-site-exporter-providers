# Installation Guide

Complete installation guide for **Aether Site Exporter - Providers** plugin.

## Prerequisites

Before installing this plugin, ensure you have:

- ✅ WordPress 6.4 or higher
- ✅ PHP 7.4 or higher (PHP 8.1+ recommended)
- ✅ **Aether Site Exporter plugin** installed and activated (required dependency)
- ✅ Composer installed (for development)
- ✅ Node.js 18+ and npm (for building assets)

## Quick Install (For Users)

If you just want to use the plugin (pre-built assets):

### 1. Clone or Download

```bash
cd wp-content/plugins
git clone https://github.com/aristath/aether-site-exporter-providers.git
```

### 2. Activate Plugin

1. Go to WordPress Admin → Plugins
2. Find "Aether Site Exporter - Providers"
3. Click "Activate"

**Note**: If Aether Site Exporter is not installed, you'll see an error message. Install the parent plugin first.

### 3. Configure Providers

1. Go to Settings → Aether Export
2. Select your preferred provider (Cloudflare Workers, Cloudflare R2, GitLab, or GitLab Pages)
3. Enter your provider credentials
4. Click "Test Connection" to verify
5. Start deploying!

## Development Install

If you want to modify the plugin or contribute to development:

### 1. Clone Repository

```bash
cd wp-content/plugins
git clone https://github.com/aristath/aether-site-exporter-providers.git
cd aether-site-exporter-providers
```

### 2. Install Dependencies

#### Install PHP Dependencies

```bash
composer install
```

This installs:
- PHP CodeSniffer (PHPCS)
- PHPStan (static analysis)
- PHP-CS-Fixer
- WordPress Coding Standards

#### Install JavaScript Dependencies

```bash
npm install
```

This installs:
- @wordpress/scripts (build tools)
- React and WordPress packages
- Jest (testing framework)
- ESLint

### 3. Build Assets

#### Development Build (recommended during development)

```bash
npm run build:dev
```

This creates unminified bundles for easier debugging.

#### Production Build

```bash
npm run build
```

This creates minified, optimized bundles for production.

#### Watch Mode (auto-rebuild on changes)

```bash
npm start
```

File changes automatically trigger rebuilds.

### 4. Verify Installation

Check that build files exist:

```bash
ls -lh assets/build/
```

You should see:
- provider-cloudflare.js (170KB)
- provider-cloudflare-r2.js (178KB)
- provider-gitlab.js (157KB)
- provider-gitlab-pages.js (163KB)
- Plus corresponding .asset.php files

### 5. Run Code Quality Checks

#### PHP Checks

```bash
# Check coding standards
composer check-cs

# Run static analysis (Level 8)
composer phpstan

# Run both checks
composer check
```

#### JavaScript Checks

```bash
# Check JavaScript
npm run lint:js

# Auto-fix JavaScript issues
npm run lint:js:fix

# Run tests
npm run test:js
```

### 6. Activate Plugin

Same as Quick Install step 2.

## Troubleshooting

### Plugin Won't Activate

**Error**: "Aether Site Exporter - Providers requires the Aether Site Exporter plugin"

**Solution**: Install and activate the parent plugin first:
```bash
cd wp-content/plugins
git clone https://github.com/aristath/aether-site-exporter.git
cd aether-site-exporter
composer install
npm install
npm run build
# Then activate in WordPress admin
```

### Providers Don't Appear

**Symptom**: Plugin activates but providers don't show in Aether Site Exporter

**Solution**: Build the assets:
```bash
cd wp-content/plugins/aether-site-exporter-providers
npm install
npm run build
```

**Check**: Verify build files exist in `assets/build/`

### Build Fails

**Error**: "Module not found" or "Cannot find module"

**Solution**: Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Composer Install Fails

**Error**: "Your requirements could not be resolved"

**Solution**: Update Composer and try again:
```bash
composer self-update
composer install --ignore-platform-reqs
```

### JavaScript Errors in Browser Console

**Symptom**: "wp is not defined" or similar errors

**Possible causes**:
1. **Parent plugin not active**: Activate Aether Site Exporter first
2. **Build incomplete**: Run `npm run build` to rebuild assets
3. **Cache issue**: Clear browser cache and WordPress object cache

**Solution**:
```bash
# Rebuild assets
npm run build:dev

# Clear WordPress cache (if using cache plugin)
wp cache flush

# Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
```

### REST API 404 Errors

**Symptom**: Worker script endpoint returns 404

**Solution**: Flush WordPress permalinks
1. Go to Settings → Permalinks
2. Click "Save Changes" (no need to change anything)
3. Try the endpoint again

Or via WP-CLI:
```bash
wp rewrite flush
```

### Permission Errors

**Symptom**: "You do not have permission to access this"

**Solution**: Ensure you're logged in as an administrator. The plugin requires `manage_options` capability.

## Directory Permissions

Ensure proper permissions for WordPress to write built assets:

```bash
# From plugin root
chmod 755 assets/build
chmod 644 assets/build/*
```

## Updating the Plugin

### Via Git

```bash
cd wp-content/plugins/aether-site-exporter-providers
git pull origin main
composer install
npm install
npm run build
```

### Manual Update

1. Deactivate plugin in WordPress
2. Delete old plugin directory
3. Upload new version
4. Run installation steps above
5. Reactivate plugin

## Verifying Installation

### Check Plugin Version

```bash
# Via WP-CLI
wp plugin list | grep aether

# Check version in code
head -20 aether-site-exporter-providers.php | grep Version
```

### Check Dependencies

```bash
# Check if parent plugin is active
wp plugin is-active aether-site-exporter

# Check PHP version
php -v

# Check Node version
node -v

# Check Composer version
composer --version
```

### Test REST API

```bash
# Get worker script (requires authentication)
curl -I http://your-site.local/wp-json/aether/site-exporter/providers/worker-scripts/r2
```

Should return `200 OK` if plugin is working correctly.

### Test Provider Registration

In WordPress admin:
1. Go to Settings → Aether Export
2. Check that 4 providers are available:
   - Cloudflare Workers
   - Cloudflare R2
   - GitLab
   - GitLab Pages

## System Requirements Check

Run this command to verify your system meets requirements:

```bash
# Check all requirements
php -v && echo "---" && \
node -v && echo "---" && \
npm -v && echo "---" && \
composer --version && echo "---" && \
wp core version
```

Expected output:
```
PHP 8.1.x or higher
---
v18.x.x or higher
---
9.x.x or higher
---
Composer version 2.x.x
---
6.4.x or higher
```

## Next Steps

After successful installation:

1. **Configure Provider**: See [README.md](README.md) for provider-specific configuration guides
2. **Test Deployment**: Try deploying a simple static site
3. **Read Development Guide**: See [DEVELOPMENT.md](DEVELOPMENT.md) if contributing
4. **Check Integration**: See [INTEGRATION.md](INTEGRATION.md) for technical details

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide first
2. Review error logs: `wp-content/debug.log`
3. Check browser console for JavaScript errors
4. Open an issue on GitHub with:
   - WordPress version
   - PHP version
   - Node.js version
   - Error messages
   - Steps to reproduce

## Uninstallation

To completely remove the plugin:

### 1. Deactivate

WordPress Admin → Plugins → Deactivate

### 2. Delete

```bash
# From wp-content/plugins
rm -rf aether-site-exporter-providers
```

### 3. Clean Database (optional)

The plugin stores configuration in the parent plugin's option:
```bash
# View saved configuration
wp option get aether_site_exporter_settings

# To completely reset (removes ALL aether configuration!)
wp option delete aether_site_exporter_settings
```

**Warning**: This will delete ALL Aether Site Exporter configuration, not just provider settings!
