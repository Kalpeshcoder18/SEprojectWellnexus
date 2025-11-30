import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface DFDLevel0Props {
  onBack: () => void;
  onNavigate: (level: number) => void;
}

export default function DFDLevel0({ onBack, onNavigate }: DFDLevel0Props) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => onNavigate(0)} variant="default">Level 0</Button>
            <Button onClick={() => onNavigate(1)} variant="outline">Level 1</Button>
            <Button onClick={() => onNavigate(2)} variant="outline">Level 2</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Data Flow Diagram - Level 0</h1>
            <p className="text-gray-600">Context Diagram for WellnessHub System</p>
          </div>

          <svg viewBox="0 0 1400 900" className="w-full h-auto border-2 border-gray-300">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="black" />
              </marker>
            </defs>

            {/* External Entities */}
            {/* User - Top Left */}
            <rect x="50" y="200" width="180" height="90" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="140" y="250" textAnchor="middle" fontSize="18" fontWeight="bold">
              User
            </text>

            {/* Admin - Bottom Left */}
            <rect x="50" y="650" width="180" height="90" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="140" y="700" textAnchor="middle" fontSize="18" fontWeight="bold">
              Admin
            </text>

            {/* AI Coach - Top Right */}
            <rect x="1170" y="200" width="180" height="90" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="1260" y="250" textAnchor="middle" fontSize="18" fontWeight="bold">
              AI Coach
            </text>

            {/* External APIs - Bottom Right */}
            <rect x="1170" y="650" width="180" height="90" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="1260" y="690" textAnchor="middle" fontSize="18" fontWeight="bold">
              External APIs
            </text>
            <text x="1260" y="710" textAnchor="middle" fontSize="14">
              (Nutrition, Payment)
            </text>

            {/* Central Process - WellnessHub System */}
            <circle cx="700" cy="450" r="140" fill="white" stroke="black" strokeWidth="3.5" />
            <text x="700" y="430" textAnchor="middle" fontSize="24" fontWeight="bold">
              0
            </text>
            <text x="700" y="460" textAnchor="middle" fontSize="18" fontWeight="bold">
              WellnessHub
            </text>
            <text x="700" y="485" textAnchor="middle" fontSize="18" fontWeight="bold">
              System
            </text>

            {/* Data Flows from User to System */}
            {/* Registration/Login */}
            <line x1="230" y1="220" x2="570" y2="370" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="340" y="265" width="140" height="50" fill="white" fillOpacity="0.9" />
            <text x="410" y="285" textAnchor="middle" fontSize="14" fontWeight="bold">
              Registration/
            </text>
            <text x="410" y="305" textAnchor="middle" fontSize="14" fontWeight="bold">
              Login Details
            </text>

            {/* Health Data & Goals */}
            <line x1="230" y1="245" x2="560" y2="450" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="320" y="330" width="140" height="50" fill="white" fillOpacity="0.9" />
            <text x="390" y="350" textAnchor="middle" fontSize="14" fontWeight="bold">
              Health Data,
            </text>
            <text x="390" y="370" textAnchor="middle" fontSize="14" fontWeight="bold">
              Goals, Preferences
            </text>

            {/* Activity & Nutrition Logs */}
            <line x1="230" y1="270" x2="570" y2="530" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="340" y="380" width="140" height="50" fill="white" fillOpacity="0.9" />
            <text x="410" y="400" textAnchor="middle" fontSize="14" fontWeight="bold">
              Activity Logs,
            </text>
            <text x="410" y="420" textAnchor="middle" fontSize="14" fontWeight="bold">
              Nutrition, Mood
            </text>

            {/* Data Flows from System to User */}
            {/* Dashboard & Analytics */}
            <line x1="590" y1="350" x2="250" y2="210" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="360" y="240" width="140" height="50" fill="white" fillOpacity="0.9" />
            <text x="430" y="260" textAnchor="middle" fontSize="14" fontWeight="bold">
              Dashboard,
            </text>
            <text x="430" y="280" textAnchor="middle" fontSize="14" fontWeight="bold">
              Insights, Progress
            </text>

            {/* Personalized Plans */}
            <line x1="580" y1="430" x2="250" y2="235" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="360" y="305" width="140" height="50" fill="white" fillOpacity="0.9" />
            <text x="430" y="325" textAnchor="middle" fontSize="14" fontWeight="bold">
              Personalized
            </text>
            <text x="430" y="345" textAnchor="middle" fontSize="14" fontWeight="bold">
              Plans & Workouts
            </text>

            {/* Recommendations & Notifications */}
            <line x1="590" y1="510" x2="250" y2="260" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="360" y="360" width="140" height="50" fill="white" fillOpacity="0.9" />
            <text x="430" y="380" textAnchor="middle" fontSize="14" fontWeight="bold">
              Recommendations
            </text>
            <text x="430" y="400" textAnchor="middle" fontSize="14" fontWeight="bold">
              & Notifications
            </text>

            {/* Data Flows from Admin to System */}
            {/* System Configuration */}
            <line x1="230" y1="670" x2="580" y2="550" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="340" y="580" width="150" height="50" fill="white" fillOpacity="0.9" />
            <text x="415" y="600" textAnchor="middle" fontSize="14" fontWeight="bold">
              System Config,
            </text>
            <text x="415" y="620" textAnchor="middle" fontSize="14" fontWeight="bold">
              Content Mgmt
            </text>

            {/* Data Flows from System to Admin */}
            {/* Reports & Analytics */}
            <line x1="590" y1="570" x2="250" y2="680" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="360" y="600" width="150" height="50" fill="white" fillOpacity="0.9" />
            <text x="435" y="620" textAnchor="middle" fontSize="14" fontWeight="bold">
              User Reports,
            </text>
            <text x="435" y="640" textAnchor="middle" fontSize="14" fontWeight="bold">
              Analytics, Logs
            </text>

            {/* Data Flows from AI Coach to System */}
            {/* AI Recommendations */}
            <line x1="1170" y1="230" x2="830" y2="380" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="930" y="275" width="150" height="50" fill="white" fillOpacity="0.9" />
            <text x="1005" y="295" textAnchor="middle" fontSize="14" fontWeight="bold">
              AI Recommendations
            </text>
            <text x="1005" y="315" textAnchor="middle" fontSize="14" fontWeight="bold">
              & Guidance
            </text>

            {/* Data Flows from System to AI Coach */}
            {/* User Behavior & Metrics */}
            <line x1="820" y1="360" x2="1150" y2="220" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="920" y="255" width="150" height="50" fill="white" fillOpacity="0.9" />
            <text x="995" y="275" textAnchor="middle" fontSize="14" fontWeight="bold">
              User Behavior,
            </text>
            <text x="995" y="295" textAnchor="middle" fontSize="14" fontWeight="bold">
              Health Metrics
            </text>

            {/* Data Flows from External APIs to System */}
            {/* API Data */}
            <line x1="1170" y1="680" x2="830" y2="530" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="930" y="580" width="150" height="50" fill="white" fillOpacity="0.9" />
            <text x="1005" y="600" textAnchor="middle" fontSize="14" fontWeight="bold">
              Nutrition Data,
            </text>
            <text x="1005" y="620" textAnchor="middle" fontSize="14" fontWeight="bold">
              Payment Status
            </text>

            {/* Data Flows from System to External APIs */}
            {/* API Requests */}
            <line x1="820" y1="550" x2="1150" y2="690" stroke="black" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
            <rect x="920" y="595" width="150" height="50" fill="white" fillOpacity="0.9" />
            <text x="995" y="615" textAnchor="middle" fontSize="14" fontWeight="bold">
              API Requests,
            </text>
            <text x="995" y="635" textAnchor="middle" fontSize="14" fontWeight="bold">
              Payment Processing
            </text>
          </svg>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg">Legend & Notes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <svg width="80" height="40">
                  <rect x="5" y="5" width="70" height="30" fill="white" stroke="black" strokeWidth="2" />
                </svg>
                <span className="text-sm">External Entity</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="70" height="70">
                  <circle cx="35" cy="35" r="30" fill="white" stroke="black" strokeWidth="2.5" />
                </svg>
                <span className="text-sm">Process</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="80" height="30">
                  <line x1="5" y1="15" x2="75" y2="15" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </svg>
                <span className="text-sm">Data Flow</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Level 0 (Context Diagram):</strong> Shows the WellnessHub system as a single process with all external entities and their interactions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
