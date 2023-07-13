// ====================================Initialize Firebase====================================

var firebaseConfig = {
  apiKey: "AIzaSyASiY-tmOHZyF5P6aRPzlxTeWUs23tGpb0",
  authDomain: "my-projects-4513c.firebaseapp.com",
  projectId: "my-projects-4513c",
  storageBucket: "my-projects-4513c.appspot.com",
  messagingSenderId: "749926622442",
  appId: "1:749926622442:web:e527b6f01a453807c7e393",
  measurementId: "G-0SL2M27YLF"
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

// ===================================================================================




// ====================================File Input====================================

var fileInput = document.getElementById('input_file_option');


document.getElementById("input_file_option").addEventListener("change", () => {
  document.getElementById("file_name").innerHTML = "";
  for (let i = 0; i < fileInput.files.length; i++) {
    if (fileInput.files[i].size < 31457280) {
      document.getElementById("file_name").innerHTML += `<div> <i class="fa-solid fa-file"></i> ${i + 1}  File Name : ${fileInput.files[i].name}</div>`
    }
    else {
      document.getElementById("file_name").innerHTML += `<div> <i class="fa fa-exclamation-circle"></i> <span style="color: #a33636; text-decoration: line-through;"> ${i + 1} File Name : ${fileInput.files[i].name} </span> File size must be less than 30MB</div>`
    }
  }
  // document.getElementById("file_name").innerHTML = `<div> <i class="fa-solid fa-file"></i> File Name : ${fileInput.files[0].name}</div>`

  if (document.getElementById("folder_name_inputField").value.trim() == "") {
    document.getElementById("upload_status").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Create or Add Your Folder Name`;
  }
  else {
    document.getElementById("upload_status").innerHTML = `<div><i class="fa-solid fa-arrow-up-from-bracket"></i> Click on The Button to Upload</div>`;
  }
})

document.getElementById("folder_name_inputField").addEventListener("input", () => {
  document.getElementById("upload_status").innerHTML = `<div><i class="fa-solid fa-shield-halved"></i> Please Create A Strong Folder Name</div>`;
})


// ===================================================================================



// ====================================Drag & Drop====================================

let drop_area = document.body;

drop_area.addEventListener("dragover", function (e) {
  e.preventDefault();
  document.getElementById("drag_and_drop_sec").style.visibility = "visible";
})
drop_area.addEventListener("drop", function (e) {
  e.preventDefault();
  document.getElementById("drag_and_drop_sec").style.visibility = "hidden";
  fileInput.files = e.dataTransfer.files;

  document.getElementById("file_name").innerHTML = "";
  // document.getElementById("file_name").innerHTML = `<div> <i class="fa-solid fa-file"></i> File Name : ${fileInput.files[0].name}</div>`

  for (let i = 0; i < fileInput.files.length; i++) {
    if (fileInput.files[i].size < 31457280) {
      document.getElementById("file_name").innerHTML += `<div> <i class="fa-solid fa-file"></i> ${i + 1}  File Name : ${fileInput.files[i].name}</div>`
    }

    else {
      document.getElementById("file_name").innerHTML += `<div> <i class="fa fa-exclamation-circle"></i> <span style="color: #a33636; text-decoration: line-through;"> ${i + 1} File Name : ${fileInput.files[i].name} </span> File size must be less than 30MB</div>`

    }
  }
  if (document.getElementById("folder_name_inputField").value.trim() == "") {
    document.getElementById("upload_status").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Create or Add Your Folder Name`;
  }
  else {
    document.getElementById("upload_status").innerHTML = `<div><i class="fa-solid fa-arrow-up-from-bracket"></i> Click on The Button to Upload</div>`;
  }
})


// ===================================================================================



// ====================================Upload File====================================

function upload_file() {

  let folder_name = document.getElementById("folder_name_inputField").value;
  let input_file_option = document.getElementById("input_file_option").value;

  if (folder_name.trim() != "" && input_file_option != "") {

    // document.getElementById("file_name").innerHTML = "";

    for (let i = 0; i < fileInput.files.length; i++) {

      var file = fileInput.files[i];

      if (fileInput.files[i].size < 31457280) {

        let tz = Math.round(((new Date().getTime()) / 100));
        var storageRef = storage.ref().child(`${folder_name}/${tz}_${file.name}`);

        var uploadTask = storageRef.put(file);

        document.getElementById("file_name").innerHTML += `<div><i class="fa fa-check-square-o"></i> ${i + 1} : ${file.name} </div>`;

        uploadTask.on('state_changed', function (snapshot) {

          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          document.getElementById("upload_status").innerHTML = `<div><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload progress: ${progress}%</div>`

        }, function (error) {
          console.error('Error uploading:', error);
        }, function () {

          document.getElementById("upload_status").innerHTML = `<div><i class="fa-solid fa-cloud-sun"></i> Uploaded successfully</div>`

          document.getElementById("input_file_option").value = "";

          document.getElementById("upload_status").innerHTML += `<div><i class="fa fa-user" aria-hidden="true"></i> Your Folder Name: ${folder_name}</div>`;

        });
      }
      else {
        document.getElementById("file_name").innerHTML += `<div style="color: #a33636; text-decoration: line-through;" ><i class="fa fa-exclamation-circle"></i> ${i + 1} : ${file.name} </div>`;

      }
    }
  }

  else if (folder_name.trim() == "") {
    document.getElementById("upload_status").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Create or Add Your Folder Name`
  }

  else if (input_file_option == "") {
    document.getElementById("upload_status").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Please Select at Least One File.`
  }
}

// ===================================================================================





// ====================================Download File====================================

function get_file() {

  let code = document.getElementById("your_code").value;

  if (code.trim() != "") {

    document.getElementById("dlink").innerHTML = "";
    document.getElementById("data_lodar_ani").style.display = "block";

    var folderPath = `${code}`;

    var folderRef = storage.ref().child(folderPath);

    let s = 0;
    folderRef.listAll().then(function (result) {

      var fileListElement = document.getElementById('fileList');

      result.items.forEach(function (fileRef) {
        s++;

        fileRef.getDownloadURL().then(function (downloadURL) {

          document.getElementById("dlink").innerHTML += `
          
                <a href="${downloadURL}" target="_blank" download>
                  <div class="card">
                      <span></span>
                      <div class="content"><i class="fa-solid fa-file"></i> ${(fileRef.name).slice(12)}</div>
                  </div>
                </a>
                `;
        });
      });

      if (s == 0) {
        document.getElementById("your_files_heading").innerHTML = `<p>Not Found <i class="fa-solid fa-poo"></i></p> `;
      }
      else {
        document.getElementById("your_files_heading").innerHTML = `<div><i class="fa-solid fa-file"></i> Your Files : </div>`;
      }
      document.getElementById("data_lodar_ani").style.display = "none";

    }).catch(function (error) {
      console.error('Error retrieving file list:', error);
    });


  }
  else {
    document.getElementById("your_files_heading").innerHTML = `<div><i class="fa-solid fa-triangle-exclamation"></i> Enter Your Folder Name</div>`

  }
}


// ================================================================================





