# Zitao Xing Personal Homepage

English-first personal homepage and blog-ready site for Zitao Xing, built with Next.js and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The project includes a local npm cache setting in `.npmrc` so installs do not depend on the user-level npm cache.

## Deployment

The project is ready for Vercel.

1. Push this folder to a GitHub repository.
2. In Vercel, import the GitHub repository.
3. Use the default framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Output directory: leave empty/default.

Public routes:

- `/`
- `/resume`
- `/blog`
- `/blog/welcome`

Public assets:

- `/static/files/zitao-xing-resume.pdf`
- `/static/images/math-ai-hero.png`

## Content

- Resume PDF: `public/static/files/zitao-xing-resume.pdf`
- English resume source: `Z_Xing_resume/main.tex`
- Original Chinese resume source: `Z_Xing_resume/main-zh.tex`
- Hero image: `public/static/images/math-ai-hero.png`
- Blog posts: `content/blog/*.mdx`

Compile the English resume with:

```bash
cd Z_Xing_resume
latexmk -xelatex main.tex
```
