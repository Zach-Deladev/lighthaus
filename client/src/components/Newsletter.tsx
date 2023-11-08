import React, { useState } from "react";
import { useSubscribeToNewsletter } from "../hooks/useSubscribeToNewsletter";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { isSubscribing, subscribe } = useSubscribeToNewsletter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await subscribe({ email });
    setEmail(""); // clear the email state after subscription is successful
  };

  return (
    <div className="bg-white dark:bg-gray-800 py-16 sm:py-24 lg:py-32 flex justify-center items-center">
      <div className="mx-auto max-w-7xl text-center">
        <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl mb-8">
          <h2>Want band news and updates?</h2>
          <p>Sign up for our newsletter.</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="flex gap-x-4 justify-center">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-gray-200 dark:placeholder:text-gray-400 dark:bg-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              disabled={isSubscribing}
              type="submit"
              className={`flex-none rounded-md ${
                isSubscribing ? "opacity-50" : "opacity-100"
              } bg-indigo-800 dark:bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-800 dark:hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800`}
            >
              {isSubscribing ? "Loading..." : "Subscribe"}
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-900 dark:text-gray-200 text-center">
            We will never share your email address.
          </p>
        </form>
      </div>
    </div>
  );
}
