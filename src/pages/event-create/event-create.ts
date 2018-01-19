import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";

@IonicPage()

@Component({
  selector: "page-event-create",
  templateUrl: "event-create.html"
})

export class EventCreatePage {


  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider
  ) { }

  createPost(
    postName: string,
    postContent: Text,
    postSource: string

  ): void {
    this.eventProvider
      .createPost(postName,  postContent, postSource)
      .then(newPost => {
        this.navCtrl.pop();
      });
  }

}
