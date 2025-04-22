import { motion } from "framer-motion";
import { RandomAvatar } from "react-random-avatars";

const collaborators = [
  {
    name: "Vishaal LS",
    role: "Frontend Developer",
    description:
      "Created the entire front end of GPAlytics, designing and implementing all user interfaces, dashboard analytics, and interactive features for a seamless user experience.",
    github: "https://github.com/vishaal-ls", // Update with actual GitHub if available
    email: "vishaal.ls@example.com", // Update with actual email if available
    value: "1"
  },
  {
    name: "Pramod Adhav",
    role: "Frontend Developer",
    description:
      "Developed the export feature, enabling users to export their analytics and results efficiently from the platform.",
    github: "https://github.com/pramodadhav", // Update with actual GitHub if available
    email: "pramod.adhav@example.com", // Update with actual email if available
    value: "2"
  },
  {
    name: "Vijay Anand",
    role: "Backend Developer",
    description:
      "Built the entire backend infrastructure, including API development, authentication, and database integration to power GPAlytics.",
    github: "https://github.com/vijayanand58", // Update with actual GitHub if available
    email: "vijay.anand@example.com", // Update with actual email if available
    value: "3"
  },
];

const Collaborators = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center py-16 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-title font-extrabold text-center text-cyan-400 mb-2 drop-shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Collaborators
      </motion.h1>
      <motion.p
        className="text-lg text-cyan-100/80 text-center mt-10 mb-10 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Meet the team behind GPAlytics.
      </motion.p>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {collaborators.map((c, idx) => (
          <motion.div
            key={c.name}
            className="rounded-xl bg-gradient-to-br from-cyan-900/70 via-black/60 to-cyan-800/60 shadow-xl backdrop-blur-xl p-7 flex flex-col items-center text-center hover:bg-cyan-900/80 transition-colors duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1, duration: 0.7 }}
          >
            <div className="mb-4">
              <RandomAvatar name={c.value} size={80} />
            </div>
            <h2 className="text-2xl font-title font-bold text-cyan-200 mb-1">
              {c.name}
            </h2>
            <h3 className="text-cyan-300 font-semibold mb-2">{c.role}</h3>
            <p className="text-cyan-100/80 mb-4 text-sm">{c.description}</p>
            <div className="flex gap-4 justify-center">
              <a
                href={c.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transition-colors text-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.841-2.338 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.135 20.163 22 16.417 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
              <a
                href={`mailto:${c.email}`}
                className="text-yellow-400 hover:text-yellow-300 transition-colors text-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collaborators;
