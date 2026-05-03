import React from 'react';
import styles from '../css/userProfileComponent.module.css';


const users = [
  {
    name: 'Abhinav Bhattacharya',
    imageUrl: 'https://www.ient.rwth-aachen.de/cms/uploads/images/team/a_bhattacharya.jpg',
    imageSize: 80,
    position: 'PhD Student',
  },
  {
    name: 'Alexander Raake',
    imageUrl: 'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=MoOhyrQAAAAJ&citpid=5',
    imageSize: 80,
    position: 'Principal Investigator',
  }
];

export default function TUILProfiles() {
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
