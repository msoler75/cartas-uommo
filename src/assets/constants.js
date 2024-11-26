import { reactive } from 'vue';

const useConstants = () => {
  return reactive({
    CARD_WIDTH: 100, // Card width
    CARD_HEIGHT: 160, // Card height
    CIRCLE_RADIUS: 390, // Circle radius in pixels
    ARC_DEGREES: 180, // Degrees of the circle where cards are extended
    SPACE_BOTTOM: '7vh', // space between the bottom of the screen and the top card
    START_DEGREES : 180, // Start degrees where cards are extended

    get ARC_RADIANS() {
      return (this.ARC_DEGREES / 180) * Math.PI; // Arc in radians
    },
    
    get START_RADIANS() {
      return (this.START_DEGREES / 180) * Math.PI; // Start radians
    },
    
    get ROTATION_DEGREES() {
      return this.ARC_DEGREES + 90; // Initial card rotation
    }
  });
};

export default useConstants;