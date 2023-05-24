import React, { useEffect, useRef, useState } from "react";
import "../../App.css";
import { MdAdd, MdRemove } from "react-icons/md";
import LoadingSpinner from "../../components/loading/LoadingSpinner";

const Select = ({
  searchValueChangeHandler,
  filteredSubjects,
  getCommunity,
  removeCommunity,
  communitySubjects,
  setShowDropdown,
  showDropdown,
  showSearch,
  setShowSearch,
  mobile,
}) => {
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        if (mobile) {
          setShowSearch(false);
          searchValueChangeHandler("");
        } else {
          setShowDropdown(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setShowDropdown, setShowSearch, searchValueChangeHandler, mobile]);

  return (
    <div className="modal">
      <div
        ref={selectRef}
        className={`select ${!showSearch ? "select-none" : ""} ${
          isKeyboardOpen ? "keyboard" : ""
        }`}
      >
        <input
          ref={inputRef}
          onBlur={() => setIsKeyboardOpen(false)}
          onFocus={(e) => {
            if (mobile) setIsKeyboardOpen(true);
            searchValueChangeHandler(e);
            setShowDropdown(true);
          }}
          onChange={searchValueChangeHandler}
          type="text"
          placeholder="Search"
          className={`input-field ${
            (!showDropdown ||
              (communitySubjects.length === 0 &&
                filteredSubjects.length === 0 &&
                inputRef.current?.value === "") ||
              mobile) &&
            "radius-input"
          }`}
        />
        {(showDropdown || mobile) &&
          (inputRef.current?.value !== "" ||
            communitySubjects.length > 0 ||
            filteredSubjects.length > 0) && (
            <div className="select-field">
              {filteredSubjects.length > 0 ? (
                <div className="filtered-subjects">
                  {filteredSubjects.map((option) => {
                    const handleClick = (event) => {
                      event.stopPropagation();
                      getCommunity(option._id, setLoading);
                    };

                    return (
                      <div key={option._id}>
                        {option.subject}
                        {loading === option._id ? (
                          <LoadingSpinner styling={"select-loading"} />
                        ) : (
                          <MdAdd
                            onClick={handleClick}
                            size={24}
                            color={"#D6B370"}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                inputRef.current &&
                inputRef.current.value.trim() !== "" && <p>No jobs found</p>
              )}
              {communitySubjects.length > 0 && (
                <div
                  className={
                    filteredSubjects.length === 0 &&
                    (!inputRef.current || inputRef.current.value.trim() === "")
                      ? "filtered-subjects"
                      : "community-subjects"
                  }
                >
                  {communitySubjects
                    .sort((a, b) => a.subject.localeCompare(b.subject))
                    .map((option) => {
                      const handleClick = (event) => {
                        event.stopPropagation();
                        removeCommunity(option._id, setLoading);
                      };

                      return (
                        <div key={option._id}>
                          {option.subject}
                          {loading === option._id ? (
                            <LoadingSpinner styling={"select-loading"} />
                          ) : (
                            <MdRemove
                              onClick={handleClick}
                              size={24}
                              color={"#AE5D29"}
                            />
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default Select;
