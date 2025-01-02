import { reactive } from 'vue';

const useConstants = () => {
  return reactive({
    SHOW_CARD_Y_OFFSET: 300, // Card moving up when shown
    SHOW_CARD_ZOOM: 1.8,
    SHOW_CARD_DESCRIPTION_WIDTH: 500,
    CARD_ELEVATION: 80, // Card elevation in pixels
    CARD_WIDTH: 200, // Card width
    CARD_HEIGHT: 300, // Card height
    CIRCLE_RADIUS: 600, // Circle radius in pixels
    ARC_DEGREES: 330, // Degrees of the circle where cards are extended
    SPACE_BOTTOM: '3vh', // space between the bottom of the screen and the top card
    START_DEGREES : 0, // Start degrees where cards are extended

    get ARC_RADIANS() {
      return (this.ARC_DEGREES / 180) * Math.PI; // Arc in radians
    },
    
    get START_RADIANS() {
      return (this.START_DEGREES / 180) * Math.PI; // Start radians
    },
    
    get ROTATION_DEGREES() {
      return 0; // Initial card rotation
    },

    get SHOW_CARD_WIDTH() {
      return this.CARD_WIDTH * this.SHOW_CARD_ZOOM
    },

    get SHOW_CARD_HEIGHT() {
      return this.CARD_HEIGHT * this.SHOW_CARD_ZOOM
    }
  });
};

export default useConstants;