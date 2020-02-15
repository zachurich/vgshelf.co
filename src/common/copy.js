import ShelfSVG from "../assets/shelf.svg";
import SearchSVG from "../assets/search.svg";
import CompletenessSVG from "../assets/completeness.svg";

/**
 * Landing
 */

// Hero
export const hero = {
  heading: "Your <br /> video game shelf.",
  subheading: "Track your physical and digital game collection in one place."
};

// Short Features
export const shortFeatures = {
  heading: "Made for serious and casual collectors.",
  content: [
    {
      image: SearchSVG,
      text: "Search through thousands of game titles and add them to your collection."
    },
    {
      image: ShelfSVG,
      text: "Categorize your collection by creating and organizing custom shelves."
    },
    {
      image: CompletenessSVG,
      text:
        "Keep track of game details. Do you have the box? Manual? Physical and/or digital copy?"
    }
  ]
};

// Long Features
export const longFeatures = {
  heading: "Key Features",
  content: [
    {
      image: "",
      text:
        "It’s easy to forget what games you own in the age of digital game purchases. vgshelf helps you keep track of everything you own in one place, accross physical and digital copies."
    },
    {
      image: "",
      text:
        "Keep organized by adding games to specific custom-defined “shelves”. For example, you could create a shelf titled “Favorite Childhood SNES Games”, and add the applicable games. "
    },
    {
      image: "",
      text:
        "Serious and amateur game collectors alike may want to keep track of the “completeness” state for games they own. Having the game box, manual, and knowing the regional copy you own can be all be tracked. "
    }
  ]
};

// Popular Games
export const popularGames = {
  heading: "Popular Games"
};

// Call to Action
export const callToAction = {
  heading: "Start tracking your collection."
};
