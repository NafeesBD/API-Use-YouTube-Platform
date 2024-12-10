// ****** Categories Button & Categories Id API Work Start *********

// Categories Button API Work Start
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.error(error))
}
// Categories Button API Work End


// Categories Id API Work Start

function removeColorFun() {
  const removeBtnColor = document.getElementsByClassName("removeColorClass")
  // console.log(removeBtnColor)

  for (removeClass of removeBtnColor) {
    // console.log(removeClass)
    removeClass.classList.remove("active")
  }
}

const categoryID = (id) => {
  // console.log(id)

  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {

      removeColorFun();
      const activeButton = document.getElementById(`btn-${id}`)
      activeButton.classList.add("active", "hover:bg-[#FF1F3D]")


      loadVideos(data.category)
    })
    .catch(error => console.log(error))
}

// Categories Id API Work End

// Categories Button Work Start
const displayCategories = (fetchData) => {

  fetchData.forEach(categoriesItem => {
    // console.log(categoriesItem.category)

    const categoriesParent = document.getElementById("categoriesContainer");
    // Categories Id Work Start

    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML =
      `
    <button id="btn-${categoriesItem.category_id}" onclick="categoryID(${categoriesItem.category_id})" class="btn removeColorClass">${categoriesItem.category}</button>
    `
    categoriesParent.append(buttonDiv);


    // Categories Id Work End

  });

}

// Categories Button Work End

loadCategories()


// ****** Categories Button & Categories Id API Work End *********



// ********************** Videos API Work Start **********************


// Call Video API
const loadVideosAPI = (searchInputValue = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInputValue}`)
    .then(res => res.json())
    .then(data => loadVideos(data.videos)) // Call loadVideos Function Arguments
    .catch(error => console.error(error))
}
// End Video API

// Call Video video_id Api Start
const modalFun = async (videoID) => {
  // console.log(videoID)

  const apiUrl = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
  const fetchUrl = await fetch(apiUrl);
  const data = await fetchUrl.json();
  displayModal(data.video);

}
// Call Video video_id Api End

// Video thumbnail & description function start

const displayModal = (videoData) => {
  // console.log(videoData)

  // document.getElementById("btnModal").click();
  document.getElementById("my_modal_5").showModal();

  const videoModal = document.getElementById("modal-content");
  videoModal.innerHTML = `
  <img class="w-full" src=${videoData.thumbnail} />
  <p>${videoData.description}</p>

  `
}

// Video thumbnail & description function end

// Call Arrow Function
const loadVideos = (loadingVideo) => {

  // Html File videos section ID Call
  const parentVideoId = document.getElementById("videos");
  parentVideoId.innerHTML = "" // parentVideoId তে যে ‍গুলো add হয়েছে সে গুলো Clear হয়ে গিয়েছে অর্থাৎ আগের গুলো clear হবে এবং পরের গুলো আবার নতুন করে add হবে

  // category length যদি 0 হয় তাহলে এটা কাজ করবে
  if (loadingVideo.length == 0) {
    parentVideoId.classList.remove("grid")
    parentVideoId.innerHTML = `
      <div class="flex justify-center items-center">
        <img src="assets/Icon.png" />
      </div>
      <h2 class="font-bold text-center text-2xl pt-5">Oops! Sorry There Is No <br> Content Here</h2>
    `;
    return;
  } else {
    parentVideoId.classList.add("grid")
  }

  // call now forEach function
  loadingVideo.forEach((forEachVideo) => {
    // console.log(forEachVideo)

    const card = document.createElement("div");
    card.classList = "card card-compact";

    // daisyui Card Design And API Call
    card.innerHTML =
      `
    <figure class="h-[200px] relative">
      <img class="w-full h-full object-cover"
        src=${forEachVideo.thumbnail} />
        
        ${forEachVideo.others.posted_date?.length == 0 ? "" :
        `<div class="absolute right-2 bottom-2 bg-black text-white p-1 rounded text-xs"> ${getTimeFun(forEachVideo.others.posted_date)}</div>`
      }

    </figure>

    <div class="py-3 flex items-center gap-3">
      <div>
        <img class="h-[50px] w-[50px] rounded-full object-cover" src=${forEachVideo.authors[0].profile_picture} />
      </div>

      <div>
        <h2 class="font-bold">${forEachVideo.title}</h2>
        
        <div class="flex gap-x-2 items-center">

          <p>${forEachVideo.authors[0].profile_name}</p>

          <div class="w-[20px]">
          ${forEachVideo.authors[0].verified === true ? `<img class="w-full" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" />` : ''}
          </div>

        </div>

        <p class="mt-3"><button onclick="modalFun('${forEachVideo.video_id}')" class="btn btn-sm">Details</button></p>

      </div>
    </div>
    `
    parentVideoId.append(card);

  })

}

document.getElementById("searchInput").addEventListener("keyup", (event) => {
  loadVideosAPI(event.target.value)
});
loadVideosAPI()

// Time Formatting Function Start

function getTimeFun(time) {

  const hourTime = parseInt(time / 3600)

  const reminderSecond = time % 3600

  const minuteTime = parseInt(reminderSecond / 60)

  const secondTime = reminderSecond % 60

  return `${hourTime} Hours ${minuteTime} Minute ${secondTime} Second`

}

// Time Formatting Function End

// ********************** Videos API Work End **********************
