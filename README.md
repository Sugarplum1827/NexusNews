# NexusNews

Nexus is a research publication covering markets, economies, technology, and business. The Companies section adds a source-linked research dossier for Microsoft.

## Run locally

Use Node.js 22 or later.

```sh
npm install
npm run dev
```

Open `http://localhost:3000/companies`. Use `npm run typecheck` and `npm run build` before publishing.

## Publish a dossier

Use `content/companies/microsoft.json` as a template. Import the new file and register it in `src/content/companies.ts`. The company directory, search, and detail page read from this registry.

For each claim, record the relevant filing section and its URL. Keep financial comparisons on a consistent period and unit basis. Add dated timeline entries and distinguish contemporaneous thesis revisions from retrospective notes. Record the source for both price series, align trading dates, and set the baseline to a close that precedes the announcement. The sample is a historical snapshot. Update its filings, numbers, or event prices through the content files.

Existing topics and standalone reports remain in `content/topics` and `content/reports`.
