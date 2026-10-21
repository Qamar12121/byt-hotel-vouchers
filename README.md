# Bin Yasin Travels — Netlify Hotel Voucher Portal v2

Complete editable source. This is a Netlify port of the original portal, plus a hotel voucher builder. The original ChatGPT-hosted site is unchanged.

## Features
- Password-protected admin library; search by family/reference.
- Create hotel vouchers: multiple passengers, multiple stays, dates, rooms, meals, flights, transport and notes.
- Print / Save as PDF with QR already included in created vouchers.
- Upload existing Excel-exported PDFs (maximum 3 MB).
- 256-bit random voucher links; passengers scan/view without ChatGPT sign-in.
- Update a created voucher or replace an uploaded PDF using the same entry: the same QR displays the latest version.
- Server-side Netlify Blobs storage; records survive new deploys of the SAME Netlify site. No Supabase account needed.
- QR generation bundled locally; passenger data is not sent to an external QR service.

## Deploy on Netlify — recommended Git method
1. Extract this ZIP.
2. Create a PRIVATE GitHub repository. Upload the contents of this folder (package.json and netlify.toml at the repository root). Do not upload node_modules or a password.
3. Netlify > Add new project > Import an existing project > select the repository.
4. Build command: `npm run build`; Publish directory: `dist`; Functions directory: `netlify/functions`. netlify.toml supplies these.
5. Before deploying, add environment variable `ADMIN_PASSWORD` with your OWN random password, at least 16 characters. Give it Functions/runtime scope. No password is included in the source.
6. Deploy. Open the returned Netlify URL and enter that password.
7. If you add/change the environment variable later, redeploy so Functions receive it.

## Alternative — Windows PowerShell / Netlify CLI
Install Node.js 22 LTS, extract ZIP, open PowerShell in the extracted project folder:

```powershell
npm install
npx netlify login
npx netlify init
```
Choose Create & configure a new site, select your account and site name. If asked, use build `npm run build`, publish `dist`, functions `netlify/functions`.
In Netlify dashboard set ADMIN_PASSWORD as above, then:

```powershell
npx netlify deploy --build --prod
```
Plain Netlify browser drag-and-drop of HTML/dist does NOT deploy the required server functions. Use Git import or the CLI above for working online saving.

## Create a hotel voucher
1. Log in > Create voucher.
2. Enter family head/reference/package/company.
3. Add passengers; enter exact passport names and numbers.
4. Add each Makkah/Madinah stay with check-in and checkout. Nights calculate automatically.
5. Enter transport/flights and special instructions.
6. Save online voucher > Open voucher > Print / Save PDF (A4).
7. QR is included in the created voucher. Share the PDF/link with the intended passenger.
8. Later use Edit in the library to update the same voucher.

## Excel PDF workflow
1. Save your Excel voucher as PDF.
2. Upload PDF > Save online > Download QR.
3. Insert downloaded QR into Excel, replacing any old QR.
4. Export final PDF. In the portal use Replace PDF on the SAME entry to upload that final PDF.
5. Test scan on a second phone before sending.
Every new voucher gets its own link. Creating another entry instead of editing produces another QR.

## Privacy and operation
- Anyone possessing a voucher link can view that one voucher, including passport details. Do not post links publicly.
- Admin list and writes require ADMIN_PASSWORD on the server. Password is kept in page memory only; refresh/log out requires login again.
- For a small agency this is a shared administrator password, not a multi-user roles system. Rotate it in Netlify if shared accidentally. No login rate-limit service is included; choose a high-entropy random password.
- Keep the SAME Netlify site/domain to preserve links. A new site has a separate store. A different domain requires new QR images.
- Deploy Preview functions share the site's storage. Do not use preview versions to write test records into production.
- Original ChatGPT-hosted vouchers are not automatically migrated. Re-upload/create them on Netlify and issue new QR codes.
- Keep original Excel/PDF backups. Netlify quotas/billing depend on your plan.
- No hotel/airline confirmation is performed. Confirm booking facts before issuing.

## Local development and checks
`npm install`, `npm test`, `npm run build`.
For server storage during development, use `npx netlify dev` linked to your site and configured environment. Opening index.html directly does not run the API.
Source: app.js, style.css, index.html; backend: netlify/functions/api.mjs and validation.mjs.

## Validation completed for this delivery
Syntax, build, voucher validation and mocked API/storage tests. Real Netlify deploy, account configuration and mobile scan must be verified after you deploy to your Netlify account.
