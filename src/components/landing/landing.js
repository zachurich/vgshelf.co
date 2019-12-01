import React from "react";

import "./landing.scss";
import Link from "next/link";
import { LoginButton, SignUpButton } from "../buttons/buttons";

function Landing(props) {
  return (
    <div className="landing">
      <section className="landing-hero-section container">
        <div className="landing-title">
          <h1>
            Your
            <br /> video game shelf.
          </h1>
        </div>
        <div className="landing-subtitle">
          <h3>Track your physical and digital game collection in one place.</h3>
        </div>
        <div className="laning-buttons action-group">
          <SignUpButton text="Start Tracking" {...props} />
          <LoginButton {...props} />
        </div>
      </section>
      <section className="landing-features-short-section">
        <div className="features-short-heading offset-heading">
          <h3>Made for serious and casual collectors.</h3>
        </div>
        <div className="container">
          <div className="features-short-features">
            <div className="short-feature">
              <div className="feature-art"></div>
              <div className="feature-description">
                <p>
                  Search through thousands of game titles and add them to your collection.
                </p>
              </div>
            </div>
            <div className="short-feature">
              <div className="feature-art"></div>
              <div className="feature-description">
                <p>
                  Search through thousands of game titles and add them to your collection.
                </p>
              </div>
            </div>
            <div className="short-feature">
              <div className="feature-art"></div>
              <div className="feature-description">
                <p>
                  Search through thousands of game titles and add them to your collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-features-indepth container">
        <div className="features-indepth-heading">
          <h3>Key Features</h3>
        </div>
        <div className="features-indepth-features">
          <div className="indepth-feature">
            <div className="feature-image">
              <img />
            </div>
            <div className="feature-content">
              <p>
                It’s easy to forget what games you own in the age of digital game
                purchases. vgshelf helps you keep track of everything you own in one
                place, accross physical and digital copies.
              </p>
            </div>
          </div>
          <div className="indepth-feature">
            <div className="feature-image">
              <img />
            </div>
            <div className="feature-content">
              <p>
                It’s easy to forget what games you own in the age of digital game
                purchases. vgshelf helps you keep track of everything you own in one
                place, accross physical and digital copies.
              </p>
            </div>
          </div>
          <div className="indepth-feature">
            <div className="feature-image">
              <img />
            </div>
            <div className="feature-content">
              <p>
                It’s easy to forget what games you own in the age of digital game
                purchases. vgshelf helps you keep track of everything you own in one
                place, accross physical and digital copies.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-popular-games">
        <div className="popular-games-heading offset-heading">
          <h3>Popular Games</h3>
        </div>
      </section>
      <section className="landing-call-to-action container">
        <div className="call-to-action-title">
          <h2>Start tracking your collection.</h2>
        </div>
        <div className="call-to-action-buttons action-group">
          <SignUpButton text="Sign Up" {...props} />
          <LoginButton {...props} />
        </div>
      </section>
    </div>
  );
}

export default Landing;
