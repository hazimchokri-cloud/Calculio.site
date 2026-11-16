import * as React from 'react';
import { AlertTriangle, RefreshCw, RotateCw } from 'lucide-react';
import { isChunkLoadError, resetFailedLazyModules } from '../../utils/lazyWithRetry';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  resetKeys?: unknown[];
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

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (!this.state.hasError) return;
    const prevKeys = prevProps.resetKeys;
    const nextKeys = this.props.resetKeys;
    if (prevKeys && nextKeys && (prevKeys.length !== nextKeys.length || nextKeys.some((k, i) => !Object.is(k, prevKeys[i])))) {
      resetFailedLazyModules();
      this.setState({ hasError: false, error: null });
    }
  }

  handleReset = (): void => {
    resetFailedLazyModules();
    this.setState({ hasError: false, error: null });
  };

  handleReloadPage = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      if (isChunkLoadError(this.state.error)) {
        return (
          <div className="min-h-[300px] flex items-center justify-center p-6">
            <div className="max-w-md w-full p-6 bg-white rounded-2xl border border-orange-200 shadow-sm text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unable to Load Page</h3>
              <p className="text-sm text-slate-600">
                A required module failed to load, which can happen after a brief connection interruption or site update.
              </p>
              <button
                type="button"
                onClick={this.handleReloadPage}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCw className="w-4 h-4" /> Reload Page
              </button>
            </div>
          </div>
        );
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
