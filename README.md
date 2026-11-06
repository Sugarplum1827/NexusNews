# NexusNews

Nexus is a research publication covering markets, economies, technology, and business. The Companies desk publishes source-linked articles and downloadable diligence files for Apple, Microsoft, Alphabet, Anthropic, and OpenAI.

## Run locally

Use Node.js 22 or later.

```sh
npm install
npm run dev
```

Open `http://localhost:3000/companies`. Use `npm run typecheck` and `npm run build` before publishing.

## Publish a dossier

Add or update a record in `content/companies/research-edition.json`. The company directory, search, and detail pages read from this edition. Publish matching PDF, Word, and Excel files under `public/company-research/<slug>-due-diligence.*`.

For each claim, record the filing section or announcement and its URL. Keep annual and interim periods separate and make unavailable financial fields explicit. Label forecast assumptions and historical snapshots by date. The legacy Microsoft market event is stored separately in `content/companies/microsoft.json`.

Existing topics and standalone reports remain in `content/topics` and `content/reports`.

## Topic PDFs

Topic pages read the report at `public/due-diligence/<topic-slug>.pdf`. To use a separately authored report, replace that file with your PDF. To export the repository's topic research instead, install ReportLab and run `python scripts/export-topic-pdfs.py`. The exporter overwrites the PDFs for the topics it processes.
