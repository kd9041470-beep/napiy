import React from "react";

type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message || "Unexpected error" };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>حدث خطأ غير متوقع</h2>
          <p>{this.state.message}</p>
          <p>جرّب تحديث الصفحة. إذا استمرّ الخطأ، راجع وحدة التحكم (Console).</p>
        </div>
      );
    }
    return this.props.children;
  }
}
