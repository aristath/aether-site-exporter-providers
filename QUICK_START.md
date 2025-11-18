# Quick Start Guide - New Deployment Types Architecture

## For Users

### Activating the Plugins

1. **Activate parent plugin first:**
   - Go to Plugins → Activate "Aether Site Exporter"
   - This loads the Provider SDK

2. **Activate providers plugin:**
   - Go to Plugins → Activate "Aether Site Exporter Providers"
   - This registers Cloudflare, GitLab, and other providers

### Configuring Providers

1. **Go to Settings → Aether**
2. **You'll see all registered providers with cards:**
   - LocalFilesystem
   - Cloudflare Workers
   - Cloudflare R2
   - GitLab
   - GitLab Pages

3. **Each provider shows:**
   - ✓ Name and description
   - ✓ Supported deployment types (badges)
   - ✓ Checkboxes to enable deployment types
   - ✓ Provider-specific configuration fields

4. **Example: Configuring Cloudflare R2**
   - Check: ☑ Static Site
   - Check: ☑ Blueprint Bundle
   - Fill in: Access Key ID
   - Fill in: Secret Access Key
   - Fill in: Bucket Name
   - Save

### Publishing

1. **Click "Publish" button**
2. **Workflow runs:**
   - Discovers assets
   - Generates static site and/or blueprint bundle
   - Uploads to **ALL** enabled providers in parallel
3. **Results show:**
   - "Uploaded to 3/3 providers" (success)
   - "Uploaded to 2/3 providers" (partial success - warning)
   - "Failed to upload to any provider" (error)

---

## For Developers - Creating Custom Providers

### 1. Basic Provider Structure

```javascript
// my-custom-provider.js
const { AbstractProvider, DEPLOYMENT_TYPES, ConfigFieldBuilder } =
  window.AetherProviderSDK || {};

export class MyCustomProvider extends AbstractProvider {
  static ID = 'my-custom-provider';

  getId() {
    return MyCustomProvider.ID;
  }

  getName() {
    return 'My Custom Provider';
  }

  getDescription() {
    return 'Description of my custom provider';
  }

  getType() {
    return 'cloud-storage'; // or 'git-hosting', 'edge-computing', etc.
  }

  getIcon() {
    return '🚀';
  }

  // Declare what this provider can do
  getSupportedDeploymentTypes() {
    return [
      DEPLOYMENT_TYPES.STATIC_SITE,
      DEPLOYMENT_TYPES.BLUEPRINT_BUNDLE,
    ];
  }

  // Configure provider settings
  getProviderSpecificConfigFields() {
    return ConfigFieldBuilder.buildAll([
      ConfigFieldBuilder.text('api_key')
        .label('API Key')
        .required()
        .sensitive(),

      ConfigFieldBuilder.url('endpoint')
        .label('Endpoint URL')
        .required(),
    ]);
  }

  // Implement upload method
  async uploadFile(sourcePath, destinationPath) {
    const config = await this.getConfig();
    // Your upload logic here
    return {
      success: true,
      url: `https://my-cdn.com/${destinationPath}`,
    };
  }

  // Implement test connection
  async testConnection() {
    const config = await this.getConfig();
    // Test your API connection
    return {
      success: true,
      message: 'Connection successful',
    };
  }
}
```

### 2. Extending Existing Abstract Providers

**For Git-based providers:**

```javascript
const { DEPLOYMENT_TYPES } = window.AetherProviderSDK || {};
import { AbstractGitProvider } from '../git/AbstractGitProvider';

export class MyGitProvider extends AbstractGitProvider {
  static ID = 'my-git-provider';

  getBaseName() {
    return 'My Git Provider';
  }

  getApiBaseUrl() {
    return 'https://api.mygitprovider.com';
  }

  async getGitRepositoryUrl() {
    const config = await this.getConfig();
    return `https://mygitprovider.com/${config.username}/${config.repo}.git`;
  }

  async testConnection() {
    // Test your Git API
  }

  // Inherits getSupportedDeploymentTypes() from AbstractGitProvider
  // (BLUEPRINT_BUNDLE + STATIC_SITE)
}
```

**For S3-compatible storage:**

```javascript
import { AbstractAWSProvider } from '../aws/AbstractAWSProvider';

export class MyS3Provider extends AbstractAWSProvider {
  static ID = 'my-s3-provider';

  getName() {
    return 'My S3 Storage';
  }

  async getStorageEndpoint() {
    return 'https://s3.my-provider.com';
  }

