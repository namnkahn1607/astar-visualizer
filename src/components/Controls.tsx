import React from "react";
import {Pause, Play, RotateCcw, Zap} from "lucide-react";

interface ControlsProps {
    isRunning: boolean;
    isFinished: boolean;
    speed: number;
    heuristic: 'manhattan' | 'euclidean' | 'diagonal';
    allowDiagonal: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onSpeedChange: (speed: number) => void;
    onHeuristicChange: (heuristic: 'manhattan' | 'euclidean' | 'diagonal') => void;
    onDiagonalToggle: () => void;
    onInstantSolve: () => void;
}

const Controls: React.FC<ControlsProps> = ({
                                               isRunning,
                                               isFinished,
                                               speed,
                                               heuristic,
                                               allowDiagonal,
                                               onStart,
                                               onPause,
                                               onReset,
                                               onSpeedChange,
                                               onHeuristicChange,
                                               onDiagonalToggle,
                                               onInstantSolve
                                           }) => {
    return (
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex gap-2">
                <button
                    onClick={isRunning ? onPause : onStart}
                    disabled={isFinished}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isRunning ? <Pause size={20} /> : <Play size={20} />}
                    {isRunning ? 'Pause' : 'Start'}
                </button>

                <button
                    onClick={onInstantSolve}
                    disabled={isRunning || isFinished}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    <Zap size={20} />
                    Solve
                </button>

                <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    <RotateCcw size={20} />
                    Reset
                </button>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                    Speed: {speed}ms
                </label>
                <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={speed}
                    onChange={(e) => onSpeedChange(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                    Heuristic Function
                </label>
                <select
                    value={heuristic}
                    onChange={(e) => onHeuristicChange(e.target.value as never)}
                    disabled={isRunning}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                    <option value="manhattan">Manhattan Distance</option>
                    <option value="euclidean">Euclidean Distance</option>
                    <option value="diagonal">Diagonal Distance</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="diagonal"
                    checked={allowDiagonal}
                    onChange={onDiagonalToggle}
                    disabled={isRunning}
                    className="w-4 h-4"
                />
                <label htmlFor="diagonal" className="text-sm font-semibold text-gray-700">
                    Allow Diagonal Movement
                </label>
            </div>
        </div>
    );
};

export { Controls };