import React, { useEffect, useRef } from "react";
import "../../App.css";
import { MdAdd, MdRemove } from "react-icons/md";

const Select = ({
  searchValueChangeHandler,
  filteredSubjects,
  getCommunity,
  removeCommunity,
  setFilteredSubjects,
  subjects,
}) => {
  const selectRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setFilteredSubjects([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setFilteredSubjects]);

  return (
    <div ref={selectRef} className="select">
      <input
        onFocus={searchValueChangeHandler}
        onChange={searchValueChangeHandler}
        type="text"
        placeholder="Search"
        className={`input-field ${
          filteredSubjects.length === 0 && "radius-input"
        }`}
      />
      {filteredSubjects.length > 0 && (
        <div className="select-field">
          {filteredSubjects.map((option) => {
            const inSubjects = subjects.find(
              (subject) => subject._id === option._id
            );

            const handleClick = (event) => {
              event.stopPropagation();

              if (inSubjects) {
                removeCommunity(option._id);
              } else {
                getCommunity(option._id);
              }
            };

            return (
              <div onClick={handleClick} key={option._id}>
                {option.subject}
                {inSubjects ? (
                  <MdRemove size={24} color={"#D6B370"} />
                ) : (
                  <MdAdd size={24} color={"#D6B370"} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
