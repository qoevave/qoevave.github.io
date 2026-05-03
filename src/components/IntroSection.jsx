import React from 'react';
import Link from '@docusaurus/Link';
import styles from './IntroSection.module.css';

export default function IntroSection() {
  return (
    <section className={styles.intro} aria-label="Project introduction">
      <div className={styles.inner}>
        <h2>EVOLVE-QoE</h2>
        <p className={styles.projectDuration}>Project duration, 2024 - present</p>
        <p className={styles.lead}>
          The EVOLVE-QoE project builds on the QoEVAVE project from AUDICTIVE Phase 1, 
          aiming to bridge the knowledge gap regarding suitable audiovisual scene 
          characteristics in Interactive Virtual Environments. The project pairs top-down, 
          human-driven measures such as, exploration trajectories, physiological measures, and scene 
          annotations, with bottom-up instrumental scene analysis, drawing on soundscape 
          and visual-scene research to evaluate the ecological validity of IVEs within the QoEVAVE framework. 
        </p>
        <Link className={styles.readMore} to="/about">
          Read more about EVOLVE-QoE →
        </Link>
      </div>
      <div className={styles.inner}>
        <h2>QoEVAVE</h2>
        <p className={styles.projectDuration}>Project duration, 2021 - 2023</p>
        <p className={styles.lead}>
          Interactive virtual environments pose many challenges for quality, and quality of
          experience evaluations. Classical methodologies ask participants to
          engage in an explicit quality-judgment task, yet doing so disrupts the very
          immersion that defines the IVE experience. The QoEVAVE project addresses this
          gap by drawing on the virtual reality research tradition of indirect,
          behavior-based measurement, integrating these techniques into a QoE
          framework for multimodal, 3- and 6-degrees-of-freedom audiovisual
          environments. 
        </p>
        <Link className={styles.readMore} to="/about">
          Read more about QoEVAVE →
        </Link>
      </div>
    </section>
  );
}
