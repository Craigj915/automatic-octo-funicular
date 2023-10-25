"use client";
import { useState } from "react";

const Register = (props) => {
  const [disabled, setDisabled] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    let result;

    if (
      !e.target.name.value ||
      !e.target.password.value
    ) {
      alert("Please fill in all fields");
      setDisabled(false);
      return;
    }


    if (!props.newUser) {
        result = props.client.newUser(
            e.target.name.value,
            e.target.password.value,
            e.target.company.value,
            e.target.picture.value,
          );
      }

    result
      .then(() => {
        setDisabled(false);
        props.refreshList();
      })
      .catch(() => {
        alert("Sooomething went wrong, REGISTER USER");
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
          defaultValue={props?.newUser?.name}
          name="name"
          placeholder="name"
          className="border border-gray-500 p-2 rounded-lg"
          disabled={disabled}
        ></input>

        <label htmlFor="description"> password </label>

        <input
          type="text"
          id="password"
          defaultValue={props?.newUser?.name}
          name="password"
          placeholder="password"
          className="border border-gray-500 p-2 rounded-lg"
          disabled={disabled}
        ></input>

        <label htmlFor="company"> company </label>

        <input
          type="text"
          id="company"
          defaultValue={props?.newUser?.name}
          name="company"
          placeholder="company"
          className="border border-gray-500 p-2 rounded-lg"
          disabled={disabled}
        ></input>

        <label htmlFor="picture"> picture </label>

        <input
          type="text"
          id="picture"
          defaultValue={props?.newUser?.name}
          name="picture"
          placeholder="picture link"
          className="border border-gray-500 p-2 rounded-lg"
          disabled={disabled}
        ></input>
        <button></button>
      </form>
    </div>
  );
};

export default Register;
