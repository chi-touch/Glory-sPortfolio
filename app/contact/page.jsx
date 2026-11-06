"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select";

import { FaPhoneAlt,FaEnvelope,FaMapMarkerAlt,FaCheckCircle,FaExclamationCircle} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BsArrowUpRight } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+234 8103722570",
    href: "tel:+2348103722570",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "gloebudav@gmail.com",
    href: "mailto:gloebudav@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Abuja, Nigeria",
    isMap: true,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const venue = "Abuja, Nigeria";
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Google Maps embed URL
  const mapUrl = useMemo(() => {
    const encoded = encodeURIComponent(venue);
    if (!mapsApiKey) {
      return `https://maps.google.com/maps?q=${encoded}&t=m&z=14&ie=UTF8&iwloc=near&output=embed`;
    }
    return `https://www.google.com/maps/embed/v1/search?key=${mapsApiKey}&q=${encoded}&zoom=14&maptype=roadmap`;
  }, [venue, mapsApiKey]);

  // Lock body scroll and listen for Escape key when map modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowMap(false);
    };

    if (showMap) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMap]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Validation
    if (!formData.firstname.trim()) {
      setStatus({ type: "error", message: "Please enter your first name." });
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus({ type: "error", message: "Please enter a message (at least 5 characters)." });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
        });
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else if (data.notConfigured) {
        setStatus({
          type: "warning",
          message:
            "Your message is ready! Click the button below to send it directly via your email client:",
          mailtoUrl: data.mailtoUrl,
        });
      } else {
        const fallbackBody = `Name: ${formData.firstname} ${formData.lastname}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`;
        const fallbackMailto = `mailto:gloebudav@gmail.com?subject=${encodeURIComponent(
          `Portfolio Contact from ${formData.firstname}`
        )}&body=${encodeURIComponent(fallbackBody)}`;

        setStatus({
          type: "error",
          message: data.error || "Failed to send message via server. You can send it directly through your email client instead:",
          mailtoUrl: fallbackMailto,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      const fallbackBody = `Name: ${formData.firstname} ${formData.lastname}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`;
      const fallbackMailto = `mailto:gloebudav@gmail.com?subject=${encodeURIComponent(
        `Portfolio Contact from ${formData.firstname}`
      )}&body=${encodeURIComponent(fallbackBody)}`;

      setStatus({
        type: "error",
        message: "Network error occurred. You can click below to open your email client and send directly:",
        mailtoUrl: fallbackMailto,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6 sm:py-12"
    >
      <div className="container mx-auto px-4 sm:px-8 xl:px-20 max-w-[1280px]">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-6 sm:p-10 bg-[#27272c] rounded-xl"
            >
              <h3 className="text-3xl sm:text-4xl text-accent font-semibold">
                Let's Work Together
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Have a project in mind, a freelance inquiry, or just want to connect?
                Fill out the form below or reach out directly, and I'll respond as soon as possible.
              </p>

              {/* Status Feedback Banner */}
              {status && (
                <div
                  className={`p-4 rounded-lg flex flex-col gap-2 border text-sm ${
                    status.type === "success"
                      ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                      : status.type === "warning"
                      ? "bg-amber-950/40 border-amber-500/50 text-amber-300"
                      : "bg-rose-950/40 border-rose-500/50 text-rose-300"
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium">
                    {status.type === "success" ? (
                      <FaCheckCircle className="shrink-0 text-emerald-400" />
                    ) : (
                      <FaExclamationCircle className="shrink-0 text-amber-400" />
                    )}
                    <span>{status.message}</span>
                  </div>

                  {status.mailtoUrl && (
                    <a
                      href={status.mailtoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center self-start bg-accent text-primary px-4 py-2 rounded-md font-semibold text-xs uppercase tracking-wider hover:bg-accent-hover transition-colors"
                    >
                      Open Email Client
                    </a>
                  )}
                </div>
              )}

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First Name *"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {/* Select Service */}
              <Select value={formData.service} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="Web engineer">Web ENGINEER</SelectItem>
                    <SelectItem value="Frontend engineer">Frontend ENGINEER</SelectItem>
                    <SelectItem value="Fullstack engineer">Fullstack ENGINEER</SelectItem>
                    <SelectItem value="Backend engineer">BACKEND ENGINEERING</SelectItem>
                    <SelectItem value="Logo & Graphic Design">Logo & Graphic Design</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Textarea */}
              <Textarea
                name="message"
                className="h-[180px] sm:h-[200px]"
                placeholder="Type your message here * (min 5 characters)"
                value={formData.message}
                onChange={handleChange}
                required
              />

              {/* Submit Button */}
              <Button
                type="submit"
                size="md"
                className="max-w-44 uppercase font-semibold text-xs tracking-wider cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-6 sm:gap-10 w-full xl:w-auto">
              {info.map((item, index) => {
                const content = (
                  <div className={`flex items-center gap-4 sm:gap-6 group ${item.isMap ? "cursor-pointer" : ""}`}>
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                      <div className="text-[24px] xl:text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-sm">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg xl:text-xl font-medium text-white group-hover:text-accent transition-colors">
                          {item.description}
                        </h3>
                      </div>
                    </div>
                  </div>
                );

                return (
                  <li key={index}>
                    {item.href ? (
                      <a href={item.href} className="block">
                        {content}
                      </a>
                    ) : item.isMap ? (
                      <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="w-full text-left bg-transparent border-0 p-0 m-0"
                        title="Click to view interactive map of Abuja, Nigeria"
                      >
                        {content}
                      </button>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Google Map Modal */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMap(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[800px] bg-[#27272c] border border-accent/20 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      {venue}
                      <span className="text-xs font-normal text-white/60">(Location)</span>
                    </h4>
                    <p className="text-xs text-white/50">Interactive Google Map</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:text-accent-hover flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <BsArrowUpRight className="text-sm" />
                  </a>

                  <button
                    onClick={() => setShowMap(false)}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors"
                    aria-label="Close map"
                  >
                    <IoMdClose className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Google Map Iframe */}
              <div className="relative w-full h-[320px] sm:h-[450px] rounded-xl overflow-hidden border border-white/10 bg-primary">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${venue}`}
                  className="w-full h-full"
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                <span>📍 Federal Capital Territory, Nigeria</span>
                <span>Click and drag to explore • Scroll to zoom</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Contact;
