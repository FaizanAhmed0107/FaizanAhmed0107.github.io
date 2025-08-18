"use client";

import { Button } from "./ui/button";

interface Props {
    data: {
        [key: string]: any;
    };
}

export default function ActionButtons({ data }: Props) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mt-7.5">
            <Button variant="secondary" className="text-base p-6 w-max text-text transition-transform duration-300 hover:-translate-y-1 cursor-pointer active:translate-y-0.5"
                onClick={() => window.open(data.linkedin, '_blank', 'noopener,noreferrer')}>View My Work</Button>
            <Button className="text-base p-6 w-max text-background transition-transform duration-300 hover:-translate-y-1 cursor-pointer active:translate-y-0.5"
                onClick={() => window.open(data.cv, '_blank', 'noopener,noreferrer')}>Download Resume</Button>
        </div>
    );
}
