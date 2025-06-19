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

  // Offside sub-options
  const offsideSubOptions = [
    { key: 'offsideInterferingPlay', label: 'Interfering with Play' },
    { key: 'offsideInterferingOpponent', label: 'Interfering with an Opponent' },
    { key: 'offsideGainingAdvantage', label: 'Gaining an Advantage' }
  ];

  // No Card sub-options
  const noCardSubOptions = [
    { key: 'noCard1', label: '1' },
    { key: 'noCard2', label: '2' }
  ];

  // Yellow Card sub-options
  const yellowCardSubOptions = [
    { key: 'yellowCard3', label: '3' },
    { key: 'yellowCard4', label: '4' },
    { key: 'yellowCard5', label: '5' }
  ];

  // Red Card sub-options
  const redCardSubOptions = [
    { key: 'redCard6', label: '6' },
    { key: 'redCard7', label: '7' },
    { key: 'redCard8', label: '8' }
  ];

  // VAR Yes sub-options
  const varYesSubOptions = [
    { key: 'varYesOFR', label: 'OFR' },
    { key: 'varYesVAROnly', label: 'VAR Only' }
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

  // Handle sub-option radio change
  const handleSubRadioChange = (groupName: string, selectedKey: string) => {
    const subOptionGroups = {
      'offside': offsideSubOptions,
      'noCard': noCardSubOptions,
      'yellowCard': yellowCardSubOptions,
      'redCard': redCardSubOptions,
      'varYes': varYesSubOptions
    };
    
    const groupOptions = subOptionGroups[groupName as keyof typeof subOptionGroups];
    
    if (groupOptions) {
      groupOptions.forEach(option => {
        if (option.key !== selectedKey && decisions[option.key]) {
          onDecisionChange(option.key, false);
        }
      });
    }
    
    // Set the selected sub-option to true
    onDecisionChange(selectedKey, true);
    
    // Also ensure the parent option is selected
    if (!decisions[groupName]) {
      onDecisionChange(groupName, true);
    }
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

  // Sub-option radio button component
  const SubOptionRadio: React.FC<{ 
    groupName: string;
    decisionKey: string; 
    label: string;
  }> = ({ groupName, decisionKey, label }) => (
    <label className="flex items-center space-x-3 cursor-pointer group ml-6">
      <input
        type="radio"
        name={`${groupName}-sub`}
        checked={decisions[decisionKey] as boolean}
        onChange={() => handleSubRadioChange(groupName, decisionKey)}
        className="rounded-full border-gray-300 focus:ring-2 transition-all duration-200"
        style={{ 
          '--tw-ring-color': '#2a835f',
          accentColor: '#2a835f'
        } as React.CSSProperties}
      />
      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
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
                    {offsideSubOptions.map(subOption => (
                      <SubOptionRadio
                        key={subOption.key}
                        groupName="offside"
                        decisionKey={subOption.key}
                        label={subOption.label}
                      />
                    ))}
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
                      {noCardSubOptions.map(subOption => (
                        <SubOptionRadio
                          key={subOption.key}
                          groupName="noCard"
                          decisionKey={subOption.key}
                          label={subOption.label}
                        />
                      ))}
                    </div>
                  )}
                  
                  {option.key === 'yellowCard' && decisions.yellowCard && (
                    <div className="space-y-2 mt-1 mb-3">
                      {yellowCardSubOptions.map(subOption => (
                        <SubOptionRadio
                          key={subOption.key}
                          groupName="yellowCard"
                          decisionKey={subOption.key}
                          label={subOption.label}
                        />
                      ))}
                    </div>
                  )}
                  
                  {option.key === 'redCard' && decisions.redCard && (
                    <div className="space-y-2 mt-1 mb-3">
                      {redCardSubOptions.map(subOption => (
                        <SubOptionRadio
                          key={subOption.key}
                          groupName="redCard"
                          decisionKey={subOption.key}
                          label={subOption.label}
                        />
                      ))}
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
                    {varYesSubOptions.map(subOption => (
                      <SubOptionRadio
                        key={subOption.key}
                        groupName="varYes"
                        decisionKey={subOption.key}
                        label={subOption.label}
                      />
                    ))}
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