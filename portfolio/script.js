
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speed = Math.random() * 0.5 + 0.2;
    this.opacity = Math.random();
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }
}

const stars = [];
for (let i = 0; i < 150; i++) stars.push(new Star());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => { s.draw(); s.update(); });
  requestAnimationFrame(animate);
}

animate();

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));



<script src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.6.0/lib/qr-code-styling.js"></script>



const qrCode = new QRCodeStyling({
  width: 220,
  height: 220,
  data: "https://jjlin16.github.io/mypage/",
  margin: 5,

  dotsOptions: {
    color: "#38bdf8",
    type: "rounded"
  },

  backgroundOptions: {
    color: "#ffffff"
  },

  cornersSquareOptions: {
    color: "#0f172a",
    type: "extra-rounded"
  },

  cornersDotOptions: {
    color: "#38bdf8"
  },

  imageOptions: {
    crossOrigin: "anonymous",
    margin: 5
  },

  // Add your logo here
  image: "images/logo.png"  // <-- path to your logo
});

qrCode.append(document.getElementById("qr-code"));

const downloadBtn = document.getElementById("download-qr");

downloadBtn.addEventListener("click", () => {
  qrCode.getRawData("png").then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "JJLin16_Portfolio_QR.png"; // filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
