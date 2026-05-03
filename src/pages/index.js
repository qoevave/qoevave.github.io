import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IntroSection from '../components/IntroSection';
import ProjectCardsComponent from '../components/ProjectCards';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();


  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <h3 className={styles.heroSubtitle}>
          A research program on quality of experience in interactive audiovisual virtual environments
        </h3>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`The ${siteConfig.title} Database`}
      description="A research program on quality of experience in interactive audiovisual virtual environments">
      <HomepageHeader />
      <main>
        <IntroSection />
        <ProjectCardsComponent />
      </main>
    </Layout>
  );
}
