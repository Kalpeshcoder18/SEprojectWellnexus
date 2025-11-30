import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface DFDLevel2Props {
  onBack: () => void;
  onNavigate: (level: number) => void;
}

export default function DFDLevel2({ onBack, onNavigate }: DFDLevel2Props) {
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
            <Button onClick={() => onNavigate(1)} variant="outline">Level 1</Button>
            <Button onClick={() => onNavigate(2)} variant="default">Level 2</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">Data Flow Diagram - Level 2</h1>
            <p className="text-gray-600">Detailed View: Process 2 - Nutrition Management</p>
          </div>

          <svg viewBox="0 0 1800 1700" className="w-full h-auto border-2 border-gray-300">
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

            {/* External APIs - Top Right */}
            <rect x="1590" y="100" width="160" height="80" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="1670" y="135" textAnchor="middle" fontSize="16" fontWeight="bold">
              External
            </text>
            <text x="1670" y="155" textAnchor="middle" fontSize="16" fontWeight="bold">
              Nutrition API
            </text>

            {/* AI Coach - Bottom Right */}
            <rect x="1590" y="1550" width="160" height="80" fill="white" stroke="black" strokeWidth="2.5" />
            <text x="1670" y="1595" textAnchor="middle" fontSize="18" fontWeight="bold">
              AI Coach
            </text>

            {/* Data Stores */}
            {/* D3.1 - Food Database */}
            <line x1="800" y1="250" x2="1050" y2="250" stroke="black" strokeWidth="2.5" />
            <line x1="800" y1="285" x2="1050" y2="285" stroke="black" strokeWidth="2.5" />
            <text x="820" y="272" fontSize="16" fontWeight="bold">D3.1  Food Database</text>

            {/* D3.2 - User Meal Plans */}
            <line x1="350" y1="650" x2="600" y2="650" stroke="black" strokeWidth="2.5" />
            <line x1="350" y1="685" x2="600" y2="685" stroke="black" strokeWidth="2.5" />
            <text x="370" y="672" fontSize="16" fontWeight="bold">D3.2  User Meal Plans</text>

            {/* D3.3 - Daily Food Logs */}
            <line x1="1200" y1="650" x2="1450" y2="650" stroke="black" strokeWidth="2.5" />
            <line x1="1200" y1="685" x2="1450" y2="685" stroke="black" strokeWidth="2.5" />
            <text x="1220" y="672" fontSize="16" fontWeight="bold">D3.3  Daily Food Logs</text>

            {/* D3.4 - Macro Tracking */}
            <line x1="800" y1="1050" x2="1050" y2="1050" stroke="black" strokeWidth="2.5" />
            <line x1="800" y1="1085" x2="1050" y2="1085" stroke="black" strokeWidth="2.5" />
            <text x="820" y="1072" fontSize="16" fontWeight="bold">D3.4  Macro Tracking</text>

            {/* D3.5 - Nutrition Goals */}
            <line x1="350" y1="1450" x2="600" y2="1450" stroke="black" strokeWidth="2.5" />
            <line x1="350" y1="1485" x2="600" y2="1485" stroke="black" strokeWidth="2.5" />
            <text x="370" y="1472" fontSize="16" fontWeight="bold">D3.5  Nutrition Goals</text>

            {/* Processes */}
            {/* Process 2.1 - Log Food Intake */}
            <circle cx="450" cy="350" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="450" y="335" textAnchor="middle" fontSize="22" fontWeight="bold">2.1</text>
            <text x="450" y="358" textAnchor="middle" fontSize="15" fontWeight="bold">Log Food</text>
            <text x="450" y="378" textAnchor="middle" fontSize="15" fontWeight="bold">Intake</text>

            {/* Process 2.2 - Search Food Database */}
            <circle cx="925" cy="350" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="925" y="335" textAnchor="middle" fontSize="22" fontWeight="bold">2.2</text>
            <text x="925" y="358" textAnchor="middle" fontSize="15" fontWeight="bold">Search Food</text>
            <text x="925" y="378" textAnchor="middle" fontSize="15" fontWeight="bold">Database</text>

            {/* Process 2.3 - Calculate Macros */}
            <circle cx="1325" cy="450" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="1325" y="435" textAnchor="middle" fontSize="22" fontWeight="bold">2.3</text>
            <text x="1325" y="458" textAnchor="middle" fontSize="15" fontWeight="bold">Calculate</text>
            <text x="1325" y="478" textAnchor="middle" fontSize="15" fontWeight="bold">Macros</text>

            {/* Process 2.4 - Generate Meal Plan */}
            <circle cx="450" cy="800" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="450" y="785" textAnchor="middle" fontSize="22" fontWeight="bold">2.4</text>
            <text x="450" y="808" textAnchor="middle" fontSize="15" fontWeight="bold">Generate</text>
            <text x="450" y="828" textAnchor="middle" fontSize="15" fontWeight="bold">Meal Plan</text>

            {/* Process 2.5 - Track Daily Nutrition */}
            <circle cx="925" cy="850" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="925" y="835" textAnchor="middle" fontSize="22" fontWeight="bold">2.5</text>
            <text x="925" y="858" textAnchor="middle" fontSize="15" fontWeight="bold">Track Daily</text>
            <text x="925" y="878" textAnchor="middle" fontSize="15" fontWeight="bold">Nutrition</text>

            {/* Process 2.6 - Analyze Nutrition Trends */}
            <circle cx="1325" cy="950" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="1325" y="935" textAnchor="middle" fontSize="22" fontWeight="bold">2.6</text>
            <text x="1325" y="958" textAnchor="middle" fontSize="15" fontWeight="bold">Analyze</text>
            <text x="1325" y="978" textAnchor="middle" fontSize="15" fontWeight="bold">Trends</text>

            {/* Process 2.7 - Set Nutrition Goals */}
            <circle cx="450" cy="1300" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="450" y="1285" textAnchor="middle" fontSize="22" fontWeight="bold">2.7</text>
            <text x="450" y="1308" textAnchor="middle" fontSize="15" fontWeight="bold">Set Nutrition</text>
            <text x="450" y="1328" textAnchor="middle" fontSize="15" fontWeight="bold">Goals</text>

            {/* Process 2.8 - Generate Recommendations */}
            <circle cx="925" cy="1300" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="925" y="1285" textAnchor="middle" fontSize="22" fontWeight="bold">2.8</text>
            <text x="925" y="1308" textAnchor="middle" fontSize="15" fontWeight="bold">Generate</text>
            <text x="925" y="1328" textAnchor="middle" fontSize="15" fontWeight="bold">Recommendations</text>

            {/* Process 2.9 - Monitor Progress */}
            <circle cx="1325" cy="1400" r="85" fill="white" stroke="black" strokeWidth="3" />
            <text x="1325" y="1385" textAnchor="middle" fontSize="22" fontWeight="bold">2.9</text>
            <text x="1325" y="1408" textAnchor="middle" fontSize="15" fontWeight="bold">Monitor</text>
            <text x="1325" y="1428" textAnchor="middle" fontSize="15" fontWeight="bold">Progress</text>

            {/* Data Flows */}
            
            {/* User to Process 2.1 */}
            <line x1="210" y1="130" x2="375" y2="310" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="250" y="200" width="90" height="25" fill="white" />
            <text x="295" y="217" textAnchor="middle" fontSize="14" fontWeight="bold">Food Item</text>

            {/* Process 2.1 to User */}
            <line x1="385" y1="300" x2="220" y2="140" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="260" y="180" width="110" height="30" fill="white" />
            <text x="315" y="200" textAnchor="middle" fontSize="14" fontWeight="bold">Confirmation</text>

            {/* Process 2.1 to Process 2.2 */}
            <line x1="535" y1="345" x2="840" y2="345" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="640" y="320" width="110" height="25" fill="white" />
            <text x="695" y="337" textAnchor="middle" fontSize="14" fontWeight="bold">Search Query</text>

            {/* Process 2.2 to Process 2.1 */}
            <line x1="840" y1="360" x2="535" y2="360" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="640" y="350" width="110" height="25" fill="white" />
            <text x="695" y="367" textAnchor="middle" fontSize="14" fontWeight="bold">Food Details</text>

            {/* Process 2.2 to D3.1 */}
            <line x1="925" y1="265" x2="925" y2="285" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="935" y="270" width="70" height="25" fill="white" />
            <text x="970" y="287" fontSize="14" fontWeight="bold">Query</text>

            {/* D3.1 to Process 2.2 */}
            <line x1="940" y1="285" x2="940" y2="265" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="950" y="270" width="90" height="25" fill="white" />
            <text x="995" y="287" fontSize="14" fontWeight="bold">Food Info</text>

            {/* External API to Process 2.2 */}
            <line x1="1590" y1="130" x2="1005" y2="315" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1250" y="200" width="130" height="25" fill="white" />
            <text x="1315" y="217" textAnchor="middle" fontSize="14" fontWeight="bold">External Food Data</text>

            {/* Process 2.2 to External API */}
            <line x1="995" y1="305" x2="1580" y2="140" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1240" y="180" width="110" height="25" fill="white" />
            <text x="1295" y="197" textAnchor="middle" fontSize="14" fontWeight="bold">API Request</text>

            {/* Process 2.1 to Process 2.3 */}
            <line x1="530" y1="380" x2="1245" y2="425" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="840" y="385" width="110" height="25" fill="white" />
            <text x="895" y="402" textAnchor="middle" fontSize="14" fontWeight="bold">Logged Food</text>

            {/* Process 2.3 to D3.3 */}
            <line x1="1325" y1="535" x2="1325" y2="650" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1335" y="580" width="80" height="25" fill="white" />
            <text x="1375" y="597" fontSize="14" fontWeight="bold">Save Log</text>

            {/* D3.3 to Process 2.3 */}
            <line x1="1340" y1="650" x2="1340" y2="535" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1350" y="580" width="90" height="25" fill="white" />
            <text x="1395" y="597" fontSize="14" fontWeight="bold">Prev. Logs</text>

            {/* Process 2.3 to Process 2.5 */}
            <line x1="1260" y1="500" x2="995" y2="810" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1080" y="630" width="110" height="25" fill="white" />
            <text x="1135" y="647" textAnchor="middle" fontSize="14" fontWeight="bold">Macro Data</text>

            {/* User to Process 2.4 */}
            <line x1="170" y1="180" x2="390" y2="735" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="230" y="430" width="110" height="30" fill="white" />
            <text x="285" y="450" textAnchor="middle" fontSize="14" fontWeight="bold">Meal Prefs</text>

            {/* Process 2.4 to User */}
            <line x1="400" y1="725" x2="180" y2="175" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="240" y="410" width="130" height="30" fill="white" />
            <text x="305" y="430" textAnchor="middle" fontSize="14" fontWeight="bold">Generated Plan</text>

            {/* Process 2.4 to D3.2 */}
            <line x1="450" y1="715" x2="450" y2="685" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="460" y="690" width="80" height="25" fill="white" />
            <text x="500" y="707" fontSize="14" fontWeight="bold">Save Plan</text>

            {/* D3.2 to Process 2.4 */}
            <line x1="465" y1="685" x2="465" y2="715" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="475" y="690" width="100" height="25" fill="white" />
            <text x="525" y="707" fontSize="14" fontWeight="bold">Existing Plans</text>

            {/* Process 2.2 to Process 2.4 */}
            <line x1="870" y1="410" x2="510" y2="740" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="640" y="550" width="110" height="25" fill="white" />
            <text x="695" y="567" textAnchor="middle" fontSize="14" fontWeight="bold">Food Options</text>

            {/* Process 2.5 to D3.4 */}
            <line x1="925" y1="935" x2="925" y2="1050" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="935" y="980" width="100" height="25" fill="white" />
            <text x="985" y="997" fontSize="14" fontWeight="bold">Store Macros</text>

            {/* D3.4 to Process 2.5 */}
            <line x1="940" y1="1050" x2="940" y2="935" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="950" y="980" width="110" height="25" fill="white" />
            <text x="1005" y="997" fontSize="14" fontWeight="bold">Historical Data</text>

            {/* Process 2.5 to Process 2.6 */}
            <line x1="1005" y1="875" x2="1245" y2="925" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1080" y="880" width="110" height="25" fill="white" />
            <text x="1135" y="897" textAnchor="middle" fontSize="14" fontWeight="bold">Daily Totals</text>

            {/* Process 2.6 to D3.4 */}
            <line x1="1255" y1="1010" x2="1050" y2="1067" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1100" y="1020" width="100" height="25" fill="white" />
            <text x="1150" y="1037" textAnchor="middle" fontSize="14" fontWeight="bold">Read Trends</text>

            {/* User to Process 2.7 */}
            <line x1="140" y1="180" x2="385" y2="1245" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="210" y="680" width="100" height="25" fill="white" />
            <text x="260" y="697" textAnchor="middle" fontSize="14" fontWeight="bold">Goal Input</text>

            {/* Process 2.7 to User */}
            <line x1="395" y1="1235" x2="150" y2="175" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="220" y="660" width="120" height="30" fill="white" />
            <text x="280" y="680" textAnchor="middle" fontSize="14" fontWeight="bold">Confirmation</text>

            {/* Process 2.7 to D3.5 */}
            <line x1="450" y1="1385" x2="450" y2="1450" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="460" y="1410" width="90" height="25" fill="white" />
            <text x="505" y="1427" fontSize="14" fontWeight="bold">Save Goals</text>

            {/* D3.5 to Process 2.7 */}
            <line x1="465" y1="1450" x2="465" y2="1385" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="475" y="1410" width="110" height="25" fill="white" />
            <text x="530" y="1427" fontSize="14" fontWeight="bold">Current Goals</text>

            {/* Process 2.7 to Process 2.8 */}
            <line x1="535" y1="1300" x2="840" y2="1300" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="640" y="1280" width="100" height="25" fill="white" />
            <text x="690" y="1297" textAnchor="middle" fontSize="14" fontWeight="bold">User Goals</text>

            {/* Process 2.6 to Process 2.8 */}
            <line x1="1255" y1="1010" x2="995" y2="1255" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1080" y="1110" width="120" height="30" fill="white" />
            <text x="1140" y="1130" textAnchor="middle" fontSize="14" fontWeight="bold">Nutrition Trends</text>

            {/* AI Coach to Process 2.8 */}
            <line x1="1590" y1="1575" x2="1005" y2="1330" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1250" y="1430" width="100" height="25" fill="white" />
            <text x="1300" y="1447" textAnchor="middle" fontSize="14" fontWeight="bold">AI Insights</text>

            {/* Process 2.8 to AI Coach */}
            <line x1="995" y1="1340" x2="1580" y2="1585" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1240" y="1450" width="100" height="25" fill="white" />
            <text x="1290" y="1467" textAnchor="middle" fontSize="14" fontWeight="bold">User Data</text>

            {/* Process 2.8 to Process 2.9 */}
            <line x1="1005" y1="1325" x2="1245" y2="1375" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="1070" y="1330" width="140" height="25" fill="white" />
            <text x="1140" y="1347" textAnchor="middle" fontSize="14" fontWeight="bold">Recommendations</text>

            {/* Process 2.9 to D3.5 */}
            <line x1="1245" y1="1440" x2="600" y2="1467" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="860" y="1435" width="140" height="25" fill="white" />
            <text x="930" y="1452" textAnchor="middle" fontSize="14" fontWeight="bold">Compare vs Goals</text>

            {/* Process 2.9 to Process 2.4 */}
            <line x1="1245" y1="1370" x2="520" y2="850" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="830" y="1080" width="110" height="25" fill="white" />
            <text x="885" y="1097" textAnchor="middle" fontSize="14" fontWeight="bold">Adjust Plans</text>

            {/* Process 2.5 to Process 2.1 */}
            <line x1="860" y1="810" x2="515" y2="410" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="640" y="585" width="120" height="25" fill="white" />
            <text x="700" y="602" textAnchor="middle" fontSize="14" fontWeight="bold">Daily Summary</text>
          </svg>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg">Detailed Process Descriptions - Nutrition Management (Process 2)</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><strong>Process 2.1:</strong> Log Food Intake - User enters consumed food items</p>
                <p><strong>Process 2.2:</strong> Search Food Database - Look up nutritional information from local DB and external APIs</p>
                <p><strong>Process 2.3:</strong> Calculate Macros - Compute protein, carbs, fats for logged food</p>
                <p><strong>Process 2.4:</strong> Generate Meal Plan - Create personalized meal plans based on user preferences</p>
                <p><strong>Process 2.5:</strong> Track Daily Nutrition - Monitor daily intake vs targets</p>
              </div>
              <div className="space-y-2">
                <p><strong>Process 2.6:</strong> Analyze Nutrition Trends - Identify patterns over time</p>
                <p><strong>Process 2.7:</strong> Set Nutrition Goals - Define calorie and macro targets</p>
                <p><strong>Process 2.8:</strong> Generate Recommendations - AI-powered nutrition suggestions</p>
                <p><strong>Process 2.9:</strong> Monitor Progress - Track goal achievement and adjust plans</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="mb-2">Data Stores</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><strong>D3.1:</strong> Food Database - Nutritional information for foods</p>
                <p><strong>D3.2:</strong> User Meal Plans - Saved meal plans per user</p>
                <p><strong>D3.3:</strong> Daily Food Logs - User's daily food intake records</p>
                <p><strong>D3.4:</strong> Macro Tracking Data - Historical macro calculations</p>
                <p><strong>D3.5:</strong> Nutrition Goals - User-defined nutrition targets</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded text-sm text-gray-700">
              <p><strong>Balancing Rule Verification:</strong> All inputs and outputs from Process 2 in Level 1 are preserved and detailed in this Level 2 diagram:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>User Input:</strong> Food Logs → Processed through 2.1, 2.2, 2.3</li>
                <li><strong>User Output:</strong> Meal Plans → Generated by 2.4</li>
                <li><strong>External API:</strong> Nutrition Data ↔ Process 2.2</li>
                <li><strong>AI Coach:</strong> Insights ↔ Process 2.8</li>
                <li><strong>D3 Data Store:</strong> Split into D3.1-D3.5 for detailed tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
