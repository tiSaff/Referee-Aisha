import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  handleReportError = () => {
    const { error, errorInfo } = this.state;
    const subject = encodeURIComponent('Application Error Report');
    const body = encodeURIComponent(`
Error Details:
- Message: ${error?.message || 'Unknown error'}
- Stack: ${error?.stack || 'No stack trace'}
- Component Stack: ${errorInfo?.componentStack || 'No component stack'}
- URL: ${window.location.href}
- Time: ${new Date().toISOString()}
- User Agent: ${navigator.userAgent}

Please describe what you were doing when this error occurred:
[Your description here]
    `);
    window.open(`mailto:support@fti-platform.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center">
            {/* Error Illustration */}
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-16 h-16 text-red-600" />
                </div>
                
                {/* Floating Error Indicators */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>

            {/* Error Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Something went wrong
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  An unexpected error occurred in the application.
                </p>
                <p className="text-gray-500">
                  We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={this.handleRefresh}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Refresh Page</span>
                </Button>
                
                <Button
                  onClick={this.handleGoHome}
                  variant="secondary"
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Home className="w-5 h-5" />
                  <span>Go to Dashboard</span>
                </Button>
              </div>

              {/* Error Details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Error Details (Development)</h3>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-red-600">Message:</strong>
                      <p className="text-sm text-gray-700 font-mono bg-gray-100 p-2 rounded mt-1">
                        {this.state.error.message}
                      </p>
                    </div>
                    {this.state.error.stack && (
                      <div>
                        <strong className="text-red-600">Stack Trace:</strong>
                        <pre className="text-xs text-gray-700 bg-gray-100 p-2 rounded mt-1 overflow-auto max-h-40">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Support Section */}
              <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  If this problem continues, please report it to our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={this.handleReportError}
                    variant="secondary"
                    className="flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Report Error</span>
                  </Button>
                  <a 
                    href="mailto:support@fti-platform.com" 
                    className="text-red-600 hover:text-red-800 font-medium transition-colors py-2"
                  >
                    support@fti-platform.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;