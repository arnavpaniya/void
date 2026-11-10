"use client";

import React, { useState } from "react";
import { X, Minus, Plus } from "lucide-react";

interface SizeGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MeasurementRow {
  size: string;
  chest: number;
  length: number;
  shoulder: number;
  sleeve: number;
}

const INCH_MEASUREMENTS: MeasurementRow[] = [
  { size: "S", chest: 42, length: 29.5, shoulder: 22, sleeve: 9 },
  { size: "M", chest: 44, length: 29, shoulder: 22.5, sleeve: 9.5 },
  { size: "L", chest: 46, length: 30, shoulder: 23.5, sleeve: 9.5 },
  { size: "XL", chest: 48, length: 31, shoulder: 24.5, sleeve: 9.5 },
  { size: "XXL", chest: 50, length: 31.5, shoulder: 25.5, sleeve: 10 },
];

export function SizeGuideDrawer({ isOpen, onClose }: SizeGuideDrawerProps) {
  const [unit, setUnit] = useState<"inch" | "cm">("inch");
  const [howToMeasureOpen, setHowToMeasureOpen] = useState(true);

  if (!isOpen) return null;

  // Convert measurement based on selected unit
  const formatVal = (valInInches: number) => {
    if (unit === "inch") {
      return valInInches.toString();
    }
    // 1 inch = 2.54 cm
    return (valInInches * 2.54).toFixed(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Translucent Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-over Drawer (Right Pinned) */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-slide-left">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
            <h2 className="font-sans font-bold text-sm tracking-widest uppercase text-neutral-900">
              SIZE GUIDE
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Grid Measurement Table (Exact Match to Reference Image) */}
            <div className="overflow-hidden border border-neutral-200 rounded">
              <table className="w-full text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-white border-b border-neutral-200 text-neutral-800 font-bold">
                    <th className="py-3 px-2 border-r border-neutral-200 w-16" />
                    <th className="py-3 px-2 border-r border-neutral-200 tracking-wider">CHEST</th>
                    <th className="py-3 px-2 border-r border-neutral-200 tracking-wider">LENGTH</th>
                    <th className="py-3 px-2 border-r border-neutral-200 tracking-wider">SHOULDER</th>
                    <th className="py-3 px-2 tracking-wider">SLEEVE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-center text-neutral-700">
                  {INCH_MEASUREMENTS.map((row) => (
                    <tr key={row.size} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 px-2 border-r border-neutral-200 font-bold text-neutral-900">
                        {row.size}
                      </td>
                      <td className="py-3 px-2 border-r border-neutral-200 font-medium">
                        {formatVal(row.chest)}
                      </td>
                      <td className="py-3 px-2 border-r border-neutral-200 font-medium">
                        {formatVal(row.length)}
                      </td>
                      <td className="py-3 px-2 border-r border-neutral-200 font-medium">
                        {formatVal(row.shoulder)}
                      </td>
                      <td className="py-3 px-2 font-medium">
                        {formatVal(row.sleeve)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Units Toggle Section (inch / cm) */}
            <div className="space-y-1.5 pt-1">
              <div className="text-xs text-neutral-600 font-sans">
                Measurements are in {unit === "inch" ? "Inches" : "Centimeters"}
              </div>
              <div className="flex items-center gap-4 text-xs font-sans">
                <button
                  type="button"
                  onClick={() => setUnit("inch")}
                  className={`cursor-pointer transition-all ${
                    unit === "inch"
                      ? "text-black font-bold underline underline-offset-4"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  inch
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("cm")}
                  className={`cursor-pointer transition-all ${
                    unit === "cm"
                      ? "text-black font-bold underline underline-offset-4"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  cm
                </button>
              </div>
            </div>

            {/* HOW TO MEASURE Accordion Section */}
            <div className="pt-4 border-t border-neutral-200 space-y-4">
              <button
                type="button"
                onClick={() => setHowToMeasureOpen((prev) => !prev)}
                className="w-full flex items-center justify-between text-xs font-bold font-sans tracking-wider uppercase text-neutral-900 cursor-pointer"
              >
                <span>HOW TO MEASURE</span>
                <span className="text-base font-light">
                  {howToMeasureOpen ? "—" : "+"}
                </span>
              </button>

              {howToMeasureOpen && (
                <div className="space-y-4 pt-1">
                  {/* Two Illustrated T-Shirt Measurement Diagrams (Front & Back) */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {/* 1. Front View Diagram */}
                    <div className="p-3 bg-[#F4F4F6] rounded flex flex-col items-center">
                      <svg
                        viewBox="0 0 160 150"
                        className="w-full h-auto drop-shadow-sm"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* T-Shirt Front Shape in Soft Periwinkle Blue (Matching Reference) */}
                        <path
                          d="M 50 25 C 65 35, 95 35, 110 25 L 145 45 L 130 75 L 115 65 L 115 135 L 45 135 L 45 65 L 30 75 L 15 45 Z"
                          fill="#BDD7EE"
                          stroke="#90B6DB"
                          strokeWidth="1.5"
                        />
                        {/* Rib Collar */}
                        <path
                          d="M 50 25 C 65 38, 95 38, 110 25 C 95 20, 65 20, 50 25 Z"
                          fill="#A4C7E8"
                          stroke="#90B6DB"
                          strokeWidth="1"
                        />

                        {/* Chest Measurement Line (Across underarms) */}
                        <line
                          x1="45"
                          y1="68"
                          x2="115"
                          y2="68"
                          stroke="#1E1E1E"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                        <rect x="25" y="62" width="12" height="12" rx="2" fill="#1E1E1E" />
                        <line x1="31" y1="65" x2="31" y2="71" stroke="#FFFFFF" strokeWidth="1" />
                        <text x="80" y="65" textAnchor="middle" fill="#1E1E1E" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
                          CHEST
                        </text>

                        {/* Length Measurement Line (Shoulder to Hem) */}
                        <line
                          x1="108"
                          y1="28"
                          x2="108"
                          y2="135"
                          stroke="#1E1E1E"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                        <rect x="102" y="127" width="12" height="12" rx="2" fill="#1E1E1E" />
                        <line x1="105" y1="133" x2="111" y2="133" stroke="#FFFFFF" strokeWidth="1" />
                        <text x="100" y="90" textAnchor="end" fill="#1E1E1E" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
                          LENGTH
                        </text>

                        {/* Sleeve Measurement Line */}
                        <line
                          x1="112"
                          y1="25"
                          x2="142"
                          y2="45"
                          stroke="#1E1E1E"
                          strokeWidth="1.2"
                          strokeDasharray="2 2"
                        />
                        <rect x="135" y="45" width="10" height="10" rx="2" fill="#1E1E1E" />
                        <text x="145" y="40" textAnchor="end" fill="#1E1E1E" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
                          SLEEVE
                        </text>
                      </svg>
                      <span className="text-[10px] font-sans font-bold text-neutral-600 mt-2 uppercase tracking-wider">
                        FRONT VIEW
                      </span>
                    </div>

                    {/* 2. Back View Diagram */}
                    <div className="p-3 bg-[#F4F4F6] rounded flex flex-col items-center">
                      <svg
                        viewBox="0 0 160 150"
                        className="w-full h-auto drop-shadow-sm"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* T-Shirt Back Shape */}
                        <path
                          d="M 50 25 C 65 28, 95 28, 110 25 L 145 45 L 130 75 L 115 65 L 115 135 L 45 135 L 45 65 L 30 75 L 15 45 Z"
                          fill="#BDD7EE"
                          stroke="#90B6DB"
                          strokeWidth="1.5"
                        />
                        {/* High Back Collar */}
                        <path
                          d="M 50 25 C 65 28, 95 28, 110 25"
                          stroke="#90B6DB"
                          strokeWidth="2"
                        />

                        {/* Shoulder Width Measurement Line (Seam to Seam across Back) */}
                        <line
                          x1="32"
                          y1="34"
                          x2="128"
                          y2="34"
                          stroke="#1E1E1E"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                        <rect x="26" y="28" width="12" height="12" rx="2" fill="#1E1E1E" />
                        <line x1="32" y1="31" x2="32" y2="37" stroke="#FFFFFF" strokeWidth="1" />
                        <rect x="122" y="28" width="12" height="12" rx="2" fill="#1E1E1E" />
                        <line x1="128" y1="31" x2="128" y2="37" stroke="#FFFFFF" strokeWidth="1" />
                        <text x="80" y="46" textAnchor="middle" fill="#1E1E1E" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
                          SHOULDER
                        </text>
                      </svg>
                      <span className="text-[10px] font-sans font-bold text-neutral-600 mt-2 uppercase tracking-wider">
                        BACK VIEW
                      </span>
                    </div>
                  </div>

                  {/* Measurement Instructions list */}
                  <div className="space-y-2 text-xs text-neutral-600 font-sans leading-relaxed pt-1">
                    <div>
                      <strong className="text-neutral-900 font-semibold">1. Chest:</strong> Measure around the fullest part of the chest, keeping the tape horizontal under the armpits.
                    </div>
                    <div>
                      <strong className="text-neutral-900 font-semibold">2. Length:</strong> Measure vertically from the highest point of the shoulder down to the bottom hem.
                    </div>
                    <div>
                      <strong className="text-neutral-900 font-semibold">3. Shoulder:</strong> Measure straight across the back from the edge of one shoulder seam to the other.
                    </div>
                    <div>
                      <strong className="text-neutral-900 font-semibold">4. Sleeve:</strong> Measure from the top shoulder seam down to the end of the sleeve cuff.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Close Action */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-50">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            CLOSE SIZE GUIDE
          </button>
        </div>
      </div>
    </div>
  );
}

export default SizeGuideDrawer;
