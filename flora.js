const plantDB = [
    { name: "Monstera Deliciosa", price: 45, img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80" },
    { name: "Fiddle Leaf Fig", price: 85, img: "https://colorandchic.com/wp-content/uploads/2020/08/ColorandChicFiddleLeafFigCare-10.jpg" },
    { name: "Snake Plant", price: 30, img: "https://www.thespruce.com/thmb/JToiCM2g8ssRFBOyIvvB_G5pMDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg" },
    { name: "Rubber Tree", price: 55, img: "https://gardenerspath.com/wp-content/uploads/2021/03/Ficus-Elastica-Tineke-Variegated-Rubber-Plant.jpg" },
    { name: "Calathea Orbifolia", price: 40, img: "https://www.thespruce.com/thmb/DizsBW_GJ0-8NE8FI-qg2UPYfiw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/calathea-orbifolia-growing-guide-5270824-hero-2a3b8667f05b40a49b27da573d2486fb.jpg" },
    { name: "Sunflower", price: 120, img: "https://foodgardening.mequoda.com/wp-content/uploads/2023/03/Sunflower-growing-in-pot.jpg" },
    { name: "Blue Hydrangea", price: 25, img: "https://wallpapers.com/images/hd/blue-hydrangea-beautiful-flower-18xwip0bfsem8kkk.jpg" },
    { name: "Cactus", price: 35, img: "https://s3-eu-west-1.amazonaws.com/images.linnlive.com/cd5a3da6489c5bb8ee4b3028a823724c/eb21fb9d-2dd9-4b94-a7c5-dc262994f15e.jpg" },
    { name: "Poppy Plant", price: 50, img: "https://mobileimages.lowes.com/productimages/5716407c-b835-4412-8036-ca2cc0db069d/10470344.jpg?size=pdhism" },
    { name: "Olive Tree", price: 150, img: "https://m.media-amazon.com/images/I/71pUbBSS-AL._AC_SL1500_.jpg" },
    { name: "Bougainvillea", price: 95, img: "https://cdn.britannica.com/09/141209-050-817400B9/Bougainvillea-bloom-window-house-Greece-Mykonos.jpg" },
    { name: "Peace Lily", price: 20, img: "https://e3cwmhyoiee.exactdn.com/wp-content/uploads/2023/10/Peace-Lily-Care-Complete-Care-Guide-For-Peace-Lily-Plant-Spathiphyllum-Beginners.jpg?strip=all&lossy=1&ssl=1" },
    { name: "Rose Plant", price: 60, img: "https://www.flowersbyflourish.com/wp-content/uploads/2020/06/Square-1B0A0861-28.jpg" },
    { name: "Bamboo Plant", price: 80, img: "https://plantme.lk/wp-content/uploads/2021/01/136662343_10223728513342113_2267140588141897729_o.jpg"},
    { name: "Money Plant", price: 65, img:"https://completegardening.com/wp-content/uploads/2025/05/Bamboo-Palm-1-768x1024.jpg"}
];

let cart = [];
let qtyMap = {};


function render() {
    const grid = document.getElementById('plantGrid');
    if (!grid) return;
    grid.innerHTML = plantDB.map((p, i) => `
        <div class="card reveal">
            <img src="${p.img}" alt="${p.name}">
            <div class="card-body">
                <h3>${p.name}</h3>
                <p style="color:var(--accent); font-weight:bold">$${p.price}</p><br>
                <div id="btn-area-${i}" style="min-height:45px">
                    ${getBtnHTML(i)}
                </div>
            </div>
        </div>
    `).join('');
    handleScroll();
}

function getBtnHTML(i) {
    const qty = qtyMap[i] || 0;
    if (qty === 0) {
        return `<button class="btn btn-primary animate__animated animate__fadeIn" onclick="add(${i})">Add to Bag</button>`;
    } else {
        return `<div class="qty-control animate__animated animate__zoomIn">
                    <button onclick="changeQty(${i}, -1)">-</button>
                    <span>${qty}</span>
                    <button onclick="changeQty(${i}, 1)">+</button>
                </div>`;
    }
}

function add(i) { 
    qtyMap[i] = 1;
    cart.push(plantDB[i]); 
    update(); 
    document.getElementById(`btn-area-${i}`).innerHTML = getBtnHTML(i);
}

function changeQty(i, delta) {
    if (delta === 1) {
        qtyMap[i]++;
        cart.push(plantDB[i]);
    } else {
        qtyMap[i]--;
        const index = cart.findLastIndex(p => p.name === plantDB[i].name);
        if (index > -1) cart.splice(index, 1);
        if (qtyMap[i] === 0) delete qtyMap[i];
    }
    update();
    document.getElementById(`btn-area-${i}`).innerHTML = getBtnHTML(i);
}

function update() {
    document.getElementById('count').innerText = cart.length;
    document.getElementById('total').innerText = cart.reduce((s, x) => s + x.price, 0);
    document.getElementById('cartList').innerHTML = cart.map(x => `<p>${x.name} <span>$${x.price}</span></p>`).join('');
}

function handleScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add('active');
    });
}

window.addEventListener('scroll', handleScroll);
function openModal(id) { document.getElementById(id).style.display = "block"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }

function checkout() { 
    alert("Order Confirmed!"); 
    cart = []; 
    qtyMap = {};
    update(); 
    render();
    closeModal('cartModal'); 
}

const fbForm = document.getElementById('feedbackForm');
if (fbForm) {
    fbForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('fbUser').value;
        const message = document.getElementById('fbText').value;
        const content = `Flora Feedback\n\nName: ${user}\nMessage: ${message}\nDate: ${new Date().toLocaleString()}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Feedback_${user.replace(/\s+/g, '_')}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
        alert("Downloaded! Thank you.");
        closeModal('feedbackModal');
        this.reset();
    });
}

render();