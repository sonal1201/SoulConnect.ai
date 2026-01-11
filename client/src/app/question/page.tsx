'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface Question {
  question: string
  options: string[]
}

interface Answer {
  question: string
  answer: string
}


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function Page() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/question`
        )
        setQuestions(res.data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestion()
  }, [])

  const saveAnswer = () => {
    const q = questions[currentIndex]
    return {
      question: q.question,
      answer: selected
    }
  }

  const handleNext = () => {
    setAnswers(prev => [...prev, saveAnswer()])
    setSelected('')
    setCurrentIndex(prev => prev + 1)
  }

  const handleSubmit = async () => {
    const finalAnswers = [...answers, saveAnswer()]
    try {
      const id = sessionStorage.getItem("userid")

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/answer/${id}`,
        { answers: finalAnswers }
      )
      router.push(`/profile/${id}`);

    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-zinc-300 text-xl text-center min-h-screen flex items-center justify-center">Loading...</motion.div>

  if (!questions.length) return <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-zinc-300 text-xl text-center min-h-screen flex items-center justify-center">No questions found</motion.div>

  const isLastQuestion = currentIndex === questions.length - 1
  const currentQuestion = questions[currentIndex]

  return (
    <section className="relative z-10  flex items-center justify-center px-6 py-10">
      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl mx-auto text-white"
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Progress */}
        <motion.div className="text-center mb-8" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50">
            Soul Questions
          </h1>
          <div className="w-full bg-zinc-800/50 backdrop-blur-sm rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-rose-500 to-red-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-12">
            {currentIndex + 1} / {questions.length}
          </p>
        </motion.div>

        {/* Question Card */}
        <motion.div 
          initial={{opacity:0, y:30}} 
          animate={{opacity:1, y:0}} 
          transition={{duration:0.6}}
          className="backdrop-blur-xl bg-black/20 border border-zinc-700/50 rounded-2xl p-8 shadow-2xl shadow-black/30"
        >
          <motion.h2 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            transition={{delay:0.2}}
            className="text-2xl md:text-3xl font-bold mb-8 text-center leading-tight"
          >
            {currentQuestion.question}
          </motion.h2>

          {currentQuestion.options.length > 0 ? (
            <motion.div 
              initial={{opacity:0}} 
              animate={{opacity:1}} 
              transition={{delay:0.3}}
              className="space-y-3"
            >
              {currentQuestion.options.map(option => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(option)}
                  className={`group w-full text-left px-6 py-5 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm font-medium ${
                    selected === option
                      ? 'bg-gradient-to-r from-rose-500/30 to-red-600/30 border-rose-500 shadow-lg shadow-rose-500/25 text-white'
                      : 'border-zinc-600/50 bg-zinc-900/10 hover:border-rose-400 hover:bg-rose-500/10 text-zinc-200'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full transition-all ${
                      selected === option ? 'bg-rose-400 scale-125 shadow-lg' : 'bg-zinc-500 group-hover:bg-rose-400'
                    }`} />
                    {option}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.textarea
              initial={{opacity:0}} 
              animate={{opacity:1}} 
              transition={{delay:0.3}}
              className="w-full p-5 text-white bg-zinc-900/20 border border-zinc-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-vertical min-h-[100px] placeholder:text-zinc-500"
              placeholder="Type your answer..."
              value={selected}
              onChange={e => setSelected(e.target.value)}
            />
          )}

          <motion.div 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            transition={{delay:0.4}}
            className="mt-8 flex justify-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={isLastQuestion ? handleSubmit : handleNext}
              disabled={!selected}
              className={`w-full max-w-sm px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl ${
                selected
                  ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-rose-500/25 hover:shadow-rose-500/40 hover:from-rose-600 hover:to-red-700 text-white'
                  : 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
              }`}
            >
              {isLastQuestion ? 'Submit' : 'Next →'}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Page
