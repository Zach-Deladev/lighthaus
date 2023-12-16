import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import contactImage from "../assets/contact.jpg";

interface FormData {
  "first-name"?: string;
  "last-name"?: string;
  email: string;
  event?: string;
  phone?: string;
  message?: string;
  contactType?: string;
}

const useSendEmail = () => {
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (formData: FormData) => {
    setIsSending(true);
    // Add your actual email sending logic here
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Email sent with data:", formData);
    toast.success("Email sent!");

    setIsSending(false);
  };

  return { isSending, sendEmail };
};

export default function ContactForm() {
  const { isSending, sendEmail } = useSendEmail();
  const [formData, setFormData] = useState<FormData>({ email: "" });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email) {
      await sendEmail(formData);
      setFormData({ email: "" });
    } else {
      toast.error("Please enter a valid email");
    }
  };
  return (
    <div className="relative relative bg-gray-100 dark:bg-gray-800">
      <div className="lg:absolute lg:inset-0 lg:left-1/2">
        <img
          className="h-64 w-full bg-gray-50 dark:bg-gray-900 object-cover sm:h-80 lg:absolute lg:h-full"
          src={contactImage}
          alt=""
        />
      </div>
      <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Let's work together
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Get in touch; your backstage pass to connect with us
            </p>
            <form className="mt-16" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      value={formData["first-name"] || ""}
                      onChange={handleChange}
                      required
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      value={formData["last-name"] || ""}
                      onChange={handleChange}
                      required
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-3.5 py-2 outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      value={formData.email || ""}
                      onChange={handleChange}
                      required
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-3.5 py-2 outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between text-sm leading-6">
                    <label
                      htmlFor="event"
                      className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
                    >
                      Event
                    </label>
                    <p
                      id="phone-description"
                      className="text-gray-400 dark:text-gray-400"
                    >
                      Optional
                    </p>
                  </div>
                  <div className="mt-2.5">
                    <input
                      value={formData.event || ""}
                      onChange={handleChange}
                      type="text"
                      name="event"
                      id="event"
                      autoComplete="organization"
                      className="block w-full rounded-md border-0 px-3.5 py-2 outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between text-sm leading-6">
                    <label
                      htmlFor="phone"
                      className="block font-semibold text-gray-900 dark:text-gray-200"
                    >
                      Phone
                    </label>
                    <p
                      id="phone-description"
                      className="text-gray-400 dark:text-gray-400"
                    >
                      Optional
                    </p>
                  </div>
                  <div className="mt-2.5">
                    <input
                      value={formData.phone || ""}
                      onChange={handleChange}
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      aria-describedby="phone-description"
                      className="block w-full rounded-md border-0 px-3.5 py-2 outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between text-sm leading-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
                    >
                      Message
                    </label>
                    <p
                      id="message-description"
                      className="text-gray-400 dark:text-gray-400"
                    >
                      Optional
                    </p>
                  </div>
                  <div className="mt-2.5">
                    <textarea
                      value={formData.message || ""}
                      onChange={handleChange}
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md border-0 px-3.5 py-2 outline-none focus:border-indigo-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2
        dark:focus:ring-inset dark:focus:ring-indigo-800"
                      aria-describedby="message-description"
                    />
                  </div>
                  <fieldset className="sm:col-span-2 mt-6 ">
                    <legend className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                      I am a
                    </legend>
                    <div className="mt-4 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      <div className="flex gap-x-2.5">
                        <input
                          id="fan"
                          name="contactType"
                          value="fan"
                          type="radio"
                          className="mt-1 h-4 w-4    border-gray-300 dark:border-gray-600 text-indigo-800 dark:text-indigo-400 shadow-sm focus:ring-indigo-800 dark:focus:ring-indigo-400"
                          onChange={handleChange}
                        />
                        <label htmlFor="fan" className="dark:text-gray-300">
                          Fan
                        </label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          id="press"
                          name="contactType"
                          value="press"
                          type="radio"
                          className="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-indigo-800 dark:text-indigo-400 shadow-sm focus:ring-indigo-800 dark:focus:ring-indigo-400"
                          onChange={handleChange}
                        />
                        <label htmlFor="press" className="dark:text-gray-300">
                          Press
                        </label>
                      </div>
                      <div className="flex gap-x-2.5">
                        <input
                          id="agent"
                          name="contactType"
                          value="agent"
                          type="radio"
                          className="mt-1 h-4 w-4 border-gray-300 dark:border-gray-600 text-indigo-800 dark:text-indigo-400 shadow-sm focus:ring-indigo-800 dark:focus:ring-indigo-400"
                          onChange={handleChange}
                        />
                        <label htmlFor="agent" className="dark:text-gray-300">
                          Agent
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 text-base font-semibold leading-5 text-white bg-indigo-800 border border-transparent rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700"
                  >
                    {isSending ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
