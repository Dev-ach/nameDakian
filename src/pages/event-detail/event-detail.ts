import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";


@IonicPage({
  segment: "event-detail/:eventId"
})
@Component({
  selector: "page-event-detail",
  templateUrl: "event-detail.html"
})

export class EventDetailPage {


  public currentEvent: any = {};


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider
  ) { }


  ionViewDidLoad() {
    this.eventProvider
      .getPostDetail(this.navParams.get("postId"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }
  
}
