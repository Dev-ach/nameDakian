import { Component } from "@angular/core";
import {
  Alert,
  AlertController,
  IonicPage,
  NavController
} from "ionic-angular";
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";




@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})

export class ProfilePage {


  public userProfile: any;
  public dateN: string;


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider
  ) { }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.dateN = userProfileSnapshot.val().dateN;
    });
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "الاسم واللقب",
      cssClass: "rtlAlert",
      inputs: [
        {
          name: "prenom",
          value: this.userProfile.prenom
        },
        {
          name: "nom",
          value: this.userProfile.nom
        }
      ],
      buttons: [
        { text: "إلغاء" },
        {
          text: "حفظ",
          handler: data => {
            this.profileProvider.updateName(data.prenom, data.nom);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(dateN: string): void {
    this.profileProvider.updateDOB(dateN);
  }


  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'newEmail', placeholder: 'بريدك الإلكتروني الجديد'},
      { name: 'password', placeholder: 'كلمة السر', type: 'password' }],
      cssClass: "rtlAlert",
      buttons: [
        { text: 'إلغاء' },
        {
          text: 'حفظ',
          handler: data => {
            let newEmail = data.newEmail;
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('تم تغيير البريد الإلكتروني بنجاح'); })
              .catch(error => { console.log('ERROR: ' + error.message); }); 
          }
        }]
    });
    alert.present();
  }
  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'كلمة السر الجديدة', type: 'password' },
        { name: 'oldPassword', placeholder: 'كلمة المرور القديمة', type: 'password' }],
        cssClass: "rtlAlert",
      buttons: [
        { text: 'إلغاء' },
        {
          text: 'حفظ',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }
}