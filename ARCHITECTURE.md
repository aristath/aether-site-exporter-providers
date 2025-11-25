# Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    WordPress Installation                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           aether-site-exporter (Parent Plugin)            │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                             │  │
│  │  📦 Provider SDK (window.AetherProviderSDK)                │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │ • AbstractProvider                                   │  │  │
│  │  │ • ProviderRegistry                                   │  │  │
│  │  │ • ConfigFieldBuilder                                 │  │  │
│  │  │ • DEPLOYMENT_TYPES constants                         │  │  │
│  │  │ • React components (ProviderForm, ProviderField)     │  │  │
│  │  │ • React hooks (useProvider, useProviderConfig)       │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                             │  │
│  │  🏠 Built-in Provider:                                     │  │
│  │  └─ LocalFilesystem (fallback)                            │  │
│  │     └─ Supports: Static Site, Blueprint Bundle            │  │
│  │                                                             │  │
│  │  ⚙️ Publish Workflow:                                      │  │
│  │  └─ Multi-provider parallel upload system                 │  │
│  │                                                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          ↓                                       │
│                   (Exposes SDK via window)                       │
│                          ↓                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │      aether-site-exporter-providers (Providers Plugin)    │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                             │  │
│  │  Imports: window.AetherProviderSDK                         │  │
│  │                                                             │  │
│  │  🔧 Abstract Providers:                                    │  │
│  │  ├─ AbstractGitProvider                                    │  │
│  │  │  └─ Supports: Static Site, Blueprint Bundle            │  │
│  │  └─ AbstractAWSProvider                                    │  │
│  │     └─ Supports: Static Site, Blueprint Bundle            │  │
│  │                                                             │  │
│  │  🌐 Concrete Providers:                                    │  │
│  │  ├─ CloudflareWorkersProvider                             │  │
│  │  │  └─ Supports: Edge Functions                           │  │
│  │  ├─ CloudflareR2Provider (extends AbstractAWSProvider)    │  │
│  │  │  └─ Supports: Static Site, Blueprint Bundle            │  │
│  │  ├─ GitLabProvider (extends AbstractGitProvider)          │  │
│  │  │  └─ Supports: Static Site, Blueprint Bundle            │  │
│  │  └─ GitLabPagesProvider (extends GitLabProvider)          │  │
│  │     └─ Supports: Static Site only                         │  │
│  │                                                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          ↓                                       │
│                (Providers register via SDK)                      │
│                          ↓                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Third-Party Provider Plugins                  │  │
│  │              (Can extend via SDK)                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Provider Registration

```
Plugin Activation
    ↓
Load provider-sdk.js (parent plugin)
    ↓
window.AetherProviderSDK available
    ↓
Load provider-*.js files (providers plugin)
    ↓
Each provider:
  - Imports SDK: const { AbstractProvider } = window.AetherProviderSDK
  - Extends AbstractProvider
  - Calls: ProviderRegistry.getInstance().register('id', ProviderClass)
    ↓
Providers registered and available
```

### 2. Settings UI Flow

```
User navigates to Settings → Aether
    ↓
ProviderSettings.js loads
    ↓
Gets all providers: ProviderRegistry.getInstance().getAllIds()
    ↓
For each provider:
  - Get metadata: provider.getMetadata()
  - Get supported types: provider.getSupportedDeploymentTypes()
  - Get config fields: provider.getConfigFields()
    ↓
Renders UI:
  - Provider name and icon
  - Deployment type badges (supported types)
  - Deployment type checkboxes
  - Provider-specific config fields
    ↓
User configures and saves
    ↓
Settings stored in wp_options:
  {
    "providers": {
      "provider-id": {
        "deployment_types": ["static_site", "blueprint_bundle"],
        "api_key": "...",
        "...": "..."
      }
    }
  }
```

### 3. Publish Workflow

