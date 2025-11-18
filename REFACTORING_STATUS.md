# Provider Architecture Refactoring - Status

## Date: 2025-11-18
## Status: IN PROGRESS (Foundation Complete)

---

## ✅ COMPLETED: Core Foundation

### 1. Parent Plugin (aether-site-exporter) - Core Changes

#### ✅ New Files Created:
- **`assets/src/constants/deploymentTypes.js`**
  - Defines `DEPLOYMENT_TYPES` constants: STATIC_SITE, BLUEPRINT_BUNDLE, EDGE_FUNCTIONS
  - Exports labels and descriptions for UI

#### ✅ Updated Files:

**`assets/src/providers/base/AbstractProvider.js`**
- ❌ REMOVED: CAP_STORAGE, CAP_EDGE, CAP_MEDIA, CAP_STATIC_SITE constants
- ❌ REMOVED: `capabilities` property
- ❌ REMOVED: `getCapabilities()` and `supportsCapability()` methods
- ✅ ADDED: `getSupportedDeploymentTypes()` - Providers override to declare what they support
- ✅ ADDED: `getDeploymentTypesWithFilter()` - Applies `aether.provider.supported_deployment_types` filter
- ✅ ADDED: `supportsDeploymentType(type)` - Check if deployment type supported
- ✅ ADDED: `getEnabledDeploymentTypes()` - Get enabled types from config
- ✅ ADDED: `isDeploymentTypeEnabled(type)` - Check if enabled in settings
- ✅ MODIFIED: `getConfigFields()` - Now auto-adds deployment_types field
- ✅ ADDED: `getProviderSpecificConfigFields()` - Providers override this instead
- ✅ MODIFIED: `getMetadata()` - Returns `supportedDeploymentTypes` instead of `capabilities`

**`assets/src/providers/utils/configFieldBuilder.js`**
- ✅ ADDED: `buildDeploymentTypesField(provider)` - Creates checkbox-group field for deployment types
- ✅ Automatically shows only types the provider supports
- ✅ Defaults all supported types to enabled

**`assets/src/providers/local-filesystem/LocalFilesystemProvider.js`**
- ❌ REMOVED: `capabilities = [CAP_STORAGE]`
- ❌ REMOVED: `export_types` field from getConfigFields()
- ❌ REMOVED: export_types sanitization
- ✅ ADDED: `getSupportedDeploymentTypes()` returns `[STATIC_SITE, BLUEPRINT_BUNDLE]`
- ✅ CHANGED: `getConfigFields()` → `getProviderSpecificConfigFields()`

**`assets/src/providers/registry/ProviderRegistry.js`**
- ❌ REMOVED: `getByCapability(capability)` method
- ✅ ADDED: `getByDeploymentType(deploymentType)` method

---

## ⏳ TODO: Critical Files to Update

### Parent Plugin (aether-site-exporter)

#### 1. Remove Old Capability Constants
**File**: `assets/src/constants/providers.js`
- Remove: `PROVIDER_TYPES`, `STORAGE_PROVIDERS`, `STATIC_SITE_PROVIDERS`
- Remove: `isStorageProvider()`, `isStaticSiteProvider()` helpers
- Can keep PROVIDER_IDS if still used

#### 2. Update Publish Workflow
**File**: `assets/src/publish/workflows/publishWorkflow.js`
- Remove: `filterWorkflowByExportTypes()` function
- Keep workflow as-is (all steps always run)

**File**: `assets/src/publish/hooks/usePublishController.js`
- Remove: export_types filtering logic
- Add: Function to get providers by deployment type:
  ```javascript
  const getProvidersForDeploymentType = (type) => {
    return ProviderRegistry.getInstance().getAllIds().filter(id => {
      const provider = ProviderRegistry.getInstance().get(id);
      return provider.supportsDeploymentType(type) &&
             provider.isDeploymentTypeEnabled(type);
    });
  };
  ```
- Update context:
  ```javascript
  const workflowContext = {
    staticSiteProviders: getProvidersForDeploymentType(DEPLOYMENT_TYPES.STATIC_SITE),
    blueprintBundleProviders: getProvidersForDeploymentType(DEPLOYMENT_TYPES.BLUEPRINT_BUNDLE),
    edgeFunctionProviders: getProvidersForDeploymentType(DEPLOYMENT_TYPES.EDGE_FUNCTIONS),
    registry: ProviderRegistry.getInstance(),
    // ... other context
  };
  ```

