"use client";

import { useEffect, useRef } from "react";
import styles from "./MotionBG.module.css";

const motionBG = () => {
    const interactiveRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number | null>(null);


    useEffect(() => {
        const interBubble = interactiveRef.current;
        if (!interBubble) return;

        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        const animate = () => {
            curX += (tgX - curX) * 0.05;
            curY += (tgY - curY) * 0.05;
            interBubble.style.transform = `translate(${curX}px, ${curY}px)`;
            animationFrameId.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            tgX = e.clientX;
            tgY = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <svg style={{ display: "none" }}>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
                    />
                </filter>
            </svg>

            <svg style={{ display: "none" }}>
                <filter id="noiseFilter">
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='1.5'
                        numOctaves='6'
                        stitchTiles='stitch' />
                    <feBlend
                        mode="multiply"
                        in="SourceGraphic"
                        in2="noise"
                    />
                </filter>
            </svg>

            <div className={styles.gradientNoise} >
                <div className={styles.gradientBg}>
                    <div className={styles.gradientsContainer}>
                        <div className={styles.g1} />
                        <div className={styles.g2} />
                        <div className={styles.g3} />
                        <div className={styles.g4} />
                        <div className={styles.g5} />
                        <div className={styles.interactive} ref={interactiveRef} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default motionBG;
