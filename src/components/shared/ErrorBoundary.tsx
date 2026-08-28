import * as React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  key?: React.Key;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-[300px] flex items-center justify-center p-6">
          <div className="max-w-md w-full p-6 bg-white rounded-2xl border border-red-200 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Calculation Error</h3>
            <p className="text-sm text-slate-600">
              An error occurred during calculation. Please check your inputs or reset to default values.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Reset Calculator
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
