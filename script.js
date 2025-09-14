// ====== Data anime ======
const animeData = [
  {id:1, title:"Overlord Movie 3", thumb:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9fDI0GaD5RkNRVZDDE86wEfL68tMB2u_zFwAPiRnWxv7yxoxObWNFsTd-&s=10", status:"Ongoing", episodes:[
    {num:1, src:"https://short.icu/4lZNVHkOJ"},
    {num:2, src:"https://www.w3schools.com/html/movie.mp4"}
  ]},
  {id:2, title:"Throne of Seal Movie: Electrolux Sub Indo", thumb:"https://static.wikia.nocookie.net/7374f95d-7da1-414e-8dd0-da3fbd832506/scale-to-width/755", status:"Complete", episodes:[
    {num:1, src:"https://ok.ru/videoembed/9975931079346"}
  ]},
  {id:3, title:"Soul Land Movie: Sword Dao Chen Xin Sub Indo", thumb:"https://static.wikia.nocookie.net/soulland/images/e/e8/Sword_Dao_Chen_Xin_-_Poster.png/revision/latest?cb=20250719054917", status:"Ongoing", episodes:[
    {num:1, src:"https://ok.ru/videoembed/1018966855134"}
  ]},
   {id:4, title:"Given Movie 2: Hiiragi Mix Sub Indo",
  thumb:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTijX0z-blBVBh_kikCsQWp1xXRFozuIsfjtkwYhbaNmg&s=10", status:"Complete", episodes:[
   {num:1, src:"https://short.icu/7frPHvDiW"}
   ]},
    {id:5, title:"Shingeki no Kyojin Movie: Kanketsu-hen – The Last Attack Sub Indo",
  thumb:"https://titipjepang.com/wp-content/uploads/2024/11/BLOG-Attack-on-Titan-The-Last-Attack-scaled.jpg", status:"Complete", episodes:[
   {num:1, src:"https://short.icu/dh6SQbM-9"}
   ]}
];

// ====== Index Page ======
const animeListEl = document.getElementById('animeList');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const resetBtn = document.getElementById('resetBtn');
const skeletonWrapper = document.getElementById('skeletonWrapper');

if(animeListEl){

  // Render Anime Cards
  function renderList(data){
    animeListEl.innerHTML='';
    skeletonWrapper.innerHTML='';
    data.forEach(anime=>{
      const card = document.createElement('a');
      card.className='card';
      card.href=`watch.html?id=${anime.id}`;
      card.innerHTML = `<img src="${anime.thumb}" alt="${anime.title}">
                        <div class="info">
                          <div class="title">${anime.title}</div>
                          <div class="status">${anime.status}</div>
                        </div>`;
      animeListEl.appendChild(card);
    });
  }

  // Skeleton placeholders
  function renderSkeleton(num=6){
    skeletonWrapper.innerHTML='';
    for(let i=0;i<num;i++){
      const div = document.createElement('div');
      div.className='skeleton';
      skeletonWrapper.appendChild(div);
    }
  }

  renderSkeleton();
  setTimeout(()=>renderList(animeData),800); // simulasi loading

  // Search & Filter
  function filterAndSearch(){
    let query = searchInput.value.toLowerCase();
    let status = filterSelect.value;
    let filtered = animeData.filter(a=>{
      return a.title.toLowerCase().includes(query) && (status==='all'||a.status===status);
    });
    renderList(filtered);
  }

  searchInput.addEventListener('input', filterAndSearch);
  filterSelect.addEventListener('change', filterAndSearch);
  resetBtn.addEventListener('click',()=>{
    searchInput.value='';
    filterSelect.value='all';
    renderList(animeData);
  });
}

// ====== Watch Page ======
const videoPlayer = document.getElementById('videoPlayer');
const episodesEl = document.getElementById('episodes');
const prevBtn = document.getElementById('prevEp');
const nextBtn = document.getElementById('nextEp');
const animeTitleEl = document.getElementById('animeTitle');

if(videoPlayer && episodesEl){
  const params = new URLSearchParams(window.location.search);
  const animeId = parseInt(params.get('id')) || 1;
  const anime = animeData.find(a=>a.id===animeId);
  let currentIndex = 0;

  if(animeTitleEl) animeTitleEl.textContent = anime.title;

  // Load episode
  function loadEpisode(index){
    currentIndex = index;
    videoPlayer.src = anime.episodes[index].src;
    document.querySelectorAll('.episode').forEach((e,i)=>{
      e.classList.toggle('active', i===index);
    });
    videoPlayer.scrollIntoView({behavior:'smooth'});
  }

  // Render episode list
  anime.episodes.forEach((ep,i)=>{
    const div = document.createElement('div');
    div.className='episode';
    div.textContent=`Ep ${ep.num}`;
    div.onclick = ()=>loadEpisode(i);
    episodesEl.appendChild(div);
  });

  // Prev/Next
  prevBtn.onclick = ()=> currentIndex>0 && loadEpisode(currentIndex-1);
  nextBtn.onclick = ()=> currentIndex<anime.episodes.length-1 && loadEpisode(currentIndex+1);

  loadEpisode(0);
}