import { motion } from "framer-motion";
import mascot from "../assets/cute.svg";
export default function CodeSnippetLogin() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#050B0C] text-white flex items-center justify-center px-5">
      <div className="relative w-full max-w-[430px] min-h-screen py-8 flex flex-col items-center">
        <motion.div
          className="absolute top-20 h-72 w-72 rounded-full bg-[#8BC79A]/20 blur-[90px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center mt-8"
        >
          <div className="text-4xl font-bold tracking-tight">
            code<span className="text-[#8BC79A]">snippet</span>
          </div>
          <p className="mt-2 text-sm text-[#8D9993]">
            Store. Organize. Reuse your code.
          </p>
        </motion.div>

        <motion.div
          className="relative z-10 mt-6 w-[285px]"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 0.6 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-[#8BC79A]/20 blur-[70px]"
            animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative drop-shadow-[0_0_35px_rgba(139,199,154,0.2)]">
            <motion.img
              src={mascot}
              alt="CodeSnippet mascot"
              className="w-[280px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="relative z-20 mt-auto mb-6 w-full rounded-[32px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl"
        >
          <h1 className="text-3xl font-bold">Welcome back 👋</h1>
          <p className="mt-2 text-sm text-[#8D9993]">
            Sign in to continue to{" "}
            <span className="text-[#8BC79A]">codesnippet</span>
          </p>

          <div className="mt-6 space-y-4">
            <input
              placeholder="Email address"
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm outline-none placeholder:text-[#8D9993] focus:border-[#8BC79A]"
            />

            <input
              type="password"
              placeholder="Password"
              className="h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm outline-none placeholder:text-[#8D9993] focus:border-[#8BC79A]"
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(139,199,154,.35)",
            }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 h-14 w-full rounded-2xl bg-[#8BC79A] font-semibold text-[#06100A]"
          >
            Sign In
          </motion.button>

          <div className="my-5 flex items-center gap-3 text-sm text-[#8D9993]">
            <span className="h-px flex-1 bg-white/10" />
            or
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 font-medium"
          >
            Continue with GitHub
          </motion.button>

          <p className="mt-5 text-center text-sm text-[#8D9993]">
            Don’t have an account?{" "}
            <span className="text-[#8BC79A]">Sign up</span>
          </p>
        </motion.section>
      </div>
    </main>
  );
}
