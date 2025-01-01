import { reactive } from 'vue';

const useConstants = () => {
  return reactive({
    CARD_ELEVATION: 70, // Card elevation in pixels
    CARD_WIDTH: 20, // Card width
    CARD_HEIGHT: 200, // Card height
    CIRCLE_RADIUS: 800, // Circle radius in pixels
    ARC_DEGREES: 345, // Degrees of the circle where cards are extended
    SPACE_BOTTOM: '10vh', // space between the bottom of the screen and the top card
    START_DEGREES : 0, // Start degrees where cards are extended

    get ARC_RADIANS() {
      return (this.ARC_DEGREES / 180) * Math.PI; // Arc in radians
    },
    
    get START_RADIANS() {
      return (this.START_DEGREES / 180) * Math.PI; // Start radians
    },
    
    get ROTATION_DEGREES() {
      return 0; // Initial card rotation
    }
  });
};

export default useConstants;