window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const sharpKeys = {
    KeyE: {
      note: "c#",
      char: "e",
      linkPwm: "./sounds/keysSytrusPWM/c-s.mp3",
      linkLaser: "./sounds/keyFlexLaser/c-s.mp3",
    },
    KeyR: {
      note: "d#",
      char: "r",
      linkPwm: "./sounds/keysSytrusPWM/d-s.mp3",
      linkLaser: "./sounds/keyFlexLaser/d-s.mp3",
    },
    KeyY: {
      note: "f#",
      char: "y",
      linkPwm: "./sounds/keysSytrusPWM/f-s.mp3",
      linkLaser: "./sounds/keyFlexLaser/f-s.mp3",
    },
    KeyU: {
      note: "g#",
      char: "u",
      linkPwm: "./sounds/keysSytrusPWM/g-s.mp3",
      linkLaser: "./sounds/keyFlexLaser/g-s.mp3",
    },
    KeyI: {
      note: "a#",
      char: "i",
      linkPwm: "./sounds/keysSytrusPWM/a-s.mp3",
      linkLaser: "./sounds/keyFlexLaser/a-s.mp3",
    },
  };

  const keys = {
    KeyS: {
      note: "c",
      char: "s",
      linkPwm: "./sounds/keysSytrusPWM/c.mp3",
      linkLaser: "./sounds/keyFlexLaser/c.mp3",
    },
    KeyD: {
      note: "d",
      char: "d",
      linkPwm: "./sounds/keysSytrusPWM/d.mp3",
      linkLaser: "./sounds/keyFlexLaser/d.mp3",
    },
    KeyF: {
      note: "e",
      char: "f",
      linkPwm: "./sounds/keysSytrusPWM/e.mp3",
      linkLaser: "./sounds/keyFlexLaser/e.mp3",
    },
    KeyG: {
      note: "f",
      char: "g",
      linkPwm: "./sounds/keysSytrusPWM/f.mp3",
      linkLaser: "./sounds/keyFlexLaser/f.mp3",
    },
    KeyH: {
      note: "g",
      char: "h",
      linkPwm: "./sounds/keysSytrusPWM/g.mp3",
      linkLaser: "./sounds/keyFlexLaser/g.mp3",
    },
    KeyJ: {
      note: "a",
      char: "j",
      linkPwm: "./sounds/keysSytrusPWM/a.mp3",
      linkLaser: "./sounds/keyFlexLaser/a.mp3",
    },
    KeyK: {
      note: "b",
      char: "k",
      linkPwm: "./sounds/keysSytrusPWM/b.mp3",
      linkLaser: "./sounds/keyFlexLaser/b.mp3",
    },
  };

  const wrapper = document.querySelector(".wrapper"),
    styleTogglers = document.querySelectorAll(".style-toggler__btn"),
    notesBtn = document.querySelector(".style-toggler__btn[data-view=note]"),
    charsBtn = document.querySelector(".style-toggler__btn[data-view=char]"),
    soundTogglers = document.querySelectorAll(".sound-toggler__btn"),
    softBtn = document.querySelector(".sound-toggler__btn[data-sound=Soft]"),
    hardBtn = document.querySelector(".sound-toggler__btn[data-sound=Hard]"),
    showAddMenu = document.querySelector("#showAddMenu"),
    nextBgBtn = document.querySelector("#nextBgBtn"),
    fullScreenBtn = document.querySelector("#fullScreenBtn");

  let isActive = false;
  // let initialSaturation = 100;

  class MyAudio {
    constructor(dataKey, audioFileSrc) {
      this.dataKey = dataKey;
      this.audioFileSrc = audioFileSrc;
      this.aud = null;
    }
    render(domEl) {
      const file = this.audioFileSrc;
      const aud = new Audio(file);
      aud.dataset.key = this.dataKey;
      this.aud = aud;
      document.querySelector(domEl).insertAdjacentElement("beforeend", aud);
    }
  }

  class Key {
    constructor(className, dataKey, note, char) {
      this.className = className;
      this.dataKey = dataKey;
      this.note = note;
      this.char = char;
    }

    render = () => {
      const key = document.createElement("div");
      key.classList.add("key");
      key.classList.add(this.className);
      key.dataset.key = this.dataKey;
      key.dataset.note = this.note;
      key.dataset.char = this.char;
      const text = document.createElement("span");
      text.textContent = this.note;
      key.appendChild(text);
      return key;
    };
  }

  function setBg(wrapEl, btn) {
    let maxNum = 6;
    let i = Math.floor(Math.random() * 6 + 1);
    const changeBg = () => {
      i = i + (1 % maxNum) && i + 1 <= maxNum ? i + 1 : 1;
      const img = document.createElement("img");
      img.src = `./img/${i}.jpg`;
      img.onload = () => (wrapEl.style.backgroundImage = `url(./img/${i}.jpg)`);
    }

    wrapEl.style.backgroundImage = `url(./img/${i}.jpg)`;

    let int = setInterval(changeBg, 50000);

    btn.addEventListener("click", () => {
      clearInterval(int);
      changeBg();
      int = setInterval(changeBg, 50000)
    });

  }

  function useCharToggler(
    event,
    allTogglers,
    togglerClassName,
    toggleObjectsSelector,
    dataAttr
  ) {
    allTogglers.forEach((t) => t.classList.remove(togglerClassName));
    event.target.classList.add(togglerClassName);
    document.querySelectorAll(toggleObjectsSelector).forEach((item) => {
      item.querySelector("span").textContent = item.dataset[dataAttr];
    });
  }

  function useSoundToggler(
    event,
    allTogglers,
    togglerClassName,
    toggleObjectsSelector,
    classNameToRemove,
    classNameToAdd
  ) {
    allTogglers.forEach((t) => t.classList.remove(togglerClassName));
    event.target.classList.add(togglerClassName);
    document.querySelectorAll(toggleObjectsSelector).forEach((item) => {
      const regExp = new RegExp(`${classNameToRemove}`);
      if (item.src.match(regExp)) {
        item.src = item.src.replace(classNameToRemove, classNameToAdd);
      }
    });
  }

  // function saturate(elem, i) {
  //   elem.style.filter = `saturate(${i}%)`;
  //   i -= 1;
  //   if (i >= 100) {
  //     window.requestAnimationFrame(() => saturate(elem, i));
  //   } else {
  //     i = 100;
  //     initialSaturation = i;
  //   }
  // }

  const piano = document.createElement("div");
  piano.classList.add("piano");

  const pianoBox = document.createElement("div");
  pianoBox.classList.add("piano__box");
  piano.appendChild(pianoBox);
  wrapper.appendChild(piano);

  const sounds = [
    "future.mp3",
    "Butterfly140.mp3",
    "hearme.mp3",
    "heat.mp3",
    "master.mp3",
    "mastq.mp3",
  ];
  sounds.forEach((sound) => {
    const drum = new Audio(`./sounds/drumLoops/${sound}`);
    drum.setAttribute("loop", true);
    drum.setAttribute("controls", true);
    drum.style.width = "50%";
    drum.style.height = "30%";
    document
      .querySelector(".piano__back")
      .insertAdjacentElement("beforeend", drum);
  });

  for (let key in keys) {
    const audF = new MyAudio([key], keys[key].linkLaser);
    audF.render(".wrapper");

    const bottomKey = new Key(
      "piano__bottom-key",
      `Key${keys[key].char.toUpperCase()}`,
      keys[key].note,
      keys[key].char
    );
    pianoBox.insertAdjacentElement("beforeend", bottomKey.render());
  }

  for (let key in sharpKeys) {
    const audF = new MyAudio([key], sharpKeys[key].linkLaser);
    audF.render(".wrapper");

    const sharpKey = new Key(
      "piano__top-key",
      `Key${sharpKeys[key].char.toUpperCase()}`,
      sharpKeys[key].note,
      sharpKeys[key].char
    );
    pianoBox.insertAdjacentElement("beforebegin", sharpKey.render());
  }

  setBg(wrapper, nextBgBtn);
  wrapper.style.filter = "saturate(100%)";

  notesBtn.addEventListener("click", (e) => {
    useCharToggler(e, styleTogglers, "active", ".key", "note");
  });

  charsBtn.addEventListener("click", (e) => {
    useCharToggler(e, styleTogglers, "active", ".key", "char");
  });

  softBtn.addEventListener("click", (e) => {
    useSoundToggler(
      e,
      soundTogglers,
      "active",
      "audio",
      "keysSytrusPWM",
      "keyFlexLaser"
    );
  });

  hardBtn.addEventListener("click", (e) => {
    useSoundToggler(
      e,
      soundTogglers,
      "active",
      "audio",
      "keyFlexLaser",
      "keysSytrusPWM"
    );
  });

  window.addEventListener("keydown", (e) => {
    if (Object.keys({ ...sharpKeys, ...keys }).includes(e.code)) {
      // initialSaturation += 15;
      // window.requestAnimationFrame(() => saturate(wrapper, initialSaturation));
      const audio = document.querySelector(`audio[data-key="${e.code}"]`);
      if (!audio) return;
      audio.currentTime = 0;
      audio.play();
      isActive = true;
      document
        .querySelector(`.key[data-key="${e.code}"]`)
        .classList.add("active");
    }
  });

  window.addEventListener("keyup", (e) => {
    try {
      document
        .querySelector(`.key[data-key="${e.code}"]`)
        .classList.remove("active");
    } catch (err) {
      return false;
    }
    play(e);
    isActive = false;
  });

  const stop = (event) => {
    const t = event.target;
    if (t.classList.contains("key")) {
      t.classList.remove("active");
    } else if (t.parentElement.classList.contains("key")) {
      t.parentElement.classList.remove("active");
    }
  };

  const play = (event) => {
    // initialSaturation += 10;
    // window.requestAnimationFrame(() => saturate(wrapper, initialSaturation));
    const t = event.target;
    if (t && isActive) {
      if (t.classList.contains("key")) {
        t.classList.add("active");
        t.addEventListener("mouseout", stop);
        const audio = document.querySelector(
          `audio[data-key="${t.dataset.key}"]`
        );
        audio.currentTime = 0;
        audio.play();
      } else if (t.parentElement.classList.contains("key")) {
        t.addEventListener("mouseout", stop);
        t.parentElement.classList.add("active");
        const audio = document.querySelector(
          `audio[data-key="${t.parentElement.dataset.key}"]`
        );
        audio.currentTime = 0;
        audio.play();
      }
    }
  };

  const allKeys = document.querySelectorAll(".key");

  wrapper.addEventListener("mousedown", (event) => {
    isActive = true;
    play(event);
    allKeys.forEach((key) => {
      key.addEventListener("mouseover", play);
    });
  });

  wrapper.addEventListener("mouseup", (e) => {
    isActive = false;
    allKeys.forEach((item) => {
      item.removeEventListener("mouseover", play);
      item.classList.remove("active");
    });
  });

  fullScreenBtn.addEventListener("click", () => {
    if (
      wrapper.requestFullscreen &&
      !fullScreenBtn.classList.contains("active")
    ) {
      wrapper.requestFullscreen();
      fullScreenBtn.classList.add("active");
      wrapper.classList.add("fullscreen-enabled");
    } else if (
      document.exitFullscreen &&
      fullScreenBtn.classList.contains("active")
    ) {
      document.exitFullscreen();
      fullScreenBtn.classList.remove("active");
      wrapper.classList.remove("fullscreen-enabled");
    }
  });

  showAddMenu.addEventListener("click", () => {
    document.querySelector(".piano__back").classList.toggle("active");
    piano.classList.toggle("up");
  });
});
