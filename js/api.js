var base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
 
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  console.log("Error : " + error);
}

// Verifikasi token
const api_token = '09d1cc9e06064435acf8bc699b8a10e9'
let fetchApi = base_url => {
  return fetch(base_url, {
    headers: {
    'X-Auth-Token': api_token
    }
  });
}

// ***********************************************************************************************************************
//                                               GET TEAMS SCRIPT
// ***********************************************************************************************************************

function getTeams() {
  // Memuat Data dari Cache
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/teams", { mode: 'no-cors'}, {
      headers: {
      'X-Auth-Token': api_token
      }
    }).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var teamsHTML = "";
          data.teams.forEach(function(team) {
          //gambar yang di ambil dari fetch API
          let urlTeamImage = team.crestUrl;
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');

          teamsHTML += `
          <div class="col s12 m4" >
            <div class="card hoverable">
              <div class="card-image">
                  <img class="responsive-img" src="${urlTeamImage}" style="width:300px; height: 320px;">
              </div>
              <div class="card-content">
                  <p class="grey-text">${new Date(team.lastUpdated).toDateString()}</p>
                  <h5 style="font-weight: bold;">${team.shortName}</h5>
                  <h6 style="font-style="underline">${team.name}</h6>
                  <p class=" grey-text text-darken-2">${team.venue}</p>
              </div>
              <div class="card-action">
              <a href="./team.html?id=${team.id}" class="deep-orange-text">Lihat Profile</a>
              </div>
            </div>
          </div>  
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamsHTML;
        });
      }
    });
  }

  // Memuat Data Teams
  fetch(base_url + "competitions/2021/teams", {
    headers: {
    'X-Auth-Token': api_token
    }
  }).then(status)
    .then(json)
    .then(function(data) {
      // Menyusun komponen card secara dinamis
      var teamsHTML = "";
      data.teams.forEach(function(team) {
      //gambar yang di ambil dari fetch API
      let urlTeamImage = team.crestUrl;
      //mutasi variable agar url http menjadi https
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
      teamsHTML += `
      <div class="col s12 m4" >
        <div class="card hoverable">
            <div class="card-image">
              <img class="responsive-img" src="${urlTeamImage}" style="width:300px; height: 320px;">
            </div>
            <div class="card-content">
              <p class="grey-text">${new Date(team.lastUpdated).toDateString()}</p>
              <h5 style="font-weight: bold;">${team.shortName}</h5>
              <h6 style="font-style="underline">${team.name}</h6>
              <p class=" grey-text text-darken-2">${team.venue}</p>
            </div>
            <div class="card-action">
            <a href="./team.html?id=${team.id}" class="deep-orange-text">Lihat Profile</a>
            </div>
          </div>
        </div>`;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    }).catch(error);
}

// ***********************************************************************************************************************
//                                               TEAM BY ID SCRIPT
// ***********************************************************************************************************************

function getTeamById() {
  return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  if("caches" in window){
    caches.match(base_url + "teams/" + idParam, { mode: 'no-cors'}, {
      headers: {
      'X-Auth-Token': api_token
      }
    }).then(function(response){
        if(response){
          response.json().then(function(data){
          //gambar yang di ambil dari fetch API
          let urlTeamImage = data.crestUrl;
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
          var teamHTML = `
          <div class="container">
            <div class="col s12 m9">
              <div class="card horizontal">
                <div class="card-image responsive-img">
                    <img src="${urlTeamImage}" style="padding:5px;" width="200px" height="200px">
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                      <p><b> Name      </b> : ${data.name}</p>
                      <p><b>Short Name    </b> : ${data.shortName}</p>
                      <p><b>TLA          </b> : ${data.tla}</p>
                      <p><b>Address       </b> : ${data.address}</p>
                      <p><b>Phone         </b> : ${data.phone}</p>
                      <p><b>Stadion       </b> : ${data.venue}</p>
                      <p><b>Website       </b> : ${data.website}</p>
                  </div>
                  <div class="card-action">
                      <a href="${data.website}" target="_BLANK">Go to the website</a>
                  </div>
                </div>
              </div>
            </div>  
            </div>
            <div class="container">
            <h3> Squad Team </h3>
            <ul class="collection">`;
            data.squad.forEach(function(squad) {
            teamHTML += `
            <li class="collection-item avatar">
              <img src="${urlTeamImage}" alt="" class="circle">
              <span class="title"><b>Name :</b> ${squad.name}</span>
              <p>
              <b>Position :</b> ${squad.position} <br>
              <b>Date Of Birth :</b> ${squad.countryOfBirt}, ${new Date(squad.dateOfBirth).toDateString()} <br>
              <b>Nationality :</b> ${squad.nationality}<br>

              </p>
              <a href="#!" class="secondary-content">
              <i class="material-icons">grade</i>
              <i class="material-icons">grade</i>
              <i class="material-icons">grade</i></a>
            </li>`;
          });
            teamHTML+=`
            </ul>
            <div class="center">
              <a href="./" class="btn-small center waves-effect waves-light yellow accent-4"><i class="material-icons" >arrow_back</i> Kembali </a>
            </div>
            </div>`;
            document.getElementById("body-content").innerHTML = teamHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
    });
  } 
  fetch(base_url + "teams/" + idParam, {
    headers: {
    'X-Auth-Token': api_token
    }
  }).then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      let urlTeamImage = data.crestUrl;
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
      // Menyusun komponen card artikel secara dinamis
      var teamHTML = `
      <div class="container">
        <div class="col s12 m9">
          <div class="card horizontal">
            <div class="card-image responsive-img">
                <img src="${urlTeamImage}" style="padding:5px;" width="200px" height="200px">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p><b> Name      </b> : ${data.name}</p>
                <p><b>Short Name    </b> : ${data.shortName}</p>
                <p><b>TLA          </b> : ${data.tla}</p>
                <p><b>Address       </b> : ${data.address}</p>
                <p><b>Phone         </b> : ${data.phone}</p>
                <p><b>Stadion       </b> : ${data.venue}</p>
                <p><b>Website       </b> : ${data.website}</p>
              </div>
              <div class="card-action">
                <a href="${data.website}" target="_BLANK">Go to the website</a>
              </div>
            </div>
          </div>
        </div>  
      </div>
      <div class="container">
      <h3> Squad Team </h3>
      <ul class="collection">`;
      data.squad.forEach(function(squad) {
      teamHTML += `
          <li class="collection-item avatar">
            <img src="${urlTeamImage}" alt="" class="circle">
            <span class="title"><b>Name :</b> ${squad.name}</span>
            <p>
            <b>Position :</b> ${squad.position} <br>
            <b>Date Of Birth :</b> ${squad.countryOfBirth}, ${new Date(squad.dateOfBirth).toDateString()} <br>
            <b>Nationality :</b> ${squad.nationality}<br>

            </p>
            <a href="#!" class="secondary-content">
            <i class="material-icons">grade</i>
            <i class="material-icons">grade</i>
            <i class="material-icons">grade</i></a>
          </li>`;
      });
      teamHTML+=`
      </ul>
        <div class="center">
          <a href="./" class="btn-small center waves-effect waves-light yellow accent-4"><i class="material-icons" >arrow_back</i> Kembali </a>
        </div>
      </div>`;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = teamHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);
    });
  });
}
// ***********************************************************************************************************************
//                                               KLASEMEN SCRIPT
// ***********************************************************************************************************************
function getStandings() {
  // Memuat Data dari Cache
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/standings", { mode: 'no-cors'}, {
      headers: {
      'X-Auth-Token': api_token
      }
    }).then(function(response) {
    if (response) {
    response.json().then(function (data) {
    // Menyusun komponen card secara dinamis
    var standingsHTML = "";
    standingsHTML +=`
    <div class="blue center" style="margin: 5px; padding: 10px; border: 4px solid black; border-radius: 10px;">
      <h3>Klasemen ${data.competition.name}</h3>
      <h5>Season : ${new Date(data.season.startDate).toDateString()} - ${new Date(data.season.endDate).toDateString()}</h5>
    </div>`;
    data.standings.forEach(function(standings) {
    standingsHTML += `
    <br>
    <h6><b>${standings.stage} : ${standings.type}</b></h6>
    <table class="highlight stripped green lighten-2 collection" style="padding: 10px;">
    <thead>
      <tr>
        <th>No</th>
        <th>Team</th>
        <th>PG</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>P</th>
      </tr>
    </thead>
    <tbody>`;
    standings.table.forEach(function(tbl) {
    //gambar yang di ambil dari fetch API
    let urlTeamImage = tbl.team.crestUrl;
    urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
    standingsHTML += `
    <tr>
      <td>${tbl.position}</td>
      <td><img src="${urlTeamImage}" alt="" width="30" height="auto" style="position:absolute; margin-right:10px;"/><p style="margin-left:50px;"><a href="./team.html?id=${tbl.team.id}" class="black-text text-darken-2">${tbl.team.name}</a></p></td>
      <td>${tbl.playedGames}</td>
      <td>${tbl.won}</td>
      <td>${tbl.draw}</td>
      <td>${tbl.lost}</td>
      <td>${tbl.points}</td>
    </tr>`;
    });
    standingsHTML +=`
      </tbody>
    </table>`;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("standings").innerHTML = standingsHTML;
    });
    }  
    });
  }

  //Memuat Data Standing
  fetchApi(base_url + "competitions/2021/standings", { mode: 'no-cors'}, {
      headers: {
      'X-Auth-Token': api_token
      }
    }).then(status)
    .then(json)
    .then(function(data) {
    // Objek/array JavaScript dari response.json() masuk lewat data.
    // Menyusun komponen card secara dinamis
  
    var standingsHTML = "";
    standingsHTML +=`
    <div class="blue center" style="margin: 5px; padding: 10px; border: 4px solid black;
    border-radius: 10px;">
    <h3>Klasemen ${data.competition.name}</h3>
    <h5>Season : ${new Date(data.season.startDate).toDateString()} s/d ${new Date(data.season.endDate).toDateString()}</h5>
    </div>`;
    data.standings.forEach(function(standings) {
    standingsHTML += `
    <br>
    <h6><b>${standings.stage} : ${standings.type}</b></h6>
    <table class="highlight stripped green lighten-2 collection" style="padding: 10px;">
    <thead>
        <tr>
          <th>No</th>
          <th>Team</th>
          <th>PG</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>P</th>
        </tr>
    </thead>
    <tbody>`;
    standings.table.forEach(function(tbl) {
    //gambar yang di ambil dari fetch API
    let urlTeamImage = tbl.team.crestUrl;
    urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
    standingsHTML += `
    <tr>
      <td>${tbl.position}</td>`;
      standingsHTML +=`
      <td><img src="${urlTeamImage}" alt="" width="30" height="auto" style="position:absolute; margin-right:10px;"/><p style="margin-left:50px;"><a href="./team.html?id=${tbl.team.id}" class="black-text text-darken-2">${tbl.team.name}</a></p></td>`;
      standingsHTML +=`
      <td>${tbl.playedGames}</td>
      <td>${tbl.won}</td>
      <td>${tbl.draw}</td>
      <td>${tbl.lost}</td>
      <td>${tbl.points}</td>
    </tr>`;
    });
    standingsHTML +=`
        </tbody>
    </table>`;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("standings").innerHTML = standingsHTML;
    }).catch(error);
}

// ***********************************************************************************************************************
//                                               GET JADWAL SCRIPT
// ***********************************************************************************************************************
function getJadwal() {
  // Memuat Data dari Cache
  if ('caches' in window) {
    caches.match(base_url + "competitions/2021/matches?status=SCHEDULED", { mode: 'no-cors'}, {
      headers: {
      'X-Auth-Token': api_token
      }
    }).then(function(response) {
    if (response) {
      response.json().then(function (data) {
    // Menyusun komponen card secara dinamis
    var jadwalHTML = "";
    jadwalHTML +=`
    <div class="blue center" style="margin: 5px; padding: 10px; border: 4px solid black; border-radius: 10px;">
    <h3>Jadwal ${data.competition.name}</h3>
    <h5>Last Update : ${new Date(data.competition.lastUpdated).toDateString()}</h5>
    <h6> Season : Regular Season</h6> 
    </div>
    <br>
    <table class="highlight stripped yellow lighten-2 collection responsive-table" style="padding: 10px;">
    <thead>
        <tr>
          <th>Schedule</th>
          <th>Away</th>
          <th>Home</th>
          <th>Status</th>
        </tr>
    </thead>
    <tbody>`;
    data.matches.forEach(function(match) {
      jadwalHTML += `
      <tr>
        <td>${new Date(match.utcDate).toDateString()}</td>
        <td>${match.awayTeam.name}</td>
        <td>${match.homeTeam.name}</td>
        <td>${match.status}</td>
      </tr>`;
    });
    jadwalHTML +=`
    </tbody>
    </table>`;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("matches").innerHTML = jadwalHTML;
    });
    } 
    });
  }

  //Memuat Data Jadwal
  fetchApi(base_url + "competitions/2021/matches?status=SCHEDULED",  { mode: 'no-cors'}, {
      headers: {
      'X-Auth-Token': api_token
      }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card secara dinamis
      var jadwalHTML = "";
      jadwalHTML +=`
      <div class="blue center" style="margin: 5px; padding: 10px; border: 4px solid black;
      border-radius: 10px;">
      <h3>Jadwal ${data.competition.name}</h3>
      <h5>Last Update : ${new Date(data.competition.lastUpdated).toDateString()}</h5>
      <h6> Season : Regular Season</h6> 
      </div>
      <br>
      <table class="highlight stripped yellow lighten-2 collection responsive-table" style="padding: 10px;">
      <thead>
          <tr>
            <th>Schedule</th>
            <th>Away</th>
            <th>Home</th>
            <th>Status</th>
          </tr>
      </thead>
      <tbody>`;
      data.matches.forEach(function(match) {
      jadwalHTML += `
      <tr>
        <td>${new Date(match.utcDate).toDateString()}</td>
        <td>${match.awayTeam.name}</td>
        <td>${match.homeTeam.name}</td>
        <td>${match.status}</td>
      </tr>`;
      });
      jadwalHTML +=`
      </tbody>
      </table>`;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("matches").innerHTML = jadwalHTML;
    }).catch(error);
}

// ***********************************************************************************************************************
//                                               GET SAVED SCRIPT
// ***********************************************************************************************************************
function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    var teamsHTML = "";
    teams.forEach(function(team) {
    //gambar yang di ambil dari fetch API
    let urlTeamImage = team.crestUrl;
    urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');

    teamsHTML += `
    <div class="col s12 m4" >
      <div class="card hoverable">
        <div class="card-image">
            <img class="responsive-img" src="${urlTeamImage}" style="width:300px; height: 320px;">
        </div>
        <div class="card-content">
            <p class="grey-text">${new Date(team.lastUpdated).toDateString()}</p>
            <h5 style="font-weight: bold;">${team.shortName}</h5>
            <h6 style="font-style="underline">${team.name}</h6>
            <p class=" grey-text text-darken-2">${team.venue}</p>
        </div>
        <div class="card-action">
          <a href="./team.html?id=${team.id}&saved=true" class="deep-orange-text">Lihat Profile</a>
        </div>
      </div>
    </div>  
          `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(team) {
    //gambar yang di ambil dari fetch API
    let urlTeamImage = team.crestUrl;
    urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://');
    var teamHTML = `
    <div class="container">
      <div class="col s12 m9">
        <div class="card horizontal">
          <div class="card-image responsive-img">
              <img src="${urlTeamImage}" style="padding:5px;" width="200px" height="200px">
          </div>
          <div class="card-stacked">
            <div class="card-content">
                <p><b> Name      </b> : ${team.name}</p>
                <p><b>Short Name    </b> : ${team.shortName}</p>
                <p><b>TLA          </b> : ${team.tla}</p>
                <p><b>Address       </b> : ${team.address}</p>
                <p><b>Phone         </b> : ${team.phone}</p>
                <p><b>Stadion       </b> : ${team.venue}</p>
                <p><b>Website       </b> : ${team.website}</p>
            </div>
            <div class="card-action">
                <a href="${team.website}" target="_BLANK">Go to the website</a>
            </div>
          </div>
        </div>
      </div>  
      </div>
      <div class="container">
      <h3> Squad Team </h3>
      <ul class="collection">`;
      team.squad.forEach(function(squad) {
      teamHTML += `
      <li class="collection-item avatar">
        <img src="${urlTeamImage}" alt="" class="circle">
        <span class="title"><b>Name :</b> ${squad.name}</span>
        <p>
        <b>Position :</b> ${squad.position} <br>
        <b>Date Of Birth :</b> ${squad.countryOfBirt}, ${new Date(squad.dateOfBirth).toDateString()} <br>
        <b>Nationality :</b> ${squad.nationality}<br>

        </p>
        <a href="#!" class="secondary-content">
        <i class="material-icons">grade</i>
        <i class="material-icons">grade</i>
        <i class="material-icons">grade</i></a>
      </li>`;
    });
      teamHTML+=`
      </ul>
      <div class="center">
        <a href="./" class="btn-small center waves-effect waves-light yellow accent-4"><i class="material-icons" >arrow_back</i> Kembali </a>
      </div>
      </div>`;
      document.getElementById("body-content").innerHTML = teamHTML;
  });
}