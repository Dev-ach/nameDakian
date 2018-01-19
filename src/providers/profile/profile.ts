import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';



@Injectable()
export class ProfileProvider {

  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
  
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }


  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  updateName(prenom: string, nom: string): firebase.Promise<any> {
    return this.userProfile.update({ prenom, nom });
  }

  updateDOB(dateN: string): firebase.Promise<any> {
    return this.userProfile.update({ dateN });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(
    newPassword: string,
    oldPassword: string
  ): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

}
