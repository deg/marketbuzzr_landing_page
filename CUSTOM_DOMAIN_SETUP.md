# Custom Domain Setup: marketbuzzr.com → GitHub Pages

This guide will help you connect your GoDaddy domain `marketbuzzr.com` to your GitHub Pages site.

## ✅ What's Already Configured

- ✅ `CNAME` file created in `/public/CNAME` with `marketbuzzr.com`
- ✅ Vite config updated to use root path (`base: '/'`)
- ✅ GitHub Pages deployment ready

## 🔧 GoDaddy DNS Configuration

You need to configure DNS records in your GoDaddy account:

### Step 1: Access GoDaddy DNS Management
1. Log into your GoDaddy account
2. Go to **My Products** → **All Products and Services**
3. Find `marketbuzzr.com` and click **DNS** or **Manage**

### Step 2: Configure DNS Records

You have two options:

#### Option A: Apex Domain (Recommended)
Add these **A records** (replace any existing A records for the root domain):
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 600

Type: A  
Name: @
Value: 185.199.109.153
TTL: 600

Type: A
Name: @  
Value: 185.199.110.153
TTL: 600

Type: A
Name: @
Value: 185.199.111.153
TTL: 600
```

#### Option B: CNAME Record (Alternative)
```
Type: CNAME
Name: @
Value: deg.github.io
TTL: 600
```

**Note:** Some DNS providers don't support CNAME for apex domains. If GoDaddy doesn't allow CNAME for `@`, use Option A.

### Step 3: Add WWW Subdomain (Optional)
```
Type: CNAME
Name: www
Value: deg.github.io
TTL: 600
```

## 🚀 Deploy and Configure GitHub Pages

### Step 1: Deploy Your Site
```bash
yarn deploy
```

### Step 2: Enable Custom Domain in GitHub
1. Go to: https://github.com/deg/marketbuzzr_landing_page
2. Click **Settings** → **Pages**
3. Under **Custom domain**, enter: `marketbuzzr.com`
4. Check **"Enforce HTTPS"** (will be available after DNS propagates)
5. Click **Save**

## ⏱️ DNS Propagation

DNS changes can take:
- **Immediate to 1 hour**: For most users
- **Up to 48 hours**: For complete global propagation

## 🔍 Testing Your Setup

### Check DNS Propagation
Use these tools to verify DNS changes:
- https://dnschecker.org/
- https://www.whatsmydns.net/

### Test Your Site
Once DNS propagates, your site should be available at:
- **https://marketbuzzr.com** (primary)
- **https://www.marketbuzzr.com** (if you configured www)

## 🛠️ Troubleshooting

### Common Issues:

1. **"Site not found" errors**
   - Wait for DNS propagation (up to 48 hours)
   - Verify DNS records are correct
   - Check that GitHub Pages shows the custom domain

2. **SSL Certificate issues**
   - GitHub will automatically provision SSL after DNS is configured
   - Enable "Enforce HTTPS" in GitHub Pages settings
   - Wait up to 24 hours for certificate provisioning

3. **Mixed content warnings**
   - Ensure all resources use HTTPS
   - Check that your CNAME file is correct

### Verification Commands:
```bash
# Check DNS resolution
nslookup marketbuzzr.com

# Check if GitHub recognizes the domain
curl -I https://marketbuzzr.com
```

## 📝 Final Checklist

- [ ] DNS records configured in GoDaddy
- [ ] Site deployed with `yarn deploy`
- [ ] Custom domain added in GitHub Pages settings
- [ ] HTTPS enforced in GitHub Pages settings
- [ ] DNS propagation completed (check with dnschecker.org)
- [ ] Site accessible at https://marketbuzzr.com

## 🎉 Success!

Once everything is configured and propagated, your MarketBuzzr landing page will be live at:
**https://marketbuzzr.com**

The site will automatically redirect from the GitHub Pages URL to your custom domain.