#### 3. Update Upload Steps
**File**: `assets/src/publish/steps/uploadStaticSiteFilesStep.js`
- Change from single `providerId` to array `staticSiteProviders`
- Upload to ALL providers in parallel:
  ```javascript
  const uploadPromises = staticSiteProviders.map(async (providerId) => {
    const provider = registry.get(providerId);
    try {
      await provider.uploadStaticSite(context.staticFiles);
      return { providerId, success: true };
    } catch (error) {
      return { providerId, success: false, error: error.message };
    }
  });
  const results = await Promise.allSettled(uploadPromises);
  ```

**File**: `assets/src/publish/steps/uploadSiteArchiveStep.js`
- Change from single `providerId` to array `blueprintBundleProviders`
- Upload to ALL providers in parallel (same pattern as above)

#### 4. Remove provider_types Settings
**File**: `includes/REST/SettingsController.php`
- Remove `provider_types` handling (storage, static_site, edge, media selection)
- Settings become: `{ providers: { 'provider-id': {deployment_types: [...], config: {...}} } }`

**File**: `assets/src/contexts/SettingsContext.js`
- Remove `provider_types` state
- Remove `setProviderType()` method
- Keep only `providers` config

#### 5. Update UI
**File**: `assets/src/admin-settings/ProviderSettings.js`
- Remove hardcoded `local-filesystem` selection
- Show ALL registered providers
- Render config form for each provider (deployment_types automatically included)
- Structure: List/accordion showing each provider with their settings

#### 6. Create Provider SDK Bundle
**New File**: `assets/src/provider-sdk/index.js`
```javascript
export { AbstractProvider } from '../providers/base/AbstractProvider';
export { ProviderRegistry } from '../providers/registry/ProviderRegistry';
export { ConfigFieldBuilder, buildDeploymentTypesField } from '../providers/utils/configFieldBuilder';
export { DEPLOYMENT_TYPES, DEPLOYMENT_TYPE_LABELS } from '../constants/deploymentTypes';
export { ProviderForm } from '../components/ProviderForm';
export { ProviderField } from '../components/ProviderField';
export { ProviderActions } from '../components/ProviderActions';
export { SecretField } from '../components/SecretField';
export { useProvider } from '../providers/hooks/useProvider';
export { useProviderConfig } from '../providers/hooks/useProviderConfig';
```

**File**: `webpack.config.js`
- Add entry: `'provider-sdk': './assets/src/provider-sdk/index.js'`
- Configure as UMD library: `library: { name: 'AetherProviderSDK', type: 'umd' }`

**File**: `includes/admin/Pages/SettingsPage.php`
- Enqueue provider-sdk.js with priority 5

---

### Providers Plugin (aether-site-exporter-providers)

#### 1. Update Specialized Abstractions
**File**: `assets/src/providers/git/AbstractGitProvider.js`
```javascript
const { AbstractProvider } = window.AetherProviderSDK;
export class AbstractGitProvider extends AbstractProvider {
  // ... git-specific methods
}
```

**File**: `assets/src/providers/aws/AbstractAWSProvider.js`
```javascript
const { AbstractProvider } = window.AetherProviderSDK;
export class AbstractAWSProvider extends AbstractProvider {
  // ... AWS S3-specific methods
}
```

#### 2. Remove Duplicated Core Files
Delete these files (use parent SDK instead):
- ❌ `assets/src/providers/base/AbstractProvider.js`
- ❌ `assets/src/providers/registry/ProviderRegistry.js`
- ❌ `assets/src/providers/utils/configFieldBuilder.js`
- ❌ `assets/src/components/ProviderForm.js`
- ❌ `assets/src/components/ProviderField.js`
- ❌ `assets/src/components/ProviderActions.js`
- ❌ `assets/src/components/SecretField.js`
- ❌ `assets/src/hooks/useProvider.js`
- ❌ `assets/src/hooks/useProviderConfig.js`

