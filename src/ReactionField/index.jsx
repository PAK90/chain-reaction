/**
 * Created by Arvids on 2020.12.25..
 */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { times } from "lodash";
import ReactionObject from "./ReactionObject";
import isPointInRange from "../helpers/isPointInRange";
import getMidpoint from "../helpers/getMidpoint";
import fireFlipEvent from "../helpers/fireFlippedEvent";

export default function ReactionField(props) {
  const {
    horizontalCount,
    verticalCount,
    circlePadding,
    circleSize,
    mousePos,
    mouseSize,
  } = props;

  const [blastRadius, setBlastRadius] = useState(30);
  const [hoveredArray, setHoveredArray] = useState(
    times(verticalCount, (v) => v).map((vc) =>
      times(horizontalCount, (h) => h).map((hc) => "unhovered")
    )
  );
  const [flippedArray, setFlippedArray] = useState(null);
  // console.log(hoveredArray);

  useEffect(() => {
    // updateHoveredArray();
    // might be a bit inefficient for now but...
    // map through all things in hoveredArray, calculate whether they're in or out
    // then apply that array as hoveredArray
    const newHovered = hoveredArray.map((row, vIx) =>
      row.map((thing, hIx) =>
        calculateHoveredState(hIx, vIx) ? "hovered" : "unhovered"
      )
    );
    setHoveredArray(newHovered);
  }, [mousePos]);

  useEffect(() => {
    setHoveredArray(
      times(verticalCount, (v) => v).map((vc) =>
        times(horizontalCount, (h) => h).map((hc) => "unhovered")
      )
    );
  }, [horizontalCount, verticalCount]);

  const calculateHoveredState = (xth, yth) => {
    // calculate if the current circle's midpoint is within mouseSize of mousePos
    const { x, y } = getMidpoint(xth, yth, circleSize, circlePadding);

    return isPointInRange(x, y, mousePos.x, mousePos.y, mouseSize);
  };

  const clearField = (e) => {
    e.stopPropagation(); // to keep the parent div from calling flipTheBird.
    // setFlippedArray(null);

    // const flipEvent = createCustomEvent("flipped", {
    //   reset: true,
    // });
    // document.dispatchEvent(flipEvent);
    fireFlipEvent({ reset: true });
  };

  const flipTheBird = () => {
    // trial first; just flip all hovered ones
    // let justFlipped = [];
    // const newHovered = hoveredArray.map((row, vIx) =>
    //   row.map((thing, hIx) => {
    //     if (thing === "hovered") {
    //       justFlipped.push([vIx, hIx]);
    //     }
    //     return thing === "hovered" ? "flipped" : "unhovered";
    //   })
    // );
    // // find all things within blastRadius of the things that just flipped
    //
    // setFlippedArray(newHovered);

    // try firing event?
    // const flipEvent = createCustomEvent("flipped", {
    //   eventSource: mousePos,
    //   radiusOverride: mouseSize,
    // });
    // document.dispatchEvent(flipEvent);
    fireFlipEvent({
      eventSource: mousePos,
      radiusOverride: mouseSize,
    });
  };

  // return (
  //   <div onClick={(e) => console.log(e)}>
  //     {times(verticalCount, (v) => v).map((vc) => (
  //       <div style={{ display: "flex" }}>
  //         {times(horizontalCount, (h) => h).map((hc) => (
  //           <ReactionObject
  //             circlePadding={circlePadding}
  //             circleSize={circleSize}
  //             key={`${hc}-${vc}`}
  //             // FIXME; this probably... isn't ideal.
  //             hovered={hoveredArray[vc][hc]}
  //           />
  //         ))}
  //       </div>
  //     ))}
  //     <button>Reset field</button>
  //   </div>
  // );
  return (
    <div onClick={flipTheBird}>
      {hoveredArray.map((row, vIx) => (
        <div style={{ display: "flex" }}>
          {row.map((thing, hIx) => (
            <ReactionObject
              circlePadding={circlePadding}
              circleSize={circleSize}
              key={`${hIx}-${vIx}`}
              state={flippedArray?.[vIx]?.[hIx] || thing}
              blastRadius={blastRadius}
              position={{ x: hIx, y: vIx }}
            />
          ))}
        </div>
      ))}
      <button onClick={clearField}>Reset field</button>
    </div>
  );
}

ReactionField.propTypes = {};
