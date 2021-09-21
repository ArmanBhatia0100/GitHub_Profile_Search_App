"use strict";
class App {
  avatar = document.querySelector("#avatar__img");
  fullName = document.querySelector(".info__name");
  username = document.querySelector(".info__username");
  DOJ = document.querySelector(".info__date");
  bio = document.querySelector("#info__para");
  repos = document.querySelector("#repo");
  followers = document.querySelector("#followers");
  followings = document.querySelector("#following");
  tweetter = document.querySelector("#tweeter");
  userLocation = document.querySelector("#location");
  link = document.querySelector("#link");
  dataRequest = new XMLHttpRequest();
  searchInput = document.querySelector("#searchbar_input");
  searchBtn = document.querySelector("#search__btn");
  constructor() {
    this.searchBtn.addEventListener("click", this._get.bind(this));
  }
  _get() {
    let username = this.searchInput.value;
    if (!username) {
      this.searchInput.value = "";
      return;
    } else {
      this.dataRequest.open("GET", `https://api.github.com/users/${username}`);
      this.dataRequest.send();
      this.dataRequest.addEventListener("load", getData.bind(this));

      function getData() {
        let data = JSON.parse(this.dataRequest.responseText);
        link.setAttribute("href", data["url"]);
        this.bio.textContent = data["bio"];
        this.fullName.textContent = data["login"]
          ? data["login"]
          : "Not Available";
        this.username.textContent = data["name"];
        this.avatar.setAttribute("src", data["avatar_url"]);
        this.userLocation.textContent = data["location"]
          ? data["location"]
          : "Not Available";
        this.tweetter.textContent = data["twitter_username"]
          ? data["twitter_username"]
          : "Not Available";
        this.repos.textContent = data["public_repos"];
        this.followers.textContent = data["followers"];
        this.followings = data["following"];
        this.link.setAttribute("href", data["blog"]);
        this.link.textContent = data["blog"] ? data[blog] : "Not Available";
        this.searchInput.value = "";
      }
    }
  }
}

const app = new App();
