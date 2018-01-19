import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()


export class EventProvider {

  public lickersList : Array<any>; 
  public postListRef: firebase.database.Reference;
  public userLickRef: firebase.database.Reference;
  public allEventListRef: firebase.database.Reference;
  public userPost: string;
  private lick: number;
  public lickersEx : boolean;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userPost = user.uid;
        this.postListRef = firebase
          .database()
          .ref(`/posts`);
        this.userLickRef = firebase
          .database()
          .ref(`/lickersUser`);
        this.lick = 0;
        this.lickersEx= false;
      }
    });
  }

  createPost(
    posttName: string,
    postContent: Text,
    postSource: string,

  ): firebase.Promise<any> {
    return this.postListRef.push({
      name: posttName,
      date: firebase.database.ServerValue.TIMESTAMP,
      content: postContent,
      source: postSource,
      idUser: this.userPost,
      lick: this.lick
    });
  }

  getUserId() {
    return this.userPost;
  }

  getEventList(): firebase.database.Reference {
    return this.postListRef;
  }

  getPostDetail(postId: string): firebase.database.Reference {
    return this.postListRef.child(postId);
  }

  getLickPost(postId) {
    return this.getPostDetail(postId).child(`lick`);
  }

  createLickers(postId : string): firebase.Promise<any> {
    return this.userLickRef.push({
      idUserLicker: this.userPost,
      idPost: postId
    });
  }

  getLickersUser(postId) {
    this.userLickRef.on("value", (snapshot) =>{
      snapshot.forEach( snap =>{
        if( snap.val().idPost === postId && snap.val().idUserLicker === this.userPost){
          this.lickersEx=true;
        }
        return false;
      });
    } );
    return this.lickersEx;
  }



}
