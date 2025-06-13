import { motion } from "framer-motion";
import { fadeIn } from "../../framerMotion/variants";
import { useState, useEffect } from "react";

const phrases = [
  "computer science engineering student",
  "passionate software developer",
  "java developer",
  "web developer",
];

const HeroText = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!deleting && charIndex <= phrases[phraseIndex].length) {
      timeout = setTimeout(() => {
        setText(phrases[phraseIndex].substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 150);
    } else if (deleting && charIndex >= 0) {
      // Delete all letters quickly in one go
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText(phrases[phraseIndex].substring(0, charIndex));
          setCharIndex(0);
        }, 100);
      } else {
        setDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    } else if (charIndex === phrases[phraseIndex].length + 1) {
      timeout = setTimeout(() => setDeleting(true), 1000);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <div className="flex flex-col gap-4 h-full justify-center md:text-left sm:text-center">
      <motion.h2
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="lg:text-2xl sm:text-xl  uppercase text-lightGrey "
      >
      </motion.h2>
      <motion.h1
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="md:text-[2.8rem] lg:text-6xl sm:text-4xl text-orange font-bold uppercase"
      >
        Ojesh <br className="sm:hidden md:block" />
        Mundale
      </motion.h1>
      <motion.p
        variants={fadeIn("up", 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="text-lg mt-4"
      >
        I am {text}
        <span className="blinking-cursor">|</span>
      </motion.p>
    </div>
  );
};

export default HeroText;
