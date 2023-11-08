import { useState } from "react";
import { toast } from "react-toastify";

export const useSubscribeToNewsletter = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);

  const subscribe = async (formData) => {
    setIsSubscribing(true);
    // Simulate API call with latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Subscribe with data:", formData);
    toast.success("You've been subscribed!");
    setIsSubscribing(false);
  };

  return { isSubscribing, subscribe };
};
