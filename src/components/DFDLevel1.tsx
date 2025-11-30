import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface DFDLevel1Props {
  onBack: () => void;
  onNavigate: (level: number) => void;
}

export default function DFDLevel1({ onBack, onNavigate }: DFDLevel1Props) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[2000px] mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={onBack} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => onNavigate(0)} variant="outline">Level 0</Button>
            <Button onClick={() => onNavigate(1)} variant="default">Level 1</Button>
            <Button onClick={() => onNavigate(2)} variant="outline">Level 2</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Data Flow Diagram - Level 1</h1>
            <p className="text-gray-600">Major Subsystems of WellnessHub</p>
          </div>

          <svg viewBox="0 0 1800 1600" className="w-full h-auto border-2 border-gray-300">
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
            <rect x="50" y="100" width="160" height="80" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="130" y="145" textAnchor="middle" fontSize="18" fontWeight="bold">
              User
            </text>

            {/* Admin - Bottom Left */}
            <rect x="50" y="1450" width="160" height="80" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="130" y="1495" textAnchor="middle" fontSize="18" fontWeight="bold">
              Admin
            </text>

            {/* AI Coach - Top Right */}
            <rect x="1590" y="100" width="160" height="80" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="1670" y="145" textAnchor="middle" fontSize="18" fontWeight="bold">
              AI Coach
            </text>

            {/* External APIs - Bottom Right */}
            <rect x="1590" y="1450" width="160" height="80" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="1670" y="1485" textAnchor="middle" fontSize="16" fontWeight="bold">
              External APIs
            </text>

            {/* Data Stores */}
            {/* D1 - User Database */}
            <line x1="400" y1="250" x2="650" y2="250" stroke="black" strokeWidth="2.5" />
            <line x1="400" y1="285" x2="650" y2="285" stroke="black" strokeWidth="2.5" />
            <text x="420" y="272" fontSize="16" fontWeight="bold">D1  User Database</text>

            {/* D2 - Health Data */}
            <line x1="1150" y1="250" x2="1400" y2="250" stroke="black" strokeWidth="2.5" />
            <line x1="1150" y1="285" x2="1400" y2="285" stroke="black" strokeWidth="2.5" />
            <text x="1170" y="272" fontSize="16" fontWeight="bold">D2  Health Data Store</text>

            {/* D3 - Nutrition Database */}
            <line x1="400" y1="750" x2="650" y2="750" stroke="black" strokeWidth="2.5" />
            <line x1="400" y1="785" x2="650" y2="785" stroke="black" strokeWidth="2.5" />
            <text x="420" y="772" fontSize="16" fontWeight="bold">D3  Nutrition DB</text>

            {/* D4 - Workout Database */}
            <line x1="1150" y1="750" x2="1400" y2="750" stroke="black" strokeWidth="2.5" />
            <line x1="1150" y1="785" x2="1400" y2="785" stroke="black" strokeWidth="2.5" />
            <text x="1170" y="772" fontSize="16" fontWeight="bold">D4  Workout DB</text>

            {/* D5 - Community Data */}
            <line x1="400" y1="1300" x2="650" y2="1300" stroke="black" strokeWidth="2.5" />
            <line x1="400" y1="1335" x2="650" y2="1335" stroke="black" strokeWidth="2.5" />
            <text x="420" y="1322" fontSize="16" fontWeight="bold">D5  Community Data</text>

            {/* D6 - System Logs */}
            <line x1="1150" y1="1300" x2="1400" y2="1300" stroke="black" strokeWidth="2.5" />
            <line x1="1150" y1="1335" x2="1400" y2="1335" stroke="black" strokeWidth="2.5" />
            <text x="1170" y="1322" fontSize="16" fontWeight="bold">D6  System Logs</text>

            {/* Processes */}
            {/* Process 1 - Authentication */}
            <circle cx="525" cy="420" r="90" fill="white" stroke="black" strokeWidth="3" />
            <text x="525" y="405" textAnchor="middle" fontSize="22" fontWeight="bold">1</text>
            <text x="525" y="428" textAnchor="middle" fontSize="15" fontWeight="bold">Authentication</text>
            <text x="525" y="448" textAnchor="middle" fontSize="15" fontWeight="bold">& Authorization</text>

            {/* Process 2 - Nutrition Management */}
            <circle cx="800" cy="600" r="90" fill="white" stroke="black" strokeWidth="3" />
            <text x="800" y="585" textAnchor="middle" fontSize="22" fontWeight="bold">2</text>
            <text x="800" y="608" textAnchor="middle" fontSize="15" fontWeight="bold">Nutrition</text>
            <text x="800" y="628" textAnchor="middle" fontSize="15" fontWeight="bold">Management</text>

            {/* Process 3 - Workout Management */}
            <circle cx="1000" cy="600" r="90" fill="white" stroke="black" strokeWidth="3" />
            <text x="1000" y="585" textAnchor="middle" fontSize="22" fontWeight="bold">3</text>
            <text x="1000" y="608" textAnchor="middle" fontSize="15" fontWeight="bold">Workout</text>
            <text x="1000" y="628" textAnchor="middle" fontSize="15" fontWeight="bold">Management</text>

            {/* Process 4 - Mental Wellness */}
            <circle cx="525" cy="950" r="90" fill="white" stroke="black" strokeWidth="3" />
            <text x="525" y="935" textAnchor="middle" fontSize="22" fontWeight="bold">4</text>
            <text x="525" y="958" textAnchor="middle" fontSize="15" fontWeight="bold">Mental</text>
            <text x="525" y="978" textAnchor="middle" fontSize="15" fontWeight="bold">Wellness</text>

            {/* Process 5 - Community */}
            <circle cx="800" y="1130" r="90" fill="white" stroke="black" strokeWidth="3" />
            <text x="800" y="1115" textAnchor="middle" fontSize="22" fontWeight="bold">5</text>
            <text x="800" y="1138" textAnchor="middle" fontSize="15" fontWeight="bold">Community</text>
            <text x="800" y="1158" textAnchor="middle" fontSize="15" fontWeight="bold">& Social</text>

            {/* Process 6 - Dashboard */}
            <circle cx="1275" cy="420" r="90" fill="white" stroke="black" strokeWidth="3" />
            <text x="1275" y="405" textAnchor="middle" fontSize="22" fontWeight="bold">6</text>
            <text x="1275" y="428" textAnchor="middle" fontSize="15" fontWeight="bold">Dashboard</text>
            <text x="1275" y="448" textAnchor="middle" fontSize="15" fontWeight="bold">& Analytics</text>

            {/* Process 7 - Gamification */}
            <circle cx="1000" cy="1130" r="90" fill="white" stroke="black" strokeWidth="3" />
            <text x="1000" y="1115" textAnchor="middle" fontSize="22" fontWeight="bold">7</text>
            <text x="1000" y="1138" textAnchor="middle" fontSize="15" fontWeight="bold">Gamification</text>
            <text x="1000" y="1158" textAnchor="middle" fontSize="15" fontWeight="bold">& Rewards</text>

            {/* Process 8 - Administration */}
            <circle cx="1275" cy="1130" r="90" fill="white" stroke="black" strokeWidth="3" />
            <text x="1275" y="1115" textAnchor="middle" fontSize="22" fontWeight="bold">8</text>
            <text x="1275" y="1138" textAnchor="middle" fontSize="15" fontWeight="bold">System</text>
            <text x="1275" y="1158" textAnchor="middle" fontSize="15" fontWeight="bold">Administration</text>

            {/* Data Flows */}
            
            {/* User to Process 1 */}
            <line x1="210" y1="130" x2="450" y2="360" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="280" y="215" width="110" height="30" fill="white" />
            <text x="335" y="235" textAnchor="middle" fontSize="14" fontWeight="bold">Login Details</text>

            {/* Process 1 to User */}
            <line x1="460" y1="350" x2="220" y2="140" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="290" y="200" width="100" height="30" fill="white" />
            <text x="340" y="220" textAnchor="middle" fontSize="14" fontWeight="bold">Auth Token</text>

            {/* Process 1 to D1 */}
            <line x1="525" y1="330" x2="525" y2="285" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="535" y="300" width="90" height="25" fill="white" />
            <text x="580" y="317" fontSize="14" fontWeight="bold">Store User</text>

            {/* D1 to Process 1 */}
            <line x1="540" y1="285" x2="540" y2="330" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="550" y="300" width="90" height="25" fill="white" />
            <text x="595" y="317" fontSize="14" fontWeight="bold">User Data</text>

            {/* User to Process 2 */}
            <line x1="210" y1="150" x2="730" y2="540" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="410" y="320" width="90" height="30" fill="white" />
            <text x="455" y="340" textAnchor="middle" fontSize="14" fontWeight="bold">Food Logs</text>

            {/* Process 2 to User */}
            <line x1="740" y1="530" x2="200" y2="160" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="420" y="300" width="90" height="30" fill="white" />
            <text x="465" y="320" textAnchor="middle" fontSize="14" fontWeight="bold">Meal Plans</text>

            {/* Process 2 to D3 */}
            <line x1="720" y1="650" x2="650" y2="768" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="660" y="690" width="70" height="30" fill="white" />
            <text x="695" y="710" textAnchor="middle" fontSize="14" fontWeight="bold">Save</text>

            {/* D3 to Process 2 */}
            <line x1="640" y1="750" x2="710" y2="665" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="650" y="695" width="70" height="30" fill="white" />
            <text x="685" y="715" textAnchor="middle" fontSize="14" fontWeight="bold">Read</text>

            {/* User to Process 3 */}
            <line x1="210" y1="160" x2="930" y2="540" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="520" y="320" width="110" height="30" fill="white" />
            <text x="575" y="340" textAnchor="middle" fontSize="14" fontWeight="bold">Activity Logs</text>

            {/* Process 3 to User */}
            <line x1="940" y1="530" x2="200" y2="170" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="520" y="300" width="130" height="30" fill="white" />
            <text x="585" y="320" textAnchor="middle" fontSize="14" fontWeight="bold">Workout Plans</text>

            {/* Process 3 to D4 */}
            <line x1="1070" y1="650" x2="1150" y2="768" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1080" y="690" width="70" height="30" fill="white" />
            <text x="1115" y="710" textAnchor="middle" fontSize="14" fontWeight="bold">Save</text>

            {/* D4 to Process 3 */}
            <line x1="1160" y1="750" x2="1080" y2="665" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1090" y="695" width="70" height="30" fill="white" />
            <text x="1125" y="715" textAnchor="middle" fontSize="14" fontWeight="bold">Read</text>

            {/* User to Process 4 */}
            <line x1="180" y1="180" x2="460" y2="880" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="270" y="500" width="100" height="30" fill="white" />
            <text x="320" y="520" textAnchor="middle" fontSize="14" fontWeight="bold">Mood Data</text>

            {/* Process 4 to User */}
            <line x1="470" y1="870" x2="190" y2="175" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="280" y="485" width="120" height="30" fill="white" />
            <text x="340" y="505" textAnchor="middle" fontSize="14" fontWeight="bold">Therapy Chat</text>

            {/* User to Process 5 */}
            <line x1="170" y1="180" x2="730" y2="1070" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="380" y="600" width="100" height="30" fill="white" />
            <text x="430" y="620" textAnchor="middle" fontSize="14" fontWeight="bold">Forum Posts</text>

            {/* Process 5 to User */}
            <line x1="740" y1="1060" x2="160" y2="180" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="390" y="585" width="130" height="30" fill="white" />
            <text x="455" y="605" textAnchor="middle" fontSize="14" fontWeight="bold">Community Feed</text>

            {/* Process 5 to D5 */}
            <line x1="720" y1="1180" x2="650" y2="1300" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="660" y="1230" width="70" height="30" fill="white" />
            <text x="695" y="1250" textAnchor="middle" fontSize="14" fontWeight="bold">Save</text>

            {/* D5 to Process 5 */}
            <line x1="640" y1="1300" x2="710" y2="1195" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="650" y="1235" width="70" height="30" fill="white" />
            <text x="685" y="1255" textAnchor="middle" fontSize="14" fontWeight="bold">Read</text>

            {/* Process 2,3,4 to Process 6 */}
            <line x1="880" y1="560" x2="1195" y2="450" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1020" y="485" width="120" height="25" fill="white" />
            <text x="1080" y="502" textAnchor="middle" fontSize="14" fontWeight="bold">Nutrition Stats</text>

            <line x1="1070" y1="560" x2="1220" y2="490" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1110" y="510" width="120" height="25" fill="white" />
            <text x="1170" y="527" textAnchor="middle" fontSize="14" fontWeight="bold">Workout Stats</text>

            {/* Process 6 to User */}
            <line x1="1200" y1="370" x2="200" y2="145" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="660" y="220" width="130" height="30" fill="white" />
            <text x="725" y="240" textAnchor="middle" fontSize="14" fontWeight="bold">Dashboard View</text>

            {/* Process 6 to D2 */}
            <line x1="1275" y1="330" x2="1275" y2="285" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1285" y="300" width="70" height="25" fill="white" />
            <text x="1320" y="317" fontSize="14" fontWeight="bold">Store</text>

            {/* D2 to Process 6 */}
            <line x1="1290" y1="285" x2="1290" y2="330" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1300" y="300" width="70" height="25" fill="white" />
            <text x="1335" y="317" fontSize="14" fontWeight="bold">Read</text>

            {/* AI Coach to Process 6 */}
            <line x1="1590" y1="150" x2="1350" y2="360" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1440" y="230" width="100" height="25" fill="white" />
            <text x="1490" y="247" textAnchor="middle" fontSize="14" fontWeight="bold">AI Insights</text>

            {/* Process 6 to AI Coach */}
            <line x1="1360" y1="350" x2="1600" y2="160" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1450" y="210" width="110" height="25" fill="white" />
            <text x="1505" y="227" textAnchor="middle" fontSize="14" fontWeight="bold">User Metrics</text>

            {/* Process 7 to User */}
            <line x1="920" y1="1090" x2="190" y2="175" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="500" y="600" width="130" height="30" fill="white" />
            <text x="565" y="620" textAnchor="middle" fontSize="14" fontWeight="bold">Badges, Points</text>

            {/* Process 3 to Process 7 */}
            <line x1="1000" y1="690" x2="1000" y2="1040" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1010" y="850" width="100" height="25" fill="white" />
            <text x="1060" y="867" fontSize="14" fontWeight="bold">Milestones</text>

            {/* Admin to Process 8 */}
            <line x1="210" y1="1480" x2="1195" y2="1160" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="650" y="1300" width="150" height="25" fill="white" />
            <text x="725" y="1317" textAnchor="middle" fontSize="14" fontWeight="bold">Admin Commands</text>

            {/* Process 8 to Admin */}
            <line x1="1205" y1="1170" x2="200" y2="1490" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="660" y="1325" width="140" height="25" fill="white" />
            <text x="730" y="1342" textAnchor="middle" fontSize="14" fontWeight="bold">System Reports</text>

            {/* Process 8 to D6 */}
            <line x1="1275" y1="1220" x2="1275" y2="1300" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1285" y="1250" width="70" height="25" fill="white" />
            <text x="1320" y="1267" fontSize="14" fontWeight="bold">Log</text>

            {/* D6 to Process 8 */}
            <line x1="1290" y1="1300" x2="1290" y2="1220" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1300" y="1250" width="70" height="25" fill="white" />
            <text x="1335" y="1267" fontSize="14" fontWeight="bold">Read</text>

            {/* External APIs to Process 2 */}
            <line x1="1600" y1="1455" x2="870" y2="650" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1180" y="1030" width="120" height="25" fill="white" />
            <text x="1240" y="1047" textAnchor="middle" fontSize="14" fontWeight="bold">Nutrition API</text>

            {/* Process 2 to External APIs */}
            <line x1="860" y1="660" x2="1590" y2="1460" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1170" y="1050" width="120" height="25" fill="white" />
            <text x="1230" y="1067" textAnchor="middle" fontSize="14" fontWeight="bold">API Request</text>
          </svg>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg">Process Descriptions</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><strong>Process 1:</strong> Authentication & Authorization - User login, registration, access control</p>
                <p><strong>Process 2:</strong> Nutrition Management - Food logging, meal planning, macro tracking</p>
                <p><strong>Process 3:</strong> Workout Management - Exercise logging, workout plans, progress tracking</p>
                <p><strong>Process 4:</strong> Mental Wellness - Mood tracking, therapy chat, meditation</p>
              </div>
              <div className="space-y-2">
                <p><strong>Process 5:</strong> Community & Social - Forums, challenges, social interaction</p>
                <p><strong>Process 6:</strong> Dashboard & Analytics - Data visualization, progress reports, insights</p>
                <p><strong>Process 7:</strong> Gamification & Rewards - Points, badges, achievements, leaderboards</p>
                <p><strong>Process 8:</strong> System Administration - User management, configuration, monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
