import React from "react";
import { LoginButton, SignUpButton } from "../buttons/buttons";
import {
  shortFeatures,
  longFeatures,
  hero,
  popularGames,
  callToAction
} from "../../common/copy";

import "./landing.scss";

function CallToAction(props) {
  return (
    <section className="landing-call-to-action container">
      <div className="call-to-action-title">
        <h2>{callToAction.heading}</h2>
      </div>
      <div className="call-to-action-buttons action-group">
        <SignUpButton text="Sign Up" {...props} />
        <LoginButton {...props} />
      </div>
    </section>
  );
}

function Landing(props) {
  return (
    <div className="landing">
      <section className="landing-hero-section container">
        <div className="landing-title">
          <h1 dangerouslySetInnerHTML={{ __html: hero.heading }} />
        </div>
        <div className="landing-subtitle">
          <h3>{hero.subheading}</h3>
        </div>
        <div className="laning-buttons action-group">
          <SignUpButton text="Start Tracking" {...props} />
          <LoginButton {...props} />
        </div>
      </section>
      <section className="landing-features-short-section">
        <div className="features-short-heading offset-heading">
          <h3>{shortFeatures.heading}</h3>
        </div>
        <div className="container">
          <div className="features-short-features">
            {shortFeatures.content.map(({ image, text }, index) => (
              <div key={text + index} className="short-feature">
                <div className="feature-art">
                  <>{image && image()}</>
                </div>
                <div className="feature-description">
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="landing-features-indepth container">
        <div className="features-indepth-heading">
          <h3>{longFeatures.heading}</h3>
        </div>
        <div className="features-indepth-features">
          {longFeatures.content.map(({ image, text }, index) => (
            <div key={text + index} className="indepth-feature">
              <div className="feature-image">{image && image()}</div>
              <div className="feature-content">
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="landing-popular-games">
        <div className="popular-games-heading offset-heading">
          <h3>{popularGames.heading}</h3>
        </div>
      </section>
      <CallToAction />
    </div>
  );
}

export default Landing;
