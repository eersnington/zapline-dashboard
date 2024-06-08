"use client";

import React from 'react';
import { Mic, Download } from 'lucide-react';
import { format } from 'date-fns';

interface CallRecording {
    id: number;
    date: Date;
}

interface CallRecordingsProps {
    recordings: CallRecording[];
}

const CallRecordings: React.FC<CallRecordingsProps> = ({ recordings }) => {
    return (
        <div className="flex flex-col gap-4">
            {recordings.map((recording) => (
                <div key={recording.id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <Mic className="text-blue-500 dark:text-blue-400" />
                        <span className="font-bold text-black dark:text-white">Call Recording</span>
                        <span className="text-gray-500 dark:text-gray-400">
                            {format(recording.date, 'MM/dd/yyyy HH:mm')}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white text-black hover:bg-blue-700 dark:bg-white dark:hover:bg-white">
                            Check Transcript
                        </button>
                        <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white text-black hover:bg-blue-700 dark:bg-white dark:hover:bg-white">
                            <Download className="text-black" /> Download
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CallRecordings;