```
User clicks "Publish" button
    ↓
usePublishController.js → startPublish()
    ↓
For each deployment type:
  - getProvidersForDeploymentType(DEPLOYMENT_TYPES.STATIC_SITE)
    Filters: supportsDeploymentType() && isDeploymentTypeEnabled()
    Returns: ['cloudflare-r2', 'gitlab-pages']
    ↓
  - getProvidersForDeploymentType(DEPLOYMENT_TYPES.BLUEPRINT_BUNDLE)
    Returns: ['cloudflare-r2', 'local-filesystem']
    ↓
Build workflow context:
  {
    staticSiteProviders: ['cloudflare-r2', 'gitlab-pages'],
    blueprintBundleProviders: ['cloudflare-r2', 'local-filesystem'],
    edgeFunctionProviders: []
  }
    ↓
Execute workflow phases:
  1. discoverAssets
  2. getStaticSiteUrls
  3. createSiteArchive
  4. generateBlueprint
  5. uploadStaticSiteFiles + uploadSiteArchive (parallel)
    ↓
uploadStaticSiteFilesStep:
  - Receives: staticSiteProviders array
  - For each provider ID:
    - processStaticSiteUrls(urls, staticSiteUrl, providerId, ...)
  - Uses Promise.allSettled() for parallel execution
  - Aggregates results: {successCount: 2, failureCount: 0}
    ↓
uploadSiteArchiveStep:
  - Receives: blueprintBundleProviders array
  - For each provider ID:
    - handleSiteArchiveUpload(providerId, context)
  - Uses Promise.allSettled() for parallel execution
  - Aggregates results: {successCount: 2, failureCount: 0}
    ↓
Display results:
  ✓ "Uploaded static site to 2/2 providers"
  ✓ "Uploaded blueprint bundle to 2/2 providers"
```

---

## Class Hierarchy

```
AbstractProvider (from SDK)
│
├─ LocalFilesystemProvider (parent plugin)
│  └─ deployment_types: [STATIC_SITE, BLUEPRINT_BUNDLE]
│
├─ AbstractGitProvider (providers plugin)
│  ├─ deployment_types: [STATIC_SITE, BLUEPRINT_BUNDLE]
│  │
│  ├─ GitLabProvider
│  │  └─ deployment_types: [STATIC_SITE, BLUEPRINT_BUNDLE] (inherited)
│  │
│  └─ GitLabPagesProvider (extends GitLabProvider)
│     └─ deployment_types: [STATIC_SITE] (overridden)
│
├─ AbstractAWSProvider (providers plugin)
│  ├─ deployment_types: [STATIC_SITE, BLUEPRINT_BUNDLE]
│  │
│  └─ CloudflareR2Provider
│     └─ deployment_types: [STATIC_SITE, BLUEPRINT_BUNDLE] (inherited)
│
└─ CloudflareWorkersProvider (direct extension)
   └─ deployment_types: [EDGE_FUNCTIONS]
```

---

## Configuration Flow

### Provider Config Structure

```javascript
// Stored in WordPress options
{
  "providers": {
    "cloudflare-r2": {
      // Auto-added by AbstractProvider.getConfigFields()
      "deployment_types": ["static_site", "blueprint_bundle"],

      // From AbstractAWSProvider.getProviderSpecificConfigFields()
      "access_key_id": "...",
      "secret_access_key": "...",
      "bucket_name": "my-bucket",
      "region": "auto",

      // From CloudflareR2Provider.getProviderSpecificConfigFields()
      "cloudflare_account_id": "...",
      "worker_endpoint": "https://...",
      "public_url": "https://cdn.example.com"
    },
    "gitlab-pages": {
      "deployment_types": ["static_site"],

      // From AbstractGitProvider
      "personal_access_token": "...",
      "branch": "main",

      // From GitLabProvider
      "project_id": "12345",
      "namespace": "myusername",

      // From GitLabPagesProvider
      "pages_enabled": true,
      "pages_url": "https://myusername.gitlab.io/myproject"
    }
  }
}
```

