"use strict";
let modal = document.querySelector("#modal");

document.addEventListener("DOMContentLoaded", get);

function get() {
  fetch("https://todolist-3ee7.restdb.io/rest/todolist", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c825badcac6621685acbcb9	",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => {
      console.table(data);
      data.forEach(show);
    });
}

function post(newNote) {
  const postData = JSON.stringify(newNote);

  //This sections runds right away
  fetch("https://todolist-3ee7.restdb.io/rest/todolist", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c825badcac6621685acbcb9	",
      "cache-control": "no-cache"
    },
    body: postData
  }) //This section below is the section there is a little delayed.
    .then(res => res.json())
    .then(data => {
      console.log(data);
      show(data);
      form.elements.submit.disabled = false;
    });
}

//is when a page load. --> you don't know when it's done.
get();

const form = document.querySelector("#addNote");
form.addEventListener("submit", e => {
  form.elements.submit.disabled = true; //Nothing runs before this line is done loading.
  e.preventDefault();
  console.log("submitted");
  const obj = {
    subject: document.querySelector('input[name="subject"]').value,
    textarea: document.querySelector('input[name="textarea"]').value
  };

  post(obj);
});

//REMOVE A BRAND
function remove(id) {
  fetch("https://todolist-3ee7.restdb.io/rest/todolist/" + id, {
    method: "delete",

    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c825badcac6621685acbcb9",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

//SHOW ON THE SCREEN
function show(note) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);

  clone.querySelector("h1").textContent = note.subject;
  clone.querySelector("h2").textContent = note.textarea;
  clone.querySelector("article").dataset.id = note._id;
  clone.querySelector("button").addEventListener("click", e => {
    e.target.parentElement.remove();
    remove(note._id);
    visModalRemove(note);
  });

  document.querySelector("main").appendChild(clone);
}

//MODAL FOR REMOVING
function visModalRemove(sletter) {
  modal.classList.add("vis");

  modal.querySelector(".modal-remove_info").textContent;

  modal.querySelector("button").addEventListener("click", skjulModalRemove);
}
function skjulModalRemove() {
  modal.classList.remove("vis");
}
