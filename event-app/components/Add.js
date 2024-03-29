"use client";
import { useState } from "react";

const Add = (props) => {
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    let result;

    if (
      !e.target.name.value ||
      !e.target.location.value ||
      !e.target.maps.value ||
      !e.target.description.value
    ) {
      alert("Please fill in all fields correctly");
      setDisabled(false);
      return;
    }

    if (props.currentAd) {
      result = props.client.updateAd(
        props.currentAd._id,
        e.target.name.value,
        e.target.location.value,
        e.target.maps.value,
        e.target.description.value,
      );
    } else {
      result = props.client.addAd(
        e.target.name.value,
        e.target.location.value,
        e.target.maps.value,
        e.target.description.value,
      );
    }

    result
      .then(() => {
        setDisabled(false);
        props.refreshList();
      })
      .catch(() => {
        alert("Spmething went wrong");
        setDisabled(false);
      });
  };

  return (
    <div className="flex flex-col items-center gap-4 shadow-lg p-4 rounded-lg w-full">
      <h2>{props.currentAd ? "Update event" : "Add new event"}</h2>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <label htmlFor="name"> Name </label>

        <input
          type="text"
          id="name"
          defaultValue={props?.currentAd?.name}
          name="name"
          placeholder="name"
          className="border border-gray-500 p-2 rounded-lg"
          disabled={disabled}
        ></input>

        <label htmlFor="description"> description </label>

        <input
          type="text"
          id="description"
          defaultValue={props?.currentAd?.name}
          name="description"
          placeholder="description"
          className="border border-gray-500 p-2 rounded-lg"
          disabled={disabled}
        ></input>

        <label htmlFor="location"> Location </label>

        <input
          type="text"
          id="location"
          defaultValue={props?.currentAd?.name}
          name="location"
          placeholder="location"
          className="border border-gray-500 p-2 rounded-lg"
          disabled={disabled}
        ></input>

        <label htmlFor="maps"> Maps </label>

        <input
          type="text"
          id="maps"
          defaultValue={props?.currentAd?.name}
          name="maps"
          placeholder="maps link"
          className="border border-gray-500 p-2 rounded-lg"
          disabled={disabled}
        ></input>
        <button></button>
      </form>
    </div>
  );
};

export default Add;
