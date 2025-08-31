# GitHub Actions Setup for Test Report Emails

This guide explains how to set up the GitHub Actions workflow to automatically send test report emails.

## 🚀 **Features**

- **Automated Daily Reports**: Sends emails daily at 9 AM UTC
- **Manual Triggers**: Run on-demand with custom parameters
- **Secure**: Uses GitHub Secrets for sensitive data
- **Flexible**: Supports custom project IDs and dates
- **Sample Mode**: Test with sample data instead of real API

## 📋 **Setup Instructions**

### **1. Configure GitHub Secrets**

Go to your GitHub repository → Settings → Secrets and variables → Actions, then add these secrets:

#### **Email Configuration:**
```
EMAIL_PASSWORD=Glen@12345
EMAIL_USER=glen.eg@cccsnv.com
EMAIL_HOST=smtpout.secureserver.net
EMAIL_PORT=587
EMAIL_FROM=glen.eg@cccsnv.com
EMAIL_TO=glen.eg@cccsnv.com
```

#### **API Configuration:**
```
API_BASE_URL=http://localhost:5000
```

### **2. Workflow Triggers**

The workflow can be triggered in several ways:

#### **A. Manual Trigger (Recommended for testing)**
1. Go to Actions tab in your repository
2. Select "Send Test Reports Email"
3. Click "Run workflow"
4. Configure options:
   - **Project IDs**: Comma-separated list (optional)
   - **Start Date**: YYYY-MM-DD format (optional)
   - **Use Sample Data**: Check for testing without API

#### **B. Scheduled Daily Reports**
- Automatically runs at 9 AM UTC daily
- Uses default project IDs and date

#### **C. On Code Push**
- Triggers when email templates are updated
- Runs automatically on main branch pushes

### **3. Workflow Steps**

1. **Checkout Code**: Gets the latest code
2. **Setup Node.js**: Installs Node.js 18
3. **Install Dependencies**: Runs `npm ci` in email-templates directory
4. **Build Templates**: Compiles JSX to JavaScript
5. **Send Email**: Executes the email sending script

## 🔧 **Customization**

### **Modify Default Project IDs**
Edit the workflow file `.github/workflows/send-test-reports.yml`:

```yaml
default: '68b05ec609d4cadd37167c7e,68b0225f2359580bbd1c5bea,68b022552359580bbd1c5be9,68b022482359580bbd1c5be8,68b0223b2359580bbd1c5be7,68b022292359580bbd1c5be6'
```

### **Change Schedule**
Modify the cron expression in the workflow:

```yaml
schedule:
  - cron: '0 9 * * *'  # Daily at 9 AM UTC
```

### **Add More Environment Variables**
Add new secrets in GitHub and reference them in the workflow:

```yaml
env:
  NEW_VARIABLE: ${{ secrets.NEW_VARIABLE }}
```

## 🧪 **Testing**

### **Test with Sample Data**
1. Go to Actions → "Send Test Reports Email"
2. Check "Use sample data instead of real API data"
3. Click "Run workflow"

### **Test with Custom Project IDs**
1. Go to Actions → "Send Test Reports Email"
2. Enter specific project IDs: `68b05ec609d4cadd37167c7e,68b0225f2359580bbd1c5bea`
3. Click "Run workflow"

### **Test Locally**
```bash
cd src/email-templates
npm run send:multi:sample  # Test with sample data
npm run send:multi         # Test with real API
```

## 📊 **Monitoring**

### **Check Workflow Status**
- Go to Actions tab to see workflow runs
- Green checkmark = success
- Red X = failure (check logs)

### **View Logs**
1. Click on a workflow run
2. Click on "send-reports" job
3. Expand steps to see detailed logs

### **Common Issues**

#### **Email Not Sent**
- Check EMAIL_PASSWORD secret is correct
- Verify SMTP settings
- Check network connectivity

#### **API Connection Failed**
- Verify API_BASE_URL secret
- Ensure API server is running
- Check API endpoint is accessible

#### **Build Failed**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for syntax errors in JSX files

## 🔒 **Security Best Practices**

1. **Never commit passwords** to the repository
2. **Use GitHub Secrets** for all sensitive data
3. **Rotate passwords** regularly
4. **Limit access** to repository secrets
5. **Monitor workflow logs** for sensitive data exposure

## 📈 **Performance Tips**

1. **Use npm ci** instead of npm install for faster builds
2. **Cache dependencies** to speed up subsequent runs
3. **Run in parallel** if sending multiple reports
4. **Optimize email templates** for faster rendering

## 🆘 **Troubleshooting**

### **Workflow Not Triggering**
- Check branch name (should be `main`)
- Verify file paths in trigger conditions
- Ensure workflow file is in `.github/workflows/`

### **Build Errors**
- Check Node.js version compatibility
- Verify all dependencies in package.json
- Run `npm run build` locally to test

### **Email Delivery Issues**
- Check SMTP settings
- Verify email credentials
- Test with sample data first
- Check spam folder

## 📞 **Support**

If you encounter issues:
1. Check the workflow logs for error messages
2. Test locally first with `npm run send:multi:sample`
3. Verify all secrets are configured correctly
4. Check API server is running and accessible