  async getStorageServiceConfig() {
    const config = await this.getConfig();
    return {
      bucket_name: config.bucket_name,
      access_key_id: config.access_key_id,
      secret_access_key: config.secret_access_key,
      region: config.region || 'auto',
    };
  }

  // Inherits getSupportedDeploymentTypes() from AbstractAWSProvider
  // (BLUEPRINT_BUNDLE + STATIC_SITE)
}
```

### 3. Registering Your Provider

**Create WordPress plugin:**

```php
<?php
/**
 * Plugin Name: My Custom Provider
 * Description: Custom provider for Aether Site Exporter
 * Requires Plugins: aether-site-exporter
 */

add_action('wp_enqueue_scripts', function() {
  if (is_admin()) {
    wp_enqueue_script(
      'my-custom-provider',
      plugin_dir_url(__FILE__) . 'build/my-custom-provider.js',
      ['aether-provider-sdk'], // Depends on parent SDK
      '1.0.0',
      true
    );
  }
});
```

**Register via JavaScript:**

```javascript
// In your build/my-custom-provider.js
import { MyCustomProvider } from './MyCustomProvider';

const { ProviderRegistry } = window.AetherProviderSDK || {};

// Register your provider
if (ProviderRegistry) {
  const registry = ProviderRegistry.getInstance();
  registry.register('my-custom-provider', MyCustomProvider);
}
```

### 4. Deployment Type Reference

**Available deployment types:**

```javascript
DEPLOYMENT_TYPES.STATIC_SITE        // 'static_site'
DEPLOYMENT_TYPES.BLUEPRINT_BUNDLE   // 'blueprint_bundle'
DEPLOYMENT_TYPES.EDGE_FUNCTIONS     // 'edge_functions'
```

**When to use each:**

- **STATIC_SITE**: Provider can host static HTML/CSS/JS files
  - Examples: Cloudflare R2, GitLab Pages, Netlify, Vercel

- **BLUEPRINT_BUNDLE**: Provider can store blueprint-bundle.zip (WordPress Playground)
  - Examples: Any S3-compatible storage, Git repositories, local filesystem

- **EDGE_FUNCTIONS**: Provider can deploy serverless edge functions
  - Examples: Cloudflare Workers, AWS Lambda@Edge, Vercel Edge Functions

### 5. Config Field Builder API

**Available field types:**

```javascript
ConfigFieldBuilder.text('field_id')
ConfigFieldBuilder.password('field_id')
ConfigFieldBuilder.url('field_id')
ConfigFieldBuilder.email('field_id')
ConfigFieldBuilder.number('field_id')
ConfigFieldBuilder.checkbox('field_id')
ConfigFieldBuilder.select('field_id', options)
```

**Common modifiers:**

```javascript
.label('Field Label')
.description('Help text for user')
.required()                    // Mark as required
.sensitive()                   // Mask value in UI
.default('default value')      // Default value
.min(10)                       // Minimum value/length
.max(100)                      // Maximum value/length
.pattern('^[a-z]+$', 'Error')  // Regex validation
```

**Example:**

```javascript
ConfigFieldBuilder.text('api_token')
  .label('API Token')
  .description('Your API token from the dashboard')
  .required()
  .sensitive()
  .min(20)
  .max(100)
  .pattern('^[A-Za-z0-9_-]+$', 'Token must be alphanumeric')
```

---

## Architecture Overview

### Provider Lifecycle

1. **Discovery:** ProviderRegistry.getInstance().getAllIds()
2. **Instantiation:** registry.get('provider-id')
3. **Configuration:** provider.getConfigFields() (shows in UI)
4. **Validation:** provider.testConnection()
5. **Execution:** provider.uploadFile() or custom methods
6. **Cleanup:** Provider instance cached for reuse

### Upload Workflow

```
User clicks "Publish"
  ↓
Workflow queries providers by deployment type
  ↓
For STATIC_SITE:
  - Get all providers where:
    - supportsDeploymentType('static_site') = true
    - isDeploymentTypeEnabled('static_site') = true
  ↓
Upload to ALL providers in PARALLEL
  ↓
Aggregate results:
  - Success if ANY provider succeeded
  - Warning if SOME providers failed
  - Error if ALL providers failed
```

### Multi-Provider Example

```javascript
// User has enabled:
// - Cloudflare R2: [✓ static_site, ✓ blueprint_bundle]
// - GitLab Pages: [✓ static_site]
// - LocalFilesystem: [✓ blueprint_bundle]

// When user clicks Publish:

// Static site uploads to:
//   - Cloudflare R2 (parallel)
//   - GitLab Pages (parallel)
// → Result: "Uploaded static site to 2/2 providers"

