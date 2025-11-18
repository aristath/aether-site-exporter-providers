# Aether Site Exporter - Providers

Provider implementations (Cloudflare R2, Cloudflare Workers, GitLab, GitLab Pages) for [Aether Site Exporter](https://github.com/aristath/aether-site-exporter).

## 📋 Overview

This plugin extends Aether Site Exporter with deployment provider implementations, enabling you to deploy static sites to various cloud platforms.

### Included Providers

- **Cloudflare Workers** - Edge computing provider for deploying static sites to Cloudflare's global network
- **Cloudflare R2** - Object storage provider for static site hosting via Cloudflare R2
- **GitLab** - Git-based provider for pushing sites to GitLab repositories
- **GitLab Pages** - Static site hosting via GitLab Pages

## ⚙️ Requirements

- WordPress 6.4+
- PHP 7.4+ (PHP 8.1+ recommended)
- **Aether Site Exporter** plugin (required dependency)

## 📦 Installation

### From Source

1. **Install Aether Site Exporter** (required parent plugin)
   ```bash
   cd wp-content/plugins
   git clone https://github.com/aristath/aether-site-exporter.git
   cd aether-site-exporter
   composer install
   npm install
   npm run build
   ```

2. **Install This Plugin**
   ```bash
   cd wp-content/plugins
   git clone https://github.com/aristath/aether-site-exporter-providers.git
   cd aether-site-exporter-providers
   composer install
   npm install
   npm run build
   ```

3. **Activate Both Plugins**
   - Go to WordPress Admin → Plugins
   - Activate "Aether Site Exporter"
   - Activate "Aether Site Exporter - Providers"

## 🔧 Provider Configuration

### Cloudflare Workers

Deploy static sites to Cloudflare's global edge network.

**Requirements:**
- Cloudflare account
- API token with Workers permissions
- Account ID (found in Cloudflare dashboard)

**Configuration:**
1. Go to Settings → Aether Export
2. Select "Cloudflare Workers" as provider
3. Enter your Account ID and API Token
4. Test connection
5. Deploy your site

### Cloudflare R2

Deploy static sites to Cloudflare R2 object storage.

**Requirements:**
- Cloudflare account with R2 enabled
- R2 bucket created
- R2 API tokens (Access Key ID and Secret Access Key)
- Cloudflare Worker deployed for file uploads

**Configuration:**
1. Create an R2 bucket in Cloudflare dashboard
2. Generate R2 API tokens
3. Deploy the R2 upload worker (provided by this plugin)
4. Go to Settings → Aether Export
5. Select "Cloudflare R2" as provider
6. Enter your configuration details
7. Test connection
8. Deploy your site

### GitLab

Push your static site to a GitLab repository.

**Requirements:**
- GitLab account
- Personal Access Token with `api` and `write_repository` scopes
- Project ID of target repository

**Configuration:**
1. Create a GitLab Personal Access Token
2. Create or identify target repository
3. Go to Settings → Aether Export
4. Select "GitLab" as provider
5. Enter your Personal Access Token and Project ID
6. Test connection
7. Deploy your site

### GitLab Pages

Deploy static sites to GitLab Pages.

**Requirements:**
- GitLab account
- Personal Access Token with `api` and `write_repository` scopes
- Project ID of target repository
- GitLab Pages enabled for project

**Configuration:**
1. Create a GitLab Personal Access Token
2. Create repository with GitLab Pages enabled
3. Go to Settings → Aether Export
4. Select "GitLab Pages" as provider
5. Enter your configuration details
6. Test connection
7. Deploy your site

## 🛠 Development

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
aether-site-exporter-providers/
├── assets/
│   ├── src/
│   │   └── providers/
│   │       ├── cloudflare/           # Cloudflare Workers provider
│   │       ├── cloudflare-r2/        # R2 storage provider
│   │       ├── gitlab/               # GitLab git provider
│   │       ├── gitlab-pages/         # GitLab Pages provider
│   │       └── services/             # Shared services (EdgeService, etc.)
│   ├── workers/
│   │   └── CloudflareR2Worker.js    # R2 upload proxy worker
│   └── build/                        # Compiled assets (git-ignored)
├── includes/
│   ├── REST/
│   │   ├── RESTHelpersTrait.php
│   │   └── WorkerScriptController.php
│   ├── Plugin.php
│   └── autoloader.php
└── aether-site-exporter-providers.php
```

## 🔌 REST API Endpoints

This plugin adds the following REST API endpoints:

### Worker Scripts

- `GET /wp-json/aether/site-exporter/providers/worker-scripts/{type}`
  - Get Cloudflare Worker script content
  - Types: `r2` (Cloudflare R2 upload worker)
  - Requires `manage_options` capability

## 🏗 Architecture

### Provider Registration

Providers register themselves using WordPress hooks:

```javascript
import { addAction } from '@wordpress/hooks';

addAction( 'aether.providers.register', 'my-plugin', ( registry ) => {
    registry.register( 'my-provider-id', MyProviderClass );
} );
```

### Integration with Aether Site Exporter

This plugin depends on Aether Site Exporter for:

- **Provider Registry** - Auto-discovery system for providers
- **Provider Abstractions** - IProvider interface, AbstractProvider base class
- **REST API Infrastructure** - Provider config, status, and test endpoints
- **Encryption Utilities** - Secure storage of API keys and tokens
- **UI Components** - Provider configuration forms and UI

This plugin provides:

- **Concrete Provider Implementations** - 4 production-ready providers
- **Worker Scripts** - Cloudflare Workers for file uploads
- **Provider Services** - EdgeService, StorageService

## 📝 Adding Custom Providers

You can add custom providers by creating a separate plugin that:

1. Depends on `aether-site-exporter`
2. Implements the `IProvider` interface
3. Registers via `aether.providers.register` hook

Example:

```javascript
import { addAction } from '@wordpress/hooks';

class MyCustomProvider {
    getId() {
        return 'my-custom-provider';
    }

    getName() {
        return 'My Custom Provider';
    }

    getDescription() {
        return 'Deploy to my custom platform';
    }

    getCapabilities() {
        return ['static-site'];
    }

    // ... implement other required methods
}

addAction( 'aether.providers.register', 'my-plugin', ( registry ) => {
    registry.register( 'my-custom-provider', MyCustomProvider );
} );
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run code quality checks:
   ```bash
   npm run lint:js:fix
   composer fix-cs
   composer phpstan
   ```
4. Commit your changes
5. Push to the branch
6. Open a Pull Request

## 📄 License

GPL-3.0-or-later - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Aether Site Exporter](https://github.com/aristath/aether-site-exporter) - Parent plugin
- [WordPress Playground](https://wordpress.github.io/wordpress-playground/) - WordPress WASM runtime
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge computing platform
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - Object storage
- [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) - Static site hosting

## 📧 Support

For issues and questions:
- [GitHub Issues](https://github.com/aristath/aether-site-exporter-providers/issues)
- [Parent Plugin Issues](https://github.com/aristath/aether-site-exporter/issues)
