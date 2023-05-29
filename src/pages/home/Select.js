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

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleKeyDown = async (event, handleClick) => {
    const length = filteredSubjects.length + communitySubjects.length;
    if (event.key === "Enter" && !disabled && handleClick) {
      await setDisabled(true);
      await handleClick(event);
      setTimeout(() => {
        const focusElement = document.getElementById(`option-${focusedIndex}`);
        if (focusElement) {
          focusElement.focus();
        }
        setDisabled(false);
      }, 1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (focusedIndex <= 0) {
        inputRef.current.focus();
        setFocusedIndex(-1);
      } else setFocusedIndex((prevIndex) => prevIndex - 1);
    }
  };

  console.log(focusedIndex);

  useEffect(() => {
    if (focusedIndex >= 0) {
      const focusElement = document.getElementById(`option-${focusedIndex}`);
      if (focusElement) {
        focusElement.focus();
      }
    }
  }, [focusedIndex]);

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

  useEffect(() => {
    if (!showSearch) {
      inputRef.current.value = "";
      setIsKeyboardOpen(false);
    }
  }, [showSearch]);

  return (
    <div className={`${!showSearch ? "select-none" : "modal"}`}>
      <div
        ref={selectRef}
        className={`select ${isKeyboardOpen ? "keyboard" : ""}`}
      >
        <input
          ref={inputRef}
          onFocus={(e) => {
            if (mobile) setIsKeyboardOpen(true);
            searchValueChangeHandler(e);
            setShowDropdown(true);
          }}
          onChange={searchValueChangeHandler}
          onKeyDown={handleKeyDown}
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
                  {filteredSubjects.map((option, i) => {
                    const handleClick = async (event) => {
                      event.stopPropagation();
                      await getCommunity(option._id, setLoading);
                    };

                    return (
                      <div
                        id={`option-${i}`}
                        tabIndex={0}
                        key={option._id}
                        onFocus={() => setFocusedIndex(i)}
                        onKeyDown={(e) => handleKeyDown(e, handleClick)}
                      >
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
                    .map((option, i) => {
                      const handleClick = (event) => {
                        event.stopPropagation();
                        removeCommunity(option._id, setLoading);
                      };

                      return (
                        <div
                          id={`option-${i + filteredSubjects.length}`}
                          tabIndex={0}
                          key={option._id}
                          onFocus={() =>
                            setFocusedIndex(i + filteredSubjects.length)
                          }
                          onKeyDown={(e) => handleKeyDown(e, handleClick)}
                        >
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
