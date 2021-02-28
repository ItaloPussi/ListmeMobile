import Firebase from 'firebase'

export default function FirebaseSetup(setTodos){
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
    
      const storage = Firebase.storage().ref('tasks')
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