### Field Generation Process

```
provider.getConfigFields() called
    ↓
AbstractProvider.getConfigFields():
  1. Gets supported types: provider.getSupportedDeploymentTypes()
     → ["static_site", "blueprint_bundle"]

  2. Builds deployment_types field:
     buildDeploymentTypesField(provider)
     → Checkbox group with all supported types

  3. Gets provider fields: provider.getProviderSpecificConfigFields()
     → Calls down the inheritance chain:
       - CloudflareR2Provider.getProviderSpecificConfigFields()
         → super.getProviderSpecificConfigFields()
           → AbstractAWSProvider.getProviderSpecificConfigFields()
             → Returns base S3 fields
         → Adds CloudflareR2-specific fields
         → Returns [...baseFields, ...r2Fields]

  4. Applies filter: 'aether.provider.config_fields'

  5. Returns: [deploymentTypesField, ...providerFields]
```

---

## Deployment Type Decision Matrix

### When Upload Steps Execute

```
╔══════════════════════╦═══════════════════╦═══════════════════════╗
║   Deployment Type    ║   Upload Step     ║   Providers Used      ║
╠══════════════════════╬═══════════════════╬═══════════════════════╣
║ STATIC_SITE          ║ uploadStatic-     ║ Providers where:      ║
║                      ║ SiteFilesStep     ║ • supports(           ║
║                      ║                   ║     STATIC_SITE)      ║
║                      ║                   ║ • enabled(            ║
║                      ║                   ║     STATIC_SITE)      ║
╠══════════════════════╬═══════════════════╬═══════════════════════╣
║ BLUEPRINT_BUNDLE     ║ uploadSite-       ║ Providers where:      ║
║                      ║ ArchiveStep       ║ • supports(           ║
║                      ║                   ║     BLUEPRINT_BUNDLE) ║
║                      ║                   ║ • enabled(            ║
║                      ║                   ║     BLUEPRINT_BUNDLE) ║
╠══════════════════════╬═══════════════════╬═══════════════════════╣
║ EDGE_FUNCTIONS       ║ (Future)          ║ Providers where:      ║
║                      ║ deployEdge-       ║ • supports(           ║
║                      ║ FunctionsStep     ║     EDGE_FUNCTIONS)   ║
║                      ║                   ║ • enabled(            ║
║                      ║                   ║     EDGE_FUNCTIONS)   ║
╚══════════════════════╩═══════════════════╩═══════════════════════╝
```

### Example Scenario

**User Configuration:**
- Cloudflare R2: ☑ Static Site, ☑ Blueprint Bundle
- GitLab Pages: ☑ Static Site
- LocalFilesystem: ☑ Blueprint Bundle
- Cloudflare Workers: (not configured)

**Publish Execution:**

```
discoverAssets → runs
getStaticSiteUrls → runs
createSiteArchive → runs
generateBlueprint → runs

uploadStaticSiteFiles:
  ├─ Upload to Cloudflare R2 (parallel)
  └─ Upload to GitLab Pages (parallel)
  Result: "Uploaded to 2/2 providers"

uploadSiteArchive:
  ├─ Upload to Cloudflare R2 (parallel)
  └─ Upload to LocalFilesystem (parallel)
  Result: "Uploaded to 2/2 providers"

Complete!
```

---

## Error Handling Strategy

### Provider-Level Errors

```javascript
// In upload step
const uploadPromises = providers.map(async (providerId) => {
  try {
    await uploadToProvider(providerId);
    return { providerId, success: true };
  } catch (error) {
    // Error caught per-provider
    return { providerId, success: false, error: error.message };
  }
});

const results = await Promise.allSettled(uploadPromises);

// Analyze results
const successes = results.filter(r => r.value?.success);
const failures = results.filter(r => !r.value?.success);

if (failures.length === providers.length) {
  // ALL providers failed → throw error (publish fails)
  throw new Error('Failed to upload to any provider');
}

if (failures.length > 0) {
  // SOME providers failed → show warning (publish succeeds)
  setStatusMessage(
    `Uploaded to ${successes.length}/${providers.length} providers`,
    'warning'
  );
}

// Continue workflow
```

