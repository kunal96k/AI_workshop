# 🚀 Capernaum Portal: Deployment Guide (v1.2)

Comprehensive guide to deploying your static website to **AWS S3** using **GitHub Actions** for high-performance, automated CI/CD.

---

## 🏗️ 1. AWS S3 Bucket Preparation
Prepare your bucket to serve as a fast static host:

1.  **Create Bucket**: In AWS S3 console, create a bucket (e.g., `capernaum-portal-prod`).
2.  **Static Website Hosting**:
    *   Navigate to **Properties > Static website hosting**.
    *   Set to **Enable** and define `index.html` as the **Index document**.
3.  **Permissions**:
    *   **Edit** "Block public access": Uncheck **"Block all public access"** and save.
4.  **Bucket Policy**: Add the following JSON (replace `YOUR_BUCKET_NAME` with your actual name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```

---

## 🔑 2. IAM User Credentials
Create a programmatic user for GitHub to securely talk to AWS:

1.  **IAM Console**: Go to **Users > Add user** (name it `github-actions-user`).
2.  **Permissions**: Attach `AmazonS3FullAccess` policy directly.
3.  **Access Key**: 
    *   Go to **Security credentials** tab.
    *   Click **Create access key** > Choose **Command Line Interface (CLI)**.
    *   **SAVE THESE**: Download the CSV containing your `Access Key ID` and `Secret Access Key`.

---

## 🛡️ 3. Configure GitHub Secrets
Store your credentials safely in your repository:

1.  Open your repository: **Settings > Secrets and variables > Actions**.
2.  New repository secret:
    *   `AWS_ACCESS_KEY_ID`: Your IAM access key ID.
    *   `AWS_SECRET_ACCESS_KEY`: Your IAM secret key.

---

## ⚡ 4. Automatic Workflow (YAML)
Add this file to automate every push:

1.  **Folder**: Create `.github/workflows` in your project root.
2.  **File**: Create `deploy-s3.yml` and paste:

```yaml
name: Deploy Portal to S3

on:
  push:
    branches:
      - master  # Branch to monitor

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-south-1  # Set to your AWS region (e.g., Mumbai)

      - name: Sync to S3
        run: |
          aws s3 sync . s3://YOUR_BUCKET_NAME --delete --exclude ".git/*" --exclude ".github/*"
```
*(Replace `YOUR_BUCKET_NAME` with your actual name)*.

---

## 🎯 5. Launch & Deploy (Commands)
Run these in your terminal to go live:

```bash
# 1. Update Project
git add .

# 2. Commit Deployment Ready Files
git commit -m "added automated deploy v1.2"

# 3. Synchronize to Live
git push origin master
```

---
**💡 Professional Tip**: Check your repository's **"Actions"** tab on GitHub to see the deployment logs in real-time. Once green, your latest Capernaum Portal changes are live on the S3 endpoint!
