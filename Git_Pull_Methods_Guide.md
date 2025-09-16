# Git Pull Methods Guide

## Overview
This document explains different methods to pull files from GitHub repositories, specifically focusing on pulling the Week03 folder from the `Kadee80/Dynamic_Web_F25_Graduate` repository.

## Method 1: Pull from Existing Repository (Recommended)

### When to Use
- You already have the repository cloned locally
- You want to update your local copy with the latest changes
- Most common and straightforward approach

### Steps
```bash
# 1. Navigate to your existing repository
cd /path/to/your/repository

# 2. Check current status
git status

# 3. Check remote configuration
git remote -v

# 4. Pull the latest changes
git pull origin main
```

### Example from Our Session
```bash
cd /Users/zac/Documents/Documents-it/GitHub/Dynamic_Web_F25_Graduate
git status
# Output: Your branch is behind 'origin/main' by 2 commits
git pull origin main
# Successfully pulled Week03 folder and other updates
```

## Method 2: Clone Entire Repository

### When to Use
- You don't have the repository yet
- You want a complete local copy
- You plan to work with the entire repository

### Steps
```bash
# 1. Navigate to your desired parent directory
cd /path/to/your/projects

# 2. Clone the repository
git clone https://github.com/username/repository-name.git

# 3. Navigate into the cloned repository
cd repository-name
```

### Example
```bash
cd /Users/zac/Documents/Documents-it/GitHub
git clone https://github.com/Kadee80/Dynamic_Web_F25_Graduate.git
cd Dynamic_Web_F25_Graduate
```

## Method 3: Sparse Checkout (Advanced)

### When to Use
- You only want specific folders/files
- You want to save disk space
- You don't need the entire repository history

### Steps
```bash
# 1. Clone with sparse checkout enabled
git clone --filter=blob:none --sparse https://github.com/username/repository-name.git

# 2. Navigate to the repository
cd repository-name

# 3. Configure sparse checkout
git sparse-checkout init --cone

# 4. Set specific folder to checkout
git sparse-checkout set Week03

# 5. Pull the specified content
git pull origin main
```

## Method 4: Download Individual Files

### When to Use
- You only need specific files
- You don't need git history
- Quick one-time download

### Steps
1. Go to the GitHub repository page
2. Navigate to the specific file
3. Click on the file
4. Click "Raw" button
5. Right-click and "Save As" or copy the content

## Common Git Commands Reference

### Repository Status
```bash
git status                    # Check current status
git log --oneline -5         # View recent commits
git branch -a                # List all branches
```

### Remote Management
```bash
git remote -v                # List remote repositories
git remote add origin URL    # Add remote repository
git remote remove origin     # Remove remote repository
```

### Pulling and Updating
```bash
git pull origin main         # Pull from main branch
git fetch origin             # Fetch without merging
git merge origin/main        # Merge fetched changes
```

### Troubleshooting
```bash
# If you get "already exists and is not an empty directory"
rm -rf repository-name       # Remove existing directory first

# If you get merge conflicts
git status                   # Check conflicted files
# Edit files to resolve conflicts
git add .                    # Stage resolved files
git commit -m "Resolve conflicts"
```

## What We Successfully Pulled

### Week03 Folder Contents
- `Week03/README.md` - Documentation and instructions
- `Week03/REFERENCE_src-recipe-card-complete/` - Complete reference implementation
  - Recipe card React components
  - CSS styling files
  - Image assets
  - Complete project structure

### Additional Updates
- New in-class exercise in Week01-02
- Recipe card project files
- Updated documentation

## Best Practices

1. **Always check status first**: `git status` before pulling
2. **Commit local changes**: Save your work before pulling
3. **Use descriptive commit messages**: When making changes
4. **Keep repositories updated**: Regular `git pull` to stay current
5. **Backup important work**: Before major operations

## File Locations

### Our Project Structure
```
/Users/zac/Documents/Documents-it/GitHub/
├── Dynamic_Web_F25_Graduate/          # Main class repository
│   ├── Week01-02/
│   ├── Week03/                        # ← Successfully pulled
│   └── ...
└── DynamicWebClassNotes/              # Your notes repository
    ├── hello-react/                   # Your React project
    └── Git_Pull_Methods_Guide.md      # This documentation
```

## Quick Reference Commands

```bash
# Check if you're behind
git status

# Pull latest changes
git pull origin main

# Check what was updated
git log --oneline -5

# List files in a directory
ls -la Week03/
```

---

*Created: September 16, 2024*  
*Repository: DynamicWebClassNotes*  
*Purpose: Document git pull methods for future reference*
