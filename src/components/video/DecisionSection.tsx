import React from 'react';

interface DecisionState {
  [key: string]: boolean | string;
}

interface DecisionSectionProps {
  decisions: DecisionState;
  onDecisionChange: (key: string, value: boolean) => void;
}

const DecisionSection: React.FC<DecisionSectionProps> = ({
  decisions,
  onDecisionChange
}) => {
  const DecisionCheckbox: React.FC<{ 
    decisionKey: string; 
    label: string; 
    isSubOption?: boolean;
    isBold?: boolean;
  }> = ({ decisionKey, label, isSubOption = false, isBold = false }) => (
    <label className={`flex items-center space-x-3 cursor-pointer group ${isSubOption ? 'ml-6' : ''}`}>
      <input
        type="checkbox"
        checked={decisions[decisionKey] as boolean}
        onChange={(e) => onDecisionChange(decisionKey, e.target.checked)}
        className="rounded border-gray-300 focus:ring-2 transition-all duration-200"
        style={{ 
          '--tw-ring-color': '#2a835f',
          accentColor: '#2a835f'
        } as React.CSSProperties}
      />
      <span className={`text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200 ${
        isBold ? 'font-medium' : ''
      } ${isSubOption ? 'text-gray-600 group-hover:text-gray-800' : ''}`}>
        {label}
      </span>
    </label>
  );

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Decision</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Decisions Column */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-base">Basic Decisions</h4>
          <div className="space-y-3">
            <DecisionCheckbox decisionKey="noFoul" label="No Foul" />
            <DecisionCheckbox decisionKey="indirectFreeKick" label="Indirect Free Kick" />
            <DecisionCheckbox decisionKey="directFreeKick" label="Direct Free Kick" />
            <DecisionCheckbox decisionKey="penaltyKick" label="Penalty Kick" />
            <DecisionCheckbox decisionKey="goal" label="Goal" />
          </div>

          {/* Offside Section */}
          <div className="pt-4 border-t border-gray-100">
            <h5 className="font-medium text-gray-700 text-sm mb-3">Offside</h5>
            <div className="space-y-2">
              <DecisionCheckbox decisionKey="offside" label="Offside" isBold />
              
              {/* Offside Sub-options */}
              {decisions.offside && (
                <div className="space-y-2">
                  <DecisionCheckbox decisionKey="offsideInterferingPlay" label="Interfering with Play" isSubOption />
                  <DecisionCheckbox decisionKey="offsideInterferingOpponent" label="Interfering with an Opponent" isSubOption />
                  <DecisionCheckbox decisionKey="offsideGainingAdvantage" label="Gaining an Advantage" isSubOption />
                </div>
              )}
              
              <DecisionCheckbox decisionKey="noOffside" label="No Offside" />
            </div>
          </div>
        </div>

        {/* Cards Column */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-base">Cards</h4>
          
          {/* No Card */}
          <div className="space-y-2">
            <DecisionCheckbox decisionKey="noCard" label="No Card" isBold />
            
            {/* No Card Sub-options */}
            {decisions.noCard && (
              <div className="space-y-2">
                <DecisionCheckbox decisionKey="noCard1" label="1" isSubOption />
                <DecisionCheckbox decisionKey="noCard2" label="2" isSubOption />
              </div>
            )}
          </div>

          {/* Yellow Card */}
          <div className="space-y-2">
            <DecisionCheckbox decisionKey="yellowCard" label="Yellow Card" isBold />
            
            {/* Yellow Card Sub-options */}
            {decisions.yellowCard && (
              <div className="space-y-2">
                <DecisionCheckbox decisionKey="yellowCard3" label="3" isSubOption />
                <DecisionCheckbox decisionKey="yellowCard4" label="4" isSubOption />
                <DecisionCheckbox decisionKey="yellowCard5" label="5" isSubOption />
              </div>
            )}
          </div>

          {/* Red Card */}
          <div className="space-y-2">
            <DecisionCheckbox decisionKey="redCard" label="Red Card" isBold />
            
            {/* Red Card Sub-options */}
            {decisions.redCard && (
              <div className="space-y-2">
                <DecisionCheckbox decisionKey="redCard6" label="6" isSubOption />
                <DecisionCheckbox decisionKey="redCard7" label="7" isSubOption />
                <DecisionCheckbox decisionKey="redCard8" label="8" isSubOption />
              </div>
            )}
          </div>
        </div>

        {/* VAR Column */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-base">VAR</h4>
          
          {/* VAR Yes */}
          <div className="space-y-2">
            <DecisionCheckbox decisionKey="varYes" label="VAR Yes" isBold />
            
            {/* VAR Yes Sub-options */}
            {decisions.varYes && (
              <div className="space-y-2">
                <DecisionCheckbox decisionKey="varYesOFR" label="OFR" isSubOption />
                <DecisionCheckbox decisionKey="varYesVAROnly" label="VAR Only" isSubOption />
              </div>
            )}
          </div>

          {/* VAR No */}
          <div className="space-y-2">
            <DecisionCheckbox decisionKey="varNo" label="VAR No" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSection;