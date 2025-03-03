"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardList,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import { RiNotificationLine, RiTeamLine, RiRocketLine } from "react-icons/ri";
import { BsCalendarCheck, BsLightningCharge } from "react-icons/bs";

// Animated section header component
const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
          {title}
        </span>
        <motion.div
          className="absolute h-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full left-1/2 transform -translate-x-1/2"
          initial={{ width: 0 }}
          animate={isInView ? { width: "60px" } : { width: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ bottom: "-10px" }}
        />
      </h2>
      <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">{subtitle}</p>
    </motion.div>
  );
};

// Stats counter component
const CounterAnimation = ({
  targetNumber,
  duration = 2,
}: {
  targetNumber: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = targetNumber / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start > targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, targetNumber, duration]);

  return <span ref={ref}>{count}</span>;
};

// Implement smooth scroll functionality
const ScrollLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const targetElement = document.querySelector(to);
    if (targetElement) {
      window.scrollTo({
        top:
          targetElement.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef);

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

  // Floating animation
  const floatingAnimation = {
    y: ["-5px", "5px", "-5px"],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Background accent */}
      <div className="fixed top-0 right-0 w-1/2 h-screen bg-gradient-to-b from-blue-50 to-white/0 opacity-60 -z-10" />
      <div className="fixed top-40 left-20 w-72 h-72 rounded-full bg-purple-300/30 blur-3xl -z-10" />
      <div className="fixed bottom-80 right-20 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl -z-10" />

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 w-full backdrop-blur-md z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Schoolyfied
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Features", href: "#features" },
              { name: "Solutions", href: "#solutions" },
              { name: "Pricing", href: "#pricing" },
              { name: "Contact", href: "#contact" },
            ].map((item, i) => (
              <ScrollLink
                key={i}
                to={item.href}
                className="group relative text-gray-700 hover:text-blue-600 transition cursor-pointer"
              >
                <span>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </ScrollLink>
            ))}
          </div>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-2 rounded-md hover:shadow-lg hover:shadow-blue-500/30 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative">
        <div className="absolute top-20 left-1/2 w-full h-80 -translate-x-1/2 bg-gradient-radial from-blue-400/10 to-transparent blur-3xl -z-10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={
                heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                <span className="flex items-center">
                  <BsLightningCharge className="mr-2" /> The Future of Education
                  Management
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                School Management{" "}
                <motion.span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-violet-600 inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  Simplified
                </motion.span>
              </h1>

              <p className="text-xl text-gray-600 mt-6">
                A comprehensive platform that transforms how schools operate,
                making administration effortless and education more effective.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  className="group bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-md transition text-lg font-medium flex items-center justify-center"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                  <motion.span
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={floatingAnimation}
                  >
                    <FaArrowRight />
                  </motion.span>
                </motion.button>

                <motion.button
                  className="bg-white text-blue-600 border border-blue-600 px-8 py-4 rounded-md hover:bg-blue-50 transition text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a Demo
                </motion.button>
              </div>

              <div className="mt-10 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                    >
                      <Image
                        src={`/images/avatars/avatar-${i}.jpg`}
                        alt="User avatar"
                        width={32}
                        height={32}
                        className="object-cover"
                        priority
                      />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    <strong className="text-gray-700">4.9/5</strong> from 500+
                    reviews
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 relative"
              style={{ y, opacity }}
              initial={{ opacity: 0, y: 50 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Main dashboard image */}
                <motion.div
                  className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-8 bg-gray-100 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-4">
                    <Image
                      src="/images/landing/dashboard-preview.jpg"
                      alt="Schoolyfied Dashboard"
                      width={700}
                      height={400}
                      className="w-full h-auto rounded-md"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-10 -right-10 bg-white p-4 rounded-lg shadow-lg"
                  animate={floatingAnimation}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-md">
                      <RiRocketLine className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">User Engagement</p>
                      <p className="font-bold text-gray-800">
                        +<CounterAnimation targetNumber={86} />%
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-10 bg-white p-4 rounded-lg shadow-lg"
                  animate={floatingAnimation}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-md">
                      <BsCalendarCheck className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time Saved</p>
                      <p className="font-bold text-gray-800">
                        <CounterAnimation targetNumber={25} /> hrs/week
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg shadow-lg p-4 text-white"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-bold">Trusted by</p>
                <p className="text-2xl font-bold">
                  <CounterAnimation targetNumber={500} />+
                </p>
                <p>Schools</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-slate-50"
            ></path>
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <SectionHeader
            title="Managing a School Shouldn't Be a Headache"
            subtitle="Schools face numerous challenges when it comes to administration, student tracking, and resource management."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>

            {[
              {
                icon: <FaClipboardList className="text-3xl" />,
                title: "Tedious Administrative Tasks",
                description:
                  "Hours spent on manual record keeping and paperwork that could be automated.",
                color: "from-blue-400 to-blue-600",
              },
              {
                icon: <RiNotificationLine className="text-3xl" />,
                title: "Communication Gaps",
                description:
                  "Difficulty in effectively communicating with students, teachers, and parents.",
                color: "from-indigo-400 to-indigo-600",
              },
              {
                icon: <FaChartLine className="text-3xl" />,
                title: "Performance Tracking",
                description:
                  "Challenging to track and analyze student and teacher performance metrics.",
                color: "from-purple-400 to-purple-600",
              },
              {
                icon: <FaChalkboardTeacher className="text-3xl" />,
                title: "Syllabus Management",
                description:
                  "Hard to keep track of curriculum progress across different classes.",
                color: "from-violet-400 to-violet-600",
              },
              {
                icon: <BsCalendarCheck className="text-3xl" />,
                title: "Attendance Issues",
                description:
                  "Manual attendance taking is error-prone and time-consuming.",
                color: "from-fuchsia-400 to-fuchsia-600",
              },
              {
                icon: <RiTeamLine className="text-3xl" />,
                title: "Resource Allocation",
                description:
                  "Inefficient allocation of resources and staff across the institution.",
                color: "from-blue-500 to-indigo-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition border border-gray-100 overflow-hidden group"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="p-6">
                  <div
                    className={`mb-4 w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-r ${item.color} text-white group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solutions" className="py-20 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/80 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-[url('/images/patterns/dots.svg')] opacity-5 -z-10"></div>

        <div className="container mx-auto px-6">
          <SectionHeader
            title="A Complete School Management Solution"
            subtitle="Our platform provides powerful tools to transform how your school operates day-to-day."
          />

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="flex flex-wrap border-b">
              {[
                {
                  title: "School Registration",
                  icon: <FaUserGraduate className="mr-2" />,
                },
                {
                  title: "Member Management",
                  icon: <RiTeamLine className="mr-2" />,
                },
                {
                  title: "Attendance Tracking",
                  icon: <BsCalendarCheck className="mr-2" />,
                },
                {
                  title: "Syllabus Management",
                  icon: <FaChalkboardTeacher className="mr-2" />,
                },
                {
                  title: "Announcements",
                  icon: <RiNotificationLine className="mr-2" />,
                },
                {
                  title: "Performance Tracking",
                  icon: <FaChartLine className="mr-2" />,
                },
              ].map((tab, index) => (
                <motion.button
                  key={index}
                  className={`px-6 py-4 font-medium text-sm md:text-base transition-colors flex items-center ${
                    activeTab === index
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ y: activeTab !== index ? -2 : 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon} {tab.title}
                </motion.button>
              ))}
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 0 && (
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          Simple School Registration
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Get your school onboarded quickly with our streamlined
                          registration process. Provide essential information
                          about your school and receive access credentials
                          immediately.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Quick setup process",
                            "Secure credential management",
                            "Customizable school profile",
                            "Data migration assistance",
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="mr-2 flex-shrink-0 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full text-white text-xs">
                                ✓
                              </span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg flex items-center group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn more
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      </div>
                      <motion.div
                        className="md:w-1/2"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/landing/school-social.jpg"
                            alt="School Registration"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === 1 && (
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          Comprehensive Member Management
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Easily add and manage all school members including
                          students, teachers, staff, and administrators with
                          role-based access controls.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Role-based permissions",
                            "Bulk import capabilities",
                            "Detailed member profiles",
                            "Organization hierarchy",
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="mr-2 flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-500 rounded-full text-white text-xs">
                                ✓
                              </span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg flex items-center group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn more
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      </div>
                      <motion.div
                        className="md:w-1/2"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/landing/teacher-details.jpg"
                            alt="Member Management System"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === 2 && (
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          Effortless Attendance Tracking
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Digitize attendance for students and staff with
                          real-time tracking, reports, and optional parent
                          notifications.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Digital attendance sheets",
                            "Automated reports",
                            "Parent notification options",
                            "Attendance analytics",
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="mr-2 flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full text-white text-xs">
                                ✓
                              </span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg flex items-center group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn more
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      </div>
                      <motion.div
                        className="md:w-1/2"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/landing/attendance-system.jpg"
                            alt="Attendance Tracking System"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === 3 && (
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          Smart Syllabus Management
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Create custom syllabi or use templates based on
                          educational boards. Track progress and ensure
                          curriculum completion.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Board-specific templates",
                            "Progress tracking",
                            "Resource attachment",
                            "Administrative oversight",
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="mr-2 flex-shrink-0 w-5 h-5 flex items-center justify-center bg-violet-500 rounded-full text-white text-xs">
                                ✓
                              </span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg flex items-center group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn more
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      </div>
                      <motion.div
                        className="md:w-1/2"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/landing/syllabus-management.jpg"
                            alt="Syllabus Management System"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === 4 && (
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          School-wide Announcements
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Share important notices and announcements with
                          specific groups or the entire school community through
                          multiple channels.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Targeted notifications",
                            "Multi-channel delivery",
                            "Scheduled announcements",
                            "Confirmation tracking",
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="mr-2 flex-shrink-0 w-5 h-5 flex items-center justify-center bg-fuchsia-500 rounded-full text-white text-xs">
                                ✓
                              </span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg flex items-center group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn more
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      </div>
                      <motion.div
                        className="md:w-1/2"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/landing/dashboard-preview.jpg"
                            alt="Announcement System"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === 5 && (
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          Comprehensive Performance Tracking
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Monitor and evaluate both teacher and student
                          performance through data-driven insights and
                          customizable metrics.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Teacher evaluation tools",
                            "Student progress tracking",
                            "Performance analytics",
                            "Improvement recommendations",
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="mr-2 flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full text-white text-xs">
                                ✓
                              </span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg flex items-center group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn more
                          <motion.span
                            className="ml-2"
                            initial={{ x: 0 }}
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      </div>
                      <motion.div
                        className="md:w-1/2"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src="/images/landing/performance-analytics.jpg"
                            alt="Performance Tracking System"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Flexible Plans for Schools of All Sizes
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Choose the plan that best fits your institution's needs and
              budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$199",
                period: "per month",
                description:
                  "Perfect for small schools just getting started with digital management.",
                features: [
                  "Up to 500 students",
                  "Basic attendance system",
                  "Simple member management",
                  "Email support",
                  "Mobile app access",
                ],
                buttonText: "Get Started",
                highlighted: false,
              },
              {
                name: "Professional",
                price: "$399",
                period: "per month",
                description:
                  "For established schools requiring more advanced features.",
                features: [
                  "Up to 2,000 students",
                  "Advanced attendance with analytics",
                  "Full member management",
                  "Syllabus tracking",
                  "Performance analytics",
                  "Priority support",
                ],
                buttonText: "Most Popular",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description:
                  "Tailored solutions for large educational institutions and districts.",
                features: [
                  "Unlimited students",
                  "All Professional features",
                  "API access",
                  "Custom integrations",
                  "Dedicated account manager",
                  "SLA guarantees",
                  "On-premise options",
                ],
                buttonText: "Contact Sales",
                highlighted: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`rounded-lg p-8 ${
                  plan.highlighted
                    ? "bg-blue-600 text-white shadow-xl scale-105"
                    : "bg-white border border-gray-200 shadow-lg"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-sm opacity-80">{plan.period}</span>
                </div>
                <p
                  className={`mb-6 ${plan.highlighted ? "text-blue-100" : "text-gray-600"}`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span
                        className={`mr-2 ${plan.highlighted ? "text-blue-200" : "text-green-500"}`}
                      >
                        ✓
                      </span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-md font-medium transition ${
                    plan.highlighted
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Ready to Simplify Your School Management?
            </h2>
            <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              Get in touch with our team to learn more or schedule a
              personalized demo.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-blue-600 text-white p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-blue-200">Email</p>
                    <p className="font-medium">contact@schoolyfied.com</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-blue-200">Address</p>
                    <p className="font-medium">
                      123 Education Street
                      <br />
                      Technology Park
                      <br />
                      Innovation City, 12345
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-4 text-blue-200">Follow us</p>
                  <div className="flex space-x-4">
                    {["Twitter", "LinkedIn", "Facebook", "Instagram"].map(
                      (social, i) => (
                        <Link
                          key={i}
                          href="#"
                          className="hover:text-blue-200 transition"
                        >
                          {social}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Send us a message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="How can we help you?"
                      rows={4}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Schoolyfied</h3>
              <p className="text-gray-400">
                Transforming school management through innovative technology
                solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {[
                  "Features",
                  "Pricing",
                  "Testimonials",
                  "Case Studies",
                  "Updates",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {[
                  "Blog",
                  "Documentation",
                  "Help Center",
                  "Community",
                  "Webinars",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Careers",
                  "Privacy Policy",
                  "Terms of Service",
                  "Contact",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2023 Schoolyfied. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "LinkedIn", "Facebook", "Instagram"].map(
                (social, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    {social}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
