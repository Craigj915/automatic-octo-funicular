"use client"

import { useState } from "react";

const Login = (props) => {

    const [disabled, setDisabled] = useState(false);

    const submitHandler = (e) => {
        setDisabled(true)
        e.preventDefault()

        props.client.login(e.target.username.value, e.target.password.value)
        .then(response => {
            console.log(response)
            setDisabled(false)
            props.loggedIn(response.data.token)
        }).catch (error => {
            console.log(error)
            setDisabled(false)
            alert("Login failed")
        })
    }


  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2334269c-b980-41e7-b8e4-91e890759571/dg5cwn5-01969011-7ae7-4db5-8e8d-fbe8221c9553.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIzMzQyNjljLWI5ODAtNDFlNy1iOGU0LTkxZTg5MDc1OTU3MVwvZGc1Y3duNS0wMTk2OTAxMS03YWU3LTRkYjUtOGU4ZC1mYmU4MjIxYzk1NTMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3KBsV8snC-3a3bzoMd2o0X-RFPuLTLiFrTaFAOVcRLs"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e) => submitHandler(e)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  disabled={disabled}
                  name="username"
                  type="username"
                  placeholder="Username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  disabled={disabled}
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={disabled}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
