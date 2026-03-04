# Vercel Multi-Project Setup Guide

Two separate Vercel projects from the same GitHub repo (`todd-11b/tourops-landing`).

## Project 1: TourOps (already deployed)

- **Repo:** todd-11b/tourops-landing
- **Production Branch:** `main`
- **Domain:** touropsai.com (or your current domain)
- **Status:** Already working — no changes needed

## Project 2: Lone Star Shine (new)

### Option A: Deploy directly from tourops-landing (Recommended)

Create a second Vercel project from the same repo:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select **Import Git Repository** → choose `todd-11b/tourops-landing`
3. Set the **Project Name** to `lone-star-shine`
4. Under **Build & Development Settings**:
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: `.` (dot — serves root)
5. Click **Deploy** (the initial deploy from main will be wrong — that's fine)
6. After creation, go to **Project Settings → Git**:
   - Change **Production Branch** to `claude/cleaning-website-design-VH2Dj`
7. Go to **Project Settings → Domains**:
   - Add your Lone Star Shine domain (e.g., `lonestarshine.com`)
8. Trigger a redeploy from the correct branch:
   - Go to **Deployments** → click **Redeploy** on the latest, or push a commit to the cleaning branch

Now every push to `claude/cleaning-website-design-VH2Dj` will auto-deploy Lone Star Shine,
and every push to `main` will auto-deploy TourOps. They are completely independent.

### Option B: Deploy from the dedicated lone-star-shine repo

If you prefer deploying from `todd-11b/lone-star-shine`:

1. The GitHub Actions workflow (`.github/workflows/sync-lone-star-shine.yml`) automatically
   syncs the cleaning branch to `todd-11b/lone-star-shine` on every push
2. Connect that repo to Vercel as a normal project deploying from `main`

**Setup required for the sync workflow:**

1. Create a GitHub Personal Access Token (PAT):
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
   - Create a token with **Contents: Read and Write** permission for `todd-11b/lone-star-shine`
2. Add the token as a repo secret on `tourops-landing`:
   - Go to `todd-11b/tourops-landing` → Settings → Secrets and variables → Actions
   - Add secret named `LONE_STAR_SHINE_PAT` with the token value
3. Merge the workflow file to `main` (workflows only run from the default branch)

## Preventing Cross-Deployment

Vercel won't cross-deploy because each project has its own production branch setting.
But if you want to be extra safe, you can add **Ignored Build Step** commands:

### For TourOps project (Settings → Git → Ignored Build Step):
```bash
if [ "$VERCEL_GIT_COMMIT_REF" = "main" ]; then exit 1; else exit 0; fi
```

### For Lone Star Shine project (Settings → Git → Ignored Build Step):
```bash
if [ "$VERCEL_GIT_COMMIT_REF" = "claude/cleaning-website-design-VH2Dj" ]; then exit 1; else exit 0; fi
```

(In Vercel's Ignored Build Step, exit 1 = proceed with build, exit 0 = skip build)
