import React from 'react';
import { AlertTriangle, AlertCircle, Clock, MapPin, Activity, ShieldAlert } from 'lucide-react';

export default function SmartAlertsSidebar({ incidents, predictions, onSelectAlert }) {
    // Sort incidents by severity (descending)
    const sortedIncidents = [...incidents].sort((a, b) => b.severity - a.severity);
    // Sort predictions by risk score (descending)
    const sortedPredictions = [...predictions].sort((a, b) => b.risk_score - a.risk_score);

    return (
        <div className="w-80 h-full bg-dark-elevated/95 backdrop-blur-md border-r border-dark-border flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-10 relative">

            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-800 bg-gradient-to-b from-dark-elevated to-transparent">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-white">Command Center</h2>
                </div>
                <p className="text-xs text-gray-400 font-medium tracking-wide">URBAN PULSE AI SECURE FEED</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">

                {/* Predicted Failure Zones Section */}
                <div>
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-red-500" />
                            AI Predictions
                        </h3>
                        <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                            {sortedPredictions.length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {sortedPredictions.map((zone) => (
                            <div
                                key={zone.id}
                                onClick={() => onSelectAlert(zone)}
                                className="bg-dark-surface border border-red-900/50 rounded-xl p-4 hover:border-red-500/50 hover:bg-black/40 transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] overflow-hidden relative"
                            >
                                {/* Subtle red glow line on the left */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-red-600 rounded-l-xl opacity-80 group-hover:opacity-100"></div>

                                <div className="flex justify-between items-start mb-2 pl-2">
                                    <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                                        <AlertTriangle className="w-4 h-4" />
                                        Failure Zone
                                    </div>
                                    <div className="bg-red-500/10 px-2 py-0.5 rounded text-red-400 text-xs border border-red-500/20 font-bold font-mono">
                                        {zone.risk_score}/100
                                    </div>
                                </div>

                                <div className="pl-2 space-y-2 mt-3">
                                    <p className="text-xs text-gray-400 font-mono tracking-wide">{zone.id}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Cluster ({zone.incident_count})</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Active</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {sortedPredictions.length === 0 && (
                            <p className="text-xs text-gray-500 text-center py-4 italic border border-dashed border-gray-800 rounded-xl">No failure zones predicted.</p>
                        )}
                    </div>
                </div>

                {/* Live Incident Reports Section */}
                <div>
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            Live Reports
                        </h3>
                        <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                            {sortedIncidents.length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {sortedIncidents.slice(0, 15).map((incident) => ( // Show top 15 to keep it manageable
                            <div
                                key={incident.id}
                                onClick={() => onSelectAlert(incident)}
                                className="bg-dark-surface border border-gray-800 rounded-xl p-3.5 hover:border-orange-500/40 hover:bg-black/40 transition-all cursor-pointer group shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-1.5">
                                    <div className="font-medium text-gray-200 text-sm">{incident.type}</div>
                                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${incident.severity >= 8 ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                        Sev {incident.severity}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                                    <p className="font-mono text-gray-600">{incident.id}</p>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(incident.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
