/**
 * Created by Arvids on 2020.12.25..
 */
import React from "react";
import PropTypes from "prop-types";
import { times } from "lodash";

export default function ReactionField(props) {
  const { horizontalCount, verticalCount } = props;
  return (
    <div>
      {times(verticalCount, (v) => v).map((vc) => (
        <div>
          {times(horizontalCount, (h) => h).map((hc) => (
            <>{`${hc}-${vc}`}</>
          ))}
        </div>
      ))}
    </div>
  );
}

ReactionField.propTypes = {};
