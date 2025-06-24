import React from "react";

const About = () => {
  return (
    <div className="about-container" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>About Me</h2>
      <p>
        Hi, I’m <strong>Ștefan Lică</strong>, a Full Stack Software Engineer with a strong
        backend focus in <strong>C#</strong> and <strong>Java</strong>, and a passion for frontend development using
        <strong> TypeScript</strong> and <strong>React</strong>. I’m also exploring more work with
        <strong> Go</strong> and <strong>DevOps</strong> tools.
      </p>
      <p>
        Also, I proudly identify as a{" "}
        <a href="https://1x.engineer/" target="_blank" rel="noopener noreferrer">
          1x engineer
        </a>
        . Yep, not 10x—just responsibly effective and with a can-do attitude!
      </p>

      <h3>Contact</h3>
      <ul>
        <li>Email: <a href="mailto:stefanlica99@gmail.com">stefanlica99@gmail.com</a></li>
        <li>Phone: <a href="tel:+491778508435">+49 177 8508435</a></li>
        <li>
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/stefan-lica" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/stefan-lica
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a href="https://github.com/ConZ99" target="_blank" rel="noopener noreferrer">
            github.com/ConZ99
          </a>
        </li>
        <li>
          Download CV:{" "}
          <a href="/source/StefanLica_CV.pdf" download>
            Click here to download
          </a>
        </li>
      </ul>
    </div>
  );
};

export default About;