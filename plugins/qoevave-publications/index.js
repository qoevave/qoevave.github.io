/**
 * QoEVAVE publications plugin.
 *
 * Reads a BibTeX file at build time, parses it with citation-js, and exposes
 * a sorted-by-year list of entries via Docusaurus global plugin data. Each
 * entry is pre-rendered as IEEE-formatted HTML by a small in-house formatter
 * (no CSL XML dependency required).
 *
 * Each emitted entry has the shape:
 *   {
 *     key: 'Robotham2022',
 *     year: 2022,
 *     type: 'article-journal' | 'paper-conference' | ...,
 *     title: '...',
 *     formattedHtml: '<span>... IEEE-formatted citation ...</span>',
 *     bibtex: '@article{Robotham2022, ...}',
 *     doi: '10.1109/tvcg.2022.3150491' | undefined
 *   }
 *
 * Component access:
 *   import { usePluginData } from '@docusaurus/useGlobalData';
 *   const data = usePluginData('qoevave-publications');
 */

const path = require('node:path');
const fs = require('node:fs');

module.exports = function publicationsPlugin(context, options = {}) {
  const bibPath = path.resolve(
    context.siteDir,
    options.bibFile || 'static/data/QoEVAVE.bib',
  );

  return {
    name: 'qoevave-publications',

    async loadContent() {
      // Dynamic-import citation-js so the plugin works regardless of whether
      // the host project loads as ESM or CJS.
      const { Cite } = await import('@citation-js/core');
      await import('@citation-js/plugin-bibtex');

      if (!fs.existsSync(bibPath)) {
        console.warn(
          `[qoevave-publications] BibTeX file not found at ${bibPath} — publications page will be empty.`,
        );
        return [];
      }

      const bibContent = fs.readFileSync(bibPath, 'utf-8');
      const cite = new Cite(bibContent);

      const entries = cite.data.map((entry) => {
        // citation-js can re-serialise a single entry back to BibTeX.
        const bibtex = new Cite(entry).format('bibtex').trim();
        const year =
          entry.issued &&
          entry.issued['date-parts'] &&
          entry.issued['date-parts'][0] &&
          entry.issued['date-parts'][0][0];

        return {
          key: entry.id || entry['citation-key'] || entry.title,
          year: year || null,
          type: entry.type,
          title: entry.title || '',
          formattedHtml: formatIEEE(entry),
          bibtex,
          doi: entry.DOI || undefined,
          url: entry.URL || undefined,
        };
      });

      // Reverse-chronological, then alphabetical title within a year.
      entries.sort((a, b) => {
        if (b.year !== a.year) return (b.year || 0) - (a.year || 0);
        return (a.title || '').localeCompare(b.title || '');
      });

      return entries;
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({entries: content});
    },

    getPathsToWatch() {
      return [bibPath];
    },
  };
};

// ----------------------------------------------------------------------------
// IEEE-style formatter (CSL JSON in, HTML string out).
// Covers @article and @inproceedings cleanly; falls back gracefully for other
// entry types. Conventions follow the IEEE Editorial Style Manual.
// ----------------------------------------------------------------------------

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);
}

function formatAuthorIEEE(author) {
  if (!author) return '';
  if (!author.family) return author.literal || '';
  const givenNames = (author.given || '').trim();
  if (!givenNames) return author.family;
  // Convert each given name fragment to an initial: "Olli" -> "O.", "S." -> "S.".
  const initials = givenNames
    .split(/\s+/)
    .map((part) =>
      part.endsWith('.') ? part : part.charAt(0).toUpperCase() + '.',
    )
    .join(' ');
  return `${initials} ${author.family}`.trim();
}

function formatAuthorsIEEE(authors) {
  if (!authors || authors.length === 0) return '';
  const formatted = authors.map(formatAuthorIEEE);
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
  return (
    formatted.slice(0, -1).join(', ') +
    ', and ' +
    formatted[formatted.length - 1]
  );
}

function formatYearMonth(issued) {
  if (!issued || !issued['date-parts']) return '';
  const dp = issued['date-parts'][0];
  const year = dp && dp[0];
  const month = dp && dp[1];
  if (!year) return '';
  if (!month) return String(year);
  const months = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
    'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.',
  ];
  const monthAbbrev = months[month - 1];
  return monthAbbrev ? `${monthAbbrev} ${year}` : String(year);
}

function formatPages(page) {
  if (page == null) return '';
  // BibTeX `--` and ASCII `-` -> en dash.
  return String(page).replace(/--/g, '–').replace(/\s*-\s*/g, '–');
}

function formatIEEE(entry) {
  const authors = formatAuthorsIEEE(entry.author);
  const title = entry.title || '';
  const yearMonth = formatYearMonth(entry.issued);
  const venue = entry['container-title'] || '';
  const volume = entry.volume;
  const issue = entry.issue || entry.number;
  const pages = formatPages(entry.page);
  const doi = entry.DOI;
  const place = entry['publisher-place'] || entry.address;

  let prefix = '';
  if (authors) prefix += escapeHtml(authors) + ', ';
  if (title) prefix += `“${escapeHtml(title)},” `;

  const parts = [];

  if (entry.type === 'article-journal') {
    if (venue) parts.push(`<em>${escapeHtml(venue)}</em>`);
    if (volume) parts.push(`vol. ${escapeHtml(volume)}`);
    if (issue) parts.push(`no. ${escapeHtml(issue)}`);
    if (pages) parts.push(`pp. ${escapeHtml(pages)}`);
    if (yearMonth) parts.push(escapeHtml(yearMonth));
  } else if (entry.type === 'paper-conference') {
    if (venue) parts.push(`in <em>${escapeHtml(venue)}</em>`);
    if (place) parts.push(escapeHtml(place));
    if (yearMonth) parts.push(escapeHtml(yearMonth));
    if (pages) parts.push(`pp. ${escapeHtml(pages)}`);
  } else if (entry.type === 'thesis') {
    // CSL maps @phdthesis -> type 'thesis'. IEEE form is roughly:
    //   A. Author, "Title," Ph.D. dissertation, School, City, Year.
    // citation-js typically puts the institution in `publisher` for @phdthesis.
    const dissertationType = entry.genre || 'Ph.D. dissertation';
    parts.push(escapeHtml(dissertationType));
    const school = entry.publisher || venue;
    if (school) parts.push(escapeHtml(school));
    if (place) parts.push(escapeHtml(place));
    if (yearMonth) parts.push(escapeHtml(yearMonth));
  } else {
    if (venue) parts.push(`<em>${escapeHtml(venue)}</em>`);
    if (yearMonth) parts.push(escapeHtml(yearMonth));
    if (pages) parts.push(`pp. ${escapeHtml(pages)}`);
  }

  let result = prefix + parts.join(', ');
  if (doi) {
    const safeDoi = encodeURI(doi);
    result += `, doi: <a href="https://doi.org/${safeDoi}" target="_blank" rel="noreferrer noopener">${escapeHtml(doi)}</a>`;
  }
  return result + '.';
}
