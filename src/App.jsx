import React, { useState, useEffect } from "react";
import anime from "animejs";
import Snowfall from "react-snowfall";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
export default function App() {
  const [recipient, setRecipient] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState(
    "[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
  );

  const sectionCount = 14; // Total number of sections

  const handleSelection = (name, gradient) => {
    setBackgroundStyle(gradient); // Change background gradient based on the pronoun
    const audio = new Audio("/assets/christmas.wav"); // Replace with the correct path
    audio.loop = true; // Set the audio to loop
    audio.play();
    anime({
      targets: ".intro-section",
      opacity: [1, 0],
      translateY: [0, -50],
      easing: "easeInExpo",
      duration: 800,
      complete: () => {
        setRecipient(name);
        setShowIntro(false);
      },
    });
  };

  // Intro animations
  useEffect(() => {
    if (showIntro) {
      anime
        .timeline()
        .add({
          targets: ".intro-header",
          opacity: [0, 1],
          translateY: [-50, 0],
          easing: "easeOutExpo",
          duration: 1000,
        })
        .add({
          targets: ".intro-button",
          opacity: [0, 1],
          translateY: [50, 0],
          delay: anime.stagger(200),
          easing: "easeOutExpo",
          duration: 800,
        });
    }
  }, [showIntro]);

  // Navigate between sections
  const navigateToSection = (direction) => {
    if (isAnimating) return; // Prevent multiple animations at the same time
    const newIndex = currentSection + direction;

    if (newIndex === 13) {
      // Attempt to close the browser when the section reaches 13
      window.close();
      return;
    }

    if (newIndex >= 0 && newIndex < sectionCount) {
      setIsAnimating(true);

      // Animate all child elements of the current section
      anime({
        targets: `.section-${currentSection} > *`,
        opacity: [1, 0],
        translateY: [0, direction > 0 ? -50 : 50],
        delay: anime.stagger(100), // Stagger animation for each child element
        easing: "easeInExpo",
        duration: 600,
        complete: () => {
          setCurrentSection(newIndex);

          // Animate all child elements of the new section
          anime({
            targets: `.section-${newIndex} > *`,
            opacity: [0, 1],
            translateY: [direction > 0 ? 50 : -50, 0],
            delay: anime.stagger(100), // Stagger animation for each child element
            easing: "easeOutExpo",
            duration: 800,
            complete: () => setIsAnimating(false),
          });
        },
      });
    }
  };



  return (
    <div
      className={`relative h-screen w-screen overflow-hidden text-gray-800 ${backgroundStyle}`}
    >
      {/* Disable scrolling */}
      <style>{`
        body {
          overflow: hidden;
          -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
        }
      `}</style>

      {/* Intro Section */}
      {showIntro && (
        <div className="intro-section fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-90 bg-slate-900 z-10">
          <h1 className="intro-header text-4xl font-serif font-bold text-white mb-6">
            What are you feeling right now?
          </h1>
          <div className="flex gap-4">
            <button
              className="intro-button text-lg font-medium text-gray-900 bg-white px-6 py-3 rounded-full hover:bg-gray-200"
              onClick={() =>
                handleSelection(
                  "Larkspur",
                  "[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
                )
              }
            >
              He/Him
            </button>
            <button
              className="intro-button text-lg font-medium text-gray-900 bg-white px-6 py-3 rounded-full hover:bg-gray-200"
              onClick={() =>
                handleSelection(
                  "Lilith",
                  "[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#e36_100%)]"
                )
              }
            >
              She/Her
            </button>
            <button
              className="intro-button text-lg font-medium text-gray-900 bg-white px-6 py-3 rounded-full hover:bg-gray-200"
              onClick={() =>
                handleSelection(
                  "My Cuddlebug~",
                  "[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#936_100%)]"
                )
              }
            >
              They/Them
            </button>
          </div>
        </div>
      )}
      {!showIntro && (
        <div className="main-content h-screen relative">
          <Snowfall color="gray" />
          {/* Section 1 */}
          <div
            className={`section-0 h-screen flex items-center justify-center ${
              currentSection === 0 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-7xl font-serif font-bold text-white text-center shadow-md px-4 sm:mx-4">
              Dear {recipient || "..."}
            </h1>
          </div>
          <div
            className={`section-1 h-screen flex items-center justify-center ${
              currentSection === 1 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4">
              I know we could barely talk this Christmas...
            </h1>
          </div>
          <div
            className={`section-2 h-screen flex items-center justify-center ${
              currentSection === 2 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4">
              I know you miss my voice...
            </h1>
          </div>
          <div
            className={`section-3 h-screen flex flex-col items-center justify-center ${
              currentSection === 3 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4">
              I just wanna let you know that I love you so much 5 billion googol
            </h1>
            <small className="text-lg py-2 font-serif font-light text-stone-500 text-center sm:px-4">
              I had to say it...hehe.....its funny but I mean it!
            </small>
          </div>
          <div
            className={`section-4 h-screen flex flex-col items-center justify-center ${
              currentSection === 4 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4">
              Forever yours, no matter the distance.
            </h1>
            <small className="text-lg py-2 font-serif font-light text-stone-500 text-center sm:px-4">
              Being fr about that, being rizzy wit it 😏
            </small>
          </div>
          {/* Interactive Grid */}
          <div
            className={`section-5 h-screen flex flex-col items-center justify-center ${
              currentSection === 5 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-bold text-white text-center mb-12 shadow-md px-4 sm:mx-4">
              Here is a list on why I&apos;m so lucky to have you! 💞
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8 bg-opacity-70 bg-black rounded-lg w-full max-w-4xl">
              <div className="p-6 text-center text-white border border-gray-500 rounded-lg shadow-lg">
                <h2 className="text-3xl font-medium">Your Voice 🗣️</h2>
                <p className="text-xl mt-4">
                  It brings me peace and joy like nothing else.
                </p>
              </div>
              <div className="p-6 text-center text-white border border-gray-500 rounded-lg shadow-lg">
                <h2 className="text-3xl font-medium">Your Smile 😀</h2>
                <p className="text-xl mt-4">
                  It&apos;s my favorite sight, lighting up my world.
                </p>
              </div>
              <div className="p-6 text-center text-white border border-gray-500 rounded-lg shadow-lg">
                <h2 className="text-3xl font-medium">Your Kindness 👑</h2>
                <p className="text-xl mt-4">
                  It inspires me to be the best version of myself.
                </p>
              </div>
              <div className="p-6 text-center text-white border border-gray-500 rounded-lg shadow-lg">
                <h2 className="text-3xl font-medium">Your Love 💖</h2>
                <p className="text-xl mt-4">
                  It&apos;s the most precious gift I&apos;ve ever received, no
                  joke.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`section-6 h-screen flex flex-col items-center justify-center ${
              currentSection === 6 ? "block" : "hidden"
            }`}
          >
            <img
              src="assets/silly-silly-guy.gif"
              alt="Silly guy"
              className="rounded-lg shadow-lg"
            />
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4 mt-8">
              I need you. I want you. I love you.
            </h1>
            <small className="text-lg py-2 font-serif font-light text-stone-500 text-center sm:px-4">
              i wuv u....
            </small>
          </div>
          <div
            className={`section-7 h-screen flex flex-col items-center justify-center ${
              currentSection === 7 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4">
              Heres a small poem that I made
            </h1>
            <small className="text-lg py-2 font-serif font-light text-stone-500 text-center sm:px-4">
              It is horrible-
            </small>
          </div>
          <div
            className={`section-8 h-screen flex flex-col items-center justify-center ${
              currentSection === 8 ? "block" : "hidden"
            }`}
          >
            <div className="border rounded-lg p-8 font-serif text-white text-4xl bg-black leading-10 shadow-lg sm:mx-4">
              <p>Across the miles, my heart still flies,</p>
              <p>You&apos;re the sparkle in my tired eyes.</p>
              <p>Though we’re apart, I love you more,</p>
              <p>Than gnocchi soup or 7-Eleven pizza you adore.</p>
              <br />
              <p>I miss your laugh, your adorable voice,</p>
              <p>With you in my life, there’s no better choice.</p>
              <p>I imagine us in Daisy, cruising happily,</p>
              <p>Sharing laughs and love, just you, Austin, and me.</p>
              <br />
              <p>Counting down days until we’re together,</p>
              <p>Where life feels perfect, no matter the weather.</p>
              <p>I love you more than words can convey,</p>
              <p>You’re my forever, my night and my day!</p>
            </div>
          </div>
          <div
            className={`section-9 h-screen flex flex-col items-center justify-center ${
              currentSection === 9 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4">
              I hope you like it
            </h1>
            <small className="text-lg py-2 font-serif font-light text-stone-500 text-center sm:px-4">
              You can roast me
            </small>
          </div>
          <div
            className={`section-10 h-screen flex flex-col items-center justify-center ${
              currentSection === 10 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4">
              I love you
            </h1>
          </div>
          <div
            className={`section-11 h-screen flex flex-col items-center justify-center ${
              currentSection === 11 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-white text-center shadow-md px-4 sm:mx-4">
              So much.
            </h1>
          </div>
          <div
            className={`section-12 h-screen flex flex-col items-center justify-center ${
              currentSection === 12 ? "block" : "hidden"
            }`}
          >
            <h1 className="text-6xl font-serif font-light text-slate-300 text-center shadow-md px-4 sm:mx-4">
              From yours truly, Lewd
            </h1>
          </div>
        </div>
      )}

      {/* Navigation Arrows */}
      {!showIntro && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between items-center z-20">
          <button
            onClick={() => navigateToSection(-1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-50 hover:bg-slate-700 transition-all text-white text-xl mt-6"
          >
            <FaArrowCircleUp />
          </button>
          <button
            onClick={() => navigateToSection(1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-50 hover:bg-slate-700 transition-all text-white text-xl mb-6"
          >
            <FaArrowCircleDown />
          </button>
        </div>
      )}
    </div>
  );
}
