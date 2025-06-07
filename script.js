const buildData = [
  { id: 'houses', title: '🏡 Houses', desc: 'Cozy wooden and stone houses designed for each player.' },
  { id: 'farms', title: '🌾 Farms', desc: 'Carrot, Wheat, XP, Tree farms and more!' },
  { id: 'carnival', title: '🎡 Carnival', desc: 'Fun games and builds inspired by amusement parks.' },
  { id: 'beach', title: '🏖️ Beach & Turtle Area', desc: 'Relaxing beach zone with a turtle enclosure.' },
  { id: 'ravine', title: '🐟 Axolotl Ravine', desc: 'A transformed ravine into a vibrant axolotl habitat.' },
  { id: 'market', title: '🛍️ Villager Market', desc: 'Trade hub with custom-decorated villager stalls.' },
  { id: 'pool', title: '🍹 Pool & Minibar', desc: 'A relaxation spot with a refreshing water pool and drinks!' },
  { id: 'brewing', title: '🧪 Brewing Area', desc: 'Potion brewing and enchantment zone.' },
  { id: 'townhall', title: '🏛️ Town Hall', desc: 'The central building that brings everything together.' },
];

const imageMap = {
  houses: ['images/houses1.jpg', 'images/houses2.jpg', 'images/houses3.jpg'],
  farms: ['images/farms1.jpg', 'images/farms2.jpg', 'images/farms3.jpg', 'images/farms4.jpg', 'images/farms5.jpg', 'images/farms6.jpg', 'images/farms7.jpg', 'images/farms8.jpg', 'images/farms9.jpg'],
  carnival: ['images/carnival1.jpg', 'images/carnival2.jpg', 'images/carnival3.jpg', 'images/carnival4.jpg'],
  beach: ['images/beach1.png', 'images/beach2.png'],
  ravine: ['images/ravine1.jpg', 'images/ravine2.png'],
  market: ['images/market1.png', 'images/market2.png', 'images/market3.png', 'images/market4.png', 'images/market5.png', 'images/market6.png'],
  pool: ['images/pool1.jpg', 'images/pool2.png', 'images/pool3.png'],
  brewing: ['images/brewing1.png', 'images/brewing2.png'],
  townhall: ['images/townhall1.png', 'images/townhall2.png', 'images/townhall3.png', 'images/townhall4.png', 'images/townhall5.png', 'images/townhall6.png', 'images/townhall7.png', 'images/townhall8.png', 'images/townhall9.png', 'images/townhall10.png', 'images/townhall11.png'],
};

const buildSection = document.getElementById('build-section');
let activeExpanded = null;

buildData.forEach(build => {
  const card = document.createElement('div');
  card.className = 'build-card';
  card.innerHTML = `<h3>${build.title}</h3><p>${build.desc}</p>`;

  const expandedContainer = document.createElement('div');
  expandedContainer.className = 'expanded-container';
  expandedContainer.id = `expanded-${build.id}`;
  expandedContainer.style.display = 'none';

  const sliderHTML = `
    <div class="inner-slider">
      <div class="swiper-container gallery-top" id="swiper-${build.id}-main">
        <div class="swiper-wrapper">
          ${(imageMap[build.id] || []).map(img => `
            <div class="swiper-slide" style="background-image:url('${img}')"></div>
          `).join('')}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
      <div class="swiper-container gallery-thumbs" id="swiper-${build.id}-thumbs">
        <div class="swiper-wrapper">
          ${(imageMap[build.id] || []).map(img => `
            <div class="swiper-slide" style="background-image:url('${img}')"></div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  expandedContainer.innerHTML = sliderHTML;

  card.addEventListener('click', () => {
    if (activeExpanded && activeExpanded !== expandedContainer) {
      activeExpanded.style.display = 'none';
    }

    const isSame = activeExpanded === expandedContainer;
    expandedContainer.style.display = isSame ? 'none' : 'block';
    activeExpanded = isSame ? null : expandedContainer;

    if (!isSame && !expandedContainer.classList.contains('swiper-initialized')) {
      const imgList = imageMap[build.id] || [];

      const imgPromises = imgList.map(src => {
        return new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imgPromises).then(() => {
        const thumbs = new Swiper(`#swiper-${build.id}-thumbs`, {
          spaceBetween: 10,
          slidesPerView: 4,
          watchSlidesProgress: true,
        });

        const main = new Swiper(`#swiper-${build.id}-main`, {
          spaceBetween: 10,
          navigation: {
            nextEl: `#swiper-${build.id}-main .swiper-button-next`,
            prevEl: `#swiper-${build.id}-main .swiper-button-prev`,
          },
          thumbs: {
            swiper: thumbs,
          },
          on: {
            slideChange: function () {
              const activeIndex = this.activeIndex;
              const startIndex = Math.min(Math.max(activeIndex, 0), imgList.length - 4);
              thumbs.slideTo(startIndex);
            },
          },
        });

        expandedContainer.classList.add('swiper-initialized');
      });
    }
  });

  buildSection.appendChild(card);
  buildSection.appendChild(expandedContainer);
});

// Hero slider
const swiper = new Swiper('.hero-slider', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1.5,
    slideShadows: false,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
