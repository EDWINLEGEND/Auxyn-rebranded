# Utility Scripts

This folder contains development and maintenance scripts for the Auxyn project.

## Scripts

### `download-images.js`
Downloads and processes images for the application from external sources.

**Usage:**
```bash
node scripts/download-images.js
```

### `fix-images.js`
Fixes and optimizes images in the project, ensuring proper formatting and compression.

**Requirements:**
- Install canvas dependency: `npm install canvas`

**Usage:**
```bash
node scripts/fix-images.js
```

### `untrack-cache-files.js`
Utility to untrack cache files from Git to keep the repository clean.

**Usage:**
```bash
node scripts/untrack-cache-files.js
```

## Running Scripts

All scripts should be run from the project root directory:

```bash
# From project root
node scripts/script-name.js
```

## Dependencies

Some scripts may require additional dependencies. Install them as needed:

```bash
npm install canvas  # For image processing scripts
``` 