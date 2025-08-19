'use client';

import React, { useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Send, User, AtSign, GitMerge, Linkedin, Github, MapPin, Languages } from 'lucide-react';
import emailjs from '@emailjs/browser';
import key from "@/lib/keys.json";

// --- TYPE DEFINITIONS ---

interface Props {
    data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
}

interface ContactInfo {
    name: string;
    address: string;
    email: string;
    languages: string;
    github: string;
    linkedin: string;
    contactMessage: string;
}

// --- MAIN CONTACT SECTION COMPONENT ---

const ContactSection = ({ data }: Props) => {
    const form = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const EMAILJS_SERVICE_ID = key.serviceKey;
    const EMAILJS_TEMPLATE_ID = key.templateKey;
    const EMAILJS_PUBLIC_KEY = key.publicKey;

    const contactData: ContactInfo = {
        name: data.name,
        address: data.address,
        email: data.email,
        languages: data.languages,
        github: data.github,
        linkedin: data.linkedin,
        contactMessage: data.contact,
    };

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;

        setIsSending(true);
        setError(null);

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
            .then(() => {
                setIsSent(true);
                form.current?.reset();
                setTimeout(() => setIsSent(false), 5000);
            }, (err) => {
                setError("Failed to send message. Please try again later.");
                console.error('FAILED...', err.text);
                setTimeout(() => setError(null), 5000);
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2,
                duration: 0.5
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section id="contact" className="relative bg-gray-900 text-white pt-0 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* --- Background glowing blobs --- */}
            <div className="absolute top-1/4 -left-12 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse" />
            <div className="absolute bottom-1/4 -right-12 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-4000" />

            <div className="relative max-w-5xl mx-auto z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                            Contact Me
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto mt-4 text-gray-400 text-lg">
                        Have a question or want to work together? Send me a pull request.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                    {/* --- Left Side: Info --- */}
                    <motion.div
                        className="md:w-1/2"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white mb-4">Get in Touch</motion.h3>
                        <motion.p variants={itemVariants} className="text-gray-400 mb-8">{contactData.contactMessage}</motion.p>

                        <motion.div variants={itemVariants} className="space-y-4 font-mono text-sm">
                            <div className="flex items-center">
                                <User className="text-green-400 mr-4 flex-shrink-0" size={20} />
                                <div>
                                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                    <span className="text-gray-500">// Name</span>
                                    <p className="text-gray-200">{contactData.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="text-green-400 mr-4 flex-shrink-0" size={20} />
                                <div>
                                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                    <span className="text-gray-500">// Address</span>
                                    <p className="text-gray-200">{contactData.address}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <AtSign className="text-green-400 mr-4 flex-shrink-0" size={20} />
                                <div>
                                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                    <span className="text-gray-500">// Email</span>
                                    <p className="text-gray-200">{contactData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Languages className="text-green-400 mr-4 flex-shrink-0" size={20} />
                                <div>
                                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                    <span className="text-gray-500">// Languages</span>
                                    <p className="text-gray-200">{contactData.languages}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <GitMerge className="text-green-400 mr-4 flex-shrink-0" size={20} />
                                <div>
                                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                    <span className="text-gray-500">// Find me on</span>
                                    <div className="flex items-center gap-4 mt-1">
                                        <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                                            <Github size={20} className="mr-2" /> GitHub
                                        </a>
                                        <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                                            <Linkedin size={20} className="mr-2" /> LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* --- Right Side: Form --- */}
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Send me an Email</h3>
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
                            <div className="bg-gray-800 p-3 flex items-center">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                </div>
                                <p className="flex-grow text-center text-gray-400 text-sm font-mono">/new/patch.js</p>
                            </div>
                            <form ref={form} onSubmit={sendEmail} className="p-6 flex">
                                <div className="text-gray-500 font-mono text-right pr-4 select-none">
                                    {[...Array(7)].map((_, i) => <div key={i}>{i + 1}</div>)}
                                </div>
                                <div className="flex-grow space-y-3 font-mono">
                                    <div className="flex items-center">
                                        <span className="text-cyan-400 mr-2">const</span>
                                        <span className="text-green-300 mr-2">name</span>=
                                        <input type="text" name="user_name" placeholder='"Your Name"' required className="bg-transparent border-b border-gray-600 focus:border-green-400 outline-none w-full text-yellow-300 pl-2" />
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-cyan-400 mr-2">const</span>
                                        <span className="text-green-300 mr-2">yourEmail</span>=
                                        <input type="email" name="user_email" placeholder='"your@email.com"' required className="bg-transparent border-b border-gray-600 focus:border-green-400 outline-none w-full text-yellow-300 pl-2" />
                                    </div>
                                    <div className="flex items-start">
                                        <span className="text-cyan-400 mr-2 pt-1">const</span>
                                        <span className="text-green-300 mr-2 pt-1">message</span>=
                                        <textarea name="message" placeholder='`Your message here...`' required rows={3} className="bg-transparent border-b border-gray-600 focus:border-green-400 outline-none w-full text-yellow-300 pl-2 resize-none" />
                                    </div>
                                    <button type="submit" disabled={isSending} className="w-full mt-4 bg-green-500/20 border border-green-500 text-green-300 font-bold py-2 px-4 rounded-md hover:bg-green-500/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                        <Send size={16} className="mr-2" /> {isSending ? 'Sending Patch...' : isSent ? 'Patch Sent!' : 'Submit Pull Request'}
                                    </button>
                                    {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>

                <div className="border-t border-gray-800 mt-20 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} {contactData.name}. All Rights Reserved.</p>
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    <p className="text-xs mt-2 font-mono">// Coded using 100% Recycled ♻️ Electrons.</p>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
