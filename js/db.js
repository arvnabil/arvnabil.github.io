var dbPromised = idb.open("boladb", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
     	var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    	keyPath: "id"
  		});
	  	teamsObjectStore.createIndex("name", "name", {
	    unique: false
	  	});
    }
  });

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Team berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getAllByName(name) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      var titleIndex = store.index("name");
      var range = IDBKeyRange.bound(name, name + "\uffff");
      return titleIndex.getAll(range);
    })
    .then(function(teams) {
      console.log(teams);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function checkFavorite(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.get(id);
        }).then(function (favorite) {
            if(favorite !== undefined){
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

function deleteFavorite(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            store.delete(id);
            return tx.complete;
        }).then(function () {
            console.log("id", id, "Berhasil Terhapus!");
        })
    })
}