#### 3. Update All 4 Providers
**Pattern for each provider**:
```javascript
const { AbstractProvider, DEPLOYMENT_TYPES } = window.AetherProviderSDK;

export class ProviderClass extends AbstractProvider {
  static ID = 'provider-id';

  getSupportedDeploymentTypes() {
    return [DEPLOYMENT_TYPES.STATIC_SITE, DEPLOYMENT_TYPES.BLUEPRINT_BUNDLE];
  }

  getProviderSpecificConfigFields() {
    return [
      { id: 'field1', type: 'text', label: 'Field 1', ... },
      // ... other fields
    ];
  }
}
```

**Cloudflare Workers**: `getSupportedDeploymentTypes() { return [DEPLOYMENT_TYPES.EDGE_FUNCTIONS]; }`
**Cloudflare R2**: `getSupportedDeploymentTypes() { return [DEPLOYMENT_TYPES.STATIC_SITE, DEPLOYMENT_TYPES.BLUEPRINT_BUNDLE]; }`
**GitLab**: `getSupportedDeploymentTypes() { return [DEPLOYMENT_TYPES.STATIC_SITE, DEPLOYMENT_TYPES.BLUEPRINT_BUNDLE]; }`
**GitLab Pages**: `getSupportedDeploymentTypes() { return [DEPLOYMENT_TYPES.STATIC_SITE]; }`

#### 4. Update Webpack Externals
**File**: `webpack.config.js`
```javascript
externals: {
  'AetherProviderSDK': 'window.AetherProviderSDK',
  'react': 'React',
  '@wordpress/hooks': 'window.wp.hooks',
  '@wordpress/i18n': 'window.wp.i18n',
  // ... other externals
}
```

---

## 🎯 New Architecture Summary

### How It Works:

1. **Provider declares support** via `getSupportedDeploymentTypes()`
2. **UI automatically shows checkboxes** for supported types only
3. **User checks which types to use provider for** in settings
4. **During publish**: System finds all providers with each type enabled
5. **Parallel upload**: Each deployment type uploads to all enabled providers simultaneously

### Example User Flow:

1. **Local Filesystem Settings:**
   - Deployment Types: [✓] Static Site, [✓] Blueprint Bundle
   - Export Path: blueprint-bundle/bundle.zip
   - Static Files: static/

2. **Cloudflare R2 Settings:**
   - Deployment Types: [✓] Static Site, [✓] Blueprint Bundle
   - Account ID, Bucket, Credentials...

3. **GitLab Pages Settings:**
   - Deployment Types: [✓] Static Site
   - Project ID, Access Token...

4. **On Publish:**
   - Static Site → Uploads to Local Filesystem + Cloudflare R2 + GitLab Pages (3 providers in parallel)
   - Blueprint Bundle → Uploads to Local Filesystem + Cloudflare R2 (2 providers in parallel)

---

## 🔧 Key Hooks for Extensibility

### JavaScript Hooks:
```javascript
// Modify supported deployment types
addFilter('aether.provider.supported_deployment_types', 'plugin',
  (types, providerId, provider) => types);

// Modify config fields
addFilter('aether.provider.config_fields', 'plugin',
  (fields, providerId, provider) => fields);

// Modify provider metadata
addFilter('aether.provider.metadata', 'plugin',
  (metadata, providerId) => metadata);
```

---

## 📋 Testing Checklist

### Before Building:
- [ ] All files updated per TODO list
- [ ] No references to CAP_* constants remain
- [ ] No references to `capabilities` property
- [ ] No export_types logic in workflows

### After Building:
- [ ] Parent plugin builds successfully
- [ ] provider-sdk.js bundle created
- [ ] Providers plugin builds successfully
- [ ] No build errors or warnings

### Functional Testing:
- [ ] Activate both plugins - no errors
- [ ] Settings page shows all 5 providers
- [ ] Each provider shows deployment type checkboxes
- [ ] Local Filesystem shows: Static Site, Blueprint Bundle
- [ ] Can save provider settings
- [ ] Can enable multiple providers
- [ ] Publish workflow executes without errors
- [ ] Files upload to all enabled providers

---

## 💡 Next Steps

1. **Complete Parent Plugin Updates** (see TODO list above)
2. **Build Parent Plugin**: `cd aether-site-exporter && npm run build`
3. **Complete Providers Plugin Updates** (see TODO list above)
4. **Build Providers Plugin**: `cd aether-site-exporter-providers && npm run build`
5. **Test End-to-End**: Activate, configure, publish
6. **Document**: Update INTEGRATION.md with new architecture

---

*Generated: 2025-11-18 during Claude Code session*
