import React from 'react';
import styles from './ProjectCards.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import EigenmikImage from '../../static/img/EigenmikWide.jpg';
import QExEImage from '../../static/img/QExEIllustration_annotated.png';

function ProjectCardsComponent() {
  return (
    <section
      className={styles.sectionWrapper}
      aria-labelledby="open-resources-title">
      <header className={styles.sectionHeader}>
        <h2 id="open-resources-title" className={styles.sectionTitle}>
          Open Datasets &amp; Tools
        </h2>
        <p className={styles.sectionDescription}>
          The QoEVAVE and EVOLVE-QoE research projects provide datasets and
          software tools for audiovisual VR research. Each resource is independently
          documented and openly licensed for research use.
        </p>
      </header>

      <div className={styles.cardsGrid}>
        <article className={styles.card}>
          <img
            className={styles.cardMedia}
            src={EigenmikImage}
            alt="Eigenmike spherical microphone array used for fourth-order Ambisonics capture."
          />
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>./Database</h3>
            <Link
              className={clsx(
                'button button--primary button--sm',
                styles.buttonRounder,
              )}
              to="https://qoevave.github.io/database/">
              Open documentation
            </Link>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.cardDescription}>
              Collection of datasets for audiovisual research in VR.
            </p>
            <ul className={styles.cardInformation}>
              <li>Scene dataset of 360° 8K video and 4th-order Ambisonics audio</li>
              <li>Saliency dataset with 3-DoF viewing exploration</li>
              <li>CGI 6-DoF scene dataset with acoustic geometry</li>
            </ul>
          </div>
          <footer className={styles.cardFooter}>
            <time className={styles.cardUpdated} dateTime="2026-05-02">
              Updated May 2026
            </time>
            <ul className={styles.cardBadges} aria-label="Database key facts">
              <li className={styles.badge}>8K 360° video</li>
              <li className={styles.badge}>4OA Ambisonics</li>
              <li className={styles.badge}>Unity</li>
              <li className={styles.badge}>CC BY-NC</li>
            </ul>
          </footer>
        </article>

        <article className={styles.card}>
          <img
            className={styles.cardMedia}
            src={QExEImage}
            alt="Annotated illustration of the QExE evaluation tool architecture."
          />
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>./QExE Tool</h3>
            <Link
              className={clsx(
                'button button--primary button--sm',
                styles.buttonRounder,
              )}
              to="https://qoevave.github.io/qexe">
              Open documentation
            </Link>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.cardDescription}>
              Quality of Experience evaluation tool for conducting subjective
              studies in virtual reality.
            </p>
          </div>
          <footer className={styles.cardFooter}>
            <time className={styles.cardUpdated} dateTime="2024-07-16">
              Updated Jul 2024
            </time>
            <ul className={styles.cardBadges} aria-label="QExE key facts">
              <li className={styles.badge}>Unity</li>
              <li className={styles.badge}>Max/MSP</li>
              <li className={styles.badge}>R analysis</li>
              <li className={styles.badge}>MIT + CC BY-NC-SA</li>
            </ul>
          </footer>
        </article>
      </div>
    </section>
  );
}

export default ProjectCardsComponent;
