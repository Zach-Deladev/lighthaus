import { useState } from "react";
import { toast } from "react-toastify";

export const useSendEmail = () => {
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (formData) => {
    setIsSending(true);
    // Simulate API call with latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Email sent with data:", formData);
    toast.success("Email sent!");
    setIsSending(false);
  };

  return { isSending, sendEmail };
};
