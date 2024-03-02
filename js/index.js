import { createRow, validate } from "./function.js";

const tbody = document.querySelector('#tbody');
const form = document.getElementById('form');
const name = document.getElementById('name');
const status = document.getElementById('status');
const description = document.getElementById('description');
const price = document.getElementById('price');
const btn = document.getElementById('btn');
const tun = document.getElementById('tun');


btn && btn.addEventListener('click', function (e) {
    e.preventDefault();
    const isValid = validate(name, status, description, price);
    if (isValid) {
        btn.setAttribute('disabled', true)
        btn.innerHTML = 'Yuborilmoqda...'
        const phone = {
            name: name.value,
            status: status.value,
            description: description.value,
            price: price.value,
            category_id: 2
        }
        fetch('https://auth-rg69.onrender.com/api/products', {
            method: 'POST',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(phone)
        })
            .then(res => res.json())
            .then(data => {
                btn.removeAttribute('disabled')
                btn.innerHTML = 'Saqlash'
                if (data.id) {
                    let row = createRow(data, tbody.childElementCount + 1);
                    tbody.innerHTML += row;
                    form.reset();
                }
            })
    }
})

tun && tun.addEventListener("click", (e) => {
    e.preventDefault();
    if (tun.innerHTML == "Tun") {
        document.body.style.background = 'black'
        document.body.style.color = 'white'
        tun.innerHTML = "Kun";
    } else {
        tun.innerHTML = "Tun";
        document.body.style.background = 'white'
        document.body.style.color = 'black'
    }
    document.body.classList.toggle("tun");
});

const API = `https://auth-rg69.onrender.com/api/products`;

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://auth-rg69.onrender.com/api/products/all', {
        method: "GET"
    })
        .then(res => {
            if (res.status == 200) {
                return res.json();
            }
        })
        .then(data => {
            if (data.length) {
                data.forEach((phone, index) => {
                    let row = createRow(phone, index + 1);
                    tbody.innerHTML += row
                });

                const deleteButtons = document.querySelectorAll('i.fa-trash-can');

                if (deleteButtons.length) [
                    deleteButtons.forEach(del => {
                        del.addEventListener('click', function () {
                            let isDelete = confirm('Rostdan ham ushbu malumotni ochirmohchimisiz?');
                            if (isDelete) {
                                let id = this.parentNode.getAttribute('data-id');
                                if (id) {
                                    fetch(`${API}/${id}`, {
                                        method: 'DELETE'
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
                                                window.location.reload();
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                }
                            }

                        })
                    })
                ]
            }
        })
        .catch(err => {
            console.log(err);
        })
})

const mask = document.querySelector(".mask");
window.addEventListener("load", (e) => {
  e.preventDefault();
  mask.classList.add("loader--hidin");
  setTimeout(() => {
    mask.remove();
  }, 2000);
});