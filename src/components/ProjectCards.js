import React from 'react';
import styles from './ProjectCards.module.css';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import HeatmapImage from '../../static/img/SkateboardingHeatmaps.gif';
import CaveGeometryImage from '../../static/img/CaveGeometry.png';
import EigenmikImage from '../../static/img/EigenmikWide.jpg';
import QExEImage from '../../static/img/QExEIllustration_annotated.png';

function ProjectCardsComponent({ title, description, imageUrl}) {
  return (
    <section className={styles.cardsSection}>    
      <div className={styles.cardContainer}>
        <div className={styles.cardTitle}>
            ./Database
            <div className={styles.buttons}>
                <Link
                    className={clsx('button button--primary button--lg', styles.buttonRounder)}
                    to="https://qoevave.github.io/database/">
                    Scene Database
                </Link>
            </div>   
        </div>
        <div className={styles.cardDescription}>
            "Quality of Experience Evaluation of Interactive Virtual Environments with Audiovisual Scenes"
        </div>
        <div className={styles.cardInformation}>
            <li>Scene Database including 360 degree 8k video and 4th-order Ambisonics audio content of 12 different scenes with multiple scene versions.</li>
            <li>Saliency Database with 3-DoF viewing exploration for various audio scenarios and scene descriptions from verbalization tasks.</li>
            <li>Audio-Task Scene Database offering three high quality audiovisual CGI scenes in Unity with acoustic geometry meshes.</li>
        </div>
        <div className={styles.pictureTilesContainer}>
            <img className={styles.pictureTile} src={HeatmapImage}/>
            <img className={styles.pictureTile} src={CaveGeometryImage}/>
            <img className={styles.pictureTile} src={EigenmikImage}/>
        </div>
      </div>  
      <div className={styles.cardContainer}>
        <div className={styles.cardTitle}>
            ./QExE Tool
            <div className={styles.buttons}>
                <Link
                    className={clsx('button button--primary button--lg', styles.buttonRounder)}>
                    ... Coming Soon
                </Link>
            </div>  
        </div>
        <div className={styles.cardDescription}>
            Quality of Experience Evaluation tool for conducting subjective evaluations in virtual reality. 
        </div> 
        <img className={styles.qexeSplashImg} src={QExEImage}/>
      </div>
    </section>
  );
}

export default ProjectCardsComponent;