# Resume PDF

`resume.pdf` is generated from the print stylesheet of `/resume`, which reads the same canonical data as the HTML page.

Regenerate it after resume content changes:

1. Build and serve the production site (`npm run build && npm run start`).
2. Run `npm run resume:pdf` (or `npm run resume:pdf -- http://localhost:<port>/resume` for another port). The script prints A4 from the `@page` rule in light mode.
3. Confirm the PDF contains `rizki@ortu.dev`, the current experience value, and no phone number.
4. Run `pdffonts public/resume.pdf` and confirm no font is listed as `Type 3`; older ATS parsers misread Type 3 text.
