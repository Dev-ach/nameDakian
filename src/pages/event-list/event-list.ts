import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";


/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})

export class EventListPage {
  allContent: any;

  public postsList: Array<any>; 

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider
  ) { }

  ionViewDidLoad() {
    this.eventProvider.getEventList().orderByChild('idUser').equalTo(this.eventProvider.getUserId()).on("value", eventListSnapshot => {
      this.postsList = [];
      eventListSnapshot.forEach(snap => {
        this.postsList.push({
          id: snap.key,
          name: snap.val().name,
          content: snap.val().content,  
          date: snap.val().date
        });
        return false;
      });
    });
  }

  goToPostDetail(postId):void {
    this.navCtrl.push('EventDetailPage', { postId: postId });
    }
}
