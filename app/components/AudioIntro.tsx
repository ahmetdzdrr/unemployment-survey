'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2 } from 'lucide-react'

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
            className="flex flex-col items-center justify-center space-y-8 p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold text-center">
                Ankete başlamadan önce lütfen açıklamayı dinleyiniz
            </h2>

            <div className="w-full space-y-6">
                <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
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
                        className="relative z-10 flex items-center justify-center w-16 h-16 bg-black rounded-full text-white hover:bg-gray-800 transition-colors"
                    >
                        {isPlaying ? (
                            <Pause className="w-8 h-8" />
                        ) : (
                            <Play className="w-8 h-8 ml-1" />
                        )}
                    </button>
                </div>

                <div className="space-y-2">
                    <div
                        ref={progressBarRef}
                        onClick={handleProgressBarClick}
                        className="h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
                    >
                        <motion.div
                            className="h-full bg-black"
                            style={{ width: `${progress}%` }}
                            transition={{ type: "tween" }}
                        />
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
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
                            className="w-full bg-black hover:bg-gray-800 text-white"
                        >
                            Ankete Başla
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {!hasEnded && (
                <p className="text-sm text-gray-500 text-center">
                    Ankete başlamak için açıklamayı sonuna kadar dinlemeniz gerekmektedir.
                </p>
            )}
        </motion.div>
    )
} 