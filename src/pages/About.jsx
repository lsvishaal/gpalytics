import { motion } from "framer-motion";
import { FaUpload, FaChartLine, FaEye } from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload className="text-cyan-400 text-4xl mb-4" />,
    title: "Upload",
    desc: "Snap or select your result image.",
  },
  {
    icon: <FaChartLine className="text-cyan-400 text-4xl mb-4" />,
    title: "Analyze",
    desc: "We process your grades instantly.",
  },
  {
    icon: <FaEye className="text-cyan-400 text-4xl mb-4" />,
    title: "View Insights",
    desc: "See your CGPA, trends, and strengths",
  },
];

const About = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4 py-24 text-white">
    <motion.h1
      className="text-5xl md:text-6xl font-title font-extrabold text-center text-cyan-300 mb-8 drop-shadow-lg"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      Why GPAlytics?
    </motion.h1>
    <motion.p
      className="text-xl text-center text-gray-300 mb-16 max-w-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
    >
      Automated Solution for a manual tedious task
    </motion.p>
    <motion.div
      className="w-full flex flex-col md:flex-row items-center justify-center gap-12 mb-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
    >
      <div className="flex-1 max-w-xl bg-gradient-to-br from-cyan-900/60 via-slate-900/60 to-cyan-800/40 rounded-3xl shadow-2xl backdrop-blur-2xl p-10 md:p-14 border border-cyan-800/30">
        <h2 className="text-2xl font-bold text-cyan-200 mb-4">The Problem</h2>
        <p className="text-gray-200 text-lg leading-relaxed">
          <span className="mb-4">
          Tired of entering grades and credits one by one? Traditional GPA calculators waste your time and energy<br/><br/>
          </span>

          <span className="mt-4">
            <span className="text-blue-300 font-bold">GPAlytics</span> turns your result image into instant insights—CGPA, subject strengths, and trends, all in one click
          </span>
        </p>
      </div>
      <div className="hidden md:block h-64 w-1 bg-gradient-to-b from-cyan-700/30 via-transparent to-cyan-700/30 rounded-full" />
      <div className="flex-1 max-w-xl flex flex-col gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            className="flex items-center gap-6 bg-gradient-to-br from-slate-900/60 via-cyan-900/40 to-slate-800/30 rounded-2xl shadow-xl p-7 backdrop-blur-xl border border-cyan-800/20 hover:scale-[1.03] transition-transform"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 * idx }}
          >
            <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-cyan-900/40 w-16 h-16 shadow-md">
              {step.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-200 mb-1">
                {step.title}
              </h3>
              <p className="text-gray-300 text-base">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    <motion.div
      className="text-center text-gray-400 max-w-2xl mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      
      <p className="">
        <span className="font-bold text-cyan-300 text-4xl">
          Built by students, for students.
        </span>{" "}<br></br>
        <span className="text-2xl">
        Your privacy is our priority.
        </span>
      </p>
    </motion.div>
  </div>
);

export default About;
