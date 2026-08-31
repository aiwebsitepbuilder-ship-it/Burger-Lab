import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error in Burger Lab:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-zinc-900 border border-red-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-14 h-14 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl">
              !
            </div>
            <h1 className="text-2xl font-black mb-2 text-white">Something Went Wrong</h1>
            <p className="text-white/60 text-sm mb-6">
              We encountered an issue loading this page. Please try refreshing or resetting your session.
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
            >
              Reload Website
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
