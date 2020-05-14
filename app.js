new Vue({
  el: '#app',
  data() {
    return {
      projectData: {
        0 : {
          backgroundColor: 'white',
          img1: './clients.png',
          img2: './cms.png',
          img3: './crm.png',
        },
        1 : {
          backgroundColor: 'white',
          img1: './eshop.png',
          img2: './fidelite.png',
          img3: './gestion.png',
        },
        2 : {
          backgroundColor: 'white',
          img1: './marketplace.png',
          img2: './statistiques.png',
          img3: './website.png',
        },
      }
    }
  },
  mounted() {
    // GSAP variables from vue refs in the template section above
    const {
      container,
      slider,
      slides,
      scrubber,
      handle,
    } = this.$refs
    // ----------
    var options = {
      root: document.body,
      rootMargin: '0px',
      threshold: 1.0
    }
    
    var observer = new IntersectionObserver(function(){console.log('toto')}, options);
    var target = document.querySelector('.slide')
    // ----------
    
    // Other variables
    var maxScroll = slider.scrollWidth - slider.offsetWidth // total length of the slide container
    var sections = slides.length // should be 6 // number of project slides
    var slideWidth = maxScroll / (sections - 1) // width of individual card
    var scrubWidth = scrubber.getBoundingClientRect().width // width of the scrubber
    var handleWidth = scrubWidth / sections // width of handle

    var ratio = scrubWidth / (slideWidth * sections); // position ratio of scrubber to slide container

    // set the css width of the handle div
    gsap.set(handle, { width: handleWidth })

    // create the slider Draggable
    Draggable.create(slider, {
      type: "scrollLeft",
      // type: "x",
      edgeResistance: 0.5,
      bounds: container,
      throwProps: true,
      onDrag: updateHandle,
      onThrowUpdate: updateHandle,
      snap: {
        x(value) {
          return Math.round(value / slideWidth) * -slideWidth
        }
      }
    })

    function updateHandle() {
      // Set the position of handle by calculating ratio
      gsap.set(handle, { x: -this.x * ratio })
    }

    // create the handle Draggable
    Draggable.create(handle, {
      type: "x",
      edgeResistance: 0.5,
      bounds: scrubber,
      throwProps: true,
      onDrag: updateSlides,
      onThrowUpdate: updateSlides,
      snap: {
        x(value) {
          return Math.round(value / handleWidth) * handleWidth
        }
      }
    })

    function updateSlides() {
      // Set the position of slider by calculating ratio
      gsap.set(slides, { x: -this.x / ratio })
    }

    var tl = gsap.timeline()

    tl.set('img', {x: '500%', opacity: 0})
    .staggerTo('img', 0.5,{ x: '0%', opacity: 1, ease: Expo.easeInOut }, 0.01).timeScale(0.2)
  }
});

