# Altolith Deploy - R2

Cloudflare R2 storage providers for [Altolith Deploy](https://github.com/aristath/altolith-deploy).

## Overview

This plugin extends Altolith Deploy with Cloudflare R2 storage providers, enabling you to deploy static sites and blueprint bundles to Cloudflare R2.

### Included Providers

- **Cloudflare R2 (Static Site)** - Deploy static sites to Cloudflare R2 object storage
- **Cloudflare R2 (Blueprint Bundle)** - Store WordPress Playground blueprint bundles in R2

## Requirements

- WordPress 6.4+
- PHP 7.4+ (PHP 8.1+ recommended)
- **Altolith Deploy** plugin (required dependency)
- Cloudflare account with R2 enabled

## Installation

### From Source

1. **Install Altolith Deploy** (required parent plugin)
   ```bash
   cd wp-content/plugins
   git clone https://github.com/aristath/altolith-deploy.git
   cd altolith-deploy
   composer install
   npm install
   npm run build
   ```

2. **Install This Plugin**
   ```bash
   cd wp-content/plugins
   git clone https://github.com/aristath/altolith-deploy-r2.git
   cd altolith-deploy-r2
   composer install
   npm install
   npm run build
   ```

3. **Activate Both Plugins**
   - Go to WordPress Admin → Plugins
   - Activate "Altolith Deploy"
   - Activate "Altolith Deploy - R2"

## Configuration

### Cloudflare R2

Deploy static sites to Cloudflare R2 object storage.

**Requirements:**
- Cloudflare account with R2 enabled
- R2 bucket created
- Cloudflare API token with R2 permissions
- Cloudflare Worker deployed for file uploads

**Configuration Fields:**
- **Account ID** - Your Cloudflare account ID (32-character hex string)
- **API Token** - Cloudflare API token with R2 permissions
- **Bucket Name** - Name of your R2 bucket
- **Path Prefix** (optional) - Subfolder path for uploads (e.g., "my-site/" will upload files as "my-site/index.html")
- **Worker Endpoint** - URL of the deployed Cloudflare Worker
- **Custom Domain** (optional) - Custom domain for your static site

**Setup Steps:**
1. Create an R2 bucket in Cloudflare dashboard
2. Generate a Cloudflare API token with R2 permissions
3. Go to Settings → Altolith Export
4. Add a new Cloudflare R2 provider instance
5. Enter your configuration details
6. Click "Deploy Worker" to create the upload worker
7. Test connection
8. Deploy your site

## Development

### Build Commands

```bash
# Development build (easier debugging)
npm run build:dev

# Production build (minified)
npm run build

# Watch mode (auto-rebuild on changes)
npm start

# Run tests
npm run test:js

# Linting
npm run lint:js
composer check-cs

# Fix coding standards
npm run lint:js:fix
composer fix-cs

# Static analysis
composer phpstan
```

### Project Structure

```
altolith-deploy-r2/
├── assets/
│   ├── src/
│   │   └── providers/
│   │       ├── cloudflare-r2-static-site/
│   │       ├── cloudflare-r2-blueprint-bundle/
│   │       ├── cloudflare-r2-shared/
│   │       └── services/
│   ├── workers/
│   │   └── CloudflareR2Worker.js
│   └── build/
├── includes/
│   ├── REST/
│   │   ├── RESTHelpersTrait.php
│   │   └── WorkerScriptController.php
│   ├── Plugin.php
│   └── autoloader.php
└── altolith-deploy-r2.php
```

## REST API Endpoints

- `GET /wp-json/altolith/deploy/providers/worker-scripts/r2`
  - Get Cloudflare R2 Worker script content
  - Requires `manage_options` capability

- `POST /wp-json/altolith/deploy/providers/cloudflare/deploy-worker`
  - Deploy Cloudflare Worker to your account
  - Requires `manage_options` capability

## License

GPL-3.0-or-later - see [LICENSE](LICENSE) file for details.

## Links

- [Altolith Deploy](https://github.com/aristath/altolith-deploy) - Parent plugin
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - Object storage
- [WordPress Playground](https://wordpress.github.io/wordpress-playground/) - WordPress WASM runtime
