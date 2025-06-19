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
    { key: 'goal', label: 'Goal' }
  ];

  // Group offside decisions for radio button implementation
  const offsideOptions = [
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
      'offside': offsideOptions,
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
    isSubOption?: boolean;
  }> = ({ groupName, decisionKey, label, isSubOption = false }) => (
    <label className={`flex items-center space-x-3 cursor-pointer group ${isSubOption ? 'ml-6' : ''}`}>
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
      <span className={`text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200 ${
        isSubOption ? 'text-gray-600 group-hover:text-gray-800' : ''
      }`}>
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

  return (
    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Decision</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Decisions Column */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-base">Basic Decisions</h4>
          <div className="space-y-3">
            {basicDecisionOptions.map(option => (
              <DecisionRadio 
                key={option.key}
                groupName="basicDecision"
                decisionKey={option.key}
                label={option.label}
              />
            ))}
          </div>

          {/* Offside Section */}
          <div className="pt-4 border-t border-gray-100">
            <h5 className="font-medium text-gray-700 text-sm mb-3">Offside</h5>
            <div className="space-y-2">
              {offsideOptions.map(option => (
                <DecisionRadio 
                  key={option.key}
                  groupName="offside"
                  decisionKey={option.key}
                  label={option.label}
                />
              ))}
              
              {/* Offside Sub-options - remain as checkboxes */}
              {decisions.offside && (
                <div className="space-y-2 mt-2">
                  <DecisionCheckbox decisionKey="offsideInterferingPlay" label="Interfering with Play" isSubOption />
                  <DecisionCheckbox decisionKey="offsideInterferingOpponent" label="Interfering with an Opponent" isSubOption />
                  <DecisionCheckbox decisionKey="offsideGainingAdvantage" label="Gaining an Advantage" isSubOption />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cards Column */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-base">Cards</h4>
          
          <div className="space-y-3">
            {cardOptions.map(option => (
              <DecisionRadio 
                key={option.key}
                groupName="card"
                decisionKey={option.key}
                label={option.label}
              />
            ))}
          </div>
          
          {/* Card Sub-options - remain as checkboxes */}
          {decisions.noCard && (
            <div className="space-y-2 mt-2">
              <DecisionCheckbox decisionKey="noCard1" label="1" isSubOption />
              <DecisionCheckbox decisionKey="noCard2" label="2" isSubOption />
            </div>
          )}
          
          {decisions.yellowCard && (
            <div className="space-y-2 mt-2">
              <DecisionCheckbox decisionKey="yellowCard3" label="3" isSubOption />
              <DecisionCheckbox decisionKey="yellowCard4" label="4" isSubOption />
              <DecisionCheckbox decisionKey="yellowCard5" label="5" isSubOption />
            </div>
          )}
          
          {decisions.redCard && (
            <div className="space-y-2 mt-2">
              <DecisionCheckbox decisionKey="redCard6" label="6" isSubOption />
              <DecisionCheckbox decisionKey="redCard7" label="7" isSubOption />
              <DecisionCheckbox decisionKey="redCard8" label="8" isSubOption />
            </div>
          )}
        </div>

        {/* VAR Column */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 text-base">VAR</h4>
          
          <div className="space-y-3">
            {varOptions.map(option => (
              <DecisionRadio 
                key={option.key}
                groupName="var"
                decisionKey={option.key}
                label={option.label}
              />
            ))}
          </div>
          
          {/* VAR Yes Sub-options - remain as checkboxes */}
          {decisions.varYes && (
            <div className="space-y-2 mt-2">
              <DecisionCheckbox decisionKey="varYesOFR" label="OFR" isSubOption />
              <DecisionCheckbox decisionKey="varYesVAROnly" label="VAR Only" isSubOption />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionSection;