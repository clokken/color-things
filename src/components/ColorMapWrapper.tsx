import React from "react";

type ColorMapWrapperProps = {
  label: string;
  children: React.ReactNode;
};

export default function ColorMapWrapper({ label, children }: ColorMapWrapperProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '10px 20px',
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 10,
      }}>
        {label}
      </div>

      <div style={{
        background: '#000',
        padding: '10px 0',
      }}>
        {children}
      </div>
    </div>
  );
}
