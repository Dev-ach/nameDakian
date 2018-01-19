import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
}) 


export class HomePage {

  public postsList : Array<any>; 
  public lickersEx : boolean;
  
  constructor(
    public navCtrl: NavController, 
    public eventProvider: EventProvider
  ) { }  
  

  ionViewDidLoad() {
    this.eventProvider.getEventList().orderByChild("date").on("value", eventListSnapshot => {
      this.postsList = [];
      eventListSnapshot.forEach(snap => {
        
        this.postsList.push({
          id: snap.key,
          name: snap.val().name,
          content: snap.val().content,  
          date: snap.val().date,
          lick:snap.val().lick,
          lickers: this.lickersEx
        });
        console.log(this.postsList);
        console.log(this.eventProvider.getLickersUser(snap.key));
        this.postsList = this.postsList.reverse();
        return false;
      });
    });
  }

  goToPostDetail(postId):void {
    this.navCtrl.push('EventDetailPage', { postId: postId });
    }
  
  goToProfile(): void {
    this.navCtrl.push("ProfilePage");
  }



  goToCreate(): void {
    this.navCtrl.push("EventCreatePage");  
  }
  goToList(): void {
    this.navCtrl.push("EventListPage");
  }
  
  like(postId):void{
    this.eventProvider.getLickPost(postId).ref.transaction(lick => {
       return lick+=1;
    });
    this.eventProvider
    .createLickers(postId);
  }
     
  
}