### Step-Level Errors

```javascript
// In workflow executor
try {
  await executeStep('uploadStaticSiteFiles', context);
} catch (error) {
  // Step failed completely → stop workflow
  showError(`Step failed: ${error.message}`);
  setIsPublishing(false);
}
```

---

## Performance Characteristics

### Serial vs Parallel Upload

**Old (Serial):**
```
Upload to Provider 1 (5s)
  → Upload to Provider 2 (5s)
    → Upload to Provider 3 (5s)
Total: 15 seconds
```

**New (Parallel):**
```
Upload to Provider 1 (5s) ┐
Upload to Provider 2 (5s) ├─ All execute simultaneously
Upload to Provider 3 (5s) ┘
Total: 5 seconds
```

### Registry Caching

```javascript
// Provider instances cached in registry
const registry = ProviderRegistry.getInstance(); // Singleton

// First call: instantiates
const provider1 = registry.get('cloudflare-r2'); // new CloudflareR2Provider()

// Subsequent calls: cached
const provider2 = registry.get('cloudflare-r2'); // Returns same instance

// provider1 === provider2 → true
```

---

## Security Considerations

### Credential Storage

1. **PHP Side:**
   - Sensitive fields marked with `.sensitive()`
   - Encrypted in database using WordPress encryption
   - Decrypted only when needed

2. **JavaScript Side:**
   - Sensitive values not stored in localStorage
   - Transmitted via REST API with nonce validation
   - Never logged to console in production

### Provider Validation

1. **Registration:**
   - Providers must extend AbstractProvider
   - Invalid providers rejected

2. **Configuration:**
   - Fields validated using ConfigFieldBuilder rules
   - Pattern matching, min/max, required checks
   - Sanitization before storage

3. **Execution:**
   - Permission checks before publish
   - CSRF protection via nonces
   - Rate limiting on API endpoints

---

## Extension Points

### For Third-Party Developers

**1. Custom Deployment Types:**
```javascript
// Future: Add new deployment type
DEPLOYMENT_TYPES.DATABASE_SYNC = 'database_sync';

export class MySQLProvider extends AbstractProvider {
  getSupportedDeploymentTypes() {
    return [DEPLOYMENT_TYPES.DATABASE_SYNC];
  }
}
```

**2. Custom Upload Strategies:**
```javascript
export class FTPProvider extends AbstractProvider {
  getUploadStrategy() {
    return 'ftp'; // Custom strategy
  }

  async uploadFile(sourcePath, destPath) {
    // FTP upload logic
  }
}
```

**3. Workflow Hooks:**
```javascript
// Add custom step to workflow
import { addFilter } from '@wordpress/hooks';

addFilter('aether.publish.workflow.steps', 'my-plugin', (workflow) => {
  // Add custom step
  return [...workflow, [['myCustomStep', 10]]];
});
```

**4. Provider Filters:**
```javascript
// Modify provider before registration
addFilter('aether.provider.register', 'my-plugin', (provider, id) => {
  // Enhance provider
  return enhancedProvider;
});
```

---

## Future Enhancements

### Planned Features

1. **Conditional Deployment:**
   - Deploy different content to different providers
   - Environment-based provider selection (dev/staging/prod)

2. **Deployment Scheduling:**
   - Schedule deployments for specific times
   - Automatic deployments on content update

3. **Rollback Support:**
   - Track deployment versions
   - One-click rollback to previous version

4. **Analytics Integration:**
   - Track deployment success rates
   - Monitor upload performance
   - Provider reliability metrics

5. **Provider Marketplace:**
   - Browse available providers
   - One-click installation
   - Ratings and reviews

---

*Architecture documented: November 18, 2025*
