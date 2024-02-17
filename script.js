const track = document.getElementById("img_container");
let isMouseDown = false;

const updatePosition = (nextPercentage) => {
  track.dataset.percentage = nextPercentage;

  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
};

const handleOnDown = (e) => {
  isMouseDown = true;
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  isMouseDown = false;
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage || "0";
};

const handleOnMove = (e) => {
  if (!isMouseDown) return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );

  updatePosition(nextPercentage);
};

const handleOnWheel = (e) => {
  const wheelDelta = e.deltaY;
  const currentPercentage = parseFloat(track.dataset.percentage || "0");
  const nextPercentageUnconstrained = currentPercentage + wheelDelta / 100;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );

  updatePosition(nextPercentage);
};
window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);
window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("#img_container .image");

  const toggleImageSize = (e) => {
    const img = e.target;

    if (img.classList.contains("image-enlarged")) {
      img.classList.remove("image-enlarged");
    } else {
      images.forEach((i) => i.classList.remove("image-enlarged"));

      img.classList.add("image-enlarged");
    }
  };
  images.forEach((image) => {
    image.addEventListener("click", toggleImageSize);
  });
});

/* Gestion image BG onlick */
document.addEventListener("DOMContentLoaded", () => {
  const imgContainer = document.querySelector("#img_container");
  imgContainer.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("image")) {
      document.body.style.backgroundImage = `url('${target.src}')`;
    }
  });
});
/* Apparition icon full screen */
document.addEventListener("DOMContentLoaded", () => {
  const imgContainer = document.getElementById("img_container");
  imgContainer.addEventListener("click", (event) => {
    const image = event.target.closest(".image");
    if (!image) return;
    const fullscreenIcon = image
      .closest(".image-container")
      .querySelector(".fullscreen");
    if (!fullscreenIcon.classList.contains("fullscreen-visible")) {
      document.querySelectorAll(".fullscreen").forEach((icon) => {
        icon.classList.remove("fullscreen-visible");
      });
      fullscreenIcon.classList.add("fullscreen-visible");
    } else {
      fullscreenIcon.classList.remove("fullscreen-visible");
    }
  });
});

/* Gestion fullscreen */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fullscreen").forEach((fullscreenIcon) => {
    fullscreenIcon.addEventListener("click", () => {
      document
        .querySelector(".exit-fullscreen")
        .classList.add("exit-fullscreen_visible");
      document.querySelector(".overlay").classList.remove("overlay_visible");
      document.querySelector(".slider").classList.add("slider_hidden");

      fullscreenIcon.classList.remove("fullscreen-visible");

      document.querySelectorAll(".image").forEach((image) => {
        image.classList.remove("image-enlarged");
      });
    });
  });

  document.querySelector(".exit-fullscreen").addEventListener("click", () => {
    document.querySelector(".overlay").classList.add("overlay_visible");
    document.querySelector(".slider").classList.remove("slider_hidden");
    document
      .querySelector(".exit-fullscreen")
      .classList.remove("exit-fullscreen_visible");
  });
});
