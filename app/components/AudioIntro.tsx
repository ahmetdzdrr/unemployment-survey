'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

interface AudioIntroProps {
    onComplete: () => void
}

export default function AudioIntro({ onComplete }: AudioIntroProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasEnded, setHasEnded] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('loadedmetadata', () => {
                setDuration(audioRef.current?.duration || 0)
            })
        }
    }, [])

    useEffect(() => {
        let animationFrame: number

        const updateProgress = () => {
            if (audioRef.current && isPlaying) {
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
                animationFrame = requestAnimationFrame(updateProgress)
            }
        }

        if (isPlaying) {
            animationFrame = requestAnimationFrame(updateProgress)
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [isPlaying])

    const handlePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleEnded = () => {
        setHasEnded(true)
        setIsPlaying(false)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && audioRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect()
            const pos = (e.clientX - rect.left) / rect.width
            audioRef.current.currentTime = pos * audioRef.current.duration
            setProgress(pos * 100)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center space-y-6 p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-xl shadow-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
        >
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
                Ankete başlamadan önce lütfen açıklamayı dinleyiniz
            </h2>

            <div className="w-full space-y-6">
                <div className="relative flex items-center justify-center w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 mx-auto">
                    <motion.div
                        className="absolute inset-0 bg-gray-100 rounded-full"
                        animate={{
                            scale: isPlaying ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                            repeat: isPlaying ? Infinity : 0,
                            duration: 1.5,
                        }}
                    />
                    <button
                        onClick={handlePlay}
                        className="relative z-10 flex items-center justify-center w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-black rounded-full text-white hover:bg-gray-800 transition-colors"
                    >
                        {isPlaying ? (
                            <Pause className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10" />
                        ) : (
                            <Play className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 ml-1" />
                        )}
                    </button>
                </div>

                <div className="space-y-2 w-full">
                    <div
                        ref={progressBarRef}
                        onClick={handleProgressBarClick}
                        className="h-2 md:h-3 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
                    >
                        <motion.div
                            className="h-full bg-black"
                            style={{ width: `${progress}%` }}
                            transition={{ type: "tween" }}
                        />
                    </div>

                    <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                        <span>{formatTime((duration * progress) / 100)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            <audio
                ref={audioRef}
                src="/audio.mp3"
                onEnded={handleEnded}
                className="hidden"
            />

            <AnimatePresence>
                {hasEnded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full"
                    >
                        <Button
                            onClick={onComplete}
                            className="w-full bg-black hover:bg-gray-800 text-white text-sm sm:text-base md:text-lg py-2 sm:py-3 md:py-4"
                        >
                            Ankete Başla
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {!hasEnded && (
                <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center">
                    Ankete başlamak için açıklamayı sonuna kadar dinlemeniz gerekmektedir.
                </p>
            )}
        </motion.div>
    )
}
