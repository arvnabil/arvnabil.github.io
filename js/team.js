// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}
document.addEventListener("DOMContentLoaded", function() {
    getTeamById();
});

document.addEventListener("DOMContentLoaded", function(team) {
var urlParams = new URLSearchParams(window.location.search);
var isFromSaved = urlParams.get("saved");
var save = document.getElementById("save");
var isFavorite = false;
var idParam = urlParams.get("id");
checkFavorite(idParam);

	if (isFromSaved) {   
	    // cek koleksi kalau &saved=true maka turned_in jika dimuat dari indexed db
	    if (isFavorite) {
	      console.log("False isFavorite");
	      item.then(function(team) {
	          // Menghapus Team Apabila icon turned_in nya ditekan dan mengubahnya menjadi turned_in_not
	          deleteFavorite(team.id);
	          document.getElementById("btnAdd").innerHTML = "turned_in_not";
	          M.toast({
	            html: 'Terhapus didalam Koleksi!'
	          });
	        });
	        isFavorite = false;
	    } else {
	      console.log("True isFavorite");
	      document.getElementById("btnAdd").innerHTML = "turned_in";
	      isFavorite = true;
	    }
	  // Hide fab jika dimuat dari indexed db
	  // save.style.display = 'none';
	  // ambil artikel lalu tampilkan
	  getSavedTeamById();
	} else {
	  if(save.innerText =="turned_in_not" ){
	    isFavorite = false;
	  }
	  else{
	    isFavorite = true;
	    console.log(save.innerText);
	  }
	  var item = getTeamById();
	}

	save.onclick = function () {
	    console.log("Tombol FAB di klik.");
	    var item = getTeamById();
	    if (isFavorite) {
	      console.log("False isFavorite");
	      item.then(function(team) {
	        // Menghapus Team Apabila iconnya turned_in_not
	        deleteFavorite(team.id);
	        document.getElementById("btnAdd").innerHTML = "turned_in_not";
	        M.toast({
	          html: 'Terhapus didalam Koleksi!'
	        });
	      });
	      isFavorite = false;
	    } else {
	      console.log("True isFavorite");
	      item.then(function(team) {
	        // Menambah Team Apabila iconnya turned_in
	        saveForLater(team);
	        document.getElementById("btnAdd").innerHTML = "turned_in";
	        M.toast({
	            html: 'Berhasil Tersimpan kedalam Koleksi!'
	        });
	        console.log(team);
	      });
	      isFavorite = true;
	    }
	};
});