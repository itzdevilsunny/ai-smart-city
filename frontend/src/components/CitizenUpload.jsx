import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';

export default function CitizenUpload({ onClose }) {
    const [file, setFile] = useState(null);
    const [issueType, setIssueType] = useState('Pothole');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            setFile(droppedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(droppedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsSubmitting(true);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', issueType);

        try {
            const response = await axios.post('http://localhost:8000/api/analyze-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
            setResult({ error: 'Failed to analyze image' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-dark-elevated rounded-xl border border-dark-border shadow-2xl p-6 w-full max-w-md relative overflow-hidden backdrop-blur-xl bg-opacity-90">

            {/* Dynamic Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Citizen Report
                    </h2>
                    <p className="text-sm text-gray-400">AI-Powered Rapid Assessment</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Dropdown styling */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Issue Category</label>
                    <div className="relative">
                        <select
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full bg-dark-surface border border-gray-700 rounded-lg p-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all cursor-pointer"
                        >
                            <option value="Pothole">Pothole Damage</option>
                            <option value="Streetlight Out">Streetlight Disrepair</option>
                            <option value="Garbage Overflow">Refuse Accumulation</option>
                            <option value="Water Leak">Utility Leak</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Drag and Drop Zone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Visual Evidence</label>
                    <div
                        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer group ${preview ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-gray-700 hover:border-blue-500/50 hover:bg-blue-500/5'}`}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload').click()}
                    >
                        {preview ? (
                            <div className="relative w-full h-40 group-hover:opacity-80 transition-opacity">
                                <img src={preview} alt="Upload preview" className="w-full h-full object-cover rounded-lg border border-gray-600" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                    <span className="text-white text-sm font-medium flex items-center gap-2"><UploadCloud className="w-4 h-4" /> Replace Image</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-3 py-6">
                                <div className="w-12 h-12 bg-dark-surface rounded-full flex items-center justify-center mx-auto border border-gray-700 group-hover:border-blue-500/30">
                                    <UploadCloud className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-300">Drag & drop an image</p>
                                    <p className="text-xs text-gray-500 mt-1">or click to browse files</p>
                                </div>
                            </div>
                        )}
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!file || isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium p-3 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                >
                    {isSubmitting ? (
                        <><Loader2 className="animate-spin w-5 h-5" /> Analyzing...</>
                    ) : (
                        'Submit Report'
                    )}
                </button>
            </form>

            {/* Futuristic Result Card */}
            {result && !result.error && (
                <div className="mt-6 border-t border-gray-800 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        AI Assessment Complete
                    </h3>

                    <div className="bg-dark-surface rounded-lg p-4 border border-gray-700/50">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Detected Object</p>
                                <p className="font-medium text-white text-lg capitalize truncate max-w-[150px]" title={result.ai_analysis}>
                                    {result.ai_analysis.split(',')[0]} {/* Simplify ImageNet label */}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Confidence</p>
                                <p className="font-mono text-emerald-400 font-bold text-lg">{result.confidence}%</p>
                            </div>
                        </div>

                        {/* Confidence Bar */}
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mt-2 mb-4">
                            <div
                                className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${result.confidence}%` }}
                            ></div>
                        </div>

                        {/* Alert Status */}
                        {result.alert_triggered ? (
                            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 p-2.5 rounded border border-red-500/20">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span className="font-medium">High certainty. Alert routed to dispatch.</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-sm text-yellow-400 bg-yellow-500/10 p-2.5 rounded border border-yellow-500/20">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                                <span className="text-gray-300">Logged for routine maintenance review.</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {result && result.error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {result.error}
                </div>
            )}
        </div>
    );
}
