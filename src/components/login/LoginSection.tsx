import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Captcha, { useCaptchaStore } from '../common/Captcha';
import CustomAlert from '../common/CustomAlert';
import { useUserActions } from '../../hooks/useUserHooks';
import { useFormDataStore, useUserUIStore } from '../../store/useUserStore';
import { useAuthFlowStore, usePasswordVisibilityStore } from '../../store/layout/useLanguageStore';

export default function LoginSection() {
  const { t } = useTranslation();
  const { isVisible, toggleVisibility } = usePasswordVisibilityStore();
  const { loginData, setLoginData, clearFormData } = useFormDataStore();
  const { loginUser, responseStatus } = useUserActions();
  const { setMode } = useAuthFlowStore();
  const { loading, setLoading } = useUserUIStore();
  const { isCaptchaChecked, validateCaptcha, resetCaptchaCheck } = useCaptchaStore();

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      validateCaptcha();

      if (!isCaptchaChecked) {
        // Inform the user if captcha is incorrect
        return;
      }

      setLoading(true);
      const isSuccess = await loginUser(loginData.id, loginData.password);

      if (isSuccess) {
        setMode("googleAuth");
        clearFormData();
      }

      resetCaptchaCheck();
      setLoading(false);
    },
    [clearFormData, isCaptchaChecked, loginData.id, loginData.password, loginUser, resetCaptchaCheck, setLoading, setMode, validateCaptcha]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('Login')}
        </h1>
        <p className="text-gray-600">
          {t('EnterYourCredentials')}
        </p>
      </div>

      {responseStatus === "error" && (
        <div className="mb-6">
          <CustomAlert />
        </div>
      )}

      <form 
        onSubmit={handleLogin}
        onKeyDown={handleKeyDown}
        className="space-y-6 animate-fade-up"
      >
        <div>
          <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
            {t('IDNumber')}
          </label>
          <div className="relative">
            <input
              id="idNumber"
              type="number"
              min="1"
              placeholder={t("EnterIDNumber")}
              value={loginData.id}
              onChange={(e) => setLoginData({ id: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            {loginData.id && (
              <button
                type="button"
                onClick={() => setLoginData({ ...loginData, id: "" })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="sr-only">Clear</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {t("Password")}
          </label>
          <div className="relative">
            <input
              id="password"
              type={isVisible ? "text" : "password"}
              placeholder={t("EnterYourPassword")}
              value={loginData.password}
              onChange={(e) => setLoginData({ password: e.target.value })}
              required
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Captcha />
        </div>

        <button
          type="submit"
          disabled={loading || !isCaptchaChecked}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t("LoadingDots")}
            </span>
          ) : isCaptchaChecked ? (
            <span className="flex items-center justify-center">
              <LogIn className="w-4 h-4 mr-2" />
              {t("Login")}
            </span>
          ) : (
            t("VerifyCaptcha")
          )}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {t('ForgotPassword')}?{' '}
            <button 
              type="button"
              className="text-green-600 hover:text-green-800 font-medium transition-colors"
              onClick={() => setMode("forgotPassword")}
            >
              {t('ResetPassword')}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}