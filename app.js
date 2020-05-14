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

    const {
      container,
      slider,
      slides,
      scrubber,
      handle,
    } = this.$refs

    var maxScroll = slider.scrollWidth - slider.offsetWidth 
    var sections = slides.length 
    var slideWidth = maxScroll / (sections - 1)
    var scrubWidth = scrubber.getBoundingClientRect().width 
    var handleWidth = scrubWidth / sections 

    var ratio = scrubWidth / (slideWidth * sections); 

    gsap.set(handle, { width: handleWidth })

    Draggable.create(slider, {
      type: "scrollLeft",
      edgeResistance: 0,
      bounds: slider,
      throwProps: true,
      maxX: '-462', 
      onDrag: updateHandle,
      onThrowUpdate: updateHandle,
      onDragEnd: function() {
        let tl = gsap.timeline();
        // gsap.to('.slide', 0.5, { x: `${this.deltaX + this.deltaX}` })
        tl.to('.slide img', 0.8, { x: `${this.x + this.x}` })
      },
      snap: {
        x(value) {
          return Math.round(value / slideWidth) * -slideWidth
        }
      },
    })

    function updateHandle() {
      gsap.set(handle, { x: -this.x * ratio })
    }

    Draggable.create(handle, {
      type: "x",
      edgeResistance: 0,
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
      gsap.set(slides, { x: -this.x / ratio })
    }

    var tl = gsap.timeline()
    tl.set('img', {x: '500%', opacity: 0})
    .staggerTo('img', 0.5,{ x: '0%', opacity: 1, ease: Expo.easeInOut }, 0.01).timeScale(0.2)
  }
});

