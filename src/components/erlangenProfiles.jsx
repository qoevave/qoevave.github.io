import React from 'react';
import styles from '../css/userProfileComponent.module.css';


const users = [
  {
    name: 'Thomas M. Robotham',
    imageUrl: 'https://www.audiolabs-erlangen.de/media/pages/fau/assistant/robotham/7af68c64d7-1616922882/dsc07789-7-portrait-200x.jpg',
    imageSize: 80,
    position: 'Post-doctoral Researcher',
  },
  {
    name: 'Emanuël A. P. Habets',
    imageUrl: 'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=2Za2MMIAAAAJ&citpid=7',
    imageSize: 80,
    position: 'Principal Investigator',
  }
];

export default function FAUProfiles() {
  return (
    <div>
      {users.map((user, index) => (
        <div key={index} className={styles.profileContainer}>
          <img
            className={styles.avatar}
            src={user.imageUrl}
            alt={'Photo of ' + user.name}
          />
          <div className={styles.profileText}>
            <h2 className={styles.userTitleText}>{user.name}</h2>
            <p className={styles.positionText}>{user.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
