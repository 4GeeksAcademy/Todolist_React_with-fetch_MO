import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/list.css";

const List = (props) => {

    return (
        <>
            {props.items.map((item, index) => (
                <li className={
                    `list-group-item d-flex justify-content-between rounded border-top mt-1 p-2${item?.done
                        ? " done"
                        : ""}`}
                    key={index}>
                    <span id="text" className="col-10">{item?.label}</span>
                    <span id="btn" className="d-block col-2">
                        <button className={`btn fas${item?.done
                            ? " btn-warning fa-times"
                            : " btn-success fa-check"
                            } rounded border-top border-bottom p-3 me-1`}
                            type="button"
                            onClick={(e) => props.onDone(index)}></button>
                        <button className="btn fas btn-danger fa-trash-alt rounded border-top border-bottom p-3"
                            type="button"
                            onClick={(e) => props.onRemoveItem(index)}
                        ></button>
                    </span>
                </li>
            ))
            }
        </>
    );
};

List.propType = {
    items: PropTypes.array.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
};

export default List;

