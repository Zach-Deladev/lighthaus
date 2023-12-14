import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface EventFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  initialValues = {},
  onSubmit,
  loading,
}) => {
  const [values, setValues] = useState(initialValues ?? {});
  const [error, setError] = useState("");

  const isoToDateString = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (initialValues) {
      const { __typename, ...rest } = initialValues;
      setValues({
        ...rest,
        date: isoToDateString(rest.date),
      });
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const isFormValid =
    values.title &&
    values.description &&
    values.date &&
    values.location &&
    values.startTime &&
    values.endTime &&
    values.ticketLink;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(values);
    } else {
      setError("All fields are required.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 rounded-lg bg-white dark:bg-gray-800 transition duration-500 w-full"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl mb-8 font-semibold dark:text-gray-300">
          {initialValues ? "Edit Event" : "Create Event"}
        </h2>
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={values.title || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={values.description || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          name="date"
          min={today} // Set the minimum allowed date to today
          value={values.date || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={values.location || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="time"
          name="startTime"
          value={values.startTime || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="time"
          name="endTime"
          value={values.endTime || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="ticketLink"
          placeholder="Ticket Link"
          value={values.ticketLink || ""}
          onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
          required
        />
      </div>
      {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
      <button
        type="submit"
        className={`w-full py-4 mt-4 px-6 rounded ${
          isFormValid && !loading
            ? "bg-indigo-500 text-white hover:bg-indigo-800"
            : "bg-gray-300 cursor-not-allowed opacity-70"
        } dark:hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 transition duration-300`}
        disabled={!isFormValid || loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default EventForm;
