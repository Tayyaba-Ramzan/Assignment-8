"use client";
import Image from "next/image";
import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      console.log(error);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-gray-50 px-4 py-8 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-4 text-center text-blue-950 font-bold">
            Contact Us for Your Travel Queries
          </h2>

          <div className="space-y-4">
            {[
              {
                icon: "/address.png",
                label: "Address",
                detail: "123 Discover Pakistan, Globe City, 98765",
              },
              {
                icon: "/email.png",
                label: "Email",
                detail: "discoverpakistan@gmail.com",
              },
              {
                icon: "/call.png",
                label: "Phone",
                detail: "+1 (987) 654-3210",
              },
              {
                icon: "/site.png",
                label: "Website",
                detail: "discoverpakistan.vercel.app",
              },
            ].map(({ icon, label, detail }, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="bg-blue-300 p-2 sm:p-3 rounded-full">
                  <Image src={icon} alt={`${label} Icon`} width={24} height={24} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 text-sm sm:text-base">{label}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-base text-gray-800 mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Please provide your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm sm:text-base text-gray-800 mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm sm:text-base text-gray-800 mb-2">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us how we can help you"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border rounded-lg h-24 sm:h-32 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full py-2 sm:py-3 rounded-lg text-white font-semibold transition-colors text-sm sm:text-base
                ${status === "loading" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-700 text-center font-semibold mt-2 sm:mt-4 text-sm sm:text-base">
                Message sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className="text-red-700 text-center font-semibold mt-2 sm:mt-4 text-sm sm:text-base">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
