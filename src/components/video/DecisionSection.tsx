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
  // Group basic decisions for radio button implementation
  const basicDecisionOptions = [
    { key: 'noFoul', label: 'No Foul' },
    { key: 'indirectFreeKick', label: 'Indirect Free Kick' },
    { key: 'directFreeKick', label: 'Direct Free Kick' },
    { key: 'penaltyKick', label: 'Penalty Kick' },
    { key: 'goal', label: 'Goal' },
    { key: 'offside', label: 'Offside' },
    { key: 'noOffside', label: 'No Offside' }
  ];

  // Group card decisions for radio button implementation
  const cardOptions = [
    { key: 'noCard', label: 'No Card' },
    { key: 'yellowCard', label: 'Yellow Card' },
    { key: 'redCard', label: 'Red Card' }
  ];

  // Group VAR decisions for radio button implementation
  const varOptions = [
    { key: 'varYes', label: 'VAR Yes' },
    { key: 'varNo', label: 'VAR No' }
  ];

  // Handle radio button change
  const handleRadioChange = (groupName: string, selectedKey: string) => {
    // First, set all options in the group to false
    const groupOptions = {
      'basicDecision': basicDecisionOptions,
      'card': cardOptions,
      'var': varOptions
    }[groupName];

    if (groupOptions) {
      groupOptions.forEach(option => {
        if (option.key !== selectedKey && decisions[option.key]) {
          onDecisionChange(option.key, false);
        }
      });
    }

    // Then set the selected option to true
    onDecisionChange(selectedKey, true);
  };

  // Radio button component
  const DecisionRadio: React.FC<{ 
    groupName: string;
    decisionKey: string; 
    label: string;
  }> = ({ groupName, decisionKey, label }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <input
        type="radio"
        name={groupName}
        checked={decisions[decisionKey] as boolean}
        onChange={() => handleRadioChange(groupName, decisionKey)}
        className="rounded-full border-gray-300 focus:ring-2 transition-all duration-200"
        style={{ 
          '--tw-ring-color': '#2a835f',
          accentColor: '#2a835f'
        } as React.CSSProperties}
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
        {label}
      </span>
    </label>
  );

  // Checkbox for sub-options that remain as checkboxes
  const DecisionCheckbox: React.FC<{ 
    decisionKey: string; 
    label: string; 
    isSubOption?: boolean;
  }> = ({ decisionKey, label, isSubOption = false }) => (
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
        isSubOption ? 'text-gray-600 group-hover:text-gray-800' : ''
      }`}>
        {label}
      </span>
    </label>
  );

  // Check if offside is selected to hide cards section
  const isOffsideSelected = decisions.offside;

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Decision</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Decisions Column */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-base">Basic Decisions</h4>
          <div className="space-y-3">
            {/* Basic decision radio buttons */}
            {basicDecisionOptions.map(option => (
              <React.Fragment key={option.key}>
                <DecisionRadio 
                  groupName="basicDecision"
                  decisionKey={option.key}
                  label={option.label}
                />
                
                {/* Show offside sub-options immediately under offside */}
                {option.key === 'offside' && decisions.offside && (
                  <div className="space-y-2 mt-1 mb-3">
                    <DecisionCheckbox decisionKey="offsideInterferingPlay" label="Interfering with Play" isSubOption />
                    <DecisionCheckbox decisionKey="offsideInterferingOpponent" label="Interfering with an Opponent" isSubOption />
                    <DecisionCheckbox decisionKey="offsideGainingAdvantage" label="Gaining an Advantage" isSubOption />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Cards Column - Only show if offside is not selected */}
        {!isOffsideSelected && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 text-base">Cards</h4>
            
            <div className="space-y-3">
              {cardOptions.map(option => (
                <React.Fragment key={option.key}>
                  <DecisionRadio 
                    groupName="card"
                    decisionKey={option.key}
                    label={option.label}
                  />
                  
                  {/* Show sub-options immediately under their parent */}
                  {option.key === 'noCard' && decisions.noCard && (
                    <div className="space-y-2 mt-1 mb-3">
                      <DecisionCheckbox decisionKey="noCard1" label="1" isSubOption />
                      <DecisionCheckbox decisionKey="noCard2" label="2" isSubOption />
                    </div>
                  )}
                  
                  {option.key === 'yellowCard' && decisions.yellowCard && (
                    <div className="space-y-2 mt-1 mb-3">
                      <DecisionCheckbox decisionKey="yellowCard3" label="3" isSubOption />
                      <DecisionCheckbox decisionKey="yellowCard4" label="4" isSubOption />
                      <DecisionCheckbox decisionKey="yellowCard5" label="5" isSubOption />
                    </div>
                  )}
                  
                  {option.key === 'redCard' && decisions.redCard && (
                    <div className="space-y-2 mt-1 mb-3">
                      <DecisionCheckbox decisionKey="redCard6" label="6" isSubOption />
                      <DecisionCheckbox decisionKey="redCard7" label="7" isSubOption />
                      <DecisionCheckbox decisionKey="redCard8" label="8" isSubOption />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* VAR Column */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-base">VAR</h4>
          
          <div className="space-y-3">
            {varOptions.map(option => (
              <React.Fragment key={option.key}>
                <DecisionRadio 
                  groupName="var"
                  decisionKey={option.key}
                  label={option.label}
                />
                
                {/* Show VAR Yes sub-options immediately under VAR Yes */}
                {option.key === 'varYes' && decisions.varYes && (
                  <div className="space-y-2 mt-1 mb-3">
                    <DecisionCheckbox decisionKey="varYesOFR" label="OFR" isSubOption />
                    <DecisionCheckbox decisionKey="varYesVAROnly" label="VAR Only" isSubOption />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionSection;