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
      !e.target.price.value ||
      !typeof e.target.price.value === "number"
    ) {
      alert("Please fill in all fields correctly");
      setDisabled(false);
      return;
    }

    if (props.currentAd) {
      result = props.client.updateAd(
        props.currentAd._id,
        e.target.name.value,
        e.target.price.value,
        e.target.location.value,
        e.target.maps.value
      );
    } else {
      result = props.client.addAd(
        e.target.name.value,
        e.target.price.value,
        e.target.location.value,
        e.target.maps.value
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

        <label htmlFor="price"> Price </label>

        <input
          type="number"
          id="price"
          defaultValue={props?.currentAd?.name}
          name="price"
          placeholder="price £"
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
