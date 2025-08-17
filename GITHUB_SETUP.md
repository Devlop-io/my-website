# GitHub Automation Setup Guide

This guide explains how to set up GitHub automation for the admin panel's "Publish Changes" feature.

## Overview

The admin panel now includes a "Publish Changes" button that automatically commits and pushes changes to GitHub. This allows you to edit content through the admin interface and have those changes immediately reflected on your live website.

## Prerequisites

1. **Git Repository**: Your project must be a Git repository connected to GitHub
2. **Git Configuration**: Git must be properly configured with your credentials
3. **GitHub Access**: You need push access to the repository

## Setup Steps

### 1. Initialize Git Repository (if not already done)

```bash
cd /path/to/your/my-website
git init
git remote add origin https://github.com/yourusername/your-repo-name.git
```

### 2. Configure Git Credentials

#### Option A: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` scope
3. Configure Git to use the token:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git config --global credential.helper store
```

When prompted for password, use your personal access token instead of your GitHub password.

#### Option B: SSH Keys

1. Generate SSH key if you don't have one:
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

2. Add SSH key to GitHub:
   - Copy the public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Paste the key and save

3. Change remote URL to SSH:
```bash
git remote set-url origin git@github.com:yourusername/your-repo-name.git
```

### 3. Test Git Configuration

```bash
# Test that you can push to GitHub
echo "test" > test.txt
git add test.txt
git commit -m "Test commit"
git push origin main
rm test.txt
git add test.txt
git commit -m "Remove test file"
git push origin main
```

### 4. Environment Variables (Optional)

For production deployments, you might want to set environment variables:

```bash
# Add to your .env file or deployment environment
GIT_USER_NAME="Your Name"
GIT_USER_EMAIL="your-email@example.com"
GIT_REMOTE_URL="https://github.com/yourusername/your-repo-name.git"
```

## How It Works

### Admin Panel Flow

1. **Edit Content**: Click any "Edit" button in the admin panel
2. **Make Changes**: Use the text editor to modify markdown files
3. **Save Changes**: Click "Save" to store changes locally
4. **Publish to GitHub**: Click "Publish Changes" in the header
5. **Automated Process**:
   - Git adds all changes
   - Creates a commit with your message
   - Pushes to GitHub main branch

### API Endpoints

The system uses these new endpoints:

- `GET /api/content/:filename` - Read markdown file content
- `POST /api/content/:filename` - Save markdown file content
- `POST /api/publish` - Commit and push changes to GitHub

### Code Implementation

The GitHub sync is implemented in `server/routes.ts`:

```typescript
app.post('/api/publish', async (req, res) => {
  try {
    const { message = "Update content via admin panel" } = req.body;
    
    // Add all changes to git
    await execAsync('git add .');
    
    // Commit changes
    await execAsync(`git commit -m "${message}"`);
    
    // Push to GitHub
    await execAsync('git push origin main');
    
    res.json({ message: "Changes published successfully to GitHub" });
  } catch (error) {
    console.error("Error publishing to GitHub:", error);
    res.status(500).json({ message: "Failed to publish changes" });
  }
});
```

## Security Considerations

### 1. Authentication
- The admin panel uses a simple password system
- Consider implementing proper authentication for production
- Use environment variables for sensitive data

### 2. Git Security
- Use personal access tokens with minimal required permissions
- Regularly rotate access tokens
- Consider using GitHub Apps for more granular permissions

### 3. File Permissions
- Ensure the server process has write permissions to the content directory
- Validate file paths to prevent directory traversal attacks

## Troubleshooting

### Common Issues

1. **"Failed to publish changes"**
   - Check Git credentials are properly configured
   - Verify you have push access to the repository
   - Check network connectivity to GitHub

2. **"Permission denied"**
   - Ensure the server process has write permissions
   - Check Git user configuration
   - Verify SSH keys or tokens are valid

3. **"Repository not found"**
   - Check the remote URL is correct
   - Verify the repository exists and is accessible

### Debug Commands

```bash
# Check Git status
git status

# Check remote configuration
git remote -v

# Test Git authentication
git ls-remote origin

# Check file permissions
ls -la content/
```

## Best Practices

### 1. Commit Messages
- Use descriptive commit messages
- Include context about what was changed
- Consider using conventional commit format

### 2. Backup Strategy
- Keep regular backups of your content
- Consider using Git branches for major changes
- Implement rollback procedures

### 3. Monitoring
- Monitor GitHub API rate limits
- Set up notifications for failed deployments
- Log all publish attempts

### 4. Content Validation
- Validate markdown syntax before saving
- Implement content preview functionality
- Add spell-check and grammar validation

## Advanced Configuration

### Custom Git Commands

You can modify the publish endpoint to use custom Git commands:

```typescript
// Example: Use a different branch
await execAsync('git push origin develop');

// Example: Force push (use with caution)
await execAsync('git push origin main --force');

// Example: Add specific files only
await execAsync('git add content/');
```

### GitHub Actions Integration

Consider setting up GitHub Actions for additional automation:

```yaml
# .github/workflows/deploy.yml
name: Deploy on Content Update
on:
  push:
    branches: [main]
    paths: ['content/**']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Your deployment commands here
```

## Support

If you encounter issues:

1. Check the server logs for detailed error messages
2. Verify your Git configuration
3. Test Git commands manually in the server directory
4. Check GitHub's status page for service issues

## Security Notes

⚠️ **Important**: This implementation runs Git commands on the server. In production:

- Use proper authentication and authorization
- Validate all inputs
- Implement rate limiting
- Consider using GitHub's API instead of Git commands
- Monitor for suspicious activity