// Blueprint bundle uploads to:
//   - Cloudflare R2 (parallel)
//   - LocalFilesystem (parallel)
// → Result: "Uploaded blueprint bundle to 2/2 providers"
```

---

## Testing Your Custom Provider

### 1. Basic Tests

```javascript
// In browser console after loading your provider

const registry = window.AetherProviderSDK.ProviderRegistry.getInstance();

// Check if registered
console.log(registry.getAllIds()); // Should include 'my-custom-provider'

// Get instance
const provider = registry.get('my-custom-provider');

// Check metadata
console.log(provider.getName());
console.log(provider.getSupportedDeploymentTypes());
console.log(provider.getConfigFields());

// Test methods
await provider.testConnection();
```

### 2. Integration Tests

1. Configure your provider in Settings
2. Enable deployment types
3. Click Publish
4. Check browser console for:
   - Provider discovery logs
   - Upload progress
   - Success/error messages

### 3. Debugging Tips

**Enable debug logging:**

```javascript
// In browser console
localStorage.setItem('aether:debug', 'true');
```

**Check provider registration:**

```javascript
const registry = window.AetherProviderSDK.ProviderRegistry.getInstance();
console.log('Registered providers:', registry.getAllIds());
console.log('Provider count:', registry.count());
```

**Verify SDK loaded:**

```javascript
console.log('SDK loaded:', !!window.AetherProviderSDK);
console.log('SDK exports:', Object.keys(window.AetherProviderSDK || {}));
```

---

## Common Patterns

### Pattern 1: Override Deployment Types

```javascript
// Parent supports multiple, child restricts to one
export class GitLabPagesProvider extends GitLabProvider {
  getSupportedDeploymentTypes() {
    return [DEPLOYMENT_TYPES.STATIC_SITE]; // Only static sites
  }
}
```

### Pattern 2: Add Custom Fields

```javascript
export class MyProvider extends AbstractAWSProvider {
  getProviderSpecificConfigFields() {
    const baseFields = super.getProviderSpecificConfigFields();

    const customFields = ConfigFieldBuilder.buildAll([
      ConfigFieldBuilder.checkbox('enable_caching')
        .label('Enable CDN Caching')
        .default(true),
    ]);

    return [...baseFields, ...customFields];
  }
}
```

### Pattern 3: Custom Upload Strategy

```javascript
export class MyProvider extends AbstractProvider {
  getUploadStrategy() {
    return 'custom'; // or 'git', 'storage', 'direct'
  }

  async uploadFile(sourcePath, destinationPath) {
    // Custom upload logic
    const config = await this.getConfig();

    // Read file
    const fileData = await this.readFile(sourcePath);

    // Upload via your API
    const response = await fetch(`${config.endpoint}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.api_token}`,
      },
      body: fileData,
    });

    return {
      success: response.ok,
      url: await response.text(),
    };
  }
}
```

---

## Troubleshooting

### Issue: "window.AetherProviderSDK is undefined"

**Cause:** Parent plugin not loaded or SDK script not enqueued

**Solution:**
1. Ensure parent plugin is activated first
2. Check that `aether-provider-sdk` is in your script dependencies:
```php
wp_enqueue_script(
  'my-provider',
  plugin_dir_url(__FILE__) . 'build/my-provider.js',
  ['aether-provider-sdk'], // ← Add this dependency
  '1.0.0',
  true
);
```

### Issue: "Provider not appearing in settings"

**Cause:** Provider not registered or registered too late

**Solution:**
1. Register after DOM ready:
```javascript
window.addEventListener('DOMContentLoaded', () => {
  const registry = window.AetherProviderSDK.ProviderRegistry.getInstance();
  registry.register('my-provider', MyProvider);
});
```

2. Or use WordPress hook:
```javascript
wp.domReady(() => {
  // Register here
});
```

### Issue: "Deployment type checkboxes not showing"

**Cause:** `getSupportedDeploymentTypes()` returns empty array

**Solution:**
```javascript
getSupportedDeploymentTypes() {
  return [
    DEPLOYMENT_TYPES.STATIC_SITE,
    // Add at least one deployment type
  ];
}
```

---

## Resources

- **Parent Plugin:** `/wp-content/plugins/aether-site-exporter/`
- **Provider SDK:** `/wp-content/plugins/aether-site-exporter/assets/src/provider-sdk/`
- **Example Providers:** `/wp-content/plugins/aether-site-exporter-providers/assets/src/providers/`
- **Documentation:** `REFACTORING_COMPLETE.md`

---

*Last updated: November 18, 2025*
