import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
      <p className={styles.heroTagline}>{siteConfig.tagline}<br /></p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`The ${siteConfig.title} Database`}
      description="Quality of Experience Evaluation of Interactive Virtual Environments with Audiovisual Scenes">
      <div className={clsx('heroFiller', styles.heroFiller)}></div>
      <HomepageHeader />
      <main>
        <ProjectCardsComponent />
      </main>
    </Layout>
  );
}
