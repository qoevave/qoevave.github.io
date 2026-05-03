import React, {useState} from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './PublicationList.module.css';

export default function PublicationList() {
  const data = usePluginData('qoevave-publications');
  const entries = (data && data.entries) || [];

  if (entries.length === 0) {
    return (
      <p className={styles.empty}>
        No publications are currently listed. The bibliography file may be
        missing or empty — see <code>static/data/QoEVAVE.bib</code>.
      </p>
    );
  }

  // Doctoral theses get their own section above the year groups, since they
  // represent project-level milestones rather than ordinary peer-reviewed
  // outputs.
  const theses = entries.filter((e) => e.type === 'thesis');
  const publications = entries.filter((e) => e.type !== 'thesis');

  // Group remaining entries by year, descending.
  const byYear = publications.reduce((acc, entry) => {
    const year = entry.year || 'Undated';
    if (!acc[year]) acc[year] = [];
    acc[year].push(entry);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => {
    if (a === 'Undated') return 1;
    if (b === 'Undated') return -1;
    return Number(b) - Number(a);
  });

  return (
    <div className={styles.list}>
      {theses.length > 0 && (
        <section className={styles.thesisGroup} aria-labelledby="theses-heading">
          <h2 id="theses-heading" className={styles.thesisHeading}>
            Doctoral Theses
          </h2>
          <p className={styles.thesisIntro}>
            Theses completed as a direct outcome of the QoEVAVE project.
          </p>
          <ul className={styles.entries}>
            {theses.map((entry) => (
              <PublicationEntry key={entry.key} entry={entry} />
            ))}
          </ul>
        </section>
      )}

      {years.length > 0 && (
        <section aria-labelledby="publications-heading">
          {theses.length > 0 && (
            <h2 id="publications-heading" className={styles.sectionHeading}>
              Journal and Conference Publications
            </h2>
          )}
          {years.map((year) => (
            <section key={year} className={styles.yearGroup}>
              <h3 className={styles.yearHeading}>{year}</h3>
              <ul className={styles.entries}>
                {byYear[year].map((entry) => (
                  <PublicationEntry key={entry.key} entry={entry} />
                ))}
              </ul>
            </section>
          ))}
        </section>
      )}
    </div>
  );
}

function PublicationEntry({entry}) {
  return (
    <li className={styles.entry}>
      <div
        className={styles.citation}
        // Citation HTML is generated at build time by our IEEE formatter
        // (no third-party HTML; all values are escaped).
        dangerouslySetInnerHTML={{__html: entry.formattedHtml}}
      />
      <div className={styles.actions}>
        {entry.doi && (
          <a
            className={styles.actionLink}
            href={`https://doi.org/${entry.doi}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open DOI ${entry.doi} for ${entry.title}`}
          >
            DOI
          </a>
        )}
        {entry.url && !entry.doi && (
          <a
            className={styles.actionLink}
            href={entry.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open external link for ${entry.title}`}
          >
            Link
          </a>
        )}
        <CopyBibtexButton bibtex={entry.bibtex} entryKey={entry.key} />
      </div>
    </li>
  );
}

function CopyBibtexButton({bibtex, entryKey}) {
  const [state, setState] = useState('idle');

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(bibtex);
      setState('copied');
    } catch (err) {
      setState('error');
    }
    window.setTimeout(() => setState('idle'), 2000);
  }

  const label =
    state === 'copied'
      ? 'Copied!'
      : state === 'error'
      ? 'Copy failed'
      : 'Copy BibTeX';

  return (
    <button
      type="button"
      className={styles.actionButton}
      onClick={handleCopy}
      aria-label={`Copy BibTeX entry for ${entryKey}`}
    >
      {label}
    </button>
  );
}
