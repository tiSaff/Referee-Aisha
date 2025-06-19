import React from 'react';
import { X, Users as UsersIcon, Mail, Globe } from 'lucide-react';
import { User } from '../../types';
import Button from '../common/Button';
import FormField from '../common/FormField';
import { useExternalUserEditModalStore } from '../../store/externalUserEditModalStore';

interface ExternalUserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: () => void;
  onFieldChange: (field: string, value: string | boolean) => void;
  loading?: boolean;
}

// Country options with flags and locale codes
const countryOptions = [
  { code: 'AW', name: 'Aruba', flag: '🇦🇼' },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'AI', name: 'Anguilla', flag: '🇦🇮' },
  { code: 'AX', name: 'Åland Islands', flag: '🇦🇽' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AS', name: 'American Samoa', flag: '🇦🇸' },
  { code: 'AQ', name: 'Antarctica', flag: '🇦🇶' },
  { code: 'TF', name: 'French Southern Territories', flag: '🇹🇫' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
  { code: 'BQ', name: 'Bonaire, Sint Eustatius and Saba', flag: '🇧🇶' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'BL', name: 'Saint Barthélemy', flag: '🇧🇱' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿' },
  { code: 'BM', name: 'Bermuda', flag: '🇧🇲' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'BV', name: 'Bouvet Island', flag: '🇧🇻' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CC', name: 'Cocos (Keeling) Islands', flag: '🇨🇨' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'CD', name: 'Congo (Democratic Republic)', flag: '🇨🇩' },
  { code: 'CG', name: 'Congo (Republic)', flag: '🇨🇬' },
  { code: 'CK', name: 'Cook Islands', flag: '🇨🇰' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'CW', name: 'Curaçao', flag: '🇨🇼' },
  { code: 'CX', name: 'Christmas Island', flag: '🇨🇽' },
  { code: 'KY', name: 'Cayman Islands', flag: '🇰🇾' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'EH', name: 'Western Sahara', flag: '🇪🇭' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'FK', name: 'Falkland Islands', flag: '🇫🇰' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'FO', name: 'Faroe Islands', flag: '🇫🇴' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'GG', name: 'Guernsey', flag: '🇬🇬' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GI', name: 'Gibraltar', flag: '🇬🇮' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
  { code: 'GP', name: 'Guadeloupe', flag: '🇬🇵' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩' },
  { code: 'GL', name: 'Greenland', flag: '🇬🇱' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫' },
  { code: 'GU', name: 'Guam', flag: '🇬🇺' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'HM', name: 'Heard Island and McDonald Islands', flag: '🇭🇲' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IM', name: 'Isle of Man', flag: '🇮🇲' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'IO', name: 'British Indian Ocean Territory', flag: '🇮🇴' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'JE', name: 'Jersey', flag: '🇯🇪' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'MO', name: 'Macao', flag: '🇲🇴' },
  { code: 'MF', name: 'Saint Martin', flag: '🇲🇫' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'MP', name: 'Northern Mariana Islands', flag: '🇲🇵' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'MS', name: 'Montserrat', flag: '🇲🇸' },
  { code: 'MQ', name: 'Martinique', flag: '🇲🇶' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'YT', name: 'Mayotte', flag: '🇾🇹' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
  { code: 'NC', name: 'New Caledonia', flag: '🇳🇨' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪' },
  { code: 'NF', name: 'Norfolk Island', flag: '🇳🇫' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'NU', name: 'Niue', flag: '🇳🇺' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: 'PN', name: 'Pitcairn', flag: '🇵🇳' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
  { code: 'PF', name: 'French Polynesia', flag: '🇵🇫' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RE', name: 'Réunion', flag: '🇷🇪' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'GS', name: 'South Georgia and the South Sandwich Islands', flag: '🇬🇸' },
  { code: 'SH', name: 'Saint Helena, Ascension and Tristan da Cunha', flag: '🇸🇭' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen', flag: '🇸🇯' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'PM', name: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
  { code: 'SX', name: 'Sint Maarten', flag: '🇸🇽' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾' },
  { code: 'TC', name: 'Turks and Caicos Islands', flag: '🇹🇨' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'TK', name: 'Tokelau', flag: '🇹🇰' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'UM', name: 'United States Minor Outlying Islands', flag: '🇺🇲' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VG', name: 'British Virgin Islands', flag: '🇻🇬' },
  { code: 'VI', name: 'U.S. Virgin Islands', flag: '🇻🇮' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'WF', name: 'Wallis and Futuna', flag: '🇼🇫' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
];

const ExternalUserEditModal: React.FC<ExternalUserEditModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
  onFieldChange,
  loading = false
}) => {
  // Zustand store for modal state
  const {
    showCountryDropdown,
    countrySearchTerm,
    setShowCountryDropdown,
    setCountrySearchTerm,
    resetModal
  } = useExternalUserEditModalStore();

  // Handle send reset password email
  const handleSendResetPasswordEmail = () => {
    if (user?.email) {
      // Here you would typically call an API to send reset password email
      console.log('Sending reset password email to:', user.email);
      
      // Show success message (you could add a toast notification here)
      alert(`Reset password email sent to ${user.email}`);
    }
  };

  // Handle modal close with cleanup
  const handleClose = () => {
    onClose();
    resetModal();
  };

  // Handle country selection
  const handleCountrySelect = (countryName: string) => {
    onFieldChange('department', countryName);
    setShowCountryDropdown(false);
    setCountrySearchTerm('');
  };

  // Filter countries based on search term
  const filteredCountries = countryOptions.filter(country =>
    country.name.toLowerCase().includes(countrySearchTerm.toLowerCase())
  );

  // Get selected country flag
  const selectedCountry = countryOptions.find(country => country.name === user?.department);

  // Handle escape key
  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (showCountryDropdown) {
          setShowCountryDropdown(false);
        } else {
          handleClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, showCountryDropdown, setShowCountryDropdown]);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Enhanced Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <UsersIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-500" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit External User</h2>
            </div>
            <Button variant="ghost" onClick={handleClose}>
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField label="First Name" required>
                <input
                  type="text"
                  value={user.firstName}
                  onChange={(e) => onFieldChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
              </FormField>

              <FormField label="Last Name" required>
                <input
                  type="text"
                  value={user.lastName}
                  onChange={(e) => onFieldChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
              </FormField>

              <FormField label="Email" required>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => onFieldChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
              </FormField>

              <FormField label="User ID" required>
                <input
                  type="text"
                  value={user.id.toString()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm sm:text-base"
                  disabled
                />
              </FormField>

              <FormField label="Phone Number" required>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => onFieldChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                />
              </FormField>

              <FormField label="Country">
                <div className="relative">
                  <div
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white cursor-pointer transition-all duration-200 text-sm sm:text-base flex items-center justify-between"
                    style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  >
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      {selectedCountry ? (
                        <>
                          <span className="text-lg">{selectedCountry.flag}</span>
                          <span>{selectedCountry.name}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">Select Country</span>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Country Dropdown */}
                  {showCountryDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                      {/* Search Input */}
                      <div className="p-3 border-b border-gray-200">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={countrySearchTerm}
                          onChange={(e) => setCountrySearchTerm(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                          style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      {/* Country List */}
                      <div className="max-h-40 overflow-y-auto">
                        {filteredCountries.length === 0 ? (
                          <div className="px-3 py-2 text-sm text-gray-500">No countries found</div>
                        ) : (
                          filteredCountries.map((country) => (
                            <div
                              key={country.code}
                              className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCountrySelect(country.name);
                              }}
                            >
                              <span className="text-lg">{country.flag}</span>
                              <span className="text-sm font-medium text-gray-900">{country.name}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FormField>

              <FormField label="Status">
                <select
                  value={user.status}
                  onChange={(e) => onFieldChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </FormField>
            </div>

            {/* Send Reset Password Email Section - Fixed Colors */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Password Reset</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Send a password reset email to the user's email address: <strong>{user.email}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={handleSendResetPasswordEmail}
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ 
                        backgroundColor: '#2a835f',
                        '--tw-ring-color': '#2a835f'
                      } as React.CSSProperties}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Reset Password Email
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center sm:justify-end pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onSave}
                  loading={loading}
                  className="w-full sm:w-auto"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalUserEditModal;