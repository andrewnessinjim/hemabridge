import * as React from "react";
import Spacer from "../Spacer";

interface Props {
  headingId: string;
  heading: string;
  subheading: string;
  description: string;
}

function SectionIntro({ headingId, heading, subheading, description }: Props) {
  return (
    <div>
      <div>
        <h1 id={headingId}>{heading}</h1>
        <h2>{subheading}</h2>
      </div>
      <Spacer size={8}/>
      <p className="narrowTextBlock">{description}</p>
    </div>
  );
}

export default SectionIntro;
