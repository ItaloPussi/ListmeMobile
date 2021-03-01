import Firebase from 'firebase'
import { useEffect, useState } from 'react/cjs/react.development';

let storage;

export default function FirebaseSetup(){
    const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
      };
      // Initialize Firebase
      if(!Firebase.apps.length){
        Firebase.initializeApp(firebaseConfig)
      }else {
        Firebase.app()
      }
    
      storage = Firebase.storage().ref('tasks.json')  
} 

export const FirebaseDownload = setTodos =>{
  storage.getDownloadURL().then(async function(url){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(event) {
          let json= xhr.response;
          let items = JSON.parse(json)
          if(items){
            setTodos(items)
          }else{
            setTodos([])
          }
    };
    xhr.open('GET', url);
    xhr.send()
  })
}

export const FirebaseUpload = todos => {
  var blob = new Blob([JSON.stringify(todos)], {type: "application/json"})

  storage.put(blob).then(function(snapshot){
		console.log("Save with success")
	}).catch(e=> {
		console.error('Error', e)
	})
}

FirebaseSetup()

